const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const BlogPost = require('../models/BlogPost');
const Contact = require('../models/Contact');
const Analytics = require('../models/Analytics');

const router = express.Router();

// Simple admin authentication middleware
const authenticateAdmin = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided.'
    });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    req.admin = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid token.'
    });
  }
};

// POST /api/admin/login - Admin login
router.post('/login', [
  body('username').trim().isLength({ min: 1 }).withMessage('Username is required'),
  body('password').isLength({ min: 1 }).withMessage('Password is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array()
      });
    }
    
    const { username, password } = req.body;
    
    // Simple admin credentials (in production, use proper user management)
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    
    if (username !== adminUsername || password !== adminPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { username, role: 'admin' },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '24h' }
    );
    
    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: { username, role: 'admin' }
      }
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Login error',
      error: error.message
    });
  }
});

// GET /api/admin/dashboard - Admin dashboard data
router.get('/dashboard', authenticateAdmin, async (req, res) => {
  try {
    const last30Days = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const last7Days = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    
    // Blog statistics
    const totalPosts = await BlogPost.countDocuments();
    const publishedPosts = await BlogPost.countDocuments({ published: true });
    const draftPosts = await BlogPost.countDocuments({ published: false });
    const postsThisMonth = await BlogPost.countDocuments({
      createdAt: { $gte: last30Days }
    });
    
    // Contact statistics
    const totalContacts = await Contact.countDocuments();
    const newContacts = await Contact.countDocuments({ status: 'new' });
    const contactsThisWeek = await Contact.countDocuments({
      createdAt: { $gte: last7Days }
    });
    
    // Analytics statistics
    const totalPageViews = await Analytics.countDocuments({
      event: 'page_view',
      createdAt: { $gte: last30Days }
    });
    const totalBlogViews = await Analytics.countDocuments({
      event: 'blog_view',
      createdAt: { $gte: last30Days }
    });
    
    // Recent blog posts
    const recentPosts = await BlogPost.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title slug published createdAt views')
      .lean();
    
    // Recent contacts
    const recentContacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email subject status createdAt')
      .lean();
    
    // Top blog posts by views
    const topPosts = await BlogPost.find({ published: true })
      .sort({ views: -1 })
      .limit(5)
      .select('title slug views')
      .lean();
    
    res.json({
      success: true,
      data: {
        blog: {
          totalPosts,
          publishedPosts,
          draftPosts,
          postsThisMonth,
          recentPosts,
          topPosts
        },
        contacts: {
          totalContacts,
          newContacts,
          contactsThisWeek,
          recentContacts
        },
        analytics: {
          totalPageViews,
          totalBlogViews
        }
      }
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard data',
      error: error.message
    });
  }
});

// GET /api/admin/blog - Get all blog posts (including drafts)
router.get('/blog', authenticateAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const status = req.query.status; // 'published', 'draft', or 'all'
    
    let query = {};
    if (status === 'published') query.published = true;
    if (status === 'draft') query.published = false;
    
    const skip = (page - 1) * limit;
    
    const posts = await BlogPost.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-content') // Exclude content for listing
      .lean();
    
    const total = await BlogPost.countDocuments(query);
    
    res.json({
      success: true,
      data: {
        posts,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalPosts: total
        }
      }
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching blog posts',
      error: error.message
    });
  }
});

// PUT /api/admin/blog/:id - Update blog post
router.put('/blog/:id', authenticateAdmin, [
  body('title').optional().trim().isLength({ min: 1, max: 200 }),
  body('excerpt').optional().trim().isLength({ min: 1, max: 500 }),
  body('content').optional().trim().isLength({ min: 1 }),
  body('category').optional().isIn(['Web Development', 'React', 'CSS', 'JavaScript', 'Node.js', 'Next.js', 'General', 'Tutorial', 'Tips']),
  body('published').optional().isBoolean()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array()
      });
    }
    
    const post = await BlogPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Blog post updated successfully',
      data: post
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating blog post',
      error: error.message
    });
  }
});

// DELETE /api/admin/blog/:id - Delete blog post
router.delete('/blog/:id', authenticateAdmin, async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Blog post deleted successfully'
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting blog post',
      error: error.message
    });
  }
});

// GET /api/admin/contacts - Get all contacts
router.get('/contacts', authenticateAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const status = req.query.status;
    const priority = req.query.priority;
    
    let query = {};
    if (status) query.status = status;
    if (priority) query.priority = priority;
    
    const skip = (page - 1) * limit;
    
    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
    
    const total = await Contact.countDocuments(query);
    
    res.json({
      success: true,
      data: {
        contacts,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalContacts: total
        }
      }
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching contacts',
      error: error.message
    });
  }
});

module.exports = router;

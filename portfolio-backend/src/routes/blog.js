const express = require('express');
const { body, validationResult, query } = require('express-validator');
const BlogPost = require('../models/BlogPost');
const Analytics = require('../models/Analytics');

const router = express.Router();

// Validation middleware
const validateBlogPost = [
  body('title').trim().isLength({ min: 1, max: 200 }).withMessage('Title must be 1-200 characters'),
  body('excerpt').trim().isLength({ min: 1, max: 500 }).withMessage('Excerpt must be 1-500 characters'),
  body('content').trim().isLength({ min: 1 }).withMessage('Content is required'),
  body('category').isIn(['Web Development', 'React', 'CSS', 'JavaScript', 'Node.js', 'Next.js', 'General', 'Tutorial', 'Tips']).withMessage('Invalid category'),
  body('tags').optional().isArray().withMessage('Tags must be an array'),
  body('published').optional().isBoolean().withMessage('Published must be boolean')
];

// GET /api/blog - Get all published blog posts
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const category = req.query.category;
    const tag = req.query.tag;
    const search = req.query.search;
    
    let query = { published: true };
    
    // Filter by category
    if (category) {
      query.category = category;
    }
    
    // Filter by tag
    if (tag) {
      query.tags = tag;
    }
    
    // Search functionality
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    
    const skip = (page - 1) * limit;
    
    const posts = await BlogPost.find(query)
      .select('-content') // Exclude full content for listing
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
    
    const total = await BlogPost.countDocuments(query);
    const totalPages = Math.ceil(total / limit);
    
    res.json({
      success: true,
      data: {
        posts,
        pagination: {
          currentPage: page,
          totalPages,
          totalPosts: total,
          hasNext: page < totalPages,
          hasPrev: page > 1
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

// GET /api/blog/categories - Get all categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await BlogPost.distinct('category', { published: true });
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error.message
    });
  }
});

// GET /api/blog/tags - Get all tags
router.get('/tags', async (req, res) => {
  try {
    const tags = await BlogPost.distinct('tags', { published: true });
    res.json({
      success: true,
      data: tags
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching tags',
      error: error.message
    });
  }
});

// GET /api/blog/search - Search blog posts
router.get('/search', [
  query('q').trim().isLength({ min: 1 }).withMessage('Search query is required')
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
    
    const searchQuery = req.query.q;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const posts = await BlogPost.search(searchQuery)
      .select('-content')
      .skip(skip)
      .limit(limit)
      .lean();
    
    const total = await BlogPost.search(searchQuery).countDocuments();
    
    // Track search event
    await trackEvent(req, {
      event: 'blog_search',
      category: 'Blog',
      action: 'search',
      label: searchQuery,
      value: total
    });
    
    res.json({
      success: true,
      data: {
        posts,
        searchQuery,
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
      message: 'Error searching blog posts',
      error: error.message
    });
  }
});

// GET /api/blog/:slug - Get single blog post
router.get('/:slug', async (req, res) => {
  try {
    const post = await BlogPost.findOne({ 
      slug: req.params.slug, 
      published: true 
    }).lean();
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }
    
    // Get related posts
    const relatedPosts = await BlogPost.find({
      _id: { $ne: post._id },
      published: true,
      $or: [
        { category: post.category },
        { tags: { $in: post.tags } }
      ]
    })
    .select('-content')
    .sort({ publishedAt: -1 })
    .limit(3)
    .lean();
    
    // Increment view count (fire and forget)
    BlogPost.findByIdAndUpdate(post._id, { $inc: { views: 1 } }).exec();
    
    // Track blog view event
    await trackEvent(req, {
      event: 'blog_view',
      category: 'Blog',
      action: 'view_post',
      label: `${post.category}: ${post.title}`,
      page: `/blog/${post.slug}`,
      pageTitle: post.title
    });
    
    res.json({
      success: true,
      data: {
        post,
        relatedPosts
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching blog post',
      error: error.message
    });
  }
});

// GET /api/blog/category/:category - Get posts by category
router.get('/category/:category', async (req, res) => {
  try {
    const category = req.params.category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const posts = await BlogPost.findByCategory(category)
      .select('-content')
      .skip(skip)
      .limit(limit)
      .lean();
    
    const total = await BlogPost.countDocuments({ category, published: true });
    
    if (posts.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No posts found in this category'
      });
    }
    
    res.json({
      success: true,
      data: {
        posts,
        category,
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
      message: 'Error fetching posts by category',
      error: error.message
    });
  }
});

// POST /api/blog - Create new blog post (admin only)
router.post('/', validateBlogPost, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array()
      });
    }
    
    const post = new BlogPost(req.body);
    await post.save();
    
    res.status(201).json({
      success: true,
      message: 'Blog post created successfully',
      data: post
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'A post with this title already exists'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error creating blog post',
      error: error.message
    });
  }
});

module.exports = router;

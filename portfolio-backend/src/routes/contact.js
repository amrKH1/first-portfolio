const express = require('express');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');

const router = express.Router();

// Email configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
};

// Validation middleware
const validateContact = [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('subject').trim().isLength({ min: 5, max: 200 }).withMessage('Subject must be 5-200 characters'),
  body('message').trim().isLength({ min: 10, max: 2000 }).withMessage('Message must be 10-2000 characters'),
  body('phone').optional().trim().isLength({ max: 20 }).withMessage('Phone number too long'),
  body('company').optional().trim().isLength({ max: 100 }).withMessage('Company name too long'),
  body('projectType').optional().isIn(['Web Development', 'Mobile App', 'E-commerce', 'Consulting', 'Other']),
  body('budget').optional().isIn(['< $5,000', '$5,000 - $15,000', '$15,000 - $50,000', '> $50,000', 'Not specified']),
  body('timeline').optional().isIn(['ASAP', '1-3 months', '3-6 months', '6+ months', 'Flexible']),
  body('source').optional().isIn(['Google Search', 'Social Media', 'Referral', 'Portfolio', 'Blog', 'Other'])
];

// POST /api/contact - Submit contact form
router.post('/', validateContact, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array()
      });
    }

    // Get client info
    const ipAddress = req.ip || req.connection.remoteAddress || 'unknown';
    const userAgent = req.get('User-Agent') || 'unknown';

    // Create contact record
    const contactData = {
      ...req.body,
      ipAddress,
      userAgent
    };

    let contact;
    try {
      contact = new Contact(contactData);
      await contact.save();
    } catch (dbErr) {
      console.error('DB save failed (continuing to send email):', dbErr.message);
      // Fallback object so email templates still work
      contact = {
        ...contactData,
        _id: 'no-db',
        createdAt: new Date(),
        formattedDate: new Date().toLocaleString('en-US')
      };
    }

    // Send email notification (if configured)
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = createTransporter();
        
        // Email to admin
        const adminEmailOptions = {
          from: process.env.SMTP_USER,
          to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
          subject: `New Contact Form Submission: ${contact.subject}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${contact.name}</p>
            <p><strong>Email:</strong> ${contact.email}</p>
            <p><strong>Phone:</strong> ${contact.phone || 'Not provided'}</p>
            <p><strong>Company:</strong> ${contact.company || 'Not provided'}</p>
            <p><strong>Project Type:</strong> ${contact.projectType}</p>
            <p><strong>Budget:</strong> ${contact.budget}</p>
            <p><strong>Timeline:</strong> ${contact.timeline}</p>
            <p><strong>Source:</strong> ${contact.source}</p>
            <p><strong>Subject:</strong> ${contact.subject}</p>
            <p><strong>Message:</strong></p>
            <p>${contact.message.replace(/\n/g, '<br>')}</p>
            <hr>
            <p><small>Submitted on: ${contact.formattedDate}</small></p>
            <p><small>IP Address: ${contact.ipAddress}</small></p>
          `
        };

        // Auto-reply to user
        const userEmailOptions = {
          from: process.env.SMTP_USER,
          to: contact.email,
          subject: 'Thank you for contacting Amr Khaled',
          html: `
            <h2>Thank you for your message!</h2>
            <p>Hi ${contact.name},</p>
            <p>Thank you for reaching out. I've received your message and will get back to you within 24-48 hours.</p>
            <p><strong>Your message:</strong></p>
            <p><em>"${contact.message}"</em></p>
            <p>Best regards,<br>Amr Khaled</p>
            <hr>
            <p><small>This is an automated response. Please do not reply to this email.</small></p>
          `
        };

        await transporter.sendMail(adminEmailOptions);
        await transporter.sendMail(userEmailOptions);
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Don't fail the request if email fails
      }
    }

    res.status(201).json({
      success: true,
      message: 'Thank you for your message! I will get back to you soon.',
      data: {
        id: contact._id,
        submittedAt: contact.createdAt
      }
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Sorry, there was an error sending your message. Please try again later.'
    });
  }
});

// GET /api/contact - Get all contacts (admin only)
router.get('/', async (req, res) => {
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
    const unreadCount = await Contact.getUnreadCount();
    
    res.json({
      success: true,
      data: {
        contacts,
        unreadCount,
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

// GET /api/contact/:id - Get single contact (admin only)
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }
    
    // Mark as read if it's new
    if (contact.status === 'new') {
      await contact.markAsRead();
    }
    
    res.json({
      success: true,
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching contact',
      error: error.message
    });
  }
});

// PUT /api/contact/:id/status - Update contact status (admin only)
router.put('/:id/status', [
  body('status').isIn(['new', 'read', 'replied', 'closed']).withMessage('Invalid status')
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
    
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }
    
    contact.status = req.body.status;
    if (req.body.status === 'replied') {
      contact.replied = true;
      contact.repliedAt = new Date();
    }
    
    await contact.save();
    
    res.json({
      success: true,
      message: 'Contact status updated',
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating contact status',
      error: error.message
    });
  }
});

// GET /api/contact/stats/summary - Get contact statistics (admin only)
router.get('/stats/summary', async (req, res) => {
  try {
    const totalContacts = await Contact.countDocuments();
    const newContacts = await Contact.countDocuments({ status: 'new' });
    const repliedContacts = await Contact.countDocuments({ status: 'replied' });
    const thisMonth = await Contact.countDocuments({
      createdAt: {
        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      }
    });
    
    // Get contacts by project type
    const projectTypes = await Contact.aggregate([
      { $group: { _id: '$projectType', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    // Get contacts by source
    const sources = await Contact.aggregate([
      { $group: { _id: '$source', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    res.json({
      success: true,
      data: {
        totalContacts,
        newContacts,
        repliedContacts,
        thisMonth,
        projectTypes,
        sources
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching contact statistics',
      error: error.message
    });
  }
});

module.exports = router;

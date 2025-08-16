const express = require('express');
const { body, validationResult, query } = require('express-validator');
const Analytics = require('../models/Analytics');

const router = express.Router();

// Helper function to parse user agent
const parseUserAgent = (userAgent) => {
  const device = {
    type: 'unknown',
    browser: 'unknown',
    os: 'unknown'
  };
  
  if (!userAgent) return device;
  
  // Device type detection
  if (/Mobile|Android|iPhone|iPad/.test(userAgent)) {
    device.type = /iPad/.test(userAgent) ? 'tablet' : 'mobile';
  } else {
    device.type = 'desktop';
  }
  
  // Browser detection
  if (/Chrome/.test(userAgent)) device.browser = 'Chrome';
  else if (/Firefox/.test(userAgent)) device.browser = 'Firefox';
  else if (/Safari/.test(userAgent)) device.browser = 'Safari';
  else if (/Edge/.test(userAgent)) device.browser = 'Edge';
  
  // OS detection
  if (/Windows/.test(userAgent)) device.os = 'Windows';
  else if (/Mac/.test(userAgent)) device.os = 'macOS';
  else if (/Linux/.test(userAgent)) device.os = 'Linux';
  else if (/Android/.test(userAgent)) device.os = 'Android';
  else if (/iOS/.test(userAgent)) device.os = 'iOS';
  
  return device;
};

// Validation middleware
const validateEvent = [
  body('event').isIn([
    'page_view', 'blog_view', 'blog_search', 'contact_form_submit',
    'project_view', 'external_link_click', 'social_click', 'ad_click',
    'download', 'email_click', 'phone_click'
  ]).withMessage('Invalid event type'),
  body('category').isIn(['Blog', 'Contact', 'Portfolio', 'Social', 'Advertising', 'Navigation', 'Engagement']).withMessage('Invalid category'),
  body('action').trim().isLength({ min: 1, max: 100 }).withMessage('Action is required'),
  body('label').optional().trim().isLength({ max: 200 }).withMessage('Label too long'),
  body('value').optional().isNumeric().withMessage('Value must be numeric'),
  body('page').trim().isLength({ min: 1 }).withMessage('Page is required'),
  body('pageTitle').optional().trim().isLength({ max: 200 }).withMessage('Page title too long')
];

// POST /api/analytics/track - Track an event
router.post('/track', validateEvent, async (req, res) => {
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
    const referrer = req.get('Referer') || null;
    
    // Parse device info
    const device = parseUserAgent(userAgent);
    
    // Create analytics record
    const analyticsData = {
      ...req.body,
      ipAddress,
      userAgent,
      referrer,
      device,
      sessionId: req.body.sessionId || req.sessionID || null,
      userId: req.body.userId || null
    };

    const analytics = new Analytics(analyticsData);
    await analytics.save();

    res.status(201).json({
      success: true,
      message: 'Event tracked successfully',
      data: {
        id: analytics._id,
        timestamp: analytics.createdAt
      }
    });

  } catch (error) {
    console.error('Analytics tracking error:', error);
    res.status(500).json({
      success: false,
      message: 'Error tracking event'
    });
  }
});

// POST /api/analytics/batch - Track multiple events
router.post('/batch', [
  body('events').isArray({ min: 1, max: 50 }).withMessage('Events must be an array of 1-50 items')
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

    const ipAddress = req.ip || req.connection.remoteAddress || 'unknown';
    const userAgent = req.get('User-Agent') || 'unknown';
    const referrer = req.get('Referer') || null;
    const device = parseUserAgent(userAgent);

    const analyticsData = req.body.events.map(event => ({
      ...event,
      ipAddress,
      userAgent,
      referrer,
      device,
      sessionId: event.sessionId || req.sessionID || null,
      userId: event.userId || null
    }));

    await Analytics.insertMany(analyticsData);

    res.status(201).json({
      success: true,
      message: `${analyticsData.length} events tracked successfully`
    });

  } catch (error) {
    console.error('Batch analytics tracking error:', error);
    res.status(500).json({
      success: false,
      message: 'Error tracking events'
    });
  }
});

// GET /api/analytics/stats - Get analytics statistics (admin only)
router.get('/stats', async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 30;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Get daily stats
    const dailyStats = await Analytics.getDailyStats(days);
    
    // Get top pages
    const topPages = await Analytics.getTopPages(10, startDate);
    
    // Get top blog posts
    const topBlogPosts = await Analytics.getTopBlogPosts(10, startDate);
    
    // Get traffic by country
    const trafficByCountry = await Analytics.getTrafficByCountry(10, startDate);
    
    // Get device stats
    const deviceStats = await Analytics.getDeviceStats(startDate);
    
    // Get total counts
    const totalPageViews = await Analytics.countDocuments({
      event: 'page_view',
      createdAt: { $gte: startDate }
    });
    
    const totalBlogViews = await Analytics.countDocuments({
      event: 'blog_view',
      createdAt: { $gte: startDate }
    });
    
    const totalContacts = await Analytics.countDocuments({
      event: 'contact_form_submit',
      createdAt: { $gte: startDate }
    });

    res.json({
      success: true,
      data: {
        period: `${days} days`,
        summary: {
          totalPageViews,
          totalBlogViews,
          totalContacts
        },
        dailyStats,
        topPages,
        topBlogPosts,
        trafficByCountry,
        deviceStats
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching analytics statistics',
      error: error.message
    });
  }
});

// GET /api/analytics/events - Get events (admin only)
router.get('/events', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const event = req.query.event;
    const category = req.query.category;
    const days = parseInt(req.query.days) || 7;
    
    let query = {};
    
    // Filter by event type
    if (event) query.event = event;
    
    // Filter by category
    if (category) query.category = category;
    
    // Filter by date range
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    query.createdAt = { $gte: startDate };
    
    const skip = (page - 1) * limit;
    
    const events = await Analytics.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
    
    const total = await Analytics.countDocuments(query);
    
    res.json({
      success: true,
      data: {
        events,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalEvents: total
        }
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching analytics events',
      error: error.message
    });
  }
});

// GET /api/analytics/realtime - Get real-time analytics (admin only)
router.get('/realtime', async (req, res) => {
  try {
    const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const lastHour = new Date(Date.now() - 60 * 60 * 1000);
    
    // Active users (last hour)
    const activeUsers = await Analytics.distinct('sessionId', {
      createdAt: { $gte: lastHour }
    });
    
    // Page views (last 24 hours)
    const pageViews24h = await Analytics.countDocuments({
      event: 'page_view',
      createdAt: { $gte: last24Hours }
    });
    
    // Recent events
    const recentEvents = await Analytics.find({
      createdAt: { $gte: lastHour }
    })
    .sort({ createdAt: -1 })
    .limit(20)
    .lean();
    
    // Top pages (last hour)
    const topPagesHour = await Analytics.aggregate([
      { $match: { event: 'page_view', createdAt: { $gte: lastHour } } },
      { $group: { _id: '$page', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    res.json({
      success: true,
      data: {
        activeUsers: activeUsers.length,
        pageViews24h,
        recentEvents,
        topPagesHour,
        lastUpdated: new Date()
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching real-time analytics',
      error: error.message
    });
  }
});

module.exports = router;

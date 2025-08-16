const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  event: {
    type: String,
    required: [true, 'Event type is required'],
    enum: [
      'page_view',
      'blog_view',
      'blog_search',
      'contact_form_submit',
      'project_view',
      'external_link_click',
      'social_click',
      'ad_click',
      'download',
      'email_click',
      'phone_click'
    ],
    index: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Blog', 'Contact', 'Portfolio', 'Social', 'Advertising', 'Navigation', 'Engagement'],
    index: true
  },
  action: {
    type: String,
    required: [true, 'Action is required'],
    trim: true
  },
  label: {
    type: String,
    trim: true,
    index: true
  },
  value: {
    type: Number,
    default: 1
  },
  // User session data
  sessionId: {
    type: String,
    index: true
  },
  userId: {
    type: String,
    index: true
  },
  // Request data
  ipAddress: {
    type: String,
    required: true
  },
  userAgent: {
    type: String,
    required: true
  },
  referrer: {
    type: String,
    default: null
  },
  // Page data
  page: {
    type: String,
    required: true,
    index: true
  },
  pageTitle: {
    type: String,
    trim: true
  },
  // Device/Browser data
  device: {
    type: {
      type: String,
      enum: ['desktop', 'mobile', 'tablet', 'unknown'],
      default: 'unknown'
    },
    browser: {
      type: String,
      default: 'unknown'
    },
    os: {
      type: String,
      default: 'unknown'
    },
    screenResolution: {
      type: String,
      default: null
    }
  },
  // Location data (if available)
  location: {
    country: {
      type: String,
      default: null,
      index: true
    },
    region: {
      type: String,
      default: null
    },
    city: {
      type: String,
      default: null
    },
    timezone: {
      type: String,
      default: null
    }
  },
  // Additional metadata
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for analytics queries
analyticsSchema.index({ event: 1, createdAt: -1 });
analyticsSchema.index({ category: 1, createdAt: -1 });
analyticsSchema.index({ page: 1, createdAt: -1 });
analyticsSchema.index({ sessionId: 1, createdAt: -1 });
analyticsSchema.index({ 'location.country': 1, createdAt: -1 });
analyticsSchema.index({ createdAt: -1 });

// Virtual for formatted date
analyticsSchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
});

// Static methods for analytics queries
analyticsSchema.statics.getPageViews = function(startDate, endDate) {
  const query = { event: 'page_view' };
  if (startDate && endDate) {
    query.createdAt = { $gte: startDate, $lte: endDate };
  }
  return this.find(query).sort({ createdAt: -1 });
};

analyticsSchema.statics.getBlogAnalytics = function(startDate, endDate) {
  const query = { category: 'Blog' };
  if (startDate && endDate) {
    query.createdAt = { $gte: startDate, $lte: endDate };
  }
  return this.find(query).sort({ createdAt: -1 });
};

analyticsSchema.statics.getTopPages = function(limit = 10, startDate, endDate) {
  const matchQuery = { event: 'page_view' };
  if (startDate && endDate) {
    matchQuery.createdAt = { $gte: startDate, $lte: endDate };
  }
  
  return this.aggregate([
    { $match: matchQuery },
    { $group: { _id: '$page', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: limit }
  ]);
};

analyticsSchema.statics.getTopBlogPosts = function(limit = 10, startDate, endDate) {
  const matchQuery = { event: 'blog_view' };
  if (startDate && endDate) {
    matchQuery.createdAt = { $gte: startDate, $lte: endDate };
  }
  
  return this.aggregate([
    { $match: matchQuery },
    { $group: { _id: '$label', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: limit }
  ]);
};

analyticsSchema.statics.getTrafficByCountry = function(limit = 10, startDate, endDate) {
  const matchQuery = { 'location.country': { $ne: null } };
  if (startDate && endDate) {
    matchQuery.createdAt = { $gte: startDate, $lte: endDate };
  }
  
  return this.aggregate([
    { $match: matchQuery },
    { $group: { _id: '$location.country', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: limit }
  ]);
};

analyticsSchema.statics.getDeviceStats = function(startDate, endDate) {
  const matchQuery = {};
  if (startDate && endDate) {
    matchQuery.createdAt = { $gte: startDate, $lte: endDate };
  }
  
  return this.aggregate([
    { $match: matchQuery },
    { $group: { _id: '$device.type', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);
};

analyticsSchema.statics.getDailyStats = function(days = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  return this.aggregate([
    { $match: { createdAt: { $gte: startDate } } },
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' },
          day: { $dayOfMonth: '$createdAt' }
        },
        count: { $sum: 1 },
        pageViews: {
          $sum: { $cond: [{ $eq: ['$event', 'page_view'] }, 1, 0] }
        },
        blogViews: {
          $sum: { $cond: [{ $eq: ['$event', 'blog_view'] }, 1, 0] }
        }
      }
    },
    { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } }
  ]);
};

// Instance methods
analyticsSchema.methods.addMetadata = function(key, value) {
  this.metadata[key] = value;
  this.markModified('metadata');
  return this.save();
};

module.exports = mongoose.model('Analytics', analyticsSchema);

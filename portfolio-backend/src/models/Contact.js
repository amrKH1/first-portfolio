const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email address'
    ]
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
    maxlength: [200, 'Subject cannot exceed 200 characters']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [2000, 'Message cannot exceed 2000 characters']
  },
  phone: {
    type: String,
    trim: true,
    maxlength: [20, 'Phone number cannot exceed 20 characters']
  },
  company: {
    type: String,
    trim: true,
    maxlength: [100, 'Company name cannot exceed 100 characters']
  },
  projectType: {
    type: String,
    enum: ['Web Development', 'Mobile App', 'E-commerce', 'Consulting', 'Other'],
    default: 'Other'
  },
  budget: {
    type: String,
    enum: ['< $5,000', '$5,000 - $15,000', '$15,000 - $50,000', '> $50,000', 'Not specified'],
    default: 'Not specified'
  },
  timeline: {
    type: String,
    enum: ['ASAP', '1-3 months', '3-6 months', '6+ months', 'Flexible'],
    default: 'Flexible'
  },
  source: {
    type: String,
    enum: ['Google Search', 'Social Media', 'Referral', 'Portfolio', 'Blog', 'Other'],
    default: 'Portfolio'
  },
  status: {
    type: String,
    enum: ['new', 'read', 'replied', 'closed'],
    default: 'new',
    index: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium',
    index: true
  },
  notes: {
    type: String,
    maxlength: [1000, 'Notes cannot exceed 1000 characters']
  },
  ipAddress: {
    type: String,
    required: true
  },
  userAgent: {
    type: String,
    required: true
  },
  replied: {
    type: Boolean,
    default: false,
    index: true
  },
  repliedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
contactSchema.index({ email: 1 });
contactSchema.index({ status: 1, createdAt: -1 });
contactSchema.index({ priority: 1, status: 1 });
contactSchema.index({ createdAt: -1 });

// Virtual for formatted date
contactSchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
});

// Virtual for time since submission
contactSchema.virtual('timeAgo').get(function() {
  const now = new Date();
  const diff = now - this.createdAt;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  return 'Just now';
});

// Static methods
contactSchema.statics.getUnreadCount = function() {
  return this.countDocuments({ status: 'new' });
};

contactSchema.statics.getByStatus = function(status) {
  return this.find({ status }).sort({ createdAt: -1 });
};

contactSchema.statics.getByPriority = function(priority) {
  return this.find({ priority }).sort({ createdAt: -1 });
};

contactSchema.statics.getRecentContacts = function(limit = 10) {
  return this.find().sort({ createdAt: -1 }).limit(limit);
};

// Instance methods
contactSchema.methods.markAsRead = function() {
  this.status = 'read';
  return this.save();
};

contactSchema.methods.markAsReplied = function() {
  this.status = 'replied';
  this.replied = true;
  this.repliedAt = new Date();
  return this.save();
};

contactSchema.methods.setPriority = function(priority) {
  this.priority = priority;
  return this.save();
};

// Pre-save middleware
contactSchema.pre('save', function(next) {
  // Auto-set priority based on project type and budget
  if (this.isNew) {
    if (this.projectType === 'Consulting' || this.budget === '> $50,000') {
      this.priority = 'high';
    } else if (this.budget === '$15,000 - $50,000') {
      this.priority = 'medium';
    }
  }
  
  next();
});

module.exports = mongoose.model('Contact', contactSchema);

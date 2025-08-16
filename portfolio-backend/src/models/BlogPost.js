const mongoose = require('mongoose');
const slugify = require('slugify');
const readingTime = require('reading-time');

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    index: true
  },
  excerpt: {
    type: String,
    required: [true, 'Excerpt is required'],
    trim: true,
    maxlength: [500, 'Excerpt cannot exceed 500 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    default: 'Amr Khaled'
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Web Development', 'React', 'CSS', 'JavaScript', 'Node.js', 'Next.js', 'General', 'Tutorial', 'Tips'],
    index: true
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  featuredImage: {
    type: String,
    default: null
  },
  published: {
    type: Boolean,
    default: false,
    index: true
  },
  publishedAt: {
    type: Date,
    default: null
  },
  readingTime: {
    type: String,
    default: '5 min read'
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  seoTitle: {
    type: String,
    maxlength: [60, 'SEO title cannot exceed 60 characters']
  },
  seoDescription: {
    type: String,
    maxlength: [160, 'SEO description cannot exceed 160 characters']
  },
  seoKeywords: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
blogPostSchema.index({ title: 'text', content: 'text', excerpt: 'text' });
blogPostSchema.index({ category: 1, published: 1 });
blogPostSchema.index({ tags: 1, published: 1 });
blogPostSchema.index({ publishedAt: -1 });

// Virtual for formatted date
blogPostSchema.virtual('formattedDate').get(function() {
  if (this.publishedAt) {
    return this.publishedAt.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  return this.createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Pre-save middleware
blogPostSchema.pre('save', function(next) {
  // Generate slug from title
  if (this.isModified('title')) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g
    });
  }
  
  // Calculate reading time
  if (this.isModified('content')) {
    const stats = readingTime(this.content);
    this.readingTime = stats.text;
  }
  
  // Set published date
  if (this.isModified('published') && this.published && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  
  // Generate SEO fields if not provided
  if (!this.seoTitle) {
    this.seoTitle = this.title.substring(0, 60);
  }
  
  if (!this.seoDescription) {
    this.seoDescription = this.excerpt.substring(0, 160);
  }
  
  next();
});

// Static methods
blogPostSchema.statics.findPublished = function() {
  return this.find({ published: true }).sort({ publishedAt: -1 });
};

blogPostSchema.statics.findByCategory = function(category) {
  return this.find({ category, published: true }).sort({ publishedAt: -1 });
};

blogPostSchema.statics.findByTag = function(tag) {
  return this.find({ tags: tag, published: true }).sort({ publishedAt: -1 });
};

blogPostSchema.statics.search = function(query) {
  return this.find({
    $and: [
      { published: true },
      {
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { content: { $regex: query, $options: 'i' } },
          { excerpt: { $regex: query, $options: 'i' } },
          { tags: { $in: [new RegExp(query, 'i')] } }
        ]
      }
    ]
  }).sort({ publishedAt: -1 });
};

// Instance methods
blogPostSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

blogPostSchema.methods.getRelatedPosts = function(limit = 3) {
  return this.constructor.find({
    _id: { $ne: this._id },
    published: true,
    $or: [
      { category: this.category },
      { tags: { $in: this.tags } }
    ]
  })
  .sort({ publishedAt: -1 })
  .limit(limit);
};

module.exports = mongoose.model('BlogPost', blogPostSchema);

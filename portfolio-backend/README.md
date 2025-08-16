# Portfolio Backend Server

A robust Node.js/Express backend server for the Amr Khaled portfolio website with blog system, contact management, and analytics.

## Features

- **Blog Management**: Full CRUD operations for blog posts
- **Contact System**: Contact form handling with email notifications
- **Analytics Tracking**: Comprehensive event tracking and statistics
- **Admin Dashboard**: Administrative interface for content management
- **Security**: Rate limiting, input validation, and security headers
- **Database**: MongoDB with Mongoose ODM
- **Email**: SMTP email notifications for contact forms

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT tokens
- **Validation**: Express Validator
- **Email**: Nodemailer
- **Security**: Helmet, CORS, Rate Limiting

## Quick Start

### 1. Installation

```bash
cd portfolio-backend
npm install
```

### 2. Environment Setup

Copy the example environment file and configure:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio_blog
JWT_SECRET=your-super-secret-jwt-key
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### 3. Database Setup

Make sure MongoDB is running locally or provide a MongoDB Atlas connection string.

### 4. Start the Server

```bash
# Development
npm run dev

# Production
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Blog Endpoints

- `GET /api/blog` - Get all published blog posts
- `GET /api/blog/:slug` - Get single blog post by slug
- `GET /api/blog/categories` - Get all categories
- `GET /api/blog/tags` - Get all tags
- `GET /api/blog/search?q=query` - Search blog posts
- `GET /api/blog/category/:category` - Get posts by category
- `POST /api/blog` - Create new blog post (admin)

### Contact Endpoints

- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (admin)
- `GET /api/contact/:id` - Get single contact (admin)
- `PUT /api/contact/:id/status` - Update contact status (admin)
- `GET /api/contact/stats/summary` - Get contact statistics (admin)

### Analytics Endpoints

- `POST /api/analytics/track` - Track single event
- `POST /api/analytics/batch` - Track multiple events
- `GET /api/analytics/stats` - Get analytics statistics (admin)
- `GET /api/analytics/events` - Get analytics events (admin)
- `GET /api/analytics/realtime` - Get real-time analytics (admin)

### Admin Endpoints

- `POST /api/admin/login` - Admin login
- `GET /api/admin/dashboard` - Dashboard data (admin)
- `GET /api/admin/blog` - Get all blog posts including drafts (admin)
- `PUT /api/admin/blog/:id` - Update blog post (admin)
- `DELETE /api/admin/blog/:id` - Delete blog post (admin)
- `GET /api/admin/contacts` - Get all contacts (admin)

### Health Check

- `GET /health` - Server health check

## Data Models

### BlogPost

```javascript
{
  title: String,
  slug: String,
  excerpt: String,
  content: String,
  author: String,
  category: String,
  tags: [String],
  featuredImage: String,
  published: Boolean,
  publishedAt: Date,
  readingTime: String,
  views: Number,
  likes: Number,
  seoTitle: String,
  seoDescription: String,
  seoKeywords: [String]
}
```

### Contact

```javascript
{
  name: String,
  email: String,
  subject: String,
  message: String,
  phone: String,
  company: String,
  projectType: String,
  budget: String,
  timeline: String,
  source: String,
  status: String,
  priority: String,
  notes: String,
  ipAddress: String,
  userAgent: String,
  replied: Boolean,
  repliedAt: Date
}
```

### Analytics

```javascript
{
  event: String,
  category: String,
  action: String,
  label: String,
  value: Number,
  sessionId: String,
  userId: String,
  ipAddress: String,
  userAgent: String,
  referrer: String,
  page: String,
  pageTitle: String,
  device: {
    type: String,
    browser: String,
    os: String,
    screenResolution: String
  },
  location: {
    country: String,
    region: String,
    city: String,
    timezone: String
  },
  metadata: Object
}
```

## Security Features

- **Rate Limiting**: Prevents abuse with configurable limits
- **Input Validation**: All inputs validated and sanitized
- **CORS**: Configured for frontend domain
- **Helmet**: Security headers for protection
- **JWT Authentication**: Secure admin authentication
- **Password Hashing**: Bcrypt for password security

## Email Configuration

The server supports SMTP email notifications for contact forms:

1. **Gmail Setup**:
   - Enable 2-factor authentication
   - Generate an app password
   - Use app password in `SMTP_PASS`

2. **Other SMTP Providers**:
   - Update `SMTP_HOST` and `SMTP_PORT`
   - Provide credentials in `SMTP_USER` and `SMTP_PASS`

## Development

### Running Tests

```bash
npm test
```

### Code Structure

```
src/
├── config/
│   └── database.js          # MongoDB connection
├── models/
│   ├── BlogPost.js          # Blog post model
│   ├── Contact.js           # Contact model
│   └── Analytics.js         # Analytics model
├── routes/
│   ├── blog.js              # Blog routes
│   ├── contact.js           # Contact routes
│   ├── analytics.js         # Analytics routes
│   └── admin.js             # Admin routes
├── utils/
│   └── analytics.js         # Analytics utilities
└── server.js                # Main server file
```

## Deployment

### Environment Variables

Set these in production:

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/portfolio
JWT_SECRET=your-production-jwt-secret
FRONTEND_URL=https://amrkhaled.dev
```

### PM2 Deployment

```bash
npm install -g pm2
pm2 start src/server.js --name portfolio-backend
pm2 startup
pm2 save
```

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## Monitoring

- Health check endpoint: `/health`
- PM2 monitoring: `pm2 monit`
- Logs: `pm2 logs portfolio-backend`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

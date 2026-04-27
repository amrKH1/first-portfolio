# Portfolio Customization Guide

This guide will help you personalize your portfolio with your own information, projects, and branding.

## 🎯 Quick Start Checklist

- [ ] Update personal information (name, email, location)
- [ ] Replace placeholder images with your photos
- [ ] Add your actual projects and descriptions
- [ ] Update skills and technologies
- [ ] Modify work experience timeline
- [ ] Customize colors and branding
- [ ] Update social media links
- [ ] Test on different devices
- [ ] Deploy to hosting service

## 📝 Content Updates

### 1. Personal Information (index.html)

**Lines to update:**
- Line 11: `<title>Your Name - Web & App Developer</title>`
- Line 29: `<a href="#home">YourName<span class="logo-dot">.</span></a>`
- Line 52: `Hi, I'm <span class="highlight">Your Name</span>`
- Line 67-71: Social media links
- Line 75: Email link

**Search and replace:**
- "Your Name" → Your actual name
- "your.email@example.com" → Your email address
- "yourusername" → Your social media usernames

### 2. About Section Content

**Update these sections:**
- Personal description paragraphs (lines 95-105)
- Statistics (lines 107-119):
  - Projects completed
  - Years of experience
  - Happy clients

### 3. Skills Section

**Customize skill categories:**
- Frontend Development (lines 135-165)
- Backend Development (lines 168-198)
- Mobile Development (lines 201-231)
- Tools & Others (lines 234-264)

**Add/remove skills:**
```html
<div class="skill-item">
    <i class="fab fa-react"></i>
    <span>React</span>
</div>
```

### 4. Projects Section

**For each project (6 total), update:**
- Project image (`src="assets/projectX.jpg"`)
- Project title
- Description
- Technology tags
- Live demo link
- GitHub repository link

**Example project structure:**
```html
<div class="project-card" data-aos="fade-up" data-aos-delay="100">
    <div class="project-image">
        <img src="assets/your-project.jpg" alt="Your Project">
        <div class="project-overlay">
            <div class="project-links">
                <a href="https://your-live-demo.com" class="project-link" target="_blank">
                    <i class="fas fa-external-link-alt"></i>
                </a>
                <a href="https://github.com/yourusername/project" class="project-link" target="_blank">
                    <i class="fab fa-github"></i>
                </a>
            </div>
        </div>
    </div>
    <div class="project-content">
        <h3 class="project-title">Your Project Name</h3>
        <p class="project-description">Your project description...</p>
        <div class="project-tech">
            <span class="tech-tag">React</span>
            <span class="tech-tag">Node.js</span>
        </div>
    </div>
</div>
```

### 5. Experience Timeline

**Update work experience (lines 400-550):**
- Job titles and companies
- Employment dates
- Job descriptions
- Skills used in each role

## 🎨 Visual Customization

### 1. Color Scheme (css/style.css)

**Primary colors to change:**
- `#007bff` - Main brand color (blue)
- `#0056b3` - Darker brand color
- `#f8f9fa` - Light background
- `#333` - Dark text color
- `#666` - Medium text color

**Find and replace these colors throughout the CSS file.**

### 2. Typography

**Current font:** Inter (Google Fonts)
**To change font:**
1. Update Google Fonts link in HTML head
2. Change `font-family: 'Inter', sans-serif;` in CSS

### 3. Layout Adjustments

**Common modifications:**
- Section padding: Look for `padding: 100px 0;`
- Container width: `.container { max-width: 1200px; }`
- Grid gaps: `gap: 2rem;` or similar
- Border radius: `border-radius: 20px;` values

## 🖼️ Image Guidelines

### Profile Photos
- **Hero image**: 400x400px, professional headshot
- **About image**: 400x500px, full-body or different angle
- **Format**: JPG or WebP for best compression
- **Quality**: High resolution but web-optimized

### Project Screenshots
- **Size**: 600x400px (3:2 aspect ratio)
- **Content**: Show key features of your projects
- **Consistency**: Use similar styling/filters across all images
- **Format**: JPG or PNG depending on content

### Optimization Tips
```bash
# Using ImageOptim, TinyPNG, or similar tools
# Target file sizes:
# - Profile photos: 50-100KB
# - Project images: 100-200KB
# - Total assets: Under 2MB
```

## 🔧 Technical Customizations

### 1. Contact Form Integration

**Option 1: Formspree**
```html
<form class="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

**Option 2: Netlify Forms**
```html
<form class="contact-form" name="contact" method="POST" data-netlify="true">
```

**Option 3: EmailJS**
```javascript
// Add EmailJS integration in script.js
emailjs.send("service_id", "template_id", formData)
```

### 2. Analytics Integration

**Google Analytics 4:**
```html
<!-- Add before closing </head> tag -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 3. Performance Optimizations

**Lazy loading images:**
```html
<img src="assets/project1.jpg" alt="Project" loading="lazy">
```

**Preload critical resources:**
```html
<link rel="preload" href="css/style.css" as="style">
<link rel="preload" href="js/script.js" as="script">
```

## 📱 Mobile Optimization

### Testing Checklist
- [ ] Navigation menu works on mobile
- [ ] All text is readable without zooming
- [ ] Buttons are easily tappable (44px minimum)
- [ ] Images scale properly
- [ ] Contact form is usable
- [ ] Page loads quickly on 3G

### Common Mobile Issues
1. **Text too small**: Increase font sizes in media queries
2. **Buttons too small**: Increase padding and touch targets
3. **Images not responsive**: Add `max-width: 100%; height: auto;`
4. **Horizontal scrolling**: Check for fixed widths

## 🚀 Deployment

### GitHub Pages
1. Create repository named `username.github.io`
2. Upload files to repository
3. Enable GitHub Pages in settings
4. Access at `https://username.github.io`

### Netlify
1. Drag and drop project folder to Netlify
2. Configure custom domain if desired
3. Enable form handling for contact form

### Custom Domain
1. Purchase domain from registrar
2. Update DNS settings to point to hosting service
3. Configure SSL certificate
4. Update social media links with new domain

## 🔍 SEO Optimization

### Meta Tags Checklist
- [ ] Title tags (50-60 characters)
- [ ] Meta descriptions (150-160 characters)
- [ ] Open Graph tags for social sharing
- [ ] Twitter Card tags
- [ ] Canonical URLs
- [ ] Alt text for all images

### Content Optimization
- [ ] Use heading hierarchy (H1, H2, H3)
- [ ] Include relevant keywords naturally
- [ ] Add schema markup for structured data
- [ ] Create XML sitemap
- [ ] Submit to Google Search Console

## 🧪 Testing

### Browser Testing
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

### Performance Testing
- Google PageSpeed Insights
- GTmetrix
- WebPageTest
- Lighthouse audit

### Accessibility Testing
- WAVE Web Accessibility Evaluator
- axe DevTools
- Keyboard navigation testing
- Screen reader testing

## 📞 Support

If you need help with customization:
1. Check this guide first
2. Search for similar issues online
3. Test changes in small increments
4. Keep backups of working versions
5. Ask for help in developer communities

Remember: Make one change at a time and test thoroughly before moving to the next customization!

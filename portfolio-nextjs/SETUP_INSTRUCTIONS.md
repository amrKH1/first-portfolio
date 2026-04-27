# 🚀 Next.js Portfolio Setup Instructions

## 📋 Prerequisites

Make sure you have the following installed on your system:

1. **Node.js** (version 18 or higher)
   - Download from: https://nodejs.org/
   - Choose the LTS version

2. **npm** (comes with Node.js)
   - Or you can use **yarn** or **pnpm** as alternatives

## 🛠️ Setup Steps

### 1. Navigate to the Project Directory
```bash
cd portfolio-nextjs
```

### 2. Install Dependencies
```bash
npm install
```

This will install all required packages:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion (for animations)
- AOS (Animate on Scroll)

### 3. Start Development Server
```bash
npm run dev
```

### 4. Open in Browser
The application will be available at:
**http://localhost:3000**

## 📁 Add Your Images

Before running, add your images to the `public/assets/` directory:

### Required Images:
- `hero-image.jpg` (400x400px) - Your professional headshot
- `about-image.jpg` (400x500px) - Another professional photo
- `project1.jpg` through `project6.jpg` (600x400px) - Your project screenshots
- `favicon.ico` - Website favicon

### Temporary Solution:
If you don't have images ready, the components will show broken image placeholders, but all functionality will work.

## 🎯 Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 🔧 Troubleshooting

### If npm install fails:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### If development server won't start:
```bash
# Check if port 3000 is in use
netstat -ano | findstr :3000

# Use different port
npm run dev -- -p 3001
```

### If you see TypeScript errors:
The project is configured with TypeScript, but all components are properly typed. Any errors should resolve after installing dependencies.

## 🌐 Deployment Options

### 1. Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### 2. Netlify
```bash
# Build the project
npm run build

# Upload the 'out' folder to Netlify
```

### 3. GitHub Pages
```bash
# Build static export
npm run build

# Deploy the 'out' folder to GitHub Pages
```

## 📊 What You'll See

When you run the project, you'll see:

1. **Navigation Bar** - Fixed header with smooth scrolling
2. **Hero Section** - Animated typing effect with your name
3. **About Section** - Animated counters and description
4. **Skills Section** - Interactive skill cards with hover effects
5. **Projects Section** - 6 project cards with overlays
6. **Experience Section** - Timeline of work experience
7. **Contact Section** - Working contact form
8. **Footer** - Simple footer with links

## 🎨 Customization

### Update Personal Information:
- Edit components in `src/components/`
- Update contact info in `Contact.tsx`
- Modify social links in `Hero.tsx`
- Change project data in `Projects.tsx`

### Styling:
- Global styles: `src/app/globals.css`
- Tailwind config: `tailwind.config.ts`
- Component styles: Inline with Tailwind classes

## 🚀 Performance Features

Your Next.js portfolio includes:
- **Automatic Code Splitting**
- **Image Optimization**
- **Static Site Generation**
- **SEO Optimization**
- **Performance Monitoring**

## 📞 Need Help?

If you encounter any issues:
1. Check the console for error messages
2. Ensure all dependencies are installed
3. Verify Node.js version (18+)
4. Check that all required files are present

## 🎉 Success!

Once running, your portfolio will be:
- ✅ Fully responsive
- ✅ Optimized for performance
- ✅ SEO-ready
- ✅ Production-ready
- ✅ Easy to maintain and extend

Enjoy your modern Next.js portfolio! 🚀

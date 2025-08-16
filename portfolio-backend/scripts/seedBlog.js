const mongoose = require('mongoose');
require('dotenv').config();

const BlogPost = require('../src/models/BlogPost');

// Sample blog posts data
const samplePosts = [
  {
    title: "Getting Started with Next.js 14: A Complete Guide",
    excerpt: "Discover the latest features in Next.js 14 and learn how to build modern, performant web applications with the newest React framework capabilities.",
    content: `# Getting Started with Next.js 14: A Complete Guide

Next.js 14 has arrived with exciting new features that make building modern web applications even more powerful and efficient. In this comprehensive guide, we'll explore the key improvements and learn how to leverage them in your projects.

## What's New in Next.js 14?

### 1. Turbopack (Stable)

Next.js 14 introduces Turbopack as the stable bundler, offering:

- **53% faster local server startup**
- **94% faster code updates with Fast Refresh**
- Improved build performance for large applications

\`\`\`javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
}

module.exports = nextConfig
\`\`\`

### 2. Server Actions (Stable)

Server Actions are now stable, providing a seamless way to handle server-side logic:

\`\`\`typescript
// app/actions.ts
'use server'

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string
  const content = formData.get('content') as string
  
  // Database logic here
  await savePost({ title, content })
  
  revalidatePath('/blog')
  redirect('/blog')
}
\`\`\`

## Setting Up Your Next.js 14 Project

### Installation

\`\`\`bash
npx create-next-app@latest my-app
cd my-app
npm run dev
\`\`\`

### Project Structure

\`\`\`
my-app/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── blog/
│       ├── page.tsx
│       └── [slug]/
│           └── page.tsx
├── components/
├── lib/
└── public/
\`\`\`

## Key Features to Leverage

### 1. App Router

The App Router provides a more intuitive file-based routing system:

\`\`\`typescript
// app/blog/[slug]/page.tsx
interface PageProps {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function Page({ params, searchParams }: PageProps) {
  return <div>Blog post: {params.slug}</div>
}
\`\`\`

### 2. Server Components

Leverage Server Components for better performance:

\`\`\`typescript
// app/components/BlogList.tsx
import { getPosts } from '@/lib/blog'

export default async function BlogList() {
  const posts = await getPosts()
  
  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  )
}
\`\`\`

## Performance Optimization Tips

### 1. Image Optimization

\`\`\`typescript
import Image from 'next/image'

export default function BlogPost() {
  return (
    <Image
      src="/blog-image.jpg"
      alt="Blog post image"
      width={800}
      height={400}
      priority
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..."
    />
  )
}
\`\`\`

## Conclusion

Next.js 14 brings significant improvements in performance, developer experience, and new capabilities. The stable Turbopack bundler, Server Actions, and experimental Partial Prerendering make it an excellent choice for modern web development.

Start experimenting with these features in your next project and experience the improved development workflow and performance benefits that Next.js 14 offers.`,
    author: "Amr Khaled",
    category: "Web Development",
    tags: ["Next.js", "React", "JavaScript", "Web Development", "Frontend"],
    published: true,
    publishedAt: new Date('2024-01-15')
  },
  {
    title: "Modern CSS Techniques Every Developer Should Know in 2024",
    excerpt: "Explore the latest CSS features and techniques that will revolutionize your web development workflow, from container queries to CSS layers.",
    content: `# Modern CSS Techniques Every Developer Should Know in 2024

CSS has evolved tremendously in recent years, introducing powerful features that make styling more intuitive and maintainable. Let's explore the most impactful CSS techniques that every developer should master in 2024.

## 1. Container Queries: The Game Changer

Container queries allow components to respond to their container's size rather than the viewport size.

\`\`\`css
.card-container {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 1rem;
  }
}

@container card (max-width: 399px) {
  .card {
    display: block;
  }
  
  .card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
}
\`\`\`

## 2. CSS Cascade Layers

Cascade layers provide explicit control over the cascade, making CSS more predictable.

\`\`\`css
@layer reset, base, components, utilities;

@layer reset {
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
}

@layer base {
  body {
    font-family: system-ui, sans-serif;
    line-height: 1.6;
  }
}

@layer components {
  .button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.25rem;
    background: blue;
    color: white;
  }
}
\`\`\`

## 3. CSS Nesting

Native CSS nesting is now supported in modern browsers.

\`\`\`css
.card {
  padding: 1rem;
  border-radius: 0.5rem;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  & h2 {
    margin-bottom: 0.5rem;
    color: #333;
  }
  
  & p {
    color: #666;
    line-height: 1.6;
  }
  
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
}
\`\`\`

## 4. CSS :has() Selector

The :has() pseudo-class allows parent selection based on child elements.

\`\`\`css
/* Style form when it has invalid inputs */
.form:has(input:invalid) {
  border: 2px solid red;
}

/* Style card differently when it has an image */
.card:has(img) {
  display: grid;
  grid-template-columns: 200px 1fr;
}

.card:not(:has(img)) {
  padding: 2rem;
}
\`\`\`

## Conclusion

These modern CSS techniques provide powerful tools for creating more maintainable, responsive, and performant web interfaces. Start incorporating them into your projects to take advantage of the latest CSS capabilities.`,
    author: "Amr Khaled",
    category: "CSS",
    tags: ["CSS", "Web Development", "Frontend", "Design", "Responsive Design"],
    published: true,
    publishedAt: new Date('2024-01-10')
  },
  {
    title: "React Performance Optimization: Advanced Techniques for 2024",
    excerpt: "Master advanced React performance optimization techniques including concurrent features, server components, and modern bundling strategies.",
    content: `# React Performance Optimization: Advanced Techniques for 2024

React applications can become slow as they grow in complexity. In this comprehensive guide, we'll explore advanced performance optimization techniques that will keep your React apps fast and responsive.

## Understanding React Performance

### The React Rendering Process

React's rendering process involves several phases:

1. **Trigger**: State changes or prop updates
2. **Render**: Creating virtual DOM representation
3. **Commit**: Updating the actual DOM
4. **Effects**: Running side effects

## 1. React.memo and Memoization

### Basic Memoization

\`\`\`typescript
import React, { memo, useMemo, useCallback } from 'react'

interface UserCardProps {
  user: User
  onEdit: (id: string) => void
}

const UserCard = memo(({ user, onEdit }: UserCardProps) => {
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <button onClick={() => onEdit(user.id)}>Edit</button>
    </div>
  )
})
\`\`\`

### Advanced Memoization Patterns

\`\`\`typescript
function UserList({ users, searchTerm }: UserListProps) {
  // Memoize expensive calculations
  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [users, searchTerm])
  
  // Memoize callback functions
  const handleUserEdit = useCallback((userId: string) => {
    // Edit logic here
    console.log('Editing user:', userId)
  }, [])
  
  return (
    <div>
      {filteredUsers.map(user => (
        <UserCard
          key={user.id}
          user={user}
          onEdit={handleUserEdit}
        />
      ))}
    </div>
  )
}
\`\`\`

## 2. Code Splitting and Lazy Loading

### Component-Level Code Splitting

\`\`\`typescript
import { lazy, Suspense } from 'react'

// Lazy load components
const Dashboard = lazy(() => import('./Dashboard'))
const UserProfile = lazy(() => import('./UserProfile'))
const Settings = lazy(() => import('./Settings'))

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Suspense>
    </Router>
  )
}
\`\`\`

## 3. React Concurrent Features

### useTransition for Non-Urgent Updates

\`\`\`typescript
import { useTransition, useDeferredValue, useState } from 'react'

function SearchableUserList() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isPending, startTransition] = useTransition()
  const deferredSearchTerm = useDeferredValue(searchTerm)
  
  const handleSearch = (value: string) => {
    setSearchTerm(value)
    
    // Mark filtering as non-urgent
    startTransition(() => {
      // This update has lower priority
      filterUsers(value)
    })
  }
  
  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search users..."
      />
      
      {isPending && <div>Searching...</div>}
      
      <UserList searchTerm={deferredSearchTerm} />
    </div>
  )
}
\`\`\`

## Best Practices Summary

1. **Profile First**: Use React DevTools Profiler to identify bottlenecks
2. **Memoize Wisely**: Don't over-memoize; measure the impact
3. **Split Code**: Lazy load components and libraries
4. **Optimize State**: Keep state close to where it's used
5. **Virtual Scrolling**: For large lists and tables
6. **Concurrent Features**: Use useTransition for non-urgent updates

## Conclusion

React performance optimization is an ongoing process that requires careful measurement and strategic implementation. Focus on the biggest bottlenecks first, and always measure the impact of your optimizations.

Remember: premature optimization is the root of all evil. Profile first, optimize second.`,
    author: "Amr Khaled",
    category: "React",
    tags: ["React", "Performance", "JavaScript", "Web Development", "Optimization"],
    published: true,
    publishedAt: new Date('2024-01-05')
  }
];

async function seedBlog() {
  try {
    // Connect to MongoDB
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio_blog';
    await mongoose.connect(mongoURI);
    console.log('📦 Connected to MongoDB');

    // Clear existing blog posts
    await BlogPost.deleteMany({});
    console.log('🗑️  Cleared existing blog posts');

    // Insert sample posts
    const insertedPosts = await BlogPost.insertMany(samplePosts);
    console.log(`✅ Inserted ${insertedPosts.length} blog posts`);

    // Display inserted posts
    insertedPosts.forEach(post => {
      console.log(`   - ${post.title} (${post.slug})`);
    });

    console.log('🎉 Blog seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding blog:', error);
  } finally {
    await mongoose.connection.close();
    console.log('📦 MongoDB connection closed');
  }
}

// Run the seeding function
if (require.main === module) {
  seedBlog();
}

module.exports = seedBlog;

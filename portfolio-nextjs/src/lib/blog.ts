import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog')

export interface PostMeta {
  slug: string
  title: string
  description: string
  date: string
  category: string
  tags: string[]
  image: string
  featured?: boolean
  readingTime: string
}

export interface Post extends PostMeta {
  content: string
}

function ensureBlogDir() {
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true })
  }
}

export function getAllPosts(): PostMeta[] {
  ensureBlogDir()
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'))

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, '')
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8')
    const { data, content } = matter(raw)
    return {
      slug,
      title: data.title || slug,
      description: data.description || '',
      date: data.date || new Date().toISOString().split('T')[0],
      category: data.category || 'general',
      tags: Array.isArray(data.tags) ? data.tags : [],
      image: data.image || '/assets/placeholder-01.svg',
      featured: data.featured === true,
      readingTime: readingTime(content).text,
    }
  })

  return posts.sort((a, b) => +new Date(b.date) - +new Date(a.date))
}

export function getPostBySlug(slug: string): Post | null {
  ensureBlogDir()
  const fullPath = path.join(BLOG_DIR, `${slug}.mdx`)
  if (!fs.existsSync(fullPath)) return null

  const raw = fs.readFileSync(fullPath, 'utf-8')
  const { data, content } = matter(raw)

  return {
    slug,
    title: data.title || slug,
    description: data.description || '',
    date: data.date || new Date().toISOString().split('T')[0],
    category: data.category || 'general',
    tags: Array.isArray(data.tags) ? data.tags : [],
    image: data.image || '/assets/placeholder-01.svg',
    featured: data.featured === true,
    readingTime: readingTime(content).text,
    content,
  }
}

export function getAllCategories(): { id: string; label: string; count: number }[] {
  const posts = getAllPosts()
  const counts: Record<string, number> = {}

  posts.forEach((post) => {
    counts[post.category] = (counts[post.category] || 0) + 1
  })

  const categories = Object.entries(counts).map(([id, count]) => ({
    id,
    label: id.charAt(0).toUpperCase() + id.slice(1),
    count,
  }))

  return [{ id: 'all', label: 'All Posts', count: posts.length }, ...categories]
}

export function getAllSlugs(): string[] {
  ensureBlogDir()
  return fs.readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}

'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowUpRight,
  Calendar,
  Clock,
  Hash,
  Search,
  X,
  Sparkles,
} from 'lucide-react'

interface BlogPost {
  slug: string
  title: string
  description: string
  category: string
  image: string
  date: string
  readingTime: string
  tags: string[]
  featured?: boolean
}

interface BlogListProps {
  posts: BlogPost[]
}

const BlogList = ({ posts }: BlogListProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)

  const categoryCounts: Record<string, number> = {}
  posts.forEach((post) => {
    categoryCounts[post.category] = (categoryCounts[post.category] || 0) + 1
  })

  const categories = [
    { id: 'all', label: 'All Posts', count: posts.length },
    ...Object.entries(categoryCounts).map(([id, count]) => ({
      id,
      label: id.charAt(0).toUpperCase() + id.slice(1),
      count,
    })),
  ]

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === 'all' || post.category === selectedCategory
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
    return matchesCategory && matchesSearch
  })

  const featuredPost = posts.find((post) => post.featured)
  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags)))

  return (
    <section id="blog" className="min-h-screen bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-4"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          >
            <Sparkles className="w-5 h-5 text-black dark:text-white" />
            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              BLOG & INSIGHTS
            </h2>
            <Sparkles className="w-5 h-5 text-black dark:text-white" />
          </motion.div>
          <h1 className="text-5xl lg:text-7xl font-bold text-black dark:text-white mb-4">
            Latest Articles
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Thoughts on development, design, and the tech industry
          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === cat.id
                      ? 'bg-black dark:bg-white text-white dark:text-black'
                      : 'bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800'
                  }`}
                >
                  {cat.label}
                  <span className="ml-2 text-xs opacity-60">({cat.count})</span>
                </button>
              ))}
            </div>

            {/* Search Toggle */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            >
              {showSearch ? (
                <X className="w-5 h-5" />
              ) : (
                <Search className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Search Input */}
          <AnimatePresence>
            {showSearch && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 overflow-hidden"
              >
                <input
                  type="text"
                  placeholder="Search articles by title, content, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Featured Post */}
        {featuredPost && !searchQuery && selectedCategory === 'all' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="relative group cursor-pointer rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-900">
              <Link href={`/blog/${featuredPost.slug}`}>
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative h-64 lg:h-96">
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      fill
                      className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 left-4 bg-black dark:bg-white text-white dark:text-black px-3 py-1 rounded-full text-xs font-semibold">
                      Featured
                    </div>
                  </div>

                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(featuredPost.date).toLocaleDateString(
                          'en-US',
                          {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          }
                        )}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {featuredPost.readingTime}
                      </span>
                    </div>

                    <h3 className="text-2xl lg:text-3xl font-bold text-black dark:text-white mb-3 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                      {featuredPost.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">
                      {featuredPost.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        {featuredPost.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-200 dark:bg-gray-800 text-xs rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <ArrowUpRight className="w-5 h-5 text-black dark:text-white group-hover:rotate-45 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </motion.div>
        )}

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Posts Grid */}
          <div className="lg:col-span-2">
            <div className="grid gap-6">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="flex flex-col sm:flex-row gap-6 p-6 rounded-xl bg-white dark:bg-black border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-300">
                      <div className="relative w-full sm:w-48 h-48 sm:h-32 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900 flex-shrink-0">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-2">
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-900 rounded">
                            {post.category}
                          </span>
                          <span>
                            {new Date(post.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </span>
                          <span>{post.readingTime}</span>
                        </div>

                        <h3 className="text-xl font-bold text-black dark:text-white mb-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                          {post.title}
                        </h3>

                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                          {post.description}
                        </p>

                        <div className="flex items-center gap-2">
                          {post.tags.slice(0, 3).map((tag, i) => (
                            <span
                              key={i}
                              className="text-xs text-gray-500 dark:text-gray-400"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-6 bg-gray-50 dark:bg-gray-950 rounded-xl"
            >
              <h3 className="text-lg font-bold text-black dark:text-white mb-4 flex items-center gap-2">
                <Hash className="w-5 h-5" />
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="px-3 py-1 bg-gray-200 dark:bg-gray-800 text-sm rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BlogList

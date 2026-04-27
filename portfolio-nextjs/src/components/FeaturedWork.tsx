'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Github, ExternalLink, ChevronLeft, ChevronRight, Code2, Palette, Zap } from 'lucide-react'

const FeaturedWork = () => {
  const [activeProject, setActiveProject] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const projects = [
    {
      id: 1,
      number: '01',
      title: 'E-Commerce Platform',
      subtitle: 'Full-Stack Development',
      description: 'Modern e-commerce solution with real-time inventory management, secure payment processing, and comprehensive admin dashboard.',
      longDescription: 'Built a scalable e-commerce platform handling 10K+ daily transactions. Implemented real-time inventory tracking, secure payment processing with Stripe, and a comprehensive admin dashboard for business analytics.',
      image: '/assets/placeholder-01.svg',
      tags: ['Next.js', 'Node.js', 'MongoDB', 'Stripe', 'Redis'],
      liveUrl: '#',
      githubUrl: 'https://github.com/amrkhaled',
      stats: {
        users: '10K+',
        performance: '99.9%',
        rating: '4.8'
      },
      icon: <Code2 className="w-6 h-6" />
    },
    {
      id: 2,
      number: '02',
      title: 'SaaS Analytics Dashboard',
      subtitle: 'UI/UX & Frontend',
      description: 'Real-time analytics platform with advanced data visualization and AI-powered insights for business intelligence.',
      longDescription: 'Designed and developed a comprehensive analytics dashboard processing millions of data points in real-time. Features include custom data visualization, predictive analytics, and automated reporting.',
      image: '/assets/placeholder-02.svg',
      tags: ['React', 'TypeScript', 'D3.js', 'Tailwind', 'WebSocket'],
      liveUrl: '#',
      githubUrl: 'https://github.com/amrkhaled',
      stats: {
        users: '5K+',
        performance: '98%',
        rating: '4.9'
      },
      icon: <Palette className="w-6 h-6" />
    },
    {
      id: 3,
      number: '03',
      title: 'Mobile Banking App',
      subtitle: 'React Native Development',
      description: 'Secure mobile banking application with biometric authentication and blockchain-powered transactions.',
      longDescription: 'Developed a secure mobile banking solution serving 50K+ users. Integrated biometric authentication, blockchain technology for secure transactions, and real-time fraud detection.',
      image: '/assets/placeholder-03.svg',
      tags: ['React Native', 'Node.js', 'PostgreSQL', 'JWT', 'Blockchain'],
      liveUrl: '#',
      githubUrl: 'https://github.com/amrkhaled',
      stats: {
        users: '50K+',
        performance: '99.99%',
        rating: '4.7'
      },
      icon: <Zap className="w-6 h-6" />
    }
  ]

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setActiveProject((prev) => (prev + 1) % projects.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, projects.length])

  const nextProject = () => {
    setIsAutoPlaying(false)
    setActiveProject((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setIsAutoPlaying(false)
    setActiveProject((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const currentProject = projects[activeProject]

  return (
    <section id="featured-work" className="relative py-20 bg-white dark:bg-black overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            FEATURED CASE STUDIES
          </h2>
          <h3 className="text-4xl md:text-6xl font-bold text-black dark:text-white mb-4">
            Curated Work
          </h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Experience my projects through an interactive showcase
          </p>
        </motion.div>

        {/* Main Project Display */}
        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Project Info */}
            <motion.div
              key={currentProject.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Project Number */}
              <div className="flex items-center gap-4">
                <span className="text-8xl font-bold text-black dark:text-white opacity-20">
                  {currentProject.number}
                </span>
                <div className="p-3 rounded-xl bg-black dark:bg-white text-white dark:text-black">
                  {currentProject.icon}
                </div>
              </div>

              {/* Project Title & Description */}
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  {currentProject.subtitle}
                </p>
                <h4 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
                  {currentProject.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                  {currentProject.longDescription}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {currentProject.tags.map((tag, index) => (
                  <motion.span
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>

              {/* Stats */}
              <div className="flex gap-6">
                <div>
                  <p className="text-2xl font-bold text-black dark:text-white">{currentProject.stats.users}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Active Users</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-black dark:text-white">{currentProject.stats.performance}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Uptime</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-black dark:text-white">{currentProject.stats.rating}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">User Rating</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <motion.a
                  href={currentProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-semibold flex items-center gap-2 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                >
                  View Live Site
                  <ExternalLink className="w-4 h-4" />
                </motion.a>
                <motion.a
                  href={currentProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 border-2 border-black dark:border-white text-black dark:text-white rounded-full font-semibold flex items-center gap-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                >
                  <Github className="w-4 h-4" />
                  Source Code
                </motion.a>
              </div>
            </motion.div>

            {/* Right: Project Image */}
            <motion.div
              key={`image-${currentProject.id}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className="relative group"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-100 dark:bg-gray-900">
                <Image
                  src={currentProject.image}
                  alt={currentProject.title}
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover filter grayscale hover:grayscale-0 transition-all duration-700"

                />
                {/* Overlay with project number */}
                <div className="absolute top-4 left-4 bg-black/80 dark:bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-white dark:text-black font-bold">{currentProject.number}/{projects.length.toString().padStart(2, '0')}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevProject}
              className="p-3 rounded-full bg-gray-100 dark:bg-gray-900 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            {/* Progress Indicators */}
            <div className="flex gap-2">
              {projects.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setActiveProject(index)
                    setIsAutoPlaying(false)
                  }}
                  whileHover={{ scale: 1.2 }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === activeProject 
                      ? 'w-12 bg-black dark:bg-white'
                      : 'w-2 bg-gray-300 dark:bg-gray-700'
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextProject}
              className="p-3 rounded-full bg-gray-100 dark:bg-gray-900 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Auto-play indicator */}
          <div className="text-center mt-4">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            >
              {isAutoPlaying ? '⏸ Pause auto-play' : '▶ Resume auto-play'}
            </button>
          </div>
        </div>

        {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <Link
            href="/work"
            className="inline-flex items-center gap-2 px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 group"
          >
            Explore All Projects
            <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedWork

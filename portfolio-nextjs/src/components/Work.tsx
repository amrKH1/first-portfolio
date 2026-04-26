'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink, Github, ArrowUpRight, X, ChevronRight, Layers, Eye, Star, Calendar, ArrowLeft } from 'lucide-react'

const Work = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      subtitle: 'Full-Stack Development',
      year: '2024',
      description: 'A modern e-commerce solution with real-time inventory management, secure payment processing, and comprehensive admin dashboard. Built with scalability in mind to handle thousands of concurrent users.',
      image: '/assets/placeholder-01.svg',
      technologies: ['Next.js', 'Node.js', 'MongoDB', 'Stripe', 'Redis', 'Docker'],
      liveUrl: '#',
      githubUrl: 'https://github.com/amrkhaled',
      stats: { views: '12.5k', stars: '234', commits: '1.2k' },
      color: 'from-gray-900 to-black'
    },
    {
      id: 2,
      title: 'SaaS Analytics Dashboard',
      subtitle: 'UI/UX & Frontend',
      year: '2024',
      description: 'Real-time analytics platform with advanced data visualization and AI-powered insights for business intelligence. Features custom charts, predictive analytics, and automated reporting.',
      image: '/assets/placeholder-02.svg',
      technologies: ['React', 'TypeScript', 'D3.js', 'Tailwind', 'WebSocket', 'Chart.js'],
      liveUrl: '#',
      githubUrl: 'https://github.com/amrkhaled',
      stats: { views: '8.3k', stars: '156', commits: '890' },
      color: 'from-gray-800 to-gray-900'
    },
    {
      id: 3,
      title: 'Mobile Banking App',
      subtitle: 'React Native',
      year: '2023',
      description: 'Secure mobile banking application with biometric authentication and blockchain-powered transactions. Includes features like instant transfers, bill payments, and investment tracking.',
      image: '/assets/placeholder-03.svg',
      technologies: ['React Native', 'Node.js', 'PostgreSQL', 'JWT', 'Blockchain', 'Face ID'],
      liveUrl: '#',
      githubUrl: 'https://github.com/amrkhaled',
      stats: { views: '15.7k', stars: '412', commits: '2.1k' },
      color: 'from-black to-gray-900'
    },
    {
      id: 4,
      title: 'AI Content Generator',
      subtitle: 'Machine Learning',
      year: '2023',
      description: 'AI-powered content generation platform using GPT models for automated copywriting and content creation. Supports multiple languages and content types.',
      image: '/assets/placeholder-01.svg',
      technologies: ['Python', 'TensorFlow', 'FastAPI', 'React', 'Docker', 'OpenAI'],
      liveUrl: '#',
      githubUrl: 'https://github.com/amrkhaled',
      stats: { views: '6.2k', stars: '89', commits: '456' },
      color: 'from-gray-900 to-black'
    },
    {
      id: 5,
      title: 'Real Estate Platform',
      subtitle: 'Full-Stack',
      year: '2023',
      description: 'Property listing and management system with virtual tours, advanced search filters, and integrated CRM for real estate professionals.',
      image: '/assets/placeholder-02.svg',
      technologies: ['Vue.js', 'Laravel', 'MySQL', 'AWS', 'Elasticsearch', '360° Tours'],
      liveUrl: '#',
      githubUrl: 'https://github.com/amrkhaled',
      stats: { views: '9.8k', stars: '178', commits: '1.5k' },
      color: 'from-gray-800 to-gray-900'
    },
    {
      id: 6,
      title: 'Cloud Infrastructure Tool',
      subtitle: 'DevOps',
      year: '2023',
      description: 'Infrastructure automation tool for managing cloud resources across multiple providers. Features one-click deployments and cost optimization.',
      image: '/assets/placeholder-03.svg',
      technologies: ['Go', 'Kubernetes', 'Terraform', 'AWS', 'Azure', 'GitOps'],
      liveUrl: '#',
      githubUrl: 'https://github.com/amrkhaled',
      stats: { views: '4.5k', stars: '67', commits: '780' },
      color: 'from-black to-gray-900'
    }
  ]

  const selectedProjectData = selectedProject ? projects.find(p => p.id === selectedProject) : null

  return (
    <section id="work" className="relative min-h-screen bg-white dark:bg-black overflow-hidden">
      {/* Mobile/Tablet View */}
      <div className="lg:hidden">
        {!selectedProject ? (
          /* Mobile Project List */
          <div className="p-6 md:p-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-3">
                My Work
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase tracking-wider ml-2 align-middle">Demo</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                Tap on a project to explore in detail
              </p>
            </motion.div>

            {/* Project Cards */}
            <div className="space-y-3">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  onClick={() => setSelectedProject(project.id)}
                  className="group cursor-pointer p-4 md:p-5 rounded-xl bg-gray-50 dark:bg-gray-900 active:scale-[0.98] transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-gray-500 dark:text-gray-400">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <h3 className="text-lg font-bold text-black dark:text-white">
                          {project.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {project.subtitle}
                        </p>
                        <span className="text-xs text-gray-500">
                          {project.year}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-active:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mobile Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800"
            >
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xl font-bold text-black dark:text-white">6+</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Projects</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-black dark:text-white">50k+</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Views</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-black dark:text-white">1.2k+</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Stars</p>
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          /* Mobile Project Detail */
          <AnimatePresence mode="wait">
            {selectedProjectData && (
              <motion.div
                key={selectedProject}
                initial={{ opacity: 0, x: '100%' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '100%' }}
                transition={{ duration: 0.3 }}
                className="min-h-screen relative"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={selectedProjectData.image}
                    alt={selectedProjectData.title}
                    fill
                    className="object-cover filter grayscale"

                  />
                  <div className={`absolute inset-0 bg-gradient-to-b ${selectedProjectData.color} opacity-95`} />
                </div>

                {/* Content */}
                <div className="relative min-h-screen flex flex-col p-6 md:p-8 text-white">
                  {/* Mobile Header */}
                  <div className="flex items-center justify-between mb-8">
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      <span className="text-sm">Back</span>
                    </button>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="p-2 bg-white/10 backdrop-blur-sm rounded-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Project Details */}
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="text-3xl md:text-4xl font-bold mb-3">
                      {selectedProjectData.title}
                    </h3>
                    <p className="text-base md:text-lg text-gray-300 mb-6">
                      {selectedProjectData.description}
                    </p>

                    {/* Technologies */}
                    <div className="mb-6">
                      <h4 className="text-xs font-semibold text-gray-400 mb-2">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProjectData.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      <div>
                        <div className="flex items-center gap-1 text-gray-400 mb-1">
                          <Eye className="w-3 h-3" />
                          <span className="text-xs">Views</span>
                        </div>
                        <p className="text-xl font-bold">{selectedProjectData.stats.views}</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-1 text-gray-400 mb-1">
                          <Star className="w-3 h-3" />
                          <span className="text-xs">Stars</span>
                        </div>
                        <p className="text-xl font-bold">{selectedProjectData.stats.stars}</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-1 text-gray-400 mb-1">
                          <Layers className="w-3 h-3" />
                          <span className="text-xs">Commits</span>
                        </div>
                        <p className="text-xl font-bold">{selectedProjectData.stats.commits}</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <a
                        href={selectedProjectData.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-3 px-4 bg-white text-black rounded-lg font-semibold text-center hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                      >
                        View Live Demo
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <a
                        href={selectedProjectData.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-3 px-4 border border-white/30 rounded-lg font-semibold text-center hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                      >
                        <Github className="w-4 h-4" />
                        Source Code
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>

      {/* Desktop View */}
      <div className="hidden lg:flex h-screen">
        {/* Left Panel - Project List */}
        <motion.div 
          className={`${selectedProject ? 'w-[400px] xl:w-[500px]' : 'w-full lg:w-1/2'} transition-all duration-700 ease-in-out overflow-y-auto border-r border-gray-200 dark:border-gray-800`}
        >
          <div className="p-8 xl:p-12">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-5xl xl:text-7xl font-bold text-black dark:text-white mb-4">
                My Work
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase tracking-wider ml-3 align-middle">Demo</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Click on a project to explore in detail
              </p>
            </motion.div>

            {/* Project List */}
            <div className="space-y-4">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setSelectedProject(project.id)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`group cursor-pointer p-6 rounded-xl transition-all duration-300 ${
                    selectedProject === project.id 
                      ? 'bg-black dark:bg-white text-white dark:text-black' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-900'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-sm font-mono ${
                          selectedProject === project.id 
                            ? 'text-gray-300 dark:text-gray-700' 
                            : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <h3 className={`text-xl font-bold ${
                          selectedProject === project.id 
                            ? 'text-white dark:text-black' 
                            : 'text-black dark:text-white'
                        }`}>
                          {project.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className={`text-sm ${
                          selectedProject === project.id 
                            ? 'text-gray-300 dark:text-gray-700' 
                            : 'text-gray-600 dark:text-gray-400'
                        }`}>
                          {project.subtitle}
                        </p>
                        <span className={`text-xs ${
                          selectedProject === project.id 
                            ? 'text-gray-400 dark:text-gray-600' 
                            : 'text-gray-500 dark:text-gray-500'
                        }`}>
                          {project.year}
                        </span>
                      </div>
                    </div>
                    <motion.div
                      animate={{ 
                        x: hoveredIndex === index || selectedProject === project.id ? 0 : -10,
                        opacity: hoveredIndex === index || selectedProject === project.id ? 1 : 0
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight className={`w-5 h-5 ${
                        selectedProject === project.id 
                          ? 'text-white dark:text-black' 
                          : 'text-black dark:text-white'
                      }`} />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800"
            >
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-2xl font-bold text-black dark:text-white">6+</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Projects</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-black dark:text-white">50k+</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Views</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-black dark:text-white">1.2k+</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">GitHub Stars</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Panel - Project Details */}
        <AnimatePresence mode="wait">
          {selectedProject ? (
            <motion.div
              key={selectedProject}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.5 }}
              className="flex-1 relative overflow-y-auto"
            >
              {selectedProjectData && (
                <div className="relative h-full">
                  {/* Project Image Background */}
                  <div className="absolute inset-0">
                    <Image
                      src={selectedProjectData.image}
                      alt={selectedProjectData.title}
                      fill
                      className="object-cover filter grayscale"

                    />
                    <div className={`absolute inset-0 bg-gradient-to-b ${selectedProjectData.color} opacity-95`} />
                  </div>

                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-between p-8 xl:p-12 text-white">
                    {/* Close Button */}
                    <div className="flex justify-end">
                      <button
                        onClick={() => setSelectedProject(null)}
                        className="p-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Project Details */}
                    <div className="flex-1 flex flex-col justify-center max-w-2xl">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <h3 className="text-4xl xl:text-5xl font-bold mb-4">
                          {selectedProjectData.title}
                        </h3>
                        <p className="text-lg text-gray-300 mb-8">
                          {selectedProjectData.description}
                        </p>

                        {/* Technologies */}
                        <div className="mb-8">
                          <h4 className="text-sm font-semibold text-gray-400 mb-3">Technologies Used</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedProjectData.technologies.map((tech, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 mb-8">
                          <div>
                            <div className="flex items-center gap-2 text-gray-400 mb-1">
                              <Eye className="w-4 h-4" />
                              <span className="text-xs">Views</span>
                            </div>
                            <p className="text-2xl font-bold">{selectedProjectData.stats.views}</p>
                          </div>
                          <div>
                            <div className="flex items-center gap-2 text-gray-400 mb-1">
                              <Star className="w-4 h-4" />
                              <span className="text-xs">Stars</span>
                            </div>
                            <p className="text-2xl font-bold">{selectedProjectData.stats.stars}</p>
                          </div>
                          <div>
                            <div className="flex items-center gap-2 text-gray-400 mb-1">
                              <Layers className="w-4 h-4" />
                              <span className="text-xs">Commits</span>
                            </div>
                            <p className="text-2xl font-bold">{selectedProjectData.stats.commits}</p>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4">
                          <a
                            href={selectedProjectData.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-3 px-6 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                          >
                            View Live Demo
                            <ExternalLink className="w-4 h-4" />
                          </a>
                          <a
                            href={selectedProjectData.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-3 px-6 border border-white/30 rounded-lg font-semibold hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                          >
                            <Github className="w-4 h-4" />
                            Source Code
                          </a>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            /* Default Right Panel */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="hidden lg:flex flex-1 items-center justify-center bg-gray-50 dark:bg-gray-950"
            >
              <div className="text-center">
                <Layers className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
                <p className="text-xl text-gray-500 dark:text-gray-400">
                  Select a project to view details
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Work

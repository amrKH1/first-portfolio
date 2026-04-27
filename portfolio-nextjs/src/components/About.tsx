'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Code2,
  Palette,
  Database,
  Cloud,
  Rocket,
  Trophy,
  Zap,
  Globe,
  Mail,
  Github,
  Linkedin,
  Twitter,
  Download,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Terminal,
  Cpu,
  GitBranch,
  Layers,
  Box,
  Server,
  Shield,
  Braces,
  FileCode,
  Coffee,
  Target,
  TrendingUp,
  Clock,
  MapPin,
  Calendar,
  Award,
  CheckCircle,
  Circle,
  Lock,
  ExternalLink,
  Play,
  Pause
} from 'lucide-react'

const About = () => {
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  
  const [activeSection, setActiveSection] = useState<'intro' | 'skills' | 'journey'>('intro')
  const [selectedYear, setSelectedYear] = useState<number>(2024)
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-50%'])

  // Auto-rotate skills showcase
  const skills = [
    { name: 'React.js', level: 95, category: 'Frontend', icon: <Braces className="w-5 h-5" /> },
    { name: 'TypeScript', level: 85, category: 'Frontend', icon: <FileCode className="w-5 h-5" /> },
    { name: 'Node.js', level: 90, category: 'Backend', icon: <Server className="w-5 h-5" /> },
    { name: 'Next.js', level: 90, category: 'Frontend', icon: <Layers className="w-5 h-5" /> },
    { name: 'MongoDB', level: 85, category: 'Database', icon: <Database className="w-5 h-5" /> },
    { name: 'Docker', level: 70, category: 'DevOps', icon: <Box className="w-5 h-5" /> },
    { name: 'PostgreSQL', level: 75, category: 'Database', icon: <Database className="w-5 h-5" /> },
    { name: 'AWS', level: 60, category: 'Cloud', icon: <Cloud className="w-5 h-5" /> }
  ]

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentSkillIndex((prev) => (prev + 1) % skills.length)
      }, 2000)
      return () => clearInterval(interval)
    }
  }, [isPlaying, skills.length])

  // Timeline data
  const timeline: Record<number, {
    title: string
    milestone: string
    achievements: string[]
    color: string
  }> = {
    2022: {
      title: 'Foundation',
      milestone: 'Started Web Development Journey',
      achievements: ['HTML/CSS Mastery', 'JavaScript Fundamentals', 'First Portfolio Site'],
      color: 'from-gray-400 to-gray-500'
    },
    2023: {
      title: 'Growth',
      milestone: 'Dove into Modern Frameworks',
      achievements: ['React.js Projects', 'Node.js APIs', 'MongoDB Integration', 'UI/UX Design'],
      color: 'from-gray-500 to-gray-600'
    },
    2024: {
      title: 'Advanced',
      milestone: 'Enterprise-Level Development',
      achievements: ['TypeScript Migration', 'Next.js 14 Apps', 'Docker Deployment', 'PostgreSQL'],
      color: 'from-gray-600 to-black'
    },
    2025: {
      title: 'Future',
      milestone: 'AI & Web3 Integration',
      achievements: ['Machine Learning', 'Rust Programming', 'Blockchain Development'],
      color: 'from-black to-gray-900'
    }
  }

  // Stats for floating cards
  const floatingStats = [
    { value: '50+', label: 'Projects', delay: 0 },
    { value: '30+', label: 'Clients', delay: 0.1 },
    { value: '3+', label: 'Years', delay: 0.2 },
    { value: '25+', label: 'Skills', delay: 0.3 }
  ]

  return (
    <section ref={containerRef} className="relative min-h-screen bg-white dark:bg-black overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y: backgroundY }}
          className="absolute inset-0"
        >
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px h-32 bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-700 to-transparent"
              style={{
                left: `${(i + 1) * 5}%`,
                top: `${((i * 37 + 13) % 100)}%`
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 3 + ((i * 17 + 5) % 3),
                repeat: Infinity,
                delay: ((i * 23 + 7) % 20) / 10
              }}
            />
          ))}
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section with Split Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-6">
              {/* Animated Title */}
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="text-6xl lg:text-8xl font-bold"
                >
                  <span className="block text-black dark:text-white">Amr</span>
                  <span className="block text-gray-400">Khaled</span>
                </motion.h1>
              </div>

              {/* Role with typewriter effect */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-2"
              >
                <Terminal className="w-5 h-5 text-gray-500" />
                <p className="text-xl text-gray-600 dark:text-gray-400 font-mono">
                  Full-Stack Developer & UI/UX Designer
                </p>
              </motion.div>

              {/* Bio */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed"
              >
                Crafting digital experiences with clean code and creative design. 
                Specialized in modern web technologies with a passion for building 
                scalable, user-centric applications.
              </motion.p>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="flex flex-wrap gap-6 pt-4"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Aden, Yemen</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">3+ Years Experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <Coffee className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Coffee Enthusiast</span>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="flex gap-4 pt-6"
              >
                <a
                  href="/assets/Amr-Khaled-CV.pdf"
                  download
                  className="group px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-medium hover:scale-105 transition-transform flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download CV
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <Link
                  href="/contact"
                  className="px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-full font-medium hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                >
                  Let's Talk
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Interactive Skills Display */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Central Skill Display */}
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Rotating Border */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-700"
              />
              
              {/* Skill Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSkillIndex}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-8 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-8 flex flex-col items-center justify-center"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-black dark:bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-white dark:text-black">
                      {skills[currentSkillIndex].icon}
                    </div>
                    <h3 className="text-2xl font-bold text-black dark:text-white mb-2">
                      {skills[currentSkillIndex].name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      {skills[currentSkillIndex].category}
                    </p>
                    
                    {/* Skill Level */}
                    <div className="w-full">
                      <div className="flex justify-between text-xs text-gray-500 mb-2">
                        <span>Proficiency</span>
                        <span>{skills[currentSkillIndex].level}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skills[currentSkillIndex].level}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full bg-gradient-to-r from-gray-600 to-black dark:from-gray-400 dark:to-white"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Play/Pause Control */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute bottom-0 right-0 w-12 h-12 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center hover:scale-110 transition-transform"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>

              {/* Floating Stats */}
              {floatingStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5 + stat.delay }}
                  className={`absolute bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl p-3 shadow-lg ${
                    index === 0 ? 'top-0 left-0' :
                    index === 1 ? 'top-0 right-0' :
                    index === 2 ? 'bottom-0 left-0' :
                    'bottom-0 right-0'
                  }`}
                >
                  <p className="text-2xl font-bold text-black dark:text-white">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Timeline Section - Clean Minimalist Design */}
        {!isHomePage && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-32 max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
          </div>

          {/* Year Selector - Clean Pills */}
          <div className="flex justify-center gap-4 mb-16">
            {Object.keys(timeline).map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(parseInt(year))}
                className={`px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 ${
                  selectedYear === parseInt(year)
                    ? 'bg-black dark:bg-white text-white dark:text-black shadow-lg scale-105'
                    : 'bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800'
                }`}
              >
                {year}
              </button>
            ))}
          </div>

          {/* Timeline Content - Clean Card Design */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedYear}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-12 shadow-2xl">
                {/* Header with Icon */}
                <div className="flex items-start gap-6 mb-10">
                  <div className="w-16 h-16 bg-white dark:bg-black rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                    <Rocket className="w-8 h-8 text-black dark:text-white" />
                  </div>
                  <div>
                    <h3 className="text-4xl font-bold text-black dark:text-white mb-2">
                      {timeline[selectedYear].title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                      {timeline[selectedYear].milestone}
                    </p>
                  </div>
                </div>

                {/* Achievement Pills */}
                <div className="flex flex-wrap gap-3">
                  {timeline[selectedYear].achievements.map((achievement: string, index: number) => (
                    <motion.div
                      key={achievement}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      className="bg-white/80 dark:bg-black/50 backdrop-blur rounded-full px-6 py-3 flex items-center gap-3 shadow-md hover:shadow-lg transition-shadow"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-800 dark:text-gray-200 font-medium">{achievement}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Progress Indicator for Current Year */}
                {selectedYear === 2024 && (
                  <div className="mt-10 p-6 bg-white/50 dark:bg-black/30 rounded-2xl">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">Current Progress</span>
                      <span className="text-sm font-bold text-black dark:text-white">75%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "75%" }}
                        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-gray-600 to-black dark:from-gray-400 dark:to-white rounded-full"
                      />
                    </div>
                  </div>
                )}

                {/* Future Goals Locked State */}
                {selectedYear === 2025 && (
                  <div className="mt-10 p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl border-2 border-dashed border-yellow-400 dark:border-yellow-600">
                    <div className="flex items-center gap-3">
                      <Lock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                      <p className="text-yellow-800 dark:text-yellow-300 font-medium">
                        These are planned goals for the future
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Visual Timeline Dots */}
          <div className="flex justify-center items-center gap-2 mt-12">
            {Object.keys(timeline).map((year, index) => (
              <React.Fragment key={year}>
                <motion.div
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    parseInt(year) <= selectedYear
                      ? 'bg-black dark:bg-white scale-125'
                      : 'bg-gray-300 dark:bg-gray-700'
                  }`}
                  whileHover={{ scale: 1.5 }}
                />
                {index < Object.keys(timeline).length - 1 && (
                  <div className={`w-12 h-0.5 transition-all duration-300 ${
                    parseInt(year) < selectedYear
                      ? 'bg-black dark:bg-white'
                      : 'bg-gray-300 dark:bg-gray-700'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>
        )}

        {/* More About Me Section */}
        {!isHomePage && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-32 max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-black dark:text-white mb-4">Beyond Code</h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg">Interests, achievements, and tools that power my work</p>
          </div>

          {/* Interests Grid */}
          <div className="mb-20">
            <h3 className="text-2xl font-bold text-black dark:text-white mb-8">Personal Interests</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: <Coffee className="w-10 h-10" />, title: 'Coffee Enthusiast', description: 'Fueled by creativity and caffeine' },
                { icon: <Code2 className="w-10 h-10" />, title: 'Music Lover', description: 'Coding to the rhythm of my favorite playlists' },
                { icon: <Globe className="w-10 h-10" />, title: 'Continuous Learner', description: 'Always exploring new technologies' },
                { icon: <Palette className="w-10 h-10" />, title: 'Design Appreciation', description: 'Passionate about beautiful interfaces' },
                { icon: <Globe className="w-10 h-10" />, title: 'Travel', description: 'Exploring new cultures and perspectives' },
                { icon: <Github className="w-10 h-10" />, title: 'Open Source', description: 'Contributing to the community' }
              ].map((interest, index) => (
                <motion.div
                  key={interest.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <div className="text-black dark:text-white mb-4">{interest.icon}</div>
                  <h4 className="text-xl font-semibold mb-2 text-black dark:text-white">{interest.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400">{interest.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="mb-20">
            <h3 className="text-2xl font-bold text-black dark:text-white mb-8">Key Achievements</h3>
            <div className="space-y-4">
              {[
                { icon: <Trophy className="w-12 h-12" />, title: 'Best Developer Award', year: '2023', description: 'Recognized for exceptional performance' },
                { icon: <Award className="w-12 h-12" />, title: 'Innovation Prize', year: '2023', description: 'For creative problem-solving' },
                { icon: <Target className="w-12 h-12" />, title: '100+ Projects', year: '2022', description: 'Successfully delivered client projects' },
                { icon: <Zap className="w-12 h-12" />, title: 'Speed Optimization', year: '2022', description: 'Improved app performance by 60%' }
              ].map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4 p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all"
                >
                  <div className="flex-shrink-0 text-black dark:text-white">{achievement.icon}</div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xl font-semibold text-black dark:text-white">{achievement.title}</h4>
                      <span className="text-sm text-gray-500">{achievement.year}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">{achievement.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Tools & Technologies */}
          <div className="mb-20">
            <h3 className="text-2xl font-bold text-black dark:text-white mb-8">Tools I Use Daily</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                'VS Code', 'Git', 'Docker', 'Postman', 'Figma', 'Notion',
                'Slack', 'Jira', 'AWS', 'Vercel', 'MongoDB Compass', 'Chrome DevTools'
              ].map((tool, index) => (
                <motion.div
                  key={tool}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="p-4 text-center rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all"
                >
                  <span className="text-black dark:text-white font-medium">{tool}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900"
          >
            <h3 className="text-2xl font-bold mb-6 text-center text-black dark:text-white">
              Quick Facts
            </h3>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-black dark:text-white">5+</div>
                <div className="text-gray-600 dark:text-gray-400">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-black dark:text-white">100+</div>
                <div className="text-gray-600 dark:text-gray-400">Projects Completed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-black dark:text-white">50+</div>
                <div className="text-gray-600 dark:text-gray-400">Happy Clients</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-black dark:text-white">∞</div>
                <div className="text-gray-600 dark:text-gray-400">Coffee Cups</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
        )}

        {/* Social Links */}
        {!isHomePage && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-32 text-center"
        >
          <h3 className="text-2xl font-bold text-black dark:text-white mb-6">Connect With Me</h3>
          <div className="flex justify-center gap-4">
            {[
              { icon: <Github className="w-5 h-5" />, href: 'https://github.com', label: 'GitHub' },
              { icon: <Linkedin className="w-5 h-5" />, href: 'https://linkedin.com', label: 'LinkedIn' },
              { icon: <Twitter className="w-5 h-5" />, href: 'https://twitter.com', label: 'Twitter' },
              { icon: <Mail className="w-5 h-5" />, href: 'mailto:email@example.com', label: 'Email' }
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-12 h-12 bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300"
              >
                {social.icon}
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  {social.label}
                </span>
              </a>
            ))}
          </div>
        </motion.div>
        )}
      </div>
    </section>
  )
}

export default About

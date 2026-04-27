'use client'

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Code2,
  Palette,
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
  Coffee,
  Target,
  Clock,
  MapPin,
  Award,
  CheckCircle,
  Lock,
  Monitor
} from 'lucide-react'

const About = () => {
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  
  const [selectedYear, setSelectedYear] = useState<number>(2024)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

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

  const contactHref = isHomePage ? '#contact' : '/#contact'
  const services = [
    {
      title: 'Full-Stack Development',
      description: 'Building robust, scalable web applications with modern technologies.',
      icon: Code2,
    },
    {
      title: 'UI/UX Design',
      description: 'Designing intuitive interfaces that deliver meaningful user experiences.',
      icon: Palette,
    },
    {
      title: 'Creative Frontend',
      description: 'Crafting interactive, responsive, and performance-focused frontend solutions.',
      icon: Monitor,
    },
  ]

  const journeyItems = [
    {
      period: '2022 - Present',
      role: 'Freelance Full-Stack Developer',
      description: 'Building web apps and digital products for clients worldwide.',
    },
    {
      period: '2021 - 2022',
      role: 'Frontend Developer',
      description: 'Focused on building responsive interfaces and improving user experiences.',
    },
    {
      period: '2020 - 2021',
      role: 'Learning & Exploring',
      description: 'Explored web technologies and built projects to sharpen my skills.',
    },
  ]

  const techStack = ['TypeScript', 'Next.js', 'React', 'Node.js', 'Tailwind CSS', 'MongoDB', 'Figma', 'Git']

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
        {/* About Overview */}
        <div className="relative py-6 lg:py-12">
          <div className="pointer-events-none absolute -left-24 top-28 hidden h-52 w-52 lg:block">
            {[...Array(16)].map((_, i) => (
              <span
                key={i}
                className="absolute rounded-full bg-black dark:bg-white"
                style={{
                  width: `${4 + (i % 4) * 3}px`,
                  height: `${4 + (i % 4) * 3}px`,
                  left: `${(i * 23) % 90}%`,
                  top: `${(i * 31) % 95}%`,
                  opacity: 0.15 + (i % 5) * 0.12,
                }}
              />
            ))}
          </div>
          <div className="pointer-events-none absolute -right-16 top-0 hidden h-60 w-60 lg:block">
            {[...Array(14)].map((_, i) => (
              <span
                key={i}
                className="absolute rounded-full bg-black dark:bg-white"
                style={{
                  width: `${3 + (i % 5) * 2}px`,
                  height: `${3 + (i % 5) * 2}px`,
                  left: `${(i * 19) % 95}%`,
                  top: `${(i * 29) % 90}%`,
                  opacity: 0.12 + (i % 4) * 0.14,
                }}
              />
            ))}
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.18fr_0.92fr] lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="flex flex-col justify-center"
            >
              <div className="mb-6 flex items-center gap-3 text-sm font-medium text-black dark:text-white">
                <span className="h-2.5 w-2.5 rounded-full bg-black dark:bg-white" />
                About Me
              </div>
              <h1 className="max-w-3xl text-4xl font-bold leading-tight text-black dark:text-white md:text-5xl lg:text-6xl">
                Designing thoughtful digital products with code and clarity.
              </h1>
              <p className="mt-8 max-w-2xl text-base leading-8 text-gray-600 dark:text-gray-400 md:text-lg">
                I&apos;m Amr Khaled, a Full-Stack Developer & UI/UX Designer who
                loves building clean, scalable, and user-centered web applications
                that solve real problems.
              </p>

              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-5">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-black dark:text-white" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Based in<br />Aden, Yemen
                  </span>
                </div>
                <div className="h-10 w-px bg-gray-200 dark:bg-gray-800" />
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-black dark:text-white" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    3+ Years<br />Experience
                  </span>
                </div>
                <div className="h-10 w-px bg-gray-200 dark:bg-gray-800" />
                <div className="flex items-center gap-3">
                  <Coffee className="h-5 w-5 text-black dark:text-white" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Coffee<br />Enthusiast
                  </span>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="/assets/Amr-Khaled-CV.pdf"
                  download
                  className="group inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 dark:bg-white dark:text-black"
                >
                  <Download className="h-4 w-4" />
                  Download CV
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <Link
                  href={contactHref}
                  className="inline-flex items-center rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-900"
                >
                  Let&apos;s Talk
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative min-h-[520px] lg:min-h-[560px]"
            >
              <Image
                src="/assets/amr-portrait-transparent.png"
                alt="Black and white portrait of Amr Khaled"
                fill
                priority
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-contain object-center dark:brightness-125"
              />
            </motion.div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl border border-gray-200 bg-white/80 p-8 shadow-sm backdrop-blur dark:border-gray-800 dark:bg-black/60"
            >
              <div className="mb-8 flex items-center gap-3 font-bold text-black dark:text-white">
                <span className="h-2.5 w-2.5 rounded-full bg-black dark:bg-white" />
                My Story
              </div>
              <p className="text-sm leading-7 text-gray-600 dark:text-gray-400">
                My journey into tech started with curiosity and turned into a
                passion for creating digital experiences that are both functional
                and beautiful.
              </p>
              <p className="mt-6 text-sm leading-7 text-gray-600 dark:text-gray-400">
                I enjoy turning ideas into products through clean code,
                thoughtful UI, and a focus on detail.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="rounded-2xl border border-gray-200 bg-white/80 p-8 shadow-sm backdrop-blur dark:border-gray-800 dark:bg-black/60"
            >
              <div className="mb-8 flex items-center gap-3 font-bold text-black dark:text-white">
                <span className="h-2.5 w-2.5 rounded-full bg-black dark:bg-white" />
                What I Do
              </div>
              <div className="space-y-7">
                {services.map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.title} className="flex gap-5">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-black dark:border-gray-800 dark:bg-gray-950 dark:text-white">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-black dark:text-white">{item.title}</h3>
                        <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white/80 p-8 shadow-sm backdrop-blur dark:border-gray-800 dark:bg-black/60"
            >
              <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 opacity-40">
                {[...Array(10)].map((_, i) => (
                  <span
                    key={i}
                    className="absolute rounded-full bg-black dark:bg-white"
                    style={{
                      width: `${3 + (i % 4) * 2}px`,
                      height: `${3 + (i % 4) * 2}px`,
                      left: `${(i * 17) % 85}%`,
                      top: `${(i * 23) % 80}%`,
                    }}
                  />
                ))}
              </div>
              <div className="mb-8 flex items-center gap-3 font-bold text-black dark:text-white">
                <span className="h-2.5 w-2.5 rounded-full bg-black dark:bg-white" />
                My Journey
              </div>
              <div className="relative space-y-7 border-l border-gray-300 pl-8 dark:border-gray-700">
                {journeyItems.map((item) => (
                  <div key={item.period} className="relative">
                    <span className="absolute -left-[39px] top-1 h-4 w-4 rounded-full border-2 border-white bg-black shadow dark:border-black dark:bg-white" />
                    <p className="text-xs font-bold text-gray-700 dark:text-gray-300">{item.period}</p>
                    <h3 className="mt-1 font-bold text-black dark:text-white">{item.role}</h3>
                    <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-6 flex flex-col gap-5 rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-gray-800 dark:bg-black/60 lg:flex-row lg:items-center"
          >
            <div className="flex shrink-0 items-center gap-3 font-bold text-black dark:text-white">
              <span className="h-2.5 w-2.5 rounded-full bg-black dark:bg-white" />
              Tech I Work With
            </div>
            <div className="flex flex-wrap gap-3 lg:ml-auto">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-gray-200 px-5 py-2 text-sm text-black dark:border-gray-800 dark:text-white"
                >
                  {tech}
                </span>
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

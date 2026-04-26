'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  PenTool, 
  Palette, 
  Code, 
  TestTube, 
  Rocket,
  CheckCircle,
  Users,
  Target,
  Lightbulb,
  Monitor,
  Shield
} from 'lucide-react'

const HowIWork = () => {
  const [activeStep, setActiveStep] = useState(0) // Start with first step
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const steps = [
    {
      id: 1,
      title: 'Discovery',
      icon: Search,
      description: 'Understanding your needs and goals through comprehensive consultation and research.',
      details: [
        'In-depth initial consultation',
        'Comprehensive project requirements analysis',
        'Thorough market research',
        'Strategic competitor analysis',
        'Clear goal setting and alignment'
      ],
      visualIcon: Users,
      visualDescription: 'Understanding your needs and goals through comprehensive consultation and research.'
    },
    {
      id: 2,
      title: 'Planning',
      icon: Target,
      description: 'Strategic planning and comprehensive project roadmap creation.',
      details: [
        'Detailed project timeline creation',
        'Strategic resource allocation',
        'Optimal technology stack selection',
        'Scalable architecture planning',
        'Proactive risk assessment and mitigation'
      ],
      visualIcon: Target,
      visualDescription: 'Strategic planning and comprehensive project roadmap creation.'
    },
    {
      id: 3,
      title: 'Design',
      icon: Palette,
      description: 'Creating compelling visual concepts and intuitive user experience design.',
      details: [
        'Detailed wireframing and user flows',
        'Modern UI/UX design implementation',
        'Interactive prototyping and testing',
        'Comprehensive design system creation',
        'Iterative client feedback integration'
      ],
      visualIcon: Palette,
      visualDescription: 'Creating compelling visual concepts and intuitive user experience design.'
    },
    {
      id: 4,
      title: 'Development',
      icon: Code,
      description: 'Building robust solutions with clean, efficient, and maintainable code.',
      details: [
        'Modern frontend development',
        'Scalable backend development',
        'Seamless database integration',
        'RESTful API development',
        'Performance optimization and refactoring'
      ],
      visualIcon: Code,
      visualDescription: 'Building robust solutions with clean, efficient, and maintainable code.'
    },
    {
      id: 5,
      title: 'Testing',
      icon: TestTube,
      description: 'Ensuring optimal functionality, performance, and compatibility across all devices.',
      details: [
        'Comprehensive functionality testing',
        'Advanced performance optimization',
        'Complete cross-browser compatibility',
        'Responsive mobile optimization',
        'Thorough security testing and validation'
      ],
      visualIcon: Shield,
      visualDescription: 'Ensuring optimal functionality, performance, and compatibility across all devices.'
    },
    {
      id: 6,
      title: 'Launch',
      icon: Rocket,
      description: 'Seamless deployment and go-live with comprehensive ongoing support.',
      details: [
        'Smooth production deployment',
        'Complete domain setup and configuration',
        'Secure SSL certificate implementation',
        'Continuous performance monitoring',
        'Dedicated post-launch support and maintenance'
      ],
      visualIcon: Rocket,
      visualDescription: 'Seamless deployment and go-live with comprehensive ongoing support.'
    }
  ]

  const currentStep = steps[activeStep]

  // Auto-sliding functionality
  useEffect(() => {
    if (!isAutoPlaying || isHovered) return

    autoPlayRef.current = setTimeout(() => {
      setActiveStep((prev) => (prev + 1) % steps.length)
    }, 4000) // Change step every 4 seconds

    return () => {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current)
      }
    }
  }, [activeStep, isAutoPlaying, isHovered, steps.length])

  // Pause auto-play when section is not in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsAutoPlaying(true)
        } else {
          setIsAutoPlaying(false)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleStepClick = (index: number) => {
    setActiveStep(index)
    // Pause auto-play for 10 seconds when user manually clicks
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)

  return (
    <section 
      ref={sectionRef}
      id="how-i-work" 
      className="py-20 bg-white dark:bg-black transition-colors duration-300"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <div className="inline-flex items-center rounded-full border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-[var(--text-primary)] px-4 py-1 text-sm mb-4 border-[var(--border)] bg-[var(--bg-card)]">
            My Process
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-8">
            How I Work
          </h2>
          <p className="lead text-[var(--text-secondary)] max-w-3xl mx-auto">
            A structured, proven approach to delivering exceptional results for your project.
          </p>
        </div>

        {/* Step Navigation */}
        <div className="flex justify-center mb-16" data-aos="fade-up" data-aos-delay="200">
          {/* Remove horizontal scrollbar: prevent overflow and wrap items on small screens */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 pb-4">
            {steps.map((step, index) => (
              <motion.button
                key={step.id}
                onClick={() => handleStepClick(index)}
                className={`group relative flex flex-col items-center space-y-2 min-w-[80px] transition-all duration-500 ${
                  activeStep === index ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
                whileHover={{ 
                  scale: 1.1,
                  y: -5,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Removed small dot indicator above active step */}
                
                <motion.div
                  className={`relative w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                    activeStep === index
                      ? 'bg-black dark:bg-white border-black dark:border-white text-white dark:text-black shadow-lg'
                      : 'border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white hover:bg-gray-50 dark:hover:bg-gray-900 group-hover:scale-110'
                  }`}
                  whileHover={{
                    rotate: 360,
                    transition: { duration: 0.6, ease: "easeInOut" }
                  }}
                >
                  <span className="text-sm font-bold">{step.id}</span>
                  
                  {/* Remove glow effect for black/white theme */}
                </motion.div>
                
                <motion.span 
                  className="text-sm font-medium text-center text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors duration-300"
                  whileHover={{ y: -2 }}
                >
                  {step.title}
                </motion.span>
                
                {/* Auto-play indicator */}
                {activeStep === index && isAutoPlaying && (
                  <motion.div
                    className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[var(--text-primary)] rounded-full"
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Step Details */}
          <motion.div
            key={`step-${activeStep}`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6"
            data-aos="fade-right"
          >
            <motion.div 
              className="flex items-center space-x-4 group"
              whileHover={{ x: 10 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="w-16 h-16 bg-[var(--text-primary)] rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300"
                whileHover={{ 
                  scale: 1.1,
                  rotate: 5,
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div
                  key={`icon-${activeStep}`}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, ease: "backOut" }}
                >
                <currentStep.icon className="w-8 h-8 text-white dark:text-black" />
                </motion.div>
              </motion.div>
              <div>
                <motion.div 
                  className="text-[var(--text-secondary)] text-sm font-semibold mb-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  Step • {currentStep.id.toString().padStart(2, '0')}
                </motion.div>
                <motion.h3 
                  className="text-3xl font-bold text-[var(--text-primary)]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  {currentStep.title}
                </motion.h3>
              </div>
            </motion.div>
            
            <motion.p 
              className="text-lg text-[var(--text-secondary)] leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {currentStep.description}
            </motion.p>

            <div className="space-y-3">
              {currentStep.details.map((detail, index) => (
                <motion.div
                  key={`${activeStep}-${detail}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="group flex items-center space-x-3 p-3 rounded-lg hover:bg-[var(--bg-card)] transition-all duration-300"
                  whileHover={{ x: 10, scale: 1.02 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.3 }}
                >
                  <CheckCircle className="w-5 h-5 text-black dark:text-white flex-shrink-0" />
                  </motion.div>
                  <span className="text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors duration-300">
                    {detail}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Visual Representation */}
          <motion.div
            key={`visual-${activeStep}`}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative group"
            data-aos="fade-left"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div 
              className="bg-[var(--bg-card)] rounded-3xl p-12 text-center border border-[var(--border)] shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              <motion.div
                className="w-24 h-24 bg-white dark:bg-black border-2 border-gray-300 dark:border-gray-700 rounded-full flex items-center justify-center mx-auto mb-6 hover:border-black dark:hover:border-white transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  key={`visual-icon-${activeStep}`}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, ease: "backOut" }}
                >
                  <currentStep.visualIcon className="w-12 h-12 text-black dark:text-white transition-colors duration-300" />
                </motion.div>
              </motion.div>
              
              <motion.h4 
                className="text-2xl font-bold text-[var(--text-primary)] mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                {currentStep.title}
              </motion.h4>
              
              <motion.p 
                className="text-[var(--text-secondary)] leading-relaxed transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                {currentStep.visualDescription}
              </motion.p>
              
              {/* Step Number Display */}
              <motion.div 
                className="absolute -bottom-4 -right-4 w-16 h-16 bg-[var(--text-primary)] rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300"
                whileHover={{ 
                  scale: 1.1,
                  rotate: 360,
                  transition: { duration: 0.3 }
                }}
              >
                <motion.span
                  className="text-2xl font-bold text-white dark:text-black"
                  key={`step-number-${activeStep}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, ease: "backOut" }}
                >
                  {currentStep.id.toString().padStart(2, '0')}
                </motion.span>
              </motion.div>
              
              {/* Floating particles effect */}
              <motion.div
                className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-[var(--text-primary)]/30 rounded-full"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${10 + i * 20}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.3, 0.8, 0.3],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 3 + i * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HowIWork

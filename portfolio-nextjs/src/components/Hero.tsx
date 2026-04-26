'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Github, Linkedin, Twitter, Mail, ArrowDown } from 'lucide-react'
import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import ContactSheet from '@/components/ContactSheet'
import { useTheme } from 'next-themes'
import dynamic from 'next/dynamic'

const ThreeDBackground = dynamic(() => import('./ThreeDBackground'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black" />
})

const Hero = () => {
  const { t, isRTL } = useLanguage()
  const { theme } = useTheme()
  const heroRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const reduceMotion = useReducedMotion()
  const isInView = useInView(heroRef, { once: true })
  const [contactOpen, setContactOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // إعادة تشغيل الفيديو عند تغيير الثيم لضمان عمله بشكل صحيح
  useEffect(() => {
    if (mounted && videoRef.current) {
      // فقط إعادة التشغيل إذا كان الفيديو متوقف
      if (videoRef.current.paused) {
        videoRef.current.play().catch(err => {
          // Video autoplay prevented — expected on some browsers
        });
      }
    }
  }, [theme, mounted])

  const socialLinks = [
    { href: 'https://github.com/amrkhaled', icon: Github, label: 'GitHub' },
    { href: 'https://linkedin.com/in/amrkhaled', icon: Linkedin, label: 'LinkedIn' },
    { href: 'https://twitter.com/amrkhaled', icon: Twitter, label: 'Twitter' },
    { href: 'mailto:amrkhaaled.eng12@gmail.com', icon: Mail, label: 'Email' },
  ]

  return (
    <>
      <motion.section 
        ref={heroRef}
        id="home" 
        className="min-h-screen relative bg-white dark:bg-black overflow-hidden transition-all duration-700 ease-in-out"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Unified Video Background - Best Performance Solution */}
        {mounted && (
          <div className="absolute inset-0">
            <div 
              className="absolute inset-0 w-full h-full"
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              onMouseDown={(e) => e.preventDefault()}
              style={{ userSelect: 'none', WebkitUserSelect: 'none', msUserSelect: 'none' }}
            >
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
                style={{ 
                  pointerEvents: 'none',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  msUserSelect: 'none',
                  MozUserSelect: 'none',
                  // تطبيق الفلتر ديناميكياً حسب الثيم - أفضل حل للأداء
                  filter: theme === 'dark' 
                    ? 'invert(100%) contrast(2) brightness(0)' 
                    : 'none',
                  // انتقال سلس للفلتر
                  transition: 'filter 0.7s ease-in-out'
                }}
                autoPlay
                muted
                playsInline
                preload="auto"
                controls={false}
                controlsList="nodownload nofullscreen noremoteplayback noplaybackrate"
                disablePictureInPicture
                disableRemotePlayback
                key="video-background"
                src="/assets/hero-video.mp4"
                onContextMenu={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  return false;
                }}
                onDragStart={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  return false;
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  return false;
                }}
                onEnded={(e) => {
                  // Stop at the last frame instead of looping
                  const video = e.currentTarget as HTMLVideoElement;
                  video.pause();
                  video.currentTime = video.duration;
                }}
                onError={(e) => {
                  const videoElement = e.currentTarget as HTMLVideoElement;
                  videoElement.style.display = 'none';
                }}
              />
              {/* Invisible overlay to prevent any interaction */}
              <div 
                className="absolute inset-0 z-10" 
                style={{ pointerEvents: 'auto' }}
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                onMouseDown={(e) => e.preventDefault()}
              />
            </div>
            {/* Fallback gradient background */}
            <div 
              className={`absolute inset-0 transition-all duration-700 ${
                theme === 'dark' 
                  ? 'bg-gradient-to-br from-gray-900 via-black to-gray-950' 
                  : 'bg-gradient-to-br from-gray-100 via-white to-gray-50'
              }`} 
              style={{ zIndex: -1 }} 
            />
          </div>
        )}

        {/* Hero Content - Left aligned over particles */}
        <div className="container mx-auto px-6 h-screen flex items-center relative z-20">
          <div className="w-full">
            <motion.div 
              className="max-w-2xl"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            >
              {/* Transparent background container */}
              <div className="bg-transparent p-8">
                {/* Name & Title */}
                <motion.div
                  className="space-y-4 mb-8"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                >
                  <motion.h1 
                    className="text-4xl sm:text-5xl lg:text-7xl font-bold text-black dark:text-white"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                  >
                    Amr Khaled
                  </motion.h1>
                  <motion.p 
                    className="text-xl sm:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 font-medium"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
                  >
                    Full-Stack Developer
                  </motion.p>
                  <motion.p 
                    className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                  >
                    Building exceptional digital experiences with modern technologies and creative solutions.
                  </motion.p>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  className="flex flex-wrap gap-4 mb-8"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.9 }}
                >
                  <motion.button
                    onClick={() => setContactOpen(true)}
                    className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full text-sm font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 shadow-lg"
                    whileHover={{ 
                      scale: 1.05,
                      y: -2,
                      transition: { duration: 0.2, ease: "easeOut" }
                    }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" }}
                  >
                    Work Together
                  </motion.button>
                  
                  <motion.button
                    onClick={() => {
                      document.getElementById('featured-work')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="px-8 py-3 border-2 border-black dark:border-white text-black dark:text-white rounded-full text-sm font-semibold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
                    whileHover={{ 
                      scale: 1.05,
                      y: -2,
                      transition: { duration: 0.2, ease: "easeOut" }
                    }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 1.1, ease: "easeOut" }}
                  >
                    View Portfolio
                  </motion.button>
                </motion.div>

                {/* Social Links */}
                <motion.div
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 1.2 }}
                >
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 flex items-center justify-center bg-white/10 dark:bg-black backdrop-blur-sm border border-black/20 dark:border-white/20 rounded-full text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 shadow-lg"
                      whileHover={{ 
                        scale: 1.15, 
                        y: -3,
                        rotate: 5,
                        transition: { duration: 0.2, ease: "easeOut" }
                      }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, y: 20, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                      transition={{ duration: 0.5, delay: 1.3 + index * 0.1, ease: "easeOut" }}
                      aria-label={link.label}
                    >
                      <link.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator - Bottom Center */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="bg-white/10 dark:bg-black backdrop-blur-sm border border-black/20 dark:border-white/20 rounded-full p-3 text-black dark:text-white shadow-lg cursor-pointer hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
            whileHover={{ 
              scale: 1.1,
              transition: { duration: 0.2 }
            }}
            onClick={() => {
              document.getElementById('featured-work')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Contact Sheet */}
      <ContactSheet isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  )
}

export default Hero

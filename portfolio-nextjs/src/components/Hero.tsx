'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Github, Linkedin, Twitter, Mail, ArrowDown, Sparkles } from 'lucide-react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

const Hero = () => {
  const { t, isRTL } = useLanguage()
  const [currentTitle, setCurrentTitle] = useState('')
  const [titleIndex, setTitleIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const typeTimeoutRef = useRef<number | null>(null)
  const minVisibleChars = 3

  const titles = [
    t('hero.title1'),
    t('hero.title2'),
    t('hero.title3'),
    t('hero.title4')
  ]

  useEffect(() => {
    const typeEffect = () => {
      const fullTitle = titles[titleIndex]

      if (isDeleting) {
        // Keep at least a few letters visible to avoid a single "F"/one-letter artifact
        const nextLen = Math.max(minVisibleChars, charIndex - 1)
        setCurrentTitle(fullTitle.substring(0, nextLen))
        setCharIndex(nextLen)
      } else {
        const nextLen = Math.min(fullTitle.length, Math.max(minVisibleChars, charIndex + 1))
        setCurrentTitle(fullTitle.substring(0, nextLen))
        setCharIndex(nextLen)
      }

      let typeSpeed = isDeleting ? 50 : 100

      if (!isDeleting && charIndex >= fullTitle.length) {
        typeSpeed = 1500 // Pause at end
        setIsDeleting(true)
      } else if (isDeleting && charIndex <= minVisibleChars) {
        // Once we reach minimum visible chars, switch to next title
        setIsDeleting(false)
        setTitleIndex((prev) => (prev + 1) % titles.length)
        typeSpeed = 500 // Pause before next title
      }

      typeTimeoutRef.current = window.setTimeout(typeEffect, typeSpeed)
    }

    // Start typing effect; clear any previous timeout to avoid duplicates
    if (typeTimeoutRef.current) window.clearTimeout(typeTimeoutRef.current)
    typeTimeoutRef.current = window.setTimeout(typeEffect, 300)

    return () => {
      if (typeTimeoutRef.current) window.clearTimeout(typeTimeoutRef.current)
    }
  }, [titleIndex, charIndex, isDeleting])

  const handleScrollToAbout = () => {
    const aboutSection = document.getElementById('about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const socialLinks = [
    { href: 'https://github.com/yourusername', icon: Github, labelKey: 'hero.socialGithub', color: 'hover:text-gray-900' },
    { href: 'https://linkedin.com/in/yourusername', icon: Linkedin, labelKey: 'hero.socialLinkedin', color: 'hover:text-blue-600' },
    { href: 'https://twitter.com/yourusername', icon: Twitter, labelKey: 'hero.socialTwitter', color: 'hover:text-sky-500' },
    { href: 'mailto:amrkhaaled.eng12@gmail.com', icon: Mail, labelKey: 'hero.socialEmail', color: 'hover:text-red-500' },
  ]

  return (
    <section id="home" className="min-h-screen flex items-center pt-24 pb-12 relative overflow-hidden transition-colors duration-300">
      {/* Background with parallax */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-gray-light/90 to-gray-100/90 dark:from-black dark:to-black"
        aria-hidden="true"
      >
        <motion.div
          className="absolute inset-0 opacity-40"
          style={{ y: useTransform(useScroll().scrollY, [0, 600], [0, -60]) }}
        >
          <svg className="w-full h-full opacity-90" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="25" cy="25" r="0.8" fill="#007bff" opacity="0.08"/>
                <circle cx="75" cy="75" r="0.8" fill="#007bff" opacity="0.08"/>
                <circle cx="50" cy="10" r="0.6" fill="#0056b3" opacity="0.06"/>
                <circle cx="10" cy="50" r="0.6" fill="#0056b3" opacity="0.06"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grain)"/>
          </svg>
        </motion.div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-5 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left order-2 lg:order-1" data-aos="fade-up">
            <div className="flex items-center justify-center lg:justify-start mb-4">
              <Sparkles className="w-6 h-6 text-primary mr-2 animate-pulse" />
              <span className="text-primary font-medium">{t('hero.availableForWork')}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-dark dark:text-white leading-tight tracking-tight">
              {t('hero.greeting')} <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{t('hero.name')}</span>
            </h1>
            <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-gray-medium dark:text-gray-300 mb-6 min-h-[2em]">
              <span aria-live="polite" aria-atomic="true">{currentTitle}</span>
              <span className="ml-1 inline-block w-[1ch] text-primary">|</span>
            </h2>
            <p className={`text-base sm:text-lg text-gray-medium dark:text-gray-300 mb-6 leading-relaxed max-w-2xl ${isRTL ? 'mx-auto lg:mx-0 text-right' : 'mx-auto lg:mx-0'}`}>
              {t('hero.description')}
            </p>

            {/* Value proposition badges */}
            <div className={`flex flex-wrap gap-3 ${isRTL ? 'justify-center lg:justify-end' : 'justify-center lg:justify-start'} mb-8 lg:mb-10`}>
              <span className="px-4 py-2 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light rounded-full text-sm font-medium border border-primary/20">
                {t('hero.badge1')}
              </span>
              <span className="px-4 py-2 bg-secondary/10 dark:bg-secondary/20 text-secondary dark:text-secondary-light rounded-full text-sm font-medium border border-secondary/20">
                {t('hero.badge2')}
              </span>
              <span className="px-4 py-2 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light rounded-full text-sm font-medium border border-primary/20">
                {t('hero.badge3')}
              </span>
            </div>
            
            {/* Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 ${isRTL ? 'justify-center lg:justify-end' : 'justify-center lg:justify-start'} mb-12`}>
              <motion.a
                href="#projects"
                onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="group relative px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-full overflow-hidden transition-all duration-300 hover:scale-105 text-center shadow-glow"
                whileHover={{ boxShadow: '0 0 30px rgba(79,70,229,0.55)' }}
                transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
              >
                <span className="relative z-10">{t('hero.viewWork')}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.a>
              <Link
                href="#contact"
                className="group px-8 py-4 border-2 border-primary text-primary font-medium rounded-full hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-glow backdrop-blur-sm bg-white/10 text-center"
              >
                {t('hero.getInTouch')}
              </Link>
            </div>

            {/* Social Links with staggered animation */}
            <div className="flex gap-4 justify-center lg:justify-start">
              {socialLinks.map((social, i) => {
                const IconComponent = social.icon
                return (
                  <motion.a
                    key={social.labelKey}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
                    transition={{ delay: 0.1 * i, duration: 0.4, ease: 'easeOut' }}
                    className={`w-12 h-12 bg-white/10 backdrop-blur-sm text-gray-600 rounded-full flex items-center justify-center shadow-light hover:scale-110 transition-transform duration-300 relative overflow-hidden group border border-white/20 ${social.color}`}
                    aria-label={t(social.labelKey)}
                  >
                    <span className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 z-0" />
                    <IconComponent className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:scale-110" />
                  </motion.a>
                )
              })}
            </div>
          </div>

          {/* Image */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2" data-aos="fade-left">
            <motion.div
              className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 group"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Rotating border */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-primary-dark to-primary rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-rotate transition-opacity duration-400" />

              {/* Image container */}
              <div className="relative w-full h-full rounded-full overflow-hidden shadow-heavy transition-all duration-400 group-hover:scale-105 bg-transparent flex items-center justify-center">
                <Image
                  src="/amr.png"
                  alt="Amr Khaled portrait"
                  fill
                  sizes="(min-width:1024px) 24rem, (min-width:640px) 20rem, 16rem"
                  className="object-cover object-center saturate-110 contrast-105"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce-slow hover:scale-110 transition-transform duration-400"
          onClick={handleScrollToAbout}
        >
          <div className="w-8 h-8 border-2 border-primary border-t-0 border-l-0 transform rotate-45" />
        </div>
      </div>
    </section>
  )
}

export default Hero

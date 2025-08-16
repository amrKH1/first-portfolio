'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'

const About = () => {
  const { t, isRTL } = useLanguage()
  const [counters, setCounters] = useState({
    projects: 0,
    experience: 0,
    clients: 0
  })

  const finalCounts = {
    projects: 50,
    experience: 5,
    clients: 30
  }

  useEffect(() => {
    const animateCounters = () => {
      const duration = 2000 // 2 seconds
      const steps = 60 // 60 steps for smooth animation
      const stepDuration = duration / steps

      let currentStep = 0

      const timer = setInterval(() => {
        currentStep++
        const progress = currentStep / steps

        setCounters({
          projects: Math.floor(finalCounts.projects * progress),
          experience: Math.floor(finalCounts.experience * progress),
          clients: Math.floor(finalCounts.clients * progress)
        })

        if (currentStep >= steps) {
          clearInterval(timer)
          setCounters(finalCounts) // Ensure final values are exact
        }
      }, stepDuration)

      return () => clearInterval(timer)
    }

    // Start animation when component mounts
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters()
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 }
    )

    const aboutSection = document.getElementById('about')
    if (aboutSection) {
      observer.observe(aboutSection)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="py-24 bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-5">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-dark dark:text-gray-100 mb-4 relative">
            {t('about.title')}
            <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-15 h-1 bg-gradient-to-r from-primary to-primary-dark rounded-full" />
          </h2>
          <p className="text-lg text-gray-medium dark:text-gray-300 max-w-2xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div data-aos="fade-right">
            <p className={`text-lg text-gray-medium dark:text-gray-300 leading-relaxed mb-8 ${isRTL ? 'text-right' : ''}`}>
              {t('about.description1')}
            </p>
            <p className={`text-lg text-gray-medium dark:text-gray-300 leading-relaxed mb-12 ${isRTL ? 'text-right' : ''}`}>
              {t('about.description2')}
            </p>

            {/* Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              <div className="text-center p-6 sm:p-8 bg-gray-light dark:bg-[#1a1a1a] rounded-2xl hover:transform hover:-translate-y-2 transition-all duration-400 border border-black/5 dark:border-white/10">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-2">
                  {counters.projects}+
                </h3>
                <p className="text-sm sm:text-base text-gray-medium font-medium">{t('about.stat1')}</p>
              </div>
              <div className="text-center p-6 sm:p-8 bg-gray-light dark:bg-[#1a1a1a] rounded-2xl hover:transform hover:-translate-y-2 transition-all duration-400 border border-black/5 dark:border-white/10">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-2">
                  {counters.experience}+
                </h3>
                <p className="text-sm sm:text-base text-gray-medium font-medium">{t('about.stat2')}</p>
              </div>
              <div className="text-center p-6 sm:p-8 bg-gray-light dark:bg-[#1a1a1a] rounded-2xl hover:transform hover:-translate-y-2 transition-all duration-400 border border-black/5 dark:border-white/10">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-2">
                  {counters.clients}+
                </h3>
                <p className="text-sm sm:text-base text-gray-medium font-medium">{t('about.stat3')}</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="flex justify-center" data-aos="fade-left">
            <div className="relative w-full max-w-md">
              <div className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-heavy hover:transform hover:scale-105 transition-all duration-400 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="text-6xl mb-4">📸</div>
                  <div className="text-lg font-medium">{t('about.photoPlaceholder')}</div>
                  <div className="text-sm">{t('about.photoSubtext')}</div>
                  <div className="text-xs mt-2 opacity-70">{t('about.photoNote')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

'use client'

import { motion } from 'framer-motion'
import { Globe, Languages } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function LanguageToggle() {
  const { language, setLanguage, t, isLoading } = useLanguage()

  if (isLoading) {
    return (
      <div className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-gray-700 animate-pulse" />
    )
  }

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en'
    setLanguage(newLanguage)
  }

  return (
    <button
      onClick={toggleLanguage}
      className="group relative w-12 h-10 rounded-xl border border-gray-200 dark:border-white/20 bg-white dark:bg-gray-800 shadow-sm hover:shadow-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black flex items-center justify-center overflow-hidden"
      aria-label={t('lang.switchTo')}
      title={t('lang.switchTo')}
    >
      {/* Background gradient animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: language === 'ar' 
            ? 'linear-gradient(90deg, #312e81 0%, #0891b2 100%)'
            : 'linear-gradient(90deg, #0891b2 0%, #312e81 100%)'
        }}
      />
      
      {/* Language indicator */}
      <div className="relative z-10 flex items-center justify-center">
        <motion.div
          key={language}
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.3, ease: 'backOut' }}
          className="flex items-center"
        >
          <Languages className="w-4 h-4 text-gray-600 dark:text-gray-300 group-hover:text-white transition-colors duration-300" />
        </motion.div>
      </div>
      
      {/* Language text overlay */}
      <motion.div
        key={`text-${language}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.2 }}
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-[8px] font-medium text-gray-500 dark:text-gray-400 group-hover:text-white transition-colors duration-300"
      >
        {t('lang.switch')}
      </motion.div>
    </button>
  )
}

// Alternative compact version for mobile
export function LanguageToggleCompact() {
  const { language, setLanguage, t, isLoading } = useLanguage()

  if (isLoading) {
    return (
      <div className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
    )
  }

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en'
    setLanguage(newLanguage)
  }

  return (
    <button
      onClick={toggleLanguage}
      className="group relative w-8 h-8 rounded-lg border border-gray-200 dark:border-white/20 bg-white dark:bg-gray-800 shadow-sm hover:shadow-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 flex items-center justify-center"
      aria-label={t('lang.switchTo')}
      title={t('lang.switchTo')}
    >
      <motion.div
        key={language}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2 }}
        className="text-xs font-bold text-gray-600 dark:text-gray-300 group-hover:text-primary transition-colors duration-300"
      >
        {language === 'en' ? 'ع' : 'EN'}
      </motion.div>
    </button>
  )
}

// Text-based toggle for navigation
export function LanguageToggleText() {
  const { language, setLanguage, t, isLoading } = useLanguage()

  if (isLoading) {
    return (
      <div className="w-16 h-6 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
    )
  }

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en'
    setLanguage(newLanguage)
  }

  return (
    <button
      onClick={toggleLanguage}
      className="group relative px-3 py-1.5 rounded-lg border border-gray-200 dark:border-white/20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
      aria-label={t('lang.switchTo')}
    >
      <motion.span
        key={language}
        initial={{ opacity: 0, x: language === 'ar' ? -10 : 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-primary transition-colors duration-300"
      >
        {t('lang.switch')}
      </motion.span>
    </button>
  )
}

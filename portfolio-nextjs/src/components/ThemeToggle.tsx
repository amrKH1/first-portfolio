'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useThemeTransition } from '@/hooks/useThemeTransition'
import { useLanguage } from '@/contexts/LanguageContext'

const storageKey = 'amr-theme'

export default function ThemeToggle() {
  const { t } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => 'light')
  const { createTransition } = useThemeTransition()

  useEffect(() => {
    // On mount: sync with localStorage or system preference
    const saved = (typeof window !== 'undefined' && localStorage.getItem(storageKey)) as 'light' | 'dark' | null
    if (saved) {
      setTheme(saved)
      document.documentElement.classList.toggle('dark', saved === 'dark')
    } else {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      const initial = prefersDark ? 'dark' : 'light'
      setTheme(initial)
      document.documentElement.classList.toggle('dark', initial === 'dark')
    }
    setMounted(true)
  }, [])

  const toggle = async () => {
    const next = theme === 'dark' ? 'light' : 'dark'

    // Start transition animation
    createTransition(next, {
      type: 'ripple',
      duration: 600,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    })

    // Apply theme change
    setTheme(next)
    if (typeof window !== 'undefined') localStorage.setItem(storageKey, next)
    document.documentElement.classList.toggle('dark', next === 'dark')
  }

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
    )
  }

  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? t('theme.switchToLight') : t('theme.switchToDark')}
      className="group relative w-14 h-8 rounded-xl border border-gray-200 dark:border-white/20 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 shadow-sm hover:shadow-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black overflow-hidden"
    >
      {/* Background gradient that shifts */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: isDark
            ? 'linear-gradient(90deg, #312e81 0%, #0891b2 100%)'
            : 'linear-gradient(90deg, #0891b2 0%, #312e81 100%)'
        }}
      />

      {/* Sliding indicator */}
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className={`absolute top-1 w-6 h-6 rounded-lg shadow-medium flex items-center justify-center z-10 ${
          isDark
            ? 'right-1 bg-gradient-to-br from-primary to-primary-dark'
            : 'left-1 bg-gradient-to-br from-secondary to-cyan-600'
        }`}
      >
        <motion.div
          key={isDark ? 'moon' : 'sun'}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 180 }}
          transition={{ duration: 0.4, ease: 'backOut' }}
        >
          {isDark ? (
            <Moon className="w-3.5 h-3.5 text-white" />
          ) : (
            <Sun className="w-3.5 h-3.5 text-white" />
          )}
        </motion.div>
      </motion.div>

      {/* Subtle text labels */}
      <div className="absolute inset-0 flex items-center justify-between px-2 text-xs font-medium text-gray-500 dark:text-gray-400 pointer-events-none">
        <span className={`transition-opacity duration-300 ${!isDark ? 'opacity-100' : 'opacity-0'}`}>
          ☀
        </span>
        <span className={`transition-opacity duration-300 ${isDark ? 'opacity-100' : 'opacity-0'}`}>
          ☾
        </span>
      </div>
    </button>
  )
}


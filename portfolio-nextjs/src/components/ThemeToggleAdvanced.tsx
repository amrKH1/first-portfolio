'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun, Monitor, ChevronDown } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

const themeOptions = [
  { value: 'light' as const, label: 'Light', icon: Sun },
  { value: 'dark' as const, label: 'Dark', icon: Moon },
  { value: 'auto' as const, label: 'Auto', icon: Monitor },
]

export default function ThemeToggleAdvanced() {
  const { theme, setTheme, isLoading } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  if (isLoading) {
    return (
      <div className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-gray-700 animate-pulse" />
    )
  }

  const currentOption = themeOptions.find(option => option.value === theme)
  const CurrentIcon = currentOption?.icon || Sun

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative w-10 h-10 rounded-xl border border-gray-200 dark:border-white/20 bg-white dark:bg-gray-800 shadow-sm hover:shadow-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black flex items-center justify-center"
        aria-label={`Current theme: ${currentOption?.label}. Click to change theme`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <motion.div
          key={theme}
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.3, ease: 'backOut' }}
          className="relative"
        >
          <CurrentIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </motion.div>
        
        <ChevronDown 
          className={`absolute bottom-0 right-0 w-3 h-3 text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute top-12 right-0 z-50 min-w-[140px] bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-white/20 shadow-xl overflow-hidden"
            >
              {themeOptions.map((option, index) => {
                const Icon = option.icon
                const isSelected = theme === option.value
                
                return (
                  <motion.button
                    key={option.value}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      setTheme(option.value)
                      setIsOpen(false)
                    }}
                    className={`w-full px-4 py-3 flex items-center gap-3 text-left transition-colors duration-200 ${
                      isSelected
                        ? 'bg-primary/10 text-primary'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="font-medium">{option.label}</span>
                    {isSelected && (
                      <motion.div
                        layoutId="selected-indicator"
                        className="ml-auto w-2 h-2 rounded-full bg-primary"
                      />
                    )}
                  </motion.button>
                )
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

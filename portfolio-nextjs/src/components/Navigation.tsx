'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import LanguageToggle from './LanguageToggle'
import { useLanguage } from '@/contexts/LanguageContext'

const Navigation = () => {
  const { t, isRTL, isLoading } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const navItems = [
    { href: '#home', label: t('nav.home') },
    { href: '#about', label: t('nav.about') },
    { href: '#skills', label: t('nav.skills') },
    { href: '#projects', label: t('nav.projects') },
    { href: '#experience', label: t('nav.experience') },
    { href: '#contact', label: t('nav.contact') },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      // Update active section based on scroll position
      const sections = navItems.map(item => item.href.substring(1))
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 200 && rect.bottom >= 200
        }
        return false
      })
      
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    // Handle external links
    if (href.startsWith('/')) {
      window.location.href = href
      return
    }

    const targetId = href.substring(1)
    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }

    setIsMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded-md z-[60] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        {t('nav.skipToMain')}
      </a>

      <nav className={`fixed top-0 w-full z-50 transition-all duration-400 ${
        isScrolled
          ? 'bg-white/95 dark:bg-black/95 backdrop-blur-xl shadow-light dark:shadow-[0_2px_12px_rgba(0,0,0,0.8)] border-b border-gray-200/70 dark:border-white/10'
          : 'bg-white/90 dark:bg-black/90 backdrop-blur-xl border-b border-gray-200/50 dark:border-white/10'
      }`}>
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex justify-between items-center h-[70px]">
          {/* Logo */}
          <div className="nav-logo">
            <Link 
              href="#home" 
              className="text-2xl font-bold text-gray-dark dark:text-gray-100 hover:text-primary hover:scale-105 transition-all duration-400"
              onClick={(e) => {
                e.preventDefault()
                handleNavClick('#home')
              }}
            >
              {t('hero.name')}<span className="text-primary">.</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <ul className={`hidden md:flex ${isRTL ? 'space-x-reverse' : ''} space-x-8`}>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`relative font-medium transition-all duration-400 py-2 px-0 hover:text-primary ${
                    activeSection === item.href.substring(1)
                      ? 'text-primary'
                      : 'text-gray-dark dark:text-gray-200'
                  }`}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(item.href)
                  }}
                >
                  {item.label}
                  <span className={`absolute bottom-[-5px] left-1/2 transform -translate-x-1/2 h-[3px] bg-gradient-to-r from-primary to-primary-dark rounded-full transition-all duration-400 ${
                    activeSection === item.href.substring(1)
                      ? 'w-full'
                      : 'w-0 hover:w-full'
                  }`} />
                  <span className="absolute top-0 left-0 w-full h-full bg-primary/10 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10" />
                </Link>
              </li>
            ))}

          </ul>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className={`flex flex-col cursor-pointer transition-all duration-300 ${
                isMobileMenuOpen ? 'active' : ''
              }`}
              aria-label="Toggle mobile menu"
            >
              <span className={`w-6 h-[3px] bg-gray-dark dark:bg-gray-200 rounded-sm transition-all duration-300 mb-[3px] ${
                isMobileMenuOpen ? 'transform rotate-45 translate-y-[6px]' : ''
              }`} />
              <span className={`w-6 h-[3px] bg-gray-dark dark:bg-gray-200 rounded-sm transition-all duration-300 mb-[3px] ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`} />
              <span className={`w-6 h-[3px] bg-gray-dark dark:bg-gray-200 rounded-sm transition-all duration-300 ${
                isMobileMenuOpen ? 'transform -rotate-45 -translate-y-[6px]' : ''
              }`} />
            </button>
          </div>
          {/* Right-side controls */}
          <div className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} gap-3`}>
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden absolute top-full left-0 w-full transition-all duration-400 overflow-hidden ${
          isMobileMenuOpen
            ? 'max-h-96 opacity-100'
            : 'max-h-0 opacity-0'
        }`}>
          <ul className="py-4 space-y-2 bg-white/98 dark:bg-gray-900/95 backdrop-blur-md shadow-light dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] border-t border-black/10 dark:border-white/10">
            {navItems.map((item) => (
              <li key={item.href} className="text-center">
                <Link
                  href={item.href}
                  className={`block py-3 px-6 font-medium transition-all duration-300 hover:text-primary hover:bg-primary/5 dark:hover:bg-primary/10 rounded-lg mx-4 ${
                    activeSection === item.href.substring(1)
                      ? 'text-primary bg-primary/10 dark:bg-primary/15'
                      : 'text-gray-dark dark:text-gray-200'
                  }`}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(item.href)
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
    </>
  )
}

export default Navigation

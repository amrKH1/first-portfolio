'use client'

import { useLanguage } from '@/contexts/LanguageContext'

const Footer = () => {
  const { t, isRTL } = useLanguage()
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    { href: '#home', label: t('nav.home') },
    { href: '#about', label: t('nav.about') },
    { href: '#projects', label: t('nav.projects') },
    { href: '#contact', label: t('nav.contact') },
  ]

  const handleNavClick = (href: string) => {
    const targetId = href.substring(1)
    const targetElement = document.getElementById(targetId)
    
    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
  }

  return (
    <footer className="border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-gray-900 py-12 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6 md:gap-8 text-center md:text-left">
          <div className="footer-text">
            <p className="text-gray-600 dark:text-gray-300 mb-0 font-medium">
              &copy; {currentYear} {t('hero.name')}. {t('footer.rights')}
            </p>
          </div>
          
          <div className="flex gap-8">
            {footerLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-gray-600 dark:text-gray-200 hover:text-primary transition-colors duration-300 font-medium"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

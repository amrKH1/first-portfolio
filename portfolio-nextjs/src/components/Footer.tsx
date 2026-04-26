'use client'

import { motion } from 'framer-motion'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const generalLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/work', label: 'Work' },
    { href: '/blog', label: 'Blog' },
    { href: '/resources', label: 'Resources' },
  ]

  const specificLinks = [
    { href: '/about', label: 'About' },
    { href: '/work', label: 'Work' },
    { href: '/blog', label: 'Blog' },
    { href: '/resources', label: 'Resources' },
  ]

  const moreLinks = [
    { href: 'mailto:amrkhaaled.eng12@gmail.com', label: 'Email' },
    { href: 'https://github.com/amrkhaled', label: 'GitHub' },
  ]

  const socialLinks = [
    { href: 'https://linkedin.com/in/amrkhaled', label: 'LinkedIn' },
    { href: 'https://github.com/amrkhaled', label: 'GitHub' },
    { href: 'https://twitter.com/amrkhaled', label: 'Twitter' },
  ]

  return (
    <motion.footer 
      className="border-t border-black/20 dark:border-white/20 bg-white dark:bg-black py-16 transition-colors duration-500"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-6xl mx-auto px-5">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {/* General Links */}
          <div>
            <h3 className="text-lg font-semibold text-black dark:text-white mb-4">General</h3>
            <ul className="space-y-2 list-none pl-0">
              {generalLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-300 block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Specific Links */}
          <div>
            <h3 className="text-lg font-semibold text-black dark:text-white mb-4">Specifics</h3>
            <ul className="space-y-2 list-none pl-0">
              {specificLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-300 block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h3 className="text-lg font-semibold text-black dark:text-white mb-4">More</h3>
            <ul className="space-y-2 list-none pl-0">
              {moreLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-300 block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold text-black dark:text-white mb-4">Links</h3>
            <ul className="space-y-2 list-none pl-0">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-300 block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div 
          className="border-t border-black/20 dark:border-white/20 pt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              © {currentYear} Amr Khaled. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="/privacy" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-300">
                Terms & Conditions
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  )
}

export default Footer

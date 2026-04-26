'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Mail, Send } from 'lucide-react'
import ContactSheet from '@/components/ContactSheet'

const Contact = () => {
  const [contactOpen, setContactOpen] = useState(false)
  
  const socialLinks = [
    { href: 'https://github.com/amrkhaled', icon: Github, label: 'GitHub' },
    { href: 'https://linkedin.com/in/amrkhaled', icon: Linkedin, label: 'LinkedIn' },
    { href: 'https://twitter.com/amrkhaled', icon: Twitter, label: 'Twitter' },
    { href: 'mailto:amrkhaaled.eng12@gmail.com', icon: Mail, label: 'Email' },
  ]

  return (
    <>
      <section id="contact" className="py-20 bg-white dark:bg-black">
        <div className="max-w-6xl mx-auto px-6">
          {/* Section Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
              GET IN TOUCH
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Let's Work Together
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
              Have a project in mind? I'd love to hear about it. Send me a message and let's discuss how we can work together to bring your vision to life.
            </p>
            
            {/* CTA Buttons - Same as Hero */}
            <motion.div
              className="flex flex-wrap gap-4 justify-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.button
                onClick={() => setContactOpen(true)}
                className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full text-sm font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 shadow-lg inline-flex items-center gap-2"
                whileHover={{ 
                  scale: 1.05,
                  y: -2,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Send className="w-4 h-4" />
                Work Together
              </motion.button>
              
              <motion.a
                href="mailto:amrkhaaled.eng12@gmail.com"
                className="px-8 py-3 border-2 border-black dark:border-white text-black dark:text-white rounded-full text-sm font-semibold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 inline-flex items-center gap-2"
                whileHover={{ 
                  scale: 1.05,
                  y: -2,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-4 h-4" />
                Send Email
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center bg-white/10 dark:bg-black/10 backdrop-blur-sm border border-black/20 dark:border-white/20 rounded-full text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 shadow-lg"
                whileHover={{ 
                  scale: 1.15, 
                  y: -3,
                  rotate: 5,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1, ease: "easeOut" }}
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Contact Sheet */}
      <ContactSheet isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  )
}

export default Contact

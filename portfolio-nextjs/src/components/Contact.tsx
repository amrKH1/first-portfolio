'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { contactApi, handleApiError } from '@/lib/api'
import { useLanguage } from '@/contexts/LanguageContext'

const Contact = () => {
  const { t, isRTL } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notification, setNotification] = useState<{
    message: string
    type: 'success' | 'error' | null
  }>({ message: '', type: null })
  const [hp, setHp] = useState('') // honeypot
  const [startTs] = useState(Date.now()) // submission timing

  const contactInfo = [
    {
      icon: Mail,
      title: t('contact.email'),
      value: 'amrkhaaled.eng12@gmail.com',
      href: 'mailto:amrkhaaled.eng12@gmail.com',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Phone,
      title: t('contact.phone'),
      value: '+967 774912704',
      href: 'tel:+967774912704',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: MapPin,
      title: t('contact.location'),
      value: 'Yemen - Aden',
      href: '#',
      color: 'from-purple-500 to-pink-500'
    }
  ]

  const socialLinks = [
    { href: 'https://github.com/yourusername', icon: Github, label: 'GitHub', color: 'hover:text-gray-900' },
    { href: 'https://linkedin.com/in/yourusername', icon: Linkedin, label: 'LinkedIn', color: 'hover:text-blue-600' },
    { href: 'https://twitter.com/yourusername', icon: Twitter, label: 'Twitter', color: 'hover:text-sky-500' },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification({ message: '', type: null })
    }, 5000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (hp) {
      // Honeypot filled -> likely bot
      return
    }

    if (Date.now() - startTs < 1500) {
      // Submitted too fast -> likely bot
      return
    }

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      showNotification(t('contact.form.fillFields'), 'error')
      return
    }

    if (!isValidEmail(formData.email)) {
      showNotification(t('contact.form.invalidEmail'), 'error')
      return
    }

    setIsSubmitting(true)

    try {
      // Submit to API
      const response = await contactApi.submitContact({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        source: 'Portfolio'
      })

      if (response.success) {
        showNotification(response.message || t('contact.form.success'), 'success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        showNotification(t('contact.form.error'), 'error')
      }
    } catch (error) {
      const errorMessage = handleApiError(error)
      showNotification(errorMessage, 'error')
    } finally {
      setIsSubmitting(false)
    }
  }



  return (
    <section id="contact" className="py-24 bg-gray-50 dark:bg-black transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-5">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-dark dark:text-gray-100 mb-4 relative">
            {t('contact.title')}
            <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-15 h-1 bg-gradient-to-r from-primary to-primary-dark rounded-full" />
          </h2>
          <p className="text-lg text-gray-medium dark:text-gray-300 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Information */}
          <div data-aos="fade-right">
            <div className="space-y-6 lg:space-y-8 mb-8">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon
                return (
                  <div key={index} className="flex items-center gap-4 lg:gap-6 group">
                    <div className={`w-12 h-12 lg:w-15 lg:h-15 bg-gradient-to-br ${info.color} text-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                      <IconComponent className="w-6 h-6 lg:w-7 lg:h-7" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-dark dark:text-white mb-2 group-hover:text-primary transition-colors duration-300">
                        {info.title}
                      </h3>
                      <p className="text-gray-medium dark:text-gray-300">
                        {info.href !== '#' ? (
                          <a href={info.href} className="hover:text-primary transition-colors duration-300 font-medium">
                            {info.value}
                          </a>
                        ) : (
                          <span className="font-medium">{info.value}</span>
                        )}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 bg-white/10 backdrop-blur-sm text-gray-600 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 border border-white/20 shadow-lg ${social.color}`}
                    aria-label={social.label}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Contact Form */}
          <div data-aos="fade-left">
            <form onSubmit={handleSubmit} className="bg-gray-light dark:bg-[#1a1a1a] p-6 sm:p-8 lg:p-12 rounded-3xl shadow-light dark:shadow-[0_8px_24px_rgba(0,0,0,0.85)] transition-shadow border border-black/5 dark:border-white/10">
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label htmlFor="contact-name" className="block text-gray-700 dark:text-gray-200 font-medium mb-2">{t('contact.form.name')}</label>
                  <input type="text" name="hp" value={hp} onChange={(e) => setHp(e.target.value)} className="hidden" tabIndex={-1} autoComplete="off" />
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    placeholder={t('contact.form.namePlaceholder')}
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 border-2 border-gray-200 dark:border-white/10 rounded-xl text-base font-medium transition-all duration-300 focus:border-primary focus:shadow-medium focus:scale-[1.02] focus:outline-none bg-white dark:bg-gray-900/30 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-gray-700 dark:text-gray-200 font-medium mb-2">{t('contact.form.email')}</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    placeholder={t('contact.form.emailPlaceholder')}
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 border-2 border-gray-200 dark:border-white/10 rounded-xl text-base font-medium transition-all duration-300 focus:border-primary focus:shadow-medium focus:scale-[1.02] focus:outline-none bg-white dark:bg-gray-900/30 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="contact-subject" className="block text-gray-700 dark:text-gray-200 font-medium mb-2">{t('contact.form.subject')}</label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    placeholder={t('contact.form.subjectPlaceholder')}
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 border-2 border-gray-200 dark:border-white/10 rounded-xl text-base font-medium transition-all duration-300 focus:border-primary focus:shadow-medium focus:scale-[1.02] focus:outline-none bg-white dark:bg-gray-900/30 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-gray-700 dark:text-gray-200 font-medium mb-2">{t('contact.form.message')}</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    placeholder={t('contact.form.messagePlaceholder')}
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 border-2 border-gray-200 dark:border-white/10 rounded-xl text-base font-medium transition-all duration-300 focus:border-primary focus:shadow-medium focus:scale-[1.02] focus:outline-none bg-white dark:bg-gray-900/30 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 resize-vertical min-h-[120px]"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? t('contact.form.sending') : t('contact.form.send')}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Notification */}
        {notification.type && (
          <div className={`fixed top-5 right-5 p-4 rounded-xl text-white font-medium z-50 shadow-medium transition-all duration-300 flex items-center gap-2 ${
            notification.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'
          }`}>
            {notification.type === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span>{notification.message}</span>
          </div>
        )}
      </div>
    </section>
  )
}

export default Contact

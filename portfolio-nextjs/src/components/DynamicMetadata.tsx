'use client'

import { useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function DynamicMetadata() {
  const { language, t } = useLanguage()

  useEffect(() => {
    // Update document title
    document.title = t('meta.title')
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', t('meta.description'))
    }
    
    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]')
    if (metaKeywords) {
      metaKeywords.setAttribute('content', t('meta.keywords'))
    } else {
      const meta = document.createElement('meta')
      meta.name = 'keywords'
      meta.content = t('meta.keywords')
      document.head.appendChild(meta)
    }
    
    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) {
      ogTitle.setAttribute('content', t('meta.title'))
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]')
    if (ogDescription) {
      ogDescription.setAttribute('content', t('meta.description'))
    }
    
    // Update Twitter Card tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]')
    if (twitterTitle) {
      twitterTitle.setAttribute('content', t('meta.title'))
    }
    
    const twitterDescription = document.querySelector('meta[name="twitter:description"]')
    if (twitterDescription) {
      twitterDescription.setAttribute('content', t('meta.description'))
    }
    
    // Update structured data
    const structuredDataScript = document.querySelector('script[type="application/ld+json"]')
    if (structuredDataScript) {
      try {
        const data = JSON.parse(structuredDataScript.textContent || '{}')
        data.name = t('hero.name')
        data.jobTitle = t('hero.title1')
        data.description = t('meta.description')
        structuredDataScript.textContent = JSON.stringify(data)
      } catch (e) {
        console.warn('Failed to update structured data:', e)
      }
    }
    
  }, [language, t])

  return null // This component doesn't render anything
}

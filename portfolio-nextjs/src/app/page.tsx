'use client'

import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

// Import components
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Experience from '@/components/Experience'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import DynamicMetadata from '@/components/DynamicMetadata'

export default function Home() {
  useEffect(() => {
    // Initialize AOS (Animate On Scroll) with smoother settings
    AOS.init({
      duration: 1200,
      easing: 'ease-out-cubic',
      once: true,
      mirror: false,
      offset: 100,
      delay: 100
    })

    // Cleanup function
    return () => {
      AOS.refresh()
    }
  }, [])

  return (
    <>
      <DynamicMetadata />
      <Navigation />
      <main id="main-content" className="min-h-screen">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

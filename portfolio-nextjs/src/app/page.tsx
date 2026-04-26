import dynamic from 'next/dynamic'

// Above-the-fold: load immediately
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import DynamicMetadata from '@/components/DynamicMetadata'

// Below-the-fold: code-split with lightweight skeletons
const FeaturedWork = dynamic(() => import('@/components/FeaturedWork'), {
  loading: () => <div className="h-[500px] bg-gray-50 dark:bg-gray-950 animate-pulse" />,
})
const About = dynamic(() => import('@/components/About'), {
  loading: () => <div className="h-[600px] bg-gray-50 dark:bg-gray-950 animate-pulse" />,
})
const Skills = dynamic(() => import('@/components/Skills'), {
  loading: () => <div className="h-[400px] bg-gray-50 dark:bg-gray-950 animate-pulse" />,
})
const HowIWork = dynamic(() => import('@/components/HowIWork'), {
  loading: () => <div className="h-[500px] bg-gray-50 dark:bg-gray-950 animate-pulse" />,
})
const Pricing = dynamic(() => import('@/components/Pricing'), {
  loading: () => <div className="h-[600px] bg-gray-50 dark:bg-gray-950 animate-pulse" />,
})
const Contact = dynamic(() => import('@/components/Contact'), {
  loading: () => <div className="h-[400px] bg-gray-50 dark:bg-gray-950 animate-pulse" />,
})
const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <div className="h-[200px] bg-gray-50 dark:bg-gray-950 animate-pulse" />,
})

export default function Home() {
  return (
    <>
      <DynamicMetadata />

      <Navigation />
      <main id="main-content" className="min-h-screen">
        <Hero />

        {/* Below-the-fold sections — lazy loaded */}
        <FeaturedWork />
        <About />
        <Skills />
        <HowIWork />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

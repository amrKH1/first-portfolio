import { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ResourcesRoadmap from '@/components/ResourcesRoadmap'

export const metadata: Metadata = {
  title: 'Resources Library - Amr Khaled',
  description: 'A comprehensive digital library containing everything you need to learn different programming tracks, from beginner to advanced.',
  keywords: ['programming resources', 'web development', 'mobile development', 'AI', 'data science', 'learning paths', 'roadmaps'],
  openGraph: {
    title: 'Resources Library - Amr Khaled',
    description: 'A comprehensive digital library containing everything you need to learn different programming tracks, from beginner to advanced.',
    type: 'website',
  },
}

export default function ResourcesPage() {
  return (
    <>
      <Navigation />
      <main>
        <ResourcesRoadmap />
      </main>
      <Footer />
    </>
  )
}

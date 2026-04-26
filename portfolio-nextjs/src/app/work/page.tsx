import Work from '@/components/Work'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Work | Amr Khaled - Full-Stack Developer',
  description: 'Explore the projects and work of Amr Khaled, showcasing expertise in web and app development.',
}

export default function WorkPage() {
  return (
    <>
      <Navigation />
      <main className="pt-20">
        <Work />
      </main>
      <Footer />
    </>
  )
}

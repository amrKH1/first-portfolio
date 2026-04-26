import About from '@/components/About'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About | Amr Khaled - Full-Stack Developer',
  description: 'Learn more about Amr Khaled, a passionate full-stack developer with expertise in modern web technologies and a commitment to creating exceptional digital experiences.',
}

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="pt-20">
        <About />
      </main>
      <Footer />
    </>
  )
}

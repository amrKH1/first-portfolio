import BlogList from '@/components/BlogList'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { getAllPosts } from '@/lib/blog'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | Amr Khaled - Full-Stack Developer',
  description: 'Read the latest articles and insights from Amr Khaled on web development and technology.',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <>
      <Navigation />
      <main className="pt-20">
        <BlogList posts={posts} />
      </main>
      <Footer />
    </>
  )
}

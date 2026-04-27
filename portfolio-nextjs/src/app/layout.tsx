import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { ThemeProvider } from '@/components/ThemeProvider'
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
})

const socialImage = '/assets/og-image.svg'

export const metadata: Metadata = {
  title: {
    default: 'Amr Khaled - Full Stack Developer & Tech Innovator',
    template: '%s | Amr Khaled'
  },
  description: 'Full Stack Developer specializing in React, Node.js, Next.js, and modern web technologies. Creating innovative digital solutions and exceptional user experiences.',
  keywords: ['Full Stack Developer', 'React', 'Node.js', 'Next.js', 'JavaScript', 'TypeScript', 'Web Development', 'Mobile Development', 'UI/UX', 'Portfolio'],
  authors: [{ name: 'Amr Khaled' }],
  creator: 'Amr Khaled',
  publisher: 'Amr Khaled',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://amrkhaled.dev'),

  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/assets/light-theme.png', type: 'image/png', sizes: '32x32' },
      { url: '/assets/light-theme.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: '/assets/light-theme.png',
    shortcut: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Amr Khaled - Full Stack Developer & Tech Innovator',
    description: 'Full Stack Developer specializing in React, Node.js, Next.js, and modern web technologies. Creating innovative digital solutions and exceptional user experiences.',
    siteName: 'Amr Khaled Portfolio',
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: 'Amr Khaled - Full Stack Developer & Tech Innovator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amr Khaled - Full Stack Developer & Tech Innovator',
    description: 'Full Stack Developer specializing in React, Node.js, Next.js, and modern web technologies.',
    creator: '@amrkhaled',
    images: [socialImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // verification: {
  //   google: 'your-google-verification-code',
  //   yandex: 'your-yandex-verification-code',
  //   yahoo: 'your-yahoo-verification-code',
  // },
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://amrkhaled.dev'

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Amr Khaled',
  url: siteUrl,
  image: `${siteUrl}${socialImage}`,
  jobTitle: 'Full Stack Developer',
  description:
    'Full Stack Developer specializing in React, Node.js, Next.js, and modern web technologies.',
  sameAs: [
    'https://github.com/amrkhaled',
    'https://linkedin.com/in/amrkhaled',
    'https://twitter.com/amrkhaled',
  ],
  knowsAbout: [
    'React',
    'Next.js',
    'Node.js',
    'TypeScript',
    'JavaScript',
    'Web Development',
    'UI/UX Design',
  ],
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Amr Khaled Portfolio',
  url: siteUrl,
  author: { '@type': 'Person', name: 'Amr Khaled' },
  inLanguage: 'en',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`} suppressHydrationWarning={true}>
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/assets/light-theme.png" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
        <meta name="color-scheme" content="light dark" />


      </head>
      <body className={`${inter.className} antialiased overflow-x-hidden transition-colors duration-300 bg-white dark:bg-black`} suppressHydrationWarning={true}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </body>
    </html>
  )
}

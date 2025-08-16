import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'


const inter = Inter({ subsets: ['latin'] })

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
  alternates: {
    canonical: '/',
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
        url: '/assets/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Amr Khaled - Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amr Khaled - Full Stack Developer & Tech Innovator',
    description: 'Full Stack Developer specializing in React, Node.js, Next.js, and modern web technologies.',
    images: ['/assets/twitter-image.jpg'],
    creator: '@amrkhaled',
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
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preload" href="/assets/hero-image.jpg" as="image" />
        <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
        <meta name="color-scheme" content="light dark" />
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Amr Khaled",
              "jobTitle": "Full-Stack Developer",
              "description": "Professional web and mobile developer with 5+ years of experience",
              "url": "https://amr-portfolio.com",
              "email": "amrkhaaled.eng12@gmail.com",
              "telephone": "+967774912704",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Aden",
                "addressCountry": "Yemen"
              },
              "sameAs": [
                "https://github.com/yourusername",
                "https://linkedin.com/in/yourusername"
              ],
              "knowsAbout": [
                "React", "Node.js", "TypeScript", "Next.js", "Mobile Development"
              ]
            })
          }}
        />

        {/* Inline theme and language setter to avoid flash */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            try {
              // Theme initialization
              var themeKey='amr-theme';
              var savedTheme = localStorage.getItem(themeKey);
              var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              var theme = savedTheme || (prefersDark ? 'dark' : 'light');
              if (theme === 'dark') {
                document.documentElement.classList.add('dark');
                document.querySelector('meta[name="theme-color"]').setAttribute('content', '#000000');
              }

              // Language initialization
              var langKey='amr-language';
              var savedLang = localStorage.getItem(langKey);
              var browserLang = navigator.language.startsWith('ar') ? 'ar' : 'en';
              var language = savedLang || browserLang;
              document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
              document.documentElement.lang = language;
            } catch(e) {}
          })();
        `}} />
      </head>
      <body className={`${inter.className} antialiased overflow-x-hidden transition-colors duration-300`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}

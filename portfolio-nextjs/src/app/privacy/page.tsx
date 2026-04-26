import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy Policy for amrkhaled.dev — how personal data is collected, used, and protected on this portfolio website.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/privacy' },
}

const lastUpdated = 'April 24, 2026'

export default function PrivacyPage() {
  return (
    <>
      <Navigation />
      <main className="bg-white dark:bg-black text-black dark:text-white transition-colors duration-500">
        <section className="max-w-3xl mx-auto px-5 pt-32 pb-24">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-300 mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <header className="mb-12 border-b border-black/10 dark:border-white/10 pb-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
              Privacy Policy
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Last updated: {lastUpdated}
            </p>
          </header>

          <div className="space-y-10 leading-relaxed text-gray-700 dark:text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold text-black dark:text-white mb-3">1. Introduction</h2>
              <p>
                This website (&ldquo;amrkhaled.dev&rdquo;) is a personal portfolio operated
                by Amr Khaled. This Privacy Policy explains what information is
                collected when you visit the site, how it is used, and the choices
                available to you. By using this website, you agree to the practices
                described below.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black dark:text-white mb-3">2. Information Collected</h2>
              <p className="mb-3">Only minimal data is collected, and only when necessary:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-black dark:text-white">Contact details</strong>{' '}
                  — if you send an email or use the contact form, your name, email
                  address, and the message you provide are collected solely to
                  respond to your inquiry.
                </li>
                <li>
                  <strong className="text-black dark:text-white">Technical data</strong>{' '}
                  — standard server logs such as IP address, browser type, device
                  type, and pages visited may be recorded for security and
                  performance monitoring.
                </li>
                <li>
                  <strong className="text-black dark:text-white">Analytics</strong>{' '}
                  — anonymous usage statistics may be collected to improve the
                  site experience. No personally identifying profile is built.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black dark:text-white mb-3">3. How Information Is Used</h2>
              <p>
                Information is used only to respond to messages, operate and
                secure the website, and understand aggregate visitor trends.
                Your data is never sold, rented, or shared with third parties
                for marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black dark:text-white mb-3">4. Cookies &amp; Local Storage</h2>
              <p>
                The site may use local storage to remember your preferences
                (such as theme and language). These are stored on your device
                and can be cleared at any time through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black dark:text-white mb-3">5. Third-Party Services</h2>
              <p>
                The site may embed content or icons from trusted third-party
                providers (e.g. fonts, icon CDNs, hosting). Those providers may
                receive basic request data as part of delivering their services,
                governed by their own privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black dark:text-white mb-3">6. Data Retention</h2>
              <p>
                Emails and contact form submissions are kept only as long as
                needed to handle your request or maintain a reasonable record
                of correspondence. You can request deletion at any time.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black dark:text-white mb-3">7. Your Rights</h2>
              <p>
                You may request access to, correction of, or deletion of any
                personal information you have shared. To exercise these rights,
                contact{' '}
                <a
                  href="mailto:amrkhaaled.eng12@gmail.com"
                  className="underline hover:text-black dark:hover:text-white transition-colors"
                >
                  amrkhaaled.eng12@gmail.com
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black dark:text-white mb-3">8. Changes to This Policy</h2>
              <p>
                This policy may be updated occasionally. The &ldquo;Last
                updated&rdquo; date above reflects the most recent revision.
                Continued use of the website after changes constitutes
                acceptance of the revised policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black dark:text-white mb-3">9. Contact</h2>
              <p>
                Questions about this Privacy Policy can be directed to{' '}
                <a
                  href="mailto:amrkhaaled.eng12@gmail.com"
                  className="underline hover:text-black dark:hover:text-white transition-colors"
                >
                  amrkhaaled.eng12@gmail.com
                </a>
                .
              </p>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

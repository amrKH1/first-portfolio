import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description:
    'Terms & Conditions governing the use of amrkhaled.dev — the personal portfolio of Amr Khaled.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/terms' },
}

const lastUpdated = 'April 24, 2026'

export default function TermsPage() {
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
              Terms &amp; Conditions
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Last updated: {lastUpdated}
            </p>
          </header>

          <div className="space-y-10 leading-relaxed text-gray-700 dark:text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold text-black dark:text-white mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing or using amrkhaled.dev (the &ldquo;Site&rdquo;),
                you agree to be bound by these Terms &amp; Conditions. If you
                do not agree with any part of these terms, please discontinue
                use of the Site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black dark:text-white mb-3">2. About the Site</h2>
              <p>
                The Site is a personal portfolio maintained by Amr Khaled,
                showcasing professional work, writing, and resources. It is
                provided for informational purposes and does not constitute a
                commercial service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black dark:text-white mb-3">3. Intellectual Property</h2>
              <p className="mb-3">
                All original content on this Site — including text, design,
                layout, code snippets, graphics, and projects — is the property
                of Amr Khaled unless otherwise stated, and is protected by
                applicable copyright and intellectual property laws.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Personal, non-commercial viewing is permitted.</li>
                <li>
                  Reproduction, redistribution, or commercial use requires prior
                  written permission.
                </li>
                <li>
                  Attribution is appreciated when referencing articles or
                  publicly shared code.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black dark:text-white mb-3">4. Acceptable Use</h2>
              <p>You agree not to use the Site to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Violate any applicable law or regulation.</li>
                <li>
                  Attempt to gain unauthorized access to any part of the Site
                  or its underlying systems.
                </li>
                <li>
                  Introduce malware, scrape content at scale, or disrupt normal
                  operation.
                </li>
                <li>
                  Misrepresent your identity or impersonate any person or
                  organization.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black dark:text-white mb-3">5. External Links</h2>
              <p>
                The Site may contain links to third-party websites provided for
                convenience. Those sites are not controlled by Amr Khaled, and
                no responsibility is accepted for their content, accuracy, or
                policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black dark:text-white mb-3">6. Disclaimer</h2>
              <p>
                The content on this Site is provided &ldquo;as is&rdquo; without
                warranties of any kind, express or implied. While care is taken
                to keep information accurate and up to date, no guarantee is
                made regarding completeness, reliability, or fitness for a
                particular purpose.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black dark:text-white mb-3">7. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, Amr Khaled shall not be
                liable for any direct, indirect, incidental, or consequential
                damages arising from the use of, or inability to use, the Site
                or any content contained on it.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black dark:text-white mb-3">8. Changes to These Terms</h2>
              <p>
                These Terms may be updated from time to time. The &ldquo;Last
                updated&rdquo; date above indicates the most recent revision.
                Continued use of the Site constitutes acceptance of any
                changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black dark:text-white mb-3">9. Contact</h2>
              <p>
                For questions about these Terms, contact{' '}
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

import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Contact A Little Better',
  description: 'Get in touch with A Little Better. For questions, feedback, or early access inquiries, reach out to us.',
  keywords: ['contact A Little Better', 'early access', 'feedback', 'inquiry'],
}

export default function ContactPage() {
  return (
    <article className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-accent-50">
      <Container className="py-16 md:py-24">
        {/* H1 */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Contact
          </h1>
        </header>

        {/* Contact Content */}
        <section className="mb-12">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-200 max-w-2xl mx-auto text-center">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
              For questions, feedback, or early access inquiries, you can reach us at:
            </p>
            
            <p className="mb-8">
              <a 
                href="mailto:founder@a-little-better.com" 
                className="text-primary-600 hover:text-primary-700 text-xl md:text-2xl font-semibold underline transition-colors"
              >
                founder@a-little-better.com
              </a>
            </p>

            <p className="text-gray-600 text-sm">
              We typically respond within 24-48 hours.
            </p>
          </div>
        </section>

        {/* Navigation Links */}
        <div className="mt-12 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" className="bg-primary-600 hover:bg-primary-700 text-white font-bold">
                Back to Homepage
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="border-2 border-primary-600 text-primary-600 hover:bg-primary-50">
                Learn About Us
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </article>
  )
}


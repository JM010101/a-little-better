import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'About A Little Better',
  description: 'Learn about A Little Better, a continuous improvement platform focused on helping small teams and operators make incremental, measurable improvements to how they work.',
  keywords: ['about A Little Better', 'continuous improvement platform', 'team improvement', 'incremental improvement'],
}

export default function AboutPage() {
  return (
    <article className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-accent-50">
      <Container className="py-16 md:py-24">
        {/* H1 */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            About A Little Better
          </h1>
        </header>

        {/* Paragraph 1 — What This Is */}
        <section className="mb-12">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-200 max-w-4xl mx-auto">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              A Little Better is a continuous improvement platform focused on helping small teams and operators make incremental, measurable improvements to how they work. Instead of large, risky overhauls, the platform is built around small changes that compound over time.
            </p>
          </div>
        </section>

        {/* Paragraph 2 — Why It Exists */}
        <section className="mb-12">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-200 max-w-4xl mx-auto">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              The project was created out of frustration with productivity tools that prioritize big initiatives while ignoring the reality of day-to-day operational friction. Most teams don't need a full rewrite — they need a way to consistently get slightly better.
            </p>
          </div>
        </section>

        {/* Paragraph 3 — Who Is Behind It */}
        <section className="mb-12">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-200 max-w-4xl mx-auto">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              A Little Better is an independent product currently in early development. It is being built by a small team with experience designing and operating real-world systems where reliability, iteration, and measurable outcomes matter more than hype.
            </p>
          </div>
        </section>

        {/* Company Attribution */}
        <section className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white shadow-lg max-w-4xl mx-auto">
            <p className="text-xl mb-4">
              © A Little Better
            </p>
            <p className="text-lg opacity-90">
              An independent software project
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
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-2 border-primary-600 text-primary-600 hover:bg-primary-50">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </article>
  )
}


import { Hero, Features, SocialProof, CTA } from '@/components'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <SocialProof />
      <CTA />
    </main>
  )
}
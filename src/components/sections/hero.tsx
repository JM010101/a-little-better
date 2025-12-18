'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/ui/logo'
import { prefersReducedMotion } from '@/lib/performance'

// Lazy load CSS3DScene to improve LCP (non-critical visual enhancement)
const CSS3DScene = dynamic(
  () => import('@/components/3d/CSS3DScene').then(mod => ({ default: mod.CSS3DScene })),
  { ssr: false }
)


// Using CSS 3D for React 19 compatibility
// React Three Fiber has compatibility issues with React 19
// To use React Three Fiber when it supports React 19, use:
// import dynamic from 'next/dynamic'
// const HeroScene = dynamic(
//   () => import('@/components/3d/HeroScene').then(mod => ({ default: mod.HeroScene })),
//   { ssr: false, loading: () => <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-primary-900 to-purple-900" /> }
// )

const Hero = () => {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleClick = (buttonId: string) => {
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_type: 'click',
        page_path: '/',
        metadata: { element_id: buttonId }
      })
    }).catch(() => {})
  }

  const reducedMotion = prefersReducedMotion()

  return (
    <section className="section-padding bg-gradient-to-br from-blue-900 via-primary-900 to-purple-900 text-white relative overflow-hidden min-h-screen flex items-center">
      {/* 3D Background Scene - Deferred to improve LCP */}
      {mounted && (
        <div className="absolute inset-0 z-0">
          <CSS3DScene />
        </div>
      )}
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 z-10"></div>
      
      <Container className="relative z-20">
        <div className="text-center max-w-5xl mx-auto">
          {/* Logo with 3D effect - Render immediately for LCP */}
          <div className="flex justify-center mb-8">
            <Logo size="xl" />
          </div>
          
          {/* Main Headline with neon effect - Critical for LCP, render immediately without animations */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Continuous Improvement{' '}
            <span className="neon-text-cyan relative inline-block">
              Platform for Teams
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-neon-cyan rounded-full neon-border"></div>
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join the early access waitlist for the platform that helps teams make small, measurable improvements that compound into extraordinary results.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="xl"
              onClick={() => handleClick('hero-cta-primary')}
              className="card-3d bg-white text-primary-600 hover:bg-gray-100 shadow-lg hover:shadow-xl font-bold depth-shadow-lg neon-border border-neon-blue"
            >
              Join the Waitlist
            </Button>
            <Button 
              variant="outline"
              size="xl"
              onClick={() => handleClick('hero-cta-secondary')}
              className="card-3d border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm neon-border"
            >
              Learn More
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-12 text-blue-200">
            <p className="text-sm mb-4">Trusted by forward-thinking teams</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
              {['Company A', 'Company B', 'Company C', 'Company D'].map((company, i) => (
                <div key={i} className="text-lg font-semibold">
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export { Hero }
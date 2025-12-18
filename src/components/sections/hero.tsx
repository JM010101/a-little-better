'use client'

import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/ui/logo'
import { FloatingElements } from '@/components/3d/FloatingElements'
import { CSS3DScene } from '@/components/3d/CSS3DScene'
import { motion } from 'framer-motion'
import { prefersReducedMotion } from '@/lib/performance'

// Using CSS 3D for React 19 compatibility
// React Three Fiber has compatibility issues with React 19
// To use React Three Fiber when it supports React 19, use:
// import dynamic from 'next/dynamic'
// const HeroScene = dynamic(
//   () => import('@/components/3d/HeroScene').then(mod => ({ default: mod.HeroScene })),
//   { ssr: false, loading: () => <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-primary-900 to-purple-900" /> }
// )

const Hero = () => {
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
      {/* 3D Background Scene - Using CSS 3D fallback for React 19 compatibility */}
      <div className="absolute inset-0 z-0">
        <CSS3DScene />
      </div>
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 z-10"></div>
      
      <Container className="relative z-20">
        <div className="text-center max-w-5xl mx-auto">
          {/* Logo with 3D effect */}
          <FloatingElements intensity={0.5}>
            <motion.div
              initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={reducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center mb-8"
            >
              <Logo size="xl" />
            </motion.div>
          </FloatingElements>
          
          {/* Main Headline with neon effect */}
          <motion.h1
            initial={reducedMotion ? {} : { opacity: 0, y: 30 }}
            animate={reducedMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            A little better goes a{' '}
            <span className="neon-text-cyan relative inline-block">
              long way
              <motion.div
                initial={reducedMotion ? {} : { scaleX: 0 }}
                animate={reducedMotion ? {} : { scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute -bottom-2 left-0 right-0 h-1 bg-neon-cyan rounded-full neon-border"
              ></motion.div>
            </span>
          </motion.h1>
          
          {/* Subheadline */}
          <motion.p
            initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={reducedMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Transform your business with small, intentional improvements that create lasting impact. 
            Discover how incremental changes compound into extraordinary results.
          </motion.p>
          
          {/* CTA Buttons with 3D effect */}
          <motion.div
            initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={reducedMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <FloatingElements intensity={0.3}>
              <Button 
                size="xl"
                onClick={() => handleClick('hero-cta-primary')}
                className="card-3d bg-white text-primary-600 hover:bg-gray-100 shadow-lg hover:shadow-xl font-bold depth-shadow-lg neon-border border-neon-blue"
              >
                Join the Waitlist
              </Button>
            </FloatingElements>
            <FloatingElements intensity={0.3}>
              <Button 
                variant="outline"
                size="xl"
                onClick={() => handleClick('hero-cta-secondary')}
                className="card-3d border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm neon-border"
              >
                Learn More
              </Button>
            </FloatingElements>
          </motion.div>
          
          {/* Trust Indicators */}
          <motion.div
            initial={reducedMotion ? {} : { opacity: 0 }}
            animate={reducedMotion ? {} : { opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 text-blue-200"
          >
            <p className="text-sm mb-4">Trusted by forward-thinking teams</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
              {['Company A', 'Company B', 'Company C', 'Company D'].map((company, i) => (
                <motion.div
                  key={i}
                  initial={reducedMotion ? {} : { opacity: 0, scale: 0.8 }}
                  animate={reducedMotion ? {} : { opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
                  className="text-lg font-semibold"
                >
                  {company}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

export { Hero }
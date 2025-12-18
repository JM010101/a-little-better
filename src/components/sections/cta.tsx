'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollParallax } from '@/components/3d/ScrollParallax'
import { SectionTransition } from '@/components/3d/SectionTransition'
import { FloatingElements } from '@/components/3d/FloatingElements'
import { CSS3DScene } from '@/components/3d/CSS3DScene'
import { motion } from 'framer-motion'
import { prefersReducedMotion } from '@/lib/performance'

// Using CSS 3D fallback instead of React Three Fiber due to React 19 compatibility issues
// const CTAParticles = dynamic(
//   () => import('@/components/3d/CTAParticles').then(mod => ({ default: mod.CTAParticles })),
//   { ssr: false, loading: () => null }
// )

const CTA = () => {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const reducedMotion = prefersReducedMotion()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setErrorMessage('Please enter your email address')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source: 'homepage_cta',
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        setEmail('')
      } else {
        setSubmitStatus('error')
        setErrorMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage('Failed to submit. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="section-padding bg-gradient-to-r from-primary-900 via-purple-900 to-primary-900 text-white relative overflow-hidden">
      {/* Particle Background - Using CSS 3D fallback */}
      <div className="absolute inset-0 opacity-20">
        <CSS3DScene />
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50 z-10"></div>

      <Container className="relative z-20">
        <div className="text-center max-w-4xl mx-auto">
          <SectionTransition>
            <motion.h2
              initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold mb-6 neon-text-cyan"
            >
              Join the Early Access Waitlist
            </motion.h2>
            <motion.p
              initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-blue-100 mb-8"
            >
              Be among the first teams to access our continuous improvement platform. 
              Get notified when we launch.
            </motion.p>
          </SectionTransition>
          
          {/* Waitlist Form with 3D effect */}
          <ScrollParallax speed={0.2}>
            <motion.div
              initial={reducedMotion ? {} : { opacity: 0, y: 50, scale: 0.95 }}
              whileInView={reducedMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="max-w-md mx-auto perspective-container"
            >
              <FloatingElements intensity={0.3}>
                <div className="card-3d bg-white/10 rounded-2xl p-8 border border-white/20 neon-border depth-shadow-lg">
                  <h3 className="text-2xl font-semibold mb-6 neon-text-blue">Get Early Access</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {submitStatus === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-4 bg-green-500/20 border border-green-400/30 rounded-lg text-green-100 text-sm neon-border"
                        style={{ boxShadow: '0 0 15px rgba(34, 197, 94, 0.3)' }}
                      >
                        ✅ Successfully joined! We'll be in touch soon.
                      </motion.div>
                    )}
                    
                    {submitStatus === 'error' && errorMessage && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-4 bg-red-500/20 border border-red-400/30 rounded-lg text-red-100 text-sm neon-border"
                        style={{ boxShadow: '0 0 15px rgba(239, 68, 68, 0.3)' }}
                      >
                        {errorMessage}
                      </motion.div>
                    )}
                    
                    <div className="transform-3d">
                      <Input 
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isSubmitting}
                        required
                        className="card-3d bg-white/20 border-white/30 text-white placeholder:text-blue-100 disabled:opacity-50 focus:bg-white/30 focus:border-neon-cyan transition-all duration-300"
                      />
                    </div>
                    <FloatingElements intensity={0.2}>
                      <Button 
                        type="submit"
                        disabled={isSubmitting}
                        className="card-3d w-full bg-white text-primary-600 hover:bg-gray-100 font-bold disabled:opacity-50 depth-shadow-md neon-border border-neon-blue hover:scale-105 transition-all duration-300"
                        size="lg"
                      >
                        {isSubmitting ? 'Joining...' : 'Join Waitlist'}
                      </Button>
                    </FloatingElements>
                    <p className="text-sm text-blue-200">
                      Be the first to know when we launch. No spam, ever.
                    </p>
                  </form>
                </div>
              </FloatingElements>
            </motion.div>
          </ScrollParallax>
          
          <motion.div
            initial={reducedMotion ? {} : { opacity: 0 }}
            whileInView={reducedMotion ? {} : { opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 text-blue-200"
          >
            <p className="text-sm">
              Questions? Email us at{' '}
              <a href="mailto:founder@a-little-better.com" className="text-white underline hover:text-neon-cyan transition-colors">
                founder@a-little-better.com
              </a>
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

export { CTA }
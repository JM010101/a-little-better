'use client'

import { useEffect, useRef } from 'react'
import { Container } from '@/components/layout/container'
import { ScrollParallax } from '@/components/3d/ScrollParallax'
import { SectionTransition } from '@/components/3d/SectionTransition'
import { FloatingElements } from '@/components/3d/FloatingElements'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { prefersReducedMotion } from '@/lib/performance'

function AnimatedCounter({ value, suffix = '' }: { value: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const reducedMotion = prefersReducedMotion()

  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''))
  const displayValue = useMotionValue(0)
  const springValue = useSpring(displayValue, { stiffness: 50, damping: 30 })

  useEffect(() => {
    if (isInView && !reducedMotion && ref.current) {
      displayValue.set(numericValue)
    } else if (ref.current) {
      ref.current.textContent = value + suffix
    }
  }, [isInView, numericValue, displayValue, value, suffix, reducedMotion])

  useEffect(() => {
    if (!ref.current || reducedMotion) return
    
    const unsubscribe = springValue.on('change', (latest) => {
      if (ref.current) {
        if (value.includes('K+')) {
          ref.current.textContent = `${Math.round(latest)}K+`
        } else if (value.includes('%')) {
          ref.current.textContent = `${Math.round(latest)}%`
        } else {
          ref.current.textContent = `${Math.round(latest)}${suffix}`
        }
      }
    })

    return () => unsubscribe()
  }, [springValue, value, suffix, reducedMotion])

  return <span ref={ref}>{value}{suffix}</span>
}

const SocialProof = () => {
  const stats = [
    {
      number: "10K+",
      label: "Businesses Improved",
      description: "Companies using our methodology",
      color: '#00d4ff'
    },
    {
      number: "25%",
      label: "Average Growth",
      description: "Improvement in key metrics",
      color: '#00ff88'
    },
    {
      number: "90",
      suffix: " Days",
      label: "To See Results",
      description: "Typical time to impact",
      color: '#b400ff'
    }
  ]

  const testimonials = [
    {
      quote: "The small changes A Little Better recommended increased our team productivity by 30% in just two months.",
      author: "Sarah Chen",
      company: "TechFlow Inc.",
      role: "CEO"
    },
    {
      quote: "We were skeptical about incremental improvements, but the results speak for themselves. Game-changing.",
      author: "Marcus Rodriguez",
      company: "InnovateLab",
      role: "Operations Director"
    }
  ]

  const reducedMotion = prefersReducedMotion()

  return (
    <section className="section-padding bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-neon-purple rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-neon-cyan rounded-full blur-3xl"></div>
      </div>

      <Container className="relative z-10">
        {/* Stats */}
        <SectionTransition>
          <div className="text-center mb-16">
            <motion.h2
              initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 neon-text-blue"
            >
              Small Changes, Big Impact
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <ScrollParallax key={index} speed={0.2 + index * 0.1}>
                  <motion.div
                    initial={reducedMotion ? {} : { opacity: 0, scale: 0.8 }}
                    whileInView={reducedMotion ? {} : { opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <FloatingElements intensity={0.3}>
                      <div className="card-3d bg-white/80 backdrop-blur-sm rounded-2xl p-8 depth-shadow-md border border-gray-200/50 hover:border-neon-blue transition-all duration-300">
                        <div 
                          className="text-5xl md:text-6xl font-bold mb-2 neon-text-blue"
                          style={{ 
                            textShadow: `0 0 20px ${stat.color}80, 0 0 40px ${stat.color}40`
                          }}
                        >
                          <AnimatedCounter value={stat.number} suffix={stat.suffix || ''} />
                        </div>
                        <div className="text-xl font-semibold text-gray-900 mb-2">
                          {stat.label}
                        </div>
                        <div className="text-gray-600">
                          {stat.description}
                        </div>
                      </div>
                    </FloatingElements>
                  </motion.div>
                </ScrollParallax>
              ))}
            </div>
          </div>
        </SectionTransition>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <ScrollParallax key={index} speed={0.15}>
              <motion.div
                initial={reducedMotion ? {} : { opacity: 0, y: 50, rotateX: -10 }}
                whileInView={reducedMotion ? {} : { opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="perspective-container"
              >
                <FloatingElements intensity={0.4}>
                  <div className="card-3d bg-white/90 p-8 rounded-2xl depth-shadow-lg border border-gray-200/50 hover:border-neon-purple transition-all duration-300">
                    <div className="text-gray-600 mb-6 text-lg leading-relaxed italic">
                      "{testimonial.quote}"
                    </div>
                    <div className="flex items-center space-x-4">
                      <div 
                        className="w-12 h-12 bg-gradient-to-r from-primary-600 to-accent-500 rounded-full flex items-center justify-center text-white font-bold neon-border"
                        style={{
                          boxShadow: '0 0 15px rgba(59, 130, 246, 0.5)'
                        }}
                      >
                        {testimonial.author.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{testimonial.author}</div>
                        <div className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</div>
                      </div>
                    </div>
                  </div>
                </FloatingElements>
              </motion.div>
            </ScrollParallax>
          ))}
        </div>
      </Container>
    </section>
  )
}

export { SocialProof }
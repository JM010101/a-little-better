'use client'

import { Container } from '@/components/layout/container'
import { ScrollParallax } from '@/components/3d/ScrollParallax'
import { SectionTransition } from '@/components/3d/SectionTransition'
import { FloatingElements } from '@/components/3d/FloatingElements'
import { TargetIcon, ChartIcon, BoltIcon, RefreshIcon } from '@/components/ui/icons'
import { motion } from 'framer-motion'
import { prefersReducedMotion } from '@/lib/performance'

const Features = () => {
  const features = [
    {
      Icon: TargetIcon,
      title: "Focused Improvements",
      description: "Identify the small changes that will have the biggest impact on your business outcomes.",
      color: '#00d4ff'
    },
    {
      Icon: ChartIcon,
      title: "Measurable Results",
      description: "Track how small improvements compound over time to create significant business growth.",
      color: '#00ff88'
    },
    {
      Icon: BoltIcon,
      title: "Quick Implementation",
      description: "Get started immediately with changes that require minimal effort but deliver maximum value.",
      color: '#ffff00'
    },
    {
      Icon: RefreshIcon,
      title: "Continuous Optimization",
      description: "Build a culture of ongoing improvement that keeps your business ahead of the competition.",
      color: '#b400ff'
    }
  ]

  const reducedMotion = prefersReducedMotion()

  return (
    <section className="section-padding bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* Background geometric shapes */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-neon-blue rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-neon-purple rounded-full blur-3xl"></div>
      </div>

      <Container className="relative z-10">
        <SectionTransition>
          <div className="text-center mb-16">
            <motion.h2
              initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 neon-text-blue"
            >
              Why A Little Better Works
            </motion.h2>
            <motion.p
              initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Small, consistent improvements compound over time to create remarkable transformations. 
              Here's how we help you harness this power.
            </motion.p>
          </div>
        </SectionTransition>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <ScrollParallax key={index} speed={0.3 + index * 0.1}>
              <motion.div
                initial={reducedMotion ? {} : { opacity: 0, y: 50, rotateX: -15 }}
                whileInView={reducedMotion ? {} : { opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group perspective-container"
              >
                <FloatingElements intensity={0.4}>
                  <div className="card-3d bg-white/80 backdrop-blur-sm rounded-2xl p-8 h-full depth-shadow-md border border-gray-200/50 hover:border-neon-blue transition-all duration-300">
                    {/* Icon Container with 3D effect */}
                    <div className="w-20 h-20 mx-auto mb-6 relative transform-3d">
                      <div 
                        className="w-full h-full rounded-2xl flex items-center justify-center neon-border group-hover:scale-110 transition-transform duration-300"
                        style={{ 
                          boxShadow: `0 0 20px ${feature.color}40, inset 0 0 20px ${feature.color}20`,
                          background: `linear-gradient(135deg, ${feature.color}20, ${feature.color}10)`
                        }}
                      >
                        <feature.Icon 
                          className="w-10 h-10 transition-all duration-300 group-hover:scale-110"
                          style={{ color: feature.color }}
                        />
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-neon-blue transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
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

export { Features }
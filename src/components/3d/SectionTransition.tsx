'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { prefersReducedMotion } from '@/lib/performance'

interface SectionTransitionProps {
  children: ReactNode
  className?: string
}

export function SectionTransition({ children, className = '' }: SectionTransitionProps) {
  const reducedMotion = prefersReducedMotion()

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}


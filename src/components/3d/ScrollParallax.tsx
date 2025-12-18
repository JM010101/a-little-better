'use client'

import { useEffect, useRef, ReactNode } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'
import { prefersReducedMotion } from '@/lib/performance'

interface ScrollParallaxProps {
  children: ReactNode
  speed?: number
  className?: string
}

export function ScrollParallax({ children, speed = 0.5, className = '' }: ScrollParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * speed])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])

  const reducedMotion = prefersReducedMotion()

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, scale }}
      className={className}
    >
      {children}
    </motion.div>
  )
}


'use client'

import { ReactNode, useRef, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { prefersReducedMotion } from '@/lib/performance'

interface FloatingElementsProps {
  children: ReactNode
  intensity?: number
  className?: string
}

export function FloatingElements({ children, intensity = 1, className = '' }: FloatingElementsProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const springX = useSpring(x, { stiffness: 150, damping: 15 })
  const springY = useSpring(y, { stiffness: 150, damping: 15 })

  const reducedMotion = prefersReducedMotion()

  useEffect(() => {
    if (reducedMotion || !ref.current) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return
      
      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const deltaX = (e.clientX - centerX) * intensity * 0.01
      const deltaY = (e.clientY - centerY) * intensity * 0.01
      
      x.set(deltaX)
      y.set(deltaY)
    }

    const handleMouseLeave = () => {
      x.set(0)
      y.set(0)
    }

    window.addEventListener('mousemove', handleMouseMove)
    ref.current.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [intensity, x, y, reducedMotion])

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  )
}


'use client'

import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '@/lib/performance'

interface CSS3DSceneProps {
  className?: string
}

export function CSS3DScene({ className = '' }: CSS3DSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const reducedMotion = prefersReducedMotion()

  useEffect(() => {
    if (!containerRef.current || reducedMotion) return

    const container = containerRef.current
    let animationFrame: number

    const animate = () => {
      // Create floating geometric shapes using CSS
      const shapes = container.querySelectorAll('.floating-shape')
      shapes.forEach((shape, i) => {
        const time = Date.now() * 0.001
        const element = shape as HTMLElement
        const offset = i * 0.5
        element.style.transform = `
          translateZ(${Math.sin(time + offset) * 20}px)
          rotateX(${Math.sin(time * 0.5 + offset) * 5}deg)
          rotateY(${Math.cos(time * 0.5 + offset) * 5}deg)
        `
      })
      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [reducedMotion])

  return (
    <div ref={containerRef} className={`absolute inset-0 perspective-1000 ${className}`}>
      {/* Floating geometric shapes */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="floating-shape absolute"
          style={{
            left: `${(i * 7) % 100}%`,
            top: `${(i * 11) % 100}%`,
            width: `${20 + (i % 3) * 10}px`,
            height: `${20 + (i % 3) * 10}px`,
            background: `linear-gradient(135deg, 
              ${i % 3 === 0 ? '#00d4ff' : i % 3 === 1 ? '#00ff88' : '#b400ff'}40,
              ${i % 3 === 0 ? '#00d4ff' : i % 3 === 1 ? '#00ff88' : '#b400ff'}20)`,
            borderRadius: i % 3 === 0 ? '0%' : i % 3 === 1 ? '50%' : '20%',
            boxShadow: `0 0 ${20 + i * 2}px ${i % 3 === 0 ? '#00d4ff' : i % 3 === 1 ? '#00ff88' : '#b400ff'}80`,
            transformStyle: 'preserve-3d',
            willChange: 'transform',
          }}
        />
      ))}
      
      {/* Particle effects using CSS */}
      {[...Array(50)].map((_, i) => (
        <div
          key={`particle-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${(i * 13) % 100}%`,
            top: `${(i * 17) % 100}%`,
            width: '2px',
            height: '2px',
            background: i % 4 === 0 ? '#00d4ff' : i % 4 === 1 ? '#00ff88' : i % 4 === 2 ? '#b400ff' : '#ffff00',
            boxShadow: `0 0 4px ${i % 4 === 0 ? '#00d4ff' : i % 4 === 1 ? '#00ff88' : i % 4 === 2 ? '#b400ff' : '#ffff00'}`,
            animation: `float ${3 + (i % 3)}s ease-in-out infinite`,
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
    </div>
  )
}


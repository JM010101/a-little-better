// @ts-nocheck - React Three Fiber types are not fully compatible with React 19 yet
'use client'

import { Suspense, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { prefersReducedMotion } from '@/lib/performance'
import { ensureReactThreeFiberReady } from '@/lib/react-three-fiber-loader'

// Dynamically import Canvas with React 19 compatibility check
// Add extra delay to ensure React is fully initialized
const Canvas = dynamic(
  () => 
    new Promise((resolve) => {
      // Wait for React to be ready
      ensureReactThreeFiberReady().then(() => {
        // Additional delay to ensure React internals are available
        setTimeout(() => {
          import('@react-three/fiber').then(mod => {
            resolve({ default: mod.Canvas })
          }).catch(() => {
            // Fallback: try again after a delay
            setTimeout(() => {
              import('@react-three/fiber').then(mod => {
                resolve({ default: mod.Canvas })
              })
            }, 200)
          })
        }, 300)
      })
    }),
  { 
    ssr: false,
    loading: () => null
  }
)

// Dynamically import all 3D components
const PerspectiveCamera = dynamic(
  () => import('@react-three/drei').then(mod => ({ default: mod.PerspectiveCamera })),
  { ssr: false }
)

const ParticleField = dynamic(
  () => import('./ParticleField').then(mod => ({ default: mod.ParticleField })),
  { ssr: false }
)

export function CTAParticles() {
  const [mounted, setMounted] = useState(false)
  const [ready, setReady] = useState(false)
  const reducedMotion = prefersReducedMotion()

  useEffect(() => {
    // Ensure we're on client and wait for React Three Fiber to be ready
    if (typeof window !== 'undefined') {
      ensureReactThreeFiberReady().then(() => {
        // Use requestAnimationFrame to ensure React is fully mounted
        requestAnimationFrame(() => {
          setTimeout(() => {
            setMounted(true)
            setReady(true)
          }, 200)
        })
      })
    }
  }, [])

  // Don't render anything until mounted
  if (!mounted || typeof window === 'undefined' || reducedMotion) {
    return null
  }

  return (
    <div className="absolute inset-0 w-full h-full opacity-30">
      <Canvas
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        className="w-full h-full"
      >
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
        <Suspense fallback={null}>
          {ready && <ParticleField count={800} speed={0.15} />}
        </Suspense>
      </Canvas>
    </div>
  )
}


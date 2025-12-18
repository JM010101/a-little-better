// @ts-nocheck - React Three Fiber types are not fully compatible with React 19 yet
'use client'

import { Suspense, useRef, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { LoadingState } from './LoadingState'
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
    loading: () => <LoadingState />
  }
)

// Dynamically import all 3D components to prevent React Three Fiber initialization
const GeometricShapes = dynamic(
  () => import('./GeometricShapes').then(mod => ({ default: mod.GeometricShapes })),
  { ssr: false }
)

const ParticleField = dynamic(
  () => import('./ParticleField').then(mod => ({ default: mod.ParticleField })),
  { ssr: false }
)

const NeonGrid = dynamic(
  () => import('./NeonGrid').then(mod => ({ default: mod.NeonGrid })),
  { ssr: false }
)

// Dynamically import drei components
const OrbitControls = dynamic(
  () => import('@react-three/drei').then(mod => ({ default: mod.OrbitControls })),
  { ssr: false }
)

const PerspectiveCamera = dynamic(
  () => import('@react-three/drei').then(mod => ({ default: mod.PerspectiveCamera })),
  { ssr: false }
)

const Environment = dynamic(
  () => import('@react-three/drei').then(mod => ({ default: mod.Environment })),
  { ssr: false }
)

// SceneContent must be dynamically loaded to prevent React Three Fiber initialization
const SceneContent = dynamic(
  () => import('./SceneContent').then(mod => ({ default: mod.SceneContent })),
  { ssr: false }
)

export function HeroScene() {
  const [mounted, setMounted] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // Double check we're on client
    if (typeof window !== 'undefined') {
      // Ensure React Three Fiber is ready before mounting
      ensureReactThreeFiberReady().then(() => {
        setMounted(true)
        // Additional delay to ensure everything is ready
        requestAnimationFrame(() => {
          setTimeout(() => {
            setReady(true)
          }, 200)
        })
      })
    }
  }, [])

  if (!mounted || typeof window === 'undefined') {
    return <LoadingState />
  }

  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        className="w-full h-full"
      >
        <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={75} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          autoRotate={!prefersReducedMotion()}
          autoRotateSpeed={0.5}
        />
        <Suspense fallback={<LoadingState />}>
          {ready && <SceneContent />}
        </Suspense>
      </Canvas>
    </div>
  )
}


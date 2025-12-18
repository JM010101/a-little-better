// @ts-nocheck - React Three Fiber types are not fully compatible with React 19 yet
'use client'

import { useRef, Suspense } from 'react'
import dynamic from 'next/dynamic'
import { useFrame } from '@react-three/fiber'
import { Group } from 'three'
import { prefersReducedMotion } from '@/lib/performance'

// Dynamically import all child components to prevent React Three Fiber initialization
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

const Environment = dynamic(
  () => import('@react-three/drei').then(mod => ({ default: mod.Environment })),
  { ssr: false }
)

export function SceneContent() {
  const groupRef = useRef<Group>(null)
  const reducedMotion = prefersReducedMotion()

  useFrame((state) => {
    if (!groupRef.current || reducedMotion) return
    
    // Subtle camera movement based on mouse
    const mouseX = (state.pointer.x * 0.5) / window.innerWidth
    const mouseY = (state.pointer.y * 0.5) / window.innerHeight
    
    groupRef.current.rotation.y = mouseX * 0.1
    groupRef.current.rotation.x = -mouseY * 0.1
  })

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00d4ff" />
      
      <Suspense fallback={null}>
        <GeometricShapes count={20} speed={0.3} />
        <ParticleField count={1500} speed={0.2} />
        <NeonGrid size={30} divisions={30} />
        <Environment preset="night" />
      </Suspense>
    </group>
  )
}


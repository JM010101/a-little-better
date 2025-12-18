// @ts-nocheck - React Three Fiber types are not fully compatible with React 19 yet
'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { GridHelper, LineSegments } from 'three'
import { neonColors } from '@/lib/3d-utils'

interface NeonGridProps {
  size?: number
  divisions?: number
  color?: string
}

export function NeonGrid({ size = 20, divisions = 20, color = neonColors.blue }: NeonGridProps) {
  const gridRef = useRef<LineSegments>(null)

  useFrame((state) => {
    if (!gridRef.current) return
    
    // Subtle pulsing effect
    const intensity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.1
    const material = gridRef.current.material as any
    if (material.emissive) {
      material.emissive.setHex(parseInt(color.replace('#', ''), 16))
      material.emissiveIntensity = intensity
    }
  })

  return (
    <gridHelper
      ref={gridRef}
      args={[size, divisions, color, color]}
      position={[0, -5, 0]}
      rotation={[0, 0, 0]}
    />
  )
}


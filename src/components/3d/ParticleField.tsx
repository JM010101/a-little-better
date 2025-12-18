// @ts-nocheck - React Three Fiber types are not fully compatible with React 19 yet
/// <reference types="@react-three/fiber" />
'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, BufferGeometry, Float32BufferAttribute } from 'three'
import { getParticleCount } from '@/lib/performance'
import { neonColors, randomRange } from '@/lib/3d-utils'

interface ParticleFieldProps {
  count?: number
  speed?: number
}

export function ParticleField({ count, speed = 0.3 }: ParticleFieldProps) {
  const pointsRef = useRef<Points>(null)
  const particleCount = count || getParticleCount('high')

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const colorArray = Object.values(neonColors).map((hex) => {
      const r = parseInt(hex.slice(1, 3), 16) / 255
      const g = parseInt(hex.slice(3, 5), 16) / 255
      const b = parseInt(hex.slice(5, 7), 16) / 255
      return [r, g, b]
    })

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      positions[i3] = randomRange(-20, 20)
      positions[i3 + 1] = randomRange(-10, 10)
      positions[i3 + 2] = randomRange(-20, 20)

      const color = colorArray[Math.floor(Math.random() * colorArray.length)]
      colors[i3] = color[0]
      colors[i3 + 1] = color[1]
      colors[i3 + 2] = color[2]
    }

    return { positions, colors }
  }, [particleCount])

  useFrame((state) => {
    if (!pointsRef.current) return

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array
    const time = state.clock.elapsedTime

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      positions[i3 + 1] += Math.sin(time * speed + i) * 0.001
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute attach="attributes-color" count={particleCount} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}


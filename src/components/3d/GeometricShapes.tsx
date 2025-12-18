// @ts-nocheck - React Three Fiber types are not fully compatible with React 19 yet
/// <reference types="@react-three/fiber" />
'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import { createNeonMaterial, neonColors, randomRange } from '@/lib/3d-utils'

interface GeometricShapesProps {
  count?: number
  speed?: number
}

export function GeometricShapes({ count = 15, speed = 0.5 }: GeometricShapesProps) {
  const shapes = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      position: [
        randomRange(-10, 10),
        randomRange(-5, 5),
        randomRange(-10, 10),
      ] as [number, number, number],
      rotation: [
        randomRange(0, Math.PI * 2),
        randomRange(0, Math.PI * 2),
        randomRange(0, Math.PI * 2),
      ] as [number, number, number],
      rotationSpeed: [
        randomRange(-0.01, 0.01) * speed,
        randomRange(-0.01, 0.01) * speed,
        randomRange(-0.01, 0.01) * speed,
      ] as [number, number, number],
      type: Math.floor(Math.random() * 3), // 0: box, 1: sphere, 2: tetrahedron
      color: Object.values(neonColors)[Math.floor(Math.random() * Object.values(neonColors).length)],
      scale: randomRange(0.5, 1.5),
    }))
  }, [count])

  return (
    <>
      {shapes.map((shape, i) => (
        <Shape key={i} {...shape} speed={speed} />
      ))}
    </>
  )
}

function Shape({
  position,
  rotation: initialRotation,
  rotationSpeed,
  type,
  color,
  scale,
  speed,
}: {
  position: [number, number, number]
  rotation: [number, number, number]
  rotationSpeed: [number, number, number]
  type: number
  color: string
  scale: number
  speed: number
}) {
  const meshRef = useRef<Mesh>(null)
  const material = useMemo(() => createNeonMaterial(color, 0.8), [color])

  useFrame((state) => {
    if (!meshRef.current) return

    meshRef.current.rotation.x += rotationSpeed[0]
    meshRef.current.rotation.y += rotationSpeed[1]
    meshRef.current.rotation.z += rotationSpeed[2]

    // Floating animation
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5
  })

  // @ts-ignore - React Three Fiber types are not fully compatible with React 19 yet
  return (
    <mesh ref={meshRef} position={position} rotation={initialRotation} material={material}>
      {type === 0 && <boxGeometry args={[scale, scale, scale]} />}
      {type === 1 && <sphereGeometry args={[scale * 0.7, 16, 16]} />}
      {type === 2 && <tetrahedronGeometry args={[scale * 0.8, 0]} />}
    </mesh>
  )
}


/**
 * Shared 3D utility functions
 */

import * as THREE from 'three'

export function createNeonMaterial(color: string, intensity: number = 1): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: color,
    emissive: color,
    emissiveIntensity: intensity,
    metalness: 0.8,
    roughness: 0.2,
  })
}

export function createGlowGeometry(radius: number, segments: number = 32): THREE.SphereGeometry {
  return new THREE.SphereGeometry(radius, segments, segments)
}

export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function randomRange(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}

export const neonColors = {
  blue: '#00d4ff',
  cyan: '#00ffff',
  purple: '#b400ff',
  pink: '#ff00ff',
  green: '#00ff88',
  yellow: '#ffff00',
  orange: '#ff8800',
}


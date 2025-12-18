/**
 * Performance detection utilities for 3D rendering
 */

export function getDevicePerformance(): 'high' | 'medium' | 'low' {
  if (typeof window === 'undefined') return 'medium'
  
  const hardwareConcurrency = navigator.hardwareConcurrency || 4
  const memory = (navigator as any).deviceMemory || 4
  
  if (hardwareConcurrency >= 8 && memory >= 8) {
    return 'high'
  } else if (hardwareConcurrency >= 4 && memory >= 4) {
    return 'medium'
  }
  return 'low'
}

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function getParticleCount(performance: 'high' | 'medium' | 'low'): number {
  switch (performance) {
    case 'high':
      return 2000
    case 'medium':
      return 1000
    case 'low':
      return 500
    default:
      return 1000
  }
}

export function shouldUseWebGL(): boolean {
  if (typeof window === 'undefined') return true
  
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    return !!gl
  } catch {
    return false
  }
}


// UI Components
export { Button } from './ui/button'
export { Input } from './ui/input'
export { Logo } from './ui/logo'
export { TargetIcon, ChartIcon, BoltIcon, RefreshIcon } from './ui/icons'

// Layout Components
export { Container } from './layout/container'

// Section Components
export { Hero } from './sections/hero'
export { Features } from './sections/features'
export { SocialProof } from './sections/social-proof'
export { CTA } from './sections/cta'

// 3D Components - Only export components that don't use React Three Fiber hooks directly
export { ScrollParallax } from './3d/ScrollParallax'
export { SectionTransition } from './3d/SectionTransition'
export { FloatingElements } from './3d/FloatingElements'
export { LoadingState } from './3d/LoadingState'
// Note: HeroScene, CTAParticles, GeometricShapes, ParticleField, NeonGrid are not exported
// to prevent React Three Fiber initialization. They are only used internally via dynamic imports.
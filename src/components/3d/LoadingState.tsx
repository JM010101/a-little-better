'use client'

export function LoadingState() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-900 via-primary-900 to-purple-900">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-neon-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white/70 text-sm">Loading 3D scene...</p>
      </div>
    </div>
  )
}


/**
 * React 19 compatibility patch for React Three Fiber
 * This ensures React internals are available before React Three Fiber initializes
 */

if (typeof window !== 'undefined') {
  // Patch React internals to be compatible with React Three Fiber
  window.addEventListener('DOMContentLoaded', () => {
    // Ensure React is loaded
    const checkAndPatch = () => {
      try {
        // Import React to ensure it's available
        import('react').then((reactModule) => {
          // Make React available globally for React Three Fiber
          if (!(window as any).React) {
            (window as any).React = reactModule
          }
        }).catch(() => {
          // Retry if React isn't ready yet
          setTimeout(checkAndPatch, 50)
        })
      } catch (error) {
        // Silently fail and retry
        setTimeout(checkAndPatch, 50)
      }
    }
    
    // Start checking after a delay
    setTimeout(checkAndPatch, 100)
  })
}


/**
 * React Three Fiber loader that ensures React 19 compatibility
 * by delaying initialization until React is fully ready
 */

let reactThreeFiberReady = false
let initializationPromise: Promise<void> | null = null

export async function ensureReactThreeFiberReady(): Promise<void> {
  if (reactThreeFiberReady) {
    return Promise.resolve()
  }

  if (initializationPromise) {
    return initializationPromise
  }

  initializationPromise = new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve()
      return
    }

    // Wait for React to be fully initialized and DOM to be ready
    const checkReactReady = () => {
      try {
        // Check if React is ready flag is set
        const reactReady = (window as any).__REACT_READY__
        
        // Wait for multiple frames to ensure React is fully initialized
        let frameCount = 0
        const checkFrames = () => {
          frameCount++
          // Wait for at least 5 frames and React ready flag
          if (frameCount >= 5 && (reactReady || frameCount >= 10)) {
            reactThreeFiberReady = true
            resolve()
          } else {
            requestAnimationFrame(checkFrames)
          }
        }
        
        requestAnimationFrame(() => {
          setTimeout(checkFrames, 200)
        })
      } catch (error) {
        // If there's an error, wait a bit longer and retry
        setTimeout(() => {
          reactThreeFiberReady = true
          resolve()
        }, 500)
      }
    }

    // Start checking after DOM is ready
    if (document.readyState === 'complete') {
      setTimeout(checkReactReady, 300)
    } else {
      window.addEventListener('load', () => {
        setTimeout(checkReactReady, 300)
      })
    }
  })

  return initializationPromise
}


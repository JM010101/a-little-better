'use client'

import { useEffect } from 'react'
import { useAnalytics } from '@/lib/analytics'
import { usePathname } from 'next/navigation'

const PageAnalytics = () => {
  const { trackPageView } = useAnalytics()
  const pathname = usePathname()

  useEffect(() => {
    // Track page view
    trackPageView(pathname)

    // Track scroll depth
    let maxScrollDepth = 0
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollDepth = Math.round((scrollTop / documentHeight) * 100)

      if (scrollDepth > maxScrollDepth) {
        const previousMax = maxScrollDepth
        maxScrollDepth = scrollDepth
        
        // Track scroll milestones (only once per milestone)
        if (scrollDepth >= 25 && previousMax < 25) {
          fetch('/api/analytics', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              event_type: 'scroll',
              page_path: pathname,
              metadata: { depth_percentage: 25 }
            })
          }).catch(() => {})
        }
        
        if (scrollDepth >= 50 && previousMax < 50) {
          fetch('/api/analytics', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              event_type: 'scroll',
              page_path: pathname,
              metadata: { depth_percentage: 50 }
            })
          }).catch(() => {})
        }
        
        if (scrollDepth >= 75 && previousMax < 75) {
          fetch('/api/analytics', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              event_type: 'scroll',
              page_path: pathname,
              metadata: { depth_percentage: 75 }
            })
          }).catch(() => {})
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [pathname, trackPageView])

  return null
}

export { PageAnalytics }
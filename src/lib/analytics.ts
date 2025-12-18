import { supabase } from './supabase'
import type { AnalyticsEvent } from '@/types'

export class Analytics {
  // Track page view
  static async trackPageView(pathname: string, userAgent?: string) {
    try {
      await this.trackEvent({
        event_type: 'page_view',
        page_path: pathname,
        user_agent: userAgent,
      })
    } catch (error) {
      console.error('Failed to track page view:', error)
    }
  }

  // Track button click
  static async trackClick(elementId: string, pathname: string) {
    try {
      await this.trackEvent({
        event_type: 'click',
        page_path: pathname,
        metadata: { element_id: elementId },
      })
    } catch (error) {
      console.error('Failed to track click:', error)
    }
  }

  // Track scroll depth
  static async trackScroll(depth: number, pathname: string) {
    try {
      await this.trackEvent({
        event_type: 'scroll',
        page_path: pathname,
        metadata: { depth_percentage: depth },
      })
    } catch (error) {
      console.error('Failed to track scroll:', error)
    }
  }

  // Track form submission
  static async trackFormSubmit(formType: string, pathname: string, success: boolean) {
    try {
      await this.trackEvent({
        event_type: 'form_submit',
        page_path: pathname,
        metadata: { form_type: formType, success },
      })
    } catch (error) {
      console.error('Failed to track form submit:', error)
    }
  }

  // Generic event tracking
  static async trackEvent(event: Omit<AnalyticsEvent, 'id' | 'created_at'>) {
    try {
      const { error } = await supabase
        .from('analytics_events')
        .insert([
          {
            event_type: event.event_type,
            page_path: event.page_path,
            user_agent: event.user_agent,
            ip_address: event.ip_address,
            metadata: event.metadata,
          }
        ])

      if (error) {
        console.error('Supabase analytics error:', error)
      }
    } catch (error) {
      console.error('Analytics tracking failed:', error)
    }
  }
}

// Client-side analytics hook
export function useAnalytics() {
  const trackPageView = (pathname: string) => {
    Analytics.trackPageView(pathname, navigator.userAgent)
  }

  const trackClick = (elementId: string) => {
    Analytics.trackClick(elementId, window.location.pathname)
  }

  const trackScroll = (depth: number) => {
    Analytics.trackScroll(depth, window.location.pathname)
  }

  return {
    trackPageView,
    trackClick,
    trackScroll,
  }
}
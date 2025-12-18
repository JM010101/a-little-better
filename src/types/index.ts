// Analytics types
export interface AnalyticsEvent {
  event_type: string
  page_path: string
  user_agent?: string
  ip_address?: string
  metadata?: Record<string, any>
}

// Early user types
export interface EarlyUser {
  email: string
  source?: string
}

// API response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}
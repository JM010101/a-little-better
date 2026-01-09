import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Client-side Supabase client with implicit flow (no PKCE for email confirmations)
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    flowType: 'implicit', // Use implicit flow instead of PKCE to avoid code verifier issues
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
})

// Database types
export interface AnalyticsEvent {
  id: string
  event_type: string
  page_path: string
  user_agent?: string
  ip_address?: string
  created_at: string
}

export interface EarlyUser {
  id: string
  email: string
  source?: string
  created_at: string
}

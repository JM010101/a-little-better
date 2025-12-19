import { createServerSupabaseClient } from './supabase-server'
import { redirect } from 'next/navigation'
import type { User } from '@supabase/supabase-js'

export interface Session {
  user: User
  access_token: string
  refresh_token: string
}

/**
 * Get the current session on the server
 */
export async function getServerSession(): Promise<Session | null> {
  const supabase = await createServerSupabaseClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session?.user) {
    return null
  }

  return {
    user: session.user,
    access_token: session.access_token,
    refresh_token: session.refresh_token,
  }
}

/**
 * Get the current user on the server
 */
export async function getUser(): Promise<User | null> {
  const session = await getServerSession()
  return session?.user ?? null
}

/**
 * Require authentication - redirects to login if not authenticated
 */
export async function requireAuth(): Promise<Session> {
  const session = await getServerSession()

  if (!session) {
    redirect('/login?redirected=true')
  }

  return session
}

/**
 * Get user ID - returns null if not authenticated
 */
export async function getUserId(): Promise<string | null> {
  const user = await getUser()
  return user?.id ?? null
}


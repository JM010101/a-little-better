import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { Container } from '@/components/layout/container'

export default async function AuthCallbackPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string; next?: string; redirect_to?: string; type?: string; token?: string }>
}) {
  const params = await searchParams
  const code = params.code
  const type = params.type // 'signup', 'recovery', 'email_change', etc.
  const token = params.token // For email confirmations
  // Supabase may send redirect_to parameter, or we use next, or default to dashboard
  const next = params.redirect_to || params.next || '/dashboard'
  const supabase = await createServerSupabaseClient()

  if (code) {
    // Try server-side exchange first
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (error) {
      console.error('Auth callback error:', error)
      
      // If PKCE error (common with email links), redirect to client-side handler
      // Client-side can handle PKCE properly with browser storage
      if (error.message.includes('PKCE') || error.message.includes('code verifier')) {
        redirect(`/auth/callback/client?code=${code}&type=${type || 'signup'}&next=${encodeURIComponent(next)}`)
        return
      }
      
      // Other errors - show specific message
      const errorParam = error.message.includes('expired') 
        ? 'code_expired' 
        : error.message.includes('invalid') 
        ? 'invalid_code'
        : 'auth_failed'
      redirect(`/login?error=${errorParam}&message=${encodeURIComponent(error.message)}`)
      return
    }

    // Success - check if we have a session
    if (data?.session) {
      redirect(next)
      return
    }
  }

  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    redirect(next)
  } else {
    redirect('/login')
  }

  // This won't render, but provides a fallback UI in case redirect fails
  return (
    <Container className="py-12">
      <div className="max-w-md mx-auto text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Verifying your email...</p>
      </div>
    </Container>
  )
}


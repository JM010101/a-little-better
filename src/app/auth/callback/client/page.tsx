'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Container } from '@/components/layout/container'

function CallbackContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code')
      const token = searchParams.get('token')
      const type = searchParams.get('type') || 'signup'
      const next = searchParams.get('next') || '/dashboard'

      if (!code && !token) {
        setError('No confirmation code or token provided')
        setLoading(false)
        return
      }

      try {
        let sessionData = null
        let exchangeError = null

        // Handle token parameter (direct from email)
        // When Supabase email contains a token, it goes to Supabase's verify endpoint first
        // Then Supabase redirects to our callback with a code
        // If we somehow get a token directly, redirect to Supabase verify endpoint
        if (token && type === 'signup') {
          const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
          if (supabaseUrl) {
            const redirectUrl = `${window.location.origin}/auth/callback?type=${type}&next=${encodeURIComponent(next)}`
            // Redirect to Supabase verify endpoint - it will handle token and redirect back with code
            window.location.href = `${supabaseUrl}/auth/v1/verify?token=${token}&type=${type}&redirect_to=${encodeURIComponent(redirectUrl)}`
            return
          }
        }

        // Handle code parameter (from Supabase redirect after token verification)
        if (code) {
          // Try to exchange code - if PKCE error, we need to handle differently
          const result = await supabase.auth.exchangeCodeForSession(code)
          sessionData = result.data
          exchangeError = result.error
          
          // If PKCE error, the code requires a verifier we don't have
          // This means Supabase is using PKCE for email confirmations
          // We need to tell user to disable PKCE in Supabase dashboard
          if (exchangeError && (exchangeError.message.includes('PKCE') || exchangeError.message.includes('code verifier') || exchangeError.message.includes('non-empty'))) {
            setError('PKCE is enabled for email confirmations. Please disable PKCE for email flows in Supabase Dashboard → Authentication → URL Configuration')
            setLoading(false)
            setTimeout(() => {
              router.push(`/login?error=pkce_enabled&message=${encodeURIComponent('PKCE must be disabled for email confirmations. Check Supabase dashboard settings.')}`)
            }, 3000)
            return
          }
        }

        if (exchangeError) {
          console.error('Auth callback error:', exchangeError)
          setError(exchangeError.message)
          setLoading(false)
          
          // Redirect to login with error after a delay
          setTimeout(() => {
            const errorParam = exchangeError.message.includes('expired') 
              ? 'code_expired' 
              : exchangeError.message.includes('invalid') 
              ? 'invalid_code'
              : 'auth_failed'
            router.push(`/login?error=${errorParam}&message=${encodeURIComponent(exchangeError.message)}`)
          }, 2000)
          return
        }

        if (sessionData?.session) {
          // Success! Redirect to dashboard
          router.push(next)
          router.refresh()
        } else {
          setError('Failed to create session')
          setLoading(false)
          setTimeout(() => {
            router.push('/login?error=auth_failed')
          }, 2000)
        }
      } catch (err) {
        console.error('Unexpected error:', err)
        setError('An unexpected error occurred')
        setLoading(false)
        setTimeout(() => {
          router.push('/login?error=auth_failed')
        }, 2000)
      }
    }

    handleCallback()
  }, [searchParams, router])

  if (error) {
    return (
      <Container className="py-12">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            <p className="font-semibold">Authentication Failed</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
          <p className="text-gray-600 text-sm">Redirecting to login...</p>
        </div>
      </Container>
    )
  }

  return (
    <Container className="py-12">
      <div className="max-w-md mx-auto text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Verifying your email...</p>
      </div>
    </Container>
  )
}

function LoadingFallback() {
  return (
    <Container className="py-12">
      <div className="max-w-md mx-auto text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </Container>
  )
}

export default function ClientCallbackPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <CallbackContent />
    </Suspense>
  )
}


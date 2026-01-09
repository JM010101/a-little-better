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

        // Handle token parameter (direct from email link)
        // Use verifyOtp to verify the token directly without going through Supabase's verify endpoint
        // This bypasses PKCE entirely
        if (token && type === 'signup') {
          const { data: verifyData, error: verifyError } = await supabase.auth.verifyOtp({
            token_hash: token,
            type: 'signup',
          })

          if (verifyError) {
            console.error('Token verification error:', verifyError)
            setError(verifyError.message)
            setLoading(false)
            setTimeout(() => {
              router.push(`/login?error=invalid_code&message=${encodeURIComponent(verifyError.message)}`)
            }, 2000)
            return
          }

          if (verifyData?.session) {
            // Success! Token verified and session created
            router.push(next)
            router.refresh()
            return
          } else {
            setError('Failed to create session after token verification')
            setLoading(false)
            setTimeout(() => {
              router.push('/login?error=auth_failed')
            }, 2000)
            return
          }
        }

        // Handle code parameter (from Supabase redirect after token verification)
        // Supabase's verify endpoint generates PKCE codes, so we need to handle them
        if (code) {
          // Try to exchange code - with implicit flow configured, this should work
          // But if Supabase generated a PKCE code, we'll get an error
          const result = await supabase.auth.exchangeCodeForSession(code)
          sessionData = result.data
          exchangeError = result.error
          
          // If PKCE error occurs, it means Supabase's verify endpoint generated a PKCE code
          // This happens because Supabase's email verification always uses PKCE
          // The solution is to handle the token directly (above) instead of letting Supabase convert it
          if (exchangeError && (exchangeError.message.includes('PKCE') || exchangeError.message.includes('code verifier') || exchangeError.message.includes('non-empty'))) {
            setError('This confirmation link uses PKCE flow. Please use the token from the email link directly, or request a new confirmation email.')
            setLoading(false)
            setTimeout(() => {
              router.push(`/login?error=pkce_enabled&message=${encodeURIComponent('Email confirmation links use PKCE. Please ensure you\'re clicking the link directly from the email.')}`)
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


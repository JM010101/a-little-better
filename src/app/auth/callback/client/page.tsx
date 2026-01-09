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
        // Handle token parameter (direct from email link)
        // Use verifyOtp to verify the token directly - bypasses PKCE
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

        // Handle code parameter (from Supabase redirect)
        // With detectSessionInUrl: true, Supabase should automatically detect and exchange the code
        // But we'll also try manual exchange as fallback
        if (code) {
          // Wait a moment for detectSessionInUrl to work (if it does)
          await new Promise(resolve => setTimeout(resolve, 500))
          
          // Check if session was automatically created by detectSessionInUrl
          const { data: { session: autoSession } } = await supabase.auth.getSession()
          
          if (autoSession) {
            // detectSessionInUrl worked! Session already created
            router.push(next)
            router.refresh()
            return
          }

          // Manual exchange as fallback
          const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
          
          if (exchangeError) {
            console.error('Auth callback error:', exchangeError)
            
            // If PKCE error, it means Supabase generated a PKCE code
            if (exchangeError.message.includes('PKCE') || exchangeError.message.includes('code verifier') || exchangeError.message.includes('non-empty')) {
              setError('This confirmation link uses PKCE flow. Please request a new confirmation email - new emails will work correctly.')
              setLoading(false)
              setTimeout(() => {
                router.push(`/login?error=pkce_enabled&message=${encodeURIComponent('Please request a new confirmation email. The link was generated with PKCE flow.')}`)
              }, 3000)
              return
            }
            
            setError(exchangeError.message)
            setLoading(false)
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

          if (data?.session) {
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


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
      const type = searchParams.get('type')
      const next = searchParams.get('next') || '/dashboard'

      if (!code) {
        setError('No confirmation code provided')
        setLoading(false)
        return
      }

      try {
        // Use client-side exchange which can handle PKCE properly
        const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

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


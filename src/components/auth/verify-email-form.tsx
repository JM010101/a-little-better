'use client'

import * as React from 'react'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface VerifyEmailFormProps {
  email: string
}

export function VerifyEmailForm({ email }: VerifyEmailFormProps) {
  const router = useRouter()
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus()
  }, [])

  const handleChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) {
      return
    }

    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)
    setError('')

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      // Move to previous input on backspace
      inputRefs.current[index - 1]?.focus()
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus()
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').trim()
    
    // Only accept 6 digits
    if (!/^\d{6}$/.test(pastedData)) {
      return
    }

    const digits = pastedData.split('')
    const newCode = [...code]
    digits.forEach((digit, index) => {
      if (index < 6) {
        newCode[index] = digit
      }
    })
    setCode(newCode)
    setError('')
    
    // Focus last input
    inputRefs.current[5]?.focus()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const verificationCode = code.join('')

    if (verificationCode.length !== 6) {
      setError('Please enter the complete 6-digit code')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, token: verificationCode }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Verification failed')
        setLoading(false)
        // Clear code on error
        setCode(['', '', '', '', '', ''])
        inputRefs.current[0]?.focus()
        return
      }

      // Success - redirect to dashboard
      router.push('/dashboard')
      router.refresh()
    } catch (err) {
      setError('An unexpected error occurred')
      setLoading(false)
    }
  }

  const handleResend = async () => {
    setResending(true)
    setError('')

    try {
      const response = await fetch('/api/auth/resend-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to resend code')
        setResending(false)
        return
      }

      // Show success message briefly
      setError('')
      alert('Verification code sent! Please check your email.')
      setResending(false)
    } catch (err) {
      setError('Failed to resend code')
      setResending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div>
        <p className="text-sm text-gray-600 mb-4 text-center">
          We've sent a 6-digit verification code to <strong>{email}</strong>
        </p>
        <p className="text-xs text-gray-500 mb-6 text-center">
          Please enter the code below to verify your email address.
        </p>

        <div className="flex justify-center gap-2 mb-6">
          {code.map((digit, index) => (
            <Input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              className="w-12 h-14 text-center text-2xl font-semibold"
              disabled={loading}
              autoFocus={index === 0}
            />
          ))}
        </div>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={loading || code.join('').length !== 6}
      >
        {loading ? 'Verifying...' : 'Verify Email'}
      </Button>

      <div className="text-center">
        <button
          type="button"
          onClick={handleResend}
          disabled={resending || loading}
          className="text-sm text-primary-600 hover:text-primary-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {resending ? 'Sending...' : "Didn't receive a code? Resend"}
        </button>
      </div>
    </form>
  )
}


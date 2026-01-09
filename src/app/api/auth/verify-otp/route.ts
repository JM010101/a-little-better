import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'

export async function POST(request: NextRequest) {
  try {
    const { email, token } = await request.json()

    if (!email || !token) {
      return NextResponse.json(
        { error: 'Email and verification code are required' },
        { status: 400 }
      )
    }

    // Validate token format (8 digits - Supabase OTP codes are 8 digits)
    if (!/^\d{8}$/.test(token)) {
      return NextResponse.json(
        { error: 'Verification code must be 8 digits' },
        { status: 400 }
      )
    }

    const supabase = await createServerSupabaseClient()

    // Verify OTP code
    // Try different types - signInWithOtp can send OTP codes that need to be verified
    // Try 'email' type first (for signInWithOtp), then 'signup' as fallback
    let data = null
    let error = null
    
    // Try 'email' type first (this is what signInWithOtp uses)
    const result1 = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email',
    })
    
    if (result1.error) {
      // If 'email' type fails, try 'signup' type (in case user was created via signup)
      const result2 = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'signup',
      })
      
      if (result2.error) {
        // Try 'magiclink' as last resort
        const result3 = await supabase.auth.verifyOtp({
          email,
          token,
          type: 'magiclink',
        })
        data = result3.data
        error = result3.error
      } else {
        data = result2.data
        error = result2.error
      }
    } else {
      data = result1.data
      error = result1.error
    }

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    if (!data?.session) {
      return NextResponse.json(
        { error: 'Failed to create session' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Email verified successfully',
      user: data.user,
    })
  } catch (error) {
    console.error('Verify OTP API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}


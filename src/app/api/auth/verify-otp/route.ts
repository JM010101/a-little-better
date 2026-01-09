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
    // Use 'magiclink' type because we're using signInWithOtp which sends magic link emails
    // But if template shows {{ .Token }}, it will send OTP code instead
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'magiclink',
    })

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


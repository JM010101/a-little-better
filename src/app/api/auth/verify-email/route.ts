import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// This route uses Admin API to verify email tokens directly (bypasses PKCE)
export async function GET(request: NextRequest) {
  try {
    const requestUrl = new URL(request.url)
    const token = requestUrl.searchParams.get('token')
    const type = requestUrl.searchParams.get('type') || 'signup'
    const redirectTo = requestUrl.searchParams.get('redirect_to') || '/dashboard'

    if (!token) {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      )
    }

    // Use Admin API (service role) to verify token directly
    // This bypasses PKCE requirements
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseServiceKey) {
      console.error('SUPABASE_SERVICE_ROLE_KEY not configured')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    // Create admin client with service role key
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    // Verify the token using Admin API
    // Note: This is a workaround - the proper fix is disabling PKCE in Supabase dashboard
    const { data, error } = await supabaseAdmin.auth.admin.verifyOtp({
      token_hash: token,
      type: type as 'signup' | 'email_change' | 'recovery',
    })

    if (error) {
      console.error('Token verification error:', error)
      return NextResponse.redirect(
        new URL(`/login?error=invalid_code&message=${encodeURIComponent(error.message)}`, request.url)
      )
    }

    if (data?.user) {
      // Token verified successfully via Admin API
      // The user is now confirmed, but we need to create a session
      // Redirect them to login with a success message - they can now sign in
      return NextResponse.redirect(
        new URL(`/login?verified=true&email=${encodeURIComponent(data.user.email || '')}&redirect_to=${encodeURIComponent(redirectTo)}`, request.url)
      )
    }

    return NextResponse.redirect(
      new URL('/login?error=auth_failed', request.url)
    )
  } catch (error) {
    console.error('Verify email API error:', error)
    return NextResponse.redirect(
      new URL('/login?error=auth_failed', request.url)
    )
  }
}


import { NextRequest, NextResponse } from 'next/server'

// This route redirects email confirmation tokens to Supabase's verify endpoint
// The real fix is disabling PKCE in Supabase Dashboard
export async function GET(request: NextRequest) {
  try {
    const requestUrl = new URL(request.url)
    const token = requestUrl.searchParams.get('token')
    const code = requestUrl.searchParams.get('code') // Supabase redirects with code after verifying token
    const type = requestUrl.searchParams.get('type') || 'signup'
    const redirectTo = requestUrl.searchParams.get('redirect_to') || '/dashboard'
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || requestUrl.origin

    // If we have a code (from Supabase redirect after token verification), redirect to callback
    if (code) {
      // Supabase has already verified the token and given us a code
      // Redirect to our callback handler which will exchange code for session
      return NextResponse.redirect(
        new URL(`/auth/callback?code=${code}&type=${type}&next=${encodeURIComponent(redirectTo)}`, appUrl)
      )
    }

    // If we have a token (direct from email link), redirect to Supabase verify endpoint
    if (token) {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
      
      // Redirect to client-side callback handler after Supabase verifies
      const clientCallbackUrl = `${appUrl}/auth/callback/client?token=${token}&type=${type}&next=${encodeURIComponent(redirectTo)}`
      
      // Redirect to Supabase verify endpoint
      // Supabase will process the token and redirect to our client callback with a code
      const supabaseVerifyUrl = `${supabaseUrl}/auth/v1/verify?token=${token}&type=${type}&redirect_to=${encodeURIComponent(clientCallbackUrl)}`
      
      return NextResponse.redirect(supabaseVerifyUrl)
    }

    // No token or code provided
    return NextResponse.redirect(
      new URL('/login?error=invalid_code&message=No token or code provided', appUrl)
    )
  } catch (error) {
    console.error('Verify email API error:', error)
    return NextResponse.redirect(
      new URL('/login?error=auth_failed', request.url)
    )
  }
}

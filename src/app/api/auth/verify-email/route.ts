import { NextRequest, NextResponse } from 'next/server'

// This route redirects email confirmation tokens to Supabase's verify endpoint
// The real fix is disabling PKCE in Supabase Dashboard
export async function GET(request: NextRequest) {
  try {
    const requestUrl = new URL(request.url)
    const token = requestUrl.searchParams.get('token')
    const type = requestUrl.searchParams.get('type') || 'signup'
    const redirectTo = requestUrl.searchParams.get('redirect_to') || '/dashboard'

    if (!token) {
      return NextResponse.redirect(
        new URL('/login?error=invalid_code&message=No token provided', requestUrl.origin)
      )
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || requestUrl.origin
    
    // Redirect to client-side callback handler
    // Client-side can handle PKCE if browser storage is available
    const clientCallbackUrl = `${appUrl}/auth/callback/client?token=${token}&type=${type}&next=${encodeURIComponent(redirectTo)}`
    
    // Redirect to Supabase verify endpoint
    // Supabase will process the token and redirect to our client callback
    const supabaseVerifyUrl = `${supabaseUrl}/auth/v1/verify?token=${token}&type=${type}&redirect_to=${encodeURIComponent(clientCallbackUrl)}`
    
    return NextResponse.redirect(supabaseVerifyUrl)
  } catch (error) {
    console.error('Verify email API error:', error)
    return NextResponse.redirect(
      new URL('/login?error=auth_failed', request.url)
    )
  }
}

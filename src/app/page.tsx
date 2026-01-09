import { redirect } from 'next/navigation'
import { Hero, Features, SocialProof, CTA } from '@/components'

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string; token?: string; type?: string; [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  
  // Handle email confirmation token directly from email link
  // Email links contain 'token' parameter, not 'code'
  if (params.token && params.type === 'signup') {
    // Use our verify-email API route that bypasses PKCE
    redirect(`/api/auth/verify-email?token=${params.token}&type=${params.type}`)
    return
  }
  
  // Handle email confirmation code from Supabase redirect
  if (params.code) {
    // Redirect to the callback handler to process the code
    redirect(`/auth/callback?code=${params.code}`)
  }

  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <SocialProof />
      <CTA />
    </main>
  )
}
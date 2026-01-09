import { redirect } from 'next/navigation'
import { Hero, Features, SocialProof, CTA } from '@/components'

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string; token?: string; type?: string; [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  
  // Handle email confirmation code from Supabase redirect (for magic links, OAuth, etc.)
  // Note: Signup now uses 6-digit OTP codes, not email links
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
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { AuthContainer } from '@/components/auth/auth-container'
import { VerifyEmailForm } from '@/components/auth/verify-email-form'

export const metadata: Metadata = {
  title: 'Verify Email',
  description: 'Verify your email address with the 6-digit code',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>
}) {
  const params = await searchParams
  const email = params.email

  if (!email) {
    redirect('/signup')
  }

  return (
    <AuthContainer
      title="Verify your email"
      subtitle="Enter the 6-digit code sent to your email"
    >
      <VerifyEmailForm email={email} />
    </AuthContainer>
  )
}


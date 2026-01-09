import { Metadata } from 'next'
import Link from 'next/link'
import { AuthContainer } from '@/components/auth/auth-container'
import { LoginForm } from '@/components/auth/login-form'
import { MagicLinkForm } from '@/components/auth/magic-link-form'
import { OAuthButtons } from '@/components/auth/oauth-buttons'
import { Tabs } from '@/components/auth/tabs'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Sign in to your account',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; redirected?: string }>
}) {
  const params = await searchParams
  let errorMessage: string | null = null
  
  if (params.error) {
    switch (params.error) {
      case 'auth_failed':
        errorMessage = 'Authentication failed. Please try again.'
        break
      case 'code_expired':
        errorMessage = 'This confirmation link has expired. Please request a new one.'
        break
      case 'invalid_code':
        errorMessage = 'Invalid confirmation link. Please check your email for the latest link.'
        break
      default:
        errorMessage = params.message 
          ? decodeURIComponent(params.message as string)
          : 'Authentication failed. Please try again.'
    }
  }

  return (
    <AuthContainer
      title="Welcome back"
      subtitle="Sign in to your account to continue"
    >
      {errorMessage && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {errorMessage}
        </div>
      )}
      <Tabs
        tabs={[
          {
            id: 'password',
            label: 'Password',
            content: (
              <>
                <LoginForm />
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link href="/signup" className="text-primary-600 hover:text-primary-700 font-medium">
                      Sign up
                    </Link>
                  </p>
                </div>
              </>
            ),
          },
          {
            id: 'magic-link',
            label: 'Magic Link',
            content: (
              <>
                <MagicLinkForm />
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link href="/signup" className="text-primary-600 hover:text-primary-700 font-medium">
                      Sign up
                    </Link>
                  </p>
                </div>
              </>
            ),
          },
        ]}
      />
      <div className="mt-6">
        <OAuthButtons />
      </div>
    </AuthContainer>
  )
}


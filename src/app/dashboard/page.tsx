import { Metadata } from 'next'
import { getUser } from '@/lib/auth'
import { Container } from '@/components/layout/container'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Your dashboard',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function DashboardPage() {
  const user = await getUser()

  return (
    <Container className="py-12">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to your Dashboard
          </h1>
          <p className="text-gray-600 mb-8">
            You're successfully signed in!
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Account Information
            </h2>
            <dl className="space-y-3">
              <div>
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900">{user?.email}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">User ID</dt>
                <dd className="mt-1 text-sm text-gray-900 font-mono">{user?.id}</dd>
              </div>
              {user?.created_at && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Member since</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {new Date(user.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </dd>
                </div>
              )}
            </dl>
          </div>

          <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-primary-900 mb-2">
              Getting Started
            </h3>
            <p className="text-primary-700 text-sm">
              This is your dashboard. You can start building your features here.
            </p>
          </div>
        </div>
      </div>
    </Container>
  )
}


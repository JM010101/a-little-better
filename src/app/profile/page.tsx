import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { requireAuth } from '@/lib/auth'
import { Container } from '@/components/layout/container'
import { ProfileForm } from '@/components/profile/profile-form'

export const metadata: Metadata = {
  title: 'Profile',
  description: 'Edit your profile',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function ProfilePage() {
  const session = await requireAuth()
  const user = session.user

  return (
    <Container className="py-12">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Edit Profile
          </h1>
          <p className="text-gray-600 mb-8">
            Update your account information
          </p>

          <ProfileForm user={user} />
        </div>
      </div>
    </Container>
  )
}


'use client'

import * as React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { User } from '@supabase/supabase-js'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface ProfileFormProps {
  user: User
}

export function ProfileForm({ user }: ProfileFormProps) {
  const router = useRouter()
  const [email, setEmail] = useState(user.email || '')
  const [displayName, setDisplayName] = useState(user.user_metadata?.display_name || user.user_metadata?.full_name || '')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const response = await fetch('/api/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          display_name: displayName,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to update profile')
        setLoading(false)
        return
      }

      setSuccess('Profile updated successfully!')
      router.refresh()
    } catch (err) {
      setError('An unexpected error occurred')
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
          {success}
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <Input
          id="email"
          type="email"
          value={email}
          disabled
          className="bg-gray-50 cursor-not-allowed"
        />
        <p className="mt-1 text-xs text-gray-500">
          Email cannot be changed
        </p>
      </div>

      <div>
        <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-2">
          Display Name
        </label>
        <Input
          id="displayName"
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Your name"
          disabled={loading}
        />
        <p className="mt-1 text-xs text-gray-500">
          This name will be displayed on your profile
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-2">Account Information</h3>
        <dl className="space-y-2 text-sm">
          <div>
            <dt className="text-gray-500">User ID</dt>
            <dd className="text-gray-900 font-mono text-xs mt-1">{user.id}</dd>
          </div>
          {user.created_at && (
            <div>
              <dt className="text-gray-500">Member since</dt>
              <dd className="text-gray-900 mt-1">
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

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  )
}


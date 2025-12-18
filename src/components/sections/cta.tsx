'use client'

import { useState } from 'react'
import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const CTA = () => {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setErrorMessage('Please enter your email address')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source: 'homepage_cta',
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        setEmail('')
      } else {
        setSubmitStatus('error')
        setErrorMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage('Failed to submit. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="section-padding bg-gradient-to-r from-primary-600 to-primary-700 text-white">
      <Container>
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Make Things Better?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of businesses who have discovered the power of incremental improvement. 
            Start your journey today and see how a little better truly goes a long way.
          </p>
          
          {/* Waitlist Form */}
          <div className="max-w-md mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <h3 className="text-2xl font-semibold mb-6">Get Early Access</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {submitStatus === 'success' && (
                <div className="p-4 bg-green-500/20 border border-green-400/30 rounded-lg text-green-100 text-sm">
                  ✅ Successfully joined! We'll be in touch soon.
                </div>
              )}
              
              {submitStatus === 'error' && errorMessage && (
                <div className="p-4 bg-red-500/20 border border-red-400/30 rounded-lg text-red-100 text-sm">
                  {errorMessage}
                </div>
              )}
              
              <Input 
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                required
                className="bg-white/20 border-white/30 text-white placeholder:text-blue-100 disabled:opacity-50"
              />
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-primary-600 hover:bg-gray-100 font-bold disabled:opacity-50"
                size="lg"
              >
                {isSubmitting ? 'Joining...' : 'Join Waitlist'}
              </Button>
              <p className="text-sm text-blue-200">
                Be the first to know when we launch. No spam, ever.
              </p>
            </form>
          </div>
          
          <div className="mt-12 text-blue-200">
            <p className="text-sm">
              Questions? Email us at{' '}
              <a href="mailto:hello@a-little-better.com" className="text-white underline hover:text-blue-100">
                hello@a-little-better.com
              </a>
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}

export { CTA }
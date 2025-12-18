'use client'

import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/ui/logo'

const Hero = () => {
  const handleClick = (buttonId: string) => {
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_type: 'click',
        page_path: '/',
        metadata: { element_id: buttonId }
      })
    }).catch(() => {})
  }

  return (
    <section className="section-padding bg-gradient-to-br from-blue-600 via-primary-600 to-primary-700 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%3E%3Cg%20fill%3D%22rgba(255,255,255,0.05)%22%3E%3Cpath%20d%3D%22M0%200h20v20H0z%22/%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      
      <Container className="relative">
        <div className="text-center max-w-5xl mx-auto">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Logo size="xl" />
          </div>
          
          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            A little better goes a{' '}
            <span className="text-accent-300 relative">
              long way
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-accent-400 rounded-full"></div>
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform your business with small, intentional improvements that create lasting impact. 
            Discover how incremental changes compound into extraordinary results.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="xl"
              className="bg-white text-primary-600 hover:bg-gray-100 shadow-lg hover:shadow-xl font-bold"
            >
              Join the Waitlist
            </Button>
            <Button 
              variant="outline"
              size="xl"
              className="border-white text-white hover:bg-white/10 backdrop-blur-sm"
            >
              Learn More
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-12 text-blue-200">
            <p className="text-sm mb-4">Trusted by forward-thinking teams</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
              <div className="text-lg font-semibold">Company A</div>
              <div className="text-lg font-semibold">Company B</div>
              <div className="text-lg font-semibold">Company C</div>
              <div className="text-lg font-semibold">Company D</div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export { Hero }
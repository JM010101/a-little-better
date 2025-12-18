import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { GoogleAnalytics } from '@/components/analytics/google-analytics'
import { PageAnalytics } from '@/components/analytics/page-analytics'
import { StructuredData } from '@/components/analytics/structured-data'
import { organizationSchema, websiteSchema, serviceSchema } from '@/lib/seo'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Continuous Improvement Platform for Teams | Early Access Waitlist',
    template: '%s | A Little Better'
  },
  description: 'Join the early access waitlist for a continuous improvement platform designed for teams. Track small improvements that compound into measurable results.',
  keywords: ['continuous improvement platform', 'team improvement software', 'early access waitlist', 'continuous improvement tools', 'team productivity platform'],
  authors: [{ name: 'A Little Better Team' }],
  creator: 'A Little Better',
  publisher: 'A Little Better',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: '/favicon.svg',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://a-little-better.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://a-little-better.com',
    title: 'Continuous Improvement Platform for Teams | Early Access Waitlist',
    description: 'Join the early access waitlist for a continuous improvement platform designed for teams. Track small improvements that compound into measurable results.',
    siteName: 'A Little Better',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'A Little Better',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Continuous Improvement Platform for Teams | Early Access Waitlist',
    description: 'Join the early access waitlist for a continuous improvement platform designed for teams. Track small improvements that compound into measurable results.',
    creator: '@alittlebetter',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Resource hints for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        
        {/* Structured Data */}
        <StructuredData data={[organizationSchema, websiteSchema, serviceSchema]} />
      </head>
      <body className={inter.className}>
        <GoogleAnalytics />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-accent-50">
          <PageAnalytics />
          {children}
        </div>
      </body>
    </html>
  )
}
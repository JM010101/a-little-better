import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { GoogleAnalytics } from '@/components/analytics/google-analytics'
import { PageAnalytics } from '@/components/analytics/page-analytics'
import { StructuredData } from '@/components/analytics/structured-data'
import { organizationSchema, websiteSchema, serviceSchema } from '@/lib/seo'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'A Little Better - A little better goes a long way',
    template: '%s | A Little Better'
  },
  description: 'A little better goes a long way. Transform your business with small improvements that create lasting impact.',
  keywords: ['business improvement', 'optimization', 'efficiency', 'SaaS', 'productivity'],
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
    title: 'A Little Better - A little better goes a long way',
    description: 'A little better goes a long way. Transform your business with small improvements that create lasting impact.',
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
    title: 'A Little Better - A little better goes a long way',
    description: 'A little better goes a long way. Transform your business with small improvements that create lasting impact.',
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
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // React 19 compatibility: Ensure React is available before React Three Fiber loads
              if (typeof window !== 'undefined' && !window.__REACT_READY__) {
                window.__REACT_READY__ = false;
                const checkReact = setInterval(() => {
                  if (window.React || (window.__REACT__ && window.__REACT__.default)) {
                    window.__REACT_READY__ = true;
                    clearInterval(checkReact);
                  }
                }, 50);
                setTimeout(() => {
                  clearInterval(checkReact);
                  window.__REACT_READY__ = true;
                }, 2000);
              }
            `,
          }}
        />
        <GoogleAnalytics />
        <StructuredData data={[organizationSchema, websiteSchema, serviceSchema]} />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-accent-50">
          <PageAnalytics />
          {children}
        </div>
      </body>
    </html>
  )
}
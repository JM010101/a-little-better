// Structured Data Schemas for A Little Better
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'A Little Better',
  alternateName: 'ALB',
  url: 'https://a-little-better.com',
  logo: 'https://a-little-better.com/logo.png',
  description: 'A little better goes a long way. Transform your business with small improvements that create lasting impact.',
  foundingDate: '2023',
  industry: 'Software as a Service (SaaS)',
  sameAs: [
    'https://twitter.com/alittlebetter',
    'https://linkedin.com/company/alittlebetter'
  ]
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'A Little Better',
  url: 'https://a-little-better.com',
  description: 'A little better goes a long way. Transform your business with small improvements that create lasting impact.',
  publisher: {
    '@type': 'Organization',
    name: 'A Little Better'
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://a-little-better.com/search?q={search_term_string}',
    'query-input': 'required name=search_term_string'
  }
}

export const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Business Improvement Consulting',
  provider: {
    '@type': 'Organization',
    name: 'A Little Better'
  },
  description: 'SaaS platform for implementing small, measurable improvements that create significant business impact.',
  serviceType: 'Business Consulting',
  areaServed: 'Worldwide',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'A Little Better Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Business Optimization Platform'
        }
      }
    ]
  }
}
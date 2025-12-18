// Structured Data Schemas for A Little Better
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'A Little Better',
  alternateName: 'ALB',
  url: 'https://a-little-better.com',
  logo: 'https://a-little-better.com/logo.png',
  description: 'Early access waitlist for a continuous improvement platform for teams',
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
  description: 'Early access waitlist for a continuous improvement platform for teams',
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
  name: 'Continuous Improvement Platform',
  provider: {
    '@type': 'Organization',
    name: 'A Little Better'
  },
  description: 'Early access waitlist for a continuous improvement platform for teams',
  serviceType: 'Continuous Improvement Platform',
  areaServed: 'Worldwide',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'A Little Better Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Continuous Improvement Platform for Teams'
        }
      }
    ]
  }
}
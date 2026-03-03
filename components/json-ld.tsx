export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AI Search Visibility Scanner',
    description: 'Audit your website visibility to AI search engines like ChatGPT-5, Gemini, and Claude.',
    url: 'https://aisearchvisibility.com',
    // use the static asset so crawlers pick up the correct image reliably
    logo: '/ai-visibility-logo.png',
    sameAs: [
      'https://twitter.com/aisearchvis',
      'https://linkedin.com/company/ai-search-visibility',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Support',
      email: 'support@aisearchvisibility.com',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ProductSchema() {
  const schema = {
    '@context': 'https://schema.org/',
    '@type': 'SoftwareApplication',
    name: 'AI Search Visibility Scanner',
    applicationCategory: 'BusinessApplication',
    description: 'Analyze your website visibility to AI search engines and get actionable insights to improve your AI crawler accessibility.',
    url: 'https://aisearchvisibility.com',
    offers: {
      '@type': 'Offer',
      price: '9.00',
      priceCurrency: 'USD',
      url: 'https://aisearchvisibility.com',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '1240',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

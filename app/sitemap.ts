import { MetadataRoute } from 'next';

const baseUrl = 'https://aisearchscanner.com';

// Popular companies for sitemap indexing
const companies = [
  'apple',
  'microsoft',
  'google',
  'amazon',
  'meta',
  'tesla',
  'nvidia',
  'openai',
  'anthropic',
  'ibm',
  'intel',
  'oracle',
  'salesforce',
  'shopify',
  'stripe',
  'figma',
  'notion',
  'airbnb',
  'uber',
  'spotify',
  'netflix',
  'discord',
  'slack',
  'github',
  'gitlab',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // Generate dynamic company check routes
  const dynamicRoutes: MetadataRoute.Sitemap = companies.map((company) => ({
    url: `${baseUrl}/check/${company}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...dynamicRoutes];
}

import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'https://aisearchscanner.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [],
      },
      // Specific rules for AI crawlers (high priority)
      {
        userAgent: 'GPTBot',
        allow: '/',
        crawlDelay: 0,
      },
      {
        userAgent: 'CCBot',
        allow: '/',
        crawlDelay: 0,
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/',
        crawlDelay: 0,
      },
      {
        userAgent: 'Claude-Web',
        allow: '/',
        crawlDelay: 0,
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        crawlDelay: 0,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

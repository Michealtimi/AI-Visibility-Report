import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    // you can keep using VERCEL_URL for deployments, but fall back to the
    // real site instead of the preview link
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.BASE_URL) ??
    'https://ai.logik.website';

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
    // sitemap uses the real subdomain now
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
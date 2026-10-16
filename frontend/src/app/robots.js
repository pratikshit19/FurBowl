export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://furbowl.co.in';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/account',
          '/account/*',
          '/cart',
          '/checkout',
          '/order-confirmation',
          '/order-confirmation/*',
          '/thank-you',
          '/api/*',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

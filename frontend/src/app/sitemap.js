export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://furbowl.co.in';
  
  const staticRoutes = [
    '',
    '/shop',
    '/shop/chicken-harvest',
    '/shop/chicken-homestyle',
    '/shop/golden-egg-quinoa',
    '/shop/paneer-greens',
    '/shop/lamb-lentil-harvest',
    '/shop/golden-chicken-broth',
    '/plans',
    '/find-food',
    '/why-furbowl',
    '/about',
    '/faq',
    '/contact',
    '/shipping-returns',
    '/privacy-policy',
    '/terms-conditions',
  ];

  return staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route.startsWith('/shop') ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : route === '/shop' || route.startsWith('/shop/') ? 0.9 : 0.7,
  }));
}

export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://furbowl.in';
  const routes = ['', '/shop', '/plans', '/find-food', '/about', '/faq', '/contact', '/why-furbowl', '/shipping-returns', '/privacy-policy', '/terms-conditions'];
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/shop' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route === '/shop' ? 0.9 : 0.7,
  }));
}

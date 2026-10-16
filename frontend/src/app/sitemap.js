export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://furbowl.co.in';

  const routes = [
    // Core Pages
    { path: '', priority: 1.0, changeFrequency: 'daily' },
    { path: '/shop', priority: 0.9, changeFrequency: 'daily' },
    { path: '/plans', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/find-food', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/why-furbowl', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/faq', priority: 0.75, changeFrequency: 'weekly' },
    { path: '/contact', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/shipping-returns', priority: 0.65, changeFrequency: 'monthly' },
    { path: '/privacy-policy', priority: 0.5, changeFrequency: 'yearly' },
    { path: '/terms-conditions', priority: 0.5, changeFrequency: 'yearly' },

    // Primary 5 Recipe Pages
    { path: '/shop/chicken-vegetables', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/shop/chicken-rice-vegetables', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/shop/egg-superfood', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/shop/paneer-vegetables', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/shop/lamb-lentils', priority: 0.9, changeFrequency: 'weekly' },

    // Alternative Slug Aliases & Broth
    { path: '/shop/chicken-harvest', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/shop/chicken-homestyle', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/shop/golden-egg-quinoa', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/shop/paneer-greens', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/shop/lamb-lentil-harvest', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/shop/golden-chicken-broth', priority: 0.85, changeFrequency: 'weekly' },

    // Trial & Variety Multi-Packs
    { path: '/shop/all-recipes-trial-pack', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/shop/chicken-lovers-trial-pack', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/shop/meat-lovers-trial-pack', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/shop/chicken-egg-trial-pack', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/shop/meat-veggie-variety-pack', priority: 0.8, changeFrequency: 'weekly' },

    // Meal Plan Box Routes
    { path: '/shop/plan-pack-of-7', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/shop/plan-pack-of-14', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/shop/plan-pack-of-21', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/shop/plan-pack-of-28', priority: 0.8, changeFrequency: 'weekly' },
  ];

  const now = new Date();

  return routes.map((r) => ({
    url: `${baseUrl}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}

// ─── Site Info ──────────────────────────────────────────────────────────────

export const SITE_NAME = 'FurBowl';
export const SITE_TAGLINE = 'Real Food. Pure Love.';
export const SITE_DESCRIPTION = 'Fresh, ready-to-eat dog food made with real, human-grade ingredients.';

// ─── Products Navigation ───────────────────────────────────────────────────

export const PRODUCTS_NAV = [
  {
    id: 'chicken-harvest',
    name: 'Chicken Harvest',
    slug: 'chicken-harvest',
    shortDescription: 'Wholesome nutrition with real chicken, pumpkin & garden veggies.',
    isVeg: false,
    image: '/images/products/chicken-harvest-front.jpg',
  },
  {
    id: 'chicken-homestyle',
    name: 'Chicken Homestyle',
    slug: 'chicken-homestyle',
    shortDescription: 'Homestyle slow-cooked chicken with rice, peas & pumpkin.',
    isVeg: false,
    image: '/images/products/chicken-homestyle-front.jpg',
  },
  {
    id: 'golden-egg-quinoa',
    name: 'Golden Egg & Quinoa',
    slug: 'golden-egg-quinoa',
    shortDescription: 'Farm-fresh eggs with superfood quinoa & pumpkin for active pups.',
    isVeg: true,
    image: '/images/products/golden-egg-quinoa-front.jpg',
  },
  {
    id: 'paneer-greens',
    name: 'Paneer & Greens',
    slug: 'paneer-greens',
    shortDescription: 'Fresh paneer cubes with spinach, carrots & green beans.',
    isVeg: true,
    image: '/images/products/paneer-greens-front.jpg',
  },
  {
    id: 'lamb-lentil-harvest',
    name: 'Lamb Lentil Harvest',
    slug: 'lamb-lentil-harvest',
    shortDescription: 'Hearty slow-cooked lamb with red lentils, sweet potato & broccoli.',
    isVeg: false,
    image: '/images/products/lamb-lentil-harvest-front.jpg',
  },
  {
    id: 'golden-chicken-broth',
    name: 'Golden Chicken Broth',
    slug: 'golden-chicken-broth',
    shortDescription: 'Warm bone broth for hydration, digestion & joint care.',
    isVeg: false,
    image: '/images/products/golden-chicken-broth-front.jpg',
  },
];

// ─── Navigation ─────────────────────────────────────────────────────────────

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Our Products', href: '/shop', hasDropdown: true },
  { label: 'Plans', href: '/plans' },
  { label: 'FurBowl Finder', href: '/find-food' },
  { label: 'About', href: '/about' },
  { label: 'FAQs', href: '/faq' },
];

// ─── Footer Links ───────────────────────────────────────────────────────────

export const FOOTER_LINKS = {
  shop: {
    title: 'Products',
    links: [
      { label: 'All Products', href: '/shop' },
      { label: 'Chicken Harvest', href: '/shop/chicken-harvest' },
      { label: 'Chicken Homestyle', href: '/shop/chicken-homestyle' },
      { label: 'Golden Egg & Quinoa', href: '/shop/golden-egg-quinoa' },
      { label: 'Paneer & Greens', href: '/shop/paneer-greens' },
      { label: 'Lamb Lentil Harvest', href: '/shop/lamb-lentil-harvest' },
      { label: 'Golden Chicken Broth', href: '/shop/golden-chicken-broth' },
    ],
  },
  company: {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Why FurBowl', href: '/why-furbowl' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  help: {
    title: 'Help',
    links: [
      { label: 'FAQs', href: '/faq' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Track Order', href: '/track-order' },
      { label: 'Shipping & Returns', href: '/shipping-returns' },
    ],
  },
  legal: {
    title: 'Policies',
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms & Conditions', href: '/terms-conditions' },
    ],
  },
};

// ─── Shipping ───────────────────────────────────────────────────────────────

export const FREE_SHIPPING_THRESHOLD = 499;
export const FLAT_SHIPPING_RATE = 49;

// ─── Subscription ───────────────────────────────────────────────────────────

export const SUBSCRIPTION_DISCOUNT_PERCENT = 10;

// ─── Currency ───────────────────────────────────────────────────────────────

export const CURRENCY = 'INR';
export const CURRENCY_SYMBOL = '₹';

/**
 * Format price in INR
 * @param {number} amount
 * @returns {string}
 */
export function formatPrice(amount) {
  return `₹${Number(amount).toLocaleString('en-IN')}`;
}

// ─── Order Statuses ─────────────────────────────────────────────────────────

export const ORDER_STATUSES = {
  PENDING: { label: 'Pending', color: 'text-yellow-600', bg: 'bg-yellow-50' },
  PROCESSING: { label: 'Processing', color: 'text-blue-600', bg: 'bg-blue-50' },
  SHIPPED: { label: 'Shipped', color: 'text-purple-600', bg: 'bg-purple-50' },
  DELIVERED: { label: 'Delivered', color: 'text-green-600', bg: 'bg-green-50' },
  CANCELLED: { label: 'Cancelled', color: 'text-red-600', bg: 'bg-red-50' },
  RETURNED: { label: 'Returned', color: 'text-gray-600', bg: 'bg-gray-50' },
};

export const PAYMENT_STATUSES = {
  PENDING: { label: 'Pending', color: 'text-yellow-600' },
  PAID: { label: 'Paid', color: 'text-green-600' },
  FAILED: { label: 'Failed', color: 'text-red-600' },
  REFUNDED: { label: 'Refunded', color: 'text-blue-600' },
  COD_PENDING: { label: 'COD – Pay on Delivery', color: 'text-orange-600' },
};

// ─── 13-Section Redesign Data Sets ─────────────────────────────────────────

export const MOCKUP_RECIPES = [
  {
    id: 'chicken-harvest',
    name: 'Chicken Harvest',
    slug: 'chicken-harvest',
    tags: 'Chicken, Pumpkin, Garden Peas',
    badge: 'Most Loved',
    accentColor: '#fff5f2',
    borderColor: '#ffd8ce',
    tagColor: '#db4d2c',
    price: 199,
    weight: '100g Pouch',
    dogType: 'The Active Explorer',
    image: '/images/products/chicken-harvest-front.jpg',
    pouchOnly: '/images/products/only-chicken-harvest-front.jpg',
    description: 'Real chicken, sweet pumpkin & crisp garden peas gently simmered in small batches.',
  },
  {
    id: 'chicken-homestyle',
    name: 'Chicken Homestyle',
    slug: 'chicken-homestyle',
    tags: 'Chicken, Rice, Garden Veggies',
    badge: 'Classic Comfort',
    accentColor: '#faf6ed',
    borderColor: '#ece4cd',
    tagColor: '#ff7a59',
    price: 199,
    weight: '100g Pouch',
    dogType: 'The Comfort Lover',
    image: '/images/products/chicken-homestyle-front.jpg',
    pouchOnly: '/images/products/only-chicken-homestyle-front.jpg',
    description: 'Homestyle slow-cooked shredded chicken with digestible brown rice and garden carrots.',
  },
  {
    id: 'golden-egg-quinoa',
    name: 'Golden Egg & Quinoa',
    slug: 'golden-egg-quinoa',
    tags: 'Egg, Quinoa, Spinach',
    badge: 'Superfood',
    accentColor: '#f0fafb',
    borderColor: '#cff0f3',
    tagColor: '#0f8e9d',
    price: 189,
    weight: '100g Pouch',
    dogType: 'The Energy Hound',
    image: '/images/products/golden-egg-quinoa-front.jpg',
    pouchOnly: '/images/products/only-golden-egg-quinoa-front.jpg',
    description: 'Farm-fresh scrambled eggs paired with organic Andean quinoa and tender spinach leaves.',
  },
  {
    id: 'paneer-greens',
    name: 'Paneer & Greens',
    slug: 'paneer-greens',
    tags: 'Paneer, Spinach, Pumpkin Seeds',
    badge: '100% Veg',
    accentColor: '#faf6ed',
    borderColor: '#ece4cd',
    tagColor: '#15aec0',
    price: 189,
    weight: '100g Pouch',
    dogType: 'The Gentle Belly',
    image: '/images/products/paneer-greens-front.jpg',
    pouchOnly: '/images/products/only-paneer-greens-front.jpg',
    description: 'Cottage cheese cubes tossed with steam-wilted spinach and nutrient-dense crushed seeds.',
  },
  {
    id: 'lamb-lentil-harvest',
    name: 'Lamb Lentil Harvest',
    slug: 'lamb-lentil-harvest',
    tags: 'Lamb, Lentil, Sweet Potato',
    badge: 'High Protein',
    accentColor: '#fff5f2',
    borderColor: '#ffd8ce',
    tagColor: '#db4d2c',
    price: 229,
    weight: '100g Pouch',
    dogType: 'The Flavor Chaser',
    image: '/images/products/lamb-lentil-harvest-front.jpg',
    pouchOnly: '/images/products/only-lamb-lentil-harvest-front.jpg',
    description: 'Tender pasture-raised lamb slow-stewed with gut-friendly red lentils and sweet potato cubes.',
  },
  {
    id: 'golden-chicken-broth',
    name: 'Golden Chicken Broth',
    slug: 'golden-chicken-broth',
    tags: 'Chicken Bone Broth & Herbs',
    badge: 'Hydration Hero',
    accentColor: '#f0fafb',
    borderColor: '#cff0f3',
    tagColor: '#0f8e9d',
    price: 149,
    weight: '150ml Pouch',
    dogType: 'The Hydration Seeker',
    image: '/images/products/golden-chicken-broth-front.jpg',
    pouchOnly: '/images/products/only-golden-chicken-broth-front.jpg',
    description: 'Simmered for 18 hours with turmeric and parsley to unleash collagen and natural glucosamine.',
  },
];

export const INGREDIENTS_EXPLORER = [
  {
    id: 'chicken',
    name: 'Chicken',
    iconKey: 'chicken',
    whyTitle: 'Why it’s here?',
    description:
      'Lean, human-grade chicken provides essential amino acids for strong muscle development, healthy tissue repair, and irresistible natural aroma.',
    usedIn: ['Chicken Harvest', 'Chicken Homestyle', 'Golden Chicken Broth'],
    image: '/images/products/chicken-harvest-front.jpg',
    badge: 'Single Source Protein',
  },
  {
    id: 'pumpkin',
    name: 'Pumpkin',
    iconKey: 'pumpkin',
    whyTitle: 'Why it’s here?',
    description:
      'Pumpkin is a great source of fibre, supports healthy digestion and is rich in essential vitamins like A, C and E. It naturally settles sensitive tummies.',
    usedIn: ['Chicken Harvest', 'Paneer & Greens'],
    image: '/images/home/fresh-pumpkin.jpg',
    badge: 'Digestive Superfood',
  },
  {
    id: 'carrot',
    name: 'Carrot',
    iconKey: 'carrot',
    whyTitle: 'Why it’s here?',
    description:
      'Loaded with beta-carotene, vitamin K1, and antioxidants that maintain vibrant eyesight, sharp cognition, and a lustrous, shining coat.',
    usedIn: ['Chicken Harvest', 'Chicken Homestyle', 'Paneer & Greens'],
    image: '/images/home/about-dog-parent.png',
    badge: 'Beta-Carotene Boost',
  },
  {
    id: 'peas',
    name: 'Peas',
    iconKey: 'peas',
    whyTitle: 'Why it’s here?',
    description:
      'Tender green garden peas deliver gentle dietary fiber, plant protein, and lutein to promote cardiovascular strength and natural vitality.',
    usedIn: ['Chicken Harvest', 'Chicken Homestyle', 'Golden Egg & Quinoa'],
    image: '/images/home/ingredient-veggies.jpg',
    badge: 'Heart Health',
  },
  {
    id: 'sweet-potato',
    name: 'Sweet Potato',
    iconKey: 'sweet-potato',
    whyTitle: 'Why it’s here?',
    description:
      'Slow-burning complex carbohydrates provide sustained energy throughout zoomie sessions without causing erratic blood sugar spikes.',
    usedIn: ['Lamb Lentil Harvest', 'Golden Egg & Quinoa'],
    image: '/images/home/ingredient-superfoods.jpg',
    badge: 'Low-GI Energy',
  },
  {
    id: 'flaxseed',
    name: 'Flaxseed',
    iconKey: 'flaxseed',
    whyTitle: 'Why it’s here?',
    description:
      'A dense botanical supply of Omega-3 and Omega-6 fatty acids to alleviate seasonal itchiness and nourish silky-smooth dog fur.',
    usedIn: ['Chicken Harvest', 'Lamb Lentil Harvest', 'Paneer & Greens'],
    image: '/images/home/ingredient-grains.jpg',
    badge: 'Omega-3 Rich',
  },
];

export const PACK_STORIES = [
  {
    name: 'Milo',
    role: 'Chicken Harvest Fan',
    quote: '“Finished the whole thing. Again.”',
    image: '/images/home/pack/milo.jpg',
    badge: 'Verified Pup',
    time: '2 hours ago',
  },
  {
    name: 'Oreo',
    role: 'Paneer & Greens Fan',
    quote: '“Apparently vegetables aren’t boring.”',
    image: '/images/home/pack/oreo.jpg',
    badge: 'Verified Pup',
    time: 'Yesterday',
  },
  {
    name: 'Simba',
    role: 'Lamb Lentil Fan',
    quote: '“Dinner disappears in 47 seconds flat.”',
    image: '/images/home/pack/simba.jpg',
    badge: 'Verified Pup',
    time: '3 days ago',
  },
  {
    name: 'Luna',
    role: 'Golden Broth Fan',
    quote: '“Slurp, flip, wag, repeat.”',
    image: '/images/home/pack/luna.jpg',
    badge: 'Verified Pup',
    time: 'This week',
  },
];

export const SCHOOL_ARTICLES = [
  {
    id: 'pumpkin-guide',
    title: 'Can dogs eat pumpkin?',
    category: 'Nutrition',
    readTime: '3 min read',
    summary:
      'The orange miracle vegetable every dog parent needs in their pantry. Digestion, weight management, and feeding tips.',
    image: '/images/home/fresh-pumpkin.jpg',
    slug: 'can-dogs-eat-pumpkin',
  },
  {
    id: 'chicken-vs-lamb',
    title: 'Chicken vs Lamb: What’s different?',
    category: 'Ingredients',
    readTime: '4 min read',
    summary:
      'Comparing amino acid profiles, thermal properties, and taste appeal to find what suits your dog’s unique temperament.',
    image: '/images/home/pack/simba.jpg',
    slug: 'chicken-vs-lamb-whats-different',
  },
  {
    id: 'new-food-transition',
    title: 'How to introduce a new food?',
    category: 'Feeding Guide',
    readTime: '4 min read',
    summary:
      'The golden 7-day transition rule to prevent tummy trouble and cultivate lifelong excitement at mealtime.',
    image: '/images/home/pack/milo.jpg',
    slug: 'how-to-introduce-new-food',
  },
];


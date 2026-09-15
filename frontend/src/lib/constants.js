// ─── Site Info ──────────────────────────────────────────────────────────────

export const SITE_NAME = 'FurBowl';
export const SITE_TAGLINE = 'Real Food. Pure Love.';
export const SITE_DESCRIPTION = 'Fresh, ready-to-eat dog food made with real, human-grade ingredients.';

// ─── Re-export Official Product & Trial Packs Catalog ─────────────────────
export * from './furbowl-data';

// ─── Products Navigation (Official 5 Recipes) ──────────────────────────────

export const PRODUCTS_NAV = [
  {
    id: 'chicken-vegetables',
    name: 'Chicken & Vegetables',
    slug: 'chicken-vegetables',
    shortDescription: 'Whole chicken, liver, gizzard, pumpkin, carrot & peas.',
    isVeg: false,
    image: '/images/products/chicken-harvest-front.jpg',
  },
  {
    id: 'chicken-rice-vegetables',
    name: 'Chicken Rice & Veggies',
    slug: 'chicken-rice-vegetables',
    shortDescription: 'Slow-cooked whole chicken, rice, carrots & sweet potato.',
    isVeg: false,
    image: '/images/products/chicken-homestyle-front.jpg',
  },
  {
    id: 'egg-superfood',
    name: 'Egg Superfood with Quinoa',
    slug: 'egg-superfood',
    shortDescription: 'Farm eggs, organic quinoa, sweet potato, spinach & zucchini.',
    isVeg: true,
    image: '/images/products/golden-egg-quinoa-front.jpg',
  },
  {
    id: 'paneer-vegetables',
    name: 'Paneer & Vegetables',
    slug: 'paneer-vegetables',
    shortDescription: 'Fresh paneer, rice, pumpkin, spinach & chia seeds.',
    isVeg: true,
    image: '/images/products/paneer-greens-front.jpg',
  },
  {
    id: 'lamb-lentils',
    name: 'Lamb & Lentils with Veggies',
    slug: 'lamb-lentils',
    shortDescription: 'Lean lamb, lamb liver, red lentils, broccoli & sweet potato.',
    isVeg: false,
    image: '/images/products/lamb-lentil-harvest-front.jpg',
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
    id: 'chicken-vegetables',
    name: 'Chicken & Vegetables Wet Dog Food',
    slug: 'chicken-vegetables',
    tags: 'Whole Chicken, Liver, Gizzard, Pumpkin, Peas',
    badge: 'Nutritious Everyday',
    accentColor: '#fff5f2',
    borderColor: '#ffd8ce',
    tagColor: '#ff7a59',
    price: 199,
    weight: '100g Pouch',
    dogType: 'Active & Everyday Pups',
    image: '/images/products/chicken-harvest-front.jpg',
    pouchOnly: '/images/products/only-chicken-harvest-front.jpg',
    description: 'A nutritious wet dog food made with whole chicken, chicken liver, heart and gizzard, combined with pumpkin, carrot, peas and sweet potato for a wholesome everyday meal.',
    keyIngredients: 'Whole Chicken • Chicken Liver • Chicken Heart • Chicken Gizzard • Pumpkin • Carrot • Peas • Sweet Potato',
  },
  {
    id: 'chicken-rice-vegetables',
    name: 'Chicken Rice & Vegetables Wet Dog Food',
    slug: 'chicken-rice-vegetables',
    tags: 'Whole Chicken, Rice, Pumpkin, Sweet Potato',
    badge: 'Classic Comfort',
    accentColor: '#faf6ed',
    borderColor: '#ece4cd',
    tagColor: '#15aec0',
    price: 199,
    weight: '100g Pouch',
    dogType: 'Sensitive Stomach Pups',
    image: '/images/products/chicken-homestyle-front.jpg',
    pouchOnly: '/images/products/only-chicken-homestyle-front.jpg',
    description: 'A wholesome chicken and rice wet dog food made with whole chicken, chicken liver and heart, along with pumpkin, carrot, peas and sweet potato.',
    keyIngredients: 'Whole Chicken • Chicken Liver • Chicken Heart • Rice • Pumpkin • Carrot • Peas • Sweet Potato',
  },
  {
    id: 'egg-superfood',
    name: 'Egg Superfood Wet Dog Food',
    slug: 'egg-superfood',
    tags: 'Farm Egg, Quinoa, Sweet Potato, Spinach, Zucchini',
    badge: 'Superfood Power',
    accentColor: '#f0fafb',
    borderColor: '#cff0f3',
    tagColor: '#0f8e9d',
    price: 189,
    weight: '100g Pouch',
    dogType: 'High Energy Pups',
    image: '/images/products/golden-egg-quinoa-front.jpg',
    pouchOnly: '/images/products/only-golden-egg-quinoa-front.jpg',
    description: 'A nutrient-packed egg wet dog food combining egg and quinoa with sweet potato, pumpkin, spinach, carrots, green peas and zucchini for a delicious meal.',
    keyIngredients: 'Egg • Quinoa • Sweet Potato • Pumpkin • Carrot • Spinach • Green Peas • Zucchini',
  },
  {
    id: 'paneer-vegetables',
    name: 'Paneer & Vegetables Wet Dog Food',
    slug: 'paneer-vegetables',
    tags: 'Fresh Paneer, Rice, Pumpkin, Spinach, Chia Seeds',
    badge: '100% Vegetarian',
    accentColor: '#faf6ed',
    borderColor: '#ece4cd',
    tagColor: '#15aec0',
    price: 189,
    weight: '100g Pouch',
    dogType: 'Gentle Digestion & Veg Pups',
    image: '/images/products/paneer-greens-front.jpg',
    pouchOnly: '/images/products/only-paneer-greens-front.jpg',
    description: 'A wholesome vegetarian wet dog food made with paneer, rice and nutritious vegetables including pumpkin, carrot, green peas and spinach.',
    keyIngredients: 'Paneer • Rice • Pumpkin • Carrot • Green Peas • Spinach • Chia Seeds',
  },
  {
    id: 'lamb-lentils',
    name: 'Lamb & Lentils Wet Dog Food',
    slug: 'lamb-lentils',
    tags: 'Lean Lamb, Liver, Red Lentils, Broccoli, Cauliflower',
    badge: 'High Protein Gourmet',
    accentColor: '#fff5f2',
    borderColor: '#ffd8ce',
    tagColor: '#db4d2c',
    price: 229,
    weight: '100g Pouch',
    dogType: 'Pickiest Eaters & Muscle Building',
    image: '/images/products/lamb-lentil-harvest-front.jpg',
    pouchOnly: '/images/products/only-lamb-lentil-harvest-front.jpg',
    description: 'A hearty lamb wet dog food made with lean lamb meat and lamb liver, combined with red lentils, sweet potato and wholesome vegetables.',
    keyIngredients: 'Lean Lamb • Lamb Liver • Red Lentils • Sweet Potato • Carrot • Green Beans • Broccoli • Cauliflower',
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


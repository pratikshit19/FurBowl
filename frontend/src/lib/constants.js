// ─── Site Info ──────────────────────────────────────────────────────────────

export const SITE_NAME = 'FurBowl';
export const SITE_TAGLINE = 'Real Food. Pure Love.';
export const SITE_DESCRIPTION = 'Fresh, ready-to-eat dog food made with real, human-grade ingredients.';

// ─── Navigation ─────────────────────────────────────────────────────────────

export const NAV_LINKS = [
  { label: 'Shop', href: '/shop' },
  { label: 'Find Food', href: '/find-food' },
  { label: 'Why FurBowl', href: '/why-furbowl' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

// ─── Footer Links ───────────────────────────────────────────────────────────

export const FOOTER_LINKS = {
  shop: {
    title: 'Shop',
    links: [
      { label: 'All Products', href: '/shop' },
      { label: 'Meals', href: '/shop?category=meals' },
      { label: 'Broth', href: '/shop?category=broth' },
      { label: 'Find Food for My Dog', href: '/find-food' },
    ],
  },
  company: {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Why FurBowl', href: '/why-furbowl' },
      { label: 'Blog', href: '/blog' },
      { label: 'Reviews', href: '/reviews' },
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

import CartPageClient from '@/components/cart/CartPageClient';

export const metadata = {
  title: 'Your Cart | FurBowl',
  description:
    'Review your fresh pet food packets, apply promo discounts, and proceed to secure checkout.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function CartPage() {
  return <CartPageClient />;
}

import CheckoutClient from '@/components/checkout/CheckoutClient';

export const metadata = {
  title: 'Checkout | FurBowl Secure Payment',
  description:
    'Complete your FurBowl fresh dog food order with nationwide delivery and secure payment via UPI, Cards, or NetBanking.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}

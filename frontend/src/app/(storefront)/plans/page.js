import PlansClient from '@/components/plans/PlansClient';

export const metadata = {
  title: 'Custom Monthly Meal Plans | FurBowl',
  description:
    'Flexible 7, 14, 21, and 28-day fresh meal boxes for dogs. Save up to 25% with automatic kitchen-cooked delivery across India. Pause, skip, or cancel anytime.',
  openGraph: {
    title: 'Custom Monthly Meal Plans | FurBowl',
    description: 'Fresh, human-grade meal boxes delivered directly from our kitchen to your dog’s bowl.',
    images: ['/images/carousel_1.png'],
  },
};

export default function PlansPage() {
  return <PlansClient />;
}

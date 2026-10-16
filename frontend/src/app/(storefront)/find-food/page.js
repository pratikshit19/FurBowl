import FindFoodClient from '@/components/finder/FindFoodClient';

export const metadata = {
  title: 'FurBowl Finder — Personalized Dog Nutrition Quiz',
  description:
    'Take our quick 60-second quiz to calculate your dog’s daily caloric requirement and discover the perfect human-grade fresh meal recipes.',
  openGraph: {
    title: 'FurBowl Finder — Personalized Dog Nutrition Quiz',
    description: 'Calculate your pet’s exact daily calories and get a custom recipe recommendation.',
    images: ['/images/carousel_1.png'],
  },
};

export default function FindFoodPage() {
  return <FindFoodClient />;
}

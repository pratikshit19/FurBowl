import WishlistClient from '@/components/wishlist/WishlistClient';

export const metadata = {
  title: 'Your Saved Recipes | FurBowl Wishlist',
  description:
    'View and order your dog’s favorite fresh meals saved to your FurBowl wishlist.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function WishlistPage() {
  return <WishlistClient />;
}

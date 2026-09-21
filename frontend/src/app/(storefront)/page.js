import HeroCarousel from '@/components/home/HeroCarousel';
import ShopByCategorySection from '@/components/home/ShopByCategorySection';
import WhyFurBowlSection from '@/components/home/WhyFurBowlSection';
import IngredientsSection from '@/components/home/IngredientsSection';
import MenuSection from '@/components/home/MenuSection';
import ComparisonSection from '@/components/home/ComparisonSection';
import DogStatsSection from '@/components/home/DogStatsSection';

export const metadata = {
  title: 'FurBowl — Real Food. Pure Love. | Fresh Dog Food India',
  description:
    'Fresh, human-grade dog food cooked gently with real ingredients. Shop by Category, explore our ingredients, try our chef-crafted meals, and see the FurBowl difference.',
};

export default function HomePage() {
  return (
    <>
      {/* 1. Hero Carousel */}
      <HeroCarousel />

      {/* 2. Shop by Category */}
      <ShopByCategorySection />

      {/* 3. Why FurBowl */}
      <WhyFurBowlSection />

      {/* 4. Food so real you could eat it yourself (Our Ingredients) */}
      <IngredientsSection />

      {/* 4. Our Products / Meals */}
      <MenuSection />

      {/* 5. Comparison Section */}
      <ComparisonSection />

      {/* 6. Section where there are some stats for dogs */}
      <DogStatsSection />
    </>
  );
}

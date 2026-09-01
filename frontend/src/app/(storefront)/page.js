import HeroCarousel from '@/components/home/HeroCarousel';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import IngredientsSection from '@/components/home/IngredientsSection';
import WhyFurBowl from '@/components/home/WhyFurBowl';
import AboutSection from '@/components/home/AboutSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FAQSection from '@/components/home/FAQSection';

export const metadata = {
  title: 'FurBowl — Real Food. Pure Love. | Fresh Dog Food India',
  description:
    'Fresh, ready-to-eat dog food made with real, human-grade ingredients. Chicken Rice, Paneer Medley, Egg Superfood, Lamb & Lentils, Chicken Broth. Free shipping above ₹499.',
};

// Fetch featured products server-side for SEO
async function getFeaturedProducts() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/featured`,
      { next: { revalidate: 300 } } // cache 5 minutes
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.products;
  } catch {
    return null; // graceful fallback to placeholder data
  }
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <>
      <HeroCarousel />
      <IngredientsSection />
      <FeaturedProducts products={featuredProducts} />
      <WhyFurBowl />
      <AboutSection />
      <TestimonialsSection />
      <FAQSection />
    </>
  );
}

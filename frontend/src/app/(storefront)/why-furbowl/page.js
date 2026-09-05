import WhyFurBowl from '@/components/home/WhyFurBowl';
import IngredientsSection from '@/components/home/IngredientsSection';
import Link from 'next/link';

export const metadata = {
  title: 'Why FurBowl | Honest Fresh Dog Food',
  description: 'Learn why dog parents across India trust FurBowl fresh meals. Human-grade ingredients, vet-informed recipes, no preservatives.',
};

export default function WhyFurBowlPage() {
  return (
    <>
      <div className="bg-turquoise-700 text-white py-16 text-center">
        <div className="container-main max-w-3xl">
          <p className="text-turquoise-200 text-sm font-semibold uppercase tracking-widest mb-3">
            Real Food. Pure Love.
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            The FurBowl Standard
          </h1>
          <p className="text-turquoise-100 text-lg leading-relaxed">
            We believe your dog deserves food as honest, clean, and nutritious as what you cook for your own family.
          </p>
        </div>
      </div>

      <WhyFurBowl />
      <IngredientsSection />

      <div className="section-padding bg-white text-center">
        <div className="container-main max-w-2xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Upgrade Your Dog's Bowl?</h2>
          <p className="text-gray-500 mb-8">Try our ready-to-eat pouches today with free delivery on orders above ₹499.</p>
          <Link href="/shop" className="bg-turquoise-600 text-white font-semibold px-8 py-4 rounded-xl hover:bg-turquoise-700 transition-colors inline-block text-sm">
            Shop All Fresh Meals
          </Link>
        </div>
      </div>
    </>
  );
}

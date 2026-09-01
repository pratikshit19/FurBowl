import AboutSection from '@/components/home/AboutSection';
import Link from 'next/link';

export const metadata = {
  title: 'About Us | FurBowl Pet Food',
  description: 'Our mission at FurBowl is to bring real, wholesome nutrition to every dog in India. Learn about our story and values.',
};

export default function AboutPage() {
  return (
    <>
      <div className="bg-warm-brown text-white py-16 text-center">
        <div className="container-main max-w-3xl">
          <p className="text-amber-200 text-sm font-semibold uppercase tracking-widest mb-3">
            Our Story
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About FurBowl
          </h1>
          <p className="text-amber-100 text-lg leading-relaxed">
            Crafting fresh, ready-to-eat dog food with unconditional love and zero compromise.
          </p>
        </div>
      </div>

      <AboutSection />

      {/* Core Values */}
      <section className="section-padding bg-white">
        <div className="container-main max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Core Commitments</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <div className="text-3xl mb-3">🤝</div>
              <h3 className="font-bold text-gray-900 mb-2">Uncompromising Integrity</h3>
              <p className="text-sm text-gray-600 leading-relaxed">What is printed on our label is exactly what is inside the pouch. No hidden ingredients or misleading claims.</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <div className="text-3xl mb-3">🌱</div>
              <h3 className="font-bold text-gray-900 mb-2">Pure Human-Grade</h3>
              <p className="text-sm text-gray-600 leading-relaxed">We source ingredients from the same supply chains that feed humans. Clean, safe, and wholesome.</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <div className="text-3xl mb-3">❤️</div>
              <h3 className="font-bold text-gray-900 mb-2">Pet-First Always</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Every recipe is designed around pet longevity, digestive ease, and taste satisfaction.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

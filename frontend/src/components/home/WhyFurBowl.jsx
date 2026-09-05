import Link from 'next/link';
import Image from 'next/image';

const PILLARS = [
  {
    id: 1,
    title: 'Human-Grade Ingredients',
    body: "Every ingredient meets 100% human food standards. Fresh produce, real meats, and superfoods — quality you'd find in your own kitchen.",
    icon: (
      <svg className="w-6 h-6 text-plum-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Ready to Eat',
    body: 'Cut. Open. Serve. No cooking, no mixing, no guesswork. Our meals are fully cooked and ready straight from the pouch.',
    icon: (
      <svg className="w-6 h-6 text-plum-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Vet-Informed Nutrition',
    body: 'Scientifically formulated with pet nutritionists. Balanced protein, healthy fats, and micronutrients calibrated for your dog.',
    icon: (
      <svg className="w-6 h-6 text-plum-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'No Fillers or Nasties',
    body: 'Zero corn, wheat, soy, artificial colours, or preservatives. Cooked fresh in small batches with zero nasties.',
    icon: (
      <svg className="w-6 h-6 text-plum-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function WhyFurBowl() {
  return (
    <section className="section-padding bg-white" aria-labelledby="why-furbowl-heading">
      <div className="container-main">
        {/* Combined Unified "Why Choose FurBowl" Pillars Grid */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 id="why-furbowl-heading" className="text-3xl sm:text-4xl font-extrabold text-plum-900 tracking-tight mb-3">
              Why Pet Parents Trust FurBowl
            </h2>
            <p className="text-plum-900/70 text-sm sm:text-base leading-relaxed font-medium">
              We cook real food for real dogs. Here is our commitment to your fur baby&apos;s health and happiness.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.id}
                className="bg-[#faf6ed] p-6 rounded-2xl border border-plum-900/10 hover:border-coral-500/30 hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-butter-300 text-plum-900 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {pillar.icon}
                </div>
                <h3 className="font-extrabold text-plum-900 text-base mb-2">{pillar.title}</h3>
                <p className="text-xs sm:text-sm text-plum-900/70 leading-relaxed">{pillar.body}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

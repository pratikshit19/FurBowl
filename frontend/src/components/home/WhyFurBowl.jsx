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
    <section className="section-padding bg-[#faf6ed]" aria-labelledby="why-furbowl-heading">
      <div className="container-main space-y-16">
        
        {/* Promotional Coral Offer Banner */}
        <div className="relative rounded-3xl bg-coral-500 text-white p-8 sm:p-12 overflow-hidden shadow-xl">
          {/* Ambient Glow */}
          <div className="absolute -right-12 -top-12 w-64 h-64 bg-butter-300/20 rounded-full blur-2xl pointer-events-none" />

          <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Offer Text */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-4">
              <span className="inline-flex items-center gap-1.5 bg-butter-300 text-plum-900 text-xs font-extrabold uppercase tracking-widest px-3.5 py-1.5 rounded-full">
                <svg className="w-4 h-4 text-plum-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H4.5A1.5 1.5 0 013 19.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625A2.625 2.625 0 1114.625 7.5H12m0-2.625V7.5m-9 3h18v3H3v-3z" />
                </svg>
                Welcome Offer
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
                Get 10% OFF on Your First Order!
              </h2>

              <p className="text-white/90 text-sm sm:text-base max-w-lg leading-relaxed font-medium">
                Because every new furry friend deserves a warm, fresh, and nutritious welcome. Use code <span className="font-extrabold text-butter-300 underline">FIRST10</span> at checkout.
              </p>

              <div className="pt-2">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 bg-butter-300 hover:bg-butter-400 text-plum-900 px-8 py-3.5 rounded-full font-extrabold text-sm transition-all shadow-lg active:scale-95"
                >
                  Shop Now &amp; Save
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Right Dog Photo */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end items-end relative h-[240px] sm:h-[280px]">
              <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-butter-300 flex items-center justify-center relative overflow-hidden shadow-inner border-4 border-white/20">
                <Image
                  src="/images/dog1.jpg"
                  alt="Happy dog enjoying FurBowl fresh food"
                  fill
                  className="object-cover"
                  sizes="256px"
                />
              </div>
            </div>

          </div>
        </div>

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
                className="bg-white/80 p-6 rounded-2xl border border-plum-900/10 hover:border-coral-500/30 hover:shadow-md transition-all duration-300 group"
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

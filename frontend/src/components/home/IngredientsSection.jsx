import Link from 'next/link';

const INGREDIENT_GROUPS = [
  {
    id: 'protein',
    title: 'Real Meats & Protein',
    subtitle: 'High-protein fresh meats cooked gently to preserve essential nutrients and natural flavors.',
    items: ['Fresh Chicken', 'Slow-Cooked Lamb', 'Paneer', 'Farm-Fresh Eggs'],
    badge: 'Builds Strong Muscles',
    icon: (
      <svg className="w-7 h-7 text-plum-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 019 3.75a8.287 8.287 0 013 0c1.077.202 2.08.66 2.946 1.326z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 009-9c0-1.748-.498-3.377-1.363-4.75" />
      </svg>
    ),
  },
  {
    id: 'veggies',
    title: 'Farm-Fresh Vegetables',
    subtitle: 'Nutrient-dense garden veggies packed with natural antioxidants, fiber, and essential vitamins.',
    items: ['Carrots', 'Fiber-Rich Pumpkin', 'Spinach', 'Green Beans'],
    badge: 'Boosts Immunity & Digestion',
    icon: (
      <svg className="w-7 h-7 text-plum-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m9-9H3" />
      </svg>
    ),
  },
  {
    id: 'grains',
    title: 'Wholesome Grains & Carbs',
    subtitle: 'Easily digestible whole grains providing sustained energy and gentle care for sensitive stomachs.',
    items: ['Brown Rice', 'Rolled Oats', 'Sweet Potato', 'Quinoa'],
    badge: 'Sustained All-Day Energy',
    icon: (
      <svg className="w-7 h-7 text-plum-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 'superfoods',
    title: 'Natural Superfoods & Oils',
    subtitle: 'Cold-pressed healthy fats and herbs for a radiant coat, joint flexibility, and holistic wellness.',
    items: ['Flaxseed Oil', 'Coconut Oil', 'Turmeric', 'Chia Seeds'],
    badge: 'Shiny Coat & Joint Care',
    icon: (
      <svg className="w-7 h-7 text-coral-500 fill-current" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    ),
  },
];

export default function IngredientsSection() {
  return (
    <section className="section-padding bg-white" aria-labelledby="ingredients-section-heading">
      <div className="container-main space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 bg-butter-300 text-plum-900 text-xs font-extrabold uppercase tracking-widest px-3.5 py-1.5 rounded-full">
            100% Human-Grade
          </span>
          <h2 id="ingredients-section-heading" className="text-3xl sm:text-4xl font-extrabold text-plum-900 tracking-tight">
            Our Real Ingredients
          </h2>
          <p className="text-plum-900/70 text-sm sm:text-base leading-relaxed font-medium">
            We list every single ingredient because your dog deserves total transparency. Real food you can see, smell, and trust.
          </p>
        </div>

        {/* Ingredients Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INGREDIENT_GROUPS.map((group) => (
            <div
              key={group.id}
              className="bg-[#faf6ed] p-6 rounded-3xl border border-plum-900/10 shadow-sm hover:shadow-md hover:border-coral-500/30 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-13 h-13 w-12 h-12 rounded-2xl bg-[#fbe285] text-plum-900 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {group.icon}
                  </div>
                  <span className="text-[11px] font-extrabold text-coral-500 bg-coral-500/10 px-2.5 py-1 rounded-full">
                    {group.badge}
                  </span>
                </div>

                <h3 className="font-extrabold text-plum-900 text-lg mb-2 group-hover:text-coral-500 transition-colors">
                  {group.title}
                </h3>
                <p className="text-xs sm:text-sm text-plum-900/70 leading-relaxed mb-6 font-medium">
                  {group.subtitle}
                </p>
              </div>

              {/* Tag Pills */}
              <div className="pt-4 border-t border-plum-900/5">
                <p className="text-[11px] font-extrabold text-plum-900/50 uppercase tracking-wider mb-2.5">
                  Key Ingredients:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="text-xs font-bold text-plum-900 bg-white px-2.5 py-1 rounded-lg border border-plum-900/10"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="bg-[#faf6ed] rounded-2xl p-6 sm:p-8 border border-plum-900/10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-full bg-butter-300 flex items-center justify-center text-plum-900 shrink-0 hidden sm:flex">
              <svg className="w-6 h-6 text-plum-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-extrabold text-plum-900 text-base sm:text-lg">
                Zero Artificial Fillers, Preservatives or By-Products
              </h4>
              <p className="text-xs sm:text-sm text-plum-900/70 font-medium">
                Freshly prepared, gently cooked, and delivered right to your doorstep.
              </p>
            </div>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-coral-500 hover:bg-coral-600 text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all shadow-md active:scale-95 shrink-0"
          >
            Explore Meals
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}

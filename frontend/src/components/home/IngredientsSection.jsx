import Link from 'next/link';
import Image from 'next/image';

const INGREDIENT_GROUPS = [
  {
    id: 'protein',
    title: 'Real Meats & Protein',
    subtitle: 'High-protein fresh meats cooked gently to preserve essential nutrients and natural flavors.',
    items: ['Fresh Chicken', 'Slow-Cooked Lamb', 'Paneer', 'Farm-Fresh Eggs'],
    badge: 'Builds Strong Muscles',
    image: '/images/home/ingredient-protein.jpg',
    alt: 'Fresh raw chicken breast and quality meat cuts',
  },
  {
    id: 'veggies',
    title: 'Farm-Fresh Vegetables',
    subtitle: 'Nutrient-dense garden veggies packed with natural antioxidants, fiber, and essential vitamins.',
    items: ['Carrots', 'Fiber-Rich Pumpkin', 'Spinach', 'Green Beans'],
    badge: 'Boosts Immunity & Digestion',
    image: '/images/home/ingredient-veggies.jpg',
    alt: 'Fresh carrots, pumpkin, green beans and spinach',
  },
  {
    id: 'grains',
    title: 'Wholesome Grains & Carbs',
    subtitle: 'Easily digestible whole grains providing sustained energy and gentle care for sensitive stomachs.',
    items: ['Brown Rice', 'Rolled Oats', 'Sweet Potato', 'Quinoa'],
    badge: 'Sustained All-Day Energy',
    image: '/images/home/ingredient-grains.jpg',
    alt: 'Bowls of brown rice, rolled oats, and fresh sweet potato',
  },
  {
    id: 'superfoods',
    title: 'Natural Superfoods & Oils',
    subtitle: 'Cold-pressed healthy fats and herbs for a radiant coat, joint flexibility, and holistic wellness.',
    items: ['Flaxseed Oil', 'Coconut Oil', 'Turmeric', 'Chia Seeds'],
    badge: 'Shiny Coat & Joint Care',
    image: '/images/home/ingredient-superfoods.jpg',
    alt: 'Cold-pressed golden flaxseed oil, turmeric root, and chia seeds',
  },
];

export default function IngredientsSection() {
  return (
    <section className="section-padding bg-white" aria-labelledby="ingredients-section-heading">
      <div className="container-main space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 bg-butter-300 text-plum-900 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-sm">
            100% Human-Grade
          </span>
          <h2 id="ingredients-section-heading" className="text-3xl sm:text-4xl font-extrabold text-plum-900 tracking-tight">
            Our Real Ingredients
          </h2>
          <p className="text-plum-900/70 text-sm sm:text-base leading-relaxed font-normal">
            We list every single ingredient because your dog deserves total transparency. Real food you can see, smell, and trust.
          </p>
        </div>

        {/* Ingredients Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INGREDIENT_GROUPS.map((group) => (
            <div
              key={group.id}
              className="bg-white rounded-sm border border-plum-900/10 shadow-xs hover:shadow-md hover:border-plum-900/25 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              {/* Subtle Real Food Image Window */}
              <div className="relative w-full h-40 bg-[#faf6ed] overflow-hidden border-b border-plum-900/10">
                <Image
                  src={group.image}
                  alt={group.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-2.5 left-3 text-[10px] font-bold uppercase tracking-wider text-plum-900 bg-white/95 backdrop-blur-sm border border-plum-900/10 px-2 py-0.5 rounded-sm shadow-xs">
                  {group.badge}
                </span>
              </div>

              {/* Content Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-plum-900 text-base sm:text-lg mb-1.5 group-hover:text-coral-500 transition-colors">
                    {group.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-plum-900/70 leading-relaxed font-normal mb-5">
                    {group.subtitle}
                  </p>
                </div>

                {/* Key Ingredients Tags */}
                <div className="pt-3.5 border-t border-plum-900/10">
                  <p className="text-[10px] font-bold text-plum-900/40 uppercase tracking-wider mb-2">
                    Key Ingredients
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="text-[11px] font-semibold text-plum-900/80 bg-[#faf6ed] px-2 py-0.5 rounded-sm border border-plum-900/10"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="bg-[#faf6ed] rounded-sm p-6 sm:p-8 border border-plum-900/10 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-10 h-10 rounded-sm bg-butter-300 flex items-center justify-center text-plum-900 shrink-0 hidden sm:flex">
              <svg className="w-5 h-5 text-plum-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-plum-900 text-base sm:text-lg">
                Zero Artificial Fillers, Preservatives or By-Products
              </h4>
              <p className="text-xs sm:text-sm text-plum-900/70 font-normal">
                Freshly prepared, gently cooked, and delivered right to your doorstep.
              </p>
            </div>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-coral-500 hover:bg-coral-600 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-sm transition-all shadow-sm active:scale-95 shrink-0"
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

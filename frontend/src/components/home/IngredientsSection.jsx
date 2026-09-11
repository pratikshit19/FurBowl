'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Drumstick, Carrot, Wheat, Leaf, Check, ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/common/ScrollReveal';

const INGREDIENT_GROUPS = [
  {
    id: 'protein',
    title: 'Real Meats & Protein',
    subtitle: 'High-protein whole meats cooked gently to preserve essential amino acids, moisture, and natural flavor.',
    items: ['Fresh Chicken Breast', 'Slow-Cooked Lamb', 'Farm-Fresh Paneer', 'Free-Range Eggs'],
    badge: 'Builds Lean Muscle',
    badgeColor: 'border-teal-200 text-teal-800 bg-teal-50/90',
    iconBg: 'bg-teal-50 text-teal-600',
    checkColor: 'text-teal-600',
    image: '/images/home/ingredient-protein.jpg',
    alt: 'Fresh high-protein meats and farm eggs',
    icon: Drumstick,
  },
  {
    id: 'veggies',
    title: 'Farm-Fresh Vegetables',
    subtitle: 'Nutrient-dense garden vegetables loaded with dietary fiber, natural antioxidants, and vital beta-carotene.',
    items: ['Orange Carrots', 'Fiber-Rich Pumpkin', 'Tender Spinach', 'Crisp Green Beans'],
    badge: 'Supports Digestion',
    badgeColor: 'border-peach-200 text-peach-800 bg-peach-50/90',
    iconBg: 'bg-peach-50 text-peach-600',
    checkColor: 'text-peach-600',
    image: '/images/home/ingredient-veggies.jpg',
    alt: 'Fresh carrots, pumpkin, spinach and green beans',
    icon: Carrot,
  },
  {
    id: 'grains',
    title: 'Wholesome Grains & Carbs',
    subtitle: 'Easily digestible whole grains and tubers providing sustained all-day stamina and gentle digestion for sensitive stomachs.',
    items: ['Organic Brown Rice', 'Rolled Oats', 'Sweet Potato', 'Superfood Quinoa'],
    badge: 'All-Day Stamina',
    badgeColor: 'border-teal-200 text-teal-800 bg-teal-50/90',
    iconBg: 'bg-teal-50 text-teal-600',
    checkColor: 'text-teal-600',
    image: '/images/home/ingredient-grains.jpg',
    alt: 'Wholesome brown rice, oats, and sweet potatoes',
    icon: Wheat,
  },
  {
    id: 'superfoods',
    title: 'Natural Superfoods & Oils',
    subtitle: 'Cold-pressed healthy fatty acids and Ayurvedic botanicals for a shiny glossy coat and resilient joint cartilage.',
    items: ['Cold-Pressed Flaxseed Oil', 'Virgin Coconut Oil', 'Turmeric Root', 'Chia Seeds'],
    badge: 'Glossy Coat & Joints',
    badgeColor: 'border-peach-200 text-peach-800 bg-peach-50/90',
    iconBg: 'bg-peach-50 text-peach-600',
    checkColor: 'text-peach-600',
    image: '/images/home/ingredient-superfoods.jpg',
    alt: 'Cold-pressed oils, turmeric and superfood seeds',
    icon: Leaf,
  },
];

export default function IngredientsSection() {
  return (
    <section id="ingredients-section" className="py-16 sm:py-24 bg-[#faf6ed] border-b border-plum-900/5">
      <div className="container-main">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <p className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-peach-600 mb-3">
            Pure Transparency
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-plum-900 tracking-tight">
            Our Real Ingredients
          </h2>
          <p className="text-plum-900/70 text-sm sm:text-base leading-relaxed mt-2.5 font-normal">
            We list every single ingredient because your dog deserves total transparency. Real food you can see, smell, and trust.
          </p>
        </div>

        {/* 4 Ingredient Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {INGREDIENT_GROUPS.map((group, idx) => {
            const Icon = group.icon;
            return (
              <ScrollReveal key={group.id} delay={idx * 80} className="h-full">
                <div
                  className="bg-white rounded-2xl border border-plum-900/10 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1 h-full"
                >
                  {/* Image Window */}
                  <div className="relative w-full h-44 bg-cream-100 overflow-hidden">
                    <Image
                      src={group.image}
                      alt={group.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Badge */}
                    <span className={`absolute bottom-2.5 left-3 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs border ${group.badgeColor}`}>
                      {group.badge}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-7 h-7 rounded-lg ${group.iconBg} flex items-center justify-center shrink-0`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <h3 className="font-bold text-plum-900 text-base sm:text-lg transition-colors">
                          {group.title}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-plum-900/70 leading-relaxed font-normal mb-5">
                        {group.subtitle}
                      </p>
                    </div>

                    {/* Key Ingredients List */}
                    <div className="pt-3.5 border-t border-plum-900/5">
                      <p className="text-[10px] font-bold text-plum-900/40 uppercase tracking-wider mb-2">
                        Key Fresh Foods
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {group.items.map((item) => (
                          <span
                            key={item}
                            className="inline-flex items-center gap-1 text-[11px] font-medium bg-[#fdfbf7] text-plum-900/80 px-2.5 py-1 rounded-md border border-plum-900/5"
                          >
                            <Check className={`w-3 h-3 ${group.checkColor} shrink-0`} />
                            <span>{item}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Real Kitchen Transparency Feature Banner */}
        <ScrollReveal delay={120}>
          <div className="bg-white rounded-3xl border border-plum-900/10 overflow-hidden shadow-md grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Left: Fresh ingredients flatlay photography */}
            <div className="lg:col-span-5 relative h-64 sm:h-72 lg:h-full min-h-[280px] bg-cream-100">
              <Image
                src="/images/home/ingredients-flatlay.png"
                alt="Fresh human-grade raw ingredients flatlay: chicken breast, pumpkin, carrots, spinach, turmeric, and chia seeds"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent pointer-events-none" />
              <span className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-xs text-plum-900 text-xs font-black px-3 py-1 rounded-full shadow-md border border-plum-900/10">
                Real Whole Ingredients Only
              </span>
            </div>

            {/* Right: Message with Dog Avatar and CTA */}
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
              <div className="flex items-start gap-4 mb-4">
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden shrink-0 border-2 border-teal-500 shadow-sm">
                  <Image
                    src="/images/home/quiz-border-collie.jpg"
                    alt="Happy border collie pup"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-teal-600 block mb-0.5">
                    100% Kitchen Transparency
                  </span>
                  <h4 className="text-xl sm:text-2xl font-black text-plum-900 leading-tight">
                    Food so fresh you could eat it yourself.
                  </h4>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-plum-900/70 leading-relaxed mb-6 font-normal">
                No rendered meat meal, no mystery by-products, and zero chemical additives. We source fresh chicken, tender lamb, farm paneer, and garden vegetables directly from human food supply chains.
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-plum-900/5">
                <div className="flex items-center gap-3 text-xs font-bold text-plum-900/70">
                  <span className="inline-flex items-center gap-1">
                    <Check className="w-4 h-4 text-teal-600" />
                    <span>Zero Rendered Meals</span>
                  </span>
                  <span className="text-plum-900/20">•</span>
                  <span className="inline-flex items-center gap-1">
                    <Check className="w-4 h-4 text-peach-600" />
                    <span>Zero Artificial Dyes</span>
                  </span>
                </div>
                <Link
                  href="/shop"
                  className="bg-teal-500 hover:bg-teal-600 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2"
                >
                  <span>View Full Menu</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

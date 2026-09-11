'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Package, CalendarCheck, SlidersHorizontal, Utensils, ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/common/ScrollReveal';

const CATEGORIES = [
  {
    id: 'trial-packs',
    name: 'Trial Packs',
    tagline: 'Test before you trust',
    badge: 'Starter Choice',
    badgeColor: 'bg-peach-50 text-peach-700 border-peach-200',
    accentColor: 'text-peach-600',
    btnBg: 'bg-peach-50 text-peach-700 hover:bg-peach-500 hover:text-white',
    borderHover: 'hover:border-peach-300',
    priceText: 'From ₹178',
    link: '/shop?category=trial-packs',
    image: '/images/home/puppy-trial-tasting.jpg',
    alt: 'Puppy tasting fresh chicken and veggies from a spoon',
    icon: Package,
  },
  {
    id: 'monthly-packs',
    name: 'Monthly Packs',
    tagline: 'Buy more, save more',
    badge: 'Save 15%',
    badgeColor: 'bg-teal-50 text-teal-800 border-teal-200',
    accentColor: 'text-teal-600',
    btnBg: 'bg-teal-50 text-teal-800 hover:bg-teal-500 hover:text-white',
    borderHover: 'hover:border-teal-300',
    priceText: 'Flexible Plans',
    link: '/shop?category=monthly-packs',
    image: '/images/home/furbowl-box-bundle.jpg',
    alt: 'FurBowl eco-friendly monthly delivery box with fresh pouches and carrots',
    icon: CalendarCheck,
  },
  {
    id: 'build-your-box',
    name: 'Build your own box',
    tagline: 'Mix & match any 6 recipes',
    badge: 'Custom 6-Pack',
    badgeColor: 'bg-peach-50 text-peach-700 border-peach-200',
    accentColor: 'text-peach-600',
    btnBg: 'bg-peach-50 text-peach-700 hover:bg-peach-500 hover:text-white',
    borderHover: 'hover:border-peach-300',
    priceText: '6 Recipe Box',
    link: '/shop?category=custom-box',
    image: '/images/products/furbowl-6-products-lineup.jpg',
    alt: 'FurBowl 6 chef-crafted recipe pouches lineup',
    icon: SlidersHorizontal,
  },
  {
    id: 'meals',
    name: 'Meals',
    tagline: '100% fresh & ready to serve',
    badge: 'Gently Cooked',
    badgeColor: 'bg-teal-50 text-teal-800 border-teal-200',
    accentColor: 'text-teal-600',
    btnBg: 'bg-teal-50 text-teal-800 hover:bg-teal-500 hover:text-white',
    borderHover: 'hover:border-teal-300',
    priceText: '6 Fresh Flavors',
    link: '/shop',
    image: '/images/home/fresh-dog-bowl.jpg',
    alt: 'Fresh gourmet chicken and pumpkin bowl with smiling golden retriever',
    icon: Utensils,
  },
];

export default function ShopByCategorySection() {
  return (
    <section id="categories-section" className="py-14 sm:py-20 bg-white border-b border-plum-900/5">
      <div className="container-main">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <p className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-teal-600 mb-2">
            Curated Feeding Plans
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-plum-900 tracking-tight">
            Shop by Category
          </h2>
          <p className="text-plum-900/70 text-sm sm:text-base leading-relaxed mt-2 font-normal">
            Select the fresh feeding journey that fits your pup&apos;s routine and lifestyle.
          </p>
        </div>

        {/* 4 Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <ScrollReveal key={cat.id} delay={idx * 80} className="h-full">
                <Link
                  href={cat.link}
                  className={`group relative bg-[#fdfbf7] rounded-3xl border border-plum-900/10 shadow-xs hover:shadow-xl ${cat.borderHover} transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 overflow-hidden h-full`}
                >
                  {/* Visual Window */}
                  <div className="relative w-full h-52 sm:h-56 bg-cream-100 overflow-hidden">
                    <Image
                      src={cat.image}
                      alt={cat.alt}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                    {/* Top Badge & Icon Overlay */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                      <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border shadow-xs bg-white/95 backdrop-blur-xs ${cat.badgeColor}`}>
                        {cat.badge}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-white/95 backdrop-blur-xs text-plum-900 flex items-center justify-center shadow-xs">
                        <Icon className={`w-4 h-4 ${cat.accentColor}`} />
                      </div>
                    </div>
                  </div>

                  {/* Simplified Card Content Block */}
                  <div className="p-5 flex-1 flex flex-col justify-between bg-white">
                    <div className="mb-4">
                      {/* Category Title */}
                      <h3 className="text-xl sm:text-2xl font-black text-plum-900 group-hover:text-teal-600 transition-colors leading-tight mb-1">
                        {cat.name}
                      </h3>

                      {/* Short Punchy Tagline */}
                      <p className={`text-xs font-bold ${cat.accentColor} tracking-wide`}>
                        {cat.tagline}
                      </p>
                    </div>

                    {/* Bottom Bar: Price hint & Pill CTA */}
                    <div className="pt-3 border-t border-plum-900/5 flex items-center justify-between">
                      <span className="text-xs font-black text-plum-900">
                        {cat.priceText}
                      </span>
                      <span className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all flex items-center gap-1 shadow-2xs ${cat.btnBg}`}>
                        <span>Explore</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

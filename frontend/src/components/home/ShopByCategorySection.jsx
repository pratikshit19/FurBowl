'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/common/ScrollReveal';

const CATEGORIES = [
  {
    id: 'trial-packs',
    name: 'Trial Packs',
    tagline: 'Test before you trust with real sample pouches',
    packOf: 'Pack of 5',
    discount: '17% OFF',
    isSuperSaver: true,
    price: 499,
    originalPrice: 599,
    link: '/shop?tab=trial-packs',
    image: '/images/products/bundles/furbowl-bundle-all-three.jpg',
    btnText: 'Explore Trial Packs',
  },
  {
    id: 'monthly-packs',
    name: 'Monthly Packs',
    tagline: 'Auto-delivered monthly batches with max savings',
    packOf: 'Pack of 30',
    discount: '25% OFF',
    isSuperSaver: true,
    price: 2699,
    originalPrice: 3599,
    link: '/plans',
    image: '/images/products/bundles/furbowl-bundle-chicken.jpg',
    btnText: 'Explore Monthly Plans',
  },
  {
    id: 'build-your-box',
    name: 'Build Your Own Box',
    tagline: 'Mix & match any 6 chef-crafted recipes',
    packOf: 'Custom 6-Pack',
    discount: '17% OFF',
    isSuperSaver: false,
    price: 579,
    originalPrice: 699,
    link: '/shop?category=custom-box',
    image: '/images/products/bundles/furbowl-bundle-lamb.jpg',
    btnText: 'Build Your Box',
  },
  {
    id: 'meals',
    name: 'Fresh Meals',
    tagline: 'Single-serve vacuum sealed pouches (100% real food)',
    packOf: '5 Recipes',
    discount: 'FRESH',
    isSuperSaver: false,
    price: 189,
    originalPrice: 209,
    link: '/shop?tab=meals',
    image: '/images/products/bundles/furbowl-bundle-paneer.jpg',
    btnText: 'Shop All Meals',
  },
];

export default function ShopByCategorySection() {
  return (
    <section id="categories-section" className="py-12 sm:py-16 bg-white border-b border-plum-900/5">
      <div className="container-main max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="inline-flex items-center text-xs font-black uppercase tracking-widest text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200/60 mb-2">
              <span>Curated Feeding Journeys</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-plum-900 tracking-tight">
              Shop by Category
            </h2>
          </div>

          <Link
            href="/shop"
            className="text-xs sm:text-sm font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1 transition-colors group"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* 4 Category Cards Grid — 2 Columns on Small Screens, 4 on Desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5">
          {CATEGORIES.map((cat, idx) => (
            <ScrollReveal key={cat.id} delay={idx * 70} className="h-full">
              <Link
                href={cat.link}
                className="rounded-xl sm:rounded-2xl bg-white border border-plum-900/10 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group focus:outline-none h-full"
              >
                {/* ─── Upper Image Area ─── */}
                <div className="relative w-full h-[175px] sm:h-[245px] bg-[#faf6ed]/90 flex items-center justify-center overflow-hidden select-none border-b border-plum-900/5">
                  
                  {/* Top-Left Discount Badge — FurBowl Peach */}
                  <div className="absolute top-2 sm:top-2.5 left-2 sm:left-2.5 z-20">
                    <span className="text-[9.5px] sm:text-[11px] font-black tracking-wider text-white bg-peach-500 px-1.5 sm:px-2.5 py-0.5 rounded-[3px] shadow-xs uppercase">
                      {cat.discount}
                    </span>
                  </div>

                  {/* Top-Right SUPER SAVER Ribbon Badge — Amber Gold */}
                  {cat.isSuperSaver && (
                    <div className="absolute top-0 right-2 sm:right-3 z-20">
                      <div className="relative bg-amber-500 text-white text-[7.5px] sm:text-[8.5px] font-black uppercase tracking-wider px-1.5 sm:px-2 pt-1 pb-1.5 sm:pt-1.5 sm:pb-2 shadow-xs text-center flex flex-col items-center leading-none">
                        <span>SUPER</span>
                        <span className="mt-0.5">•SAVER•</span>
                        {/* Ribbon notch cut-out */}
                        <div
                          className="absolute -bottom-1 sm:-bottom-1.5 left-0 right-0 h-1 sm:h-1.5 bg-amber-500"
                          style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Retort Pouch / Product Mockup */}
                  <div className="relative w-full h-full p-2 sm:p-2.5 flex items-center justify-center">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 640px) 180px, 290px"
                      className="object-contain transition-transform duration-300 group-hover:scale-103"
                    />
                  </div>

                  {/* Bottom Center Pack Pill */}
                  <div className="absolute bottom-2 sm:bottom-2.5 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap">
                    <span className="text-[10px] sm:text-xs font-bold text-plum-900 bg-white/95 backdrop-blur-xs px-2.5 sm:px-3.5 py-0.5 rounded-full shadow-xs border border-plum-900/10">
                      {cat.packOf}
                    </span>
                  </div>
                </div>

                {/* ─── Lower Details Area ─── */}
                <div className="p-2.5 sm:p-4 flex flex-col justify-between flex-1 bg-white">
                  <div>
                    {/* Title */}
                    <h3 className="font-bold text-xs sm:text-[14.5px] text-plum-900 group-hover:text-teal-600 transition-colors leading-snug line-clamp-1">
                      {cat.name}
                    </h3>

                    {/* Subtitle / Tagline */}
                    <p className="text-[10.5px] sm:text-xs text-plum-900/60 font-medium mt-0.5 line-clamp-1">
                      {cat.tagline}
                    </p>

                    {/* Price */}
                    <div className="flex items-baseline gap-1.5 sm:gap-2 mt-1.5 sm:mt-2.5 mb-2 sm:mb-3.5">
                      <span className="text-xs sm:text-base font-black text-plum-900">
                        From ₹{cat.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] sm:text-xs text-plum-900/40 line-through">
                        ₹{cat.originalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Action Button — FurBowl Teal */}
                  <div className="w-full py-1.5 sm:py-2.5 rounded-lg text-xs sm:text-sm font-bold bg-[#15aec0] hover:bg-[#0f8e9d] text-white shadow-sm flex items-center justify-center gap-1 sm:gap-1.5 transition-all group-hover:bg-[#0f8e9d]">
                    <span className="line-clamp-1">{cat.btnText}</span>
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform shrink-0" />
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

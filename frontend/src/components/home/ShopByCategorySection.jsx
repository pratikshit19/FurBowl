'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/common/ScrollReveal';

const CATEGORIES = [
  {
    id: 'trial-packs',
    name: 'Trial Packs',
    tagline: '5 delicious recipes. One easy way to discover their favourite.',
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
    tagline: 'Their favourite meals, delivered regularly.',
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
    tagline: 'Pick their favourites and create your own variety pack.',
    packOf: 'Custom 6-Pack',
    discount: '17% OFF',
    isSuperSaver: false,
    price: 579,
    originalPrice: 699,
    link: '/shop?category=custom-box',
    image: '/images/products/bundles/furbowl-bundle-lamb.jpg',
    btnText: 'Build Your Box',
  },
];

export default function ShopByCategorySection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, offsetWidth } = scrollRef.current;
    const card = scrollRef.current.querySelector('[data-category-card]');
    const cardWidth = card ? card.offsetWidth + 16 : offsetWidth * 0.78;
    const index = Math.round(scrollLeft / (cardWidth || 1));
    setActiveIndex(Math.min(Math.max(0, index), CATEGORIES.length - 1));
  };

  return (
    <section id="categories-section" className="py-12 sm:py-16 bg-white border-b border-plum-900/5">
      <div className="container-main max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-7 sm:mb-9 gap-3">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-plum-900 tracking-tight">
              Shop by Category
            </h2>
          </div>

          <Link
            href="/shop"
            className="text-xs sm:text-sm font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1.5 transition-colors group"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Responsive Track: Swipeable Carousel on Mobile, 3-Col Grid on Desktop */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          className="flex sm:grid sm:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 overflow-x-auto sm:overflow-visible pb-4 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth no-scrollbar [&::-webkit-scrollbar]:hidden snap-x snap-mandatory items-stretch scroll-pl-4 sm:scroll-pl-0"
        >
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              data-category-card
              className="w-[78vw] max-w-[290px] sm:max-w-none sm:w-full shrink-0 snap-start flex flex-col"
            >
              <Link
                href={cat.link}
                className="rounded-lg bg-white border border-plum-900/10 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group focus:outline-none flex-1 hover:-translate-y-1"
              >
                {/* ─── Upper Image Area (Proportional & Rich) ─── */}
                <div className="relative w-full h-[195px] sm:h-[225px] lg:h-[235px] shrink-0 bg-gradient-to-b from-[#faf6ed] to-[#f4ede0]/40 flex items-center justify-center overflow-hidden select-none">
                  
                  {/* Top-Left Discount Badge — FurBowl Peach */}
                  <div className="absolute top-2.5 left-2.5 z-20">
                    <span className="text-[10px] sm:text-[11px] font-bold tracking-wider text-white bg-peach-500 px-2 py-0.5 rounded-sm shadow-xs uppercase">
                      {cat.discount}
                    </span>
                  </div>

                  {/* Top-Right SUPER SAVER Ribbon Badge — Amber Gold */}
                  {cat.isSuperSaver && (
                    <div className="absolute top-0 right-3 z-20">
                      <div className="relative bg-amber-500 text-white text-[7.5px] sm:text-[8px] font-bold uppercase tracking-wider px-2 pt-1 pb-1.5 shadow-xs text-center flex flex-col items-center leading-none">
                        <span>SUPER</span>
                        <span className="mt-0.5">•SAVER•</span>
                        {/* Ribbon notch cut-out */}
                        <div
                          className="absolute -bottom-1 left-0 right-0 h-1 bg-amber-500"
                          style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Retort Pouch / Product Mockup */}
                  <div className="relative w-full h-full p-3.5 sm:p-4 flex items-center justify-center">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 640px) 280px, 320px"
                      className="object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Bottom Center Pack Pill */}
                  <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap">
                    <span className="text-[10.5px] sm:text-xs font-semibold text-plum-900 bg-white/95 backdrop-blur-xs px-3 py-0.5 rounded-full shadow-xs border border-plum-900/10">
                      {cat.packOf}
                    </span>
                  </div>
                </div>

                {/* ─── Lower Details Area (Clean, Compact Spacing) ─── */}
                <div className="p-4 sm:p-4.5 lg:p-5 flex flex-col justify-between flex-1 bg-white border-t border-plum-900/5">
                  <div className="space-y-1">
                    {/* Title */}
                    <h3 className="font-bold text-base sm:text-lg text-plum-900 group-hover:text-teal-700 transition-colors leading-snug">
                      {cat.name}
                    </h3>

                    {/* Subtitle / Tagline - Fixed min-height ensures equal height across all cards */}
                    <p className="text-xs sm:text-[13px] text-plum-900/65 font-normal leading-relaxed line-clamp-2 min-h-[36px] sm:min-h-[40px]">
                      {cat.tagline}
                    </p>
                  </div>

                  {/* Price & CTA Grouped Together Without Gap */}
                  <div className="mt-3.5 pt-2.5 border-t border-plum-900/6">
                    <div className="flex items-baseline justify-between mb-2.5">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xs text-plum-900/70 font-medium">From</span>
                        <span className="text-base sm:text-lg font-bold text-plum-900">
                          ₹{cat.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-plum-900/40 line-through font-normal">
                          ₹{cat.originalPrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <span className="text-[10px] sm:text-[10.5px] font-semibold text-teal-700 bg-teal-50 border border-teal-100 px-2 py-0.5 rounded-md">
                        {cat.discount}
                      </span>
                    </div>

                    {/* Action Button */}
                    <div className="w-full py-2.5 rounded-md text-xs sm:text-sm font-semibold bg-[#15aec0] hover:bg-[#0f8e9d] text-white shadow-xs flex items-center justify-center gap-1.5 transition-all group-hover:bg-[#0f8e9d]">
                      <span>{cat.btnText}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform shrink-0" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Mobile Dot Indicators */}
        <div className="flex sm:hidden justify-center items-center gap-1.5 mt-3">
          {CATEGORIES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                if (scrollRef.current) {
                  const card = scrollRef.current.querySelector('[data-category-card]');
                  const cardWidth = card ? card.offsetWidth + 16 : scrollRef.current.offsetWidth * 0.78;
                  scrollRef.current.scrollTo({ left: i * cardWidth, behavior: 'smooth' });
                }
              }}
              aria-label={`Go to category ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === i ? 'w-5 bg-[#15aec0]' : 'w-1.5 bg-[#15aec0]/25'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

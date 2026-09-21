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
    const cardWidth = offsetWidth * 0.78;
    const index = Math.round(scrollLeft / (cardWidth || 1));
    setActiveIndex(Math.min(Math.max(0, index), CATEGORIES.length - 1));
  };

  return (
    <section id="categories-section" className="py-12 sm:py-16 bg-white border-b border-plum-900/5">
      <div className="container-main max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-plum-900 tracking-tight">
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

        {/* Responsive Track: Swipeable Carousel on Mobile, 3-Col Grid on Desktop */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          className="flex sm:grid sm:grid-cols-3 gap-4 sm:gap-6 overflow-x-auto sm:overflow-visible pb-4 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth no-scrollbar [&::-webkit-scrollbar]:hidden snap-x snap-mandatory items-stretch"
        >
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="w-[78vw] max-w-[290px] sm:w-auto shrink-0 snap-start h-full"
            >
              <Link
                href={cat.link}
                className="rounded-xl bg-white border border-plum-900/10 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group focus:outline-none h-full hover:-translate-y-1"
              >
                {/* ─── Upper Image Area (Portrait Height) ─── */}
                <div className="relative w-full h-[200px] sm:h-[290px] bg-[#faf6ed]/90 flex items-center justify-center overflow-hidden select-none border-b border-plum-900/5">
                  
                  {/* Top-Left Discount Badge — FurBowl Peach */}
                  <div className="absolute top-2.5 left-2.5 z-20">
                    <span className="text-[10px] sm:text-[11px] font-bold tracking-wider text-white bg-peach-500 px-2 sm:px-2.5 py-0.5 rounded-[3px] shadow-xs uppercase">
                      {cat.discount}
                    </span>
                  </div>

                  {/* Top-Right SUPER SAVER Ribbon Badge — Amber Gold */}
                  {cat.isSuperSaver && (
                    <div className="absolute top-0 right-2.5 sm:right-3 z-20">
                      <div className="relative bg-amber-500 text-white text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider px-1.5 sm:px-2 pt-1 pb-1.5 sm:pt-1.5 sm:pb-2 shadow-xs text-center flex flex-col items-center leading-none">
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
                  <div className="relative w-full h-full p-3 sm:p-4 flex items-center justify-center">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 640px) 290px, 340px"
                      className="object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Bottom Center Pack Pill */}
                  <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap">
                    <span className="text-[10.5px] sm:text-xs font-bold text-plum-900 bg-white/95 backdrop-blur-xs px-3 sm:px-3.5 py-0.5 rounded-full shadow-xs border border-plum-900/10">
                      {cat.packOf}
                    </span>
                  </div>
                </div>

                {/* ─── Lower Details Area ─── */}
                <div className="p-3.5 sm:px-5 sm:pt-4 sm:pb-4 flex flex-col justify-between flex-1 bg-white">
                  <div>
                    {/* Title */}
                    <h3 className="font-bold text-sm sm:text-base text-plum-900 group-hover:text-teal-600 transition-colors leading-snug line-clamp-1">
                      {cat.name}
                    </h3>

                    {/* Subtitle / Tagline */}
                    <p className="text-[11px] sm:text-xs text-plum-900/60 font-medium mt-1 line-clamp-2 min-h-[2rem] sm:min-h-[2.25rem]">
                      {cat.tagline}
                    </p>

                    {/* Price */}
                    <div className="flex items-baseline gap-1.5 sm:gap-2 mt-2 sm:mt-2.5 mb-2.5 sm:mb-3">
                      <span className="text-sm sm:text-base font-bold text-plum-900">
                        From ₹{cat.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-plum-900/40 line-through">
                        ₹{cat.originalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Action Button — FurBowl Teal */}
                  <div className="w-full py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-bold bg-[#15aec0] hover:bg-[#0f8e9d] text-white shadow-sm flex items-center justify-center gap-1 sm:gap-1.5 transition-all group-hover:bg-[#0f8e9d]">
                    <span className="line-clamp-1">{cat.btnText}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform shrink-0" />
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
                  const cardWidth = scrollRef.current.offsetWidth * 0.78;
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

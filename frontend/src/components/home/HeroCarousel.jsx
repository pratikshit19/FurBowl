'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const DEFAULT_BANNERS = [
  {
    id: '1',
    title: 'Real Food. Happy Pets. Better Lives.',
    subtitle: 'Fresh, ready-to-eat meals made with 100% human-grade ingredients your dog will love.',
    ctaText: 'Shop Now',
    ctaLink: '/shop',
    bgClass: 'bg-[#faf6ed]',
    dogImage: '/images/products.png',
    dogAlt: 'FurBowl Product Lineup - Real fresh food for dogs',
    badge: '100% Human-Grade Ingredients',
    isProductLineup: true,
  },
  {
    id: '2',
    title: 'Nourishing Pets, Naturally.',
    subtitle: 'Take our 1-minute nutrition quiz and discover the ideal FurBowl recipe for your fur baby.',
    ctaText: 'Take the Quiz',
    ctaLink: '/find-food',
    bgClass: 'bg-[#faf6ed]',
    dogImage: '/images/dog1.jpg',
    dogAlt: 'Happy dog enjoying FurBowl meals',
    badge: 'Tailored Dog Nutrition',
    isProductLineup: false,
  },
  {
    id: '3',
    title: 'No Fillers. No Preservatives.',
    subtitle: "Real meat, fresh vegetables, and natural superfoods — cooked fresh with love for happy tails.",
    ctaText: 'Why FurBowl',
    ctaLink: '/why-furbowl',
    bgClass: 'bg-[#faf6ed]',
    dogImage: '/images/dog2.jpg',
    dogAlt: 'Golden puppy enjoying fresh food',
    badge: 'Zero Artificial Additives',
    isProductLineup: false,
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const banners = DEFAULT_BANNERS;

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % banners.length);
  }, [banners.length]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + banners.length) % banners.length);
  }, [banners.length]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next, paused]);

  return (
    <section
      className="relative overflow-hidden bg-[#faf6ed]"
      aria-label="Featured promotions carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
        aria-live="polite"
        aria-atomic="true"
      >
        {banners.map((banner, i) => (
          <div
            key={banner.id}
            className="w-full flex-shrink-0"
            aria-hidden={i !== current}
          >
            <div className={`${banner.bgClass} min-h-[480px] sm:min-h-[520px] md:min-h-[560px] lg:min-h-[600px] flex items-end relative overflow-hidden`}>
              <div className="container-main w-full pt-10 sm:pt-14 md:pt-16 pb-0 relative z-10">
                <div className="grid lg:grid-cols-12 gap-8 items-end">
                  
                  {/* Left Column — Banner Typography */}
                  <div className="lg:col-span-6 text-center lg:text-left pb-12 sm:pb-16 lg:pb-24">
                    <span className="inline-flex items-center gap-1.5 bg-butter-300/40 text-plum-900 text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5 border border-plum-900/15">
                      <svg className="w-3.5 h-3.5 text-coral-500 fill-current" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                      {banner.badge}
                    </span>
                    
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-plum-900 leading-[1.1] mb-5 tracking-tight">
                      {banner.title}
                    </h1>

                    <p className="text-base sm:text-lg text-plum-900/80 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0 font-medium">
                      {banner.subtitle}
                    </p>

                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                      <Link
                        href={banner.ctaLink}
                        className="inline-flex items-center gap-2.5 bg-coral-500 hover:bg-coral-600 text-white px-8 py-4 rounded-full font-extrabold text-sm transition-all shadow-lg hover:shadow-coral-500/25 active:scale-95"
                      >
                        {banner.ctaText}
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </Link>

                      <Link
                        href="/shop"
                        className="inline-flex items-center gap-2 border-2 border-plum-900 text-plum-900 hover:bg-plum-900 hover:text-white px-7 py-3.5 rounded-full font-extrabold text-sm transition-all"
                      >
                        View Menu
                      </Link>
                    </div>

                    {/* Trust Indicators */}
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mt-8 pt-6 border-t border-plum-900/10 text-xs font-bold text-plum-900/70">
                      <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-coral-500 fill-current" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                        Natural Ingredients
                      </span>
                      <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-coral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        Vet Approved
                      </span>
                      <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-coral-500 fill-current" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                        </svg>
                        No Fillers
                      </span>
                    </div>

                  </div>

                  {/* Right Column — Organic Butter Yellow Arch + Image sitting on floor */}
                  <div className="lg:col-span-6 flex justify-center lg:justify-end items-end z-10 relative self-end h-[360px] sm:h-[440px] md:h-[500px] lg:h-[540px]">
                    
                    {/* Butter Yellow Organic Backdrop Arch (from reference design) */}
                    <div className="absolute bottom-0 w-[300px] sm:w-[380px] md:w-[440px] lg:w-[480px] h-[300px] sm:h-[380px] md:h-[440px] lg:h-[480px] bg-[#fbe285] rounded-t-[160px] sm:rounded-t-[200px] md:rounded-t-[240px] z-0 shadow-inner" />

                    {banner.isProductLineup ? (
                      <div className="relative w-full max-w-[560px] lg:max-w-[620px] h-[320px] sm:h-[400px] md:h-[460px] lg:h-[500px] flex items-end z-10 transition-transform hover:scale-[1.02] duration-500">
                        <Image
                          src={banner.dogImage}
                          alt={banner.dogAlt}
                          fill
                          priority={i === 0}
                          className="object-contain object-bottom filter drop-shadow-[0_20px_25px_rgba(62,25,47,0.25)]"
                          sizes="(max-width: 1024px) 100vw, 620px"
                        />
                      </div>
                    ) : (
                      <div className="relative w-[280px] sm:w-[340px] md:w-[380px] h-[320px] sm:h-[380px] md:h-[440px] rounded-t-[140px] sm:rounded-t-[180px] overflow-hidden shadow-2xl z-10 transition-transform hover:scale-[1.02] duration-500">
                        <Image
                          src={banner.dogImage}
                          alt={banner.dogAlt}
                          fill
                          priority={i === 0}
                          className="object-cover object-center"
                          sizes="(max-width: 768px) 340px, 380px"
                        />
                      </div>
                    )}

                  </div>

                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Carousel Navigation Controls — Arrows only */}
      {banners.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-11 h-11 rounded-full bg-plum-900/10 text-plum-900 hover:bg-plum-900 hover:text-white transition-all backdrop-blur-sm border border-plum-900/20 shadow-md"
            aria-label="Previous slide"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-11 h-11 rounded-full bg-plum-900/10 text-plum-900 hover:bg-plum-900 hover:text-white transition-all backdrop-blur-sm border border-plum-900/20 shadow-md"
            aria-label="Next slide"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </>
      )}
    </section>
  );
}

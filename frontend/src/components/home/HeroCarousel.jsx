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
    id: 'welcome-offer',
    isCustomOffer: true,
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
            {banner.isCustomOffer ? (
              /* Exact Original Coral Welcome Offer Card */
              <div className="bg-[#faf6ed] min-h-[calc(100vh-145px)] flex items-center justify-center relative overflow-hidden py-6 sm:py-8">
                <div className="container-main w-full">
                  <div className="relative rounded-3xl bg-coral-500 text-white p-6 sm:p-10 md:p-12 overflow-hidden shadow-2xl">
                    {/* Ambient Glow */}
                    <div className="absolute -right-12 -top-12 w-64 h-64 bg-butter-300/20 rounded-full blur-2xl pointer-events-none" />

                    <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
                      
                      {/* Left Offer Text */}
                      <div className="lg:col-span-7 text-center lg:text-left space-y-4 sm:space-y-5">
                        <span className="inline-flex items-center gap-1.5 bg-butter-300 text-plum-900 text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-sm">
                          <svg className="w-4 h-4 text-plum-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H4.5A1.5 1.5 0 013 19.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625A2.625 2.625 0 1114.625 7.5H12m0-2.625V7.5m-9 3h18v3H3v-3z" />
                          </svg>
                          Welcome Offer
                        </span>

                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.15]">
                          Get 10% OFF on Your First Order!
                        </h2>

                        <p className="text-white/90 text-sm sm:text-base md:text-lg max-w-lg leading-relaxed font-medium">
                          Because every new furry friend deserves a warm, fresh, and nutritious welcome. Use code <span className="font-extrabold text-butter-300 underline underline-offset-4 decoration-2">FIRST10</span> at checkout.
                        </p>

                        <div className="pt-2">
                          <Link
                            href="/shop"
                            className="inline-flex items-center gap-2.5 bg-butter-300 hover:bg-butter-400 text-plum-900 px-8 py-3.5 rounded-xl font-extrabold text-sm sm:text-base transition-all shadow-lg active:scale-95"
                          >
                            Shop Now &amp; Save
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                          </Link>
                        </div>
                      </div>

                      {/* Right Dog Photo */}
                      <div className="lg:col-span-5 flex justify-center lg:justify-end items-center relative py-4 lg:py-0">
                        <div className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full bg-butter-300 flex items-center justify-center relative overflow-hidden shadow-2xl border-4 border-white/30 transition-transform hover:scale-105 duration-300">
                          <Image
                            src="/images/dog1.jpg"
                            alt="Happy dog enjoying FurBowl fresh food"
                            fill
                            className="object-cover"
                            sizes="288px"
                          />
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className={`${banner.bgClass} min-h-[calc(100vh-145px)] flex items-end relative overflow-hidden`}>
                <div className="container-main w-full pt-4 sm:pt-6 md:pt-8 pb-0 relative z-10">
                  <div className="grid lg:grid-cols-12 gap-8 items-end">
                    
                    {/* Left Column — Banner Typography */}
                    <div className="lg:col-span-6 text-center lg:text-left pb-8 sm:pb-12 lg:pb-16">
                      <span className="inline-flex items-center gap-1.5 bg-butter-300/40 text-plum-900 text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-xl mb-4 border border-plum-900/15">
                        {banner.badgeIcon === 'gift' ? (
                          <svg className="w-3.5 h-3.5 text-coral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H4.5A1.5 1.5 0 013 19.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625A2.625 2.625 0 1114.625 7.5H12m0-2.625V7.5m-9 3h18v3H3v-3z" />
                          </svg>
                        ) : (
                          <svg className="w-3.5 h-3.5 text-coral-500 fill-current" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                          </svg>
                        )}
                        {banner.badge}
                      </span>
                      
                      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-plum-900 leading-[1.1] mb-5 tracking-tight">
                        {banner.title}
                      </h1>

                      <p className="text-base sm:text-lg text-plum-900/80 leading-relaxed mb-6 max-w-xl mx-auto lg:mx-0 font-medium">
                        {banner.subtitle}
                      </p>

                      {banner.promoCode && (
                        <div className="mb-6 inline-flex items-center gap-2 bg-white/90 border border-plum-900/15 px-4 py-2 rounded-2xl shadow-sm text-sm text-plum-900 font-medium">
                          <span>Use code</span>
                          <span className="bg-butter-300 text-plum-900 px-3 py-1 rounded-xl font-extrabold text-xs tracking-wider border border-plum-900/20 uppercase shadow-inner">
                            {banner.promoCode}
                          </span>
                          <span>at checkout</span>
                        </div>
                      )}

                      <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                        <Link
                          href={banner.ctaLink}
                          className="inline-flex items-center gap-2.5 bg-coral-500 hover:bg-coral-600 text-white px-8 py-3.5 rounded-xl font-extrabold text-sm transition-all shadow-lg hover:shadow-coral-500/25 active:scale-95"
                        >
                          {banner.ctaText}
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </svg>
                        </Link>

                        <Link
                          href="/shop"
                          className="inline-flex items-center gap-2 border border-plum-900/30 text-plum-900 hover:bg-plum-900 hover:text-white px-7 py-3 rounded-xl font-extrabold text-sm transition-all"
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
                    <div className="lg:col-span-6 flex justify-center lg:justify-end items-end z-10 relative self-end h-[340px] sm:h-[420px] md:h-[480px] lg:h-[calc(100vh-200px)] max-h-[540px]">
                      
                      {/* Butter Yellow Organic Backdrop Arch (from reference design) */}
                      <div className="absolute bottom-0 w-[280px] sm:w-[360px] md:w-[420px] lg:w-[480px] h-[280px] sm:h-[360px] md:h-[420px] lg:h-[calc(100vh-240px)] max-h-[480px] bg-[#fbe285] rounded-t-[140px] sm:rounded-t-[190px] md:rounded-t-[240px] z-0 shadow-inner" />

                      {banner.isProductLineup ? (
                        <div className="relative w-full max-w-[500px] lg:max-w-[600px] h-[300px] sm:h-[380px] md:h-[440px] lg:h-[calc(100vh-220px)] max-h-[500px] flex items-end z-10 transition-transform hover:scale-[1.02] duration-500">
                          <Image
                            src={banner.dogImage}
                            alt={banner.dogAlt}
                            fill
                            priority={i === 0}
                            className="object-contain object-bottom filter drop-shadow-[0_20px_25px_rgba(62,25,47,0.25)]"
                            sizes="(max-width: 1024px) 100vw, 600px"
                          />
                        </div>
                      ) : (
                        <div className="relative w-[260px] sm:w-[320px] md:w-[370px] h-[300px] sm:h-[360px] md:h-[420px] lg:h-[calc(100vh-240px)] max-h-[460px] rounded-t-[130px] sm:rounded-t-[170px] overflow-hidden shadow-2xl z-10 transition-transform hover:scale-[1.02] duration-500">
                          <Image
                            src={banner.dogImage}
                            alt={banner.dogAlt}
                            fill
                            priority={i === 0}
                            className="object-cover object-center"
                            sizes="(max-width: 768px) 320px, 370px"
                          />
                        </div>
                      )}

                    </div>

                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Carousel Navigation Controls — Arrows & Indicator Dots */}
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

          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  idx === current
                    ? 'w-8 bg-coral-500'
                    : 'w-2.5 bg-plum-900/20 hover:bg-plum-900/40'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronLeft,
  ChevronRight,
  Utensils,
  ShieldCheck,
  Scale,
  Heart,
  Award,
  CheckCircle2,
  Leaf,
  FlaskConical,
  WheatOff,
  Flame,
} from 'lucide-react';
import SpinWheelSlide from './SpinWheelSlide';

const DEFAULT_BANNERS = [
  {
    id: 'carousel-2',
    image: '/images/carousel_2_3to1.png',
    imageMobile: '/images/carousel_2.png',
    alt: 'FurBowl — Can\'t Pick Just One? Let them try them all. Try the trial pack.',
    link: '/shop',
  },
  {
    id: 'carousel-3',
    image: '/images/carousel_3_3to1.png',
    imageMobile: '/images/carousel_3.png',
    alt: 'FurBowl — A Meal for Every Mood. Discover their next favourite.',
    link: '/shop',
  },
  {
    id: 'carousel-1',
    image: '/images/carousel_1_3to1.png',
    imageMobile: '/images/carousel_1.png',
    alt: 'FurBowl — 100% Natural, 0% Compromise. Shop fresh dog food now.',
    link: '/shop',
  },
  {
    id: 'spin-discount-wheel',
    type: 'wheel',
  }

];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isWheelSpinning, setIsWheelSpinning] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [trustFlipped, setTrustFlipped] = useState(false);
  const banners = DEFAULT_BANNERS;

  // Auto-flip trust card every 3.6 seconds between the two guarantees
  useEffect(() => {
    const flipTimer = setInterval(() => {
      setTrustFlipped((prev) => !prev);
    }, 3600);
    return () => clearInterval(flipTimer);
  }, []);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % banners.length);
  }, [banners.length]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + banners.length) % banners.length);
  }, [banners.length]);

  useEffect(() => {
    // Keep rotating continuously in a loop; only pause when hovered or when user is actively spinning the wheel
    if (paused || isWheelSpinning) return;
    const id = setInterval(next, 5500);
    return () => clearInterval(id);
  }, [next, paused, isWheelSpinning]);

  const minSwipeDistance = 50;

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setPaused(true);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    setPaused(false);
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) next();
    if (isRightSwipe) prev();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  };

  return (
    <div className="w-full">
      {/* Interactive Carousel Section — 16:9 on mobile/small screens, 3:1 on desktop */}
      <section
        className="relative overflow-hidden bg-butter-50/50 w-full select-none aspect-[16/9] md:aspect-[3/1] focus:outline-none"
        aria-label="Featured promotions carousel"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onKeyDown={handleKeyDown}
      >
        {/* Slides — each absolutely positioned, slide in/out via translateX */}
        {banners.map((banner, i) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-transform duration-700 ease-in-out ${i !== current ? 'pointer-events-none' : ''
              }`}
            style={{ transform: `translateX(${(i - current) * 100}%)` }}
            aria-hidden={i !== current}
          >
            {banner.type === 'wheel' ? (
              <SpinWheelSlide
                onSpinStateChange={(spinning) => setIsWheelSpinning(spinning)}
              />
            ) : (
              <Link
                href={banner.link}
                className="block w-full h-full group focus:outline-none relative"
                tabIndex={i === current ? 0 : -1}
              >
                {banner.imageMobile ? (
                  <>
                    {/* Small screens: 16:9 version */}
                    <Image
                      src={banner.imageMobile}
                      alt={banner.alt}
                      fill
                      priority={i === 0}
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.01] block md:hidden"
                      sizes="100vw"
                    />
                    {/* Desktop/larger screens: 3:1 version */}
                    <Image
                      src={banner.image}
                      alt={banner.alt}
                      fill
                      priority={i === 0}
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.01] hidden md:block"
                      sizes="100vw"
                    />
                  </>
                ) : (
                  <Image
                    src={banner.image}
                    alt={banner.alt}
                    fill
                    priority={i === 0}
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.01]"
                    sizes="100vw"
                  />
                )}
              </Link>
            )}
          </div>
        ))}

        {/* Carousel Navigation Arrows */}
        {banners.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-white/85 hover:bg-white text-plum-900 transition-all backdrop-blur-md border border-plum-900/10 shadow-md hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-plum-900" />
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-white/85 hover:bg-white text-plum-900 transition-all backdrop-blur-md border border-plum-900/10 shadow-md hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-plum-900" />
            </button>

          </>
        )}
      </section>

      {/* 3D Flipping Trust Anchor Section — Peach Section Background */}
      <section className="relative z-10 w-full bg-peach-100/80 border-y border-peach-200/80 py-5 sm:py-7 px-3 sm:px-6 lg:px-8">
        <div
          className="max-w-7xl mx-auto cursor-pointer group"
          style={{ perspective: '1200px' }}
          onClick={() => setTrustFlipped((prev) => !prev)}
          title="Click to flip"
        >
          <div
            className="relative w-full transition-transform duration-700 ease-in-out"
            style={{
              transformStyle: 'preserve-3d',
              transform: trustFlipped ? 'rotateX(180deg)' : 'rotateX(0deg)',
            }}
          >
            {/* ─── SIDE 1 (FRONT): NO PRESERVATIVES / 0% FILLERS ─── */}
            <div
              className="relative overflow-hidden w-full bg-gradient-to-br from-[#f2fbfb] via-white to-[#fff6f2] rounded-xl sm:rounded-2xl border border-teal-500/25 shadow-md shadow-teal-500/5 p-4 sm:py-4.5 sm:px-6 flex flex-col items-center justify-center text-center select-none transition-all hover:shadow-lg hover:border-teal-500/40"
              style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
            >
              {/* Decorative paw print watermarks in background */}
              <div className="absolute -left-3 -bottom-3 text-teal-900/[0.05] pointer-events-none transform -rotate-12 select-none">
                <svg className="w-20 h-20" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="8" cy="8" r="2" />
                  <circle cx="16" cy="8" r="2" />
                  <circle cx="4.5" cy="12" r="1.7" />
                  <circle cx="19.5" cy="12" r="1.7" />
                  <path d="M12 11.5c-3.2 0-5 2.2-5 4.8 0 2.2 1.6 3.7 5 3.7s5-1.5 5-3.7c0-2.6-1.8-4.8-5-4.8z" />
                </svg>
              </div>
              <div className="absolute -right-3 -top-3 text-peach-900/[0.05] pointer-events-none transform rotate-12 select-none">
                <svg className="w-20 h-20" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="8" cy="8" r="2" />
                  <circle cx="16" cy="8" r="2" />
                  <circle cx="4.5" cy="12" r="1.7" />
                  <circle cx="19.5" cy="12" r="1.7" />
                  <path d="M12 11.5c-3.2 0-5 2.2-5 4.8 0 2.2 1.6 3.7 5 3.7s5-1.5 5-3.7c0-2.6-1.8-4.8-5-4.8z" />
                </svg>
              </div>

              {/* Top Trust Category Badge */}
              <div className="relative z-10 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-800 text-[10.5px] sm:text-xs font-bold uppercase tracking-wider mb-1.5 shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-600 stroke-[2.5]" />
                <span>FurBowl Purity Standard</span>
              </div>

              {/* Headings */}
              <div className="relative z-10">
                <span className="font-serif font-bold text-lg sm:text-2xl text-plum-900 tracking-tight leading-tight uppercase block">
                  NO PRESERVATIVES.
                </span>
                <span className="font-serif font-bold text-lg sm:text-2xl text-peach-600 tracking-tight leading-tight uppercase block mt-0.5">
                  0% FILLERS.
                </span>
              </div>

              {/* 4 Guarantee Chips */}
              <div className="relative z-10 mt-2.5 pt-2 border-t border-teal-900/10 w-full flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/90 border border-teal-500/20 text-[11px] sm:text-xs font-bold text-teal-900 shadow-2xs">
                  <Leaf className="w-3 h-3 text-teal-600 shrink-0" />
                  <span>Non-GMO</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/90 border border-teal-500/20 text-[11px] sm:text-xs font-bold text-teal-900 shadow-2xs">
                  <FlaskConical className="w-3 h-3 text-teal-600 shrink-0" />
                  <span>Lab Tested</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/90 border border-teal-500/20 text-[11px] sm:text-xs font-bold text-teal-900 shadow-2xs">
                  <WheatOff className="w-3 h-3 text-teal-600 shrink-0" />
                  <span>Grain Free</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/90 border border-teal-500/20 text-[11px] sm:text-xs font-bold text-teal-900 shadow-2xs">
                  <Flame className="w-3 h-3 text-peach-600 shrink-0" />
                  <span>Small Batches</span>
                </span>
              </div>
            </div>

            {/* ─── SIDE 2 (BACK): HUMAN-GRADE INGREDIENTS / VET-FORMULATED ─── */}
            <div
              className="absolute inset-0 overflow-hidden w-full h-full bg-gradient-to-br from-[#fff6f2] via-white to-[#f2fbfb] rounded-xl sm:rounded-2xl border border-peach-500/25 shadow-md shadow-peach-500/5 p-4 sm:py-4.5 sm:px-6 flex flex-col items-center justify-center text-center select-none transition-all hover:shadow-lg hover:border-peach-500/40"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateX(180deg)',
              }}
            >
              {/* Decorative paw print watermarks in background */}
              <div className="absolute -left-3 -bottom-3 text-peach-900/[0.05] pointer-events-none transform -rotate-12 select-none">
                <svg className="w-20 h-20" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="8" cy="8" r="2" />
                  <circle cx="16" cy="8" r="2" />
                  <circle cx="4.5" cy="12" r="1.7" />
                  <circle cx="19.5" cy="12" r="1.7" />
                  <path d="M12 11.5c-3.2 0-5 2.2-5 4.8 0 2.2 1.6 3.7 5 3.7s5-1.5 5-3.7c0-2.6-1.8-4.8-5-4.8z" />
                </svg>
              </div>
              <div className="absolute -right-3 -top-3 text-teal-900/[0.05] pointer-events-none transform rotate-12 select-none">
                <svg className="w-20 h-20" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="8" cy="8" r="2" />
                  <circle cx="16" cy="8" r="2" />
                  <circle cx="4.5" cy="12" r="1.7" />
                  <circle cx="19.5" cy="12" r="1.7" />
                  <path d="M12 11.5c-3.2 0-5 2.2-5 4.8 0 2.2 1.6 3.7 5 3.7s5-1.5 5-3.7c0-2.6-1.8-4.8-5-4.8z" />
                </svg>
              </div>

              {/* Top Trust Category Badge */}
              <div className="relative z-10 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-peach-500/10 border border-peach-500/20 text-peach-800 text-[10.5px] sm:text-xs font-bold uppercase tracking-wider mb-1.5 shadow-2xs">
                <Award className="w-3.5 h-3.5 text-peach-600 stroke-[2.5]" />
                <span>Veterinary Certified</span>
              </div>

              {/* Headings */}
              <div className="relative z-10">
                <h4 className="font-serif font-bold text-lg sm:text-2xl text-teal-900 tracking-tight leading-tight uppercase">
                  HUMAN-GRADE INGREDIENTS.
                </h4>
                <h4 className="font-serif font-bold text-lg sm:text-2xl text-plum-900 tracking-tight leading-tight uppercase mt-0.5">
                  VET-FORMULATED &amp; BALANCED.
                </h4>
              </div>

              {/* 4 Guarantee Chips */}
              <div className="relative z-10 mt-2.5 pt-2 border-t border-peach-900/10 w-full flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/90 border border-peach-500/20 text-[11px] sm:text-xs font-bold text-plum-900 shadow-2xs">
                  <Utensils className="w-3 h-3 text-peach-600 shrink-0" />
                  <span>100% Real Whole Meat</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/90 border border-peach-500/20 text-[11px] sm:text-xs font-bold text-plum-900 shadow-2xs">
                  <CheckCircle2 className="w-3 h-3 text-teal-600 shrink-0" />
                  <span>AAFCO &amp; FEDIAF</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/90 border border-peach-500/20 text-[11px] sm:text-xs font-bold text-plum-900 shadow-2xs">
                  <Leaf className="w-3 h-3 text-teal-600 shrink-0" />
                  <span>Fresh Farm Veggies</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/90 border border-peach-500/20 text-[11px] sm:text-xs font-bold text-plum-900 shadow-2xs">
                  <Flame className="w-3 h-3 text-peach-600 shrink-0" />
                  <span>Fresh Daily Cook</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

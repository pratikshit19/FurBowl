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
} from 'lucide-react';

const DEFAULT_BANNERS = [
  {
    id: 'creative-2',
    image: '/images/creative-2.png',
    alt: 'FurBowl — More Than Just Food. Power Their Play. Active, happy, thriving pets.',
    link: '/shop',
  },
  {
    id: 'creative-3',
    image: '/images/creative-3.png',
    alt: 'FurBowl — Start Their Human-Grade Journey Today. Introductory Bundle ₹499 for all 5.',
    link: '/shop',
  },
  {
    id: 'creative-4',
    image: '/images/creative-4.png',
    alt: 'FurBowl — A Complete, Nutritious, and Varied Diet. Five unique chef-crafted recipes.',
    link: '/shop',
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
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
      {/* Interactive Carousel Section */}
      <section
        className="relative overflow-hidden bg-butter-50/50 w-full select-none"
        aria-label="Featured promotions carousel"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {/* Slides Track */}
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
              <Link
                href={banner.link}
                className="block w-full relative group focus:outline-none"
                tabIndex={i === current ? 0 : -1}
              >
                <div className="relative w-full aspect-[16/9] sm:aspect-[1.84/1] max-h-[720px] overflow-hidden bg-butter-100/40">
                  <Image
                    src={banner.image}
                    alt={banner.alt}
                    fill
                    priority={i === 0}
                    className="object-cover object-center w-full h-full transition-transform duration-700 group-hover:scale-[1.01]"
                    sizes="100vw"
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Carousel Navigation Arrows */}
        {banners.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/85 hover:bg-white text-plum-900 transition-all backdrop-blur-md border border-plum-900/10 shadow-lg hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-furbowl-cyan"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-plum-900" />
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/85 hover:bg-white text-plum-900 transition-all backdrop-blur-md border border-plum-900/10 shadow-lg hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-furbowl-cyan"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-plum-900" />
            </button>

            {/* Slide Indicator Pills */}
            <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-plum-900/30 px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-sm">
              {banners.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrent(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    idx === current
                      ? 'w-7 bg-furbowl-cyan shadow-sm'
                      : 'w-2.5 bg-white/70 hover:bg-white'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </section>

      {/* Trust & Quality Anchor Bar */}
      <div className="bg-[#faf6ed] border-b border-plum-900/10 py-4 sm:py-5 shadow-xs">
        <div className="container-main">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-y md:divide-y-0 md:divide-x divide-plum-900/10">
            {/* 1. Human Grade (Teal) */}
            <div className="flex items-center gap-3 pt-2 md:pt-0 md:px-4 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-full bg-teal-100/70 text-teal-600 flex items-center justify-center shrink-0">
                <Utensils className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-plum-900 leading-tight">Human Grade</h4>
                <p className="text-[11px] text-plum-900/60 font-normal">Real whole meats</p>
              </div>
            </div>

            {/* 2. No Preservatives (Peach) */}
            <div className="flex items-center gap-3 pt-2 md:pt-0 md:px-4 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-full bg-peach-100/70 text-peach-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-peach-600" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-plum-900 leading-tight">No Preservatives</h4>
                <p className="text-[11px] text-plum-900/60 font-normal">Zero additives</p>
              </div>
            </div>

            {/* 3. Complete & Balanced (Teal) */}
            <div className="flex items-center gap-3 pt-2 md:pt-0 md:px-4 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-full bg-teal-100/70 text-teal-600 flex items-center justify-center shrink-0">
                <Scale className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-plum-900 leading-tight">Complete &amp; Balanced</h4>
                <p className="text-[11px] text-plum-900/60 font-normal">Vet approved recipes</p>
              </div>
            </div>

            {/* 4. Made for Real Dogs (Peach) */}
            <div className="flex items-center gap-3 pt-2 md:pt-0 md:px-4 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-full bg-peach-100/70 text-peach-600 flex items-center justify-center shrink-0">
                <Heart className="w-5 h-5 text-peach-600" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-plum-900 leading-tight">Made for Real Dogs</h4>
                <p className="text-[11px] text-plum-900/60 font-normal">Happy tummies daily</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

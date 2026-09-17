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
import SpinWheelSlide from './SpinWheelSlide';

const DEFAULT_BANNERS = [
  {
    id: 'carousel-1',
    image: '/images/carousel_1_3to1.png',
    alt: 'FurBowl — 100% Natural, 0% Compromise. Shop fresh dog food now.',
    link: '/shop',
  },
  {
    id: 'spin-discount-wheel',
    type: 'wheel',
  },
  {
    id: 'carousel-2',
    image: '/images/carousel_2_3to1.png',
    alt: 'FurBowl — Can\'t Pick Just One? Let them try them all. Try the trial pack.',
    link: '/shop',
  },
  {
    id: 'carousel-3',
    image: '/images/carousel_3_3to1.png',
    alt: 'FurBowl — A Meal for Every Mood. Discover their next favourite.',
    link: '/shop',
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isWheelSpinning, setIsWheelSpinning] = useState(false);
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
    // Pause auto-rotation when hovered, when wheel is spinning, or when currently on wheel slide
    if (paused || isWheelSpinning || banners[current]?.type === 'wheel') return;
    const id = setInterval(next, 5500);
    return () => clearInterval(id);
  }, [next, paused, isWheelSpinning, current]);

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
      {/* Interactive Carousel Section — 3:1 Aspect Ratio Banner */}
      <section
        className="relative overflow-hidden bg-butter-50/50 w-full select-none"
        style={{ aspectRatio: '3/1', minHeight: '220px' }}
        aria-label="Featured promotions carousel"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {/* Slides — each absolutely positioned, slide in/out via translateX */}
        {banners.map((banner, i) => (
          <div
            key={banner.id}
            className="absolute inset-0 transition-transform duration-700 ease-in-out"
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
                className="block w-full h-full group focus:outline-none"
                tabIndex={i === current ? 0 : -1}
              >
                <Image
                  src={banner.image}
                  alt={banner.alt}
                  fill
                  priority={i === 0}
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.01]"
                  sizes="100vw"
                />
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
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/85 hover:bg-white text-plum-900 transition-all backdrop-blur-md border border-plum-900/10 shadow-lg hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-plum-900" />
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/85 hover:bg-white text-plum-900 transition-all backdrop-blur-md border border-plum-900/10 shadow-lg hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
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
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === current
                      ? 'w-7 bg-[#15aec0] shadow-sm'
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

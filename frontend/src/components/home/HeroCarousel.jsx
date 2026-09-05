'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const DEFAULT_BANNERS = [
  {
    id: 'creative-2',
    image: '/images/creative-2.png',
    alt: 'FurBowl Creative Banner 1',
    link: '/shop',
  },
  {
    id: 'creative-3',
    image: '/images/creative-3.png',
    alt: 'FurBowl Creative Banner 2',
    link: '/shop',
  },
  {
    id: 'creative-4',
    image: '/images/creative-4.png',
    alt: 'FurBowl Creative Banner 3',
    link: '/shop',
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
      className="relative overflow-hidden bg-white w-full"
      aria-label="Featured promotions carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides Container */}
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
            <Link href={banner.link} className="block w-full relative group">
              <div className="relative w-full h-[320px] xs:h-[380px] sm:h-[460px] md:h-[540px] lg:h-[620px] xl:h-[680px] overflow-hidden">
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

      {/* Carousel Navigation Controls — Arrows & Indicator Dots */}
      {banners.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-plum-900/30 hover:bg-plum-900/60 text-white transition-all backdrop-blur-md border border-white/20 shadow-lg"
            aria-label="Previous slide"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-plum-900/30 hover:bg-plum-900/60 text-white transition-all backdrop-blur-md border border-white/20 shadow-lg"
            aria-label="Next slide"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  idx === current
                    ? 'w-8 bg-coral-500 shadow-md'
                    : 'w-2.5 bg-white/60 hover:bg-white backdrop-blur-xs shadow-xs'
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

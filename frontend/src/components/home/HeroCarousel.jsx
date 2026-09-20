'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
  const banners = DEFAULT_BANNERS;

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
    </div>
  );
}


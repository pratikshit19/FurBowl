'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export default function ComparisonSection() {
  const [sliderPos, setSliderPos] = useState(50);
  const animRef = useRef({ progressTime: 1625 }); // Start near 50% split

  // Continuous smooth back-and-forth scanning animation (never stops on hover)
  useEffect(() => {
    let animId;
    let lastTime = performance.now();
    const DURATION = 6500; // 6.5s full back-and-forth sweep

    const step = (now) => {
      const delta = now - lastTime;
      lastTime = now;
      animRef.current.progressTime = (animRef.current.progressTime + delta) % DURATION;

      // Sinusoidal oscillation from 20% to 80%
      const t = (animRef.current.progressTime / DURATION) * Math.PI * 2;
      const norm = (Math.sin(t) + 1) / 2; // 0 to 1
      const pos = 20 + norm * 60; // 20% to 80%
      setSliderPos(pos);

      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section
      id="comparison-section"
      className="relative w-full overflow-hidden bg-stone-900 border-b border-plum-900/5 select-none"
    >
      {/* ═══ FULL-BLEED INTERACTIVE SPLIT SLIDER CANVAS ═══ */}
      <div
        className="relative w-full h-[480px] sm:h-[560px] md:h-[620px] lg:h-[680px] overflow-hidden select-none bg-stone-900 cursor-default"
      >
        {/* ─── BASE LAYER: FurBowl Fresh Food (Right Side Revealed) ─── */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/home/fresh-dog-bowl.jpg"
            alt="Fresh human-grade FurBowl dog food meal"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Cinematic dark gradient top and bottom for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/75 pointer-events-none" />

          {/* Bottom-Right Title & Benefits Grouped */}
          <div
            className="absolute bottom-5 sm:bottom-8 right-5 sm:right-8 md:right-12 lg:right-16 z-20 transition-opacity duration-200 pointer-events-none text-right"
            style={{ opacity: sliderPos < 75 ? 1 : Math.max(0, (85 - sliderPos) / 10) }}
          >
            <div className="flex flex-col gap-1 sm:gap-1.5 items-end text-right">
              <span className="text-lg sm:text-2xl md:text-3xl font-extrabold text-teal-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] tracking-tight">
                FurBowl Fresh Food
              </span>
              <span className="text-xs sm:text-base md:text-lg font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] tracking-tight whitespace-nowrap">
                75%+ Natural Hydration
              </span>
              <span className="text-xs sm:text-base md:text-lg font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] tracking-tight whitespace-nowrap">
                &lt;85°C Gentle Steam Cook
              </span>
            </div>
          </div>
        </div>

        {/* ─── CLIPPED TOP LAYER: Commercial Pet Food (Left Side Revealed) ─── */}
        <div
          className="absolute inset-0 z-10 transition-none"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          <Image
            src="/images/home/dry-kibble-bowl.jpg"
            alt="Processed commercial pet food in metal bowl"
            fill
            priority
            className="object-cover object-center filter grayscale-[30%] contrast-[105%]"
            sizes="100vw"
          />
          {/* Cinematic dark gradient top and bottom for readability */}
          <div className="absolute inset-0 bg-black/20 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/75 pointer-events-none" />

          {/* Bottom-Left Title & Warnings Grouped */}
          <div
            className="absolute bottom-5 sm:bottom-8 left-5 sm:left-8 md:left-12 lg:left-16 z-20 transition-opacity duration-200 pointer-events-none"
            style={{ opacity: sliderPos > 25 ? 1 : Math.max(0, (sliderPos - 15) / 10) }}
          >
            <div className="flex flex-col gap-1 sm:gap-1.5 items-start">
              <span className="text-lg sm:text-2xl md:text-3xl font-extrabold text-amber-200 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] tracking-tight">
                Commercial Pet Food
              </span>
              <span className="text-xs sm:text-base md:text-lg font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] tracking-tight whitespace-nowrap">
                ~10% Moisture (Dehydrating)
              </span>
              <span className="text-xs sm:text-base md:text-lg font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] tracking-tight whitespace-nowrap">
                200°C+ High-Heat Extrusion
              </span>
            </div>
          </div>
        </div>

        {/* ─── OVERLAID SECTION HEADER (Top Center on Canvas) ─── */}
        <div className="absolute top-6 sm:top-8 md:top-10 inset-x-0 z-20 pointer-events-none text-center px-4 max-w-2xl mx-auto">
          <span className="inline-block text-[11px] sm:text-xs font-bold uppercase tracking-widest text-teal-300 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] mb-1 sm:mb-1.5">
            THE BOWL TELLS THE STORY
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
            See The Difference
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-white/85 font-medium mt-1.5 sm:mt-2 max-w-lg mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] hidden sm:block">
            Watch the real, physical difference between ultra-processed commercial food and FurBowl&apos;s fresh, whole-food meal.
          </p>
        </div>

        {/* ─── SCANNING DIVIDER BAR ─── */}
        <div
          className="absolute top-0 bottom-0 z-30 pointer-events-none transition-none"
          style={{ left: `${sliderPos}%` }}
        >
          {/* Slim vertical divider line */}
          <div className="absolute top-0 bottom-0 -left-[0.75px] w-[1.5px] bg-white/95 shadow-[0_0_8px_rgba(255,255,255,0.7)]" />
        </div>
      </div>
    </section>
  );
}

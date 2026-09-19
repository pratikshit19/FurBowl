'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import {
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export default function ComparisonSection() {
  const [sliderPos, setSliderPos] = useState(50);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const animRef = useRef({ progressTime: 1625 }); // Start near 50% split

  // Continuous smooth back-and-forth scanning animation
  useEffect(() => {
    if (isHovered) return;

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
  }, [isHovered]);

  return (
    <section
      id="comparison-section"
      className="py-16 sm:py-24 bg-[#faf6ed] border-b border-plum-900/5 overflow-hidden"
    >
      <div className="container-main max-w-5xl mx-auto px-4 sm:px-6">

        {/* ─── Section Header ─── */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-teal-600 mb-2">
            THE BOWL TELLS THE STORY
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-plum-900 tracking-tight leading-tight">
            See The Difference
          </h2>
          <p className="text-xs sm:text-sm lg:text-base text-plum-900/70 font-normal mt-2 max-w-xl mx-auto">
            Watch the real, physical difference between ultra-processed commercial food and FurBowl&apos;s fresh, whole-food meal.
          </p>
        </div>

        {/* ═══ INTERACTIVE SPLIT SLIDER CANVAS (AUTO-SCANNING) ════════════ */}
        <div
          ref={containerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative w-full max-w-4xl mx-auto h-[360px] sm:h-[440px] md:h-[480px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white select-none bg-stone-900 group cursor-default"
        >
          {/* ─── BASE LAYER: FurBowl Fresh Food (Right Side Revealed) ─── */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/home/fresh-dog-bowl.jpg"
              alt="Fresh human-grade FurBowl dog food meal"
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 896px"
            />
            {/* Cinematic dark gradient to ensure white text pops clearly */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/45 pointer-events-none" />

            {/* Top-Right Title: Plain white text big in size */}
            <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-20 pointer-events-none text-right">
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] tracking-tight">
                FurBowl Fresh Food
              </span>
            </div>

            {/* Bottom-Right Benefits: Plain white text big in size */}
            <div
              className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 z-20 transition-opacity duration-200 pointer-events-none"
              style={{ opacity: sliderPos < 75 ? 1 : Math.max(0, (85 - sliderPos) / 10) }}
            >
              <div className="flex flex-col gap-1 sm:gap-1.5 items-end text-right">
                <span className="text-base sm:text-lg md:text-xl font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] tracking-tight whitespace-nowrap">
                  75%+ Natural Hydration
                </span>
                <span className="text-base sm:text-lg md:text-xl font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] tracking-tight whitespace-nowrap">
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
              sizes="(max-width: 1024px) 100vw, 896px"
            />
            {/* Cinematic dark gradient to ensure white text pops clearly */}
            <div className="absolute inset-0 bg-black/20 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/45 pointer-events-none" />

            {/* Top-Left Title: Plain white text big in size */}
            <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-20 pointer-events-none">
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] tracking-tight">
                Commercial Pet Food
              </span>
            </div>

            {/* Bottom-Left Warnings: Plain white text big in size */}
            <div
              className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 z-20 transition-opacity duration-200 pointer-events-none"
              style={{ opacity: sliderPos > 25 ? 1 : Math.max(0, (sliderPos - 15) / 10) }}
            >
              <div className="flex flex-col gap-1 sm:gap-1.5 items-start">
                <span className="text-base sm:text-lg md:text-xl font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] tracking-tight whitespace-nowrap">
                  ~10% Moisture (Dehydrating)
                </span>
                <span className="text-base sm:text-lg md:text-xl font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] tracking-tight whitespace-nowrap">
                  200°C+ High-Heat Extrusion
                </span>
              </div>
            </div>
          </div>

          {/* ─── SCANNING DIVIDER BAR & SCANNER ORB ─── */}
          <div
            className="absolute top-0 bottom-0 z-30 pointer-events-none transition-none"
            style={{ left: `${sliderPos}%` }}
          >
            {/* Glowing vertical divider line */}
            <div className="absolute top-0 bottom-0 -left-[1.5px] w-[3px] bg-white shadow-[0_0_14px_rgba(255,255,255,0.8),0_0_20px_rgba(0,0,0,0.5)]" />

            {/* Central scanning circular badge */}
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-plum-900 shadow-2xl border-[3px] border-plum-900 flex items-center justify-center">
              <div className="flex items-center text-plum-900">
                <ChevronLeft className="w-4 h-4 sm:w-4.5 sm:h-4.5 -mr-0.5 text-peach-600" />
                <div className="w-0.5 h-3.5 sm:h-4 bg-plum-900/30 rounded-full mx-0.5" />
                <ChevronRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 -ml-0.5 text-teal-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

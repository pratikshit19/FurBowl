'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

/* ─── 7 Core Ingredients ─────────────────────────────────────────────────── */
const TOP_ROW = [
  {
    id: 'chicken',
    name: 'Chicken',
    benefit: 'Quality protein',
    image: '/images/ingredients/transparent/chicken_clean.png',
    blobColor: '#a2dcde',
    blobRadius: '48% 52% 47% 53% / 54% 46% 54% 46%',
    anim: 'floatWobble1',
    duration: '4.6s',
    delay: '0s',
    ticks: 'right',
    hasArrow: true,
  },
  {
    id: 'lamb',
    name: 'Lamb',
    benefit: 'Nourishing protein',
    image: '/images/ingredients/transparent/lamb_clean.png',
    blobColor: '#fbd3bb',
    blobRadius: '53% 47% 55% 45% / 48% 52% 48% 52%',
    anim: 'floatWobble2',
    duration: '5.2s',
    delay: '0.8s',
    ticks: 'both',
    hasArrow: false,
  },
  {
    id: 'quinoa',
    name: 'Quinoa',
    benefit: 'Protein & fibre',
    image: '/images/ingredients/transparent/quinoa_clean.png',
    blobColor: '#9fd9bf',
    blobRadius: '47% 53% 50% 50% / 52% 48% 52% 48%',
    anim: 'floatWobble1',
    duration: '4.9s',
    delay: '1.5s',
    ticks: 'right',
    hasArrow: true,
  },
  {
    id: 'sweetpotato',
    name: 'Sweet potato',
    benefit: 'Natural energy',
    image: '/images/ingredients/transparent/sweetpotato_clean.png',
    blobColor: '#fedbb0',
    blobRadius: '54% 46% 48% 52% / 46% 54% 46% 54%',
    anim: 'floatWobble2',
    duration: '5.5s',
    delay: '0.4s',
    ticks: 'left',
    hasArrow: true,
  },
];

const BOTTOM_ROW = [
  {
    id: 'broccoli',
    name: 'Broccoli',
    benefit: 'Nutrient-rich goodness',
    image: '/images/ingredients/transparent/broccoli_clean.png',
    blobColor: '#f3ea9b',
    blobRadius: '50% 50% 53% 47% / 53% 47% 52% 48%',
    anim: 'floatWobble2',
    duration: '4.8s',
    delay: '1.2s',
    ticks: 'right',
    hasArrow: true,
  },
  {
    id: 'egg',
    name: 'Egg',
    benefit: 'Complete protein',
    image: '/images/ingredients/transparent/egg_solid.png',
    blobColor: '#bde3f3',
    blobRadius: '48% 52% 46% 54% / 50% 50% 50% 50%',
    anim: 'floatWobble1',
    duration: '4.2s',
    delay: '0.6s',
    ticks: 'left',
    hasArrow: true,
  },
  {
    id: 'spinach',
    name: 'Spinach',
    benefit: 'Iron-rich goodness',
    image: '/images/ingredients/transparent/spinach_clean.png',
    blobColor: '#bfe7ce',
    blobRadius: '52% 48% 51% 49% / 47% 53% 48% 52%',
    anim: 'floatWobble2',
    duration: '5.3s',
    delay: '1.8s',
    ticks: 'both',
    hasArrow: true,
  },
];

const ALL_INGREDIENTS = [...TOP_ROW, ...BOTTOM_ROW];

/* ─── Desktop Ingredient Card (Blob + Food + Side Text, No Card Background) ─ */
function DesktopIngredientCard({ item }) {
  return (
    <div className="flex items-center gap-2 sm:gap-3 group cursor-default select-none">
      {/* ─── Blob & Food Container with Hand-Drawn Flourishes ─── */}
      <div className="relative flex-shrink-0">
        {/* Top-Right Ticks */}
        {(item.ticks === 'right' || item.ticks === 'both') && (
          <svg
            width="18"
            height="16"
            viewBox="0 0 18 16"
            fill="none"
            stroke="#3d1235"
            strokeWidth="2.2"
            strokeLinecap="round"
            className="absolute -top-3 right-0 pointer-events-none select-none z-10 opacity-75"
          >
            <path d="M3 13 L 5 4" />
            <path d="M9 13 L 12 3" />
            <path d="M15 13 L 17 6" />
          </svg>
        )}

        {/* Top-Left Ticks */}
        {(item.ticks === 'left' || item.ticks === 'both') && (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="#3d1235"
            strokeWidth="2.2"
            strokeLinecap="round"
            className="absolute -top-3 -left-1 pointer-events-none select-none z-10 opacity-75"
          >
            <path d="M13 13 L 10 4" />
            <path d="M6 13 L 3 5" />
          </svg>
        )}

        {/* Floating / Wobbling Blob & Photo */}
        <div
          className="relative w-20 h-16 sm:w-26 sm:h-20 md:w-32 md:h-24 lg:w-36 lg:h-26 flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
          style={{
            animation: `${item.anim} ${item.duration} ease-in-out infinite`,
            animationDelay: item.delay,
          }}
        >
          {/* Organic Pastel Blob Background */}
          <div
            className="absolute inset-0 transition-all duration-300"
            style={{
              backgroundColor: item.blobColor,
              borderRadius: item.blobRadius,
            }}
          />

          {/* Real Food Photo Breaking Out Naturally */}
          <div className="relative w-full h-full scale-[1.08] z-10">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-contain"
              sizes="(max-width: 640px) 96px, (max-width: 768px) 120px, (max-width: 1024px) 140px, 160px"
              priority
            />
          </div>
        </div>

        {/* Hand-drawn Bottom Curved Arrow */}
        {item.hasArrow && (
          <svg
            width="20"
            height="12"
            viewBox="0 0 22 13"
            fill="none"
            stroke="#3d1235"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute -bottom-2 right-1 pointer-events-none select-none z-10 opacity-70"
          >
            <path d="M2 3 Q 11 12, 19 8" />
            <path d="M14 6 L 19 8 L 18 12" />
          </svg>
        )}
      </div>

      {/* ─── Name + Benefit to the Right ─── */}
      <div className="flex flex-col justify-center text-left min-w-0">
        <p className="text-sm sm:text-base md:text-lg lg:text-xl font-black text-[#3d1235] tracking-tight leading-tight">
          {item.name}
        </p>
        <p className="text-[11px] sm:text-xs md:text-sm text-[#5c2a52] font-semibold leading-tight mt-0.5 sm:mt-1">
          {item.benefit}
        </p>
      </div>
    </div>
  );
}

/* ─── Mobile Circular Arc Ingredient Item (No Card Box, Pure Ingredients) ─── */
function ArcIngredientItem({ item, isActive, isNeighbor, onClick, arcStyle }) {
  return (
    <div
      onClick={onClick}
      style={arcStyle}
      className={`absolute left-1/2 top-1/2 flex flex-col items-center text-center select-none ${
        isNeighbor ? 'cursor-pointer' : ''
      }`}
    >
      {/* ─── Blob & Food with Hand-Drawn Flourishes ─── */}
      <div className="relative flex-shrink-0">
        {/* Top-Right Ticks */}
        {(item.ticks === 'right' || item.ticks === 'both') && (
          <svg
            width="18"
            height="16"
            viewBox="0 0 18 16"
            fill="none"
            stroke="#3d1235"
            strokeWidth="2.2"
            strokeLinecap="round"
            className="absolute -top-3 right-0 pointer-events-none select-none z-10 opacity-75"
          >
            <path d="M3 13 L 5 4" />
            <path d="M9 13 L 12 3" />
            <path d="M15 13 L 17 6" />
          </svg>
        )}

        {/* Top-Left Ticks */}
        {(item.ticks === 'left' || item.ticks === 'both') && (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="#3d1235"
            strokeWidth="2.2"
            strokeLinecap="round"
            className="absolute -top-3 -left-1 pointer-events-none select-none z-10 opacity-75"
          >
            <path d="M13 13 L 10 4" />
            <path d="M6 13 L 3 5" />
          </svg>
        )}

        {/* Floating / Wobbling Blob & Photo */}
        <div
          className="relative w-36 h-28 sm:w-44 sm:h-34 flex items-center justify-center"
          style={{
            animation: `${item.anim} ${item.duration} ease-in-out infinite`,
            animationDelay: item.delay,
          }}
        >
          {/* Organic Pastel Blob */}
          <div
            className="absolute inset-0 transition-all duration-300"
            style={{
              backgroundColor: item.blobColor,
              borderRadius: item.blobRadius,
            }}
          />

          {/* Real Food Cutout Photo */}
          <div className="relative w-full h-full scale-[1.12] z-10">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-contain"
              sizes="180px"
              priority
            />
          </div>
        </div>
      </div>

      {/* ─── Name & Benefit (Rendered directly on cream background, no card) ─── */}
      <div className="mt-3 flex flex-col items-center">
        <p className="text-2xl sm:text-3xl font-black text-[#3d1235] tracking-tight leading-tight whitespace-nowrap">
          {item.name}
        </p>
        <p
          className={`text-xs sm:text-sm text-[#5c2a52] font-semibold leading-tight mt-1 whitespace-nowrap transition-opacity duration-300 ${
            isActive ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {item.benefit}
        </p>
      </div>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────────── */
export default function IngredientsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const isInteractingRef = useRef(false);
  const timerRef = useRef(null);

  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);
  const isDragging = useRef(false);

  const N = ALL_INGREDIENTS.length;

  const handleNext = () => {
    setActiveIndex((curr) => (curr + 1) % N);
  };

  const handlePrev = () => {
    setActiveIndex((curr) => (curr - 1 + N) % N);
  };


  // Touch Swipe Handlers for mobile arc gesture
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
    isDragging.current = true;
    isInteractingRef.current = true;
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const onTouchMove = (e) => {
    if (!isDragging.current) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const onTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (touchDeltaX.current < -35) {
      handleNext();
    } else if (touchDeltaX.current > 35) {
      handlePrev();
    }
    timerRef.current = setTimeout(() => {
      isInteractingRef.current = false;
    }, 5000);
  };

  // Mouse Drag Handlers
  const onMouseDown = (e) => {
    touchStartX.current = e.clientX;
    touchDeltaX.current = 0;
    isDragging.current = true;
    isInteractingRef.current = true;
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    touchDeltaX.current = e.clientX - touchStartX.current;
  };

  const onMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (touchDeltaX.current < -35) {
      handleNext();
    } else if (touchDeltaX.current > 35) {
      handlePrev();
    }
    timerRef.current = setTimeout(() => {
      isInteractingRef.current = false;
    }, 5000);
  };

  // Gentle auto-rotation when user is not touching/interacting
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isInteractingRef.current) {
        setActiveIndex((curr) => (curr + 1) % N);
      }
    }, 3800);

    return () => clearInterval(interval);
  }, [N]);

  // Compute circular arc position, rotation, scale and opacity
  const getArcStyle = (index) => {
    let diff = (index - activeIndex) % N;
    if (diff > N / 2) diff -= N;
    if (diff < -N / 2) diff += N;

    if (diff === 0) {
      // Focused active item: at the apex of the arc
      return {
        transform: 'translate(-50%, -50%) translate3d(0px, -12px, 0px) scale(1) rotate(0deg)',
        opacity: 1,
        zIndex: 20,
        pointerEvents: 'auto',
        transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease',
      };
    }

    if (diff === -1) {
      // Left neighbor: curved downwards to the left along the circular arc, low opacity
      return {
        transform: 'translate(-50%, -50%) translate3d(-128px, 18px, 0px) scale(0.76) rotate(-9deg)',
        opacity: 0.32,
        zIndex: 10,
        pointerEvents: 'auto',
        transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease',
      };
    }

    if (diff === 1) {
      // Right neighbor: curved downwards to the right along the circular arc, low opacity
      return {
        transform: 'translate(-50%, -50%) translate3d(128px, 18px, 0px) scale(0.76) rotate(9deg)',
        opacity: 0.32,
        zIndex: 10,
        pointerEvents: 'auto',
        transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease',
      };
    }

    if (diff === -2) {
      // Further left along the circle: hidden
      return {
        transform: 'translate(-50%, -50%) translate3d(-190px, 62px, 0px) scale(0.45) rotate(-20deg)',
        opacity: 0,
        zIndex: 2,
        pointerEvents: 'none',
        transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease',
      };
    }

    if (diff === 2) {
      // Further right along the circle: hidden
      return {
        transform: 'translate(-50%, -50%) translate3d(190px, 62px, 0px) scale(0.45) rotate(20deg)',
        opacity: 0,
        zIndex: 2,
        pointerEvents: 'none',
        transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease',
      };
    }

    // Other items on the far side of the circle
    return {
      transform: 'translate(-50%, -50%) translate3d(0px, 80px, 0px) scale(0.3) rotate(0deg)',
      opacity: 0,
      zIndex: 0,
      pointerEvents: 'none',
      transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease',
    };
  };

  return (
    <section
      id="ingredients-section"
      className="scroll-mt-20 relative overflow-hidden"
    >
      {/* ─── Warm Cream Background ──────────────────────────────────────── */}
      <div className="absolute inset-0 bg-[#faf4ea]" />

      {/* ─── Decorative Corner Blobs & Curves ────────────────────────────── */}
      <div className="absolute -top-12 -left-12 w-40 h-40 sm:w-56 sm:h-56 rounded-full bg-[#fbd4c0]/50 blur-sm pointer-events-none" />
      <div className="absolute -top-10 -right-10 w-36 h-36 sm:w-52 sm:h-52 rounded-full bg-[#fbd4c0]/50 blur-sm pointer-events-none" />

      {/* Bottom-left warm peach curve behind dog */}
      <div className="hidden sm:block absolute -bottom-14 -left-14 w-64 h-64 md:w-88 md:h-88 lg:w-110 lg:h-110 rounded-full bg-[#fbdac7]/80 pointer-events-none" />

      {/* ─── Scattered Paw Prints (Decorative) ──────────────────────────── */}
      <div className="absolute top-[12%] right-[5%] text-[#ebd7c8] text-5xl sm:text-6xl md:text-7xl lg:text-8xl rotate-[20deg] opacity-35 pointer-events-none select-none">🐾</div>

      {/* ═══ DOG — Absolute Bottom-Left (Desktop only) ════════════════════ */}
      <div className="hidden sm:block absolute bottom-0 left-0 z-20 pointer-events-none">
        <div className="relative w-48 h-56 md:w-56 md:h-64 lg:w-76 lg:h-80 xl:w-80 xl:h-[24rem]">
          <Image
            src="/images/sideways_dog.png"
            alt="Happy dog with FurBowl bandana"
            fill
            className="object-contain object-bottom"
            sizes="(max-width: 768px) 192px, (max-width: 1024px) 224px, (max-width: 1280px) 288px, 320px"
            priority
          />
        </div>
      </div>

      {/* ═══ BOWL — Absolute Bottom-Right (Desktop only) ═══════════════════ */}
      <div className="hidden sm:block absolute bottom-0 right-0 z-20 pointer-events-none">
        <div className="relative w-48 h-36 sm:w-56 sm:h-42 md:w-68 md:h-50 lg:w-80 lg:h-60 xl:w-92 xl:h-68">
          <Image
            src="/images/ingredients/furbowl_bowl_shadow.png"
            alt="FurBowl fresh food bowl"
            fill
            className="object-contain object-bottom-right"
            sizes="(max-width: 768px) 224px, (max-width: 1024px) 272px, (max-width: 1280px) 320px, 368px"
            priority
          />
        </div>
      </div>

      {/* ─── Content Container ──────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">

        {/* ═══ HEADER ═══════════════════════════════════════════════════════ */}
        <div className="text-center mb-6 sm:mb-12 lg:mb-14">
          {/* Coral burst rays above headline */}
          <div className="flex justify-center items-center mb-1">
            <svg
              width="34"
              height="18"
              viewBox="0 0 34 18"
              fill="none"
              stroke="#f58d6e"
              strokeWidth="2.8"
              strokeLinecap="round"
              className="pointer-events-none select-none"
            >
              <path d="M7 16 L 4 4" />
              <path d="M17 16 L 17 3" />
              <path d="M27 16 L 30 4" />
            </svg>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-black leading-[1.08] tracking-tight">
            <span className="text-[#3d1235]">WHAT&apos;S IN</span>
            <br />
            <span className="text-teal-600">A FURBOWL?</span>
          </h2>
          <p className="mt-2.5 sm:mt-3 text-sm sm:text-base lg:text-lg text-[#3d1235] font-semibold italic">
            Good ingredients. Thoughtfully put together.
          </p>
        </div>

        {/* ═══ DESKTOP INGREDIENTS LAYOUT (md and up: 2-Row Grid) ════════════ */}
        <div className="hidden md:block relative">
          {/* ─── Top Row: 4 Ingredients ──────────────────────────────────── */}
          <div className="grid grid-cols-4 gap-6 lg:gap-8 max-w-5xl lg:max-w-6xl mx-auto mb-8 sm:mb-12 px-4">
            {TOP_ROW.map((item) => (
              <DesktopIngredientCard key={item.id} item={item} />
            ))}
          </div>

          {/* ─── Bottom Row: 3 Ingredients (Centered between Dog & Bowl) ─── */}
          <div className="flex justify-center">
            <div className="grid grid-cols-3 gap-6 lg:gap-10 max-w-2xl lg:max-w-3xl">
              {BOTTOM_ROW.map((item) => (
                <DesktopIngredientCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>

        {/* ═══ MOBILE CIRCULAR ARC DISPLAY (< md) ═══════════════════════════ */}
        <div className="md:hidden relative">
          {/* Subtle curved arc trajectory line */}
          <svg
            width="340"
            height="80"
            viewBox="0 0 340 80"
            fill="none"
            className="absolute top-10 left-1/2 -translate-x-1/2 pointer-events-none opacity-30 select-none"
          >
            <path
              d="M 15 62 Q 170 12 325 62"
              stroke="#cca38e"
              strokeWidth="2.5"
              strokeDasharray="5 7"
              strokeLinecap="round"
            />
          </svg>

          {/* ─── Interactive Arc Stage (Swipeable & Draggable) ─────────────── */}
          <div
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            className="relative h-[255px] w-full flex items-center justify-center overflow-visible cursor-grab active:cursor-grabbing select-none"
          >
            {ALL_INGREDIENTS.map((item, idx) => {
              let diff = (idx - activeIndex) % N;
              if (diff > N / 2) diff -= N;
              if (diff < -N / 2) diff += N;

              const isActive = diff === 0;
              const isNeighbor = Math.abs(diff) === 1;

              return (
                <ArcIngredientItem
                  key={item.id}
                  item={item}
                  isActive={isActive}
                  isNeighbor={isNeighbor}
                  onClick={() => {
                    if (diff === -1) handlePrev();
                    if (diff === 1) handleNext();
                  }}
                  arcStyle={getArcStyle(idx)}
                />
              );
            })}
          </div>


        </div>

        {/* ═══ CTA BUTTON ═══════════════════════════════════════════════════ */}
        <div className="text-center mt-8 sm:mt-12 lg:mt-14">
          <div className="inline-flex items-center gap-3">
            {/* Left Coral Rays */}
            <svg
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              stroke="#f58d6e"
              strokeWidth="2.4"
              strokeLinecap="round"
              className="hidden sm:block pointer-events-none select-none"
            >
              <path d="M16 4 L 4 2" />
              <path d="M16 9 L 2 9" />
              <path d="M16 14 L 4 16" />
            </svg>

            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-black text-xs sm:text-sm tracking-wider uppercase px-7 sm:px-9 py-2.5 sm:py-3 rounded-xl shadow-md hover:shadow-lg shadow-teal-600/20 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>EXPLORE OUR PACKS</span>
              <ArrowRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
            </Link>

            {/* Right Coral Rays */}
            <svg
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              stroke="#f58d6e"
              strokeWidth="2.4"
              strokeLinecap="round"
              className="hidden sm:block pointer-events-none select-none"
            >
              <path d="M4 4 L 16 2" />
              <path d="M4 9 L 18 9" />
              <path d="M4 14 L 16 16" />
            </svg>
          </div>
        </div>


      </div>

      {/* ─── Floating & Wobbling Keyframe Animations ─────────────────────── */}
      <style>{`
        @keyframes floatWobble1 {
          0%, 100% {
            transform: translateY(0px) rotate(0deg) scale(1);
          }
          25% {
            transform: translateY(-6px) rotate(-2.2deg) scale(1.02);
          }
          50% {
            transform: translateY(-2px) rotate(1.6deg) scale(0.99);
          }
          75% {
            transform: translateY(-8px) rotate(-1deg) scale(1.015);
          }
        }

        @keyframes floatWobble2 {
          0%, 100% {
            transform: translateY(0px) rotate(0deg) scale(1);
          }
          25% {
            transform: translateY(-5px) rotate(2deg) scale(1.015);
          }
          50% {
            transform: translateY(-9px) rotate(-1.7deg) scale(0.99);
          }
          75% {
            transform: translateY(-2px) rotate(1.1deg) scale(1.02);
          }
        }
      `}</style>
    </section>
  );
}

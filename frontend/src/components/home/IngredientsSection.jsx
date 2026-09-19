'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

/* ─── Top 5 Core Ingredients From FurBowl Recipes ─────────────────────────── */
const TOP_5_INGREDIENTS = [
  {
    id: 'chicken',
    name: 'Whole Farm Chicken',
    shortName: 'Chicken',
    badge: 'Lean Muscle & Organs',
    shortBadge: 'Lean Muscle',
    punchline: '100% real poultry for high energy and lean, healthy muscles.',
    color: '#ff7a59',
    glowColor: 'rgba(255, 122, 89, 0.35)',
    image: '/images/ingredients/chicken-3d.jpg',
    desktopPos: 'left-[4%] sm:left-[6%] top-[10%] sm:top-[12%]',
    textAlign: 'text-center',
    svgPath: 'M 195 160 C 225 175, 245 190, 275 210',
    pulseEnd: { x: 275, y: 210 },
    orbitPos: { left: '15%', top: '39%' },
  },
  {
    id: 'carrot',
    name: 'Crisp Garden Carrots',
    shortName: 'Carrots',
    badge: 'Beta-Carotene & Vision',
    shortBadge: 'Vision & Immunity',
    punchline: 'Crisp garden carrots packed with beta-carotene for sharp vision.',
    color: '#f97316',
    glowColor: 'rgba(249, 115, 22, 0.35)',
    image: '/images/ingredients/carrot-3d.jpg',
    desktopPos: 'left-1/2 -translate-x-1/2 top-0',
    textAlign: 'text-center',
    svgPath: 'M 350 145 L 350 172',
    pulseEnd: { x: 350, y: 172 },
    orbitPos: { left: '50%', top: '13%' },
  },
  {
    id: 'peas',
    name: 'Sweet Garden Peas',
    shortName: 'Peas',
    badge: 'Plant Energy & Zinc',
    shortBadge: 'Shiny Coat',
    punchline: 'Sweet tender peas with natural zinc for a radiant, silky coat.',
    color: '#15aec0',
    glowColor: 'rgba(21, 174, 192, 0.35)',
    image: '/images/ingredients/peas-3d.jpg',
    desktopPos: 'right-[4%] sm:right-[6%] top-[10%] sm:top-[12%]',
    textAlign: 'text-center',
    svgPath: 'M 505 160 C 475 175, 455 190, 425 210',
    pulseEnd: { x: 425, y: 210 },
    orbitPos: { left: '85%', top: '39%' },
  },
  {
    id: 'lamb',
    name: 'Lean Pasture Lamb',
    shortName: 'Lamb',
    badge: 'Iron & Muscle Repair',
    shortBadge: 'Heart Stamina',
    punchline: 'Pasture-raised red meat rich in heme iron for active stamina.',
    color: '#db4d2c',
    glowColor: 'rgba(219, 77, 44, 0.35)',
    image: '/images/ingredients/lamb-3d.jpg',
    desktopPos: 'right-[8%] sm:right-[10%] bottom-[2%] sm:bottom-[4%]',
    textAlign: 'text-center',
    svgPath: 'M 485 365 C 460 345, 440 330, 420 315',
    pulseEnd: { x: 420, y: 315 },
    orbitPos: { left: '72%', top: '80%' },
  },
  {
    id: 'pumpkin',
    name: 'Golden Sun Pumpkin',
    shortName: 'Pumpkin',
    badge: 'Gentle Prebiotic Fiber',
    shortBadge: 'Easy Digestion',
    punchline: 'Golden pumpkin with gentle prebiotic fiber for happy tummies.',
    color: '#ea580c',
    glowColor: 'rgba(234, 88, 12, 0.35)',
    image: '/images/ingredients/pumpkin-3d.jpg',
    desktopPos: 'left-[8%] sm:left-[10%] bottom-[2%] sm:bottom-[4%]',
    textAlign: 'text-center',
    svgPath: 'M 215 365 C 240 345, 260 330, 280 315',
    pulseEnd: { x: 280, y: 315 },
    orbitPos: { left: '28%', top: '80%' },
  },
];

export default function IngredientsSection() {
  const [hoveredIdx, setHoveredIdx] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);
  const active = TOP_5_INGREDIENTS[hoveredIdx] || TOP_5_INGREDIENTS[0];

  useEffect(() => {
    if (userInteracted) return;
    const interval = setInterval(() => {
      setHoveredIdx((prev) => (prev + 1) % TOP_5_INGREDIENTS.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [userInteracted]);

  return (
    <section id="ingredients-section" className="py-12 sm:py-16 bg-[#faf6ed] border-b border-plum-900/5 relative overflow-hidden">
      {/* ─── Background Studio Dogs Image (Two Diff Breeds, Facing Sideways) ─── */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <Image
          src="/images/home/ingredients-dog-bg.jpg"
          alt="Australian Shepherd and Beagle sitting together watching the fresh food bowl"
          fill
          priority
          className="object-cover object-[72%_center] sm:object-[76%_center] lg:object-[80%_center] opacity-85 sm:opacity-95"
          sizes="100vw"
        />
        {/* Soft Vignette and Gradient Blends to ensure text & bowl prominence */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#faf6ed] via-[#faf6ed]/40 to-transparent w-full sm:w-3/5 lg:w-1/2" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#faf6ed] via-transparent to-[#faf6ed]" />
      </div>

      {/* Background Subtle Warm Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="container-main max-w-5xl relative z-10">
        {/* ─── Compact & Punchy Header ───────────────────────────────────── */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-plum-900 tracking-tight leading-tight">
            Food So Real, You Could Eat It Yourself.
          </h2>
          <p className="text-xs sm:text-sm lg:text-base text-plum-900/70 font-normal mt-2 max-w-xl mx-auto">
            Real whole meats and crisp farm vegetables — crafted with fresh ingredients that even you can eat.
          </p>
        </div>

        {/* Style tag for smooth continuous orbital revolution (both desktop & mobile) */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes orbitTrack {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes orbitCounter {
            from { transform: rotate(0deg); }
            to { transform: rotate(-360deg); }
          }
          .orbit-track-mobile,
          .mobile-orbit-track {
            animation: orbitTrack 28s linear infinite;
          }
          .orbit-counter-mobile,
          .mobile-orbit-counter {
            animation: orbitCounter 28s linear infinite;
          }
          .orbit-track-desktop {
            animation: orbitTrack 36s linear infinite;
          }
          .orbit-counter-desktop {
            animation: orbitCounter 36s linear infinite;
          }
          .orbit-track-mobile:hover,
          .orbit-track-mobile:active,
          .mobile-orbit-track:hover,
          .mobile-orbit-track:active,
          .orbit-track-desktop:hover {
            animation-play-state: paused;
          }
          .orbit-track-mobile:hover .orbit-counter-mobile,
          .orbit-track-mobile:active .orbit-counter-mobile,
          .mobile-orbit-track:hover .mobile-orbit-counter,
          .mobile-orbit-track:active .mobile-orbit-counter,
          .orbit-track-desktop:hover .orbit-counter-desktop {
            animation-play-state: paused;
          }
        `}} />

        {/* ═══ DESKTOP COMPACT ORBITAL CANVAS ════════════════════════════════ */}
        <div className="hidden lg:block relative w-[540px] h-[540px] xl:w-[580px] xl:h-[580px] mx-auto select-none my-2">
          {/* Concentric Orbit Rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[430px] h-[430px] xl:w-[460px] xl:h-[460px] rounded-full border-2 border-dashed border-plum-900/15 pointer-events-none z-0" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[310px] h-[310px] rounded-full border border-plum-900/10 pointer-events-none z-0" />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full blur-3xl pointer-events-none z-0 transition-all duration-500"
            style={{ backgroundColor: active.glowColor }}
          />

          {/* Centerpiece 3D Bowl - Centered & Stationary */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center pointer-events-none">
            <div className="relative w-48 h-48 lg:w-52 lg:h-52 rounded-full overflow-hidden shadow-2xl border-4 border-white transition-transform duration-500 ease-out">
              <Image
                src="/images/ingredients/fresh-bowl-3d.jpg"
                alt="Freshly cooked dog food bowl with real ingredients"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Continuously Rotating Orbit Track with 5 Ingredients */}
          <div className="absolute inset-0 orbit-track-desktop z-20 pointer-events-none">
            {TOP_5_INGREDIENTS.map((ing, idx) => {
              const isCurrent = idx === hoveredIdx;
              return (
                <div
                  key={ing.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                  style={{ left: ing.orbitPos.left, top: ing.orbitPos.top }}
                >
                  <div
                    onMouseEnter={() => {
                      setHoveredIdx(idx);
                      setUserInteracted(true);
                    }}
                    className="orbit-counter-desktop group flex flex-col items-center cursor-pointer transition-all duration-300"
                  >
                    <div
                      className={`relative w-22 h-22 lg:w-26 lg:h-26 rounded-full p-1.5 bg-white transition-all duration-300 ${
                        isCurrent
                          ? 'scale-115 ring-4 ring-offset-2'
                          : 'shadow-md border border-plum-900/10 hover:scale-108 hover:shadow-xl'
                      }`}
                      style={{
                        borderColor: isCurrent ? ing.color : 'transparent',
                        ringColor: ing.color,
                        boxShadow: isCurrent
                          ? `0 16px 36px -4px ${ing.glowColor}`
                          : '0 8px 20px -4px rgba(42, 24, 36, 0.08)',
                      }}
                    >
                      <div className="relative w-full h-full rounded-full overflow-hidden bg-cream-50">
                        <Image
                          src={ing.image}
                          alt={ing.name}
                          fill
                          className="object-contain p-1 group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    </div>

                    <div className="mt-2 text-center select-none">
                      <h4
                        className={`text-xs sm:text-sm font-bold leading-snug whitespace-nowrap transition-colors ${
                          isCurrent ? 'text-plum-900' : 'text-plum-900/80'
                        }`}
                      >
                        {ing.name}
                      </h4>
                      <span
                        className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full inline-block mt-0.5 whitespace-nowrap transition-all"
                        style={{
                          backgroundColor: isCurrent ? `${ing.color}20` : '#f4efdf',
                          color: isCurrent ? ing.color : '#57585a',
                        }}
                      >
                        {ing.badge}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ═══ MOBILE / TABLET VIEW (< 1024px) ══════════════════════════════ */}
        <div className="lg:hidden flex flex-col items-center w-full">

          {/* Constellation Canvas around Centerpiece Bowl */}
          <div className="relative w-full max-w-[360px] sm:max-w-[420px] h-[360px] sm:h-[410px] mx-auto flex items-center justify-center select-none">
            {/* Background Static Orbit Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[290px] sm:w-[330px] h-[290px] sm:h-[330px] rounded-full border border-dashed border-plum-900/15 pointer-events-none z-0" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] sm:w-[250px] h-[220px] sm:h-[250px] rounded-full border border-plum-900/10 pointer-events-none z-0" />

            {/* Dynamic Ingredient Ambient Glow behind bowl */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] rounded-full blur-2xl transition-all duration-500 pointer-events-none z-0"
              style={{ backgroundColor: active.glowColor }}
            />

            {/* Centerpiece 3D Bowl - Centered & Stationary */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center pointer-events-none">
              <div className="relative w-32 h-32 sm:w-38 sm:h-38 rounded-full overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="/images/ingredients/fresh-bowl-3d.jpg"
                  alt="Freshly cooked dog food bowl with real ingredients"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <span className="mt-1 px-2.5 py-0.5 bg-plum-900/85 backdrop-blur-xs text-[9px] sm:text-[10px] text-white font-bold rounded-full shadow whitespace-nowrap">
                Real Food Bowl
              </span>
            </div>

            {/* Continuously Rotating Orbit Track with 5 Large Ingredient Circles */}
            <div className="absolute inset-0 mobile-orbit-track z-20 pointer-events-none">
              {TOP_5_INGREDIENTS.map((ing, idx) => {
                const isCurrent = idx === hoveredIdx;
                return (
                  <div
                    key={ing.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                    style={{ left: ing.orbitPos.left, top: ing.orbitPos.top }}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setHoveredIdx(idx);
                        setUserInteracted(true);
                      }}
                      className="mobile-orbit-counter group flex flex-col items-center cursor-pointer transition-transform duration-200"
                      aria-label={`Select ${ing.name}`}
                    >
                      <div
                        className={`relative w-[68px] h-[68px] sm:w-[82px] sm:h-[82px] rounded-full p-1.5 bg-white transition-all duration-300 ${
                          isCurrent
                            ? 'scale-115 ring-4 ring-offset-2'
                            : 'shadow-md border border-plum-900/10 hover:scale-110'
                        }`}
                        style={{
                          borderColor: isCurrent ? ing.color : 'transparent',
                          ringColor: ing.color,
                          boxShadow: isCurrent
                            ? `0 14px 28px -2px ${ing.glowColor}`
                            : '0 6px 16px rgba(42, 24, 36, 0.1)',
                        }}
                      >
                        <div className="relative w-full h-full rounded-full overflow-hidden bg-cream-50">
                          <Image
                            src={ing.image}
                            alt={ing.name}
                            fill
                            className="object-contain p-1"
                          />
                        </div>
                      </div>
                      <span
                        className="text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full mt-1.5 shadow-xs whitespace-nowrap transition-all tracking-tight"
                        style={{
                          backgroundColor: isCurrent ? ing.color : '#ffffff',
                          color: isCurrent ? '#ffffff' : '#3d1a24',
                          border: isCurrent ? 'none' : '1px solid rgba(42,24,36,0.12)',
                        }}
                      >
                        {ing.shortName}
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sleek, Punchy Spotlight Card (No text overload) */}
          <div className="w-full max-w-sm sm:max-w-md mx-auto mt-4 px-2">
            <div
              className="bg-white/95 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 shadow-xl border transition-all duration-300 flex items-center gap-3.5"
              style={{ borderColor: `${active.color}40` }}
            >
              <div
                className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full p-1 shrink-0 shadow-sm transition-all duration-300"
                style={{
                  backgroundColor: `${active.color}20`,
                  boxShadow: `0 4px 14px ${active.glowColor}`,
                }}
              >
                <div className="relative w-full h-full rounded-full overflow-hidden bg-white">
                  <Image
                    src={active.image}
                    alt={active.name}
                    fill
                    className="object-contain p-0.5"
                  />
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm sm:text-base font-bold text-plum-900 leading-tight truncate">
                    {active.name}
                  </h3>
                  <span
                    className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0"
                    style={{
                      backgroundColor: `${active.color}15`,
                      color: active.color,
                    }}
                  >
                    {active.shortBadge}
                  </span>
                </div>
                <p className="text-xs text-plum-900/80 font-medium mt-1 leading-snug">
                  {active.punchline}
                </p>
              </div>
            </div>

            {/* Fast Tap Switcher Pills */}
            <div className="flex items-center justify-center gap-1 sm:gap-1.5 mt-3 flex-wrap">
              {TOP_5_INGREDIENTS.map((ing, idx) => {
                const isSelected = idx === hoveredIdx;
                return (
                  <button
                    key={ing.id}
                    type="button"
                    onClick={() => {
                      setHoveredIdx(idx);
                      setUserInteracted(true);
                    }}
                    className={`px-2.5 sm:px-3 py-1 rounded-full text-[10.5px] sm:text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 sm:gap-1.5 ${
                      isSelected
                        ? 'text-white shadow-sm scale-105'
                        : 'bg-white/85 hover:bg-white text-plum-900/70 border border-plum-900/10'
                    }`}
                    style={{
                      backgroundColor: isSelected ? ing.color : undefined,
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        backgroundColor: isSelected ? '#ffffff' : ing.color,
                      }}
                    />
                    <span>{ing.shortName}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="text-center mt-8 sm:mt-10">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-plum-900 hover:bg-plum-800 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Explore Our Fresh Recipes</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   BACKGROUND VIDEO SECTION (SAVED BELOW FOR EASY RESTORATION)
   ══════════════════════════════════════════════════════════════════════════════

function VideoIngredientsSection() {
  return (
    <section
      id="ingredients-section"
      className="relative w-full h-[480px] sm:h-[560px] md:h-[620px] lg:h-[680px] overflow-hidden flex flex-col justify-end items-center pb-8 sm:pb-12 lg:pb-14 border-b border-plum-900/10 select-none"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
      >
        <source src="/images/furbowl-ingredients.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10 pointer-events-none" />

      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto flex flex-col items-center">
        <h2 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white tracking-tight leading-tight drop-shadow-md mb-2">
          Ingredients he’ll actually like.
        </h2>
        <p className="text-white/90 font-medium text-xs sm:text-sm md:text-base max-w-xl mx-auto mb-5 sm:mb-6 drop-shadow-xs">
          Real chicken, fresh veggies, zero mystery brown kibble.
        </p>

        <Link
          href="/why-furbowl"
          className="inline-flex items-center gap-3 bg-white hover:bg-cream-100 text-plum-900 hover:text-coral-600 font-bold text-xs sm:text-sm md:text-base tracking-wide uppercase px-6 sm:px-9 py-3.5 sm:py-4 rounded-none shadow-xl hover:shadow-2xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 border-2 border-white group cursor-pointer"
        >
          <span>Know what your dog is getting</span>
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-coral-500 group-hover:translate-x-1.5 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
══════════════════════════════════════════════════════════════════════════════ */

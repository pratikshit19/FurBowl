'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

/* ─── Top 5 Core Ingredients From FurBowl Recipes ─────────────────────────── */
const TOP_5_INGREDIENTS = [
  {
    id: 'chicken',
    name: 'Whole Farm Chicken',
    badge: 'Lean Muscle & Organs',
    color: '#ff7a59',
    glowColor: 'rgba(255, 122, 89, 0.35)',
    image: '/images/ingredients/chicken-3d.jpg',
    desktopPos: 'left-[4%] sm:left-[6%] top-[10%] sm:top-[12%]',
    textAlign: 'text-center',
    svgPath: 'M 195 160 C 225 175, 245 190, 275 210',
    pulseEnd: { x: 275, y: 210 },
  },
  {
    id: 'carrot',
    name: 'Crisp Garden Carrots',
    badge: 'Beta-Carotene & Vision',
    color: '#f97316',
    glowColor: 'rgba(249, 115, 22, 0.35)',
    image: '/images/ingredients/carrot-3d.jpg',
    desktopPos: 'left-1/2 -translate-x-1/2 top-0',
    textAlign: 'text-center',
    svgPath: 'M 350 145 L 350 172',
    pulseEnd: { x: 350, y: 172 },
  },
  {
    id: 'peas',
    name: 'Sweet Garden Peas',
    badge: 'Plant Energy & Zinc',
    color: '#15aec0',
    glowColor: 'rgba(21, 174, 192, 0.35)',
    image: '/images/ingredients/peas-3d.jpg',
    desktopPos: 'right-[4%] sm:right-[6%] top-[10%] sm:top-[12%]',
    textAlign: 'text-center',
    svgPath: 'M 505 160 C 475 175, 455 190, 425 210',
    pulseEnd: { x: 425, y: 210 },
  },
  {
    id: 'lamb',
    name: 'Lean Pasture Lamb',
    badge: 'Iron & Muscle Repair',
    color: '#db4d2c',
    glowColor: 'rgba(219, 77, 44, 0.35)',
    image: '/images/ingredients/lamb-3d.jpg',
    desktopPos: 'right-[8%] sm:right-[10%] bottom-[2%] sm:bottom-[4%]',
    textAlign: 'text-center',
    svgPath: 'M 485 365 C 460 345, 440 330, 420 315',
    pulseEnd: { x: 420, y: 315 },
  },
  {
    id: 'pumpkin',
    name: 'Golden Sun Pumpkin',
    badge: 'Gentle Prebiotic Fiber',
    color: '#ea580c',
    glowColor: 'rgba(234, 88, 12, 0.35)',
    image: '/images/ingredients/pumpkin-3d.jpg',
    desktopPos: 'left-[8%] sm:left-[10%] bottom-[2%] sm:bottom-[4%]',
    textAlign: 'text-center',
    svgPath: 'M 215 365 C 240 345, 260 330, 280 315',
    pulseEnd: { x: 280, y: 315 },
  },
];

export default function IngredientsSection() {
  const [hoveredIdx, setHoveredIdx] = useState(1); // default carrot active

  const active = TOP_5_INGREDIENTS[hoveredIdx] || TOP_5_INGREDIENTS[1];

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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-plum-900 tracking-tight leading-tight">
            Food So Real, You Could Eat It Yourself.
          </h2>
          <p className="text-xs sm:text-sm lg:text-base text-plum-900/70 font-normal mt-2 max-w-xl mx-auto">
            Real whole meats and crisp farm vegetables — crafted with fresh ingredients that even you can eat.
          </p>
        </div>

        {/* ═══ DESKTOP COMPACT ORBITAL CANVAS ════════════════════════════════ */}
        <div className="hidden lg:block relative w-full h-[520px] lg:h-[540px] max-w-[760px] mx-auto">
          
          {/* Concentric Orbit Rings (Fills whitespace nicely with subtle structure) */}
          <div className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full border border-plum-900/[0.08] pointer-events-none z-0" />
          <div className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full border border-plum-900/[0.06] border-dashed pointer-events-none z-0" />
          <div className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-gradient-to-tr from-amber-200/25 via-orange-100/30 to-teal-100/25 rounded-full blur-2xl pointer-events-none z-0" />

          {/* Curved Connector Lines (SVG) */}
          <svg
            viewBox="0 0 700 520"
            className="absolute inset-0 w-full h-full pointer-events-none z-1"
          >
            {TOP_5_INGREDIENTS.map((ing, idx) => {
              const isCurrent = idx === hoveredIdx;
              return (
                <g key={`path-${ing.id}`}>
                  {/* Dashed connector line */}
                  <path
                    d={ing.svgPath}
                    fill="none"
                    stroke={isCurrent ? ing.color : '#8f818b'}
                    strokeWidth={isCurrent ? '3' : '1.75'}
                    strokeDasharray={isCurrent ? 'none' : '4 5'}
                    strokeOpacity={isCurrent ? '0.95' : '0.35'}
                    strokeLinecap="round"
                    className="transition-all duration-300"
                  />
                  {/* Anchor dot at bowl edge */}
                  <circle
                    cx={ing.pulseEnd.x}
                    cy={ing.pulseEnd.y}
                    r={isCurrent ? '5' : '3'}
                    fill={isCurrent ? ing.color : '#8f818b'}
                    fillOpacity={isCurrent ? '1' : '0.5'}
                    className="transition-all duration-300"
                  />
                </g>
              );
            })}
          </svg>

          {/* Centerpiece 3D Bowl */}
          <div className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
            
            {/* Dynamic Halo Glow matching hovered ingredient */}
            <div
              className="absolute inset-0 rounded-full filter blur-2xl transition-all duration-500 -z-10 scale-110"
              style={{ backgroundColor: active.glowColor }}
            />

            {/* The 3D Ceramic Bowl Image */}
            <div className="relative w-52 h-52 lg:w-56 lg:h-56 rounded-full overflow-hidden shadow-2xl border-4 border-white transition-transform duration-500 ease-out hover:scale-105">
              <Image
                src="/images/ingredients/fresh-bowl-3d.jpg"
                alt="Freshly cooked dog food bowl with real ingredients"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* 5 Orbiting 3D Ingredient Nodes */}
          {TOP_5_INGREDIENTS.map((ing, idx) => {
            const isCurrent = idx === hoveredIdx;
            return (
              <div
                key={ing.id}
                onMouseEnter={() => setHoveredIdx(idx)}
                className={`absolute ${ing.desktopPos} z-20 group flex flex-col items-center cursor-pointer transition-all duration-300 ${
                  isCurrent ? 'scale-108' : 'hover:scale-105 opacity-90 hover:opacity-100'
                }`}
                style={{ maxWidth: '190px' }}
              >
                {/* 3D Ingredient Orb */}
                <div
                  className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-white transition-all duration-300 ${
                    isCurrent
                      ? 'shadow-xl ring-3 ring-offset-2'
                      : 'shadow-md border border-plum-900/10 hover:shadow-xl'
                  }`}
                  style={{
                    borderColor: isCurrent ? ing.color : 'transparent',
                    ringColor: ing.color,
                    boxShadow: isCurrent ? `0 14px 30px -4px ${ing.glowColor}` : '0 8px 20px -4px rgba(42, 24, 36, 0.08)',
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

                {/* Minimalist Title & Badge below */}
                <div className={`mt-2 ${ing.textAlign}`}>
                  <h4 className={`text-xs sm:text-sm font-black leading-snug transition-colors ${
                    isCurrent ? 'text-plum-900' : 'text-plum-900/80'
                  }`}>
                    {ing.name}
                  </h4>
                  <span
                    className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full inline-block mt-0.5"
                    style={{
                      backgroundColor: isCurrent ? `${ing.color}20` : '#f4efdf',
                      color: isCurrent ? ing.color : '#57585a',
                    }}
                  >
                    {ing.badge}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ═══ MOBILE / TABLET VIEW (< 1024px) ══════════════════════════════ */}
        <div className="lg:hidden flex flex-col items-center">
          
          {/* Center 3D Bowl */}
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden shadow-2xl border-4 border-white mb-6">
            <Image
              src="/images/ingredients/fresh-bowl-3d.jpg"
              alt="Freshly cooked dog food bowl"
              fill
              className="object-cover"
            />
          </div>

          {/* Clean 5-Item 3D Ingredients Grid */}
          <div className="w-full flex flex-wrap justify-center gap-2.5 sm:gap-4 max-w-xl mx-auto">
            {TOP_5_INGREDIENTS.map((ing, idx) => {
              const isCurrent = idx === hoveredIdx;
              return (
                <button
                  key={ing.id}
                  type="button"
                  onClick={() => setHoveredIdx(idx)}
                  className={`p-3 rounded-2xl flex flex-col items-center text-center transition-all cursor-pointer w-[140px] sm:w-[160px] ${
                    isCurrent
                      ? 'bg-white shadow-lg ring-2 ring-plum-900 scale-102'
                      : 'bg-white/80 hover:bg-white border border-plum-900/10 shadow-xs'
                  }`}
                >
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden mb-2 p-1 bg-cream-50">
                    <Image
                      src={ing.image}
                      alt={ing.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h4 className="text-xs font-black text-plum-900 leading-tight">
                    {ing.name}
                  </h4>
                  <span
                    className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full inline-block mt-1"
                    style={{
                      backgroundColor: `${ing.color}20`,
                      color: ing.color,
                    }}
                  >
                    {ing.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Minimal Bottom CTA Button */}
        <div className="text-center mt-8 sm:mt-10">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-plum-900 hover:bg-plum-800 text-white font-black text-xs sm:text-sm px-6 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Explore Our Fresh Recipes</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

    </section>
  );
}

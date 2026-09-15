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
    desktopPos: 'left-[2%] top-[8%]',
    textAlign: 'text-center sm:text-left',
    svgPath: 'M 160 170 C 220 200, 240 240, 310 290',
    pulseEnd: { x: 310, y: 290 },
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
    svgPath: 'M 400 160 C 385 180, 415 205, 400 225',
    pulseEnd: { x: 400, y: 225 },
  },
  {
    id: 'peas',
    name: 'Sweet Garden Peas',
    badge: 'Plant Energy & Zinc',
    color: '#15aec0',
    glowColor: 'rgba(21, 174, 192, 0.35)',
    image: '/images/ingredients/peas-3d.jpg',
    desktopPos: 'right-[2%] top-[8%]',
    textAlign: 'text-center sm:text-right',
    svgPath: 'M 640 170 C 580 200, 560 240, 490 290',
    pulseEnd: { x: 490, y: 290 },
  },
  {
    id: 'lamb',
    name: 'Lean Pasture Lamb',
    badge: 'Iron & Muscle Repair',
    color: '#db4d2c',
    glowColor: 'rgba(219, 77, 44, 0.35)',
    image: '/images/ingredients/lamb-3d.jpg',
    desktopPos: 'right-[6%] bottom-[2%]',
    textAlign: 'text-center sm:text-right',
    svgPath: 'M 630 530 C 570 500, 550 450, 490 410',
    pulseEnd: { x: 490, y: 410 },
  },
  {
    id: 'pumpkin',
    name: 'Golden Sun Pumpkin',
    badge: 'Gentle Prebiotic Fiber',
    color: '#ea580c',
    glowColor: 'rgba(234, 88, 12, 0.35)',
    image: '/images/ingredients/pumpkin-3d.jpg',
    desktopPos: 'left-[6%] bottom-[2%]',
    textAlign: 'text-center sm:text-left',
    svgPath: 'M 170 530 C 230 500, 250 450, 310 410',
    pulseEnd: { x: 310, y: 410 },
  },
];

export default function IngredientsSection() {
  const [hoveredIdx, setHoveredIdx] = useState(1); // default carrot active

  const active = TOP_5_INGREDIENTS[hoveredIdx] || TOP_5_INGREDIENTS[1];

  return (
    <section id="ingredients-section" className="py-16 sm:py-24 bg-[#faf6ed] border-b border-plum-900/5 relative overflow-hidden">
      
      {/* Background Subtle Warm Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-main max-w-6xl relative z-10">
        
        {/* ─── Ingredient-Focused Phrase & Minimal Header ──────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[64px] font-black text-plum-900 tracking-tight leading-[1.05]">
            Food So Real, You Could Eat It Yourself.
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-plum-900/75 font-normal mt-3 max-w-2xl mx-auto">
            Real whole meats and crisp farm vegetables — crafted with fresh ingredients that even you can eat.
          </p>
        </div>

        {/* ═══ DESKTOP ORBITAL CANVAS (No enclosing box) ════════════════════ */}
        <div className="hidden lg:block relative w-full h-[720px] xl:h-[760px] max-w-5xl mx-auto">
          
          {/* Curved Connector Lines (SVG) */}
          <svg
            viewBox="0 0 800 650"
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
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
                    strokeWidth={isCurrent ? '3.5' : '2'}
                    strokeDasharray={isCurrent ? 'none' : '5 6'}
                    strokeOpacity={isCurrent ? '0.95' : '0.35'}
                    strokeLinecap="round"
                    className="transition-all duration-300"
                  />
                  {/* Anchor dot at bowl edge */}
                  <circle
                    cx={ing.pulseEnd.x}
                    cy={ing.pulseEnd.y}
                    r={isCurrent ? '5.5' : '3.5'}
                    fill={isCurrent ? ing.color : '#8f818b'}
                    fillOpacity={isCurrent ? '1' : '0.5'}
                    className="transition-all duration-300"
                  />
                </g>
              );
            })}
          </svg>

          {/* Centerpiece 3D Bowl */}
          <div className="absolute top-[53%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
            
            {/* Dynamic Halo Glow matching hovered ingredient */}
            <div
              className="absolute inset-0 rounded-full filter blur-2xl transition-all duration-500 -z-10 scale-110"
              style={{ backgroundColor: active.glowColor }}
            />

            {/* The 3D Ceramic Bowl Image */}
            <div className="relative w-60 h-60 xl:w-68 xl:h-68 rounded-full overflow-hidden shadow-2xl border-4 border-white transition-transform duration-500 ease-out hover:scale-105">
              <Image
                src="/images/ingredients/fresh-bowl-3d.jpg"
                alt="Freshly cooked dog food bowl with real ingredients"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* 5 Orbiting 3D Ingredient Nodes (Enlarged) */}
          {TOP_5_INGREDIENTS.map((ing, idx) => {
            const isCurrent = idx === hoveredIdx;
            return (
              <div
                key={ing.id}
                onMouseEnter={() => setHoveredIdx(idx)}
                className={`absolute ${ing.desktopPos} z-20 group flex flex-col items-center cursor-pointer transition-all duration-300 ${
                  isCurrent ? 'scale-110' : 'hover:scale-105 opacity-90 hover:opacity-100'
                }`}
                style={{ maxWidth: '210px' }}
              >
                {/* 3D Ingredient Orb — Significantly Enlarged */}
                <div
                  className={`relative w-28 h-28 sm:w-32 sm:h-32 xl:w-36 xl:h-36 rounded-full p-1.5 bg-white transition-all duration-300 ${
                    isCurrent
                      ? 'shadow-2xl ring-4 ring-offset-2'
                      : 'shadow-lg border border-plum-900/10 hover:shadow-2xl'
                  }`}
                  style={{
                    borderColor: isCurrent ? ing.color : 'transparent',
                    ringColor: ing.color,
                    boxShadow: isCurrent ? `0 16px 36px -6px ${ing.glowColor}` : '0 10px 24px -4px rgba(42, 24, 36, 0.08)',
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
                <div className={`mt-2.5 ${ing.textAlign}`}>
                  <h4 className={`text-sm xl:text-base font-black transition-colors ${
                    isCurrent ? 'text-plum-900' : 'text-plum-900/80'
                  }`}>
                    {ing.name}
                  </h4>
                  <span
                    className="text-[10px] xl:text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full inline-block mt-1"
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
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full overflow-hidden shadow-2xl border-4 border-white mb-8">
            <Image
              src="/images/ingredients/fresh-bowl-3d.jpg"
              alt="Freshly cooked dog food bowl"
              fill
              className="object-cover"
            />
          </div>

          {/* Clean 5-Item 3D Ingredients Grid (Enlarged) */}
          <div className="w-full flex flex-wrap justify-center gap-3 sm:gap-5 max-w-xl mx-auto">
            {TOP_5_INGREDIENTS.map((ing, idx) => {
              const isCurrent = idx === hoveredIdx;
              return (
                <button
                  key={ing.id}
                  type="button"
                  onClick={() => setHoveredIdx(idx)}
                  className={`p-3.5 rounded-3xl flex flex-col items-center text-center transition-all cursor-pointer w-[150px] sm:w-[170px] ${
                    isCurrent
                      ? 'bg-white shadow-lg ring-2 ring-plum-900 scale-102'
                      : 'bg-white/80 hover:bg-white border border-plum-900/10 shadow-xs'
                  }`}
                >
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mb-2.5 p-1 bg-cream-50">
                    <Image
                      src={ing.image}
                      alt={ing.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h4 className="text-xs sm:text-sm font-black text-plum-900 leading-tight">
                    {ing.name}
                  </h4>
                  <span
                    className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full inline-block mt-1"
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
        <div className="text-center mt-10">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-plum-900 hover:bg-plum-800 text-white font-black text-xs sm:text-sm px-7 py-3 rounded-full shadow-md hover:shadow-lg transition-all"
          >
            <span>Explore Our Fresh Recipes</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

    </section>
  );
}

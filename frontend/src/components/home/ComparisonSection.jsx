'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { X, Check } from 'lucide-react';

const KIBBLE_LABELS = [
  { text: 'HIGHLY PROCESSED', pos: '-top-8 sm:-top-10 left-1/2 -translate-x-1/2', hideMobile: false },
  { text: 'FILLERS', pos: 'top-1/2 -translate-y-1/2 -left-5 sm:-left-6 -translate-x-full', hideMobile: true },
  { text: 'LOW MOISTURE', pos: '-bottom-8 sm:-bottom-10 left-1/2 -translate-x-1/2', hideMobile: false },
  { text: 'BY-PRODUCTS', pos: 'top-1/2 -translate-y-1/2 -right-5 sm:-right-6 translate-x-full', hideMobile: true },
];

const FURBOWL_LABELS = [
  { text: 'HUMAN GRADE INGREDIENTS', pos: '-top-8 sm:-top-10 left-1/2 -translate-x-1/2', hideMobile: false },
  { text: 'WHOLE MEATS', pos: 'top-1/2 -translate-y-1/2 -left-5 sm:-left-6 -translate-x-full', hideMobile: true },
  { text: 'HIGH MOISTURE', pos: '-bottom-8 sm:-bottom-10 left-1/2 -translate-x-1/2', hideMobile: false },
  { text: 'NO PRESERVATIVES', pos: 'top-1/2 -translate-y-1/2 -right-5 sm:-right-6 translate-x-full', hideMobile: true },
];

const KIBBLE_STATS = [
  { stat: '~10%', label: 'MOISTURE', sub: 'Severe dehydration, stressed kidneys' },
  { stat: '60%', label: 'FILLERS', sub: 'Corn, starch, and cheap bulk' },
  { stat: '200°C+', label: 'HEAT', sub: 'Destroys natural vitamins & enzymes' },
  { stat: 'BHA/BHT', label: 'PRESERVATIVES', sub: 'Synthetic chemicals for shelf life' },
];

const FURBOWL_STATS = [
  { stat: '75%+', label: 'MOISTURE', sub: 'Natural hydration from real food' },
  { stat: '0', label: 'FILLERS', sub: 'No starch, no unnecessary bulk' },
  { stat: '<85°C', label: 'GENTLE COOK', sub: 'Seals in vitamins & natural flavor' },
  { stat: '0', label: 'PRESERVATIVES', sub: 'Nothing artificial, ever' },
];

function StatCard({ card, showFurbowl, delay, labelsIn }) {
  const isLongStat = card.stat.length >= 6;
  const isMediumStat = card.stat.length >= 5;

  return (
    <div
      className={`rounded-lg p-4 sm:p-5 text-center border shadow-xs transition-all duration-500 flex flex-col justify-center ${
        showFurbowl ? 'bg-white border-teal-500/20' : 'bg-white border-peach-500/20'
      }`}
      style={{
        opacity: labelsIn ? 1 : 0,
        transform: labelsIn ? 'translateY(0)' : 'translateY(12px)',
        transitionDelay: `${delay}ms`,
      }}
    >
      <div
        className={`font-bold leading-tight mb-2 transition-colors duration-500 truncate ${
          isLongStat
            ? 'text-xl sm:text-2xl tracking-tight'
            : isMediumStat
            ? 'text-2xl sm:text-3xl tracking-tight'
            : 'text-3xl sm:text-4xl'
        } ${showFurbowl ? 'text-teal-600' : 'text-peach-600'}`}
      >
        {card.stat}
      </div>
      <div className="text-xs sm:text-sm font-bold text-plum-900 uppercase tracking-wider mb-1.5">
        {card.label}
      </div>
      <p className="text-xs sm:text-[13px] text-plum-900/60 font-medium leading-relaxed">
        {card.sub}
      </p>
    </div>
  );
}

export default function ComparisonSection() {
  const sectionRef = useRef(null);
  const [entered, setEntered] = useState(false);
  const [showFurbowl, setShowFurbowl] = useState(false);
  const [labelsIn, setLabelsIn] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setEntered(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  useEffect(() => {
    if (!entered) return;
    const t = setTimeout(() => setLabelsIn(true), 600);
    return () => clearTimeout(t);
  }, [entered]);

  useEffect(() => {
    if (!entered) return;

    const interval = setInterval(() => {
      setLabelsIn(false);
      setTimeout(() => { setShowFurbowl((prev) => !prev); }, 400);
      setTimeout(() => { setLabelsIn(true); }, 1200);
    }, 4000);

    return () => clearInterval(interval);
  }, [entered]);

  const stats = showFurbowl ? FURBOWL_STATS : KIBBLE_STATS;

  return (
    <section
      ref={sectionRef}
      id="comparison-section"
      className="py-16 sm:py-24 bg-[#faf6ed] border-b border-plum-900/5 overflow-hidden"
    >
      <div className="container-main max-w-6xl mx-auto">

        {/* ─── Headline ─── */}
        <div
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 transition-all duration-700 ease-out"
          style={{
            opacity: entered ? 1 : 0,
            transform: entered ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          <p className="text-sm sm:text-base font-bold uppercase tracking-widest text-teal-600 mb-3">
            THE BOWL TELLS THE STORY
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-plum-900 tracking-tight leading-tight">
            See The Difference
          </h2>
        </div>

        {/* ─── 3-Column: Left Stats | Bowl | Right Stats ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-[200px_auto_200px] gap-6 lg:gap-20 items-center justify-center">

          {/* Left Stats (cards 0 & 1) */}
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-3.5 lg:gap-4">
            {[0, 1].map((i) => (
              <StatCard
                key={`${showFurbowl ? 'fb' : 'kb'}-left-${i}`}
                card={stats[i]}
                showFurbowl={showFurbowl}
                labelsIn={labelsIn}
                delay={i * 80}
              />
            ))}
          </div>

          {/* Center: Flipping Bowl */}
          <div className="flex flex-col items-center justify-center order-first lg:order-none">
            <div className="relative" style={{ perspective: '1000px' }}>
              <div
                className="relative transition-transform duration-700 ease-in-out"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: showFurbowl ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >
                {/* ─── FRONT FACE: Kibble ─── */}
                <div
                  className="flex flex-col items-center"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="relative">
                    <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-plum-900/10 shadow-xl bg-stone-200">
                      <Image
                        src="/images/home/dry-kibble-bowl.jpg"
                        alt="Dry processed commercial kibble"
                        fill
                        className="object-cover filter grayscale-[30%]"
                        sizes="420px"
                      />
                      <div className="absolute inset-0 bg-black/20" />
                    </div>

                    {/* Floating X-Labels */}
                    {KIBBLE_LABELS.map((label, idx) => (
                      <div
                        key={idx}
                        className={`absolute ${label.pos} transition-all duration-500 z-10 ${label.hideMobile ? 'hidden lg:block' : ''}`}
                        style={{
                          opacity: labelsIn && !showFurbowl ? 1 : 0,
                          transform: labelsIn && !showFurbowl ? undefined : 'scale(0.8)',
                          transitionDelay: `${idx * 100}ms`,
                        }}
                      >
                        <span className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-sm border border-peach-500/30 text-peach-600 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md whitespace-nowrap">
                          <X className="w-3.5 h-3.5 stroke-[3]" />
                          {label.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 sm:mt-10 text-center">
                    <h3 className="text-2xl sm:text-3xl font-bold text-plum-900 uppercase tracking-tight">
                      Regular Dog Food
                    </h3>
                    <p className="text-base sm:text-lg text-plum-900/60 font-semibold mt-1">
                      Highly Processed
                    </p>
                  </div>
                </div>

                {/* ─── BACK FACE: FurBowl ─── */}
                <div
                  className="absolute inset-0 flex flex-col items-center"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <div className="relative">
                    <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-teal-500/40 shadow-2xl shadow-teal-500/15 bg-cream-100">
                      <Image
                        src="/images/home/fresh-dog-bowl.jpg"
                        alt="Fresh human-grade FurBowl meal"
                        fill
                        className="object-cover"
                        sizes="420px"
                      />
                    </div>

                    {/* Floating Check-Labels */}
                    {FURBOWL_LABELS.map((label, idx) => (
                      <div
                        key={idx}
                        className={`absolute ${label.pos} transition-all duration-500 z-10 ${label.hideMobile ? 'hidden lg:block' : ''}`}
                        style={{
                          opacity: labelsIn && showFurbowl ? 1 : 0,
                          transform: labelsIn && showFurbowl ? undefined : 'scale(0.8)',
                          transitionDelay: `${idx * 100}ms`,
                        }}
                      >
                        <span className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-sm border border-teal-500/30 text-teal-600 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md whitespace-nowrap">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          {label.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 sm:mt-10 text-center">
                    <h3 className="text-2xl sm:text-3xl font-bold text-plum-900 uppercase tracking-tight">
                      FurBowl
                    </h3>
                    <p className="text-base sm:text-lg text-teal-600 font-bold mt-1">
                      Real ingredients. Gently cooked.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Right Stats (cards 2 & 3) */}
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-3.5 lg:gap-4">
            {[2, 3].map((i) => (
              <StatCard
                key={`${showFurbowl ? 'fb' : 'kb'}-right-${i}`}
                card={stats[i]}
                showFurbowl={showFurbowl}
                labelsIn={labelsIn}
                delay={i * 80}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

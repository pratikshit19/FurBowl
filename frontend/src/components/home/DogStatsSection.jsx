'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Activity, ShieldCheck, Ban, Flame } from 'lucide-react';
import ScrollReveal from '@/components/common/ScrollReveal';

const STATS = [
  {
    id: 'digestion',
    number: '94%',
    title: 'Better Digestion',
    description: 'Pet parents report noticeably firmer, smaller stools and zero smelly gas within 7 days of fresh feeding.',
    highlight: '7-Day Turnaround',
    icon: Activity,
    image: '/images/home/pack/luna.jpg',
    dogName: 'Luna, 2 yrs',
    accentColor: 'text-teal-600',
    borderColor: 'border-teal-200/80',
    bgLight: 'bg-white shadow-xs hover:shadow-lg',
  },
  {
    id: 'human-grade',
    number: '100%',
    title: 'Human-Grade Standard',
    description: 'Prepared in commercial kitchens with the exact fresh whole meats, farm veggies, and oils you would eat yourself.',
    highlight: 'Zero Compromises',
    icon: ShieldCheck,
    image: '/images/home/fresh-pumpkin.jpg',
    dogName: 'Fresh Real Food',
    accentColor: 'text-peach-600',
    borderColor: 'border-peach-200/80',
    bgLight: 'bg-white shadow-xs hover:shadow-lg',
  },
  {
    id: 'fillers',
    number: '0%',
    title: 'Chemical Fillers',
    description: 'Zero artificial preservatives, corn, wheat, soy, or rendered meat meals ever touch your dog’s bowl.',
    highlight: 'Clean Nutrition',
    icon: Ban,
    image: '/images/home/pack/oreo.jpg',
    dogName: 'Oreo, 3 yrs',
    accentColor: 'text-teal-600',
    borderColor: 'border-teal-200/80',
    bgLight: 'bg-white shadow-xs hover:shadow-lg',
  },
  {
    id: 'simmer',
    number: '12+ Hrs',
    title: 'Collagen Bone Simmer',
    description: 'Slow-simmered chicken bone broth rich in natural collagen and glucosamine for lubricated joints and shiny fur.',
    highlight: 'Joint & Coat Vitality',
    icon: Flame,
    image: '/images/home/bruno-passport-dog.jpg',
    dogName: 'Bruno, 4 yrs',
    accentColor: 'text-peach-600',
    borderColor: 'border-peach-200/80',
    bgLight: 'bg-white shadow-xs hover:shadow-lg',
  },
];

export default function DogStatsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, offsetWidth } = scrollRef.current;
    const cardWidth = offsetWidth * 0.78;
    const index = Math.round(scrollLeft / (cardWidth || 1));
    setActiveIndex(Math.min(Math.max(0, index), STATS.length - 1));
  };

  return (
    <section id="dog-stats-section" className="py-14 sm:py-20 lg:py-24 relative overflow-hidden bg-white border-b border-plum-900/5">
      {/* Low-opacity large dog shifted up in the top-middle behind the stats */}
      <div className="absolute inset-0 flex items-start justify-center pt-6 sm:pt-12 pointer-events-none select-none z-0 overflow-hidden">
        <div className="relative w-[500px] h-[500px] sm:w-[650px] sm:h-[650px] lg:w-[800px] lg:h-[800px] opacity-20 mix-blend-multiply [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_75%)]">
          <Image
            src="/images/home/hero-golden-dog.jpg"
            alt=""
            fill
            className="object-contain"
            priority={false}
          />
        </div>
      </div>

      <div className="container-main relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16 px-2">
          <p className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-teal-600 mb-2 sm:mb-3">
            Proven Canine Results
          </p>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-plum-900 tracking-tight">
            Visible Health Stats for Dogs
          </h2>
          <p className="text-plum-900/70 text-xs sm:text-base leading-relaxed mt-2 sm:mt-2.5 font-normal">
            Every FurBowl recipe is calibrated to deliver visible, measurable health improvements you can see in your dog&apos;s daily vitality.
          </p>
        </div>

        {/* Responsive Track: Swipeable Carousel on Mobile, 2/4-Col Grid on Tablet/Desktop */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto sm:overflow-visible pb-4 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth no-scrollbar [&::-webkit-scrollbar]:hidden snap-x snap-mandatory items-stretch"
        >
          {STATS.map((stat) => (
            <div
              key={stat.id}
              className="w-[78vw] max-w-[290px] sm:w-auto shrink-0 snap-start h-full"
            >
              <div
                className={`rounded-xl p-5 sm:p-7 border ${stat.borderColor} ${stat.bgLight} transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden relative group h-full`}
              >
                <div>
                  {/* Top: Stat Number + Dog Avatar */}
                  <div className="flex items-center justify-between mb-4 sm:mb-5">
                    <span className={`text-4xl sm:text-5xl font-bold tracking-tight ${stat.accentColor}`}>
                      {stat.number}
                    </span>
                    <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-lg overflow-hidden border-2 border-white shadow-sm shrink-0">
                      <Image
                        src={stat.image}
                        alt={stat.dogName}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-plum-900 mb-2 leading-snug">
                    {stat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-plum-900/70 leading-relaxed font-normal">
                    {stat.description}
                  </p>
                </div>

                <div className="mt-5 sm:mt-6 pt-3 border-t border-plum-900/10 flex items-center justify-between">
                  <span className="text-[10.5px] sm:text-[11px] font-bold text-plum-900/60 uppercase tracking-wider">
                    {stat.highlight}
                  </span>
                  <span className="text-[10px] font-bold text-plum-900/40">
                    {stat.dogName}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Dot Indicators */}
        <div className="flex sm:hidden justify-center items-center gap-1.5 mt-3">
          {STATS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                if (scrollRef.current) {
                  const cardWidth = scrollRef.current.offsetWidth * 0.78;
                  scrollRef.current.scrollTo({ left: i * cardWidth, behavior: 'smooth' });
                }
              }}
              aria-label={`Go to stat ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === i ? 'w-5 bg-teal-600' : 'w-1.5 bg-teal-600/25'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

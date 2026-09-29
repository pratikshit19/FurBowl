'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Leaf, ShieldCheck, Utensils, Sparkles } from 'lucide-react';

const WHY_FURBOWL_CARDS = [
  {
    id: 'fresh-ingredients',
    heading: 'Fresh, Real Ingredients',
    subheading: 'Real meat, fresh vegetables & wholesome superfoods — nothing artificial.',
    bgColor: '#fdf1ea',
    accentColor: '#ea6f58',
    iconBg: '#ea6f58',
    badge: '100% Whole Foods',
    image: '/images/why-furbowl/fresh-ingredients.jpg',
    objectPosition: 'object-[center_62%]',
    icon: <Leaf className="w-5 h-5 text-white" strokeWidth={2.2} />,
  },
  {
    id: 'balanced-nutrition',
    heading: '0% Artificial Preservatives',
    subheading: 'Freshly cooked & flash-frozen. Zero synthetic chemicals or shelf-life extenders.',
    bgColor: '#edf7f1',
    accentColor: '#15aec0',
    iconBg: '#15aec0',
    badge: 'Steam-Cooked Fresh',
    image: '/images/why-furbowl/no-preservatives.jpg',
    objectPosition: 'object-[center_55%]',
    icon: <ShieldCheck className="w-5 h-5 text-white" strokeWidth={2.2} />,
  },
  {
    id: 'human-grade',
    heading: '100% Human-Grade',
    subheading: 'Clean culinary kitchen standards. Food so safe and wholesome you could eat it.',
    bgColor: '#fdf6e7',
    accentColor: '#e3a438',
    iconBg: '#e3a438',
    badge: 'Table-Grade Quality',
    image: '/images/why-furbowl/human-grade.jpg',
    objectPosition: 'object-[center_50%]',
    icon: <Utensils className="w-5 h-5 text-white" strokeWidth={2.2} />,
  },
  {
    id: 'no-colours',
    heading: 'No Artificial Colours',
    subheading: 'Vibrant natural hues extracted purely from carrots, beets, spinach & turmeric.',
    bgColor: '#eaf4f2',
    accentColor: '#0c889a',
    iconBg: '#0c889a',
    badge: '0% Synthetic Dyes',
    image: '/images/why-furbowl/no-colours.jpg',
    objectPosition: 'object-center',
    icon: <Sparkles className="w-5 h-5 text-white" strokeWidth={2.2} />,
  },
];

export default function WhyFurBowlSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, offsetWidth } = scrollRef.current;
    const cardWidth = offsetWidth * 0.78;
    const index = Math.round(scrollLeft / (cardWidth || 1));
    setActiveIndex(Math.min(Math.max(0, index), WHY_FURBOWL_CARDS.length - 1));
  };

  return (
    <section id="why-furbowl-section" className="py-14 sm:py-18 lg:py-24 bg-white border-b border-plum-900/5 relative overflow-hidden">
      <div className="container-main max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 lg:mb-20 px-2">
          <p className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#804a3e] mb-2 sm:mb-2.5">
            WHY FURBOWL?
          </p>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            <span className="text-[#0c889a] block sm:inline">Fresh Food,</span>{' '}
            <span className="text-[#e66a52] block sm:inline">Made the FurBowl way</span>
          </h2>
          <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-plum-900/65 font-normal max-w-lg mx-auto leading-relaxed">
            Every bowl is crafted with real meat, human-grade produce, and scientifically balanced nutrients — pure wellness in every bite.
          </p>
        </div>

        {/* Responsive Track: Swipeable Carousel on Mobile, 4-Col Grid on Desktop */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          className="flex lg:grid lg:grid-cols-4 gap-4 sm:gap-5 overflow-x-auto lg:overflow-visible pb-4 pt-2 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 scroll-smooth no-scrollbar [&::-webkit-scrollbar]:hidden snap-x snap-mandatory items-stretch scroll-pl-4 sm:scroll-pl-6 lg:scroll-pl-0"
        >
          {WHY_FURBOWL_CARDS.map((card) => (
            <div
              key={card.id}
              className="w-[80vw] max-w-[300px] sm:w-[320px] lg:max-w-none lg:w-full shrink-0 snap-start flex flex-col relative group"
            >
              {/* Desktop: Dog peeking over Card 4 */}
              {card.id === 'no-colours' && (
                <div className="hidden lg:block absolute -top-[195px] xl:-top-[235px] left-1/2 -translate-x-1/2 w-[200px] h-[245px] xl:w-[240px] xl:h-[294px] pointer-events-none z-30 transition-transform duration-300 group-hover:-translate-y-1">
                  <Image
                    src="/images/why-furbowl/dog-perfect-peeking.png"
                    alt="Happy Dog with sunglasses taking support on card"
                    fill
                    sizes="(min-width: 1280px) 240px, 200px"
                    className="object-contain object-bottom drop-shadow-md"
                    priority
                  />
                </div>
              )}

              {/* Card Container */}
              <div
                className="relative rounded-2xl p-4 sm:p-5 h-full flex flex-col justify-between border border-plum-900/10 shadow-xs hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 overflow-hidden"
                style={{ backgroundColor: card.bgColor }}
              >
                {/* Upper Content */}
                <div>
                  <div
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-105"
                    style={{ backgroundColor: card.iconBg }}
                  >
                    {card.icon}
                  </div>
                  <h3 className="font-semibold text-base sm:text-lg text-[#2d1723] tracking-tight leading-snug mt-3 sm:mt-3.5 group-hover:text-plum-950 transition-colors">
                    {card.heading}
                  </h3>
                  <p className="text-xs sm:text-[12.5px] text-[#422834]/80 font-normal leading-relaxed mt-1 sm:mt-1.5">
                    {card.subheading}
                  </p>
                </div>

                {/* Bottom High-Quality Photography Frame */}
                <div className="relative w-full h-[175px] sm:h-[195px] lg:h-[210px] mt-4 rounded-xl overflow-hidden shadow-xs border border-plum-900/10 group-hover:border-plum-900/20 transition-all duration-300 bg-white/40">
                  <Image
                    src={card.image}
                    alt={card.heading}
                    fill
                    sizes="(min-width: 1024px) 25vw, 80vw"
                    className={`object-cover ${card.objectPosition} transition-transform duration-700 ease-out group-hover:scale-108`}
                  />
                  {/* Gentle gradient overlay for contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent pointer-events-none transition-opacity duration-300 group-hover:from-black/45" />

                  {/* Floating Micro-Badge */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-plum-950 text-[10px] sm:text-[10.5px] font-semibold shadow-sm border border-white/60">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: card.accentColor }} />
                      <span>{card.badge}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Dot Indicators */}
        <div className="flex lg:hidden justify-center items-center gap-1.5 mt-4">
          {WHY_FURBOWL_CARDS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                if (scrollRef.current) {
                  const cardWidth = scrollRef.current.offsetWidth * 0.78;
                  scrollRef.current.scrollTo({ left: i * cardWidth, behavior: 'smooth' });
                }
              }}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === i ? 'w-5 bg-[#0c889a]' : 'w-1.5 bg-[#0c889a]/25'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

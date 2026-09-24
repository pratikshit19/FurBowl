'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import ScrollReveal from '@/components/common/ScrollReveal';

const WHY_FURBOWL_CARDS = [
  {
    id: 'fresh-ingredients',
    heading: 'Fresh, Real Ingredients',
    subheading: 'Real meat, vegetables & wholesome ingredients — nothing artificial.',
    bgColor: '#fee7da',
    accentColor: '#ea6f58',
    iconBg: '#ea6f58',
    illustrationBg: '#f9d4c4',
    icon: (
      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </svg>
    ),
    illustration: (
      <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Chicken breast */}
        <ellipse cx="80" cy="130" rx="55" ry="38" fill="#f7c4a0" />
        <ellipse cx="80" cy="128" rx="48" ry="32" fill="#f9d4b8" />
        <path d="M50 120 Q80 105 110 122" stroke="#e8a07a" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M55 130 Q80 118 105 132" stroke="#e8a07a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* Carrot */}
        <path d="M155 80 L145 145 L165 145 Z" fill="#ff8c42" />
        <path d="M155 80 L148 150 L162 150 Z" fill="#ff7a2e" />
        <ellipse cx="155" cy="80" rx="12" ry="8" fill="#ff8c42" />
        <path d="M148 78 Q155 65 162 78" fill="#5cb85c" stroke="none" />
        <path d="M144 76 Q151 60 158 72" stroke="#4a9e4a" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M158 76 Q165 62 168 74" stroke="#4a9e4a" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Pumpkin slice */}
        <path d="M195 95 Q230 85 245 120 Q240 150 210 155 Q185 150 190 120 Z" fill="#ffb347" />
        <path d="M195 95 Q230 85 245 120 Q240 150 210 155 Q185 150 190 120 Z" fill="none" stroke="#e8922a" strokeWidth="2" />
        <ellipse cx="218" cy="126" rx="18" ry="22" fill="#ff9a1c" opacity="0.5" />
        {/* Peas */}
        <circle cx="60" cy="165" r="8" fill="#6abf69" />
        <circle cx="78" cy="162" r="8" fill="#5cb85c" />
        <circle cx="96" cy="165" r="8" fill="#6abf69" />
        {/* Blueberries */}
        <circle cx="185" cy="165" r="9" fill="#5b4fcf" />
        <circle cx="200" cy="160" r="9" fill="#6b5fd6" />
        <circle cx="215" cy="165" r="9" fill="#5b4fcf" />
        <circle cx="207" cy="174" r="8" fill="#6b5fd6" />
        <circle cx="193" cy="174" r="8" fill="#5b4fcf" />
        {/* Spinach leaf */}
        <path d="M120 140 Q140 110 160 140 Q150 165 130 165 Q115 158 120 140Z" fill="#4caf50" />
        <path d="M120 140 Q140 125 160 140" stroke="#388e3c" strokeWidth="1.5" fill="none" />
        <path d="M128 158 Q140 145 152 158" stroke="#388e3c" strokeWidth="1" fill="none" />
        <line x1="140" y1="140" x2="140" y2="163" stroke="#388e3c" strokeWidth="1.5" />
        {/* Rice grains */}
        <ellipse cx="108" cy="155" rx="4" ry="2" fill="#f5f0e8" transform="rotate(-20 108 155)" />
        <ellipse cx="116" cy="160" rx="4" ry="2" fill="#ece7d8" transform="rotate(15 116 160)" />
        <ellipse cx="104" cy="163" rx="4" ry="2" fill="#f5f0e8" transform="rotate(-30 104 163)" />
        <ellipse cx="120" cy="155" rx="4" ry="2" fill="#ece7d8" transform="rotate(10 120 155)" />
      </svg>
    ),
  },
  {
    id: 'balanced-nutrition',
    heading: '0% Artificial Preservatives',
    subheading: 'Nothing artificial added to extend shelf life.',
    bgColor: '#e2f2e8',
    accentColor: '#009ca8',
    iconBg: '#009ca8',
    illustrationBg: '#c8e6d0',
    icon: (
      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2v7.31L4.29 18.5A2 2 0 0 0 6 21.5h12a2 2 0 0 0 1.71-3L14 9.31V2" />
        <line x1="8.5" y1="2" x2="15.5" y2="2" />
        <line x1="3" y1="3" x2="21" y2="21" strokeWidth="2.5" />
      </svg>
    ),
    illustration: (
      <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Bowl outer */}
        <ellipse cx="140" cy="95" rx="90" ry="20" fill="#e8e0d8" />
        <path d="M52 95 Q50 158 140 168 Q230 158 228 95 Z" fill="#f0ebe3" />
        <path d="M52 95 Q50 158 140 168 Q230 158 228 95 Z" fill="none" stroke="#d9d0c5" strokeWidth="2" />
        {/* Bowl rim highlight */}
        <ellipse cx="140" cy="95" rx="90" ry="20" fill="none" stroke="#cec4b8" strokeWidth="3" />
        <ellipse cx="140" cy="95" rx="84" ry="17" fill="#e2d9d0" />
        {/* Food in bowl - shredded chicken */}
        <ellipse cx="140" cy="95" rx="80" ry="16" fill="#d4a574" />
        {/* Rice base */}
        {[...Array(12)].map((_, i) => (
          <ellipse key={i} cx={100 + (i % 4) * 18} cy={92 + Math.floor(i / 4) * 8} rx="5" ry="2.5" fill="#f0ece4" transform={`rotate(${i * 25} ${100 + (i % 4) * 18} ${92 + Math.floor(i / 4) * 8})`} />
        ))}
        {/* Chicken shreds */}
        <path d="M105 88 Q115 82 125 88 Q120 95 110 95 Z" fill="#e8c49a" />
        <path d="M130 85 Q142 78 152 84 Q148 93 136 93 Z" fill="#ddb882" />
        <path d="M155 88 Q163 83 170 88 Q167 96 158 95 Z" fill="#e8c49a" />
        {/* Carrots */}
        <ellipse cx="118" cy="100" rx="6" ry="3.5" fill="#ff8c42" />
        <ellipse cx="158" cy="97" rx="6" ry="3.5" fill="#ff8c42" />
        {/* Peas */}
        <circle cx="135" cy="98" r="4" fill="#6abf69" />
        <circle cx="147" cy="103" r="4" fill="#5cb85c" />
        <circle cx="125" cy="104" r="4" fill="#6abf69" />
        {/* FurBowl text on bowl */}
        <text x="140" y="145" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="13" fill="#b0a090" letterSpacing="1">FurBowl</text>
        {/* Steam wisps */}
        <path d="M115 70 Q112 58 116 46 Q120 34 117 22" stroke="#009ca8" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.5" />
        <path d="M140 65 Q137 52 141 40 Q145 28 142 15" stroke="#009ca8" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.5" />
        <path d="M165 70 Q162 58 166 46 Q170 34 167 22" stroke="#009ca8" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
  },
  {
    id: 'no-preservatives',
    heading: '100% Human-Grade',
    subheading: 'Food humans can also eat.',
    bgColor: '#fcedcf',
    accentColor: '#e3a438',
    iconBg: '#e3a438',
    illustrationBg: '#f7dfa0',
    icon: (
      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    illustration: (
      <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Shield/badge */}
        <path d="M140 20 L195 45 L195 110 Q195 155 140 180 Q85 155 85 110 L85 45 Z" fill="#e3a438" opacity="0.15" />
        <path d="M140 28 L188 50 L188 110 Q188 148 140 170 Q92 148 92 110 L92 50 Z" fill="#e3a438" opacity="0.2" />
        <path d="M140 36 L181 56 L181 110 Q181 142 140 160 Q99 142 99 110 L99 56 Z" fill="#e3a438" opacity="0.3" />
        {/* Big checkmark */}
        <path d="M112 108 L130 128 L168 88" stroke="#e3a438" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
        {/* Person silhouette (human grade) */}
        <circle cx="218" cy="145" r="14" fill="#e3a438" opacity="0.8" />
        <path d="M204 180 Q204 162 218 158 Q232 162 232 180" fill="#e3a438" opacity="0.8" />
        {/* Dog silhouette */}
        <ellipse cx="62" cy="158" rx="22" ry="14" fill="#e3a438" opacity="0.8" />
        <circle cx="78" cy="148" r="10" fill="#e3a438" opacity="0.8" />
        <ellipse cx="84" cy="143" rx="7" ry="4" fill="#e3a438" opacity="0.8" transform="rotate(-20 84 143)" />
        <line x1="42" y1="158" x2="38" y2="174" stroke="#e3a438" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
        <line x1="52" y1="162" x2="50" y2="178" stroke="#e3a438" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
        <line x1="72" y1="162" x2="72" y2="178" stroke="#e3a438" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
        <line x1="82" y1="160" x2="84" y2="176" stroke="#e3a438" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
        {/* Equals / same quality line */}
        <line x1="96" y1="155" x2="110" y2="155" stroke="#e3a438" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
        <line x1="96" y1="163" x2="110" y2="163" stroke="#e3a438" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
        {/* 100% label */}
        <text x="140" y="188" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="14" fill="#c07c10" letterSpacing="1">HUMAN GRADE</text>
      </svg>
    ),
  },
  {
    id: 'no-colours',
    heading: 'No Artificial Colours',
    subheading: 'Nothing artificial added for colour or appearance.',
    bgColor: '#dfeae5',
    accentColor: '#009ca8',
    iconBg: '#009ca8',
    illustrationBg: '#b8d8cc',
    icon: (
      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13.5" cy="6.5" r="0.5" fill="currentColor" />
        <circle cx="17.5" cy="10.5" r="0.5" fill="currentColor" />
        <circle cx="8.5" cy="7.5" r="0.5" fill="currentColor" />
        <circle cx="6.5" cy="12.5" r="0.5" fill="currentColor" />
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
        <line x1="2" y1="2" x2="22" y2="22" strokeWidth="2.5" />
      </svg>
    ),
    illustration: (
      <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Natural colour palette: real ingredient colours shown */}
        {/* Carrot orange circle */}
        <circle cx="80" cy="90" r="38" fill="#ff8c42" opacity="0.9" />
        <text x="80" y="86" textAnchor="middle" fontFamily="Arial" fontWeight="bold" fontSize="9" fill="white">CARROT</text>
        <text x="80" y="98" textAnchor="middle" fontFamily="Arial" fontWeight="bold" fontSize="9" fill="white">ORANGE</text>
        {/* Spinach green circle */}
        <circle cx="140" cy="75" r="38" fill="#4caf50" opacity="0.9" />
        <text x="140" y="71" textAnchor="middle" fontFamily="Arial" fontWeight="bold" fontSize="9" fill="white">SPINACH</text>
        <text x="140" y="83" textAnchor="middle" fontFamily="Arial" fontWeight="bold" fontSize="9" fill="white">GREEN</text>
        {/* Blueberry purple circle */}
        <circle cx="200" cy="90" r="38" fill="#5b4fcf" opacity="0.9" />
        <text x="200" y="86" textAnchor="middle" fontFamily="Arial" fontWeight="bold" fontSize="9" fill="white">BLUEBERRY</text>
        <text x="200" y="98" textAnchor="middle" fontFamily="Arial" fontWeight="bold" fontSize="9" fill="white">PURPLE</text>
        {/* Pumpkin yellow circle */}
        <circle cx="110" cy="145" r="38" fill="#ffb347" opacity="0.9" />
        <text x="110" y="141" textAnchor="middle" fontFamily="Arial" fontWeight="bold" fontSize="9" fill="white">PUMPKIN</text>
        <text x="110" y="153" textAnchor="middle" fontFamily="Arial" fontWeight="bold" fontSize="9" fill="white">YELLOW</text>
        {/* Chicken pink circle */}
        <circle cx="175" cy="148" r="38" fill="#f7a08a" opacity="0.9" />
        <text x="175" y="144" textAnchor="middle" fontFamily="Arial" fontWeight="bold" fontSize="9" fill="white">CHICKEN</text>
        <text x="175" y="156" textAnchor="middle" fontFamily="Arial" fontWeight="bold" fontSize="9" fill="white">PINK</text>
        {/* Big X / No symbol overlay */}
        <circle cx="140" cy="110" r="52" fill="none" stroke="#009ca8" strokeWidth="5" opacity="0.85" />
        <line x1="103" y1="73" x2="177" y2="147" stroke="#009ca8" strokeWidth="5" strokeLinecap="round" opacity="0.85" />
        {/* label */}
        <rect x="90" y="178" width="100" height="18" rx="9" fill="#009ca8" opacity="0.9" />
        <text x="140" y="191" textAnchor="middle" fontFamily="Arial" fontWeight="bold" fontSize="10" fill="white" letterSpacing="0.5">COLOURS-FREE</text>
      </svg>
    ),
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
    <section id="why-furbowl-section" className="py-12 sm:py-16 lg:py-20 bg-white border-b border-plum-900/5 relative overflow-hidden">
      <div className="container-main max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-14 lg:mb-20 px-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#fbe7dc] text-[#804a3e] text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-2.5 sm:mb-3 shadow-2xs">
            <span>🐾</span>
            <span>Why FurBowl?</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            <span className="text-[#0c889a] block sm:inline">Fresh Food,</span>{' '}
            <span className="text-[#e66a52] block sm:inline">Made the FurBowl way</span>
          </h2>
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
              className="w-[78vw] max-w-[290px] sm:w-[320px] lg:max-w-none lg:w-full shrink-0 snap-start flex flex-col relative group"
            >
              {/* Desktop: Dog peeking over Card 4 — responsive sizes for lg & xl */}
              {card.id === 'no-colours' && (
                <div className="hidden lg:block absolute -top-[200px] xl:-top-[240px] left-1/2 -translate-x-1/2 w-[200px] h-[245px] xl:w-[240px] xl:h-[294px] pointer-events-none z-30 transition-transform duration-300 group-hover:-translate-y-1">
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

              <div
                className="relative rounded-lg sm:rounded-xl p-5 sm:p-6 pb-0 sm:pb-0 h-full flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300 group-hover:-translate-y-1 overflow-hidden"
                style={{ backgroundColor: card.bgColor }}
              >
                {/* Upper Content */}
                <div>
                  <div
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: card.iconBg }}
                  >
                    {card.icon}
                  </div>
                  <h3 className="font-bold text-base sm:text-lg lg:text-xl text-[#2d1723] tracking-tight leading-snug mt-3 sm:mt-4 group-hover:text-plum-950 transition-colors">
                    {card.heading}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#422834]/85 font-normal leading-relaxed mt-1.5 sm:mt-2">
                    {card.subheading}
                  </p>
                </div>

                {/* Bottom SVG Illustration */}
                <div className="w-full h-[150px] sm:h-[175px] lg:h-[195px] mt-2.5 sm:mt-3 flex items-center justify-center select-none pointer-events-none transition-transform duration-500 group-hover:scale-105">
                  {card.illustration}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Dot Indicators */}
        <div className="flex lg:hidden justify-center items-center gap-1.5 mt-3">
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
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === i ? 'w-5 bg-[#0c889a]' : 'w-1.5 bg-[#0c889a]/25'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

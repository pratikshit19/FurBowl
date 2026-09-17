'use client';

import Image from 'next/image';
import Link from 'next/link';
import { PawPrint, ArrowDown, Utensils, ShieldCheck, Scale, Heart } from 'lucide-react';

export default function HeroMockup() {
  const scrollToMenu = (e) => {
    e.preventDefault();
    const el = document.getElementById('menu-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/shop';
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-butter-200/50 via-white to-butter-100/30 pt-8 sm:pt-12 pb-14 sm:pb-20 border-b border-plum-900/5">
      {/* Subtle background decorative shapes */}
      <div className="absolute top-12 left-10 w-72 h-72 bg-coral-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-butter-300/40 rounded-full blur-3xl pointer-events-none" />

      <div className="container-main relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center mb-8 sm:mb-12">
          
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-coral-500/10 text-coral-600 text-xs sm:text-sm font-semibold mb-4 tracking-wide">
              <PawPrint className="w-3.5 h-3.5 text-coral-600 shrink-0" />
              <span>100% Real Fresh Dog Food</span>
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-plum-900 tracking-tight leading-[1.1] mb-4">
              What’s on <br className="hidden sm:inline" />
              the menu, <span className="text-coral-500 underline decoration-butter-300 decoration-wavy decoration-2">pup?</span>
            </h1>

            <p className="text-base sm:text-lg text-plum-900/70 font-normal max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed">
              Real ingredients. Big flavours. Happy tails. Fresh, human-grade meals gently cooked and delivered right to your doorstep.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <a
                href="#menu-section"
                onClick={scrollToMenu}
                className="bg-plum-900 hover:bg-plum-800 text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all inline-flex items-center gap-2"
              >
                <span>Explore the Menu</span>
                <ArrowDown className="w-4 h-4 shrink-0" />
              </a>

              <Link
                href="/shop"
                className="bg-white hover:bg-butter-50 text-plum-900 border-2 border-plum-900/20 hover:border-plum-900/40 font-bold text-sm sm:text-base px-7 py-3.5 rounded transition-all"
              >
                Shop Now
              </Link>
            </div>
          </div>

          {/* Right Column: Joyous Golden Retriever with playful sticker annotation */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-64 sm:w-80 lg:w-[360px] aspect-square">
              {/* Soft circle backdrop */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-butter-200 via-butter-100 to-coral-500/20 scale-105" />
              
              <Image
                src="/images/home/hero-golden-dog.jpg"
                alt="Happy Golden Retriever smiling"
                fill
                priority
                className="object-cover rounded-full p-2 relative z-10 shadow-xl"
              />

              {/* Hand-drawn style floating sticker */}
              <div className="absolute -top-3 -right-3 sm:-right-6 bg-white/95 backdrop-blur-xs border border-plum-900/10 rounded-lg p-3 shadow-lg z-20 rotate-6 transform hover:rotate-0 transition-transform">
                <p className="text-xs sm:text-sm font-extrabold text-plum-900 flex items-center gap-1">
                  <span>Good food =</span>
                  <span className="text-coral-500">
                    Happier dogs.
                  </span>
                </p>
                <div className="text-[10px] text-plum-900/50 text-right mt-0.5 font-medium">
                  Verified zoomies
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 6-Product Lineup Visual Showcase */}
        <div className="relative mx-auto max-w-5xl mt-6 sm:mt-10 mb-8 sm:mb-12">
          <div className="relative rounded-xl overflow-hidden bg-white/80 backdrop-blur-sm border border-plum-900/10 shadow-xl p-3 sm:p-5 group">
            <div className="relative w-full aspect-[16/7] sm:aspect-[21/9]">
              <Image
                src="/images/products/furbowl-6-products-lineup.jpg"
                alt="FurBowl 6 Fresh Recipes Lineup: Chicken Harvest, Chicken Homestyle, Golden Egg & Quinoa, Paneer & Greens, Lamb Lentil Harvest, Golden Chicken Broth"
                fill
                priority
                className="object-contain object-center transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
            <div className="flex items-center justify-center text-xs sm:text-sm text-plum-900/60 font-medium mt-2">
              <span>6 Chef-Crafted Recipes • 100g Single-Serve Ready-To-Eat Pouches</span>
            </div>
          </div>
        </div>

        {/* Value / Trust Bar (4 items with outline icons) */}
        <div className="max-w-4xl mx-auto bg-white rounded-lg border border-plum-900/10 shadow-sm p-4 sm:p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-y md:divide-y-0 md:divide-x divide-plum-900/10">
            
            {/* 1. Human Grade */}
            <div className="flex items-center gap-3 pt-2 md:pt-0 md:px-3 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-full bg-butter-200/80 text-plum-900 flex items-center justify-center shrink-0">
                <Utensils className="w-5 h-5 text-plum-900" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-plum-900 leading-tight">Human Grade</h4>
                <p className="text-[11px] text-plum-900/60 font-normal">Real whole meats</p>
              </div>
            </div>

            {/* 2. No Preservatives */}
            <div className="flex items-center gap-3 pt-2 md:pt-0 md:px-3 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-full bg-coral-500/10 text-coral-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-coral-600" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-plum-900 leading-tight">No Preservatives</h4>
                <p className="text-[11px] text-plum-900/60 font-normal">Zero additives</p>
              </div>
            </div>

            {/* 3. Complete & Balanced */}
            <div className="flex items-center gap-3 pt-2 md:pt-0 md:px-3 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-full bg-butter-200/80 text-plum-900 flex items-center justify-center shrink-0">
                <Scale className="w-5 h-5 text-plum-900" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-plum-900 leading-tight">Complete & Balanced</h4>
                <p className="text-[11px] text-plum-900/60 font-normal">Vet nutritionist approved</p>
              </div>
            </div>

            {/* 4. Made for Real Dogs */}
            <div className="flex items-center gap-3 pt-2 md:pt-0 md:px-3 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-full bg-coral-500/10 text-coral-600 flex items-center justify-center shrink-0">
                <Heart className="w-5 h-5 text-coral-600" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-plum-900 leading-tight">Made for Real Dogs</h4>
                <p className="text-[11px] text-plum-900/60 font-normal">Happy tummies daily</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Package, Coins, Heart, RotateCcw, ArrowRight } from 'lucide-react';

export default function BuildTheirBoxSection() {
  return (
    <section className="py-16 sm:py-24 bg-white border-b border-plum-900/5">
      <div className="container-main max-w-6xl">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center bg-gradient-to-br from-butter-100/50 via-white to-coral-500/5 rounded-3xl border-2 border-plum-900/10 p-8 sm:p-12 shadow-sm relative overflow-hidden">
          
          {/* Left Column: Benefits & Action */}
          <div className="lg:col-span-6 text-center lg:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-coral-600 bg-coral-500/10 px-3 py-1 rounded-full inline-block mb-4">
              Custom Weekly Meal Box
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-plum-900 tracking-tight leading-[1.15] mb-4">
              Build their week.
            </h2>

            <p className="text-base sm:text-lg text-plum-900/70 font-normal mb-8 leading-relaxed">
              Choose any 6 recipes and create the perfect tailored box for your dog’s week. Swap flavours anytime, pause or cancel with 1 click.
            </p>

            {/* 3 Benefit Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-8">
              <div className="flex items-center gap-2 bg-white border border-plum-900/15 rounded-full px-4 py-2 shadow-2xs">
                <Package className="w-4 h-4 text-coral-600 shrink-0" />
                <span className="text-xs font-bold text-plum-900">Pick Any 6</span>
              </div>

              <div className="flex items-center gap-2 bg-white border border-plum-900/15 rounded-full px-4 py-2 shadow-2xs">
                <Coins className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="text-xs font-bold text-plum-900">Save 10% On Bundle</span>
              </div>

              <div className="flex items-center gap-2 bg-white border border-plum-900/15 rounded-full px-4 py-2 shadow-2xs">
                <Heart className="w-4 h-4 text-coral-600 shrink-0" />
                <span className="text-xs font-bold text-plum-900">Happier Tails</span>
              </div>
            </div>

            {/* Start Building CTA */}
            <div>
              <Link
                href="/shop"
                className="bg-plum-900 hover:bg-plum-800 text-white font-black text-sm sm:text-base px-8 py-4 rounded-full shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2 hover:-translate-y-0.5"
              >
                <span>Start Building Your Box</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </Link>
              <p className="text-xs text-plum-900/50 mt-3">
                Free refrigerated shipping across India • 100% Satisfaction guarantee
              </p>
            </div>
          </div>

          {/* Right Column: Illustrated Craft Delivery Box with Pouches */}
          <div className="lg:col-span-6 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-plum-900/10 bg-white">
              <Image
                src="/images/home/furbowl-box-bundle.jpg"
                alt="FurBowl open craft delivery box filled with fresh meals"
                fill
                className="object-cover"
              />

              {/* Hand-drawn sticker stamp */}
              <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs border border-plum-900/10 rounded-2xl p-3 shadow-lg rotate-3 hover:rotate-0 transition-transform">
                <div className="text-xs font-extrabold text-plum-900 flex items-center gap-1.5">
                  <span>Mix • Match •</span>
                  <span className="text-coral-500 font-black inline-flex items-center gap-1">
                    <span>Repeat</span>
                    <RotateCcw className="w-3 h-3 inline" />
                  </span>
                </div>
                <div className="text-[10px] text-plum-900/50 font-medium">
                  Customized weekly fresh box
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

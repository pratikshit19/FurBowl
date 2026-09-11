'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, Check, Star, ArrowRight } from 'lucide-react';
import { PACK_STORIES } from '@/lib/constants';
import ScrollReveal from '@/components/common/ScrollReveal';

export default function PackTestimonialsSection() {
  return (
    <section className="py-16 sm:py-24 bg-butter-50/40 border-b border-plum-900/5">
      <div className="container-main">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-coral-600 bg-coral-500/10 px-3 py-1 rounded-full inline-block mb-3">
              UGC & Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-plum-900 tracking-tight">
              Real pups. Real stories.
            </h2>
            <p className="text-sm sm:text-base text-plum-900/60 font-normal mt-2 max-w-xl">
              Food they actually enjoy. From picky eaters to high-speed vacuums, here’s how real dogs react to FurBowl.
            </p>
          </div>

          <Link
            href="/why-furbowl"
            className="self-start sm:self-auto bg-white border border-plum-900/20 hover:border-plum-900/40 text-plum-900 font-bold text-xs sm:text-sm px-6 py-3 rounded-full transition-all shadow-xs inline-flex items-center gap-1.5"
          >
            <span>View All Stories</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
          </Link>
        </div>

        {/* 4 Cards Grid (Matching Screen 9) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PACK_STORIES.map((pup, idx) => (
            <ScrollReveal key={pup.name} delay={idx * 80} className="h-full">
              <div
                className="bg-white rounded-3xl border border-plum-900/10 overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-1 flex flex-col justify-between group h-full"
              >
                <div>
                  {/* Dog Photo Container */}
                  <div className="relative w-full aspect-square overflow-hidden bg-butter-100">
                    <Image
                      src={pup.image}
                      alt={`${pup.name} enjoying FurBowl`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-[10px] font-bold text-coral-600 px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1.5">
                      <Heart className="w-3 h-3 fill-coral-500 text-coral-500 shrink-0" />
                      <span>{pup.badge}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-lg font-black text-plum-900">{pup.name}</h3>
                      <span className="text-[10px] text-plum-900/40">{pup.time}</span>
                    </div>

                    <p className="text-xs font-bold text-coral-600 mb-3">{pup.role}</p>

                    <p className="text-xs text-plum-900/80 italic font-medium leading-relaxed">
                      {pup.quote}
                    </p>
                  </div>
                </div>

                {/* Verified Owner Footer */}
                <div className="px-5 py-3 bg-butter-50/50 border-t border-plum-900/5 flex items-center justify-between text-[11px] text-plum-900/60 font-medium">
                  <span className="flex items-center gap-1.5 text-emerald-600 font-bold">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Verified Bowl Cleaned</span>
                  </span>
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { SCHOOL_ARTICLES } from '@/lib/constants';
import ScrollReveal from '@/components/common/ScrollReveal';

export default function FurBowlSchoolSection() {
  return (
    <section className="py-16 sm:py-24 bg-butter-50/40 border-b border-plum-900/5">
      <div className="container-main">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-coral-600 bg-coral-500/10 px-3 py-1 rounded-full inline-block mb-3">
              Pet Nutrition Simplified
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-plum-900 tracking-tight">
              FurBowl School
            </h2>
            <p className="text-sm sm:text-base text-plum-900/60 font-normal mt-2 max-w-xl">
              Dog food, without the boring lecture. Practical feeding guides, vet-reviewed advice, and superfood insights.
            </p>
          </div>

          <Link
            href="/why-furbowl"
            className="self-start sm:self-auto bg-white border border-plum-900/20 hover:border-plum-900/40 text-plum-900 font-bold text-xs sm:text-sm px-6 py-3 rounded transition-all shadow-xs"
          >
            View All Articles →
          </Link>
        </div>

        {/* 3 Articles Grid (Matching Screen 11) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {SCHOOL_ARTICLES.map((article, idx) => (
            <ScrollReveal key={article.id} delay={idx * 100} className="h-full">
              <article
                className="bg-white rounded-xl border border-plum-900/10 overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-1 flex flex-col justify-between group h-full"
              >
                <div>
                  {/* Article Image */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-butter-100">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[11px] font-bold text-coral-600 px-3 py-1 rounded-full shadow-xs">
                      {article.category}
                    </div>
                  </div>

                  {/* Article Content */}
                  <div className="p-6">
                    <div className="text-[11px] font-medium text-plum-900/40 mb-2">
                      {article.readTime} • FurBowl Vet Editorial
                    </div>

                    <h3 className="text-xl font-bold text-plum-900 group-hover:text-coral-600 transition-colors leading-snug mb-3">
                      {article.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-plum-900/70 leading-relaxed font-normal">
                      {article.summary}
                    </p>
                  </div>
                </div>

                {/* Read More Link */}
                <div className="px-6 pb-6 pt-2">
                  <span className="text-xs font-bold text-plum-900 group-hover:text-coral-600 transition-colors inline-flex items-center gap-1">
                    Read Guide <span>→</span>
                  </span>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}

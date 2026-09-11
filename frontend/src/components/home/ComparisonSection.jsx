'use client';

import Image from 'next/image';
import Link from 'next/link';
import { X, Check, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import ScrollReveal from '@/components/common/ScrollReveal';

const KIBBLE_POINTS = [
  {
    title: 'High-Heat Extrusion (200°C+)',
    desc: 'Intense industrial heat destroys natural vitamins, active enzymes, and flavor.',
  },
  {
    title: 'Mystery Meat Meals & By-Products',
    desc: 'Rendered animal carcasses and generic bone meals with zero traceability.',
  },
  {
    title: 'Chemical Preservatives (BHA / BHT)',
    desc: 'Synthetic chemicals added to keep bags sitting on store shelves for up to 2 years.',
  },
  {
    title: 'Only ~10% Moisture Content',
    desc: 'Severe dehydration forces the dog’s organs into water deficit, stressing kidneys.',
  },
  {
    title: 'Heavy Starch & Corn Fillers',
    desc: 'Up to 60% carbohydrate fillers that cause insulin spikes, lethargy, and foul gas.',
  },
];

const FURBOWL_POINTS = [
  {
    title: 'Gently Steam Cooked (<85°C)',
    desc: 'Low-temperature preparation seals in natural juices, active vitamins, and nutrients.',
  },
  {
    title: '100% Human-Grade Whole Meats',
    desc: 'Real chicken breast, lean lamb, malai paneer, and whole eggs from human food chains.',
  },
  {
    title: 'Zero Chemical Preservatives',
    desc: 'Flash-pasteurized in sterile single-serve pouches. Zero synthetics, zero artificial dyes.',
  },
  {
    title: 'Optimal 75%+ Natural Hydration',
    desc: 'Rich in savory bone broths to naturally flush kidneys, support urinary tract, and hydrate skin.',
  },
  {
    title: 'Zero Fillers or Starch Bulkers',
    desc: 'Calibrated protein, pumpkin, carrots, and cold-pressed oils for lean muscle and vibrant vitality.',
  },
];

export default function ComparisonSection() {
  return (
    <section id="comparison-section" className="py-16 sm:py-24 bg-[#faf6ed] border-b border-plum-900/5">
      <div className="container-main">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <p className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-peach-600 mb-3">
            The Honest Comparison
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-plum-900 tracking-tight">
            Not all dog food is equal
          </h2>
          <p className="text-plum-900/70 text-sm sm:text-base leading-relaxed mt-2.5 font-normal">
            Most commercial pet food is ultra-processed. FurBowl is not. See the real difference that ends up in your dog&apos;s bowl every day.
          </p>
        </div>

        {/* 2-Column Visual Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          
          {/* Left: Typical Kibble (Peach warning accent) */}
          <ScrollReveal delay={0} className="h-full">
            <div className="bg-white rounded-3xl border border-plum-900/10 shadow-xs flex flex-col justify-between overflow-hidden h-full">
              <div>
                {/* Photo Window of Dry Kibble */}
                <div className="relative w-full h-52 sm:h-60 bg-stone-200 overflow-hidden">
                  <Image
                    src="/images/home/dry-kibble-bowl.jpg"
                    alt="Dry processed commercial dog kibble in a metal bowl"
                    fill
                    className="object-cover object-center filter grayscale-[35%]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/35" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-peach-500 text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Typical Commercial Kibble</span>
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-black text-white drop-shadow-md">
                      What most dogs eat
                    </h3>
                  </div>
                </div>

                {/* Points */}
                <div className="p-6 sm:p-8">
                  <ul className="space-y-4">
                    {KIBBLE_POINTS.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3.5">
                        <div className="w-6 h-6 rounded-full bg-peach-100 text-peach-600 flex items-center justify-center shrink-0 mt-0.5">
                          <X className="w-4 h-4 stroke-[2.5]" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-plum-900 leading-snug">
                            {item.title}
                          </h4>
                          <p className="text-xs text-plum-900/65 mt-0.5 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-6 pt-0 pb-6 text-center border-t border-plum-900/5 mt-auto">
                <span className="text-xs font-semibold text-plum-900/50">
                  Common outcome: Dull coats, foul gas, and chronic dehydration
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: FurBowl Fresh Meals (Teal accent) */}
          <ScrollReveal delay={120} className="h-full">
            <div className="bg-white rounded-3xl border-2 border-teal-500 shadow-xl flex flex-col justify-between overflow-hidden relative h-full">
              <div>
                {/* Photo Window of Fresh Gourmet Food Bowl with Smiling Retriever */}
                <div className="relative w-full h-52 sm:h-60 bg-cream-100 overflow-hidden">
                  <Image
                    src="/images/home/furbowl-golden-retriever-feast.jpg"
                    alt="Happy Golden Retriever with fresh human-grade FurBowl meal and recipe packs"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-teal-500 text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>The FurBowl Way</span>
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-black text-white drop-shadow-md">
                      What your dog deserves
                    </h3>
                  </div>
                </div>

                {/* Points */}
                <div className="p-6 sm:p-8">
                  <ul className="space-y-4">
                    {FURBOWL_POINTS.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3.5">
                        <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-4 h-4 stroke-[2.5]" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-plum-900 leading-snug">
                            {item.title}
                          </h4>
                          <p className="text-xs text-plum-900/65 mt-0.5 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-6 pt-4 pb-6 border-t border-plum-900/10 flex items-center justify-between mt-auto bg-teal-50/50">
                <span className="text-xs font-bold text-teal-700">
                  Proven: Glossy coats, clean bowls, and playful zoomies
                </span>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-1.5 text-xs font-bold bg-teal-500 hover:bg-teal-600 text-white px-5 py-2.5 rounded-full transition-all shadow-md hover:shadow-lg"
                >
                  <span>Switch Today</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}

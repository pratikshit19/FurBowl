'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Activity, ShieldCheck, Ban, Flame, ArrowRight } from 'lucide-react';
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
    borderColor: 'border-teal-200',
    bgLight: 'bg-white/85 backdrop-blur-xs',
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
    borderColor: 'border-peach-200',
    bgLight: 'bg-white/85 backdrop-blur-xs',
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
    borderColor: 'border-teal-200',
    bgLight: 'bg-white/85 backdrop-blur-xs',
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
    borderColor: 'border-peach-200',
    bgLight: 'bg-white/85 backdrop-blur-xs',
  },
];

const TIMELINE = [
  {
    day: 'Day 1',
    badgeColor: 'bg-teal-500 text-white',
    title: 'Clean Bowls & Licked Spoons',
    desc: 'Pure aromatic excitement at mealtime with real whole steam-cooked meat.',
    image: '/images/home/pack/max.jpg',
    alt: 'Excited feeding puppy Max',
  },
  {
    day: 'Day 7',
    badgeColor: 'bg-peach-500 text-white',
    title: 'Firmer Stools & Less Gas',
    desc: '90%+ natural bio-digestibility means smaller clean pickups and zero bloating.',
    image: '/images/home/pack/charlie.jpg',
    alt: 'Happy healthy dog Charlie',
  },
  {
    day: 'Day 14',
    badgeColor: 'bg-teal-500 text-white',
    title: 'Softer Fur & Fresh Breath',
    desc: 'Omega oils nourish skin from within, giving a gleaming soft coat.',
    image: '/images/home/pack/simba.jpg',
    alt: 'Shiny coat golden dog Simba',
  },
  {
    day: 'Day 30+',
    badgeColor: 'bg-peach-500 text-white',
    title: 'Playful Zoomies & Vitality',
    desc: 'Boundless puppy energy, optimal weight, and bright happy eyes.',
    image: '/images/home/hero-golden-dog.jpg',
    alt: 'Happy Golden Retriever with zoomies energy',
  },
];

export default function DogStatsSection() {
  return (
    <section id="dog-stats-section" className="py-16 sm:py-24 relative overflow-hidden bg-[#ff7a59]/22 border-b border-plum-900/5">
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
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <p className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-teal-600 mb-3">
            Proven Canine Results
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-plum-900 tracking-tight">
            Visible Health Stats for Dogs
          </h2>
          <p className="text-plum-900/70 text-sm sm:text-base leading-relaxed mt-2.5 font-normal">
            Every FurBowl recipe is calibrated to deliver visible, measurable health improvements you can see in your dog&apos;s daily vitality.
          </p>
        </div>

        {/* 4 Big Stat Cards with Dog Photos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <ScrollReveal key={stat.id} delay={idx * 80} className="h-full">
                <div
                  className={`rounded-3xl p-6 sm:p-7 border ${stat.borderColor} ${stat.bgLight} transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden relative group h-full`}
                >
                  <div>
                    {/* Top: Stat Number + Dog Avatar */}
                    <div className="flex items-center justify-between mb-5">
                      <span className={`text-4xl sm:text-5xl font-black tracking-tight ${stat.accentColor}`}>
                        {stat.number}
                      </span>
                      <div className="relative w-12 h-12 rounded-2xl overflow-hidden border-2 border-white shadow-sm shrink-0">
                        <Image
                          src={stat.image}
                          alt={stat.dogName}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    </div>

                    <h3 className="text-lg font-black text-plum-900 mb-2">
                      {stat.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-plum-900/70 leading-relaxed font-normal">
                      {stat.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-plum-900/10 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-plum-900/60 uppercase tracking-wider">
                      {stat.highlight}
                    </span>
                    <span className="text-[10px] font-bold text-plum-900/40">
                      {stat.dogName}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* The 30-Day Fresh Food Transformation Roadmap with Dog Photos */}
        <div className="bg-white/85 backdrop-blur-xs rounded-3xl border border-plum-900/10 p-6 sm:p-10 shadow-xs">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold text-peach-600 uppercase tracking-widest block mb-1">
              What To Expect
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-plum-900">
              The 30-Day Pup Transformation
            </h3>
            <p className="text-xs sm:text-sm text-plum-900/70 mt-1">
              Real results from Indian pet parents who switched from commercial kibble to fresh cooked meals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TIMELINE.map((step, idx) => (
              <ScrollReveal key={idx} delay={idx * 80} className="h-full">
                <div
                  className="bg-white rounded-2xl border border-plum-900/10 shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between group hover:-translate-y-1 h-full"
                >
                  {/* Milestone Dog Photo */}
                  <div className="relative w-full h-40 bg-cream-100 overflow-hidden">
                    <Image
                      src={step.image}
                      alt={step.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                    <span className={`absolute bottom-2.5 left-3 px-2.5 py-0.5 rounded-full ${step.badgeColor} text-[10px] font-black uppercase shadow-xs`}>
                      {step.day}
                    </span>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-plum-900 mb-1">
                        {step.title}
                      </h4>
                      <p className="text-xs text-plum-900/65 leading-relaxed font-normal">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-peach-500 hover:bg-peach-600 text-white font-bold text-sm px-8 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
            >
              <span>Start Their Fresh Journey Today</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

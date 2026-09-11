'use client';

import { Tractor, CookingPot, Package, Heart, Sparkles } from 'lucide-react';

const STEPS = [
  {
    step: '1',
    title: 'Sourced with care',
    subtitle: 'High quality, human grade ingredients',
    icon: Tractor,
    tag: 'Farm Direct',
    desc: 'Antibiotic-free meats and fresh whole vegetables from certified growers.',
  },
  {
    step: '2',
    title: 'Wholesome prep',
    subtitle: 'Gently cooked to retain nutrition',
    icon: CookingPot,
    tag: 'Low-Heat Steam',
    desc: 'Slow cooked at low temperatures to lock in delicate vitamins and amino acids.',
  },
  {
    step: '3',
    title: 'Packed with love',
    subtitle: 'Sealed fresh for goodness',
    icon: Package,
    tag: 'Aseptic Pouch',
    desc: 'Vacuum-sealed in light-blocking barrier pouches without a drop of preservatives.',
  },
  {
    step: '4',
    title: 'In their bowl!',
    subtitle: 'Happy, healthy pups!',
    icon: Heart,
    tag: 'Pure Joy',
    desc: 'Ready to tear and pour directly into their bowl for energetic tail wags and clean licks.',
  },
];

export default function TraceYourMealSection() {
  return (
    <section className="py-16 sm:py-24 bg-butter-50/40 border-b border-plum-900/5 relative overflow-hidden">
      <div className="container-main max-w-6xl">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 sm:mb-20 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-coral-600 bg-coral-500/10 px-3 py-1 rounded-full inline-block mb-3">
              Seed to Tail
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-plum-900 tracking-tight">
              From farm to bowl!
            </h2>
            <p className="text-sm sm:text-base text-plum-900/60 font-normal mt-2 max-w-xl">
              Good food comes from good choices. Follow every single ingredient from responsible farms into your pup’s dinner bowl.
            </p>
          </div>

          <div className="bg-white border border-plum-900/10 rounded-2xl px-4 py-2.5 shadow-sm -rotate-2 self-start sm:self-auto">
            <p className="text-xs sm:text-sm font-black text-plum-900 flex items-center gap-1.5">
              <span>Real food.</span>
              <span className="text-coral-500 inline-flex items-center gap-1">
                Real journeys. <Sparkles className="w-3.5 h-3.5 inline" />
              </span>
            </p>
          </div>
        </div>

        {/* 4-Step Timeline with Curved Dotted Path */}
        <div className="relative">
          {/* Desktop connecting dashed line */}
          <div className="hidden lg:block absolute top-12 left-16 right-16 h-0.5 border-t-2 border-dashed border-plum-900/20 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative z-10">
            {STEPS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="bg-white rounded-3xl border border-plum-900/10 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow group hover:-translate-y-1"
                >
                  <div>
                    {/* Step circle indicator */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-full bg-plum-900 text-white font-black text-sm flex items-center justify-center shadow-sm group-hover:bg-coral-500 transition-colors">
                        {item.step}
                      </div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-coral-600 bg-coral-500/10 px-2.5 py-1 rounded-full">
                        {item.tag}
                      </span>
                    </div>

                    {/* Icon illustration container */}
                    <div className="w-16 h-16 rounded-2xl bg-butter-100 flex items-center justify-center text-plum-900 mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-8 h-8 text-coral-600" />
                    </div>

                    <h3 className="text-lg font-black text-plum-900 mb-1 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs font-bold text-coral-600 mb-2">
                      {item.subtitle}
                    </p>
                  </div>

                  <p className="text-xs text-plum-900/60 leading-relaxed font-normal pt-3 border-t border-plum-900/5 mt-3">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PawPrint, Award, Lock, Check, ArrowRight } from 'lucide-react';
import { MOCKUP_RECIPES } from '@/lib/constants';
import ScrollReveal from '@/components/common/ScrollReveal';

export default function TastePassportSection() {
  // 3 unlocked by default, 3 locked
  const [unlockedRecipes, setUnlockedRecipes] = useState([
    'chicken-harvest',
    'chicken-homestyle',
    'paneer-greens',
  ]);

  const toggleRecipe = (id) => {
    if (unlockedRecipes.includes(id)) {
      setUnlockedRecipes(unlockedRecipes.filter((r) => r !== id));
    } else {
      setUnlockedRecipes([...unlockedRecipes, id]);
    }
  };

  const unlockedCount = unlockedRecipes.length;
  const progressPercent = Math.round((unlockedCount / 6) * 100);

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-plum-900/5">
      <div className="container-main max-w-5xl">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-coral-600 bg-coral-500/10 px-3 py-1 rounded-full inline-block mb-3">
            Gamified Nutrition
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-plum-900 tracking-tight">
            Bruno’s Taste Passport
          </h2>
          <p className="text-sm sm:text-base text-plum-900/60 font-normal mt-2">
            Because good food leads to great adventures. Collect recipe stamps, unlock special club discounts, and give your pup a well-rounded diet.
          </p>
        </div>

        {/* Passport Layout (Matching Screen 8) */}
        <ScrollReveal delay={60}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-butter-50/60 rounded-xl border border-plum-900/10 p-6 sm:p-10 shadow-sm">
            
            {/* Left: Teal Passport Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-coral-500 to-coral-600 rounded-lg p-6 sm:p-8 text-white shadow-lg relative overflow-hidden flex flex-col justify-between min-h-[380px]">
              {/* Background paw watermark */}
              <PawPrint className="absolute -right-8 -bottom-8 w-44 h-44 text-white/10 select-none pointer-events-none stroke-1" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-black uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">
                    Official Pup Passport
                  </span>
                </div>

                <h3 className="text-2xl font-black mb-1">Bruno’s Adventures</h3>
                <p className="text-xs text-white/80 mb-6">Food Explorer Level 2</p>

                {/* Bruno Avatar with Bandana */}
                <div className="relative w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-white shadow-md mb-6">
                  <Image
                    src="/images/home/bruno-passport-dog.jpg"
                    alt="Bruno the taste explorer"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Passport Progress Bar */}
              <div className="relative z-10 bg-white/15 backdrop-blur-xs rounded-lg p-4 border border-white/20">
                <div className="flex items-center justify-between text-xs font-bold mb-2">
                  <span>{unlockedCount} / 6 recipes unlocked</span>
                  <span>{progressPercent}%</span>
                </div>

                <div className="w-full h-2.5 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                <div className="text-[11px] text-white/80 mt-2 font-medium flex items-center justify-between">
                  <span>Keep exploring!</span>
                  <span className="inline-flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" />
                    <span>2 stamps to VIP perk</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right: 6 Circular Stamp Badges (3x2 grid) */}
            <div className="lg:col-span-7">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-extrabold uppercase tracking-wider text-plum-900">
                  Recipe Stamp Collection
                </h4>
                <span className="text-xs text-plum-900/50">Click any stamp to inspect</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {MOCKUP_RECIPES.map((recipe) => {
                  const isUnlocked = unlockedRecipes.includes(recipe.id);
                  return (
                    <button
                      key={recipe.id}
                      type="button"
                      onClick={() => toggleRecipe(recipe.id)}
                      className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all cursor-pointer relative group text-center ${
                        isUnlocked
                          ? 'bg-white border-coral-500/40 shadow-sm hover:scale-105 hover:border-coral-500'
                          : 'bg-white/40 border-dashed border-plum-900/15 opacity-70 hover:opacity-100 hover:border-plum-900/30'
                      }`}
                    >
                      {/* Stamp Circle */}
                      <div
                        className={`w-14 h-14 rounded-full flex items-center justify-center mb-2 transition-transform group-hover:rotate-6 ${
                          isUnlocked
                            ? 'bg-coral-500/10 text-coral-600 shadow-xs'
                            : 'bg-plum-900/5 text-plum-900/40'
                        }`}
                      >
                        {isUnlocked ? (
                          <PawPrint className="w-6 h-6 text-coral-600" />
                        ) : (
                          <Lock className="w-5 h-5 text-plum-900/40" />
                        )}
                      </div>

                      <div className="font-bold text-xs text-plum-900 leading-tight mb-1">
                        {recipe.name}
                      </div>

                      <div className="text-[10px] font-semibold text-plum-900/50">
                        {isUnlocked ? (
                          <span className="text-coral-600 font-bold inline-flex items-center gap-1">
                            <span>Unlocked</span>
                            <Check className="w-3 h-3" />
                          </span>
                        ) : (
                          <span>Tap to unlock</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-plum-900/10 text-xs text-plum-900/60">
                <span>Try all 6 recipes in your custom starter box.</span>
                <Link
                  href="/shop"
                  className="font-bold text-coral-600 hover:text-coral-700 underline inline-flex items-center gap-1"
                >
                  <span>Order Starter Box</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                </Link>
              </div>
            </div>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}

'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Drumstick, 
  Sprout, 
  Carrot, 
  Leaf, 
  Sparkles, 
  Wheat, 
  Check, 
  ArrowRight 
} from 'lucide-react';
import { INGREDIENTS_EXPLORER } from '@/lib/constants';

const INGREDIENT_ICONS = {
  chicken: Drumstick,
  pumpkin: Sprout,
  carrot: Carrot,
  peas: Leaf,
  'sweet-potato': Sparkles,
  flaxseed: Wheat,
};

export default function IngredientExplorerSection() {
  const [activeId, setActiveId] = useState('pumpkin');

  const currentIndex = INGREDIENTS_EXPLORER.findIndex((i) => i.id === activeId);
  const currentIngredient = INGREDIENTS_EXPLORER[currentIndex] || INGREDIENTS_EXPLORER[0];

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % INGREDIENTS_EXPLORER.length;
    setActiveId(INGREDIENTS_EXPLORER[nextIndex].id);
  };

  const ActiveIcon = INGREDIENT_ICONS[currentIngredient.id] || Sparkles;

  return (
    <section id="ingredients" className="py-16 sm:py-24 bg-white border-b border-plum-900/5">
      <div className="container-main max-w-5xl">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-coral-600 bg-coral-500/10 px-3 py-1 rounded-full inline-block mb-3">
            Pure Transparency
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-plum-900 tracking-tight">
            What’s in the bowl?
          </h2>
          <p className="text-sm sm:text-base text-plum-900/60 font-normal mt-2">
            Real ingredients. No detective work required. Every single item is human-grade and serving a vital nutritional purpose.
          </p>
        </div>

        {/* Horizontal Interactive Tab Selector Pills */}
        <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-8 sm:mb-10 no-scrollbar">
          {INGREDIENTS_EXPLORER.map((item) => {
            const isActive = item.id === activeId;
            const ItemIcon = INGREDIENT_ICONS[item.id] || Sparkles;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveId(item.id)}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-plum-900 text-white shadow-md scale-105 ring-2 ring-plum-900/20'
                    : 'bg-butter-100/60 hover:bg-butter-200 text-plum-900 border border-plum-900/10'
                }`}
              >
                <ItemIcon className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>

        {/* Feature Display Card (Matching Screen 6 Layout) */}
        <div className="bg-gradient-to-br from-butter-50 via-white to-butter-100/50 rounded-3xl border-2 border-plum-900/10 p-6 sm:p-10 shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Big Vibrant Ingredient Photo */}
            <div className="md:col-span-5 flex justify-center">
              <div className="relative w-60 sm:w-72 aspect-square rounded-2xl overflow-hidden bg-white shadow-md border border-plum-900/10 p-3">
                <Image
                  src={currentIngredient.image}
                  alt={currentIngredient.name}
                  fill
                  className="object-contain p-2 transition-all duration-300"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-xs font-bold text-plum-900 px-2.5 py-1 rounded-full shadow-xs border border-plum-900/5">
                  {currentIngredient.badge}
                </div>
              </div>
            </div>

            {/* Right Column: Information & Deep Dive */}
            <div className="md:col-span-7">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-9 h-9 rounded-xl bg-coral-500/10 text-coral-600 flex items-center justify-center shrink-0">
                  <ActiveIcon className="w-5 h-5" />
                </div>
                <h3 className="text-3xl sm:text-4xl font-black text-plum-900 tracking-tight">
                  {currentIngredient.name}
                </h3>
              </div>

              <div className="inline-block text-xs font-bold text-coral-600 bg-coral-500/10 px-3 py-1 rounded-full mb-4">
                {currentIngredient.whyTitle}
              </div>

              <p className="text-sm sm:text-base text-plum-900/80 leading-relaxed mb-6 font-normal">
                {currentIngredient.description}
              </p>

              {/* Recipes using this ingredient */}
              <div className="pt-4 border-t border-plum-900/10 mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-plum-900/50 block mb-2">
                  Featured In FurBowl Recipes:
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentIngredient.usedIn.map((recipeName) => (
                    <span
                      key={recipeName}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-plum-900 bg-white border border-plum-900/15 px-3 py-1 rounded-full shadow-2xs"
                    >
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{recipeName}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Next Ingredient Button */}
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-plum-900 hover:bg-plum-800 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full transition-all inline-flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  <span>Next Ingredient</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>

                <Link
                  href="/why-furbowl"
                  className="text-xs font-bold text-coral-600 hover:text-coral-700 underline inline-flex items-center gap-1"
                >
                  <span>See Nutrition Standards</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                </Link>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Zap,
  Leaf,
  Crown,
  Sofa,
  PawPrint,
  RotateCcw,
  Star,
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
} from 'lucide-react';
import { MOCKUP_RECIPES } from '@/lib/constants';
import useAuthStore from '@/store/authStore';

const PROTEIN_OPTIONS = [
  {
    id: 'chicken',
    label: 'Fresh Chicken',
    image: '/images/ingredients/transparent/chicken_clean.png',
    alt: 'Fresh raw chicken breast for dogs',
    desc: 'Lean, tender & easily digestible',
    highlight: 'High Lean Protein',
  },
  {
    id: 'egg',
    label: 'Farm Fresh Egg',
    image: '/images/ingredients/transparent/egg_clean.png',
    alt: 'Farm fresh whole egg for dogs',
    desc: 'Golden superfood for coat & stamina',
    highlight: '100% Bioavailable',
  },
  {
    id: 'lamb',
    label: 'Tender Lamb',
    image: '/images/ingredients/transparent/lamb_clean.png',
    alt: 'Nutrient-rich tender lamb cuts',
    desc: 'Hearty, iron-rich & hypoallergenic',
    highlight: 'Rich in Iron & Zinc',
  },
  {
    id: 'paneer',
    label: 'Fresh Paneer',
    image: '/images/ingredients/transparent/paneer_clean.png',
    alt: 'Fresh organic cottage cheese paneer cubes',
    desc: 'Clean vegetarian protein & calcium',
    highlight: 'Fresh Dairy Protein',
  },
];

const VIBE_OPTIONS = [
  {
    id: 'zoomies',
    label: 'High Energy & Zoomies',
    icon: Zap,
    desc: 'Power-packed fuel for active, playful dogs',
    tag: 'Extra Stamina',
  },
  {
    id: 'tummy',
    label: 'Sensitive Tummy',
    icon: Leaf,
    desc: 'Gentle, soothing single & dual protein recipes',
    tag: 'Easy Digestion',
  },
  {
    id: 'picky',
    label: 'Picky Connoisseur',
    icon: Crown,
    desc: 'Irresistible aroma and slow-simmered culinary taste',
    tag: 'Gourmet Palatability',
  },
  {
    id: 'chill',
    label: 'Gentle & Couch Cuddler',
    icon: Sofa,
    desc: 'Balanced calories with coat-nourishing omega oils',
    tag: 'Joint & Weight Care',
  },
];

export default function PickTheirPlateSection() {
  const { user } = useAuthStore();
  const [step, setStep] = useState(1);
  const [selectedProtein, setSelectedProtein] = useState('chicken');
  const [selectedVibe, setSelectedVibe] = useState('zoomies');

  const activeDogName = user?.dogName?.trim() || null;
  const dogDisplayName = activeDogName || 'Your Dog';

  // Match recipes based on protein choice
  const getMatches = () => {
    if (selectedProtein === 'chicken') {
      return {
        topMatch: MOCKUP_RECIPES.find((r) => r.id === 'chicken-vegetables' || r.slug === 'chicken-vegetables'),
        secondMatch: MOCKUP_RECIPES.find((r) => r.id === 'chicken-rice-vegetables' || r.slug === 'chicken-rice-vegetables'),
        wildCard: MOCKUP_RECIPES.find((r) => r.id === 'chicken-broth' || r.slug === 'chicken-broth'),
        pupTitle: `Meet ${dogDisplayName} — The Chicken Chaser`,
        pupDesc: `${dogDisplayName} loves real poultry and crisp garden veggies. Here are their chef-calibrated top matches!`,
        previewMeal: 'Chicken with Vegetables',
      };
    }
    if (selectedProtein === 'lamb') {
      return {
        topMatch: MOCKUP_RECIPES.find((r) => r.id === 'lamb-lentils' || r.slug === 'lamb-lentils'),
        secondMatch: MOCKUP_RECIPES.find((r) => r.id === 'chicken-vegetables' || r.slug === 'chicken-vegetables'),
        wildCard: MOCKUP_RECIPES.find((r) => r.id === 'chicken-broth' || r.slug === 'chicken-broth'),
        pupTitle: `Meet ${dogDisplayName} — The Flavor Champion`,
        pupDesc: `${dogDisplayName} craves rich iron and hearty warmth. These slow-simmered dishes are tailor-made!`,
        previewMeal: 'Lamb & Lentils with Veggies',
      };
    }
    if (selectedProtein === 'egg') {
      return {
        topMatch: MOCKUP_RECIPES.find((r) => r.id === 'egg-superfood' || r.slug === 'egg-superfood'),
        secondMatch: MOCKUP_RECIPES.find((r) => r.id === 'paneer-vegetables' || r.slug === 'paneer-vegetables'),
        wildCard: MOCKUP_RECIPES.find((r) => r.id === 'chicken-broth' || r.slug === 'chicken-broth'),
        pupTitle: `Meet ${dogDisplayName} — The Superfood Hound`,
        pupDesc: `${dogDisplayName} thrives on clean farm proteins and wholesome super grains for radiant stamina!`,
        previewMeal: 'Egg Superfood with Quinoa',
      };
    }
    // paneer
    return {
      topMatch: MOCKUP_RECIPES.find((r) => r.id === 'paneer-vegetables' || r.slug === 'paneer-vegetables'),
      secondMatch: MOCKUP_RECIPES.find((r) => r.id === 'egg-superfood' || r.slug === 'egg-superfood'),
      wildCard: MOCKUP_RECIPES.find((r) => r.id === 'chicken-vegetables' || r.slug === 'chicken-vegetables'),
      pupTitle: `Meet ${dogDisplayName} — The Gentle Gourmet`,
      pupDesc: `${dogDisplayName} adores tender cottage cheese cubes and fresh wilted greens for smooth digestion!`,
      previewMeal: 'Paneer & Vegetables',
    };
  };

  const matches = getMatches();

  return (
    <section id="quiz-section" className="pt-8 pb-14 sm:pt-10 sm:pb-16 bg-white border-b border-plum-900/5 relative overflow-hidden">
      <div className="container-main max-w-6xl">

        {/* Step Indicator Header */}
        <div className="flex flex-col items-center text-center mb-6 sm:mb-8">
          {/* Interactive Step Navigator */}
          <div className="flex items-center gap-2 sm:gap-3 mb-4">
            <button
              type="button"
              onClick={() => setStep(1)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${step === 1
                ? 'bg-plum-900 text-white shadow-sm ring-2 ring-plum-900/10'
                : 'bg-plum-900/5 text-plum-900/60 hover:bg-plum-900/10'
                }`}
            >
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${step === 1 ? 'bg-white/25 text-white' : 'bg-plum-900/20 text-plum-900'
                }`}>
                1
              </span>
              <span>Protein</span>
            </button>
            <span className="text-plum-900/20 font-bold">—</span>
            <button
              type="button"
              onClick={() => setStep(2)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${step === 2
                ? 'bg-plum-900 text-white shadow-sm ring-2 ring-plum-900/10'
                : 'bg-plum-900/5 text-plum-900/60 hover:bg-plum-900/10'
                }`}
            >
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${step === 2 ? 'bg-white/25 text-white' : 'bg-plum-900/20 text-plum-900'
                }`}>
                2
              </span>
              <span>Vibe</span>
            </button>
            <span className="text-plum-900/20 font-bold">—</span>
            <button
              type="button"
              onClick={() => setStep(3)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${step === 3
                ? 'bg-plum-900 text-white shadow-sm ring-2 ring-plum-900/10'
                : 'bg-plum-900/5 text-plum-900/60 hover:bg-plum-900/10'
                }`}
            >
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${step === 3 ? 'bg-white/25 text-white' : 'bg-plum-900/20 text-plum-900'
                }`}>
                3
              </span>
              <span>Results</span>
            </button>
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl lg:text-[2.25rem] font-bold text-plum-900 tracking-tight max-w-3xl leading-tight">
            {step === 3
              ? `Personalized Taste Profile for ${activeDogName ? activeDogName : 'Your Dog'}`
              : `Find the right FurBowl for ${activeDogName ? activeDogName : 'your dog'}`}
          </h2>

          {/* Subheading */}
          <p className="text-sm sm:text-base text-plum-900/70 font-normal mt-2 max-w-xl mx-auto leading-relaxed">
            {step === 3
              ? 'Calculated fresh based on real human-grade ingredients your pup loves.'
              : "Answer a few quick questions and we'll help you discover the FURBOWL recipes that match their preferences."}
          </p>
        </div>

        {/* STEP 1 & 2: Taste-based interactive question */}
        {step < 3 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-butter-50/50 rounded-2xl border border-plum-900/10 p-6 sm:p-10 shadow-sm">

            {/* Left Column: Interactive Selector */}
            <div className="lg:col-span-7">
              {step === 1 ? (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg sm:text-xl font-bold text-plum-900 flex items-center gap-2">
                      <span>Pick a protein preference:</span>
                    </h3>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-coral-500/10 text-coral-600 font-bold uppercase tracking-wider">
                      Step 1 of 2
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-plum-900/60 mb-6">
                    Choose the primary wholesome protein that gets their tail wagging fastest at dinner.
                  </p>

                  {/* Visual Protein Cards with Real Food Images */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4 mb-8">
                    {PROTEIN_OPTIONS.map((item) => {
                      const isSelected = selectedProtein === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setSelectedProtein(item.id)}
                          className={`group relative flex flex-col items-center text-center p-3.5 sm:p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer overflow-hidden ${isSelected
                            ? 'bg-white border-coral-500 shadow-lg ring-2 ring-coral-500/25 scale-[1.02]'
                            : 'bg-white/85 border-plum-900/10 hover:border-plum-900/25 hover:bg-white hover:shadow-md hover:scale-[1.01]'
                            }`}
                        >
                          {/* Selected Check Badge */}
                          <div
                            className={`absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center transition-all ${isSelected
                              ? 'bg-coral-500 text-white shadow-xs scale-100 opacity-100'
                              : 'border border-plum-900/20 text-transparent scale-90 opacity-0 group-hover:opacity-40'
                              }`}
                          >
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>

                          {/* Realistic Food Photography Image */}
                          <div className="w-20 h-20 sm:w-24 sm:h-24 relative flex items-center justify-center mb-2">
                            <div
                              className={`absolute inset-0 rounded-full transition-transform duration-300 ${isSelected ? 'bg-coral-50/70 scale-100' : 'bg-butter-100/50 scale-90 group-hover:scale-100'
                                }`}
                            />
                            <div className="relative w-16 h-16 sm:w-20 sm:h-20 transition-transform duration-300 group-hover:scale-110 drop-shadow-md">
                              <Image
                                src={item.image}
                                alt={item.alt}
                                fill
                                className="object-contain"
                                sizes="96px"
                              />
                            </div>
                          </div>

                          {/* Text Details */}
                          <span className="font-bold text-sm sm:text-base text-plum-900 leading-tight">
                            {item.label}
                          </span>
                          <span className="text-[11px] text-plum-900/60 font-medium mt-1 leading-snug">
                            {item.desc}
                          </span>
                          <span
                            className={`mt-2.5 text-[9.5px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider transition-colors ${isSelected
                              ? 'bg-coral-500 text-white shadow-xs'
                              : 'bg-plum-900/5 text-plum-900/60 group-hover:bg-plum-900/10'
                              }`}
                          >
                            {item.highlight}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="bg-plum-900 hover:bg-plum-800 active:scale-95 text-white font-bold text-sm px-8 py-3.5 rounded-full shadow hover:shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg sm:text-xl font-bold text-plum-900 flex items-center gap-2">
                      <span>Pick their daily vibe:</span>
                    </h3>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-coral-500/10 text-coral-600 font-bold uppercase tracking-wider">
                      Step 2 of 2
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-plum-900/60 mb-6">
                    What best describes their daily personality, digestion, and energy level?
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
                    {VIBE_OPTIONS.map((vibe) => {
                      const isSelected = selectedVibe === vibe.id;
                      const Icon = vibe.icon;
                      return (
                        <button
                          key={vibe.id}
                          type="button"
                          onClick={() => setSelectedVibe(vibe.id)}
                          className={`group relative flex items-center gap-3.5 p-4 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer overflow-hidden ${isSelected
                            ? 'bg-white border-coral-500 shadow-md ring-2 ring-coral-500/25 scale-[1.01]'
                            : 'bg-white/85 border-plum-900/10 hover:border-plum-900/25 hover:bg-white hover:shadow-sm'
                            }`}
                        >
                          <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors shadow-2xs ${isSelected
                              ? 'bg-coral-500 text-white shadow-coral-500/30'
                              : 'bg-butter-100 text-plum-900 group-hover:bg-butter-200'
                              }`}
                          >
                            <Icon className="w-5 h-5 stroke-[2.2]" />
                          </div>
                          <div className="flex-1 min-w-0 pr-6">
                            <div className="font-bold text-sm sm:text-base text-plum-900 leading-tight">
                              {vibe.label}
                            </div>
                            <div className="text-xs text-plum-900/60 font-medium mt-0.5 leading-snug">
                              {vibe.desc}
                            </div>
                            <span
                              className={`inline-block mt-1.5 text-[9.5px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${isSelected
                                ? 'bg-coral-100 text-coral-700 font-bold'
                                : 'bg-plum-900/5 text-plum-900/60'
                                }`}
                            >
                              {vibe.tag}
                            </span>
                          </div>

                          {/* Selected Check Indicator */}
                          <div
                            className={`absolute top-4 right-3.5 w-5 h-5 rounded-full flex items-center justify-center transition-all ${isSelected
                              ? 'bg-coral-500 text-white shadow-xs scale-100 opacity-100'
                              : 'border border-plum-900/20 text-transparent scale-90 opacity-0 group-hover:opacity-40'
                              }`}
                          >
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="bg-white border border-plum-900/20 hover:bg-butter-100 text-plum-900 font-bold text-sm px-5 py-3.5 rounded-full transition-all inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4 shrink-0" />
                      <span>Back</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="bg-coral-500 hover:bg-coral-600 active:scale-95 text-white font-bold text-sm px-8 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2 cursor-pointer"
                    >
                      <span>Show {activeDogName ? `${activeDogName}’s` : 'Their'} Matches</span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Joyous Dog with Interactive Recipe Match Badge */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="relative w-56 sm:w-68 aspect-square flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-coral-500/15 via-butter-300/30 to-teal-500/10 scale-105" />
                <Image
                  src="/images/home/quiz-border-collie.jpg"
                  alt="Playful happy dog ready for delicious meal"
                  fill
                  className="object-cover rounded-full p-2 relative z-10 shadow-lg"
                />
              </div>
            </div>

          </div>
        )}

        {/* STEP 3: Taste Profile Result */}
        {step === 3 && (
          <div className="bg-gradient-to-b from-butter-50 to-white rounded-2xl border border-plum-900/10 p-6 sm:p-10 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

              {/* Left Profile Avatar Card */}
              <div className="lg:col-span-4 text-center lg:text-left flex flex-col items-center lg:items-start">
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 mb-4">
                  <Image
                    src="/images/home/bruno-passport-dog.jpg"
                    alt={`${dogDisplayName} the taste explorer`}
                    fill
                    className="object-cover rounded-full border-4 border-coral-500/20 shadow-md"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-coral-500 text-white rounded-full p-1.5 shadow flex items-center justify-center">
                    <PawPrint className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>

                <span className="text-xs font-bold text-coral-600 bg-coral-500/10 px-3 py-1 rounded-full mb-2">
                  Taste Profile Result
                </span>

                <h3 className="text-2xl sm:text-3xl font-bold text-plum-900 tracking-tight mb-2">
                  {matches.pupTitle}
                </h3>

                <p className="text-xs sm:text-sm text-plum-900/70 leading-relaxed mb-6">
                  {matches.pupDesc}
                </p>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs font-bold text-plum-900/60 hover:text-plum-900 underline flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 shrink-0" />
                  <span>Try another pup taste</span>
                </button>
              </div>

              {/* Center Main Top Match Card */}
              <div className="lg:col-span-5">
                {matches.topMatch && (
                  <div className="bg-white rounded-xl border-2 border-coral-500/30 p-5 shadow-lg relative overflow-hidden group hover:border-coral-500 transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-coral-500 text-white text-[11px] font-bold px-3 py-0.5 rounded-full tracking-wider uppercase inline-flex items-center gap-1">
                        <Star className="w-3 h-3 fill-white text-white shrink-0" />
                        <span>Most Loved • Top Match</span>
                      </span>
                      <span className="text-xs font-bold text-coral-600">₹{matches.topMatch.price}</span>
                    </div>

                    <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-3.5 bg-butter-50 flex items-center justify-center p-2">
                      <Image
                        src={matches.topMatch.image}
                        alt={matches.topMatch.name}
                        fill
                        className="object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    <h4 className="text-xl font-bold text-plum-900 mb-1">{matches.topMatch.name}</h4>
                    <p className="text-xs text-plum-900/60 mb-3">{matches.topMatch.tags}</p>

                    <Link
                      href={`/shop/${matches.topMatch.slug}`}
                      className="w-full bg-plum-900 hover:bg-plum-800 text-white font-bold text-xs py-3 rounded-lg text-center block transition-all shadow-sm"
                    >
                      View Product →
                    </Link>
                  </div>
                )}
              </div>

              {/* Right Secondary Cards: Second Match + Wild Card Broth */}
              <div className="lg:col-span-3 flex flex-col gap-3">
                <span className="text-[11px] font-bold text-plum-900/50 uppercase tracking-wider">
                  Recommended Add-Ons
                </span>

                {matches.secondMatch && (
                  <div className="bg-white rounded-lg border border-plum-900/10 p-3 flex items-center gap-3 hover:shadow-sm transition-shadow">
                    <div className="relative w-14 h-14 shrink-0 rounded-md overflow-hidden bg-butter-50">
                      <Image
                        src={matches.secondMatch.image}
                        alt={matches.secondMatch.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-bold text-coral-600 uppercase">Top Match</div>
                      <div className="text-xs font-bold text-plum-900 truncate">{matches.secondMatch.name}</div>
                      <div className="text-[10px] text-plum-900/50">₹{matches.secondMatch.price}</div>
                    </div>
                    <Link
                      href={`/shop/${matches.secondMatch.slug}`}
                      className="text-xs font-bold text-coral-600 hover:text-coral-700 shrink-0"
                    >
                      →
                    </Link>
                  </div>
                )}

                {matches.wildCard && (
                  <div className="bg-white rounded-lg border border-plum-900/10 p-3 flex items-center gap-3 hover:shadow-sm transition-shadow">
                    <div className="relative w-14 h-14 shrink-0 rounded-md overflow-hidden bg-butter-50">
                      <Image
                        src={matches.wildCard.image}
                        alt={matches.wildCard.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-bold text-plum-900/70 uppercase">Wild Card</div>
                      <div className="text-xs font-bold text-plum-900 truncate">{matches.wildCard.name}</div>
                      <div className="text-[10px] text-plum-900/50">Hydration Boost • ₹{matches.wildCard.price}</div>
                    </div>
                    <Link
                      href={`/shop/${matches.wildCard.slug}`}
                      className="text-xs font-bold text-coral-600 hover:text-coral-700 shrink-0"
                    >
                      →
                    </Link>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}

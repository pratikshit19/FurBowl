'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Drumstick, 
  Egg, 
  Beef, 
  Salad, 
  Zap, 
  Leaf, 
  Crown, 
  Sofa, 
  PawPrint, 
  RotateCcw, 
  Star, 
  ArrowRight, 
  ArrowLeft 
} from 'lucide-react';
import { MOCKUP_RECIPES } from '@/lib/constants';
import useAuthStore from '@/store/authStore';

const PROTEIN_OPTIONS = [
  { id: 'chicken', label: 'Chicken', icon: Drumstick, desc: 'Lean & digestible' },
  { id: 'egg', label: 'Egg', icon: Egg, desc: 'Superfood power' },
  { id: 'lamb', label: 'Lamb', icon: Beef, desc: 'Hearty & rich' },
  { id: 'paneer', label: 'Paneer', icon: Salad, desc: 'Fresh vegetarian' },
];

const VIBE_OPTIONS = [
  { id: 'zoomies', label: 'High Energy & Zoomies', icon: Zap },
  { id: 'tummy', label: 'Sensitive Tummy', icon: Leaf },
  { id: 'picky', label: 'Picky Connoisseur', icon: Crown },
  { id: 'chill', label: 'Gentle & Couch Cuddler', icon: Sofa },
];

export default function PickTheirPlateSection() {
  const { user } = useAuthStore();
  const [step, setStep] = useState(1);
  const [selectedProtein, setSelectedProtein] = useState('chicken');
  const [selectedVibe, setSelectedVibe] = useState('zoomies');

  const activeDogName = user?.dogName || null;

  // Match recipes based on protein choice
  const getMatches = () => {
    if (selectedProtein === 'chicken') {
      const name = activeDogName || 'Bruno';
      return {
        topMatch: MOCKUP_RECIPES.find((r) => r.id === 'chicken-harvest'),
        secondMatch: MOCKUP_RECIPES.find((r) => r.id === 'chicken-homestyle'),
        wildCard: MOCKUP_RECIPES.find((r) => r.id === 'golden-chicken-broth'),
        pupTitle: `Meet ${name} — The Chicken Chaser`,
        pupDesc: `${name} loves real poultry and crisp garden veggies. Here are their chef-calibrated top matches!`,
      };
    }
    if (selectedProtein === 'lamb') {
      const name = activeDogName || 'Simba';
      return {
        topMatch: MOCKUP_RECIPES.find((r) => r.id === 'lamb-lentil-harvest'),
        secondMatch: MOCKUP_RECIPES.find((r) => r.id === 'chicken-harvest'),
        wildCard: MOCKUP_RECIPES.find((r) => r.id === 'golden-chicken-broth'),
        pupTitle: `Meet ${name} — The Flavor Champion`,
        pupDesc: `${name} craves rich iron and hearty warmth. These slow-simmered dishes are tailor-made!`,
      };
    }
    if (selectedProtein === 'egg') {
      const name = activeDogName || 'Bella';
      return {
        topMatch: MOCKUP_RECIPES.find((r) => r.id === 'golden-egg-quinoa'),
        secondMatch: MOCKUP_RECIPES.find((r) => r.id === 'paneer-greens'),
        wildCard: MOCKUP_RECIPES.find((r) => r.id === 'golden-chicken-broth'),
        pupTitle: `Meet ${name} — The Superfood Hound`,
        pupDesc: `${name} thrives on clean farm proteins and wholesome super grains for radiant stamina!`,
      };
    }
    // paneer
    const name = activeDogName || 'Oreo';
    return {
      topMatch: MOCKUP_RECIPES.find((r) => r.id === 'paneer-greens'),
      secondMatch: MOCKUP_RECIPES.find((r) => r.id === 'golden-egg-quinoa'),
      wildCard: MOCKUP_RECIPES.find((r) => r.id === 'chicken-harvest'),
      pupTitle: `Meet ${name} — The Gentle Gourmet`,
      pupDesc: `${name} adores tender cottage cheese cubes and fresh wilted greens for smooth digestion!`,
    };
  };

  const matches = getMatches();

  return (
    <section id="quiz-section" className="py-14 sm:py-20 bg-white border-b border-plum-900/5 relative overflow-hidden">
      <div className="container-main max-w-6xl">
        
        {/* Step Indicator Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => setStep(1)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded text-xs font-bold transition-all ${
                step === 1 ? 'bg-plum-900 text-white shadow-sm' : 'bg-plum-900/5 text-plum-900/60'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">1</span>
              <span>Protein</span>
            </button>
            <span className="text-plum-900/20">—</span>
            <button
              onClick={() => setStep(2)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded text-xs font-bold transition-all ${
                step === 2 ? 'bg-plum-900 text-white shadow-sm' : 'bg-plum-900/5 text-plum-900/60'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">2</span>
              <span>Vibe</span>
            </button>
            <span className="text-plum-900/20">—</span>
            <button
              onClick={() => setStep(3)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded text-xs font-bold transition-all ${
                step === 3 ? 'bg-plum-900 text-white shadow-sm' : 'bg-plum-900/5 text-plum-900/60'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">3</span>
              <span>Results</span>
            </button>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-plum-900 tracking-tight">
            {step === 3 ? 'Personalized Taste Profile' : 'What does your pup like?'}
          </h2>
          <p className="text-sm sm:text-base text-plum-900/60 font-normal mt-1 max-w-md">
            {step === 3
              ? 'Calculated fresh based on real ingredients your pup loves.'
              : 'Let’s find their perfect bowl in two quick clicks.'}
          </p>
        </div>

        {/* STEP 1 & 2: Taste-based interactive question */}
        {step < 3 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-butter-50/50 rounded-xl border border-plum-900/10 p-6 sm:p-10 shadow-sm">
            
            {/* Left Column: Interactive Selector */}
            <div className="lg:col-span-7">
              {step === 1 ? (
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-plum-900 mb-2 flex items-center gap-2">
                    <span>Pick a protein:</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-coral-500/10 text-coral-600 font-medium">Step 1 of 2</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-plum-900/60 mb-6">
                    Choose what usually gets their tail wagging fastest at dinner.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
                    {PROTEIN_OPTIONS.map((item) => {
                      const isSelected = selectedProtein === item.id;
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setSelectedProtein(item.id)}
                          className={`flex flex-col items-center text-center p-4 rounded-lg border-2 transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-white border-coral-500 shadow-md scale-105 ring-2 ring-coral-500/20'
                              : 'bg-white/80 border-plum-900/10 hover:border-plum-900/30'
                          }`}
                        >
                          <div className={`w-11 h-11 rounded-md flex items-center justify-center mb-2.5 transition-colors ${
                            isSelected ? 'bg-coral-500 text-white' : 'bg-butter-200/60 text-plum-900'
                          }`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="font-bold text-sm text-plum-900">{item.label}</span>
                          <span className="text-[10px] text-plum-900/50 mt-1">{item.desc}</span>
                        </button>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="bg-plum-900 hover:bg-plum-800 text-white font-bold text-sm px-8 py-3.5 rounded-full shadow hover:shadow-md transition-all inline-flex items-center gap-2"
                  >
                    <span>Next: Pup Vibe</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </button>
                </div>
              ) : (
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-plum-900 mb-2 flex items-center gap-2">
                    <span>Pick their vibe:</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-coral-500/10 text-coral-600 font-medium">Step 2 of 2</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-plum-900/60 mb-6">
                    What best describes their daily personality and energy level?
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {VIBE_OPTIONS.map((vibe) => {
                      const isSelected = selectedVibe === vibe.id;
                      const Icon = vibe.icon;
                      return (
                        <button
                          key={vibe.id}
                          type="button"
                          onClick={() => setSelectedVibe(vibe.id)}
                          className={`flex items-center gap-3.5 p-4 rounded-lg border-2 text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-white border-coral-500 shadow-md ring-2 ring-coral-500/20'
                              : 'bg-white/80 border-plum-900/10 hover:border-plum-900/30'
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-md flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-coral-500 text-white' : 'bg-butter-200/60 text-plum-900'
                          }`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-bold text-sm text-plum-900">{vibe.label}</div>
                            <div className="text-[11px] text-plum-900/50">Customized nutrient profile</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="bg-white border border-plum-900/20 hover:bg-butter-100 text-plum-900 font-bold text-sm px-5 py-3.5 rounded-full transition-all inline-flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-4 h-4 shrink-0" />
                      <span>Back</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="bg-coral-500 hover:bg-coral-600 text-white font-bold text-sm px-8 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2"
                    >
                      <span>Show {activeDogName ? `${activeDogName}’s` : 'Bruno’s'} Matches</span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Joyous Border Collie with Happy Zoomies Sticker */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-56 sm:w-72 aspect-square">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-coral-500/10 to-butter-300/40 scale-105" />
                <Image
                  src="/images/home/quiz-border-collie.jpg"
                  alt="Playful happy dog ready for delicious meal"
                  fill
                  className="object-cover rounded-full p-2 relative z-10 shadow-lg"
                />

                <div className="absolute -bottom-2 -left-2 sm:-left-4 bg-white/95 backdrop-blur-xs border border-plum-900/10 rounded-lg p-3 shadow-lg z-20 -rotate-3 hover:rotate-0 transition-transform">
                  <p className="text-xs sm:text-sm font-extrabold text-plum-900 flex items-center gap-1.5">
                    <span>Good food =</span>
                    <span className="text-coral-500 font-bold inline-flex items-center gap-1">
                      Happy zoomies! <PawPrint className="w-3.5 h-3.5 inline" />
                    </span>
                  </p>
                  <div className="text-[10px] text-plum-900/50 font-medium mt-0.5">
                    Zero detective work required
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* STEP 3: Taste Profile Result (Matching Screen 3) */}
        {step === 3 && (
          <div className="bg-gradient-to-b from-butter-50 to-white rounded-xl border border-plum-900/10 p-6 sm:p-10 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Profile Avatar Card */}
              <div className="lg:col-span-4 text-center lg:text-left flex flex-col items-center lg:items-start">
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 mb-4">
                  <Image
                    src="/images/home/bruno-passport-dog.jpg"
                    alt="Bruno the taste explorer"
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
                  <div className="bg-white rounded-lg border-2 border-coral-500/30 p-5 shadow-lg relative overflow-hidden group hover:border-coral-500 transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-coral-500 text-white text-[11px] font-extrabold px-3 py-0.5 rounded-full tracking-wider uppercase inline-flex items-center gap-1">
                        <Star className="w-3 h-3 fill-white text-white shrink-0" />
                        <span>Most Loved • Top Match</span>
                      </span>
                      <span className="text-xs font-bold text-coral-600">₹{matches.topMatch.price}</span>
                    </div>

                    <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden mb-3.5 bg-butter-50 flex items-center justify-center p-2">
                      <Image
                        src={matches.topMatch.image}
                        alt={matches.topMatch.name}
                        fill
                        className="object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    <h4 className="text-xl font-bold text-plum-900 mb-1">{matches.topMatch.name}</h4>
                    <p className="text-xs text-plum-900/60 mb-2">{matches.topMatch.tags}</p>

                    <Link
                      href={`/shop/${matches.topMatch.slug}`}
                      className="w-full bg-plum-900 hover:bg-plum-800 text-white font-bold text-xs py-3 rounded text-center block transition-all shadow-sm"
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
                  <div className="bg-white rounded-xl border border-plum-900/10 p-3 flex items-center gap-3 hover:shadow-sm transition-shadow">
                    <div className="relative w-14 h-14 shrink-0 rounded-lg overflow-hidden bg-butter-50">
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

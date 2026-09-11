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
  Sparkles, 
  RotateCcw, 
  Star, 
  ArrowRight, 
  ArrowLeft 
} from 'lucide-react';
import { MOCKUP_RECIPES } from '@/lib/constants';

const PROTEIN_OPTIONS = [
  { id: 'chicken', label: 'Chicken', icon: Drumstick, desc: 'Lean & digestible farm poultry' },
  { id: 'egg', label: 'Egg', icon: Egg, desc: 'Superfood power & amino acids' },
  { id: 'lamb', label: 'Lamb', icon: Beef, desc: 'Hearty slow-cooked red meat' },
  { id: 'paneer', label: 'Paneer', icon: Salad, desc: '100% vegetarian calcium rich' },
];

const VIBE_OPTIONS = [
  { id: 'zoomies', label: 'High Energy & Zoomies', icon: Zap, desc: 'Fast runners & backyard athletes' },
  { id: 'tummy', label: 'Sensitive Tummy', icon: Leaf, desc: 'Needs prebiotic fiber & soothing veggies' },
  { id: 'picky', label: 'Picky Eater', icon: Crown, desc: 'Only accepts rich aroma & supreme taste' },
  { id: 'chill', label: 'Couch Cuddler', icon: Sofa, desc: 'Moderate activity & gentle comfort' },
];

export default function FindFoodPage() {
  const [step, setStep] = useState(1);
  const [pupName, setPupName] = useState('Bruno');
  const [selectedProtein, setSelectedProtein] = useState('chicken');
  const [selectedVibe, setSelectedVibe] = useState('zoomies');

  const getResults = () => {
    if (selectedProtein === 'chicken') {
      return {
        title: `Meet ${pupName || 'Pup'} — The Chicken Chaser`,
        desc: `${pupName || 'Your pup'} loves real poultry and crisp garden veggies. Here are their calibrated chef matches!`,
        topMatch: MOCKUP_RECIPES.find((r) => r.id === 'chicken-harvest'),
        secondMatch: MOCKUP_RECIPES.find((r) => r.id === 'chicken-homestyle'),
        wildCard: MOCKUP_RECIPES.find((r) => r.id === 'golden-chicken-broth'),
      };
    }
    if (selectedProtein === 'lamb') {
      return {
        title: `Meet ${pupName || 'Pup'} — The Flavor Champion`,
        desc: `${pupName || 'Your pup'} craves rich iron and hearty warmth. These slow-cooked stews are a match made in heaven!`,
        topMatch: MOCKUP_RECIPES.find((r) => r.id === 'lamb-lentil-harvest'),
        secondMatch: MOCKUP_RECIPES.find((r) => r.id === 'chicken-harvest'),
        wildCard: MOCKUP_RECIPES.find((r) => r.id === 'golden-chicken-broth'),
      };
    }
    if (selectedProtein === 'egg') {
      return {
        title: `Meet ${pupName || 'Pup'} — The Superfood Explorer`,
        desc: `${pupName || 'Your pup'} thrives on complete proteins, ancient grains, and natural stamina builders!`,
        topMatch: MOCKUP_RECIPES.find((r) => r.id === 'golden-egg-quinoa'),
        secondMatch: MOCKUP_RECIPES.find((r) => r.id === 'paneer-greens'),
        wildCard: MOCKUP_RECIPES.find((r) => r.id === 'golden-chicken-broth'),
      };
    }
    return {
      title: `Meet ${pupName || 'Pup'} — The Gentle Gourmet`,
      desc: `${pupName || 'Your pup'} adores soft cottage cheese cubes and fresh wilted greens for smooth digestion!`,
      topMatch: MOCKUP_RECIPES.find((r) => r.id === 'paneer-greens'),
      secondMatch: MOCKUP_RECIPES.find((r) => r.id === 'golden-egg-quinoa'),
      wildCard: MOCKUP_RECIPES.find((r) => r.id === 'chicken-harvest'),
    };
  };

  const results = getResults();

  return (
    <div className="py-12 sm:py-20 bg-butter-50/30">
      <div className="container-main max-w-5xl">
        
        {/* Top Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-coral-600 bg-coral-500/10 px-3 py-1 rounded-full inline-block mb-3">
            Find Their Fresh Match
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-plum-900 tracking-tight mb-2">
            What does your pup love?
          </h1>
          <p className="text-sm sm:text-base text-plum-900/60 font-normal">
            Every bowl is tailored for individual tastes and digestive comfort. Let’s calibrate Bruno’s taste profile.
          </p>
        </div>

        {/* Step Tabs Indicator */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <button
            onClick={() => setStep(1)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
              step === 1 ? 'bg-plum-900 text-white shadow-sm' : 'bg-white border border-plum-900/10 text-plum-900/60'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">1</span>
            <span>Protein Preference</span>
          </button>
          <span className="text-plum-900/20">—</span>
          <button
            onClick={() => setStep(2)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
              step === 2 ? 'bg-plum-900 text-white shadow-sm' : 'bg-white border border-plum-900/10 text-plum-900/60'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">2</span>
            <span>Pup Vibe</span>
          </button>
          <span className="text-plum-900/20">—</span>
          <button
            onClick={() => setStep(3)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
              step === 3 ? 'bg-plum-900 text-white shadow-sm' : 'bg-white border border-plum-900/10 text-plum-900/60'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">3</span>
            <span>Taste Profile</span>
          </button>
        </div>

        {/* Step 1 & 2 Card */}
        {step < 3 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl border-2 border-plum-900/10 p-6 sm:p-12 shadow-sm">
            
            {/* Left Column: Form Question */}
            <div className="lg:col-span-7">
              {step === 1 ? (
                <div>
                  <div className="mb-6">
                    <label htmlFor="pupName" className="block text-xs font-bold uppercase tracking-wider text-plum-900/60 mb-1.5">
                      Your dog’s name:
                    </label>
                    <input
                      id="pupName"
                      type="text"
                      value={pupName}
                      onChange={(e) => setPupName(e.target.value)}
                      placeholder="e.g. Bruno"
                      className="w-full max-w-xs px-4 py-2.5 rounded-xl border border-plum-900/20 text-plum-900 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-coral-500/20"
                    />
                  </div>

                  <h2 className="text-xl sm:text-2xl font-black text-plum-900 mb-2">
                    Pick a protein {pupName ? `for ${pupName}` : ''}:
                  </h2>
                  <p className="text-xs sm:text-sm text-plum-900/60 mb-6 font-normal">
                    Choose what usually gets their tail wagging fastest at dinner time.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                    {PROTEIN_OPTIONS.map((item) => {
                      const isSelected = selectedProtein === item.id;
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setSelectedProtein(item.id)}
                          className={`flex flex-col items-center text-center p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-butter-50/80 border-coral-500 shadow-md scale-105 ring-2 ring-coral-500/20'
                              : 'bg-white border-plum-900/10 hover:border-plum-900/30'
                          }`}
                        >
                          <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-2 transition-colors ${
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
                    className="bg-plum-900 hover:bg-plum-800 text-white font-black text-sm px-8 py-3.5 rounded-full shadow hover:shadow-md transition-all inline-flex items-center gap-2"
                  >
                    <span>Next: Select Vibe</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </button>
                </div>
              ) : (
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-plum-900 mb-2">
                    What’s {pupName || 'their'} daily vibe?
                  </h2>
                  <p className="text-xs sm:text-sm text-plum-900/60 mb-6 font-normal">
                    Personality and activity levels help us calculate daily calorie and digestion needs.
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
                          className={`flex items-center gap-3.5 p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-butter-50/80 border-coral-500 shadow-md ring-2 ring-coral-500/20'
                              : 'bg-white border-plum-900/10 hover:border-plum-900/30'
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-coral-500 text-white' : 'bg-butter-200/60 text-plum-900'
                          }`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-bold text-sm text-plum-900">{vibe.label}</div>
                            <div className="text-[11px] text-plum-900/50">{vibe.desc}</div>
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
                      className="bg-coral-500 hover:bg-coral-600 text-white font-black text-sm px-8 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2"
                    >
                      <span>Show Taste Profile</span>
                      <Sparkles className="w-4 h-4 shrink-0" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Joyous Dog with Zoomies annotation */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-64 sm:w-80 aspect-square">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-coral-500/10 to-butter-300/50 scale-105" />
                <Image
                  src="/images/home/quiz-border-collie.jpg"
                  alt="Happy dog smiling in quiz"
                  fill
                  className="object-cover rounded-full p-2 relative z-10 shadow-lg"
                />

                <div className="absolute -bottom-2 -left-2 sm:-left-4 bg-white/95 backdrop-blur-xs border border-plum-900/10 rounded-2xl p-3 shadow-lg z-20 -rotate-3 hover:rotate-0 transition-transform">
                  <p className="text-xs sm:text-sm font-extrabold text-plum-900 flex items-center gap-1.5">
                    <span>Good food =</span>
                    <span className="text-coral-500 font-black inline-flex items-center gap-1">
                      Happy zoomies! <PawPrint className="w-3.5 h-3.5 inline" />
                    </span>
                  </p>
                  <div className="text-[10px] text-plum-900/50 font-medium mt-0.5">
                    100% human-grade real recipes
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Step 3: Full Taste Profile Result Matching Screen 3 */}
        {step === 3 && (
          <div className="bg-white rounded-3xl border-2 border-plum-900/10 p-6 sm:p-12 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Profile Avatar Card */}
              <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="relative w-32 h-32 mb-4">
                  <Image
                    src="/images/home/bruno-passport-dog.jpg"
                    alt={pupName || 'Bruno'}
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

                <h2 className="text-2xl sm:text-3xl font-black text-plum-900 tracking-tight mb-2">
                  {results.title}
                </h2>

                <p className="text-xs sm:text-sm text-plum-900/70 leading-relaxed mb-6">
                  {results.desc}
                </p>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs font-bold text-plum-900/60 hover:text-plum-900 underline flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 shrink-0" />
                  <span>Recalculate Taste Profile</span>
                </button>
              </div>

              {/* Center Main Top Match Card */}
              <div className="lg:col-span-5">
                {results.topMatch && (
                  <div className="bg-butter-50/60 rounded-3xl border-2 border-coral-500/40 p-6 shadow-lg relative overflow-hidden group hover:border-coral-500 transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-coral-500 text-white text-[11px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
                        <Star className="w-3 h-3 fill-white text-white shrink-0" />
                        <span>Top Match</span>
                      </span>
                      <span className="text-sm font-black text-coral-600">₹{results.topMatch.price}</span>
                    </div>

                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-white flex items-center justify-center p-3 shadow-inner">
                      <Image
                        src={results.topMatch.image}
                        alt={results.topMatch.name}
                        fill
                        className="object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    <h3 className="text-2xl font-black text-plum-900 mb-1">{results.topMatch.name}</h3>
                    <p className="text-xs text-plum-900/60 mb-4">{results.topMatch.tags}</p>

                    <Link
                      href={`/shop/${results.topMatch.slug}`}
                      className="w-full bg-plum-900 hover:bg-plum-800 text-white font-black text-sm py-3.5 rounded-full text-center block transition-all shadow-sm inline-flex items-center justify-center gap-1"
                    >
                      <span>View Product &amp; Order</span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </Link>
                  </div>
                )}
              </div>

              {/* Right Secondary Cards */}
              <div className="lg:col-span-3 flex flex-col gap-4">
                <span className="text-[11px] font-bold text-plum-900/50 uppercase tracking-wider">
                  Recommended Add-Ons
                </span>

                {results.secondMatch && (
                  <div className="bg-white rounded-2xl border border-plum-900/10 p-3.5 flex items-center gap-3 hover:shadow-md transition-shadow">
                    <div className="relative w-16 h-16 shrink-0 rounded-xl overflow-hidden bg-butter-50">
                      <Image
                        src={results.secondMatch.image}
                        alt={results.secondMatch.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-bold text-coral-600 uppercase">Runner Up</div>
                      <div className="text-xs font-black text-plum-900 truncate">{results.secondMatch.name}</div>
                      <div className="text-[10px] text-plum-900/50">₹{results.secondMatch.price}</div>
                    </div>
                    <Link
                      href={`/shop/${results.secondMatch.slug}`}
                      className="text-xs font-bold text-coral-600 hover:text-coral-700 shrink-0"
                    >
                      →
                    </Link>
                  </div>
                )}

                {results.wildCard && (
                  <div className="bg-white rounded-2xl border border-plum-900/10 p-3.5 flex items-center gap-3 hover:shadow-md transition-shadow">
                    <div className="relative w-16 h-16 shrink-0 rounded-xl overflow-hidden bg-butter-50">
                      <Image
                        src={results.wildCard.image}
                        alt={results.wildCard.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-bold text-plum-900/70 uppercase">Hydration Boost</div>
                      <div className="text-xs font-black text-plum-900 truncate">{results.wildCard.name}</div>
                      <div className="text-[10px] text-plum-900/50">₹{results.wildCard.price}</div>
                    </div>
                    <Link
                      href={`/shop/${results.wildCard.slug}`}
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
    </div>
  );
}

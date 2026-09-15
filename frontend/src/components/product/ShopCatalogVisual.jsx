'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ShoppingBag, Check, Sparkles, Package, Star, ShieldCheck, Filter } from 'lucide-react';
import { MOCKUP_RECIPES } from '@/lib/constants';
import { TRIAL_PACKS, MULTI_PACK_SIZES } from '@/lib/furbowl-data';
import useCartStore from '@/store/cartStore';

const TABS = [
  { id: 'meals', label: 'Fresh Meals', icon: '🍲', count: '5 Recipes' },
  { id: 'trial-packs', label: 'Curated Trial Packs', icon: '🎁', count: '5 Packs' },
  { id: 'multi-packs', label: 'Value Bundles', icon: '📦', count: 'Up to 25% Off' },
];

const POUCH_IMAGE_MAP = {
  'chicken-vegetables': '/images/products/chicken-harvest-front.jpg',
  'chicken-rice-vegetables': '/images/products/chicken-homestyle-front.jpg',
  'egg-superfood': '/images/products/golden-egg-quinoa-front.jpg',
  'paneer-vegetables': '/images/products/paneer-greens-front.jpg',
  'lamb-lentils': '/images/products/lamb-lentil-harvest-front.jpg',
};

const RECIPE_VISUALS = {
  'chicken-vegetables': {
    name: 'Chicken & Vegetables',
    isVeg: false,
    ingredients: [
      { label: 'Chicken', icon: '🍗' },
      { label: 'Carrot', icon: '🥕' },
      { label: 'Pumpkin', icon: '🎃' },
      { label: 'Peas', icon: '🫛' },
    ],
    bgLight: 'from-[#fff5f0] to-[#fef8f4]',
    border: 'border-orange-200/70',
    badge: 'Best Seller',
    badgeBg: 'bg-peach-500 text-white',
  },
  'chicken-rice-vegetables': {
    name: 'Chicken Rice & Veggies',
    isVeg: false,
    ingredients: [
      { label: 'Chicken', icon: '🍗' },
      { label: 'Rice', icon: '🍚' },
      { label: 'Carrot', icon: '🥕' },
      { label: 'Sweet Potato', icon: '🍠' },
    ],
    bgLight: 'from-[#fbf7ee] to-[#fcf9f2]',
    border: 'border-amber-200/70',
    badge: 'Gentle Belly',
    badgeBg: 'bg-teal-600 text-white',
  },
  'egg-superfood': {
    name: 'Egg Superfood & Quinoa',
    isVeg: true,
    ingredients: [
      { label: 'Farm Eggs', icon: '🥚' },
      { label: 'Quinoa', icon: '🌾' },
      { label: 'Spinach', icon: '🥬' },
      { label: 'Pumpkin', icon: '🎃' },
    ],
    bgLight: 'from-[#f0faf8] to-[#f5fbf9]',
    border: 'border-emerald-200/70',
    badge: 'Superfood',
    badgeBg: 'bg-emerald-600 text-white',
  },
  'paneer-vegetables': {
    name: 'Paneer & Vegetables',
    isVeg: true,
    ingredients: [
      { label: 'Fresh Paneer', icon: '🧀' },
      { label: 'Brown Rice', icon: '🍚' },
      { label: 'Spinach', icon: '🥬' },
      { label: 'Chia', icon: '🌱' },
    ],
    bgLight: 'from-[#f4faf2] to-[#fafdf9]',
    border: 'border-green-200/70',
    badge: '100% Veg',
    badgeBg: 'bg-green-600 text-white',
  },
  'lamb-lentils': {
    name: 'Lamb & Lentils',
    isVeg: false,
    ingredients: [
      { label: 'Lean Lamb', icon: '🥩' },
      { label: 'Red Lentils', icon: '🫘' },
      { label: 'Broccoli', icon: '🥦' },
      { label: 'Sweet Potato', icon: '🍠' },
    ],
    bgLight: 'from-[#fff3f2] to-[#fdf7f6]',
    border: 'border-rose-200/70',
    badge: 'High Protein',
    badgeBg: 'bg-rose-500 text-white',
  },
};

export default function ShopCatalogVisual({ initialTab = 'meals' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [dietFilter, setDietFilter] = useState('ALL'); // 'ALL' | 'VEG' | 'NON_VEG'
  const [addedSlug, setAddedSlug] = useState(null);
  const addItem = useCartStore((state) => state.addItem);

  const handleQuickAddMeal = (e, recipe) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(
      {
        id: recipe.id,
        name: recipe.name,
        slug: recipe.slug,
        isVeg: recipe.slug.includes('paneer') || recipe.slug.includes('egg'),
        images: [{ url: recipe.image, altText: recipe.name }],
      },
      {
        id: `variant-${recipe.id}`,
        mrp: recipe.price + 20,
        sellingPrice: recipe.price,
        size: recipe.weight,
      },
      1
    );
    setAddedSlug(recipe.slug);
    setTimeout(() => setAddedSlug(null), 1800);
  };

  const handleQuickAddPack = (e, pack) => {
    e.preventDefault();
    e.stopPropagation();
    const primaryImg =
      (pack.breakdown && pack.breakdown[0] && POUCH_IMAGE_MAP[pack.breakdown[0].mealId]) ||
      '/images/products/chicken-harvest-front.jpg';

    addItem(
      {
        id: pack.id,
        name: pack.title,
        slug: pack.slug,
        isVeg: false,
        images: [{ url: primaryImg, altText: pack.title }],
      },
      {
        id: `variant-${pack.id}`,
        mrp: pack.originalPrice,
        sellingPrice: pack.price,
        size: pack.size || `${pack.packCount} x 100g`,
      },
      1
    );
    setAddedSlug(pack.slug);
    setTimeout(() => setAddedSlug(null), 1800);
  };

  const getPackPouches = (pack) => {
    const list = [];
    if (pack.breakdown) {
      pack.breakdown.forEach((item) => {
        for (let i = 0; i < item.count; i++) {
          list.push({
            name: item.name,
            img: POUCH_IMAGE_MAP[item.mealId] || '/images/products/chicken-harvest-front.jpg',
          });
        }
      });
    }
    return list;
  };

  const filteredMeals = MOCKUP_RECIPES.filter((r) => {
    const isVeg = r.slug.includes('paneer') || r.slug.includes('egg');
    if (dietFilter === 'VEG') return isVeg;
    if (dietFilter === 'NON_VEG') return !isVeg;
    return true;
  });

  return (
    <div className="w-full">
      {/* Top Controls: Visual Tabs & Dietary Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        {/* Visual Pill Tabs */}
        <div className="inline-flex p-1.5 bg-[#faf6ed] rounded-2xl border border-plum-900/10 shadow-xs shrink-0 self-start md:self-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`text-xs sm:text-sm font-extrabold px-3.5 sm:px-5 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-plum-900 text-white shadow-md'
                  : 'text-plum-900/70 hover:text-plum-900 hover:bg-plum-900/5'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              <span
                className={`hidden sm:inline-block text-[10px] px-1.5 py-0.5 rounded-md font-black ${
                  activeTab === tab.id
                    ? 'bg-white/20 text-white'
                    : 'bg-plum-900/10 text-plum-900/60'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Dietary Filter (for Fresh Meals tab) */}
        {activeTab === 'meals' && (
          <div className="inline-flex items-center p-1 bg-white rounded-xl border border-plum-900/10 shadow-xs self-start md:self-auto">
            <button
              type="button"
              onClick={() => setDietFilter('ALL')}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                dietFilter === 'ALL'
                  ? 'bg-plum-900 text-white'
                  : 'text-plum-900/70 hover:text-plum-900'
              }`}
            >
              All (5)
            </button>
            <button
              type="button"
              onClick={() => setDietFilter('NON_VEG')}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                dietFilter === 'NON_VEG'
                  ? 'bg-amber-800 text-white'
                  : 'text-plum-900/70 hover:text-plum-900'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span>
              <span>Non-Veg (3)</span>
            </button>
            <button
              type="button"
              onClick={() => setDietFilter('VEG')}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                dietFilter === 'VEG'
                  ? 'bg-green-700 text-white'
                  : 'text-plum-900/70 hover:text-plum-900'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
              <span>100% Veg (2)</span>
            </button>
          </div>
        )}
      </div>

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* TAB 1: FRESH MEALS (PURELY VISUAL 5 RECIPES)                      */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      {activeTab === 'meals' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 sm:gap-6">
          {filteredMeals.map((recipe) => {
            const visual = RECIPE_VISUALS[recipe.id] || {
              name: recipe.name,
              isVeg: false,
              ingredients: [],
              bgLight: 'from-amber-50/40 to-white',
              border: 'border-plum-900/10',
              badge: recipe.badge,
              badgeBg: 'bg-plum-900 text-white',
            };

            return (
              <div
                key={recipe.id}
                className={`group relative rounded-3xl p-4 sm:p-5 border-2 ${visual.border} bg-gradient-to-b ${visual.bgLight} transition-all duration-300 flex flex-col justify-between hover:-translate-y-2 hover:shadow-xl hover:border-plum-900/20`}
              >
                {/* Top Pill Bar: Veg/Non-Veg Icon & Category Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1.5">
                    {visual.isVeg ? (
                      <span
                        className="w-4 h-4 border-1.5 border-green-600 flex items-center justify-center rounded-xs bg-white shadow-2xs"
                        title="100% Vegetarian"
                      >
                        <span className="w-2 h-2 rounded-full bg-green-600"></span>
                      </span>
                    ) : (
                      <span
                        className="w-4 h-4 border-1.5 border-amber-800 flex items-center justify-center rounded-xs bg-white shadow-2xs"
                        title="Non-Vegetarian"
                      >
                        <span className="w-2 h-2 rounded-full bg-amber-800"></span>
                      </span>
                    )}
                    <span className="text-[11px] font-bold text-plum-900/60">
                      100g
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-2xs ${visual.badgeBg}`}
                  >
                    {visual.badge}
                  </span>
                </div>

                {/* HERO POUCH IMAGE */}
                <Link
                  href={`/shop/${recipe.slug}`}
                  className="relative block w-full aspect-[4/5] my-2 focus:outline-none"
                >
                  <div className="relative w-full h-full rounded-2xl overflow-hidden flex items-center justify-center p-3 bg-white/70 backdrop-blur-xs border border-white/80 group-hover:bg-white transition-all shadow-inner">
                    <Image
                      src={recipe.image}
                      alt={visual.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                      className="object-contain p-2 drop-shadow-[0_12px_20px_rgba(42,26,46,0.12)] group-hover:drop-shadow-[0_18px_26px_rgba(42,26,46,0.18)] group-hover:scale-108 transition-all duration-300"
                    />
                  </div>
                </Link>

                {/* Recipe Name */}
                <div className="mt-2 mb-3">
                  <Link href={`/shop/${recipe.slug}`} className="focus:outline-none block">
                    <h3 className="text-base sm:text-lg font-black text-plum-900 hover:text-teal-600 transition-colors leading-tight line-clamp-1">
                      {visual.name}
                    </h3>
                  </Link>

                  {/* Visual Ingredient Micro-Pills */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {visual.ingredients.map((ing, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 text-[10px] font-bold text-plum-900/75 bg-white/80 border border-plum-900/5 px-2 py-0.5 rounded-full shadow-2xs"
                      >
                        <span>{ing.icon}</span>
                        <span>{ing.label}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Pricing & One-Click Add Button */}
                <div className="pt-3 border-t border-plum-900/10 flex items-center justify-between mt-auto">
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg font-black text-plum-900">₹{recipe.price}</span>
                      <span className="text-[11px] text-plum-900/40 line-through">₹{recipe.price + 20}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={(e) => handleQuickAddMeal(e, recipe)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-black transition-all flex items-center gap-1.5 shadow-sm cursor-pointer ${
                        addedSlug === recipe.slug
                          ? 'bg-peach-500 text-white scale-95'
                          : 'bg-teal-500 hover:bg-teal-600 text-white hover:scale-105 active:scale-95'
                      }`}
                    >
                      {addedSlug === recipe.slug ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </>
                      )}
                    </button>

                    <Link
                      href={`/shop/${recipe.slug}`}
                      className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-plum-900/70 shadow-2xs hover:bg-plum-900 hover:text-white transition-all border border-plum-900/10"
                      aria-label={`View ${visual.name}`}
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* TAB 2: CURATED TRIAL PACKS (OVERLAPPING VISUAL POUCHES)            */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      {activeTab === 'trial-packs' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {TRIAL_PACKS.map((pack) => {
            const pouches = getPackPouches(pack);

            return (
              <div
                key={pack.id}
                className={`group relative rounded-3xl p-5 sm:p-6 border-2 transition-all duration-300 flex flex-col justify-between hover:-translate-y-2 hover:shadow-xl bg-white ${
                  pack.flagship
                    ? 'border-teal-500 ring-2 ring-teal-500/20 bg-gradient-to-b from-teal-50/30 to-white'
                    : 'border-plum-900/10 hover:border-teal-400/60'
                }`}
              >
                {/* Top Header & Discount */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-2xs ${
                      pack.flagship
                        ? 'bg-teal-600 text-white'
                        : 'bg-peach-500 text-white'
                    }`}
                  >
                    {pack.badge}
                  </span>
                  <span className="text-xs font-black text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                    {pack.discount}
                  </span>
                </div>

                {/* VISUAL POUCH FAN / STACK SHOWCASE */}
                <div className="relative w-full h-44 sm:h-48 my-2 rounded-2xl bg-[#faf6ed] border border-plum-900/5 overflow-hidden flex items-center justify-center p-2 shadow-inner">
                  {/* Floating Pouch Count Pill */}
                  <span className="absolute top-2.5 left-2.5 z-20 text-[10px] font-black uppercase tracking-wider bg-white/95 text-plum-900 px-2.5 py-1 rounded-full shadow-xs border border-plum-900/10 flex items-center gap-1">
                    <Package className="w-3 h-3 text-teal-600" />
                    <span>{pack.packCount} Fresh Pouches ({pack.totalWeight})</span>
                  </span>

                  {/* Overlapping Visual Pouches */}
                  <div className="flex items-center justify-center -space-x-8 sm:-space-x-10 group-hover:-space-x-6 transition-all duration-300 pt-4">
                    {pouches.map((pouch, pIdx) => (
                      <div
                        key={pIdx}
                        className="relative w-24 h-32 sm:w-28 sm:h-36 shrink-0 transition-transform duration-300 drop-shadow-[0_8px_14px_rgba(42,26,46,0.14)] group-hover:scale-105"
                        style={{
                          transform: `rotate(${(pIdx - (pouches.length - 1) / 2) * 5}deg)`,
                          zIndex: pIdx + 1,
                        }}
                      >
                        <Image
                          src={pouch.img}
                          alt={pouch.name}
                          fill
                          sizes="120px"
                          className="object-contain"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pack Title & Clean Summary */}
                <div className="my-3">
                  <h3 className="text-lg sm:text-xl font-black text-plum-900 leading-snug">
                    {pack.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-xs font-extrabold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200/50">
                      {pack.tagline}
                    </span>
                  </div>
                </div>

                {/* Bottom Pricing & One-Click Add */}
                <div className="pt-4 border-t border-plum-900/10 flex items-center justify-between mt-auto">
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-black text-plum-900">₹{pack.price}</span>
                      <span className="text-xs text-plum-900/40 line-through">₹{pack.originalPrice}</span>
                    </div>
                    <span className="text-[10px] text-plum-900/60 font-bold block">
                      ₹{Math.round(pack.price / pack.packCount)} / meal
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => handleQuickAddPack(e, pack)}
                    className={`px-5 py-2.5 rounded-full text-xs font-black transition-all flex items-center gap-2 shadow-md cursor-pointer ${
                      addedSlug === pack.slug
                        ? 'bg-peach-500 text-white scale-95'
                        : 'bg-plum-900 hover:bg-plum-800 text-white hover:scale-105 active:scale-95'
                    }`}
                  >
                    {addedSlug === pack.slug ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Cart</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Get Trial Pack</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* TAB 3: VALUE MULTI-PACK BUNDLES                                   */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      {activeTab === 'multi-packs' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {MULTI_PACK_SIZES.map((pack) => {
            const savings =
              pack.count >= 30
                ? 'Save 25%'
                : pack.count >= 15
                ? 'Save 20%'
                : pack.count >= 10
                ? 'Save 15%'
                : pack.count >= 7
                ? 'Save 12%'
                : 'Save 10%';

            return (
              <div
                key={pack.count}
                className={`group p-5 rounded-3xl border-2 transition-all duration-300 flex flex-col justify-between bg-white hover:-translate-y-2 hover:shadow-xl ${
                  pack.isFlagship
                    ? 'border-teal-500 shadow-md ring-2 ring-teal-500/20 bg-gradient-to-b from-teal-50/20 to-white'
                    : 'border-plum-900/10 hover:border-teal-400'
                }`}
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-10 h-10 rounded-2xl bg-plum-900 text-white font-black text-sm flex items-center justify-center shadow-xs">
                      {pack.count}x
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                      {savings}
                    </span>
                  </div>

                  {/* Visual Lineup Thumbnail */}
                  <div className="relative w-full aspect-[16/10] my-2 rounded-2xl overflow-hidden bg-[#faf6ed] border border-plum-900/5 flex items-center justify-center p-2">
                    <Image
                      src="/images/products/furbowl-6-products-lineup.jpg"
                      alt={`${pack.count} Pack FurBowl Meals`}
                      fill
                      sizes="240px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-plum-900/40 via-transparent to-transparent"></div>
                    <span className="absolute bottom-2 left-2 z-10 text-[10px] font-black uppercase tracking-wider text-white bg-plum-900/80 px-2 py-0.5 rounded-md backdrop-blur-xs">
                      {pack.count} Pouches
                    </span>
                  </div>

                  <h4 className="font-black text-plum-900 text-base sm:text-lg mb-1 leading-tight mt-2">
                    {pack.title}
                  </h4>
                  <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md inline-block mt-1">
                    {pack.popularFor}
                  </span>
                </div>

                {/* CTA Button */}
                <div className="mt-5 pt-3 border-t border-plum-900/5">
                  <button
                    type="button"
                    onClick={() => setActiveTab('trial-packs')}
                    className="w-full py-2.5 rounded-full text-xs font-black text-center bg-plum-900 hover:bg-plum-800 text-white block transition-all shadow-sm hover:shadow-md cursor-pointer"
                  >
                    View Flavours &bull; {savings}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

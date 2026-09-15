'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ShoppingBag, Check, Package, Star, ShieldCheck, Filter } from 'lucide-react';
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
    subtitle: 'Whole chicken, liver, pumpkin & peas',
    isVeg: false,
    badge: 'BEST SELLER',
    isSuperSaver: true,
  },
  'chicken-rice-vegetables': {
    name: 'Chicken Rice & Veggies',
    subtitle: 'Slow-cooked chicken, rice & sweet potato',
    isVeg: false,
    badge: 'GENTLE BELLY',
    isSuperSaver: false,
  },
  'egg-superfood': {
    name: 'Egg Superfood & Quinoa',
    subtitle: 'Farm eggs, organic quinoa & spinach',
    isVeg: true,
    badge: 'SUPERFOOD',
    isSuperSaver: false,
  },
  'paneer-vegetables': {
    name: 'Paneer & Vegetables',
    subtitle: 'Fresh paneer, brown rice & chia seeds',
    isVeg: true,
    badge: '100% VEG',
    isSuperSaver: false,
  },
  'lamb-lentils': {
    name: 'Lamb & Lentils',
    subtitle: 'Lean lamb, red lentils & broccoli',
    isVeg: false,
    badge: 'HIGH PROTEIN',
    isSuperSaver: true,
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
      {/* TAB 1: FRESH MEALS (5 RECIPES)                                    */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      {activeTab === 'meals' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5">
          {filteredMeals.map((recipe) => {
            const visual = RECIPE_VISUALS[recipe.id] || {
              name: recipe.name,
              subtitle: '100% Human-Grade • Fresh Daily Meal',
              isVeg: recipe.slug.includes('paneer') || recipe.slug.includes('egg'),
              badge: recipe.badge || 'FRESH',
              isSuperSaver: false,
            };

            return (
              <div
                key={recipe.id}
                className="rounded-2xl bg-white border border-plum-900/10 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                {/* ─── Clickable Card Area (Pouch + Details) ─── */}
                <Link
                  href={`/shop/${recipe.slug}`}
                  className="flex-1 flex flex-col justify-between focus:outline-none group/link"
                >
                  {/* ─── Upper Image Area ─── */}
                  <div className="relative w-full h-[225px] sm:h-[240px] bg-[#faf6ed]/90 flex items-center justify-center overflow-hidden select-none border-b border-plum-900/5">
                    
                    {/* Top-Left Badge — FurBowl Peach */}
                    <div className="absolute top-2.5 left-2.5 z-20">
                      <span className="text-[11px] font-black tracking-wider text-white bg-peach-500 px-2.5 py-0.5 rounded-[3px] shadow-xs uppercase">
                        {visual.badge}
                      </span>
                    </div>

                    {/* Top-Right SUPER SAVER Ribbon Badge — Amber Gold */}
                    {visual.isSuperSaver && (
                      <div className="absolute top-0 right-3 z-20">
                        <div className="relative bg-amber-500 text-white text-[8.5px] font-black uppercase tracking-wider px-2 pt-1.5 pb-2 shadow-xs text-center flex flex-col items-center leading-none">
                          <span>SUPER</span>
                          <span className="mt-0.5">•SAVER•</span>
                          {/* Ribbon notch cut-out */}
                          <div
                            className="absolute -bottom-1.5 left-0 right-0 h-1.5 bg-amber-500"
                            style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Stand-Up Retort Pouch / Product Mockup */}
                    <div className="relative w-full h-full p-2.5 flex items-center justify-center">
                      <Image
                        src={recipe.image}
                        alt={visual.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                        className="object-contain transition-transform duration-300 group-hover:scale-103"
                      />
                    </div>

                    {/* Bottom Center Pack Pill */}
                    <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap">
                      <span className="text-xs font-bold text-plum-900 bg-white/95 backdrop-blur-xs px-3 py-0.5 rounded-full shadow-xs border border-plum-900/10 flex items-center gap-1.5">
                        {visual.isVeg ? (
                          <span className="w-2 h-2 rounded-full bg-green-600" title="100% Vegetarian"></span>
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-amber-800" title="Non-Vegetarian"></span>
                        )}
                        <span>100g Single Pouch</span>
                      </span>
                    </div>
                  </div>

                  {/* ─── Lower Details Area ─── */}
                  <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-1 bg-white">
                    <div>
                      {/* Title */}
                      <h3 className="font-bold text-[14.5px] text-plum-900 group-hover/link:text-teal-600 transition-colors leading-snug line-clamp-1">
                        {visual.name}
                      </h3>

                      {/* Subtitle */}
                      <p className="text-xs text-plum-900/60 font-medium mt-0.5 line-clamp-1">
                        {visual.subtitle}
                      </p>

                      {/* Price */}
                      <div className="flex items-baseline gap-2 mt-2.5 mb-1">
                        <span className="text-base sm:text-lg font-black text-plum-900">
                          ₹{recipe.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-plum-900/40 line-through">
                          ₹{(recipe.price + 20).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Add to Cart Button Footer — FurBowl Teal */}
                <div className="px-3.5 pb-3.5 sm:px-4 sm:pb-4 pt-0 bg-white">
                  <button
                    type="button"
                    onClick={(e) => handleQuickAddMeal(e, recipe)}
                    className={`w-full py-2.5 rounded-lg text-sm font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-98 ${
                      addedSlug === recipe.slug
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#15aec0] hover:bg-[#0f8e9d] text-white shadow-sm'
                    }`}
                  >
                    {addedSlug === recipe.slug ? (
                      <>
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>Added to Cart</span>
                      </>
                    ) : (
                      <span>Add to Cart</span>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* TAB 2: CURATED TRIAL PACKS                                         */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      {activeTab === 'trial-packs' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {TRIAL_PACKS.map((pack) => {
            const pouches = getPackPouches(pack);

            return (
              <div
                key={pack.id}
                className="rounded-2xl bg-white border border-plum-900/10 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                {/* ─── Clickable Card Area ─── */}
                <Link
                  href={`/shop/${pack.slug}`}
                  className="flex-1 flex flex-col justify-between focus:outline-none group/link"
                >
                  {/* Upper Image Area */}
                  <div className="relative w-full h-[225px] sm:h-[240px] bg-[#faf6ed]/90 flex items-center justify-center overflow-hidden select-none border-b border-plum-900/5">
                    {/* Top-Left Discount Badge */}
                    <div className="absolute top-2.5 left-2.5 z-20">
                      <span className="text-[11px] font-black tracking-wider text-white bg-peach-500 px-2.5 py-0.5 rounded-[3px] shadow-xs uppercase">
                        {pack.discount}
                      </span>
                    </div>

                    {/* Top-Right SUPER SAVER Ribbon Badge */}
                    {pack.flagship && (
                      <div className="absolute top-0 right-3 z-20">
                        <div className="relative bg-amber-500 text-white text-[8.5px] font-black uppercase tracking-wider px-2 pt-1.5 pb-2 shadow-xs text-center flex flex-col items-center leading-none">
                          <span>SUPER</span>
                          <span className="mt-0.5">•SAVER•</span>
                          <div
                            className="absolute -bottom-1.5 left-0 right-0 h-1.5 bg-amber-500"
                            style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Overlapping Visual Pouches */}
                    <div className="flex items-center justify-center -space-x-8 sm:-space-x-10 group-hover:-space-x-6 transition-all duration-300 pt-2">
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

                    {/* Bottom Center Pack Pill */}
                    <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap">
                      <span className="text-xs font-bold text-plum-900 bg-white/95 backdrop-blur-xs px-3.5 py-0.5 rounded-full shadow-xs border border-plum-900/10">
                        Pack of {pack.packCount} • {pack.totalWeight}
                      </span>
                    </div>
                  </div>

                  {/* Lower Details Area */}
                  <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-1 bg-white">
                    <div>
                      <h3 className="font-bold text-[15px] text-plum-900 group-hover/link:text-teal-600 transition-colors leading-snug line-clamp-1">
                        {pack.title}
                      </h3>
                      <p className="text-xs text-plum-900/60 font-medium mt-0.5 line-clamp-1">
                        {pack.tagline}
                      </p>
                      <div className="flex items-baseline gap-2 mt-2.5 mb-1">
                        <span className="text-base sm:text-lg font-black text-plum-900">
                          ₹{pack.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-plum-900/40 line-through">
                          ₹{pack.originalPrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Add to Cart Button Footer */}
                <div className="px-3.5 pb-3.5 sm:px-4 sm:pb-4 pt-0 bg-white">
                  <button
                    type="button"
                    onClick={(e) => handleQuickAddPack(e, pack)}
                    className={`w-full py-2.5 rounded-lg text-sm font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-98 ${
                      addedSlug === pack.slug
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#15aec0] hover:bg-[#0f8e9d] text-white shadow-sm'
                    }`}
                  >
                    {addedSlug === pack.slug ? (
                      <>
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>Added to Cart</span>
                      </>
                    ) : (
                      <span>Add to Cart</span>
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
                className="rounded-2xl bg-white border border-plum-900/10 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div className="flex-1 flex flex-col justify-between">
                  {/* Upper Image Area */}
                  <div className="relative w-full h-[225px] sm:h-[240px] bg-[#faf6ed]/90 flex items-center justify-center overflow-hidden select-none border-b border-plum-900/5">
                    {/* Top-Left Discount Badge */}
                    <div className="absolute top-2.5 left-2.5 z-20">
                      <span className="text-[11px] font-black tracking-wider text-white bg-peach-500 px-2.5 py-0.5 rounded-[3px] shadow-xs uppercase">
                        {savings}
                      </span>
                    </div>

                    {/* Top-Right Ribbon if Flagship */}
                    {pack.isFlagship && (
                      <div className="absolute top-0 right-3 z-20">
                        <div className="relative bg-amber-500 text-white text-[8.5px] font-black uppercase tracking-wider px-2 pt-1.5 pb-2 shadow-xs text-center flex flex-col items-center leading-none">
                          <span>SUPER</span>
                          <span className="mt-0.5">•SAVER•</span>
                          <div
                            className="absolute -bottom-1.5 left-0 right-0 h-1.5 bg-amber-500"
                            style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Lineup Image */}
                    <div className="relative w-full h-full p-2.5 flex items-center justify-center">
                      <Image
                        src="/images/products/bundles/furbowl-bundle-all-three.jpg"
                        alt={`${pack.count} Pack FurBowl Meals`}
                        fill
                        sizes="240px"
                        className="object-contain transition-transform duration-300 group-hover:scale-103"
                      />
                    </div>

                    {/* Bottom Center Pack Pill */}
                    <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap">
                      <span className="text-xs font-bold text-plum-900 bg-white/95 backdrop-blur-xs px-3.5 py-0.5 rounded-full shadow-xs border border-plum-900/10">
                        Pack of {pack.count}
                      </span>
                    </div>
                  </div>

                  {/* Lower Details Area */}
                  <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-1 bg-white">
                    <div>
                      <h3 className="font-bold text-[15px] text-plum-900 group-hover:text-teal-600 transition-colors leading-snug line-clamp-1">
                        {pack.title}
                      </h3>
                      <p className="text-xs text-plum-900/60 font-medium mt-0.5 line-clamp-1">
                        {pack.popularFor}
                      </p>
                      <div className="flex items-baseline gap-2 mt-2.5 mb-1">
                        <span className="text-base sm:text-lg font-black text-plum-900">
                          {savings}
                        </span>
                        <span className="text-xs text-plum-900/50 font-bold">
                          • {pack.count} x 100g Meals
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Button Footer */}
                <div className="px-3.5 pb-3.5 sm:px-4 sm:pb-4 pt-0 bg-white">
                  <button
                    type="button"
                    onClick={() => setActiveTab('trial-packs')}
                    className="w-full py-2.5 rounded-lg text-sm font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-98 bg-[#15aec0] hover:bg-[#0f8e9d] text-white shadow-sm"
                  >
                    <span>View Flavours &bull; {savings}</span>
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

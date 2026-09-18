'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ShoppingBag, Check, Package, Star, ShieldCheck, Filter, Heart } from 'lucide-react';
import { MOCKUP_RECIPES } from '@/lib/constants';
import { TRIAL_PACKS, MULTI_PACK_SIZES } from '@/lib/furbowl-data';
import useCartStore from '@/store/cartStore';
import useWishlistStore from '@/store/wishlistStore';

const TABS = [
  { id: 'meals', label: 'Fresh Meals', count: '5 Recipes' },
  { id: 'trial-packs', label: 'Curated Trial Packs', count: '5 Packs' },
  { id: 'multi-packs', label: 'Value Bundles', count: 'Up to 25% Off' },
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
  const { toggleItem: toggleWishlist, isWishlisted } = useWishlistStore();

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

  const filteredMeals = MOCKUP_RECIPES;

  return (
    <div className="w-full">
      {/* Top Controls: Visual Tabs & Dietary Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        {/* Visual Pill Tabs */}
        <div className="inline-flex items-center p-1 bg-stone-100/80 rounded-xl border border-stone-200/80 shadow-2xs shrink-0 self-start md:self-auto">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`text-xs sm:text-sm font-semibold px-3.5 sm:px-4 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-white text-plum-900 shadow-xs border border-plum-900/10'
                    : 'text-plum-900/60 hover:text-plum-900 hover:bg-white/50'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`hidden sm:inline-block text-[11px] px-2 py-0.5 rounded-full font-medium transition-colors ${
                    isActive
                      ? 'bg-teal-50 text-teal-700 border border-teal-200/50'
                      : 'bg-plum-900/[0.04] text-plum-900/50'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

      </div>

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* TAB 1: FRESH MEALS (5 RECIPES)                                    */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      {activeTab === 'meals' && (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2.5 sm:gap-5">
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
                className="rounded-lg bg-white border border-plum-900/10 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                {/* ─── Clickable Card Area (Pouch + Details) ─── */}
                <Link
                  href={`/shop/${recipe.slug}`}
                  className="flex-1 flex flex-col justify-between focus:outline-none group/link"
                >
                  {/* ─── Upper Image Area ─── */}
                  <div className="relative w-full h-[165px] sm:h-[240px] bg-[#faf6ed]/90 flex items-center justify-center overflow-hidden select-none border-b border-plum-900/5">
                    
                    {/* Top-Left Badge — FurBowl Peach */}
                    <div className="absolute top-2 sm:top-2.5 left-2 sm:left-2.5 z-20">
                      <span className="text-[9px] sm:text-[11px] font-black tracking-wider text-white bg-peach-500 px-1.5 sm:px-2.5 py-0.5 rounded-[3px] shadow-xs uppercase">
                        {visual.badge}
                      </span>
                    </div>

                    {/* Top-Right SUPER SAVER Ribbon Badge — Amber Gold */}
                    {visual.isSuperSaver && (
                      <div className="absolute top-0 right-2 sm:right-3 z-20">
                        <div className="relative bg-amber-500 text-white text-[7px] sm:text-[8.5px] font-black uppercase tracking-wider px-1.5 sm:px-2 pt-1 pb-1.5 sm:pt-1.5 sm:pb-2 shadow-xs text-center flex flex-col items-center leading-none">
                          <span>SUPER</span>
                          <span className="mt-0.5">•SAVER•</span>
                          {/* Ribbon notch cut-out */}
                          <div
                            className="absolute -bottom-1 sm:-bottom-1.5 left-0 right-0 h-1 sm:h-1.5 bg-amber-500"
                            style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Top-Right Wishlist Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleWishlist({
                          id: recipe.id,
                          name: visual.name,
                          slug: recipe.slug,
                          image: recipe.image,
                          price: recipe.price,
                          originalPrice: recipe.price + 20,
                          size: recipe.weight,
                        });
                      }}
                      aria-label={isWishlisted(recipe.id) ? "Remove from wishlist" : "Add to wishlist"}
                      title={isWishlisted(recipe.id) ? "In your Wishlist" : "Add to Wishlist"}
                      className={`absolute top-2 right-2 z-30 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all cursor-pointer active:scale-90 ${
                        isWishlisted(recipe.id)
                          ? 'bg-coral-50 text-coral-600 shadow-sm ring-1 ring-coral-400/40'
                          : 'bg-white/85 backdrop-blur-xs text-plum-900/40 hover:text-coral-500 hover:bg-white shadow-2xs'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 ${isWishlisted(recipe.id) ? 'fill-coral-500 text-coral-500 scale-110' : ''}`} />
                    </button>

                    {/* Stand-Up Retort Pouch / Product Mockup */}
                    <div className="relative w-full h-full p-2 sm:p-2.5 flex items-center justify-center">
                      <Image
                        src={recipe.image}
                        alt={visual.name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        className="object-contain transition-transform duration-300 group-hover:scale-103"
                      />
                    </div>

                    {/* Bottom Center Pack Pill */}
                    <div className="absolute bottom-2 sm:bottom-2.5 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap">
                      <span className="text-[9px] sm:text-xs font-bold text-plum-900 bg-white/95 backdrop-blur-xs px-2 sm:px-3 py-0.5 rounded-full shadow-xs border border-plum-900/10 flex items-center gap-1">
                        <span>100g Single Pouch</span>
                      </span>
                    </div>
                  </div>

                  {/* ─── Lower Details Area ─── */}
                  <div className="p-2 sm:px-4 sm:pt-3 sm:pb-1.5 flex flex-col justify-between flex-1 bg-white">
                    <div>
                      {/* Title */}
                      <h3 className="font-bold text-xs sm:text-[14.5px] text-plum-900 group-hover/link:text-teal-600 transition-colors leading-snug line-clamp-1">
                        {visual.name}
                      </h3>

                      {/* Subtitle */}
                      <p className="text-[10px] sm:text-xs text-plum-900/60 font-medium mt-0.5 line-clamp-1">
                        {visual.subtitle}
                      </p>

                      {/* Price */}
                      <div className="flex items-baseline gap-1.5 sm:gap-2 mt-1 sm:mt-1.5 mb-0.5">
                        <span className="text-sm sm:text-lg font-black text-plum-900">
                          ₹{recipe.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] sm:text-xs text-plum-900/40 line-through">
                          ₹{(recipe.price + 20).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Add to Cart Button Footer — FurBowl Teal */}
                <div className="px-2 pb-2 sm:px-4 sm:pb-3 pt-0 bg-white">
                  <button
                    type="button"
                    onClick={(e) => handleQuickAddMeal(e, recipe)}
                    className={`w-full py-2 sm:py-2.5 rounded text-xs sm:text-sm font-bold transition-all shadow-xs flex items-center justify-center gap-1 cursor-pointer active:scale-98 ${
                      addedSlug === recipe.slug
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#15aec0] hover:bg-[#0f8e9d] text-white shadow-sm'
                    }`}
                  >
                    {addedSlug === recipe.slug ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Added</span>
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
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6">
          {TRIAL_PACKS.map((pack) => {
            const pouches = getPackPouches(pack);

            return (
              <div
                key={pack.id}
                className="rounded-lg bg-white border border-plum-900/10 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                {/* ─── Clickable Card Area ─── */}
                <Link
                  href={`/shop/${pack.slug}`}
                  className="flex-1 flex flex-col justify-between focus:outline-none group/link"
                >
                  {/* Upper Image Area */}
                  <div className="relative w-full h-[165px] sm:h-[240px] bg-[#faf6ed]/90 flex items-center justify-center overflow-hidden select-none border-b border-plum-900/5">
                    {/* Top-Left Discount Badge */}
                    <div className="absolute top-2 sm:top-2.5 left-2 sm:left-2.5 z-20">
                      <span className="text-[9px] sm:text-[11px] font-black tracking-wider text-white bg-peach-500 px-1.5 sm:px-2.5 py-0.5 rounded-[3px] shadow-xs uppercase">
                        {pack.discount}
                      </span>
                    </div>

                    {/* Top-Right SUPER SAVER Ribbon Badge */}
                    {pack.flagship && (
                      <div className="absolute top-0 right-2 sm:right-3 z-20">
                        <div className="relative bg-amber-500 text-white text-[7px] sm:text-[8.5px] font-black uppercase tracking-wider px-1.5 sm:px-2 pt-1 pb-1.5 sm:pt-1.5 sm:pb-2 shadow-xs text-center flex flex-col items-center leading-none">
                          <span>SUPER</span>
                          <span className="mt-0.5">•SAVER•</span>
                          <div
                            className="absolute -bottom-1 sm:-bottom-1.5 left-0 right-0 h-1 sm:h-1.5 bg-amber-500"
                            style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Top-Right Wishlist Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleWishlist({
                          id: pack.id,
                          name: pack.title,
                          slug: pack.slug,
                          image: pouches[0]?.img || '/images/products/chicken-harvest-front.jpg',
                          price: pack.price,
                          originalPrice: pack.originalPrice,
                          size: `Pack of ${pack.packCount}`,
                        });
                      }}
                      aria-label={isWishlisted(pack.id) ? "Remove from wishlist" : "Add to wishlist"}
                      title={isWishlisted(pack.id) ? "In your Wishlist" : "Add to Wishlist"}
                      className={`absolute top-2 right-2 z-30 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all cursor-pointer active:scale-90 ${
                        isWishlisted(pack.id)
                          ? 'bg-coral-50 text-coral-600 shadow-sm ring-1 ring-coral-400/40'
                          : 'bg-white/85 backdrop-blur-xs text-plum-900/40 hover:text-coral-500 hover:bg-white shadow-2xs'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 ${isWishlisted(pack.id) ? 'fill-coral-500 text-coral-500 scale-110' : ''}`} />
                    </button>

                    {/* Overlapping Visual Pouches */}
                    <div className="flex items-center justify-center -space-x-5 sm:-space-x-10 group-hover:-space-x-4 sm:group-hover:-space-x-6 transition-all duration-300 pt-2">
                      {pouches.map((pouch, pIdx) => (
                        <div
                          key={pIdx}
                          className="relative w-16 h-22 sm:w-28 sm:h-36 shrink-0 transition-transform duration-300 drop-shadow-[0_6px_10px_rgba(42,26,46,0.14)] group-hover:scale-105"
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
                    <div className="absolute bottom-2 sm:bottom-2.5 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap">
                      <span className="text-[9px] sm:text-xs font-bold text-plum-900 bg-white/95 backdrop-blur-xs px-2 sm:px-3.5 py-0.5 rounded-full shadow-xs border border-plum-900/10">
                        Pack of {pack.packCount} • {pack.totalWeight}
                      </span>
                    </div>
                  </div>

                  {/* Lower Details Area */}
                  <div className="p-2 sm:px-4 sm:pt-3 sm:pb-1.5 flex flex-col justify-between flex-1 bg-white">
                    <div>
                      <h3 className="font-bold text-xs sm:text-[15px] text-plum-900 group-hover/link:text-teal-600 transition-colors leading-snug line-clamp-1">
                        {pack.title}
                      </h3>
                      <p className="text-[10px] sm:text-xs text-plum-900/60 font-medium mt-0.5 line-clamp-1">
                        {pack.tagline}
                      </p>
                      <div className="flex items-baseline gap-1.5 sm:gap-2 mt-1 sm:mt-1.5 mb-0.5">
                        <span className="text-sm sm:text-lg font-black text-plum-900">
                          ₹{pack.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] sm:text-xs text-plum-900/40 line-through">
                          ₹{pack.originalPrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Add to Cart Button Footer */}
                <div className="px-2 pb-2 sm:px-4 sm:pb-3 pt-0 bg-white">
                  <button
                    type="button"
                    onClick={(e) => handleQuickAddPack(e, pack)}
                    className={`w-full py-2 sm:py-2.5 rounded text-xs sm:text-sm font-bold transition-all shadow-xs flex items-center justify-center gap-1 cursor-pointer active:scale-98 ${
                      addedSlug === pack.slug
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#15aec0] hover:bg-[#0f8e9d] text-white shadow-sm'
                    }`}
                  >
                    {addedSlug === pack.slug ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Added</span>
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
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-5">
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
                className="rounded-lg bg-white border border-plum-900/10 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div className="flex-1 flex flex-col justify-between">
                  {/* Upper Image Area */}
                  <div className="relative w-full h-[165px] sm:h-[240px] bg-[#faf6ed]/90 flex items-center justify-center overflow-hidden select-none border-b border-plum-900/5">
                    {/* Top-Left Discount Badge */}
                    <div className="absolute top-2 sm:top-2.5 left-2 sm:left-2.5 z-20">
                      <span className="text-[9px] sm:text-[11px] font-black tracking-wider text-white bg-peach-500 px-1.5 sm:px-2.5 py-0.5 rounded-[3px] shadow-xs uppercase">
                        {savings}
                      </span>
                    </div>

                    {/* Top-Right Ribbon if Flagship */}
                    {pack.isFlagship && (
                      <div className="absolute top-0 right-2 sm:right-3 z-20">
                        <div className="relative bg-amber-500 text-white text-[7px] sm:text-[8.5px] font-black uppercase tracking-wider px-1.5 sm:px-2 pt-1 pb-1.5 sm:pt-1.5 sm:pb-2 shadow-xs text-center flex flex-col items-center leading-none">
                          <span>SUPER</span>
                          <span className="mt-0.5">•SAVER•</span>
                          <div
                            className="absolute -bottom-1 sm:-bottom-1.5 left-0 right-0 h-1 sm:h-1.5 bg-amber-500"
                            style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Lineup Image */}
                    <div className="relative w-full h-full p-2 sm:p-2.5 flex items-center justify-center">
                      <Image
                        src="/images/products/bundles/furbowl-bundle-all-three.jpg"
                        alt={`${pack.count} Pack FurBowl Meals`}
                        fill
                        sizes="240px"
                        className="object-contain transition-transform duration-300 group-hover:scale-103"
                      />
                    </div>

                    {/* Bottom Center Pack Pill */}
                    <div className="absolute bottom-2 sm:bottom-2.5 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap">
                      <span className="text-[9px] sm:text-xs font-bold text-plum-900 bg-white/95 backdrop-blur-xs px-2 sm:px-3.5 py-0.5 rounded-full shadow-xs border border-plum-900/10">
                        Pack of {pack.count}
                      </span>
                    </div>
                  </div>

                  {/* Lower Details Area */}
                  <div className="p-2 sm:px-4 sm:pt-3 sm:pb-1.5 flex flex-col justify-between flex-1 bg-white">
                    <div>
                      <h3 className="font-bold text-xs sm:text-[15px] text-plum-900 group-hover:text-teal-600 transition-colors leading-snug line-clamp-1">
                        {pack.title}
                      </h3>
                      <p className="text-[10px] sm:text-xs text-plum-900/60 font-medium mt-0.5 line-clamp-1">
                        {pack.popularFor}
                      </p>
                      <div className="flex items-baseline gap-1.5 sm:gap-2 mt-1 sm:mt-1.5 mb-0.5">
                        <span className="text-sm sm:text-lg font-black text-plum-900">
                          {savings}
                        </span>
                        <span className="text-[10px] sm:text-xs text-plum-900/50 font-bold">
                          • {pack.count} x 100g
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Button Footer */}
                <div className="px-2 pb-2 sm:px-4 sm:pb-3 pt-0 bg-white">
                  <button
                    type="button"
                    onClick={() => setActiveTab('trial-packs')}
                    className="w-full py-2 sm:py-2.5 rounded text-xs sm:text-sm font-bold transition-all shadow-xs flex items-center justify-center gap-1 cursor-pointer active:scale-98 bg-[#15aec0] hover:bg-[#0f8e9d] text-white shadow-sm"
                  >
                    <span>View Flavours</span>
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

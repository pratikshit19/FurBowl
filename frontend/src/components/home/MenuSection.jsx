'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ShoppingBag, Check, Sparkles, Package, Star, ShieldCheck, Tag } from 'lucide-react';
import { TRIAL_PACKS, MULTI_PACK_SIZES } from '@/lib/furbowl-data';
import useCartStore from '@/store/cartStore';
import ScrollReveal from '@/components/common/ScrollReveal';

const POUCH_IMAGE_MAP = {
  'chicken-vegetables': '/images/products/chicken-harvest-front.jpg',
  'chicken-rice-vegetables': '/images/products/chicken-homestyle-front.jpg',
  'egg-superfood': '/images/products/golden-egg-quinoa-front.jpg',
  'paneer-vegetables': '/images/products/paneer-greens-front.jpg',
  'lamb-lentils': '/images/products/lamb-lentil-harvest-front.jpg',
};

const BUNDLE_TABS = [
  { id: 'trial-packs', label: 'Curated Trial Packs', icon: '🎁', count: '5 Discovery Packs' },
  { id: 'bulk-packs', label: 'Multi-Pack Boxes', icon: '📦', count: 'Save up to 25%' },
];

export default function MenuSection() {
  const [activeTab, setActiveTab] = useState('trial-packs');
  const [addedSlug, setAddedSlug] = useState(null);
  const addItem = useCartStore((state) => state.addItem);

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

  return (
    <section id="menu-section" className="py-14 sm:py-20 bg-[#fdfcf9] border-b border-plum-900/5">
      <div className="container-main">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-5">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200/60 mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Bigger Bundles &bull; Maximum Savings</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-plum-900 tracking-tight">
              Our Value Bundles
            </h2>
          </div>

          {/* Bundle Category Selector */}
          <div className="inline-flex p-1.5 bg-white rounded-2xl border border-plum-900/10 shadow-xs shrink-0 self-start md:self-auto">
            {BUNDLE_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`text-xs sm:text-sm font-extrabold px-4 sm:px-5 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-plum-900 text-white shadow-md'
                    : 'text-plum-900/70 hover:text-plum-900 hover:bg-plum-900/5'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
                <span
                  className={`hidden sm:inline-block text-[10px] px-2 py-0.5 rounded-md font-black ${
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
        </div>

        {/* ═════════════════════════════════════════════════════════════════ */}
        {/* TAB 1: CURATED TRIAL PACKS (PURE VISUAL MULTI-POUCH SHOWCASE)     */}
        {/* ═════════════════════════════════════════════════════════════════ */}
        {activeTab === 'trial-packs' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {TRIAL_PACKS.map((pack, idx) => {
              const pouches = getPackPouches(pack);

              return (
                <ScrollReveal key={pack.id} delay={(idx % 3) * 80} className="h-full">
                  <div
                    className={`group relative rounded-3xl p-5 sm:p-6 border-2 transition-all duration-300 flex flex-col justify-between hover:-translate-y-2 hover:shadow-xl bg-white h-full ${
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

                    {/* Pack Title & Tagline */}
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
                </ScrollReveal>
              );
            })}
          </div>
        )}

        {/* ═════════════════════════════════════════════════════════════════ */}
        {/* TAB 2: MULTI-PACK BOXES (4x to 30x)                               */}
        {/* ═════════════════════════════════════════════════════════════════ */}
        {activeTab === 'bulk-packs' && (
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
                    <Link
                      href="/shop?tab=value-bundles"
                      className="w-full py-2.5 rounded-full text-xs font-black text-center bg-plum-900 hover:bg-plum-800 text-white block transition-all shadow-sm hover:shadow-md"
                    >
                      Select Flavours &bull; {savings}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Banner: Direct Link to All Products */}
        <div className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-center justify-between p-5 sm:p-6 rounded-3xl bg-white border border-plum-900/10 shadow-xs gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-peach-50 border border-peach-200 flex items-center justify-center text-peach-600 shrink-0">
              <Tag className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-black text-plum-900 text-sm sm:text-base">
                Looking for Individual 100g Meals?
              </h4>
              <p className="text-xs text-plum-900/60 font-medium">
                Explore our 5 chef-crafted fresh recipes cooked with whole chicken, lean lamb, paneer &amp; farm eggs.
              </p>
            </div>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-black text-xs sm:text-sm px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all shrink-0 hover:-translate-y-0.5 cursor-pointer"
          >
            <span>View All Products &amp; Meals</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}

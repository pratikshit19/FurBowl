'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { CORE_MEALS, TRIAL_PACKS } from '@/lib/furbowl-data';
import { formatPrice } from '@/lib/constants';

// Combine products for instant search
const ALL_SEARCHABLE_PRODUCTS = [
  ...CORE_MEALS.map((m) => ({
    id: m.id,
    name: m.title,
    slug: m.slug,
    category: 'Fresh Meal',
    price: m.id === 'lamb-lentils' ? 219 : m.isVeg ? 189 : 199,
    mrp: m.id === 'lamb-lentils' ? 249 : m.isVeg ? 209 : 219,
    image: m.image,
    highlight: m.highlightIngredients || m.about,
    isVeg: m.isVeg,
  })),
  ...TRIAL_PACKS.slice(0, 3).map((t) => ({
    id: t.id,
    name: t.title,
    slug: t.slug,
    category: 'Discovery Trial Pack',
    price: t.price,
    mrp: t.originalPrice,
    image: '/images/products/all-recipes-trial-pack.jpg',
    highlight: t.tagline || t.purpose,
    isVeg: false,
  })),
  {
    id: 'golden-chicken-broth',
    name: 'Golden Chicken Bone Broth',
    slug: 'golden-chicken-broth',
    category: 'Hydration & Broth',
    price: 199,
    mrp: 249,
    image: '/images/products/golden-chicken-broth-front.jpg',
    highlight: 'Slow-simmered chicken bone broth for joint, coat & gut health',
    isVeg: false,
  },
];

const POPULAR_SEARCH_TAGS = [
  'Chicken & Vegetables',
  'Lamb & Lentils',
  'Egg Superfood',
  'Paneer',
  'Trial Pack',
  'Bone Broth',
];

export default function SearchDrawer({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle ESC key and scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Auto-focus search input with small delay for smooth drawer slide
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 150);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      clearTimeout(timer);
    };
  }, [isOpen, onClose]);

  if (!mounted) return null;

  // Filter products based on search query
  const trimmedQuery = query.trim().toLowerCase();
  const searchResults = trimmedQuery
    ? ALL_SEARCHABLE_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(trimmedQuery) ||
          p.category.toLowerCase().includes(trimmedQuery) ||
          (p.highlight && p.highlight.toLowerCase().includes(trimmedQuery))
      )
    : [];

  const handleFullSearchSubmit = (e) => {
    e.preventDefault();
    if (!trimmedQuery) return;
    onClose();
    router.push(`/shop?search=${encodeURIComponent(trimmedQuery)}`);
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-visibility duration-300 ${
        isOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
      }`}
      aria-modal="true"
      role="dialog"
      aria-label="Product Search"
    >
      {/* Dimmed Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Right Drawer Panel */}
      <div
        className={`fixed inset-y-0 right-0 w-full sm:max-w-[460px] bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-out z-10 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* ─── Drawer Header ─── */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-plum-900/10 bg-white shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-200/60 shadow-xs">
              <Search className="w-4 h-4 stroke-[2.2]" />
            </div>
            <h2 className="font-extrabold text-plum-900 text-lg tracking-tight">
              Search Fresh Meals
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-plum-900/5 hover:bg-plum-900/10 text-plum-900/70 hover:text-plum-900 flex items-center justify-center transition-all cursor-pointer"
            aria-label="Close search drawer"
          >
            <X className="w-5 h-5 stroke-[2.2]" />
          </button>
        </div>

        {/* ─── Search Input Field ─── */}
        <div className="p-5 border-b border-plum-900/10 bg-[#fdfcf9] shrink-0">
          <form onSubmit={handleFullSearchSubmit} className="relative">
            <div className="relative flex items-center h-12 rounded-xl border border-plum-900/20 bg-white shadow-xs px-3.5 focus-within:border-teal-700 focus-within:ring-2 focus-within:ring-teal-700/20 transition-all">
              <Search className="w-5 h-5 text-plum-900/40 mr-2.5 shrink-0 stroke-[2]" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search chicken, lamb, egg, trial pack..."
                className="flex-1 text-sm text-plum-900 placeholder:text-plum-900/40 bg-transparent outline-none w-full"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    inputRef.current?.focus();
                  }}
                  className="w-6 h-6 rounded-full bg-plum-900/10 hover:bg-plum-900/20 text-plum-900 flex items-center justify-center text-xs transition-colors cursor-pointer mr-1"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </form>

          {/* Popular Tag Chips */}
          <div className="mt-3.5">
            <span className="text-[11px] font-bold text-plum-900/50 uppercase tracking-wider block mb-1.5">
              Popular Searches
            </span>
            <div className="flex flex-wrap gap-1.5">
              {POPULAR_SEARCH_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setQuery(tag)}
                  className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-plum-900/5 hover:bg-teal-50 hover:text-teal-800 text-plum-900/80 border border-plum-900/10 transition-colors cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Scrollable Results Section ─── */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Query Results */}
          {trimmedQuery ? (
            searchResults.length > 0 ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-1">
                  <span className="text-xs font-bold text-plum-900/60 uppercase tracking-wider">
                    {searchResults.length} {searchResults.length === 1 ? 'Result Found' : 'Results Found'}
                  </span>
                  <button
                    type="button"
                    onClick={handleFullSearchSubmit}
                    className="text-xs font-bold text-teal-800 hover:text-teal-900 flex items-center gap-1"
                  >
                    <span>View all in shop</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-2.5">
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      href={`/shop/${product.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-3.5 p-2.5 rounded-xl border border-plum-900/10 hover:border-teal-700/40 hover:bg-teal-50/40 transition-all group bg-white shadow-2xs"
                    >
                      {/* Thumbnail */}
                      <div className="w-16 h-16 rounded-lg bg-[#fbf8f2] relative border border-plum-900/10 overflow-hidden shrink-0 flex items-center justify-center p-1">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                          sizes="64px"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-1.5 py-0.2 rounded inline-block mb-1">
                          {product.category}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-plum-900 leading-snug group-hover:text-teal-700 transition-colors truncate">
                          {product.name}
                        </h4>
                        <div className="flex items-baseline gap-1.5 mt-1">
                          <span className="text-sm font-bold text-plum-900">
                            {formatPrice(product.price)}
                          </span>
                          {product.mrp > product.price && (
                            <span className="text-[11px] text-plum-900/40 line-through">
                              {formatPrice(product.mrp)}
                            </span>
                          )}
                        </div>
                      </div>

                      <ArrowRight className="w-4 h-4 text-plum-900/30 group-hover:text-teal-700 group-hover:translate-x-0.5 transition-all shrink-0 mr-1" />
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              /* No Results State */
              <div className="text-center py-12 px-4 space-y-3">
                <div className="w-14 h-14 rounded-full bg-plum-900/5 flex items-center justify-center mx-auto text-plum-900/40">
                  <Search className="w-6 h-6 stroke-[1.8]" />
                </div>
                <h3 className="text-base font-extrabold text-plum-900">
                  No recipes found for &ldquo;{query}&rdquo;
                </h3>
                <p className="text-xs text-plum-900/60 max-w-[260px] mx-auto leading-relaxed">
                  Try searching for ingredients like <strong>Chicken</strong>, <strong>Lamb</strong>, <strong>Egg</strong>, or explore our <strong>Trial Packs</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="text-xs font-bold text-teal-800 hover:underline pt-2 inline-block cursor-pointer"
                >
                  Clear search query
                </button>
              </div>
            )
          ) : (
            /* Featured / Recommended Products when Query is Empty */
            <div className="space-y-3">
              <span className="text-xs font-bold text-plum-900/60 uppercase tracking-wider block">
                Trending Fresh Recipes
              </span>

              <div className="space-y-2.5">
                {ALL_SEARCHABLE_PRODUCTS.slice(0, 4).map((product) => (
                  <Link
                    key={product.id}
                    href={`/shop/${product.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-3.5 p-2.5 rounded-xl border border-plum-900/10 hover:border-teal-700/40 hover:bg-teal-50/40 transition-all group bg-white shadow-2xs"
                  >
                    <div className="w-14 h-14 rounded-lg bg-[#fbf8f2] relative border border-plum-900/10 overflow-hidden shrink-0 flex items-center justify-center p-1">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                        sizes="56px"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-1.5 py-0.2 rounded inline-block mb-0.5">
                        {product.category}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-plum-900 leading-snug group-hover:text-teal-700 transition-colors truncate">
                        {product.name}
                      </h4>
                      <div className="flex items-baseline gap-1.5 mt-0.5">
                        <span className="text-xs sm:text-sm font-bold text-plum-900">
                          {formatPrice(product.price)}
                        </span>
                        {product.mrp > product.price && (
                          <span className="text-[11px] text-plum-900/40 line-through">
                            {formatPrice(product.mrp)}
                          </span>
                        )}
                      </div>
                    </div>

                    <ArrowRight className="w-4 h-4 text-plum-900/30 group-hover:text-teal-700 group-hover:translate-x-0.5 transition-all shrink-0 mr-1" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ─── Drawer Footer CTA ─── */}
        <div className="p-4 border-t border-plum-900/10 bg-[#faf8f4] shrink-0">
          <Link
            href={trimmedQuery ? `/shop?search=${encodeURIComponent(trimmedQuery)}` : '/shop'}
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-teal-700 hover:bg-teal-800 active:scale-95 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-teal-700/20"
          >
            <span>{trimmedQuery ? `View All Results for "${trimmedQuery}"` : 'Browse Complete Menu in Shop'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

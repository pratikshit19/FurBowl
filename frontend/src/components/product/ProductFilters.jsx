'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback } from 'react';

const FOOD_TYPES = [
  { label: 'All', value: '' },
  { label: 'Wet Food', value: 'WET' },
  { label: 'Broth', value: 'BROTH' },
  { label: 'Dry Food', value: 'DRY' },
];

const SORT_OPTIONS = [
  { label: 'Recommended', value: 'sortOrder' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Newest', value: 'newest' },
];

const CATEGORIES = [
  { label: 'All', value: '' },
  { label: 'Meals', value: 'meals' },
  { label: 'Broth', value: 'broth' },
];

export default function ProductFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (updates) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });
      // Reset to page 1 when filters change
      if (!('page' in updates)) params.delete('page');
      return params.toString();
    },
    [searchParams]
  );

  const updateFilter = (key, value) => {
    const qs = createQueryString({ [key]: value });
    router.push(`${pathname}?${qs}`, { scroll: false });
  };

  const activeCategory = searchParams.get('category') || '';
  const activeSort = searchParams.get('sort') || 'sortOrder';
  const activeIsVeg = searchParams.get('isVeg') || '';

  return (
    <div className="flex flex-wrap items-center gap-3 py-4 border-b border-plum-900/5 mb-4">
      {/* Category Pills */}
      <div className="flex items-center gap-2 flex-wrap">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => updateFilter('category', cat.value)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all shadow-sm active:scale-95 ${
              activeCategory === cat.value
                ? 'bg-coral-500 text-white shadow-coral-500/15'
                : 'bg-white text-plum-900/80 border border-plum-900/5 hover:border-coral-500/20'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Separator */}
      <div className="h-5 w-px bg-plum-900/10 hidden sm:block" />

      {/* Veg / Non-veg filter */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => updateFilter('isVeg', activeIsVeg === 'true' ? '' : 'true')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all shadow-sm active:scale-95 ${
            activeIsVeg === 'true'
              ? 'border-emerald-500/40 text-emerald-800 bg-emerald-50'
              : 'border-plum-900/5 text-plum-900/80 bg-white hover:border-coral-500/20'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
          Veg Only
        </button>
      </div>

      {/* Sort — pushed to end */}
      <div className="ml-auto flex items-center gap-2">
        <label className="text-xs font-medium text-plum-900/60 whitespace-nowrap" htmlFor="sort-select">
          Sort by:
        </label>
        <select
          id="sort-select"
          value={activeSort}
          onChange={(e) => updateFilter('sort', e.target.value)}
          className="text-xs font-semibold border border-plum-900/10 rounded-xl px-3.5 py-1.5 text-plum-900/80 bg-white focus:outline-none focus:border-coral-500 focus:ring-1 focus:ring-coral-500/30 shadow-sm cursor-pointer transition-all"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

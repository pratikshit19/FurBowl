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
    <div className="flex flex-wrap items-center gap-3 py-4 border-b border-gray-100">
      {/* Category Pills */}
      <div className="flex items-center gap-2 flex-wrap">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => updateFilter('category', cat.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat.value
                ? 'bg-turquoise-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Separator */}
      <div className="h-6 w-px bg-gray-200 hidden sm:block" />

      {/* Veg / Non-veg filter */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => updateFilter('isVeg', activeIsVeg === 'true' ? '' : 'true')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
            activeIsVeg === 'true'
              ? 'border-green-500 text-green-700 bg-green-50'
              : 'border-gray-200 text-gray-600 hover:border-gray-300'
          }`}
        >
          <div className={activeIsVeg === 'true' ? 'veg-indicator' : ''} style={{ width: 14, height: 14, border: '1.5px solid #22c55e', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {activeIsVeg === 'true' && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />}
          </div>
          Veg Only
        </button>
      </div>

      {/* Sort — pushed to end */}
      <div className="ml-auto flex items-center gap-2">
        <label className="text-sm text-gray-500 whitespace-nowrap" htmlFor="sort-select">
          Sort by:
        </label>
        <select
          id="sort-select"
          value={activeSort}
          onChange={(e) => updateFilter('sort', e.target.value)}
          className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-turquoise-500 focus:border-turquoise-500"
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

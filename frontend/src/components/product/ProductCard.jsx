'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '@/lib/constants';
import useCartStore from '@/store/cartStore';

export default function ProductCard({ product, priority = false }) {
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const primaryImage = product.images?.[0];
  let imageUrl = primaryImage?.url || '';
  // Convert double-pouch image URL to single-pouch image URL
  if (imageUrl.includes('/images/products/') && !imageUrl.includes('only-')) {
    imageUrl = imageUrl.replace('/images/products/', '/images/products/only-');
  }

  const primaryVariant = product.variants?.[0];
  const hasDiscount =
    primaryVariant &&
    Number(primaryVariant.mrp) > Number(primaryVariant.sellingPrice);
  const discountPercent = hasDiscount
    ? Math.round(
        ((Number(primaryVariant.mrp) - Number(primaryVariant.sellingPrice)) /
          Number(primaryVariant.mrp)) *
          100
      )
    : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!primaryVariant) return;
    addItem(product, primaryVariant, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="group relative flex flex-col justify-between bg-white rounded-3xl overflow-hidden border border-plum-900/5 hover:border-coral-500/20 shadow-sm hover:shadow-[0_15px_30px_-10px_rgba(62,25,47,0.08)] transition-all duration-300 transform hover:-translate-y-1">
      {/* Image & Badges Container */}
      <Link
        href={`/shop/${product.slug}`}
        className="relative block aspect-[4/3] bg-white overflow-hidden p-3 flex items-center justify-center border-b border-plum-900/5"
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={primaryImage?.altText || product.name}
            fill
            priority={priority}
            className="object-contain p-2 group-hover:scale-105 transition-transform duration-500 ease-out filter drop-shadow-sm"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-plum-900/15">
            <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Discount Badge */}
        {hasDiscount && discountPercent > 0 && (
          <div className="absolute top-3 left-3 bg-coral-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm tracking-wide">
            {discountPercent}% OFF
          </div>
        )}

        {/* Broth / Special Badge */}
        {product.foodType === 'BROTH' && (
          <div className="absolute top-3 right-3 bg-butter-300 text-plum-900 text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
            Bone Broth
          </div>
        )}
      </Link>

      {/* Info & Action Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Header Row: Veg/Non-veg & Rating */}
          <div className="flex items-center justify-between gap-2 mb-2">
            {product.isVeg ? (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/50">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block shrink-0" />
                Veg
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-rose-50 text-rose-700 border border-rose-200/50">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block shrink-0" />
                Non-Veg
              </span>
            )}

            <div className="flex items-center gap-1 text-amber-400 text-xs font-medium">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
              <span className="text-plum-900/60 font-medium">5.0</span>
            </div>
          </div>

          {/* Product Title */}
          <Link href={`/shop/${product.slug}`}>
            <h3 className="font-medium text-plum-900 text-base leading-snug mb-1 group-hover:text-coral-500 transition-colors line-clamp-2 min-h-[44px]">
              {product.name}
            </h3>
          </Link>

          {/* Description */}
          {product.shortDescription && (
            <p className="text-xs text-plum-900/60 line-clamp-2 leading-relaxed font-normal mb-3 min-h-[34px]">
              {product.shortDescription}
            </p>
          )}
        </div>

        {/* Price & Action Button Footer */}
        <div className="border-t border-plum-900/5 pt-3 mt-2 flex items-center justify-between gap-3">
          <div>
            {primaryVariant ? (
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-bold text-plum-900 leading-none">
                  {formatPrice(primaryVariant.sellingPrice)}
                </span>
                {hasDiscount && (
                  <span className="text-xs text-plum-900/30 line-through font-normal">
                    {formatPrice(primaryVariant.mrp)}
                  </span>
                )}
              </div>
            ) : (
              <span className="text-xs text-plum-900/30 font-normal">Price unavailable</span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shadow-sm active:scale-95 shrink-0 ${
              added
                ? 'bg-emerald-600 text-white shadow-emerald-600/10'
                : 'bg-coral-500 hover:bg-coral-600 text-white shadow-coral-500/15'
            }`}
          >
            {added ? (
              <>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span>Added</span>
              </>
            ) : (
              <>
                <span>Add</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

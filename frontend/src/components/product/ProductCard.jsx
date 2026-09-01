import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '@/lib/constants';

// Product accent colours derived from packaging
const PRODUCT_ACCENTS = {
  'chicken-rice-with-vegetables': { border: 'border-[#5AABA0]', badge: 'bg-[#5AABA0]' },
  'chicken-broth': { border: 'border-[#8B3A3A]', badge: 'bg-[#8B3A3A]' },
  'paneer-medley': { border: 'border-[#7C5FA6]', badge: 'bg-[#7C5FA6]' },
  'lamb-lentils-with-vegetables': { border: 'border-[#5A7A52]', badge: 'bg-[#5A7A52]' },
  'egg-superfood': { border: 'border-[#C4943D]', badge: 'bg-[#C4943D]' },
};

export default function ProductCard({ product, priority = false }) {
  const primaryImage = product.images?.[0];
  const primaryVariant = product.variants?.[0];
  const accent = PRODUCT_ACCENTS[product.slug] || { border: 'border-gray-200', badge: 'bg-gray-500' };
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

  return (
    <Link
      href={`/shop/${product.slug}`}
      className={`group block bg-white border ${accent.border} rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200`}
    >
      {/* Image */}
      <div className="relative aspect-square bg-[#FAFAF8] overflow-hidden">
        {primaryImage ? (
          <Image
            src={primaryImage.url}
            alt={primaryImage.altText || product.name}
            fill
            priority={priority}
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-200">
            <svg className="w-20 h-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Discount badge */}
        {hasDiscount && discountPercent > 0 && (
          <div className={`absolute top-3 left-3 ${accent.badge} text-white text-xs font-semibold px-2.5 py-1 rounded-full`}>
            {discountPercent}% OFF
          </div>
        )}

        {/* Broth badge */}
        {product.foodType === 'BROTH' && (
          <div className="absolute top-3 right-3 bg-white/90 border border-gray-200 text-gray-600 text-xs font-medium px-2 py-1 rounded-full">
            Broth
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        {/* Veg / Non-veg */}
        <div className="flex items-center gap-2 mb-2">
          <div
            className={product.isVeg ? 'veg-indicator' : 'nonveg-indicator'}
            title={product.isVeg ? 'Vegetarian' : 'Non-vegetarian'}
            aria-label={product.isVeg ? 'Vegetarian' : 'Non-vegetarian'}
          />
          <span className="text-xs text-gray-400">{product.isVeg ? 'Veg' : 'Non-veg'}</span>
        </div>

        <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-1 group-hover:text-turquoise-700 transition-colors">
          {product.name}
        </h3>

        {product.shortDescription && (
          <p className="text-xs text-gray-500 mb-3 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        )}

        {/* Pricing */}
        {primaryVariant ? (
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-gray-900">
              {formatPrice(primaryVariant.sellingPrice)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-gray-400 line-through">
                {formatPrice(primaryVariant.mrp)}
              </span>
            )}
          </div>
        ) : (
          <span className="text-sm text-gray-400">Price unavailable</span>
        )}
      </div>
    </Link>
  );
}

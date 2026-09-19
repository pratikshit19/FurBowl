'use client';

import { useSyncExternalStore } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { formatPrice } from '@/lib/constants';
import useCartStore from '@/store/cartStore';
import useWishlistStore from '@/store/wishlistStore';

const emptySubscribe = () => () => {};

export default function ProductCard({ product, priority = false }) {
  const isHydrated = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const items = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const { toggleItem, isWishlisted } = useWishlistStore();
  const wishlisted = isWishlisted(product.id || product.slug);

  const primaryImage = product.images?.[0];
  const imageUrl = primaryImage?.url || '';

  const primaryVariant = product.variants?.[0];

  // Find this product's primary variant in the cart
  const cartItem = items.find(
    (i) => (primaryVariant?.id ? i.variantId === primaryVariant.id : i.productId === product.id) && !i.isSubscription
  );
  const currentQty = cartItem?.quantity || 0;

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
  };

  const handleIncrement = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!cartItem) {
      if (primaryVariant) addItem(product, primaryVariant, 1);
    } else {
      updateQuantity(cartItem.id, currentQty + 1);
    }
  };

  const handleDecrement = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!cartItem) return;
    if (currentQty <= 1) {
      removeItem(cartItem.id);
    } else {
      updateQuantity(cartItem.id, currentQty - 1);
    }
  };

  return (
    <div className="group relative flex flex-col justify-between bg-white rounded-md overflow-hidden border border-plum-900/10 hover:border-coral-500/40 shadow-xs hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 h-full">
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2.25 2.25 0 012.828 0L16 16m-2-2l1.586-1.586a2.25 2.25 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Discount Badge */}
        {hasDiscount && discountPercent > 0 && (
          <div className="absolute top-3 left-3 bg-coral-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm shadow-sm tracking-wide">
            {discountPercent}% OFF
          </div>
        )}

        {/* Broth / Special Badge */}
        {product.foodType === 'BROTH' && (
          <div className="absolute top-3 right-10 bg-butter-300 text-plum-900 text-[10px] font-bold px-2 py-0.5 rounded-sm shadow-sm">
            Bone Broth
          </div>
        )}

        {/* Wishlist Heart Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleItem(product);
          }}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          title={wishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          className={`absolute top-2.5 right-2.5 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer active:scale-90 ${
            wishlisted
              ? 'bg-coral-50 text-coral-600 shadow-sm ring-1 ring-coral-400/50'
              : 'bg-white/85 backdrop-blur-xs text-plum-900/40 hover:text-coral-500 hover:bg-white shadow-2xs'
          }`}
        >
          <Heart className={`w-4 h-4 transition-transform duration-200 ${wishlisted ? 'fill-coral-500 text-coral-500 scale-110' : ''}`} />
        </button>
      </Link>

      {/* Info & Action Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Product Title */}
          <Link href={`/shop/${product.slug}`}>
            <h3 className="font-bold text-plum-900 text-base leading-snug mb-1 group-hover:text-coral-500 transition-colors line-clamp-2 min-h-[44px]">
              {product.name}
            </h3>
          </Link>

          {/* Description */}
          {product.shortDescription && (
            <p className="text-xs text-plum-900/60 line-clamp-2 leading-relaxed font-normal mb-2 min-h-[34px]">
              {product.shortDescription}
            </p>
          )}
        </div>

        {/* Price & Action Button Footer */}
        <div className="border-t border-plum-900/5 pt-2 mt-1 flex flex-col gap-2">
          <div>
            {primaryVariant ? (
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-normal text-plum-900 leading-none">
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

          {isHydrated && currentQty > 0 ? (
            <div className="flex items-center justify-between bg-coral-500 text-white rounded-sm shadow-sm h-9 w-full overflow-hidden font-bold text-xs select-none">
              <button
                type="button"
                onClick={handleDecrement}
                className="w-9 h-full flex items-center justify-center hover:bg-coral-600 active:scale-90 transition-all cursor-pointer"
                aria-label="Decrease quantity"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                </svg>
              </button>
              <span className="flex-1 text-center font-extrabold text-xs">
                {currentQty}
              </span>
              <button
                type="button"
                onClick={handleIncrement}
                className="w-9 h-full flex items-center justify-center hover:bg-coral-600 active:scale-90 transition-all cursor-pointer"
                aria-label="Increase quantity"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-1.5 py-2 h-9 rounded-sm text-xs font-bold transition-all shadow-sm active:scale-95 bg-coral-500 hover:bg-coral-600 text-white shadow-coral-500/15 cursor-pointer"
            >
              <span>+ Add</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

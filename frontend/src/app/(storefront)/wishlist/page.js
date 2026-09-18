'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Trash2, ArrowRight, Check } from 'lucide-react';
import useWishlistStore from '@/store/wishlistStore';
import useCartStore from '@/store/cartStore';
import { formatPrice } from '@/lib/constants';

export default function WishlistPage() {
  const [hydrated, setHydrated] = useState(false);
  const [addedId, setAddedId] = useState(null);
  const [addAllSuccess, setAddAllSuccess] = useState(false);

  const { items, removeItem, clearWishlist, rehydrate } = useWishlistStore();
  const addItemToCart = useCartStore((state) => state.addItem);

  useEffect(() => {
    rehydrate();
    setHydrated(true);
  }, [rehydrate]);

  const handleAddToCart = (e, item) => {
    e.preventDefault();
    e.stopPropagation();

    addItemToCart(
      {
        id: item.id,
        name: item.name,
        slug: item.slug,
        isVeg: item.isVeg,
        images: [{ url: item.image, altText: item.name }],
      },
      {
        id: `variant-${item.id}`,
        mrp: item.originalPrice,
        sellingPrice: item.price,
        size: item.size || '100g Pouch',
      },
      1
    );

    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  const handleAddAllToCart = () => {
    items.forEach((item) => {
      addItemToCart(
        {
          id: item.id,
          name: item.name,
          slug: item.slug,
          isVeg: item.isVeg,
          images: [{ url: item.image, altText: item.name }],
        },
        {
          id: `variant-${item.id}`,
          mrp: item.originalPrice,
          sellingPrice: item.price,
          size: item.size || '100g Pouch',
        },
        1
      );
    });

    setAddAllSuccess(true);
    setTimeout(() => setAddAllSuccess(false), 2200);
  };

  if (!hydrated) {
    return (
      <main className="min-h-[60vh] bg-[#fdfbf7] py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="container-main max-w-5xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-plum-900/10 rounded w-48 mx-auto sm:mx-0" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-64 bg-plum-900/5 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[70vh] bg-[#fdfbf7] py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="container-main max-w-6xl mx-auto">
        
        {/* Breadcrumb */}
        <nav className="text-xs font-bold text-plum-900/50 uppercase tracking-widest mb-4" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link href="/" className="hover:text-teal-600 transition-colors">Home</Link></li>
            <li aria-hidden="true"><span>/</span></li>
            <li className="text-plum-900 font-extrabold" aria-current="page">Wishlist</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 mb-8 border-b border-plum-900/10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-coral-600 bg-coral-50 px-3 py-1 rounded-full border border-coral-200/60 mb-2">
              <Heart className="w-3.5 h-3.5 fill-coral-500 text-coral-500" />
              <span>Saved Favourites</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-plum-900 tracking-tight">
              My Wishlist
            </h1>
            <p className="text-xs sm:text-sm text-plum-900/65 mt-1 font-medium">
              Save your pup&apos;s favourite fresh meals and trial packs in one place.
            </p>
          </div>

          {items.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleAddAllToCart}
                className="inline-flex items-center gap-1.5 bg-coral-500 hover:bg-coral-600 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded shadow-sm hover:shadow transition-all active:scale-95 cursor-pointer"
              >
                {addAllSuccess ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>All Added!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add All to Cart</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={clearWishlist}
                className="text-xs font-semibold text-plum-900/50 hover:text-red-600 px-3 py-2 rounded transition-colors cursor-pointer"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Wishlist Items vs Empty State */}
        {items.length === 0 ? (
          <div className="bg-white rounded-xl p-10 sm:p-14 border border-plum-900/10 shadow-sm max-w-lg mx-auto flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-coral-50 text-coral-500 flex items-center justify-center mb-5 border border-coral-200/50 shadow-xs">
              <Heart className="w-9 h-9 stroke-[1.75]" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-plum-900 mb-2">Your wishlist is empty</h2>
            <p className="text-xs sm:text-sm text-plum-900/60 mb-8 max-w-xs leading-relaxed">
              Explore our fresh human-grade dog food recipes and tap the heart icon on any meal to save it here.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs sm:text-sm px-8 py-3.5 rounded transition-all shadow-md shadow-teal-600/20 active:scale-95 cursor-pointer"
            >
              <span>Explore Fresh Meals</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-5">
            {items.map((item) => (
              <div
                key={item.id}
                className="rounded-lg bg-white border border-plum-900/10 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                {/* ─── Upper Image Area ─── */}
                <div className="relative w-full h-[165px] sm:h-[230px] bg-[#faf6ed]/90 flex items-center justify-center overflow-hidden select-none border-b border-plum-900/5">
                  
                  {/* Remove Button (Heart with active color or trash icon on hover) */}
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.name} from wishlist`}
                    title="Remove from wishlist"
                    className="absolute top-2 right-2 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-coral-500 hover:text-red-600 shadow-sm border border-plum-900/10 flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
                  >
                    <Heart className="w-4 h-4 fill-coral-500 text-coral-500" />
                  </button>

                  {/* Veg / Diet Badge */}
                  <div className="absolute top-2 left-2 z-20">
                    <span
                      className={`text-[9px] sm:text-[10.5px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-[3px] shadow-xs text-white ${
                        item.isVeg ? 'bg-emerald-600' : 'bg-peach-500'
                      }`}
                    >
                      {item.isVeg ? '100% Veg' : 'Real Meat'}
                    </span>
                  </div>

                  {/* Product Image */}
                  <Link
                    href={`/shop/${item.slug}`}
                    className="relative w-full h-full p-3 flex items-center justify-center focus:outline-none"
                  >
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-plum-900/5 flex items-center justify-center text-plum-900/30">
                        <ShoppingBag className="w-6 h-6" />
                      </div>
                    )}
                  </Link>

                  {/* Size Pill */}
                  {item.size && (
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap">
                      <span className="text-[9px] sm:text-xs font-bold text-plum-900 bg-white/95 backdrop-blur-xs px-2.5 py-0.5 rounded-full shadow-xs border border-plum-900/10">
                        {item.size}
                      </span>
                    </div>
                  )}
                </div>

                {/* ─── Lower Details Area ─── */}
                <div className="p-2.5 sm:p-4 flex flex-col justify-between flex-1 bg-white">
                  <div>
                    <Link
                      href={`/shop/${item.slug}`}
                      className="font-bold text-xs sm:text-[14.5px] text-plum-900 hover:text-teal-600 transition-colors leading-snug line-clamp-1 block focus:outline-none"
                    >
                      {item.name}
                    </Link>

                    {item.subtitle && (
                      <p className="text-[10px] sm:text-xs text-plum-900/60 font-medium mt-0.5 line-clamp-1">
                        {item.subtitle}
                      </p>
                    )}

                    {/* Price */}
                    <div className="flex items-baseline gap-1.5 sm:gap-2 mt-1 sm:mt-2 mb-1.5 sm:mb-2">
                      <span className="text-sm sm:text-lg font-bold text-plum-900">
                        {formatPrice(item.price)}
                      </span>
                      {item.originalPrice > item.price && (
                        <span className="text-[10px] sm:text-xs text-plum-900/40 line-through">
                          {formatPrice(item.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Move to Cart Action Button */}
                  <button
                    type="button"
                    onClick={(e) => handleAddToCart(e, item)}
                    className={`w-full py-2 sm:py-2.5 rounded text-xs sm:text-sm font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-98 ${
                      addedId === item.id
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#15aec0] hover:bg-[#0f8e9d] text-white shadow-sm'
                    }`}
                  >
                    {addedId === item.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" />
                        <span>Added to Cart</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>Move to Cart</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}

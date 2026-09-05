'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useCartStore from '@/store/cartStore';
import ProductGallery from '@/components/product/ProductGallery';
import { formatPrice, SUBSCRIPTION_DISCOUNT_PERCENT } from '@/lib/constants';

function QuantitySelector({ value, onChange, min = 1, max = 99 }) {
  return (
    <div className="flex items-center border border-plum-900/10 rounded-xl bg-white shadow-sm overflow-hidden w-fit">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="w-10 h-10 flex items-center justify-center text-plum-900/70 hover:bg-plum-900/5 hover:text-plum-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        aria-label="Decrease quantity"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
        </svg>
      </button>
      <span className="w-10 text-center text-sm font-bold text-plum-900" aria-live="polite">
        {value}
      </span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="w-10 h-10 flex items-center justify-center text-plum-900/70 hover:bg-plum-900/5 hover:text-plum-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        aria-label="Increase quantity"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
        </svg>
      </button>
    </div>
  );
}

export default function ProductDetail({ product }) {
  const router = useRouter();
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants?.[0]?.id);
  const [quantity, setQuantity] = useState(1);
  const [isSubscription, setIsSubscription] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  const selectedVariant = product.variants?.find((v) => v.id === selectedVariantId);
  const primaryVariant = product.variants?.[0];
  const displayVariant = selectedVariant || primaryVariant;

  const hasDiscount = displayVariant && Number(displayVariant.mrp) > Number(displayVariant.sellingPrice);
  const basePrice = displayVariant ? Number(displayVariant.sellingPrice) : 0;
  const subscriptionPrice = Math.floor(basePrice * (1 - SUBSCRIPTION_DISCOUNT_PERCENT / 100));

  const { addItem } = useCartStore();

  const handleAddToCart = async () => {
    if (!displayVariant) return;
    setAddingToCart(true);
    try {
      addItem(product, displayVariant, quantity, isSubscription);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch {
      // handle error
    } finally {
      setAddingToCart(false);
    }
  };

  const TABS = ['description', 'ingredients', 'nutrition', 'feeding'];

  return (
    <div className="section-padding bg-[#faf6ed]">
      <div className="container-main">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Gallery */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* Product Info */}
          <div>
            {/* Category + Veg indicator */}
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              {product.category && (
                <span className="text-[11px] font-bold text-plum-900 bg-butter-300/40 border border-butter-300/60 px-3 py-1 rounded-full uppercase tracking-wider">
                  {product.category.name}
                </span>
              )}
              <div
                className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                  product.isVeg
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200/60'
                    : 'bg-rose-50 text-rose-800 border-rose-200/60'
                }`}
              >
                <div
                  className={`w-3 h-3 rounded-xs border flex items-center justify-center ${
                    product.isVeg ? 'border-emerald-600' : 'border-rose-600'
                  }`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full ${product.isVeg ? 'bg-emerald-600' : 'bg-rose-600'}`} />
                </div>
                <span>{product.isVeg ? 'Vegetarian' : 'Non-veg'}</span>
              </div>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-plum-900 mb-3 leading-tight tracking-tight">
              {product.name}
            </h1>

            {product.shortDescription && (
              <p className="text-plum-900/70 text-base leading-relaxed mb-6 font-normal">{product.shortDescription}</p>
            )}

            {/* Reviews quick */}
            {product.reviewCount > 0 && (
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} className={`w-4 h-4 ${s <= Math.round(product.averageRating) ? 'text-amber-400' : 'text-plum-900/10'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm font-medium text-plum-900/70">{product.averageRating?.toFixed(1)} ({product.reviewCount} reviews)</span>
              </div>
            )}

            {/* Variant Selector */}
            {product.variants && product.variants.length > 1 && (
              <div className="mb-6">
                <p className="text-xs font-bold text-plum-900/50 uppercase tracking-wider mb-2">Size</p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariantId(v.id)}
                      className={`px-4 py-2 rounded-xl border text-sm font-semibold transition-all ${
                        selectedVariantId === v.id
                          ? 'border-coral-500 bg-coral-50 text-coral-600 shadow-sm ring-1 ring-coral-500/30'
                          : 'border-plum-900/10 text-plum-900/80 bg-white hover:border-plum-900/20'
                      }`}
                    >
                      {v.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Pricing */}
            {displayVariant && (
              <div className="mb-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl md:text-4xl font-extrabold text-plum-900 tracking-tight">
                    {formatPrice(isSubscription ? subscriptionPrice : displayVariant.sellingPrice)}
                  </span>
                  {hasDiscount && !isSubscription && (
                    <span className="text-lg text-plum-900/40 line-through font-normal">
                      {formatPrice(displayVariant.mrp)}
                    </span>
                  )}
                  {isSubscription && (
                    <span className="text-sm text-plum-900/40 line-through font-normal">
                      {formatPrice(displayVariant.sellingPrice)}
                    </span>
                  )}
                  {hasDiscount && !isSubscription && (
                    <span className="text-xs font-bold text-coral-600 bg-coral-50 border border-coral-200/60 px-2.5 py-1 rounded-full uppercase tracking-wide">
                      {Math.round(((Number(displayVariant.mrp) - Number(displayVariant.sellingPrice)) / Number(displayVariant.mrp)) * 100)}% OFF
                    </span>
                  )}
                </div>
                {isSubscription && (
                  <p className="text-xs font-semibold text-coral-500 mt-1">You save {SUBSCRIPTION_DISCOUNT_PERCENT}% with subscription</p>
                )}
              </div>
            )}

            {/* One-time / Subscribe toggle */}
            <div className="mb-6 bg-white rounded-2xl p-4 md:p-5 border border-plum-900/5 shadow-sm space-y-3">
              <p className="text-xs font-bold text-plum-900/50 uppercase tracking-wider">Purchase type</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => setIsSubscription(false)}
                  className={`flex-1 flex items-center gap-3 p-3.5 rounded-xl border text-sm transition-all text-left ${
                    !isSubscription
                      ? 'border-coral-500 bg-coral-50/40 text-plum-900 shadow-sm ring-1 ring-coral-500/20'
                      : 'border-plum-900/10 bg-white text-plum-900/80 hover:border-plum-900/20'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${!isSubscription ? 'border-coral-500' : 'border-plum-900/20'}`}>
                    {!isSubscription && <div className="w-2 h-2 rounded-full bg-coral-500" />}
                  </div>
                  <div>
                    <span className="font-semibold text-plum-900 block">One-time purchase</span>
                    {displayVariant && (
                      <span className="text-plum-900/60 block text-xs">{formatPrice(displayVariant.sellingPrice)}</span>
                    )}
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setIsSubscription(true)}
                  className={`flex-1 flex items-center gap-3 p-3.5 rounded-xl border text-sm transition-all text-left ${
                    isSubscription
                      ? 'border-coral-500 bg-coral-50/40 text-plum-900 shadow-sm ring-1 ring-coral-500/20'
                      : 'border-plum-900/10 bg-white text-plum-900/80 hover:border-plum-900/20'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${isSubscription ? 'border-coral-500' : 'border-plum-900/20'}`}>
                    {isSubscription && <div className="w-2 h-2 rounded-full bg-coral-500" />}
                  </div>
                  <div>
                    <span className="font-semibold text-plum-900 block">Subscribe &amp; Save</span>
                    <span className="text-coral-500 font-bold text-xs block">
                      {SUBSCRIPTION_DISCOUNT_PERCENT}% OFF · {displayVariant ? formatPrice(subscriptionPrice) : ''}
                    </span>
                  </div>
                </button>
              </div>
              {isSubscription && (
                <p className="text-xs text-plum-900/50 mt-2 text-center font-medium">Subscription available after launch. Add to cart to save your preference.</p>
              )}
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex gap-3 mb-6">
              <QuantitySelector value={quantity} onChange={setQuantity} max={displayVariant?.stockQuantity || 99} />
              <button
                id="add-to-cart-btn"
                onClick={handleAddToCart}
                disabled={addingToCart || !displayVariant || displayVariant.stockQuantity === 0}
                className={`flex-1 py-3.5 px-8 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                  added
                    ? 'bg-emerald-600 text-white shadow-md'
                    : displayVariant?.stockQuantity === 0
                    ? 'bg-plum-900/10 text-plum-900/40 cursor-not-allowed'
                    : 'bg-coral-500 hover:bg-coral-600 active:scale-[0.98] text-white shadow-md shadow-coral-500/20'
                }`}
              >
                {addingToCart ? 'Adding…' : added ? '✓ Added to Cart' : displayVariant?.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 py-4 my-6 border-y border-plum-900/5 bg-white/60 rounded-2xl p-3">
              {[
                { label: 'Free Shipping', sub: 'Above ₹499', icon: '🚚' },
                { label: '7-Day Returns', sub: 'Hassle-free', icon: '↩️' },
                { label: '100% Fresh', sub: 'No preservatives', icon: '🌿' },
              ].map((badge) => (
                <div key={badge.label} className="text-center p-1">
                  <div className="text-xl mb-1">{badge.icon}</div>
                  <div className="text-xs font-bold text-plum-900">{badge.label}</div>
                  <div className="text-[11px] text-plum-900/50 font-medium">{badge.sub}</div>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="mt-8">
              <div className="flex border-b border-plum-900/10 gap-2 md:gap-4 -mb-px overflow-x-auto">
                {TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-3 text-sm capitalize border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === tab
                        ? 'border-coral-500 text-coral-600 font-bold'
                        : 'border-transparent text-plum-900/60 font-medium hover:text-plum-900'
                    }`}
                  >
                    {tab === 'feeding' ? 'Feeding Guide' : tab}
                  </button>
                ))}
              </div>

              <div className="mt-4 bg-white rounded-2xl p-5 md:p-6 border border-plum-900/5 shadow-sm text-plum-900/80 text-sm leading-relaxed">
                {activeTab === 'description' && (
                  <div className="prose prose-sm text-plum-900/80 max-w-none">
                    <p className="leading-relaxed text-base">{product.description}</p>
                    {product.keyBenefits && (
                      <div className="mt-5">
                        <p className="font-bold text-plum-900 mb-3 text-sm uppercase tracking-wider">Key Benefits</p>
                        <ul className="grid sm:grid-cols-2 gap-2.5">
                          {product.keyBenefits.map((b, i) => (
                            <li key={i} className="flex items-center gap-2.5 bg-[#faf6ed] p-2.5 rounded-xl border border-plum-900/5">
                              <svg className="w-4 h-4 text-coral-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                              </svg>
                              <span className="font-semibold text-xs text-plum-900">{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'ingredients' && (
                  <div>
                    <p className="text-plum-900/80 leading-relaxed mb-4 text-base">{product.ingredients}</p>
                    <p className="text-xs text-plum-900/50 font-medium bg-[#faf6ed] p-3 rounded-xl border border-plum-900/5">
                      ✨ All ingredients are 100% human-grade. No artificial additives, fillers, or preservatives.
                    </p>
                  </div>
                )}

                {activeTab === 'nutrition' && product.nutritionalInfo && (
                  <div className="overflow-hidden rounded-xl border border-plum-900/5">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-plum-900/[0.03]">
                          <th className="text-left px-4 py-3 font-bold text-plum-900">Nutrient</th>
                          <th className="text-right px-4 py-3 font-bold text-plum-900">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(product.nutritionalInfo).map(([key, val], i) => (
                          <tr key={key} className={i % 2 === 0 ? 'bg-white' : 'bg-plum-900/[0.01]'}>
                            <td className="px-4 py-3 text-plum-900/70 capitalize font-medium">{key.replace(/([A-Z])/g, ' $1').trim()}</td>
                            <td className="px-4 py-3 text-plum-900 font-bold text-right">{val}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {activeTab === 'feeding' && product.feedingGuide && (
                  <div className="space-y-4">
                    <div className="overflow-hidden rounded-xl border border-plum-900/5">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-plum-900/[0.03]">
                            <th className="text-left px-4 py-3 font-bold text-plum-900">Dog Weight</th>
                            <th className="text-right px-4 py-3 font-bold text-plum-900">Daily Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {product.feedingGuide.map((row, i) => (
                            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-plum-900/[0.01]'}>
                              <td className="px-4 py-3 text-plum-900/70 font-medium">{row.weight}</td>
                              <td className="px-4 py-3 text-plum-900 font-bold text-right">{row.daily}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {product.suitableFor && (
                      <div className="bg-butter-300/30 border border-butter-300/60 text-plum-900 rounded-xl px-4 py-3 text-xs md:text-sm font-medium">
                        <strong className="font-bold">Suitable for:</strong> {product.suitableFor}
                      </div>
                    )}
                    {product.dietChangeGuide && (
                      <div className="bg-amber-50/80 border border-amber-200/60 rounded-xl p-4 text-amber-900 text-xs md:text-sm">
                        <p className="font-bold text-amber-900 mb-1">Transitioning to FurBowl</p>
                        <p className="text-amber-800 leading-relaxed font-normal">{product.dietChangeGuide}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

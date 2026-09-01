'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useCartStore from '@/store/cartStore';
import ProductGallery from '@/components/product/ProductGallery';
import { formatPrice, SUBSCRIPTION_DISCOUNT_PERCENT } from '@/lib/constants';

function QuantitySelector({ value, onChange, min = 1, max = 99 }) {
  return (
    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden w-fit">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        aria-label="Decrease quantity"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
        </svg>
      </button>
      <span className="w-10 text-center text-sm font-semibold text-gray-900" aria-live="polite">
        {value}
      </span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        aria-label="Increase quantity"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
    <div className="section-padding">
      <div className="container-main">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Gallery */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* Product Info */}
          <div>
            {/* Category + Veg indicator */}
            <div className="flex items-center gap-3 mb-3">
              {product.category && (
                <span className="text-xs font-medium text-turquoise-700 bg-turquoise-50 px-3 py-1 rounded-full uppercase tracking-wide">
                  {product.category.name}
                </span>
              )}
              <div className="flex items-center gap-1.5">
                <div
                  className={product.isVeg ? 'veg-indicator' : 'nonveg-indicator'}
                  title={product.isVeg ? 'Vegetarian' : 'Non-vegetarian'}
                />
                <span className="text-xs text-gray-500">{product.isVeg ? 'Veg' : 'Non-veg'}</span>
              </div>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-snug">
              {product.name}
            </h1>

            {product.shortDescription && (
              <p className="text-gray-600 leading-relaxed mb-6">{product.shortDescription}</p>
            )}

            {/* Reviews quick */}
            {product.reviewCount > 0 && (
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} className={`w-4 h-4 ${s <= Math.round(product.averageRating) ? 'text-amber-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-600">{product.averageRating?.toFixed(1)} ({product.reviewCount} reviews)</span>
              </div>
            )}

            {/* Variant Selector */}
            {product.variants && product.variants.length > 1 && (
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-700 mb-2">Size</p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariantId(v.id)}
                      className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                        selectedVariantId === v.id
                          ? 'border-turquoise-600 bg-turquoise-50 text-turquoise-700'
                          : 'border-gray-200 text-gray-700 hover:border-gray-400'
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
                  <span className="text-3xl font-bold text-gray-900">
                    {formatPrice(isSubscription ? subscriptionPrice : displayVariant.sellingPrice)}
                  </span>
                  {hasDiscount && !isSubscription && (
                    <span className="text-lg text-gray-400 line-through">
                      {formatPrice(displayVariant.mrp)}
                    </span>
                  )}
                  {isSubscription && (
                    <span className="text-sm text-gray-400 line-through">
                      {formatPrice(displayVariant.sellingPrice)}
                    </span>
                  )}
                  {hasDiscount && !isSubscription && (
                    <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                      {Math.round(((Number(displayVariant.mrp) - Number(displayVariant.sellingPrice)) / Number(displayVariant.mrp)) * 100)}% OFF
                    </span>
                  )}
                </div>
                {isSubscription && (
                  <p className="text-sm text-turquoise-600 mt-1">You save {SUBSCRIPTION_DISCOUNT_PERCENT}% with subscription</p>
                )}
              </div>
            )}

            {/* One-time / Subscribe toggle */}
            <div className="mb-6 bg-gray-50 rounded-xl p-4 border border-gray-100">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Purchase type</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setIsSubscription(false)}
                  className={`flex-1 flex items-center gap-3 p-3 rounded-lg border text-sm transition-colors text-left ${
                    !isSubscription
                      ? 'border-turquoise-600 bg-white shadow-sm'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${!isSubscription ? 'border-turquoise-600' : 'border-gray-300'}`}>
                    {!isSubscription && <div className="w-2 h-2 rounded-full bg-turquoise-600" />}
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">One-time purchase</span>
                    {displayVariant && (
                      <span className="text-gray-500 block text-xs">{formatPrice(displayVariant.sellingPrice)}</span>
                    )}
                  </div>
                </button>
                <button
                  onClick={() => setIsSubscription(true)}
                  className={`flex-1 flex items-center gap-3 p-3 rounded-lg border text-sm transition-colors text-left ${
                    isSubscription
                      ? 'border-turquoise-600 bg-white shadow-sm'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${isSubscription ? 'border-turquoise-600' : 'border-gray-300'}`}>
                    {isSubscription && <div className="w-2 h-2 rounded-full bg-turquoise-600" />}
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Subscribe &amp; Save</span>
                    <span className="text-turquoise-600 font-semibold text-xs block">
                      {SUBSCRIPTION_DISCOUNT_PERCENT}% OFF · {displayVariant ? formatPrice(subscriptionPrice) : ''}
                    </span>
                  </div>
                </button>
              </div>
              {isSubscription && (
                <p className="text-xs text-gray-400 mt-3 text-center">Subscription available after launch. Add to cart to save your preference.</p>
              )}
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex gap-3 mb-6">
              <QuantitySelector value={quantity} onChange={setQuantity} max={displayVariant?.stockQuantity || 99} />
              <button
                id="add-to-cart-btn"
                onClick={handleAddToCart}
                disabled={addingToCart || !displayVariant || displayVariant.stockQuantity === 0}
                className={`flex-1 py-3 px-6 rounded-xl font-semibold text-sm transition-all ${
                  added
                    ? 'bg-green-500 text-white'
                    : displayVariant?.stockQuantity === 0
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-turquoise-600 text-white hover:bg-turquoise-700 active:scale-95'
                }`}
              >
                {addingToCart ? 'Adding…' : added ? '✓ Added to Cart' : displayVariant?.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 py-5 border-y border-gray-100">
              {[
                { label: 'Free Shipping', sub: 'Above ₹499', icon: '🚚' },
                { label: '7-Day Returns', sub: 'Hassle-free', icon: '↩️' },
                { label: '100% Fresh', sub: 'No preservatives', icon: '🌿' },
              ].map((badge) => (
                <div key={badge.label} className="text-center">
                  <div className="text-xl mb-1">{badge.icon}</div>
                  <div className="text-xs font-semibold text-gray-700">{badge.label}</div>
                  <div className="text-xs text-gray-400">{badge.sub}</div>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="mt-8">
              <div className="flex border-b border-gray-100 gap-1 -mb-px">
                {TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2.5 text-sm font-medium capitalize border-b-2 transition-colors ${
                      activeTab === tab
                        ? 'border-turquoise-600 text-turquoise-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab === 'feeding' ? 'Feeding Guide' : tab}
                  </button>
                ))}
              </div>

              <div className="py-6">
                {activeTab === 'description' && (
                  <div className="prose prose-sm text-gray-600 max-w-none">
                    <p className="leading-relaxed">{product.description}</p>
                    {product.keyBenefits && (
                      <div className="mt-4">
                        <p className="font-semibold text-gray-900 mb-2">Key Benefits</p>
                        <ul className="space-y-1.5">
                          {product.keyBenefits.map((b, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <svg className="w-4 h-4 text-turquoise-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'ingredients' && (
                  <div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">{product.ingredients}</p>
                    <p className="text-xs text-gray-400">* All ingredients are human-grade. No artificial additives.</p>
                  </div>
                )}

                {activeTab === 'nutrition' && product.nutritionalInfo && (
                  <div className="overflow-hidden rounded-xl border border-gray-100">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="text-left px-4 py-3 font-semibold text-gray-700">Nutrient</th>
                          <th className="text-right px-4 py-3 font-semibold text-gray-700">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(product.nutritionalInfo).map(([key, val], i) => (
                          <tr key={key} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                            <td className="px-4 py-3 text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</td>
                            <td className="px-4 py-3 text-gray-900 font-medium text-right">{val}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {activeTab === 'feeding' && product.feedingGuide && (
                  <div>
                    <div className="overflow-hidden rounded-xl border border-gray-100 mb-4">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="text-left px-4 py-3 font-semibold text-gray-700">Dog Weight</th>
                            <th className="text-right px-4 py-3 font-semibold text-gray-700">Daily Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {product.feedingGuide.map((row, i) => (
                            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                              <td className="px-4 py-3 text-gray-600">{row.weight}</td>
                              <td className="px-4 py-3 text-gray-900 font-medium text-right">{row.daily}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {product.suitableFor && (
                      <p className="text-sm text-turquoise-700 bg-turquoise-50 rounded-lg px-4 py-3">
                        <strong>Suitable for:</strong> {product.suitableFor}
                      </p>
                    )}
                    {product.dietChangeGuide && (
                      <div className="mt-4 bg-amber-50 rounded-lg px-4 py-3">
                        <p className="text-sm font-semibold text-amber-800 mb-1">Transitioning to FurBowl</p>
                        <p className="text-sm text-amber-700 leading-relaxed">{product.dietChangeGuide}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products section can be added later */}
      </div>
    </div>
  );
}

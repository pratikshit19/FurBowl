'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useCartStore from '@/store/cartStore';
import Link from 'next/link';
import { Utensils, ShieldCheck, Scale, Snowflake, Calendar, Check } from 'lucide-react';
import ProductGallery from '@/components/product/ProductGallery';
import { formatPrice, SUBSCRIPTION_DISCOUNT_PERCENT } from '@/lib/constants';

function QuantitySelector({ value, onChange, min = 1, max = 99 }) {
  return (
    <div className="flex items-center border border-plum-900/10 rounded-md bg-white shadow-sm overflow-hidden w-fit">
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
    <div className="section-padding bg-white">
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
                  className={`flex-1 flex items-center gap-3 p-3.5 rounded-md border text-sm transition-all text-left ${
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
                  className={`flex-1 flex items-center gap-3 p-3.5 rounded-md border text-sm transition-all text-left ${
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
                className={`flex-1 py-3.5 px-8 rounded-md font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                  added
                    ? 'bg-emerald-600 text-white shadow-md'
                    : displayVariant?.stockQuantity === 0
                    ? 'bg-plum-900/10 text-plum-900/40 cursor-not-allowed'
                    : 'bg-coral-500 hover:bg-coral-600 active:scale-[0.98] text-white shadow-md shadow-coral-500/20'
                }`}
              >
                {addingToCart ? (
                  'Adding…'
                ) : added ? (
                  <span className="inline-flex items-center gap-1.5">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>Added to Cart</span>
                  </span>
                ) : displayVariant?.stockQuantity === 0 ? (
                  'Out of Stock'
                ) : (
                  'Add to Cart'
                )}
              </button>
            </div>

            {/* Breadcrumb matching Screen 5 */}
            <nav className="flex items-center gap-2 text-xs text-plum-900/50 mb-3" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-coral-600 transition-colors">Home</Link>
              <span>›</span>
              <Link href="/shop" className="hover:text-coral-600 transition-colors">Our Food</Link>
              <span>›</span>
              <span className="text-plum-900 font-bold">{product.name}</span>
            </nav>

            {/* Title & Playful Subtitle */}
            <h1 className="text-3xl sm:text-4xl font-black text-plum-900 tracking-tight mb-1">
              {product.name}
            </h1>
            <p className="text-sm text-plum-900/70 font-normal mb-4">
              Real chicken. Real vegetables. Real happiness.
            </p>

            {/* 3 Trust Badges Matching Screen 5 */}
            <div className="grid grid-cols-3 gap-2 py-3 mb-6 border-y border-plum-900/10 bg-butter-50/50 rounded-2xl px-3">
              <div className="flex flex-col items-center text-center p-1">
                <Utensils className="w-5 h-5 text-plum-900 mb-1" />
                <span className="text-[11px] font-bold text-plum-900 leading-tight">Human Grade</span>
                <span className="text-[9px] text-plum-900/50">100% whole meat</span>
              </div>
              <div className="flex flex-col items-center text-center p-1 border-x border-plum-900/10">
                <ShieldCheck className="w-5 h-5 text-coral-600 mb-1" />
                <span className="text-[11px] font-bold text-plum-900 leading-tight">No Preservatives</span>
                <span className="text-[9px] text-plum-900/50">Zero additives</span>
              </div>
              <div className="flex flex-col items-center text-center p-1">
                <Scale className="w-5 h-5 text-plum-900 mb-1" />
                <span className="text-[11px] font-bold text-plum-900 leading-tight">Complete & Balanced</span>
                <span className="text-[9px] text-plum-900/50">Vet certified</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-8">
              <div className="flex border-b border-plum-900/10 gap-2 md:gap-4 -mb-px overflow-x-auto">
                {['ingredients', 'feeding', 'nutrition', 'delivery'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-3 text-xs sm:text-sm font-bold capitalize border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                      activeTab === tab
                        ? 'border-coral-500 text-coral-600'
                        : 'border-transparent text-plum-900/60 hover:text-plum-900'
                    }`}
                  >
                    {tab === 'feeding'
                      ? 'Feeding Guide'
                      : tab === 'nutrition'
                      ? 'Nutritional Information'
                      : tab === 'delivery'
                      ? 'Delivery & Storage'
                      : 'Ingredients'}
                  </button>
                ))}
              </div>

              <div className="py-6">
                {activeTab === 'description' && (
                  <div className="prose prose-sm text-plum-900/80 max-w-none">
                    <p className="leading-relaxed text-base">{product.description}</p>
                    {product.keyBenefits && (
                      <div className="mt-5">
                        <p className="font-bold text-plum-900 mb-3 text-sm uppercase tracking-wider">Key Benefits</p>
                        <ul className="grid sm:grid-cols-2 gap-2.5">
                          {product.keyBenefits.map((b, i) => (
                            <li key={i} className="flex items-center gap-2.5 bg-[#f0fafb] p-2.5 rounded-sm border border-plum-900/10">
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
                    <p className="text-xs text-plum-900/70 font-medium bg-[#f0fafb] p-3 rounded-sm border border-plum-900/10 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                      <span>All ingredients are 100% human-grade. No artificial additives, fillers, or preservatives.</span>
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

                {activeTab === 'delivery' && (
                  <div className="space-y-4 text-xs sm:text-sm">
                    <div className="flex items-start gap-3 p-3.5 bg-butter-50 rounded-xl border border-plum-900/10">
                      <Snowflake className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-plum-900 mb-1">Refrigerated Fresh Delivery</h4>
                        <p className="text-plum-900/70 font-normal">
                          Shipped cold in temperature-controlled insulated packaging. Guaranteed to arrive chilled and ready to serve or store.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3.5 bg-butter-50 rounded-xl border border-plum-900/10">
                      <Calendar className="w-5 h-5 text-coral-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-plum-900 mb-1">Storage Instructions</h4>
                        <p className="text-plum-900/70 font-normal">
                          Store unopened pouches in your refrigerator for up to 30 days, or in the freezer for up to 6 months. Once opened, consume within 48 hours.
                        </p>
                      </div>
                    </div>
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

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useCartStore from '@/store/cartStore';
import Image from 'next/image';
import { Snowflake, Calendar, Check, Heart, ShieldCheck } from 'lucide-react';
import ProductGallery from '@/components/product/ProductGallery';
import useWishlistStore from '@/store/wishlistStore';
import { formatPrice, SUBSCRIPTION_DISCOUNT_PERCENT } from '@/lib/constants';

/* ─── High-Definition 3D Visual Ingredients Mapping ─────────────────────── */
const INGREDIENT_DEFINITIONS = [
  {
    match: /chicken/i,
    name: 'Whole Farm Chicken',
    badge: 'Primary Protein',
    benefit: 'Lean muscle building & vital amino acids',
    image: '/images/ingredients/chicken-3d.jpg',
  },
  {
    match: /pumpkin/i,
    name: 'Golden Sun Pumpkin',
    badge: 'Digestive Health',
    benefit: 'Gentle soluble fiber for smooth digestion',
    image: '/images/ingredients/pumpkin-3d.jpg',
  },
  {
    match: /carrot/i,
    name: 'Crisp Garden Carrots',
    badge: 'Vision & Immunity',
    benefit: 'Rich in beta-carotene & antioxidants',
    image: '/images/ingredients/carrot-3d.jpg',
  },
  {
    match: /pea/i,
    name: 'Sweet Garden Peas',
    badge: 'Plant Nutrition',
    benefit: 'Natural lutein, zinc & healthy energy',
    image: '/images/ingredients/peas-3d.jpg',
  },
  {
    match: /lamb/i,
    name: 'Pasture-Raised Lamb',
    badge: 'Iron & Muscle',
    benefit: 'High bioavailable iron & B-vitamins',
    image: '/images/ingredients/lamb-3d.jpg',
  },
  {
    match: /flaxseed/i,
    name: 'Cold-Pressed Flaxseed',
    badge: 'Omega-3 & 6',
    benefit: 'Nourishes sensitive skin & shiny fur',
    image: '/images/ingredients/flaxseed-3d.jpg',
  },
  {
    match: /broth/i,
    name: 'Simmered Bone Broth',
    badge: 'Joint Collagen',
    benefit: 'Glucosamine & chondroitin for healthy joints',
    image: '/images/ingredients/bonebroth-3d.jpg',
  },
  {
    match: /sweet potato/i,
    name: 'Farm Sweet Potato',
    badge: 'Low-GI Energy',
    benefit: 'Slow-burning sustained stamina & potassium',
    image: '/images/home/ingredient-superfoods.jpg',
  },
  {
    match: /rice/i,
    name: 'Wholesome Steamed Rice',
    badge: 'Gentle Energy',
    benefit: 'Soothes delicate tummies, easy daily fuel',
    image: '/images/home/ingredient-grains.jpg',
  },
  {
    match: /egg/i,
    name: 'Farm-Fresh Whole Eggs',
    badge: 'Complete Protein',
    benefit: 'Full bioavailable amino acid spectrum',
    image: '/images/products/golden-egg-quinoa-front.jpg',
  },
  {
    match: /paneer/i,
    name: 'Fresh Artisan Paneer',
    badge: 'Pure Veg Protein',
    benefit: 'Gentle vegetarian protein & bone calcium',
    image: '/images/products/paneer-greens-front.jpg',
  },
  {
    match: /spinach|greens|broccoli|zucchini/i,
    name: 'Fresh Garden Greens',
    badge: 'Vitamins & Minerals',
    benefit: 'Vibrant phytonutrients & cellular protection',
    image: '/images/home/ingredient-veggies.jpg',
  },
];

function getVisualIngredients(ingredientsText, productName = '') {
  const text = `${ingredientsText || ''} ${productName || ''}`;
  const matched = [];
  const added = new Set();

  for (const def of INGREDIENT_DEFINITIONS) {
    if (def.match.test(text) && !added.has(def.name)) {
      matched.push(def);
      added.add(def.name);
    }
  }

  // Fallback if none matched
  if (matched.length === 0) {
    return INGREDIENT_DEFINITIONS.slice(0, 4);
  }
  return matched;
}

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
  const [activeTab, setActiveTab] = useState('ingredients');
  const [wishlistToast, setWishlistToast] = useState('');

  const visualIngredients = getVisualIngredients(product.ingredients, product.name);

  const { toggleItem, isWishlisted } = useWishlistStore();
  const wishlisted = isWishlisted(product.id || product.slug);

  const handleToggleWishlist = () => {
    const isAdded = toggleItem(product);
    setWishlistToast(isAdded ? 'Added to your Wishlist ❤️' : 'Removed from Wishlist');
    setTimeout(() => setWishlistToast(''), 3000);
  };

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
          <div className="lg:sticky lg:top-28 lg:self-start relative group/gallery">
            <ProductGallery images={product.images} productName={product.name} />
            {/* Quick Floating Heart Button on Top-Right of Gallery */}
            <button
              type="button"
              onClick={handleToggleWishlist}
              aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              title={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
              className={`absolute top-3 right-3 z-20 w-11 h-11 rounded-full flex items-center justify-center transition-all shadow-md active:scale-90 cursor-pointer ${
                wishlisted
                  ? 'bg-coral-500 text-white shadow-coral-500/30'
                  : 'bg-white/95 backdrop-blur-xs text-plum-900/60 hover:text-coral-500 hover:bg-white border border-plum-900/10'
              }`}
            >
              <Heart className={`w-5 h-5 transition-transform duration-200 ${wishlisted ? 'fill-white text-white scale-110' : ''}`} />
            </button>
          </div>

          {/* Product Info */}
          <div>
            {/* Category badge */}
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              {product.category && (
                <span className="text-[11px] font-bold text-plum-900 bg-butter-300/40 border border-butter-300/60 px-3 py-1 rounded-full uppercase tracking-wider">
                  {product.category.name}
                </span>
              )}
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
                      className={`px-4 py-2 rounded border text-sm font-semibold transition-all ${
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
            <div className="mb-4 bg-white rounded-xl p-4 md:p-5 border border-plum-900/5 shadow-sm space-y-3">
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

            {/* Quantity + Add to Cart + Wishlist */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-plum-900/60 uppercase tracking-wider sm:hidden">Quantity</span>
                <QuantitySelector value={quantity} onChange={setQuantity} max={displayVariant?.stockQuantity || 99} />
              </div>

              <div className="flex gap-2.5 flex-1">
                <button
                  id="add-to-cart-btn"
                  onClick={handleAddToCart}
                  disabled={addingToCart || !displayVariant || displayVariant.stockQuantity === 0}
                  className={`flex-1 py-3.5 px-6 rounded-md font-bold text-sm transition-all flex items-center justify-center gap-2 ${
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

                {/* Wishlist Button */}
                <button
                  type="button"
                  id="wishlist-toggle-btn"
                  onClick={handleToggleWishlist}
                  aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                  title={wishlisted ? 'In your Wishlist (Click to remove)' : 'Add to Wishlist'}
                  className={`px-4 py-3.5 rounded-md border flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 shrink-0 ${
                    wishlisted
                      ? 'border-coral-500 bg-coral-50 text-coral-600 shadow-sm ring-1 ring-coral-500/30'
                      : 'border-plum-900/15 bg-white text-plum-900/70 hover:text-coral-600 hover:border-coral-500/40 hover:bg-coral-50/20'
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 transition-transform duration-200 ${
                      wishlisted ? 'fill-coral-500 text-coral-500 scale-110' : 'hover:scale-110'
                    }`}
                  />
                  <span className="hidden sm:inline text-xs font-bold">
                    {wishlisted ? 'Wishlisted' : 'Wishlist'}
                  </span>
                </button>
              </div>
            </div>

            {/* Wishlist Feedback Toast */}
            {wishlistToast && (
              <div className="mb-5 inline-flex items-center gap-2 bg-coral-50 border border-coral-200 text-coral-700 text-xs font-bold px-3.5 py-2 rounded-md animate-fade-in shadow-xs">
                <Heart className="w-3.5 h-3.5 fill-coral-500 text-coral-500" />
                <span>{wishlistToast}</span>
                <Link href="/wishlist" className="underline hover:text-coral-900 ml-1 font-extrabold">
                  View Wishlist →
                </Link>
              </div>
            )}

            {/* Tabs */}
            <div className="mt-8">
              {/* Tab navigation without visible slider scrollbar */}
              <div className="flex border-b border-plum-900/10 gap-2 sm:gap-4 -mb-px overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {['ingredients', 'feeding', 'nutrition', 'delivery'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-bold capitalize border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
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
                {activeTab === 'ingredients' && (
                  <div className="space-y-6 animate-fade-in">
                    {/* Visualized Ingredient Cards Grid */}
                    <div>
                      <div className="flex items-center justify-between mb-3.5 flex-wrap gap-2">
                        <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-plum-900">
                          Whole Food Ingredients
                        </h3>
                        <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200/60">
                          100% Real Food • Human Grade
                        </span>
                      </div>

                      <div className="flex flex-wrap items-start gap-3.5 sm:gap-5">
                        {visualIngredients.map((ing, idx) => (
                          <div
                            key={idx}
                            className="group flex flex-col items-center text-center w-[68px] sm:w-[76px]"
                          >
                            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden bg-butter-50/60 border-2 border-plum-900/10 p-1 group-hover:border-coral-400 group-hover:scale-105 transition-all shadow-2xs flex items-center justify-center shrink-0">
                              <div className="relative w-full h-full rounded-full overflow-hidden">
                                <Image
                                  src={ing.image}
                                  alt={ing.name}
                                  fill
                                  sizes="64px"
                                  className="object-cover"
                                />
                              </div>
                            </div>
                            <span className="font-bold text-[11px] sm:text-xs text-plum-900 leading-snug mt-1.5 text-center">
                              {ing.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Complete Statement & Guarantee */}
                    <div className="bg-[#faf6ed] rounded-xl p-4 sm:p-5 border border-plum-900/10 space-y-3">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-plum-900/70 mb-1">
                          Full Ingredient Statement
                        </p>
                        <p className="text-xs sm:text-sm text-plum-900/85 leading-relaxed font-medium">
                          {product.ingredients}
                        </p>
                      </div>
                      <div className="pt-3 border-t border-plum-900/10 flex items-center gap-2.5 text-xs font-semibold text-teal-900">
                        <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                        <span>All ingredients are 100% human-grade. Zero artificial preservatives, fillers, meat meals, or chemicals.</span>
                      </div>
                    </div>
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

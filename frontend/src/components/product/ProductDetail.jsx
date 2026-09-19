'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Check,
  Heart,
  Minus,
  Plus,
  ChevronDown,
  ShieldCheck,
  Snowflake,
  Calendar,
  Package,
} from 'lucide-react';
import ProductGallery from '@/components/product/ProductGallery';
import ProductReviews from '@/components/product/ProductReviews';
import useCartStore from '@/store/cartStore';
import useWishlistStore from '@/store/wishlistStore';
import { formatPrice, SUBSCRIPTION_DISCOUNT_PERCENT } from '@/lib/constants';

/* ─── Visual Ingredients Mapping ─────────────────────────────────────────── */
const INGREDIENT_DEFINITIONS = [
  {
    match: /lamb/i,
    name: 'Pasture-Raised Lamb',
    badge: 'Iron & Muscle',
    benefit: 'High bioavailable iron & B-vitamins',
    image: '/images/ingredients/lamb-3d.jpg',
  },
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
    match: /lentil/i,
    name: 'Hearty Red Lentils',
    badge: 'Gentle Fiber',
    benefit: 'Low glycemic plant fiber & iron',
    image: '/images/home/ingredient-grains.jpg',
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
    match: /spinach|greens|broccoli|zucchini|beans/i,
    name: 'Fresh Garden Greens',
    badge: 'Vitamins & Minerals',
    benefit: 'Vibrant phytonutrients & cellular protection',
    image: '/images/home/ingredient-veggies.jpg',
  },
];

// Brand-wide universal quality guarantees (applicable to all FurBowl meals)
const BRAND_GUARANTEES = [
  '100% Human-Grade Food',
  'Gently Steam-Cooked Fresh',
  'Vet-Approved & Balanced',
  'Zero Preservatives or Fillers',
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

  if (matched.length === 0) {
    return INGREDIENT_DEFINITIONS.slice(0, 4);
  }
  return matched;
}

export default function ProductDetail({ product }) {
  const defaultVariant = product.variants?.[0] || {
    id: `v-${product.slug || product.id}`,
    name: product.foodType === 'TRIAL_PACK' || product.foodType === 'MULTI_PACK' ? (product.name || 'Pack') : '100g Pouch',
    mrp: product.price ? product.price + 20 : 199,
    sellingPrice: product.price || 179,
    stockQuantity: 100,
  };

  const availableVariants =
    product.variants && product.variants.length > 0
      ? product.variants
      : [defaultVariant];

  const [selectedVariantId, setSelectedVariantId] = useState(availableVariants[0].id);
  const selectedVariant = availableVariants.find((v) => v.id === selectedVariantId) || availableVariants[0] || defaultVariant;

  const [quantity, setQuantity] = useState(1);
  const [isSubscription, setIsSubscription] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [added, setAdded] = useState(false);
  const [wishlistToast, setWishlistToast] = useState('');
  const [reviews, setReviews] = useState(() => (Array.isArray(product.reviews) ? product.reviews : []));

  // Load reviews from localStorage on product change
  useEffect(() => {
    try {
      const storageKey = `furbowl_reviews_${product.slug || product.id || 'general'}`;
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setReviews(parsed);
          return;
        }
      }
    } catch {
      // ignore
    }
    setReviews(Array.isArray(product.reviews) ? product.reviews : []);
  }, [product.slug, product.id, product.reviews]);

  const reviewCount = reviews.length;
  const averageRating =
    reviewCount > 0
      ? (reviews.reduce((acc, r) => acc + (Number(r.rating) || 0), 0) / reviewCount).toFixed(1)
      : '0.0';

  const handleAddReview = (newReview) => {
    setReviews((prev) => {
      const updated = [newReview, ...prev];
      try {
        const storageKey = `furbowl_reviews_${product.slug || product.id || 'general'}`;
        localStorage.setItem(storageKey, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  // Accordion state
  const [expandedSection, setExpandedSection] = useState({
    delivery: false,
    ingredients: false,
    feeding: false,
    nutrition: false,
  });

  const toggleAccordion = (section) => {
    setExpandedSection((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const { addItem } = useCartStore();
  const { toggleItem, isWishlisted } = useWishlistStore();
  const wishlisted = isWishlisted(product.id || product.slug);

  const handleToggleWishlist = () => {
    const isAdded = toggleItem(product);
    setWishlistToast(isAdded ? 'Added to your Wishlist ❤️' : 'Removed from Wishlist');
    setTimeout(() => setWishlistToast(''), 3000);
  };

  // Pricing calculations using the product's actual variant data
  const baseSellingPrice = Number(selectedVariant.sellingPrice) || 99;
  const baseMrp = Number(selectedVariant.mrp) || Math.round(baseSellingPrice * 1.15);
  const subscriptionUnitPrice = Math.floor(baseSellingPrice * (1 - SUBSCRIPTION_DISCOUNT_PERCENT / 100));

  const finalUnitPrice = isSubscription ? subscriptionUnitPrice : baseSellingPrice;
  const totalSellingPrice = finalUnitPrice * quantity;
  const totalMrp = baseMrp * quantity;

  const hasDiscount = totalMrp > totalSellingPrice;
  const discountPercent = hasDiscount
    ? Math.round(((totalMrp - totalSellingPrice) / totalMrp) * 100)
    : 0;

  const handleAddToCart = () => {
    setAddingToCart(true);
    try {
      addItem(product, selectedVariant, quantity, isSubscription);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch {
      // ignore
    } finally {
      setAddingToCart(false);
    }
  };

  const visualIngredients = getVisualIngredients(product.ingredients, product.name);

  // Use product's actual key benefits without truncating
  const keyBenefitsList = product.keyBenefits && product.keyBenefits.length > 0 ? product.keyBenefits : [];

  return (
    <div className="pt-2 pb-16 sm:py-8 lg:py-10 bg-white w-full overflow-x-clip">
      <div className="container-main w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-12 items-start w-full min-w-0">
          
          {/* ─── LEFT: Compact Product Gallery ────────────────────────────── */}
          <div className="w-full max-w-md lg:max-w-[480px] mx-auto min-w-0 lg:sticky lg:top-24 lg:self-start relative">
            <ProductGallery images={product.images} productName={product.name} />

            {/* Quick Wishlist Floating Button */}
            <button
              type="button"
              onClick={handleToggleWishlist}
              aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              title={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
              className={`absolute top-2.5 right-2.5 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all shadow-xs active:scale-90 cursor-pointer ${
                wishlisted
                  ? 'bg-coral-500 text-white shadow-coral-500/30'
                  : 'bg-white/95 backdrop-blur-xs text-plum-900/60 hover:text-coral-500 hover:bg-white border border-plum-900/10'
              }`}
            >
              <Heart className={`w-4.5 h-4.5 transition-transform duration-200 ${wishlisted ? 'fill-white text-white scale-110' : ''}`} />
            </button>
          </div>

          {/* ─── RIGHT: Product Details ────────────────────────────────────── */}
          <div className="w-full min-w-0 max-w-full">
            
            {/* Category badge + Rating row + Product Badges */}
            <div className="flex items-center gap-2 mb-2.5 flex-wrap">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('customer-reviews-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#faf7f2] hover:bg-amber-50/80 text-plum-900 border border-plum-900/10 text-xs font-bold transition-colors cursor-pointer"
                title="View or write customer reviews"
              >
                <span className={reviewCount > 0 ? 'text-amber-500 font-black' : 'text-plum-900/30 font-bold'}>★</span>
                <span>
                  {reviewCount > 0
                    ? `${averageRating} (${reviewCount} ${reviewCount === 1 ? 'review' : 'reviews'})`
                    : '0.0 (0 reviews)'}
                </span>
              </button>

              {product.badge && (
                <span className="text-[11px] font-bold text-white bg-teal-700 px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                  {product.badge}
                </span>
              )}

              {product.dogType && (
                <span className="text-[11px] font-medium text-plum-900/85 bg-plum-900/5 border border-plum-900/10 px-2.5 py-0.5 rounded-full">
                  🐾 {product.dogType}
                </span>
              )}

              {product.proteinType && (
                <span className="text-[11px] font-medium text-teal-800 bg-teal-50 border border-teal-200/60 px-2.5 py-0.5 rounded-full">
                  🥩 {product.proteinType}
                </span>
              )}

              {product.category?.name && (
                <span className="text-[11px] font-bold text-plum-900/70 bg-butter-300/40 border border-butter-300/60 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {product.category.name}
                </span>
              )}

              {product.foodType === 'TRIAL_PACK' && !product.badge && (
                <span className="text-[11px] font-bold text-teal-800 bg-teal-50 border border-teal-200/60 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Curated Trial Pack
                </span>
              )}

              {product.foodType === 'MULTI_PACK' && !product.badge && (
                <span className="text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200/60 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Value Multi-Pack
                </span>
              )}
            </div>

            {/* Title + Human Grade Badge Row */}
            <div className="flex items-start justify-between gap-3 mb-2.5">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-plum-900 leading-tight tracking-tight break-words">
                {product.name}
              </h1>

              {/* Human Grade Cloche Badge */}
              <div className="flex flex-col items-center shrink-0 text-center pl-2 pt-0.5">
                <div className="w-10 h-10 rounded-full bg-[#fbf8f2] border border-plum-900/15 flex items-center justify-center text-plum-900 mb-0.5 shadow-2xs">
                  <svg className="w-5 h-5 text-plum-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 4V2" />
                    <path d="M4 12a8 8 0 0 1 16 0H4z" />
                    <path d="M2 15h20" />
                    <path d="M5 18h14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z" />
                  </svg>
                </div>
                <span className="text-[10px] font-extrabold text-plum-900 uppercase tracking-tight leading-none whitespace-nowrap">
                  Human Grade
                </span>
              </div>
            </div>

            {/* Whole Food Ingredients Strip (from fed data) */}
            {product.highlightIngredients && (
              <div className="text-xs text-plum-900/80 mb-3 bg-[#faf6ed] border border-plum-900/10 rounded-lg px-3 py-2 leading-relaxed">
                <strong className="text-plum-900 font-bold">Key Whole Foods: </strong>
                <span>{product.highlightIngredients}</span>
              </div>
            )}

            {/* Universal FurBowl Quality Guarantees: Universal, crisp, never truncated */}
            <div className="grid grid-cols-2 gap-x-3 sm:gap-x-4 gap-y-2 py-2.5 my-3 border-y border-plum-900/10">
              {BRAND_GUARANTEES.map((guarantee, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs sm:text-[13px] text-plum-900 font-medium">
                  <Check className="w-4 h-4 text-teal-700 stroke-[3] shrink-0" />
                  <span className="leading-snug">{guarantee}</span>
                </div>
              ))}
            </div>

            {/* Pricing Section */}
            <div className="mb-4">
              <div className="flex items-baseline gap-2.5">
                <span className="text-2xl sm:text-3xl font-normal text-plum-900 tracking-tight">
                  {formatPrice(totalSellingPrice)}
                </span>
                {hasDiscount && (
                  <span className="text-base text-plum-900/40 line-through font-normal">
                    {formatPrice(totalMrp)}
                  </span>
                )}
                {hasDiscount && (
                  <span className="text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200/60 px-2 py-0.5 rounded-md uppercase tracking-wide">
                    {discountPercent}% OFF
                  </span>
                )}
              </div>
              {isSubscription && (
                <p className="text-xs font-normal text-teal-700 mt-1">
                  Includes {SUBSCRIPTION_DISCOUNT_PERCENT}% Monthly Saver discount
                </p>
              )}
            </div>

            {/* Product-Specific Variants / Pack Selector */}
            {availableVariants.length > 1 && (
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-plum-900/80 uppercase tracking-wider">
                    Pack Size / Option
                  </span>
                  {selectedVariant.subtitle && (
                    <span className="text-[11px] text-teal-800 font-medium">
                      {selectedVariant.subtitle}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {availableVariants.map((v) => {
                    const isSelected = selectedVariant.id === v.id;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedVariantId(v.id)}
                        className={`relative py-2.5 px-2 text-center rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'border-teal-700 bg-teal-50/70 text-teal-900 ring-1 ring-teal-700/40 shadow-xs'
                            : 'border-plum-900/15 bg-white text-plum-900 hover:border-plum-900/30'
                        }`}
                      >
                        {v.badge && (
                          <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[9px] font-bold text-white bg-teal-700 px-2 py-0.5 rounded-full whitespace-nowrap uppercase tracking-tight shadow-xs">
                            {v.badge}
                          </span>
                        )}
                        <div className="text-xs sm:text-sm font-semibold text-plum-900 pt-0.5">{v.name}</div>
                        <div className="text-xs font-normal text-plum-900/70 mt-1">
                          {formatPrice(v.sellingPrice)}
                          {v.mrp > v.sellingPrice && (
                            <span className="line-through text-plum-900/40 text-[10px] ml-1 font-normal">
                              {formatPrice(v.mrp)}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Trial Pack / Multi Pack Contents Breakdown (from fed data) */}
            {(product.foodType === 'TRIAL_PACK' || product.foodType === 'MULTI_PACK' || product.breakdown) && (
              <div className="mb-5 p-3.5 bg-[#faf6ed] rounded-xl border border-plum-900/10">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <Package className="w-4 h-4 text-teal-700 shrink-0" />
                    <span className="text-xs font-bold text-plum-900">What’s Inside This Pack</span>
                  </div>
                  {product.totalWeight && (
                    <span className="text-[11px] font-bold text-plum-900/75 bg-white border border-plum-900/10 px-2 py-0.5 rounded-md">
                      Total: {product.totalWeight}
                    </span>
                  )}
                </div>

                {product.tagline && (
                  <p className="text-xs font-bold text-teal-800 mb-2">{product.tagline}</p>
                )}

                {product.breakdown && product.breakdown.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {product.breakdown.map((item, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg bg-white border border-plum-900/15 text-plum-900 shadow-2xs"
                      >
                        <span className="w-4.5 h-4.5 rounded bg-teal-700/10 text-teal-800 text-[11px] font-bold flex items-center justify-center">
                          {item.count}x
                        </span>
                        <span>{item.name}</span>
                      </span>
                    ))}
                  </div>
                )}

                {product.purpose && (
                  <p className="text-[11px] text-plum-900/75 font-normal leading-relaxed mt-2 pt-2 border-t border-plum-900/10">
                    💡 {product.purpose}
                  </p>
                )}
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mb-5">
              <span className="text-xs font-bold text-plum-900 block mb-2">Quantity:</span>
              <div className="inline-flex items-center border border-plum-900/15 rounded-xl bg-white overflow-hidden shadow-2xs">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="w-10 h-10 flex items-center justify-center text-plum-900 hover:text-teal-700 hover:bg-teal-50/60 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center text-sm font-normal text-plum-900" aria-live="polite">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-plum-900 hover:text-teal-700 hover:bg-teal-50/60 cursor-pointer transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Available Offers */}
            <div className="mb-5 pt-3.5 pb-2 border-t border-plum-900/10">
              <h3 className="text-sm font-bold text-plum-900 mb-2">Available Offers</h3>
              <ul className="space-y-1.5 text-xs text-plum-900/85">
                <li className="flex items-start gap-2">
                  <span className="text-plum-900 font-bold">•</span>
                  <span>Flat 10% OFF on orders above ₹995.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-plum-900 font-bold">•</span>
                  <span>Extra {SUBSCRIPTION_DISCOUNT_PERCENT}% OFF on Monthly Saver Plans with priority chilled delivery.</span>
                </li>
              </ul>
            </div>

            {/* Main Full-Width Solid ADD TO CART Button (Matching Cart Buttons) */}
            <button
              id="add-to-cart-btn"
              type="button"
              onClick={handleAddToCart}
              disabled={addingToCart}
              className={`w-full py-4 px-6 rounded-xl font-bold text-sm tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer mb-3.5 shadow-md ${
                added
                  ? 'bg-emerald-600 text-white shadow-emerald-600/20'
                  : 'bg-teal-700 hover:bg-teal-800 active:scale-[0.99] text-white shadow-teal-700/25'
              }`}
            >
              {addingToCart ? (
                'Adding…'
              ) : added ? (
                <span className="inline-flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  <span>Added to Cart</span>
                </span>
              ) : (
                'ADD TO CART'
              )}
            </button>

            {/* Monthly Saver Plans Checkbox Card */}
            <div
              role="checkbox"
              aria-checked={isSubscription}
              tabIndex={0}
              onClick={() => setIsSubscription(!isSubscription)}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  setIsSubscription(!isSubscription);
                }
              }}
              className={`w-full p-3.5 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-3.5 mb-6 ${
                isSubscription
                  ? 'border-teal-700 bg-teal-50/50 shadow-xs'
                  : 'border-plum-900/20 bg-white hover:border-plum-900/35'
              }`}
            >
              <div
                className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                  isSubscription ? 'border-teal-700 bg-teal-700 text-white' : 'border-plum-900/40 bg-white'
                }`}
              >
                {isSubscription && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-bold text-plum-900 block leading-tight">Monthly Saver Plans</span>
                <span className="text-xs text-plum-900/70 font-normal block mt-0.5">
                  Save {SUBSCRIPTION_DISCOUNT_PERCENT}% on scheduled fresh pouch refills
                </span>
              </div>
              <span className="text-[11px] font-bold text-teal-800 bg-teal-50 border border-teal-200/60 px-2 py-0.5 rounded-full uppercase shrink-0">
                10% OFF
              </span>
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

            {/* ─── Collapsible Accordions ─── */}
            <div className="border-t border-plum-900/10 divide-y divide-plum-900/10">
              
              {/* 1. Delivery Details Accordion */}
              <div className="py-3.5">
                <button
                  type="button"
                  onClick={() => toggleAccordion('delivery')}
                  className="w-full flex items-center justify-between text-left font-bold text-sm text-plum-900 cursor-pointer"
                >
                  <span>Delivery Details</span>
                  <ChevronDown
                    className={`w-4 h-4 text-plum-900/60 transition-transform duration-200 ${
                      expandedSection.delivery ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {expandedSection.delivery && (
                  <div className="pt-3 space-y-3 text-xs text-plum-900/80 animate-fade-in">
                    <div className="flex items-start gap-2.5 p-3 bg-butter-50/70 rounded-xl border border-plum-900/10">
                      <Snowflake className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-plum-900">Refrigerated Fresh Delivery</p>
                        <p className="font-normal text-plum-900/70 mt-0.5">
                          Delivered cold in insulated, temperature-controlled packaging right to your doorstep.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5 p-3 bg-butter-50/70 rounded-xl border border-plum-900/10">
                      <Calendar className="w-4 h-4 text-coral-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-plum-900">Shelf Life &amp; Storage</p>
                        <p className="font-normal text-plum-900/70 mt-0.5">
                          Keep refrigerated (up to 30 days unopened) or frozen (up to 6 months). Serve within 48 hours once opened.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 2. Whole Food Ingredients Accordion */}
              {product.ingredients && (
                <div className="py-3.5">
                  <button
                    type="button"
                    onClick={() => toggleAccordion('ingredients')}
                    className="w-full flex items-center justify-between text-left font-bold text-sm text-plum-900 cursor-pointer"
                  >
                    <span>Whole Food Ingredients</span>
                    <ChevronDown
                      className={`w-4 h-4 text-plum-900/60 transition-transform duration-200 ${
                        expandedSection.ingredients ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {expandedSection.ingredients && (
                    <div className="pt-3 space-y-4 text-xs text-plum-900/80 animate-fade-in">
                      {/* Visualized Ingredient Circle Avatars */}
                      <div className="flex flex-wrap items-start gap-3">
                        {visualIngredients.map((ing, idx) => (
                          <div key={idx} className="flex flex-col items-center text-center w-[64px]">
                            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-butter-50 border border-plum-900/15 p-0.5 shadow-2xs flex items-center justify-center">
                              <div className="relative w-full h-full rounded-full overflow-hidden">
                                <Image src={ing.image} alt={ing.name} fill sizes="48px" className="object-cover" />
                              </div>
                            </div>
                            <span className="font-bold text-[10px] text-plum-900 mt-1 leading-tight">
                              {ing.name}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="bg-[#faf6ed] rounded-xl p-3.5 border border-plum-900/10 space-y-2">
                        <p className="font-bold text-plum-900 text-xs">Full Ingredient Statement</p>
                        <p className="text-xs text-plum-900/80 font-normal leading-relaxed">{product.ingredients}</p>
                        <div className="pt-2 border-t border-plum-900/10 flex items-center gap-2 text-[11px] font-semibold text-teal-800">
                          <ShieldCheck className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                          <span>100% human-grade. Zero artificial preservatives, meat meals or fillers.</span>
                        </div>
                      </div>

                      {/* Recipe-Specific Key Benefits (fully rendered without truncation) */}
                      {product.keyBenefits && product.keyBenefits.length > 0 && (
                        <div className="bg-white rounded-xl p-3.5 border border-plum-900/10 space-y-2">
                          <p className="font-bold text-plum-900 text-xs">Recipe Key Benefits</p>
                          <ul className="space-y-1.5">
                            {product.keyBenefits.map((benefit, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-xs text-plum-900/85">
                                <Check className="w-3.5 h-3.5 text-teal-700 stroke-[3] shrink-0 mt-0.5" />
                                <span className="leading-snug">{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* 3. Feeding & Portion Guide Accordion */}
              {product.feedingGuide && (
                <div className="py-3.5">
                  <button
                    type="button"
                    onClick={() => toggleAccordion('feeding')}
                    className="w-full flex items-center justify-between text-left font-bold text-sm text-plum-900 cursor-pointer"
                  >
                    <span>Feeding Guide</span>
                    <ChevronDown
                      className={`w-4 h-4 text-plum-900/60 transition-transform duration-200 ${
                        expandedSection.feeding ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {expandedSection.feeding && (
                    <div className="pt-3 space-y-3 text-xs animate-fade-in">
                      <div className="overflow-hidden rounded-xl border border-plum-900/10">
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="bg-plum-900/[0.04]">
                              <th className="text-left px-3 py-2 font-bold text-plum-900">
                                {product.foodType === 'BROTH' ? 'Dog Weight' : 'Dog Weight'}
                              </th>
                              <th className="text-right px-3 py-2 font-bold text-plum-900">Daily Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {product.feedingGuide.map((row, i) => (
                              <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-plum-900/[0.015]'}>
                                <td className="px-3 py-2 text-plum-900/70 font-medium">{row.weight}</td>
                                <td className="px-3 py-2 text-plum-900 font-bold text-right">{row.daily}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      {product.suitableFor && (
                        <p className="text-xs text-plum-900/70 font-normal">
                          <strong className="font-bold text-plum-900">Suitable for:</strong> {product.suitableFor}
                        </p>
                      )}
                      {product.dietChangeGuide && (
                        <p className="text-xs text-amber-900 bg-amber-50/60 p-2.5 rounded-lg border border-amber-200/50 font-normal">
                          <strong className="font-bold text-amber-950">Feeding tip:</strong> {product.dietChangeGuide}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* 4. Nutritional Analysis Accordion */}
              {product.nutritionalInfo && (
                <div className="py-3.5">
                  <button
                    type="button"
                    onClick={() => toggleAccordion('nutrition')}
                    className="w-full flex items-center justify-between text-left font-bold text-sm text-plum-900 cursor-pointer"
                  >
                    <span>Nutritional Information</span>
                    <ChevronDown
                      className={`w-4 h-4 text-plum-900/60 transition-transform duration-200 ${
                        expandedSection.nutrition ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {expandedSection.nutrition && (
                    <div className="pt-3 animate-fade-in">
                      <div className="overflow-hidden rounded-xl border border-plum-900/10">
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="bg-plum-900/[0.04]">
                              <th className="text-left px-3 py-2 font-bold text-plum-900">Nutrient</th>
                              <th className="text-right px-3 py-2 font-bold text-plum-900">Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Object.entries(product.nutritionalInfo).map(([key, val], i) => (
                              <tr key={key} className={i % 2 === 0 ? 'bg-white' : 'bg-plum-900/[0.015]'}>
                                <td className="px-3 py-2 text-plum-900/70 capitalize font-medium">
                                  {key.replace(/([A-Z])/g, ' $1').trim()}
                                </td>
                                <td className="px-3 py-2 text-plum-900 font-bold text-right">{val}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ─── Real Customer Reviews Section ─── */}
            <ProductReviews
              productId={product.id}
              productSlug={product.slug}
              productName={product.name}
              reviews={reviews}
              onAddReview={handleAddReview}
            />

          </div>
        </div>
      </div>

      {/* ─── MOBILE STICKY BOTTOM BAR (Product-Specific) ───────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white/95 backdrop-blur-md border-t border-plum-900/10 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] px-4 py-2.5 pb-[max(0.6rem,env(safe-area-inset-bottom))]">
        <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
          {/* Left: Product & variant name, price, MRP strikethrough, discount pill */}
          <div className="min-w-0 flex-1">
            <div className="text-xs text-plum-900/80 font-medium truncate underline underline-offset-2">
              {selectedVariant.name || product.name}
            </div>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-base font-normal text-plum-900">
                {formatPrice(totalSellingPrice)}
              </span>
              {hasDiscount && (
                <span className="text-xs text-plum-900/40 line-through font-normal">
                  {formatPrice(totalMrp)}
                </span>
              )}
              {hasDiscount && (
                <span className="text-[10px] font-bold text-white bg-teal-700 px-1.5 py-0.2 rounded-sm uppercase">
                  {discountPercent}% off
                </span>
              )}
            </div>
          </div>

          {/* Right: Solid ADD TO CART Button (Matching Cart Buttons) */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={addingToCart}
            className="px-6 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 active:scale-95 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-teal-700/20 shrink-0 cursor-pointer"
          >
            {added ? 'ADDED ✓' : 'ADD TO CART'}
          </button>
        </div>
      </div>
    </div>
  );
}

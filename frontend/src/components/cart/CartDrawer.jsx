'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShoppingBag,
  X,
  Plus,
  Minus,
  Trash2,
  Lock,
  ArrowRight,
  Truck,
  ShieldCheck,
  RotateCcw,
  Tag,
  Check,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import useCartStore from '@/store/cartStore';
import { formatPrice } from '@/lib/constants';

// Curated upsell recommendations for "You May Also Like"
const UPSELL_PRODUCTS = [
  {
    id: 'upsell-bone-broth',
    name: 'Slow-Cooked Bone Broth',
    variantName: '250ml Pouch',
    slug: 'golden-chicken-broth',
    price: 199,
    mrp: 249,
    isVeg: false,
    imageUrl: '/images/products/golden-chicken-broth-front.jpg',
    fallbackImg: '/images/products/golden-chicken-broth-front.jpg',
    badge: 'Best Booster',
  },
  {
    id: 'upsell-chicken-harvest',
    name: 'Chicken & Vegetables',
    variantName: '100g Fresh Pouch',
    slug: 'chicken-vegetables',
    price: 199,
    mrp: 219,
    isVeg: false,
    imageUrl: '/images/products/chicken-harvest-front.jpg',
    fallbackImg: '/images/products/chicken-harvest-front.jpg',
    badge: 'Best Seller',
  },
  {
    id: 'upsell-paneer-greens',
    name: 'Paneer & Vegetables',
    variantName: '100g Fresh Pouch',
    slug: 'paneer-vegetables',
    price: 189,
    mrp: 209,
    isVeg: true,
    imageUrl: '/images/products/paneer-greens-front.jpg',
    fallbackImg: '/images/products/paneer-greens-front.jpg',
    badge: 'Pure Veg',
  },
  {
    id: 'upsell-lamb-lentils',
    name: 'Lamb & Lentils Harvest',
    variantName: '100g Fresh Pouch',
    slug: 'lamb-lentils',
    price: 229,
    mrp: 249,
    isVeg: false,
    imageUrl: '/images/products/lamb-lentil-harvest-front.jpg',
    fallbackImg: '/images/products/lamb-lentil-harvest-front.jpg',
    badge: 'High Iron',
  },
];

export default function CartDrawer() {
  const router = useRouter();
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    updateQuantity,
    removeItem,
    addItem,
    coupon,
    setCoupon,
    removeCoupon,
    getSubtotal,
    getDiscount,
    getShipping,
    getTotal,
    getTotalSavings,
    getItemCount,
    orderNote,
    setOrderNote,
  } = useCartStore();

  const [couponCode, setCouponCode] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [noteOpen, setNoteOpen] = useState(false);
  const [couponAccordionOpen, setCouponAccordionOpen] = useState(false);
  const drawerRef = useRef(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isDrawerOpen) {
        closeDrawer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDrawerOpen, closeDrawer]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen]);

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const shipping = getShipping();
  const total = getTotal();
  const savings = getTotalSavings();
  const itemCount = getItemCount();

  // Free Shipping Calculation (Threshold: 499, Next Tier: 999 for 10% off)
  const FREE_SHIPPING_LIMIT = 499;
  const REWARD_LIMIT = 999;
  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_LIMIT) * 100));
  const rewardProgress = Math.min(100, Math.round((subtotal / REWARD_LIMIT) * 100));

  const applyCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponLoading(true);
    setCouponError('');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/apply-coupon`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponCode.trim().toUpperCase() }),
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Invalid coupon code');
      setCoupon(data.coupon);
      setCouponCode('');
      setCouponAccordionOpen(false);
    } catch (err) {
      setCouponError(err.message);
    } finally {
      setCouponLoading(false);
    }
  };

  const handleCheckoutClick = () => {
    closeDrawer();
    router.push('/checkout');
  };

  const handleAddUpsell = (upsell) => {
    addItem(
      {
        id: upsell.id,
        name: upsell.name,
        slug: upsell.slug,
        isVeg: upsell.isVeg,
        images: [{ url: upsell.imageUrl || upsell.fallbackImg }],
      },
      {
        id: `var-${upsell.id}`,
        name: upsell.variantName,
        sellingPrice: upsell.price,
        mrp: upsell.mrp,
      },
      1,
      false
    );
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] transition-visibility duration-300 ${
        isDrawerOpen ? 'visible' : 'invisible pointer-events-none'
      }`}
      aria-modal="true"
      role="dialog"
    >
      {/* Semi-transparent Backdrop */}
      <div
        onClick={closeDrawer}
        className={`fixed inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity duration-300 ${
          isDrawerOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Right Drawer Panel */}
      <div
        ref={drawerRef}
        className={`fixed inset-y-0 right-0 w-full sm:max-w-[480px] bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-out ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* ─── Drawer Header ─── */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-plum-900/10 bg-white z-10 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-200/60 shadow-xs">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <h2 className="font-extrabold text-plum-900 text-lg tracking-tight">
              Your Cart{' '}
              <span className="text-teal-700 font-bold text-sm bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200/50">
                {itemCount} {itemCount === 1 ? 'item' : 'items'}
              </span>
            </h2>
          </div>

          <button
            onClick={closeDrawer}
            className="w-9 h-9 rounded-full bg-plum-900/5 hover:bg-plum-900/10 text-plum-900/70 hover:text-plum-900 flex items-center justify-center transition-all cursor-pointer"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5 stroke-[2.2]" />
          </button>
        </div>

        {/* ─── Free Delivery / Rewards Milestone Bar ─── */}
        <div className="bg-cream-100/90 border-b border-plum-900/10 px-5 py-3 shrink-0">
          <div className="flex items-center justify-between text-xs mb-1.5 font-bold">
            {subtotal >= FREE_SHIPPING_LIMIT ? (
              <span className="text-emerald-700 flex items-center gap-1">
                🎉 <span>YAY! You&apos;ve unlocked <strong>FREE DELIVERY</strong>.</span>
              </span>
            ) : (
              <span className="text-plum-900/80">
                Add <strong className="text-teal-800">{formatPrice(FREE_SHIPPING_LIMIT - subtotal)}</strong> more for{' '}
                <strong className="text-emerald-700">FREE DELIVERY</strong>
              </span>
            )}
            <span className="text-plum-900/50 font-semibold">
              {subtotal >= FREE_SHIPPING_LIMIT ? '100%' : `${freeShippingProgress}%`}
            </span>
          </div>

          {/* Progress track */}
          <div className="w-full bg-white rounded-full h-2.5 overflow-hidden p-0.5 border border-plum-900/10 shadow-inner relative">
            <div
              className="h-full rounded-full bg-gradient-to-r from-teal-600 via-teal-700 to-teal-800 transition-all duration-500 ease-out"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>

          {subtotal >= FREE_SHIPPING_LIMIT && subtotal < REWARD_LIMIT && (
            <p className="text-[11px] text-teal-800 font-semibold mt-1">
              ⭐ Spend {formatPrice(REWARD_LIMIT - subtotal)} more to unlock <strong>10% OFF</strong>!
            </p>
          )}
        </div>

        {/* ─── Scrollable Items & Upsells Section ─── */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5 divide-y divide-plum-900/10">
          {items.length === 0 ? (
            /* Empty Cart View */
            <div className="text-center py-16 space-y-4">
              <div className="w-20 h-20 mx-auto rounded-full bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-200/60 shadow-sm">
                <ShoppingBag className="w-9 h-9 stroke-[1.8]" />
              </div>
              <h3 className="text-xl font-bold text-plum-900">Your bowl is empty</h3>
              <p className="text-xs text-plum-900/60 max-w-[240px] mx-auto leading-relaxed">
                Give your furry companion the nutrition they crave with freshly prepped meals.
              </p>
              <Link
                href="/shop"
                onClick={closeDrawer}
                className="inline-flex items-center gap-2 bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm px-6 py-3 rounded transition-all shadow-md shadow-teal-700/20 active:scale-95 cursor-pointer"
              >
                <span>Explore Meals</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <>
              {/* Cart Items List */}
              <div className="space-y-4 pt-1">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3.5 bg-white p-3.5 rounded-lg border border-plum-900/10 hover:border-plum-900/20 transition-all shadow-xs group"
                  >
                    {/* Item Thumbnail */}
                    <div className="w-20 h-20 rounded-md bg-cream-50 overflow-hidden relative border border-plum-900/10 shrink-0 p-1 flex items-center justify-center">
                      {item.imageUrl ? (
                        <Image
                          src={item.imageUrl}
                          alt={item.productName}
                          fill
                          className="object-contain p-1.5"
                          sizes="80px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-plum-900/20">
                          <ShoppingBag className="w-6 h-6" />
                        </div>
                      )}
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            href={`/shop/${item.slug}`}
                            onClick={closeDrawer}
                            className="font-bold text-plum-900 text-sm hover:text-teal-700 transition-colors line-clamp-1 leading-snug"
                          >
                            {item.productName}
                          </Link>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-plum-900/30 hover:text-red-500 transition-colors p-0.5 cursor-pointer"
                            aria-label={`Remove ${item.productName}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-[11px] text-plum-900/60 mt-0.5">{item.variantName}</p>
                        {item.isSubscription && (
                          <span className="text-[10px] text-teal-800 font-bold bg-teal-50 px-2 py-0.5 rounded-full mt-1 inline-block border border-teal-200/60">
                            Subscribe &amp; Save 10%
                          </span>
                        )}
                      </div>

                      {/* Quantity Stepper and Price */}
                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-plum-900/5">
                        <div className="flex items-center border border-plum-900/15 rounded overflow-hidden bg-cream-50/70">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center text-plum-900/70 hover:bg-plum-900/10 transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3 stroke-[2.5]" />
                          </button>
                          <span className="w-7 text-center text-xs font-bold text-plum-900">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center text-plum-900/70 hover:bg-plum-900/10 transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3 stroke-[2.5]" />
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="font-normal text-plum-900 text-sm block">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                          {item.mrp && Number(item.mrp) > item.price && (
                            <span className="text-[10px] text-plum-900/40 line-through">
                              {formatPrice(Number(item.mrp) * item.quantity)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* ─── "You May Also Like" Upsell Section ─── */}
              <div className="pt-5">
                <div className="flex items-center gap-1.5 mb-3">
                  <h3 className="font-extrabold text-plum-900 text-xs uppercase tracking-wider">
                    You May Also Like
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                  {UPSELL_PRODUCTS.map((upsell) => (
                    <div
                      key={upsell.id}
                      className="bg-cream-50/80 rounded-lg p-2 sm:p-2.5 border border-plum-900/10 flex flex-col justify-between hover:border-teal-600/30 transition-all shadow-2xs"
                    >
                      <div>
                        <div className="w-full h-20 sm:h-24 rounded-md bg-white overflow-hidden relative mb-1.5 p-1 border border-plum-900/5 flex items-center justify-center">
                          <Image
                            src={upsell.imageUrl || upsell.fallbackImg}
                            alt={upsell.name}
                            fill
                            className="object-contain p-1"
                            sizes="140px"
                          />
                          {upsell.badge && (
                            <span className="absolute top-1 left-1 bg-coral-500 text-white text-[7.5px] sm:text-[8px] font-bold px-1.5 py-0.5 rounded-xs leading-none z-10 shadow-xs">
                              {upsell.badge}
                            </span>
                          )}
                        </div>
                        <p className="font-bold text-plum-900 text-xs line-clamp-1 leading-snug">{upsell.name}</p>
                        <p className="text-[10px] text-plum-900/50 mt-0.5">{upsell.variantName}</p>
                      </div>

                      <div className="mt-1.5 pt-1.5 border-t border-plum-900/5 flex flex-col gap-1.5">
                        <div>
                          <span className="font-normal text-plum-900 text-xs leading-none">
                            {formatPrice(upsell.price)}
                          </span>
                          <span className="text-[9px] text-plum-900/40 line-through ml-1">
                            {formatPrice(upsell.mrp)}
                          </span>
                        </div>
                        <button
                          onClick={() => handleAddUpsell(upsell)}
                          className="w-full bg-teal-700 hover:bg-teal-800 text-white text-[11px] font-bold px-2 py-1.5 rounded transition-all shadow-xs cursor-pointer active:scale-95 flex items-center justify-center gap-0.5"
                          aria-label={`Add ${upsell.name} to cart`}
                        >
                          <Plus className="w-3 h-3 stroke-[2.5]" />
                          <span>Add</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ─── Offers & Coupons ─── */}
              <div className="pt-4">
                {coupon ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-lg px-3.5 py-2.5">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-emerald-700" />
                      <div>
                        <p className="text-xs font-bold text-emerald-900">{coupon.code} Applied</p>
                        <p className="text-[11px] text-emerald-700 font-medium">
                          {coupon.type === 'PERCENTAGE' ? `${coupon.value}% discount applied` : `₹${coupon.value} discount applied`}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs font-bold text-red-600 hover:text-red-800 cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      type="button"
                      onClick={() => setCouponAccordionOpen((prev) => !prev)}
                      className="flex items-center justify-between w-full text-left py-1 text-xs font-bold text-plum-900 hover:text-teal-700 transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5 text-teal-700" />
                        <span>Have a coupon or promo code?</span>
                      </span>
                      {couponAccordionOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    {couponAccordionOpen && (
                      <div className="mt-2.5">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                            onKeyDown={(e) => e.key === 'Enter' && applyCoupon()}
                            placeholder="Enter code (e.g. WELCOME10)"
                            className="flex-1 bg-white border border-plum-900/15 rounded-md px-3.5 py-2 text-xs text-plum-900 font-medium uppercase placeholder-plum-900/40 focus:outline-none focus:border-teal-700 focus:ring-1 focus:ring-teal-700/30"
                          />
                          <button
                            onClick={applyCoupon}
                            disabled={couponLoading || !couponCode.trim()}
                            className="bg-teal-700 hover:bg-teal-800 disabled:opacity-50 text-white text-xs font-bold px-4 py-2 rounded transition-all shadow-xs cursor-pointer"
                          >
                            {couponLoading ? '…' : 'Apply'}
                          </button>
                        </div>
                        {couponError && <p className="text-[11px] text-red-600 font-medium mt-1">{couponError}</p>}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* ─── Order Note ─── */}
              <div className="pt-3">
                <button
                  type="button"
                  onClick={() => setNoteOpen((prev) => !prev)}
                  className="flex items-center justify-between w-full text-left py-1 text-xs font-semibold text-plum-900/70 hover:text-plum-900 transition-colors cursor-pointer"
                >
                  <span>{orderNote ? 'Edit delivery instructions' : '+ Add order note / delivery instructions'}</span>
                  {noteOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {noteOpen && (
                  <div className="mt-2">
                    <textarea
                      rows={2}
                      value={orderNote}
                      onChange={(e) => setOrderNote(e.target.value)}
                      placeholder="e.g. Please ring the doorbell, dog name is Bruno..."
                      className="w-full bg-white border border-plum-900/15 rounded-md p-2.5 text-xs text-plum-900 placeholder-plum-900/30 focus:outline-none focus:border-teal-700 focus:ring-1 focus:ring-teal-700/20"
                    />
                  </div>
                )}
              </div>

              {/* ─── Trust Badges Row ─── */}
              <div className="pt-4 grid grid-cols-3 gap-2 text-center text-[10px] text-plum-900/60 font-medium">
                <div className="flex flex-col items-center gap-1 bg-cream-50/80 p-2 rounded-lg border border-plum-900/5">
                  <Truck className="w-4 h-4 text-teal-700" />
                  <span>Cash on Delivery</span>
                </div>
                <div className="flex flex-col items-center gap-1 bg-cream-50/80 p-2 rounded-lg border border-plum-900/5">
                  <ShieldCheck className="w-4 h-4 text-teal-700" />
                  <span>100% Secure</span>
                </div>
                <div className="flex flex-col items-center gap-1 bg-cream-50/80 p-2 rounded-lg border border-plum-900/5">
                  <RotateCcw className="w-4 h-4 text-teal-700" />
                  <span>Fresh Guarantee</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* ─── Sticky Bottom Checkout Bar ─── */}
        {items.length > 0 && (
          <div className="border-t border-plum-900/10 bg-white p-4 space-y-2.5 z-10 shrink-0 shadow-lg">
            {/* Savings Pill */}
            {savings > 0 && (
              <div className="bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-md flex items-center justify-between border border-emerald-200/60">
                <span className="flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-emerald-600" />
                  <span>You&apos;re saving</span>
                </span>
                <span className="text-emerald-700 font-extrabold">{formatPrice(savings)}</span>
              </div>
            )}

            {/* Price breakdown */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-plum-900/70 font-medium">
                <span>Subtotal</span>
                <span className="text-plum-900 font-bold">{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Discount</span>
                  <span>−{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-plum-900/70 font-medium">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'text-emerald-700 font-bold' : 'text-plum-900 font-bold'}>
                  {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                </span>
              </div>
            </div>

            {/* Big Dark Teal Checkout CTA */}
            <button
              onClick={handleCheckoutClick}
              id="drawer-checkout-btn"
              className="w-full bg-teal-700 hover:bg-teal-800 active:scale-[0.99] text-white py-4 rounded font-extrabold text-base shadow-lg shadow-teal-700/25 transition-all flex items-center justify-between px-6 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span>CHECKOUT</span>
              </div>
              <div className="flex items-center gap-2 font-bold">
                <span>{formatPrice(total)}</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </div>
            </button>

            {/* Payment Icons Strip */}
            <div className="pt-1 flex items-center justify-center gap-3 text-[10px] text-plum-900/40 font-semibold select-none">
              <span className="px-1.5 py-0.5 bg-cream-100 rounded text-plum-900/60">UPI</span>
              <span className="px-1.5 py-0.5 bg-cream-100 rounded text-plum-900/60">GPay</span>
              <span className="px-1.5 py-0.5 bg-cream-100 rounded text-plum-900/60">PhonePe</span>
              <span className="px-1.5 py-0.5 bg-cream-100 rounded text-plum-900/60">Cards</span>
              <span className="px-1.5 py-0.5 bg-cream-100 rounded text-plum-900/60">NetBanking</span>
              <span className="px-1.5 py-0.5 bg-cream-100 rounded text-plum-900/60">COD</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

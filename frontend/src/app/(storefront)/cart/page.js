'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Lock, Truck, RotateCcw, ArrowLeft, ArrowRight } from 'lucide-react';
import useCartStore from '@/store/cartStore';
import { formatPrice } from '@/lib/constants';

function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex gap-4 py-5 border-b border-plum-900/10 last:border-0">
      {/* Image */}
      <div className="flex-shrink-0 w-20 h-20 rounded-md bg-white overflow-hidden relative border border-plum-900/10 p-1">
        {item.imageUrl ? (
          <Image src={item.imageUrl} alt={item.productName} fill className="object-contain p-2" sizes="80px" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-plum-900/20">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" /></svg>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link href={`/shop/${item.slug}`} className="font-bold text-plum-900 text-sm hover:text-teal-700 transition-colors leading-snug">
              {item.productName}
            </Link>
            <p className="text-xs text-plum-900/60 mt-0.5">{item.variantName}</p>
            {item.isSubscription && (
              <span className="text-xs text-teal-800 font-semibold bg-teal-50 px-2.5 py-0.5 rounded-full mt-1.5 inline-block border border-teal-200/60">
                Subscribe &amp; Save 10%
              </span>
            )}
          </div>
          <button
            onClick={() => removeItem(item.id)}
            className="text-plum-900/40 hover:text-red-500 transition-colors flex-shrink-0 mt-0.5 p-1 rounded hover:bg-red-50 cursor-pointer"
            aria-label={`Remove ${item.productName}`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Quantity + Price */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center border border-plum-900/15 rounded overflow-hidden bg-cream-50">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="w-8 h-8 flex items-center justify-center text-plum-900 hover:bg-plum-900/10 transition-colors cursor-pointer"
              aria-label="Decrease quantity"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" /></svg>
            </button>
            <span className="w-8 text-center text-sm font-bold text-plum-900">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-8 h-8 flex items-center justify-center text-plum-900 hover:bg-plum-900/10 transition-colors cursor-pointer"
              aria-label="Increase quantity"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" /></svg>
            </button>
          </div>
          <span className="font-extrabold text-plum-900 text-base">{formatPrice(item.price * item.quantity)}</span>
        </div>
      </div>
    </div>
  );
}

function CouponInput() {
  const { coupon, setCoupon, removeCoupon } = useCartStore();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const apply = async () => {
    if (!code.trim()) return;
    setLoading(true); setError('');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/apply-coupon`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code.trim().toUpperCase() }),
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Invalid coupon');
      setCoupon(data.coupon);
      setCode('');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  if (coupon) {
    return (
      <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3">
        <div>
          <p className="text-sm font-bold text-emerald-800">{coupon.code} applied</p>
          <p className="text-xs text-emerald-600 font-medium">
            {coupon.type === 'PERCENTAGE' ? `${coupon.value}% off` : `₹${coupon.value} off`}
          </p>
        </div>
        <button onClick={removeCoupon} className="text-xs text-red-600 hover:text-red-800 font-bold cursor-pointer">Remove</button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          onKeyDown={(e) => e.key === 'Enter' && apply()}
          placeholder="Enter coupon code"
          className="flex-1 border border-plum-900/15 rounded-md px-3.5 py-2.5 text-sm text-plum-900 focus:outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20 transition-all bg-white"
          aria-label="Coupon code"
        />
        <button
          onClick={apply}
          disabled={loading || !code.trim()}
          className="px-5 py-2.5 bg-teal-800 text-white text-sm font-bold rounded hover:bg-teal-900 active:scale-95 disabled:opacity-50 transition-all cursor-pointer shadow-sm"
        >
          {loading ? '…' : 'Apply'}
        </button>
      </div>
      {error && <p className="text-xs text-red-600 font-medium mt-1.5">{error}</p>}
    </div>
  );
}

export default function CartPage() {
  const [hydrated, setHydrated] = useState(false);
  const { items, getSubtotal, getDiscount, getShipping, getTotal, getItemCount } = useCartStore();

  useEffect(() => {
    useCartStore.persist.rehydrate();
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return (
      <div className="section-padding">
        <div className="container-main max-w-5xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-plum-900/10 rounded w-32" />
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-plum-900/10 rounded-lg h-64" />
              <div className="bg-plum-900/10 rounded-lg h-48" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="section-padding">
        <div className="container-main max-w-5xl mx-auto text-center py-20">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-200/50 shadow-sm">
            <ShoppingCart className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold text-plum-900 mb-3">Your cart is empty</h1>
          <p className="text-plum-900/60 mb-8 max-w-sm mx-auto">Looks like you haven't added anything to your cart yet.</p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-teal-700 hover:bg-teal-800 active:scale-95 text-white px-8 py-3.5 rounded font-bold text-sm shadow-md shadow-teal-700/20 transition-all cursor-pointer"
          >
            <span>Explore Shop</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const shipping = getShipping();
  const total = getTotal();
  const itemCount = getItemCount();

  return (
    <div className="section-padding bg-cream-50/50 min-h-[70vh]">
      <div className="container-main max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-plum-900 mb-8">
          Shopping Cart <span className="text-plum-900/50 text-xl font-normal">({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-lg border border-plum-900/10 px-6 py-2 shadow-xs">
              {items.map((item) => <CartItem key={item.id} item={item} />)}
            </div>

            {/* Coupon */}
            <div className="bg-white rounded-lg border border-plum-900/10 p-6 shadow-xs">
              <p className="text-sm font-bold text-plum-900 mb-3">Have a coupon or discount code?</p>
              <CouponInput />
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg border border-plum-900/10 p-6 sticky top-28 shadow-xs">
              <h2 className="font-bold text-plum-900 text-lg mb-5">Order Summary</h2>

              <div className="space-y-3.5 text-sm">
                <div className="flex justify-between text-plum-900/70 font-medium">
                  <span>Subtotal</span>
                  <span className="text-plum-900 font-bold">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount</span>
                    <span>−{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-plum-900/70 font-medium">
                  <span>Estimated Shipping</span>
                  <span className={shipping === 0 ? 'text-emerald-600 font-bold' : 'text-plum-900 font-bold'}>
                    {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                  </span>
                </div>

                {shipping > 0 && (
                  <div className="text-xs text-plum-900/70 bg-cream-100 rounded-md px-3.5 py-2.5 font-medium border border-plum-900/5">
                    Add <span className="font-bold text-teal-800">{formatPrice(499 - subtotal)}</span> more to qualify for <span className="font-bold text-emerald-600">Free Shipping</span>
                  </div>
                )}

                <div className="border-t border-plum-900/10 pt-4 flex justify-between text-lg font-extrabold text-plum-900">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                href="/checkout"
                id="cart-checkout-btn"
                className="w-full mt-4 flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-800 active:scale-[0.98] text-white py-4 rounded font-bold text-base shadow-md shadow-teal-700/20 transition-all cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                href="/shop"
                className="w-full mt-3 flex items-center justify-center gap-1.5 text-sm font-semibold text-plum-900/60 hover:text-teal-700 transition-colors py-2"
              >
                <ArrowLeft className="w-4 h-4 shrink-0" />
                <span>Continue Shopping</span>
              </Link>

              {/* Trust Features */}
              <div className="mt-5 pt-5 border-t border-plum-900/10 grid grid-cols-3 gap-2 text-center text-xs text-plum-900/60 font-medium">
                <div>
                  <Lock className="w-4 h-4 text-teal-700 mx-auto mb-1.5" />
                  <span>Secure<br />Payment</span>
                </div>
                <div>
                  <Truck className="w-4 h-4 text-teal-700 mx-auto mb-1.5" />
                  <span>Free<br />Above ₹499</span>
                </div>
                <div>
                  <RotateCcw className="w-4 h-4 text-teal-700 mx-auto mb-1.5" />
                  <span>Freshness<br />Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

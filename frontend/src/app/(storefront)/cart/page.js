'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useCartStore from '@/store/cartStore';
import { formatPrice } from '@/lib/constants';

function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex gap-4 py-5 border-b border-gray-100 last:border-0">
      {/* Image */}
      <div className="flex-shrink-0 w-20 h-20 rounded-lg bg-gray-50 overflow-hidden relative border border-gray-100">
        {item.imageUrl ? (
          <Image src={item.imageUrl} alt={item.productName} fill className="object-contain p-2" sizes="80px" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" /></svg>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className={item.isVeg ? 'veg-indicator' : 'nonveg-indicator'} style={{ width: 12, height: 12 }} />
              <span className="text-xs text-gray-400">{item.isVeg ? 'Veg' : 'Non-veg'}</span>
            </div>
            <Link href={`/shop/${item.slug}`} className="font-medium text-gray-900 text-sm hover:text-turquoise-600 transition-colors leading-snug">
              {item.productName}
            </Link>
            <p className="text-xs text-gray-500 mt-0.5">{item.variantName}</p>
            {item.isSubscription && (
              <span className="text-xs text-turquoise-600 font-medium bg-turquoise-50 px-2 py-0.5 rounded-full mt-1 inline-block">
                Subscribe &amp; Save 10%
              </span>
            )}
          </div>
          <button
            onClick={() => removeItem(item.id)}
            className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0 mt-0.5"
            aria-label={`Remove ${item.productName}`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Quantity + Price */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
              aria-label="Decrease quantity"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" /></svg>
            </button>
            <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
              aria-label="Increase quantity"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" /></svg>
            </button>
          </div>
          <span className="font-bold text-gray-900">{formatPrice(item.price * item.quantity)}</span>
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
      <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-green-700">{coupon.code} applied</p>
          <p className="text-xs text-green-600">
            {coupon.type === 'PERCENTAGE' ? `${coupon.value}% off` : `₹${coupon.value} off`}
          </p>
        </div>
        <button onClick={removeCoupon} className="text-xs text-red-500 hover:text-red-700 font-medium">Remove</button>
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
          className="flex-1 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-turquoise-500 focus:border-turquoise-500"
          aria-label="Coupon code"
        />
        <button
          onClick={apply}
          disabled={loading || !code.trim()}
          className="px-4 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-700 disabled:opacity-50 transition-colors"
        >
          {loading ? '…' : 'Apply'}
        </button>
      </div>
      {error && <p className="text-xs text-red-500 mt-1.5">{error}</p>}
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
            <div className="h-8 bg-gray-100 rounded w-32" />
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-gray-100 rounded-xl h-64" />
              <div className="bg-gray-100 rounded-xl h-48" />
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
          <div className="text-6xl mb-6">🛒</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Your cart is empty</h1>
          <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
          <Link href="/shop" className="inline-flex items-center gap-2 bg-turquoise-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-turquoise-700 transition-colors">
            Shop Now
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
    <div className="section-padding bg-gray-50/50">
      <div className="container-main max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Cart <span className="text-gray-400 text-xl font-normal">({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 px-6">
              {items.map((item) => <CartItem key={item.id} item={item} />)}
            </div>

            {/* Coupon */}
            <div className="mt-4 bg-white rounded-2xl border border-gray-100 p-6">
              <p className="text-sm font-semibold text-gray-900 mb-3">Have a coupon?</p>
              <CouponInput />
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-28">
              <h2 className="font-bold text-gray-900 mb-5">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>−{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
                    {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                  </span>
                </div>

                {shipping > 0 && (
                  <div className="text-xs text-gray-400 bg-gray-50 rounded-lg px-3 py-2">
                    Add {formatPrice(499 - subtotal)} more for free shipping
                  </div>
                )}

                <div className="border-t border-gray-100 pt-3 flex justify-between text-base font-bold text-gray-900">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full mt-6 flex items-center justify-center gap-2 bg-turquoise-600 text-white py-3.5 rounded-xl font-semibold hover:bg-turquoise-700 transition-colors"
              >
                Proceed to Checkout
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>

              <Link href="/shop" className="w-full mt-3 flex items-center justify-center text-sm text-gray-500 hover:text-turquoise-600 transition-colors py-2">
                ← Continue Shopping
              </Link>

              {/* Trust */}
              <div className="mt-5 pt-5 border-t border-gray-100 grid grid-cols-3 gap-2 text-center text-xs text-gray-400">
                <div>🔒<br />Secure<br />Payment</div>
                <div>🚚<br />Free<br />Above ₹499</div>
                <div>↩️<br />7-Day<br />Returns</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

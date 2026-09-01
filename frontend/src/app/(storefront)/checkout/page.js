'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useCartStore from '@/store/cartStore';
import useAuthStore from '@/store/authStore';
import { formatPrice } from '@/lib/constants';

function AddressForm({ onSubmit, initial }) {
  const [form, setForm] = useState(initial || {
    fullName: '', phone: '', addressLine1: '', addressLine2: '',
    city: '', state: '', pincode: '', label: 'Home',
  });

  const INDIAN_STATES = [
    'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa',
    'Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala',
    'Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland',
    'Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura',
    'Uttar Pradesh','Uttarakhand','West Bengal','Delhi','Jammu and Kashmir','Ladakh',
    'Chandigarh','Dadra and Nagar Haveli and Daman and Diu','Lakshadweep','Puducherry',
  ];

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); }} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Full Name *</label>
          <input required value={form.fullName} onChange={(e) => set('fullName', e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-turquoise-500 focus:border-turquoise-500" placeholder="Priya Sharma" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Phone *</label>
          <input required value={form.phone} onChange={(e) => set('phone', e.target.value.replace(/\D/g,'').slice(0,10))}
            inputMode="numeric" maxLength={10}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-turquoise-500 focus:border-turquoise-500" placeholder="9876543210" />
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Address Line 1 *</label>
        <input required value={form.addressLine1} onChange={(e) => set('addressLine1', e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-turquoise-500 focus:border-turquoise-500" placeholder="House/Flat No., Street" />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Address Line 2</label>
        <input value={form.addressLine2} onChange={(e) => set('addressLine2', e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-turquoise-500 focus:border-turquoise-500" placeholder="Landmark, Area (optional)" />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">City *</label>
          <input required value={form.city} onChange={(e) => set('city', e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-turquoise-500 focus:border-turquoise-500" placeholder="Mumbai" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">State *</label>
          <select required value={form.state} onChange={(e) => set('state', e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-turquoise-500 focus:border-turquoise-500 bg-white">
            <option value="">Select</option>
            {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Pincode *</label>
          <input required value={form.pincode} onChange={(e) => set('pincode', e.target.value.replace(/\D/g,'').slice(0,6))}
            inputMode="numeric" maxLength={6}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-turquoise-500 focus:border-turquoise-500" placeholder="400001" />
        </div>
      </div>

      <button type="submit" id="save-address-btn"
        className="w-full bg-turquoise-600 text-white py-3 rounded-xl font-semibold text-sm hover:bg-turquoise-700 transition-colors mt-2">
        Continue to Payment
      </button>
    </form>
  );
}

function PaymentSection({ address, onPlaceOrder }) {
  const [paymentMethod, setPaymentMethod] = useState('RAZORPAY');
  const [placing, setPlacing] = useState(false);
  const { items, getSubtotal, getDiscount, getShipping, getTotal, coupon, clearCart } = useCartStore();

  const handlePlaceOrder = async () => {
    setPlacing(true);
    try {
      if (paymentMethod === 'RAZORPAY') {
        // 1. Create Razorpay order
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/create-razorpay-order`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            items: items.map((i) => ({ variantId: i.variantId, quantity: i.quantity, isSubscription: i.isSubscription })),
            address,
            couponCode: coupon?.code,
            paymentMethod: 'RAZORPAY',
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to create order');

        // 2. Open Razorpay checkout
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: data.amount,
          currency: 'INR',
          name: 'FurBowl',
          description: 'Fresh Dog Food Order',
          order_id: data.razorpayOrderId,
          prefill: { name: address.fullName, contact: address.phone },
          theme: { color: '#0d9488' },
          handler: async (response) => {
            // Verify payment
            const verifyRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/verify`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
              body: JSON.stringify({
                orderId: data.orderId,
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              }),
            });
            const verifyData = await verifyRes.json();
            if (verifyRes.ok) {
              clearCart();
              onPlaceOrder(data.orderNumber);
            }
          },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        // COD
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            items: items.map((i) => ({ variantId: i.variantId, quantity: i.quantity, isSubscription: i.isSubscription })),
            address,
            couponCode: coupon?.code,
            paymentMethod: 'COD',
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to place order');
        clearCart();
        onPlaceOrder(data.orderNumber);
      }
    } catch (e) {
      alert(e.message);
    } finally {
      setPlacing(false);
    }
  };

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const shipping = getShipping();
  const total = getTotal();

  return (
    <div className="space-y-6">
      {/* Payment options */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Payment Method</h3>
        <div className="space-y-3">
          {[
            { value: 'RAZORPAY', label: 'Pay Online', sub: 'UPI, Cards, Net Banking, Wallets' },
            { value: 'COD', label: 'Cash on Delivery', sub: 'Pay when your order arrives' },
          ].map((method) => (
            <button key={method.value} onClick={() => setPaymentMethod(method.value)}
              className={`w-full flex items-center gap-3 p-4 rounded-xl border text-left transition-colors ${paymentMethod === method.value ? 'border-turquoise-600 bg-turquoise-50' : 'border-gray-200 hover:border-gray-300'}`}>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${paymentMethod === method.value ? 'border-turquoise-600' : 'border-gray-300'}`}>
                {paymentMethod === method.value && <div className="w-2.5 h-2.5 rounded-full bg-turquoise-600" />}
              </div>
              <div>
                <p className="font-medium text-gray-900 text-sm">{method.label}</p>
                <p className="text-xs text-gray-500">{method.sub}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Order total recap */}
      <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
        <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
        {discount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>−{formatPrice(discount)}</span></div>}
        <div className="flex justify-between text-gray-600"><span>Shipping</span><span className={shipping === 0 ? 'text-green-600' : ''}>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span></div>
        <div className="flex justify-between font-bold text-gray-900 border-t border-gray-200 pt-2 text-base"><span>Total</span><span>{formatPrice(total)}</span></div>
      </div>

      <button onClick={handlePlaceOrder} disabled={placing} id="place-order-btn"
        className="w-full bg-turquoise-600 text-white py-4 rounded-xl font-bold text-base hover:bg-turquoise-700 disabled:opacity-50 transition-colors">
        {placing ? 'Processing…' : paymentMethod === 'COD' ? `Place Order (COD) · ${formatPrice(total)}` : `Pay ${formatPrice(total)}`}
      </button>

      {paymentMethod === 'RAZORPAY' && (
        <p className="text-xs text-gray-400 text-center">Powered by Razorpay · SSL Secured</p>
      )}
    </div>
  );
}

export default function CheckoutPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { items } = useCartStore();
  const [hydrated, setHydrated] = useState(false);
  const [step, setStep] = useState('address'); // 'address' | 'payment'
  const [address, setAddress] = useState(null);

  useEffect(() => {
    useCartStore.persist.rehydrate();
    useAuthStore.persist.rehydrate();
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (!isAuthenticated) router.push('/login?redirect=/checkout');
    if (items.length === 0) router.push('/cart');
  }, [hydrated, isAuthenticated, items.length, router]);

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  const handleAddressSubmit = (addr) => { setAddress(addr); setStep('payment'); };
  const handleOrderPlaced = (orderNumber) => router.push(`/order-confirmation/${orderNumber}`);

  if (!hydrated) return null;

  const STEPS = [
    { key: 'address', label: 'Delivery Address', num: 1 },
    { key: 'payment', label: 'Payment', num: 2 },
  ];

  return (
    <div className="section-padding bg-gray-50/50">
      <div className="container-main max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        {/* Step indicators */}
        <div className="flex items-center gap-3 mb-8">
          {STEPS.map((s, i) => (
            <div key={s.key} className="flex items-center gap-3">
              <div className={`flex items-center gap-2 ${step === s.key ? 'text-turquoise-700' : step === 'payment' && s.key === 'address' ? 'text-gray-400' : 'text-gray-400'}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step === s.key ? 'bg-turquoise-600 text-white' : step === 'payment' && s.key === 'address' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {step === 'payment' && s.key === 'address' ? '✓' : s.num}
                </div>
                <span className="text-sm font-medium hidden sm:inline">{s.label}</span>
              </div>
              {i < STEPS.length - 1 && <div className="flex-1 h-px bg-gray-200 w-8" />}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
          {step === 'address' && (
            <>
              <h2 className="font-semibold text-gray-900 mb-5">Delivery Address</h2>
              <AddressForm onSubmit={handleAddressSubmit} />
            </>
          )}
          {step === 'payment' && address && (
            <>
              {/* Show address summary */}
              <div className="flex items-start justify-between mb-6 bg-gray-50 rounded-xl p-4">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Delivering to</p>
                  <p className="text-sm font-medium text-gray-900">{address.fullName}</p>
                  <p className="text-xs text-gray-500">{address.addressLine1}, {address.city}, {address.state} – {address.pincode}</p>
                  <p className="text-xs text-gray-500">📱 {address.phone}</p>
                </div>
                <button onClick={() => setStep('address')} className="text-xs text-turquoise-600 font-medium hover:underline">Change</button>
              </div>
              <PaymentSection address={address} onPlaceOrder={handleOrderPlaced} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

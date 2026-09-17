'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Phone, ArrowRight, ShieldCheck, Lock } from 'lucide-react';
import useCartStore from '@/store/cartStore';
import useAuthStore from '@/store/authStore';
import { formatPrice } from '@/lib/constants';

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') return resolve(false);
    if (window.Razorpay) return resolve(true);

    const existing = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
    if (existing) {
      if (window.Razorpay) return resolve(true);
      existing.addEventListener('load', () => resolve(true));
      existing.addEventListener('error', () => resolve(false));
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

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
  const [addressError, setAddressError] = useState('');

  return (
    <form onSubmit={(e) => { e.preventDefault(); if (!/^\d{6}$/.test(form.pincode)) { setAddressError('Enter a valid 6-digit Indian pincode.'); return; } setAddressError(''); onSubmit(form); }} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-plum-900/70 uppercase tracking-wider mb-1.5">Full Name *</label>
          <input required value={form.fullName} onChange={(e) => set('fullName', e.target.value)}
            className="w-full border border-plum-900/15 rounded-xl px-3.5 py-2.5 text-sm text-plum-900 focus:outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20 transition-all bg-white" placeholder="Priya Sharma" />
        </div>
        <div>
          <label className="block text-xs font-bold text-plum-900/70 uppercase tracking-wider mb-1.5">Phone *</label>
          <input required value={form.phone} onChange={(e) => set('phone', e.target.value.replace(/\D/g,'').slice(0,10))}
            inputMode="numeric" maxLength={10}
            className="w-full border border-plum-900/15 rounded-xl px-3.5 py-2.5 text-sm text-plum-900 focus:outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20 transition-all bg-white" placeholder="8860503685" />
        </div>
      </div>
      <div>
        <label className="block text-xs font-bold text-plum-900/70 uppercase tracking-wider mb-1.5">Address Line 1 *</label>
        <input required value={form.addressLine1} onChange={(e) => set('addressLine1', e.target.value)}
          className="w-full border border-plum-900/15 rounded-xl px-3.5 py-2.5 text-sm text-plum-900 focus:outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20 transition-all bg-white" placeholder="House/Flat No., Building, Street" />
      </div>
      <div>
        <label className="block text-xs font-bold text-plum-900/70 uppercase tracking-wider mb-1.5">Address Line 2 (Optional)</label>
        <input value={form.addressLine2} onChange={(e) => set('addressLine2', e.target.value)}
          className="w-full border border-plum-900/15 rounded-xl px-3.5 py-2.5 text-sm text-plum-900 focus:outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20 transition-all bg-white" placeholder="Landmark, Area, Near..." />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-bold text-plum-900/70 uppercase tracking-wider mb-1.5">City *</label>
          <input required value={form.city} onChange={(e) => set('city', e.target.value)}
            className="w-full border border-plum-900/15 rounded-xl px-3.5 py-2.5 text-sm text-plum-900 focus:outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20 transition-all bg-white" placeholder="Mumbai" />
        </div>
        <div>
          <label className="block text-xs font-bold text-plum-900/70 uppercase tracking-wider mb-1.5">State *</label>
          <select required value={form.state} onChange={(e) => set('state', e.target.value)}
            className="w-full border border-plum-900/15 rounded-xl px-3.5 py-2.5 text-sm text-plum-900 focus:outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20 transition-all bg-white">
            <option value="">Select State</option>
            {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-plum-900/70 uppercase tracking-wider mb-1.5">Pincode *</label>
          <input required value={form.pincode} onChange={(e) => set('pincode', e.target.value.replace(/\D/g,'').slice(0,6))}
            inputMode="numeric" maxLength={6}
            className="w-full border border-plum-900/15 rounded-xl px-3.5 py-2.5 text-sm text-plum-900 focus:outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20 transition-all bg-white" placeholder="400001" />
        </div>
      </div>

      <button
        type="submit"
        id="save-address-btn"
        className="w-full bg-teal-700 hover:bg-teal-800 active:scale-[0.99] text-white py-3.5 rounded font-bold text-sm transition-all shadow-md shadow-teal-700/20 mt-3 cursor-pointer flex items-center justify-center gap-2"
      >
        <span>Continue to Payment</span>
        <ArrowRight className="w-4 h-4" />
      </button>
      <p className="text-xs text-plum-900/60 text-center">We will deliver your freshly prepped meal boxes straight to this location.</p>
      {addressError && <p role="alert" className="text-sm font-medium text-red-600 text-center">{addressError}</p>}
    </form>
  );
}

function PaymentSection({ address, onPlaceOrder }) {
  const [paymentMethod, setPaymentMethod] = useState('RAZORPAY');
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState('');
  const { items, getSubtotal, getDiscount, getShipping, getTotal, coupon, clearCart } = useCartStore();
  const { user, token } = useAuthStore();

  const handlePlaceOrder = async () => {
    setPlacing(true);
    setError('');
    let paymentModalOpen = false;

    try {
      if (paymentMethod === 'RAZORPAY') {
        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded || !window.Razorpay) {
          throw new Error('Secure payment gateway is loading. Please check your internet connection and try again.');
        }

        // 1. Create Razorpay order on backend
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/create-razorpay-order`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          credentials: 'include',
          body: JSON.stringify({
            items: items.map((i) => ({ variantId: i.variantId, quantity: i.quantity, isSubscription: i.isSubscription })),
            address,
            couponCode: coupon?.code,
            paymentMethod: 'RAZORPAY',
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Failed to initialize payment order');
        }

        // 2. Open Razorpay modal
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: data.amount,
          currency: 'INR',
          name: 'FurBowl',
          description: `Order #${data.orderNumber} - Fresh Dog Food`,
          image: '/images/LOGO1.png',
          order_id: data.razorpayOrderId,
          prefill: {
            name: address.fullName,
            contact: address.phone,
            email: user?.email || '',
          },
          notes: {
            furbowlOrderId: data.orderId,
            orderNumber: data.orderNumber,
          },
          theme: {
            color: '#10727e', // Dark teal theme
          },
          modal: {
            ondismiss: () => {
              setPlacing(false);
            },
          },
          handler: async (response) => {
            try {
              // 3. Verify payment signature on backend
              const verifyRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/verify`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                credentials: 'include',
                body: JSON.stringify({
                  orderId: data.orderId,
                  razorpayOrderId: response.razorpay_order_id,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpaySignature: response.razorpay_signature,
                }),
              });

              const verifyData = await verifyRes.json();
              if (!verifyRes.ok) {
                throw new Error(verifyData.error || 'Payment signature verification failed.');
              }

              clearCart();
              onPlaceOrder(data.orderNumber);
            } catch (verifyErr) {
              setError(verifyErr.message || 'Payment verification failed. If money was debited, please contact support with order #' + data.orderNumber);
              setPlacing(false);
            }
          },
        };

        const rzp = new window.Razorpay(options);

        rzp.on('payment.failed', (response) => {
          setError(response.error?.description || 'Payment was unsuccessful. Please try again.');
          setPlacing(false);
        });

        rzp.open();
        paymentModalOpen = true;
      } else {
        // COD Order
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
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
      setError(e.message || 'We could not place your order. Please try again.');
    } finally {
      if (!paymentModalOpen) setPlacing(false);
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
        <h3 className="font-bold text-plum-900 mb-4 text-base">Select Payment Method</h3>
        <div className="space-y-3">
          {[
            { value: 'RAZORPAY', label: 'Pay Online (Razorpay)', sub: 'UPI, Google Pay, PhonePe, Cards, Net Banking, Wallets' },
            { value: 'COD', label: 'Cash on Delivery', sub: 'Pay cash or UPI when your delivery arrives' },
          ].map((method) => (
            <button
              key={method.value}
              type="button"
              onClick={() => setPaymentMethod(method.value)}
              className={`w-full flex items-center gap-3.5 p-4 rounded border text-left transition-all cursor-pointer ${
                paymentMethod === method.value
                  ? 'border-teal-700 bg-teal-50/60 ring-2 ring-teal-700/20 shadow-xs'
                  : 'border-plum-900/10 hover:border-plum-900/25 bg-white'
              }`}
            >
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                paymentMethod === method.value ? 'border-teal-700' : 'border-plum-900/30'
              }`}>
                {paymentMethod === method.value && <div className="w-2.5 h-2.5 rounded-full bg-teal-700" />}
              </div>
              <div>
                <p className="font-bold text-plum-900 text-sm">{method.label}</p>
                <p className="text-xs text-plum-900/60 mt-0.5">{method.sub}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Order total recap */}
      <div className="bg-cream-100 rounded-xl p-4 space-y-2.5 text-sm border border-plum-900/5">
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
          <span>Shipping</span>
          <span className={shipping === 0 ? 'text-emerald-600 font-bold' : 'text-plum-900 font-bold'}>
            {shipping === 0 ? 'FREE' : formatPrice(shipping)}
          </span>
        </div>
        <div className="flex justify-between font-extrabold text-plum-900 border-t border-plum-900/10 pt-2.5 text-base">
          <span>Total Payable</span>
          <span className="text-lg">{formatPrice(total)}</span>
        </div>
      </div>

      <button
        onClick={handlePlaceOrder}
        disabled={placing}
        id="place-order-btn"
        className="w-full bg-teal-700 hover:bg-teal-800 active:scale-[0.99] text-white py-4 rounded font-bold text-base shadow-md shadow-teal-700/20 disabled:opacity-50 transition-all cursor-pointer flex items-center justify-center gap-2"
      >
        <Lock className="w-4 h-4 shrink-0" />
        <span>
          {placing
            ? 'Processing Order…'
            : paymentMethod === 'COD'
            ? `Place Order (COD) · ${formatPrice(total)}`
            : `Pay Securely · ${formatPrice(total)}`}
        </span>
      </button>

      {error && <p role="alert" className="text-center text-sm font-medium text-red-600">{error}</p>}

      {paymentMethod === 'RAZORPAY' && (
        <div className="flex items-center justify-center gap-1.5 text-xs text-plum-900/50 text-center">
          <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
          <span>256-Bit SSL Secured Live Payment via Razorpay</span>
        </div>
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

  // Preload Razorpay script
  useEffect(() => {
    loadRazorpayScript();
  }, []);

  const handleAddressSubmit = (addr) => { setAddress(addr); setStep('payment'); };
  const handleOrderPlaced = (orderNumber) => router.push(`/order-confirmation/${orderNumber}`);

  if (!hydrated) return null;

  const STEPS = [
    { key: 'address', label: 'Delivery Address', num: 1 },
    { key: 'payment', label: 'Payment', num: 2 },
  ];

  return (
    <div className="section-padding bg-cream-50/50 min-h-[70vh]">
      <div className="container-main max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-plum-900 mb-8">Checkout</h1>

        {/* Step indicators */}
        <div className="flex items-center gap-3 mb-8">
          {STEPS.map((s, i) => (
            <div key={s.key} className="flex items-center gap-3">
              <div className={`flex items-center gap-2 ${step === s.key ? 'text-teal-800 font-bold' : 'text-plum-900/40'}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  step === s.key
                    ? 'bg-teal-700 text-white shadow-sm shadow-teal-700/30'
                    : step === 'payment' && s.key === 'address'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-plum-900/10 text-plum-900/50'
                }`}>
                  {step === 'payment' && s.key === 'address' ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : s.num}
                </div>
                <span className="text-sm font-semibold hidden sm:inline">{s.label}</span>
              </div>
              {i < STEPS.length - 1 && <div className="flex-1 h-px bg-plum-900/15 w-8" />}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-plum-900/10 p-6 md:p-8 shadow-xs">
          {step === 'address' && (
            <>
              <h2 className="font-bold text-plum-900 text-lg mb-5">Delivery Address</h2>
              <AddressForm onSubmit={handleAddressSubmit} />
            </>
          )}
          {step === 'payment' && address && (
            <>
              {/* Show address summary */}
              <div className="flex items-start justify-between mb-6 bg-cream-100 rounded-lg p-4 border border-plum-900/5">
                <div>
                  <p className="text-xs font-bold text-plum-900/50 uppercase tracking-wide mb-1">Delivering to</p>
                  <p className="text-sm font-bold text-plum-900">{address.fullName}</p>
                  <p className="text-xs text-plum-900/70 mt-0.5">{address.addressLine1}{address.addressLine2 ? `, ${address.addressLine2}` : ''}, {address.city}, {address.state} – {address.pincode}</p>
                  <p className="text-xs text-plum-900/70 flex items-center gap-1 mt-1 font-medium"><Phone className="w-3 h-3 text-teal-700 shrink-0 inline" /> {address.phone}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setStep('address')}
                  className="text-xs text-teal-700 font-bold hover:underline cursor-pointer bg-teal-50 px-2.5 py-1 rounded border border-teal-200/60"
                >
                  Change
                </button>
              </div>
              <PaymentSection address={address} onPlaceOrder={handleOrderPlaced} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

import Link from 'next/link';
import { CheckCircle2, ArrowRight, ShoppingBag } from 'lucide-react';

export default function OrderConfirmationPage({ params }) {
  const { orderNumber } = params;

  return (
    <div className="section-padding bg-cream-50/50 min-h-[70vh]">
      <div className="container-main max-w-2xl mx-auto text-center py-12">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-200/60 shadow-sm">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h1 className="text-3xl font-extrabold text-plum-900 mb-3">Order Confirmed!</h1>
        <p className="text-plum-900/70 mb-2">Thank you for your order. We are preparing the freshest bowl for your pet.</p>
        <p className="text-plum-900/50 text-sm mb-8">
          Order number: <span className="font-bold text-plum-900">#{orderNumber}</span>
        </p>

        <div className="bg-white rounded-2xl border border-plum-900/10 p-6 mb-8 text-left shadow-xs">
          <h2 className="font-bold text-plum-900 mb-3 text-base">What happens next?</h2>
          <ol className="space-y-3">
            {[
              { step: '1', text: 'You\'ll receive an SMS/email confirmation shortly.' },
              { step: '2', text: 'Our kitchen will prepare your FurBowl order with fresh ingredients.' },
              { step: '3', text: 'We\'ll dispatch your chilled package within 1-2 business days.' },
              { step: '4', text: 'Live tracking details will be sent once your order ships.' },
            ].map((item) => (
              <li key={item.step} className="flex items-start gap-3 text-sm text-plum-900/80">
                <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{item.step}</span>
                <span>{item.text}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/account/orders"
            className="inline-flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-800 active:scale-95 text-white px-8 py-3.5 rounded font-bold text-sm shadow-md shadow-teal-700/20 transition-all cursor-pointer"
          >
            <span>View My Orders</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 border border-plum-900/15 bg-white text-plum-900 px-8 py-3.5 rounded font-bold text-sm hover:bg-plum-900/5 transition-all cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

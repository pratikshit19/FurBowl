import Link from 'next/link';
import { CheckCircle2, ArrowRight, ShoppingBag, Truck, ShieldCheck, Heart } from 'lucide-react';

export const metadata = {
  title: 'Order Confirmed — Thank You! | FurBowl',
  description: 'Thank you for your order. We are preparing the freshest bowl for your pet.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function OrderConfirmationPage({ params }) {
  const { orderNumber } = await params;

  return (
    <div className="section-padding bg-butter-50/40 min-h-[75vh] py-12 sm:py-16">
      <div className="container-main max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-200/60 shadow-sm animate-in zoom-in-50 duration-300">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="text-xs font-bold uppercase tracking-widest text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200/60 inline-block mb-3">
          Order Placed Successfully
        </span>

        <h1 className="text-3xl sm:text-4xl font-black text-plum-900 mb-3 tracking-tight">
          Thank you for trusting FurBowl!
        </h1>
        <p className="text-plum-900/70 text-sm sm:text-base mb-2">
          Your order has been sent to our kitchen. We are preparing the freshest bowl for your furry companion.
        </p>
        <p className="text-plum-900/60 text-xs sm:text-sm mb-8">
          Order reference: <span className="font-extrabold text-plum-900">#{orderNumber}</span>
        </p>

        {/* Steps Box */}
        <div className="bg-white rounded-2xl border border-plum-900/10 p-6 sm:p-7 mb-8 text-left shadow-xs">
          <h2 className="font-bold text-plum-900 mb-4 text-sm sm:text-base flex items-center gap-2">
            <Truck className="w-4 h-4 text-peach-500" />
            <span>What happens next?</span>
          </h2>
          <ol className="space-y-3.5">
            {[
              { step: '1', title: 'Confirmation Dispatched', text: 'You’ll receive an SMS/WhatsApp order receipt shortly.' },
              { step: '2', title: 'Cooked Fresh to Order', text: 'Our certified kitchen gently steam-cooks your recipes using human-grade meats & vegetables.' },
              { step: '3', title: 'Cold-Chain Packing', text: 'Meals are rapidly chilled and packed in insulated thermal boxes with ice packs.' },
              { step: '4', title: 'Doorstep Delivery', text: 'Live GPS courier tracking will be sent when your order ships.' },
            ].map((item) => (
              <li key={item.step} className="flex items-start gap-3 text-xs sm:text-sm text-plum-900/80">
                <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  {item.step}
                </span>
                <div>
                  <strong className="text-plum-900 block">{item.title}</strong>
                  <span className="text-plum-900/65">{item.text}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/account"
            className="inline-flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 active:scale-95 text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-md shadow-teal-600/20 transition-all cursor-pointer"
          >
            <span>View My Orders</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 border border-plum-900/15 bg-white text-plum-900 px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-plum-900/5 active:scale-95 transition-all cursor-pointer shadow-xs"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

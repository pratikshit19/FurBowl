import Link from 'next/link';
import { CheckCircle2, ArrowRight, ShoppingBag, Heart } from 'lucide-react';

export const metadata = {
  title: 'Thank You for Choosing FurBowl! | Fresh Dog Food',
  description: 'Thank you for your order and for feeding fresh, human-grade food to your dog.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouPage() {
  return (
    <div className="section-padding bg-butter-50/40 min-h-[75vh] py-16 flex items-center justify-center">
      <div className="container-main max-w-xl mx-auto text-center">
        <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-200/60 shadow-sm">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="text-xs font-bold uppercase tracking-widest text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200/60 inline-block mb-3">
          Fresh Meals on the Way
        </span>

        <h1 className="text-3xl sm:text-4xl font-black text-plum-900 mb-3 tracking-tight">
          Thank you for your purchase!
        </h1>

        <p className="text-plum-900/70 text-sm sm:text-base mb-8 leading-relaxed">
          We appreciate your trust in FurBowl. Our kitchen is getting your pup’s wholesome meals ready with fresh, human-grade ingredients and gentle cooking.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/account"
            className="inline-flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 active:scale-95 text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-md shadow-teal-600/20 transition-all cursor-pointer"
          >
            <span>View Orders</span>
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

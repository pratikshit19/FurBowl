import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BottomNav from '@/components/layout/BottomNav';
import { ShoppingBag, ArrowRight, Home, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Page Not Found — 404 | FurBowl',
  description: 'That bowl seems to be empty! The page you were looking for doesn’t exist or has moved.',
};

export default function NotFound() {
  const popularLinks = [
    { name: 'Chicken & Vegetables', href: '/shop/chicken-vegetables', tag: 'Best Seller' },
    { name: 'Classic Homestyle Chicken', href: '/shop/chicken-rice-vegetables', tag: 'Gentle Digestion' },
    { name: '7-Pack Trial Box', href: '/shop/all-recipes-trial-pack', tag: 'Try All Recipes' },
    { name: 'Monthly Fresh Plans', href: '/plans', tag: 'Save 25%' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-butter-50/40">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 sm:py-20 px-4">
        <div className="max-w-2xl w-full text-center">
          {/* Paw / Bowl graphic badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-peach-50 border border-peach-200/60 text-peach-700 text-xs sm:text-sm font-extrabold uppercase tracking-wider mb-6">
            <Sparkles className="w-4 h-4 text-peach-500" />
            <span>404 — Page Not Found</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-plum-900 tracking-tight leading-tight mb-4">
            Oops! That bowl is completely empty.
          </h1>

          <p className="text-sm sm:text-base text-plum-900/70 max-w-lg mx-auto mb-8 leading-relaxed">
            We couldn’t find the page you’re sniffing around for. Our kitchen might have moved it, or the link may have a typo.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-12">
            <Link
              href="/shop"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-peach-500 hover:bg-peach-600 active:scale-95 text-white font-bold text-sm shadow-md shadow-peach-500/25 transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Browse Fresh Meals</span>
            </Link>
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white hover:bg-plum-900/5 active:scale-95 text-plum-900 font-bold text-sm border border-plum-900/15 transition-all cursor-pointer shadow-xs"
            >
              <Home className="w-4 h-4 text-plum-900/60" />
              <span>Back to Homepage</span>
            </Link>
          </div>

          {/* Popular Destinations Card */}
          <div className="bg-white rounded-2xl border border-plum-900/10 p-6 sm:p-7 shadow-xs text-left max-w-xl mx-auto">
            <h2 className="text-xs font-bold uppercase tracking-wider text-plum-900/50 mb-4">
              Or pick one of our fresh favorites:
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {popularLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center justify-between p-3 rounded-xl border border-plum-900/8 hover:border-peach-300 hover:bg-peach-50/30 transition-all group"
                >
                  <div className="min-w-0 pr-2">
                    <p className="text-xs sm:text-sm font-bold text-plum-900 group-hover:text-peach-700 truncate transition-colors">
                      {item.name}
                    </p>
                    <span className="text-[10px] text-teal-700 font-semibold">{item.tag}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-plum-900/30 group-hover:text-peach-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}

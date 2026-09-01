'use client';

import Link from 'next/link';

export default function WishlistPage() {
  return (
    <main className="min-h-[60vh] bg-[#faf6ed] py-16 px-4 sm:px-6 lg:px-8">
      <div className="container-main max-w-4xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-plum-900 tracking-tight mb-4">
          My Wishlist
        </h1>
        <p className="text-base text-plum-900/70 mb-10 max-w-md mx-auto">
          Save your furry friend’s favorite meals and treats all in one place.
        </p>

        {/* Empty Wishlist State */}
        <div className="bg-white rounded-3xl p-10 sm:p-14 border border-plum-900/10 shadow-sm max-w-lg mx-auto flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-butter-300/40 text-plum-900 flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-coral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-plum-900 mb-2">Your wishlist is empty</h2>
          <p className="text-sm text-plum-900/60 mb-8 max-w-xs">
            Explore our fresh human-grade dog food recipes and tap the heart icon to save items for later.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center bg-coral-500 hover:bg-coral-600 text-white font-extrabold text-sm px-8 py-3.5 rounded-full transition-all shadow-md active:scale-95"
          >
            Explore Recipes
          </Link>
        </div>
      </div>
    </main>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, X, Check } from 'lucide-react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a cookie choice
    const consent = localStorage.getItem('furbowl_cookie_consent');
    if (!consent) {
      // Small timeout so it doesn't cause layout jump immediately on initial paint
      const timer = setTimeout(() => {
        setVisible(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('furbowl_cookie_consent', 'all');
    setVisible(false);
  };

  const handleAcceptEssential = () => {
    localStorage.setItem('furbowl_cookie_consent', 'essential');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent banner"
      className="fixed bottom-16 sm:bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="bg-white/95 backdrop-blur-md border border-plum-900/15 shadow-2xl rounded-2xl p-4 sm:p-5 text-plum-900">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-peach-50 text-peach-600 flex items-center justify-center shrink-0 mt-0.5">
            <Cookie className="w-5 h-5" />
          </div>
          <div className="flex-1 pr-6">
            <h3 className="text-sm font-bold text-plum-900 mb-1">
              Fresh cookies for better meals
            </h3>
            <p className="text-xs text-plum-900/75 leading-relaxed">
              We use cookies to save your dog’s meal preferences, keep your cart warm, and ensure a seamless checkout experience. Read our{' '}
              <Link href="/privacy-policy" className="text-teal-700 font-semibold underline hover:text-teal-800">
                Privacy Policy
              </Link>.
            </p>
          </div>
          <button
            type="button"
            onClick={handleAcceptEssential}
            className="text-plum-900/40 hover:text-plum-900 p-1 -mr-2 -mt-2 transition-colors cursor-pointer"
            aria-label="Dismiss cookie notice"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-3.5 pt-3 border-t border-plum-900/10 flex items-center gap-2">
          <button
            type="button"
            onClick={handleAcceptAll}
            className="flex-1 bg-peach-500 hover:bg-peach-600 active:scale-95 text-white font-bold text-xs py-2 px-3 rounded-lg transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Accept All</span>
          </button>
          <button
            type="button"
            onClick={handleAcceptEssential}
            className="flex-1 bg-plum-900/5 hover:bg-plum-900/10 active:scale-95 text-plum-900 font-semibold text-xs py-2 px-3 rounded-lg transition-all border border-plum-900/10 cursor-pointer text-center"
          >
            Necessary Only
          </button>
        </div>
      </div>
    </div>
  );
}

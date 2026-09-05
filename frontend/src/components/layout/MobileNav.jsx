'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { NAV_LINKS, PRODUCTS_NAV } from '@/lib/constants';

export default function MobileNav({ isOpen, onClose }) {
  const pathname = usePathname();
  const navRef = useRef(null);
  const [productsOpen, setProductsOpen] = useState(true);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Trap focus inside drawer
  useEffect(() => {
    if (isOpen && navRef.current) {
      const firstFocusable = navRef.current.querySelector('button, a');
      firstFocusable?.focus();
    }
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={navRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed top-0 right-0 z-50 w-[300px] max-w-[85vw] h-full bg-white shadow-xl transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 h-[72px] border-b border-gray-100 shrink-0">
          <Image
            src="/images/dark-logo.png"
            alt="FurBowl"
            width={120}
            height={36}
            unoptimized
            className="h-9 w-auto object-contain"
          />
          <button
            onClick={onClose}
            className="flex items-center justify-center w-10 h-10 rounded-full text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="px-6 py-6 overflow-y-auto flex-1" aria-label="Mobile navigation">
          <ul className="space-y-1">
            {NAV_LINKS.map((link) => {
              if (link.hasDropdown) {
                return (
                  <li key={link.href} className="space-y-1">
                    <div className="flex items-center justify-between py-2 px-3 rounded-lg text-base font-bold text-plum-900">
                      <Link href={link.href} onClick={onClose} className="hover:text-coral-500 transition-colors">
                        {link.label}
                      </Link>
                      <button
                        onClick={() => setProductsOpen(!productsOpen)}
                        className="p-1.5 rounded-md text-plum-900/60 hover:text-coral-500 hover:bg-gray-100 transition-colors"
                        aria-label="Toggle products menu"
                      >
                        <svg
                          className={`w-5 h-5 transition-transform duration-200 ${productsOpen ? 'rotate-180' : ''}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </button>
                    </div>

                    {productsOpen && (
                      <ul className="pl-3 pr-1 space-y-1 pb-2 border-l-2 border-coral-500/30 ml-3">
                        <li>
                          <Link
                            href="/shop"
                            onClick={onClose}
                            className="block py-2 px-3 rounded-md text-xs font-extrabold uppercase tracking-wider text-coral-500 hover:bg-coral-50 transition-colors"
                          >
                            All Products →
                          </Link>
                        </li>
                        {PRODUCTS_NAV.map((product) => (
                          <li key={product.slug}>
                            <Link
                              href={`/shop/${product.slug}`}
                              onClick={onClose}
                              className={`flex items-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                                pathname === `/shop/${product.slug}`
                                  ? 'text-coral-500 bg-coral-50 font-bold'
                                  : 'text-plum-900/80 hover:text-coral-500 hover:bg-gray-50'
                              }`}
                            >
                              <span className={`w-2 h-2 rounded-full shrink-0 ${product.isVeg ? 'bg-emerald-500' : 'bg-red-500'}`} />
                              <span className="truncate">{product.name}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              }

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className={`block py-3 px-3 rounded-lg text-base font-bold transition-colors ${
                      pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
                        ? 'text-coral-500 bg-coral-50'
                        : 'text-plum-900 hover:text-coral-500 hover:bg-gray-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 left-0 right-0 px-6 py-6 border-t border-gray-100 bg-white">
          <div className="space-y-3">
            <Link
              href="/login"
              onClick={onClose}
              className="flex items-center gap-3 py-3 px-3 rounded-lg text-gray-700 hover:text-turquoise-600 hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="font-medium">Login / Sign Up</span>
            </Link>
            <Link
              href="/wishlist"
              onClick={onClose}
              className="flex items-center gap-3 py-3 px-3 rounded-lg text-gray-700 hover:text-turquoise-600 hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
              <span className="font-medium">Wishlist</span>
            </Link>
            <Link
              href="/cart"
              onClick={onClose}
              className="flex items-center gap-3 py-3 px-3 rounded-lg text-gray-700 hover:text-turquoise-600 hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="font-medium">Cart</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

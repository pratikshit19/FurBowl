'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import useAuthStore from '@/store/authStore';
import { NAV_LINKS, PRODUCTS_NAV } from '@/lib/constants';
import {
  X,
  ChevronRight,
  ChevronDown,
  User,
  Phone,
} from 'lucide-react';

export default function MobileNav({ isOpen, onClose }) {
  const pathname = usePathname();
  const navRef = useRef(null);
  const [productsOpen, setProductsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    setHydrated(true);
  }, []);

  // Lock body scroll when drawer is open
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

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Bottom-Up Drawer Sheet (Slides from bottom up) */}
      <div
        ref={navRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed bottom-0 left-0 right-0 z-50 max-h-[92vh] bg-white rounded-t-[32px] shadow-2xl transition-transform duration-300 ease-out flex flex-col overflow-hidden ${
          isOpen ? 'translate-y-0' : 'translate-y-full pointer-events-none'
        }`}
      >
        {/* Grab/Drag Handle Indicator */}
        <div className="pt-3 pb-2 cursor-pointer flex justify-center" onClick={onClose}>
          <div className="w-12 h-1.5 bg-plum-900/20 rounded-full" />
        </div>

        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 pb-3 pt-1 border-b border-plum-900/10 shrink-0">
          <Image
            src="/images/LOGO2.png"
            alt="FurBowl"
            width={140}
            height={55}
            unoptimized
            className="h-11 sm:h-12 w-auto object-contain"
          />
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-cream-100 flex items-center justify-center text-plum-900/70 hover:text-plum-900 hover:bg-cream-200 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 stroke-[2.2]" />
          </button>
        </div>

        {/* Navigation Links (Bold, uppercase items with divider borders matching reference) */}
        <nav className="px-6 py-2 overflow-y-auto flex-1 divide-y divide-plum-900/10" aria-label="Mobile navigation">
          {/* 1. OUR PRODUCTS (Accordion) */}
          <div className="py-1">
            <button
              type="button"
              onClick={() => setProductsOpen(!productsOpen)}
              className="w-full flex items-center justify-between py-4 text-left group"
            >
              <span className="text-lg font-black tracking-tight text-plum-900 group-hover:text-peach-600 transition-colors uppercase">
                Our Products
              </span>
              <div className="w-7 h-7 rounded-full bg-cream-100 flex items-center justify-center text-plum-900/60 group-hover:text-peach-600 transition-colors">
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${productsOpen ? 'rotate-180 text-peach-600' : ''}`}
                />
              </div>
            </button>

            {productsOpen && (
              <div className="pb-4 pt-1 pl-3 pr-1 space-y-1.5 border-l-2 border-peach-400 ml-2">
                <Link
                  href="/shop"
                  onClick={onClose}
                  className="block py-2 px-3 rounded-xl text-xs font-black uppercase tracking-wider text-peach-600 bg-peach-50 hover:bg-peach-100 transition-colors"
                >
                  View All Products →
                </Link>
                {PRODUCTS_NAV.map((product) => (
                  <Link
                    key={product.slug}
                    href={`/shop/${product.slug}`}
                    onClick={onClose}
                    className={`block py-2 px-3 rounded-xl text-sm font-semibold transition-colors ${
                      pathname === `/shop/${product.slug}`
                        ? 'text-teal-600 bg-teal-50'
                        : 'text-plum-900/80 hover:text-teal-600 hover:bg-cream-100/60'
                    }`}
                  >
                    {product.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* 2. PLANS */}
          <div className="py-1">
            <Link
              href="/plans"
              onClick={onClose}
              className="flex items-center justify-between py-4 text-lg font-black tracking-tight text-plum-900 hover:text-peach-600 transition-colors uppercase"
            >
              <span className="flex items-center gap-2">
                <span>Plans</span>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-peach-50 text-peach-700 border border-peach-200">
                  Save 20%
                </span>
              </span>
              <ChevronRight className="w-5 h-5 text-plum-900/30" />
            </Link>
          </div>

          {/* 3. FURBOWL FINDER */}
          <div className="py-1">
            <Link
              href="/find-food"
              onClick={onClose}
              className="flex items-center justify-between py-4 text-lg font-black tracking-tight text-plum-900 hover:text-teal-600 transition-colors uppercase"
            >
              <span className="flex items-center gap-2">
                <span>FurBowl Finder</span>
              </span>
              <ChevronRight className="w-5 h-5 text-plum-900/30" />
            </Link>
          </div>

          {/* 4. ABOUT US */}
          <div className="py-1">
            <Link
              href="/about"
              onClick={onClose}
              className="flex items-center justify-between py-4 text-lg font-black tracking-tight text-plum-900 hover:text-peach-600 transition-colors uppercase"
            >
              <span>About Us</span>
              <ChevronRight className="w-5 h-5 text-plum-900/30" />
            </Link>
          </div>

          {/* 5. FAQS */}
          <div className="py-1">
            <Link
              href="/faqs"
              onClick={onClose}
              className="flex items-center justify-between py-4 text-lg font-black tracking-tight text-plum-900 hover:text-peach-600 transition-colors uppercase"
            >
              <span>FAQs</span>
              <ChevronRight className="w-5 h-5 text-plum-900/30" />
            </Link>
          </div>

          {/* 6. CONTACT US */}
          <div className="py-1">
            <a
              href="https://wa.me/918860503685"
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="flex items-center justify-between py-4 text-lg font-black tracking-tight text-plum-900 hover:text-teal-600 transition-colors uppercase"
            >
              <span className="flex items-center gap-2">
                <span>Contact Us</span>
                <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                  WhatsApp Support
                </span>
              </span>
              <Phone className="w-4 h-4 text-plum-900/40" />
            </a>
          </div>
        </nav>

        {/* Bottom Bar: Login Button on Left + Social Media Icons on Right (Matches Reference Image 3) */}
        <div className="px-6 py-4 bg-cream-50/70 border-t border-plum-900/10 flex items-center justify-between gap-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          {hydrated && isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link
                href="/account"
                onClick={onClose}
                className="inline-flex items-center gap-2 bg-peach-500 hover:bg-peach-600 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-xs transition-colors"
              >
                <User className="w-4 h-4" />
                <span>{user?.name?.split(' ')[0] || 'My Account'}</span>
              </Link>
              <button
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="text-xs font-bold text-peach-600 px-2 py-1 hover:underline"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              onClick={onClose}
              className="inline-flex items-center gap-2 bg-peach-500 hover:bg-peach-600 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs transition-colors"
            >
              <User className="w-4 h-4" />
              <span>Login</span>
            </Link>
          )}

          {/* Social Icons matching the reference image layout */}
          <div className="flex items-center gap-3 sm:gap-4 text-plum-900/80">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-plum-900 hover:text-peach-600 hover:scale-110 shadow-xs transition-all"
              aria-label="Facebook"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-plum-900 hover:text-peach-600 hover:scale-110 shadow-xs transition-all"
              aria-label="X"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-plum-900 hover:text-peach-600 hover:scale-110 shadow-xs transition-all"
              aria-label="Instagram"
            >
              <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-plum-900 hover:text-peach-600 hover:scale-110 shadow-xs transition-all"
              aria-label="YouTube"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

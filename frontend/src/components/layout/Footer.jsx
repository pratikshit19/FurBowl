'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SITE_NAME } from '@/lib/constants';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-plum-900 text-white pt-14 pb-8 border-t border-white/10" role="contentinfo">
      <div className="container-main px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 pb-10">
          
          {/* Left Main Column — Logo, Newsletter, Socials, Customer Care */}
          <div className="lg:col-span-5 space-y-7">
            {/* Logo */}
            <Link href="/" className="inline-block">
              <Image
                src="/images/light-logo.png"
                alt={SITE_NAME}
                width={160}
                height={50}
                unoptimized
                className="h-11 w-auto object-contain"
              />
            </Link>

            {/* Newsletter */}
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-butter-300 mb-3">
                Get Latest Updates &amp; Offers
              </h3>
              {submitted ? (
                <div className="text-xs font-bold text-butter-300 py-2">
                  ✓ Thank you! You're subscribed for updates.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex items-center max-w-sm">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address..."
                    className="w-full bg-white/10 border border-white/20 text-white placeholder-white/50 text-xs sm:text-sm px-4 py-2.5 rounded-l-full outline-none focus:border-butter-300 focus:bg-white/15 transition-all"
                  />
                  <button
                    type="submit"
                    className="bg-coral-500 hover:bg-coral-600 text-white font-extrabold text-xs sm:text-sm px-6 py-2.5 rounded-r-full transition-colors shrink-0 shadow-md"
                  >
                    Submit
                  </button>
                </form>
              )}
            </div>

            {/* Social Links */}
            <div>
              <p className="text-xs sm:text-sm font-semibold text-white/80 mb-3">
                Let’s keep in touch
              </p>
              <div className="flex items-center gap-3">
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-butter-300 hover:text-plum-900 transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-butter-300 hover:text-plum-900 transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-butter-300 hover:text-plum-900 transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                {/* X */}
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X"
                  className="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-butter-300 hover:text-plum-900 transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-butter-300 hover:text-plum-900 transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Customer Care */}
            <div className="pt-2 space-y-3">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-butter-300">
                Customer Care
              </h3>
              <div className="space-y-2.5 text-xs sm:text-sm text-white/80">
                {/* Email */}
                <div className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-butter-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <a href="mailto:hello@furbowl.in" className="hover:text-coral-400 transition-colors text-white font-medium">
                    hello@furbowl.in
                  </a>
                </div>
                {/* Phone */}
                <div className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 text-butter-300 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.828-1.428-5.127-3.727-6.555-6.555l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <div>
                    <a href="tel:+919876543210" className="hover:text-coral-400 font-semibold text-white block transition-colors">
                      +91 98765 43210
                    </a>
                    <span className="text-[11px] text-white/60 block">
                      Mon – Sat, 10 AM – 6 PM IST
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Columns — Online Shopping, Customer Policies, Useful Links */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8 pt-2">
            
            {/* ONLINE SHOPPING */}
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-butter-300 mb-4">
                Online Shopping
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-white/70 font-semibold">
                <li><Link href="/shop" className="hover:text-coral-400 transition-colors">Fresh Dog Food</Link></li>
                <li><Link href="/shop?category=chicken" className="hover:text-coral-400 transition-colors">Chicken &amp; Rice</Link></li>
                <li><Link href="/shop?category=paneer" className="hover:text-coral-400 transition-colors">Paneer Medley</Link></li>
                <li><Link href="/shop?category=egg" className="hover:text-coral-400 transition-colors">Egg Superfood</Link></li>
                <li><Link href="/find-food" className="hover:text-coral-400 transition-colors">Find Your Meal</Link></li>
              </ul>
            </div>

            {/* CUSTOMER POLICIES */}
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-butter-300 mb-4">
                Customer Policies
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-white/70 font-semibold">
                <li><Link href="/terms-conditions" className="hover:text-coral-400 transition-colors">Terms Of Use</Link></li>
                <li><Link href="/privacy-policy" className="hover:text-coral-400 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/shipping-returns" className="hover:text-coral-400 transition-colors">Refund Policy</Link></li>
                <li><Link href="/shipping-returns" className="hover:text-coral-400 transition-colors">Shipping Policy</Link></li>
                <li><Link href="/faq" className="hover:text-coral-400 transition-colors">FAQ's</Link></li>
              </ul>
            </div>

            {/* USEFUL LINKS */}
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-butter-300 mb-4">
                Useful Links
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-white/70 font-semibold">
                <li><Link href="/about" className="hover:text-coral-400 transition-colors">About Us</Link></li>
                <li><Link href="/why-furbowl" className="hover:text-coral-400 transition-colors">Why FurBowl</Link></li>
                <li><Link href="/contact" className="hover:text-coral-400 transition-colors">Contact Us</Link></li>
                <li><Link href="/cart" className="hover:text-coral-400 transition-colors">Your Cart</Link></li>
                <li><Link href="/wishlist" className="hover:text-coral-400 transition-colors">Your Wishlist</Link></li>
              </ul>
            </div>

          </div>

        </div>

        {/* Scroll To Top Button & Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
          <p className="text-xs font-bold text-white/60">
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="w-10 h-10 rounded-full bg-butter-300 text-plum-900 flex items-center justify-center shadow-lg hover:bg-coral-500 hover:text-white transition-all active:scale-95"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
          </button>
        </div>

      </div>
    </footer>
  );
}

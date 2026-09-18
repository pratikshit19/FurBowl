'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2, Phone, Mail } from 'lucide-react';
import { SITE_NAME } from '@/lib/constants';
import api from '@/lib/api';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitting(true);
    setError('');
    try {
      await api.subscribeNewsletter(email.trim());
      setSubmitted(true);
      setEmail('');
    } catch (err) {
      setError(err.message || 'We could not subscribe you right now.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="relative text-white overflow-hidden" role="contentinfo">
      {/* Top Newsletter / Community Banner with 3:1 Dog & FurBowl Photo Background */}
      <section className="relative w-full overflow-hidden min-h-[360px] sm:min-h-[400px] lg:min-h-[420px] xl:min-h-[460px] flex items-center bg-plum-950">
        {/* 3:1 Aspect Ratio Photo Background */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <Image
            src="/images/home/furbowl-community-banner-3to1.jpg"
            alt="Happy dog with FurBowl fresh food bowl"
            fill
            priority
            sizes="100vw"
            className="object-cover object-right md:object-[center_right] lg:object-center w-full h-full"
          />
          {/* Gradient scrim on the left for maximum contrast and text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-plum-950/85 via-plum-950/60 to-transparent sm:from-plum-950/80 sm:via-plum-950/45 sm:to-transparent lg:from-plum-950/75 lg:via-plum-950/30 lg:to-transparent" />
          {/* Subtle vertical vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/35" />
        </div>

        <div className="container-main max-w-6xl relative z-10 py-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Left: Copy & Form */}
            <div className="lg:col-span-7 text-center lg:text-left">
              <span
                className="text-[11px] font-bold uppercase tracking-widest bg-white/20 backdrop-blur-xs px-3.5 py-1 rounded-full inline-block mb-3 border border-white/25 shadow-xs !text-white"
                style={{ color: '#ffffff' }}
              >
                The FurBowl Community
              </span>

              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-2 drop-shadow-sm !text-white"
                style={{ color: '#ffffff' }}
              >
                Good food. <br />
                Happier dogs.
              </h2>

              <p
                className="text-xs sm:text-sm !text-white font-normal max-w-md mx-auto lg:mx-0 mb-6 leading-relaxed drop-shadow-xs"
                style={{ color: '#ffffff' }}
              >
                Real food drops, nutrition advice from certified pet dietitians, and exclusive pack discounts.
              </p>

              {submitted ? (
                <div className="bg-white/25 backdrop-blur-md border border-white/40 rounded-full px-5 py-3 text-xs sm:text-sm font-bold flex items-center justify-center lg:justify-start gap-2.5 max-w-md mx-auto lg:mx-0 shadow-lg !text-white" style={{ color: '#ffffff' }}>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Welcome to the pack! Check your inbox for 15% off.</span>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-white rounded overflow-hidden p-0 flex flex-row items-stretch shadow-xl max-w-md mx-auto lg:mx-0 border border-white/40"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="px-4 py-3 sm:py-3.5 text-xs sm:text-sm text-plum-900 placeholder-plum-900/40 bg-white flex-1 outline-none font-medium min-w-0 border-0"
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-peach-500 hover:bg-peach-600 !text-white font-bold text-xs sm:text-sm px-5 sm:px-7 py-3 sm:py-3.5 transition-all shrink-0 cursor-pointer shadow-none text-center rounded-none"
                    style={{ color: '#ffffff' }}
                  >
                    {submitting ? 'Joining…' : 'Join the pack'}
                  </button>
                </form>
              )}
              {!submitted && (
                <p
                  className="mt-2 text-xs !text-white/90 drop-shadow-xs"
                  style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                  aria-live="polite"
                >
                  {error || 'By joining, you agree to receive FurBowl updates. Unsubscribe anytime.'}
                </p>
              )}
            </div>

            {/* Right: Open column to showcase the background dog & FurBowl bowl */}
            <div className="hidden lg:block lg:col-span-5 min-h-[160px]" aria-hidden="true" />

          </div>
        </div>
      </section>

      {/* Main Footer Links */}
      <div className="bg-[#15aec0] text-white pt-12 sm:pt-16 pb-8">
        <div className="container-main max-w-6xl">

          {/* 4 Columns matching reference */}
          <div className="grid grid-cols-2 md:grid-cols-12 gap-8 sm:gap-10 pb-12 sm:pb-14">

            {/* Column 1: SHOP FOR DOGS */}
            <div className="col-span-1 md:col-span-3 space-y-3.5">
              <h3
                className="text-xs sm:text-sm font-bold uppercase tracking-wider !text-white"
                style={{ color: '#ffffff' }}
              >
                Shop For Dogs
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-white/80 font-normal">
                <li><Link href="/shop" className="hover:text-white transition-colors">Food</Link></li>
                <li><Link href="/shop" className="hover:text-white transition-colors">Treats</Link></li>
                <li><Link href="/shop/golden-chicken-broth" className="hover:text-white transition-colors">Broth</Link></li>
                <li><Link href="/plans" className="hover:text-white transition-colors">Custom Monthly Packs</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">About FurBowl</Link></li>
                <li><Link href="/why-furbowl" className="hover:text-white transition-colors">Why FurBowl</Link></li>
                <li><Link href="/why-furbowl" className="hover:text-white transition-colors">Feeding Guidelines</Link></li>
              </ul>
            </div>

            {/* Column 2: QUICK LINKS */}
            <div className="col-span-1 md:col-span-3 space-y-3.5">
              <h3
                className="text-xs sm:text-sm font-bold uppercase tracking-wider !text-white"
                style={{ color: '#ffffff' }}
              >
                Quick Links
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-white/80 font-normal">
                <li><Link href="/why-furbowl" className="hover:text-white transition-colors">Blogs</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms-conditions" className="hover:text-white transition-colors">Refund Policy</Link></li>
                <li><Link href="/terms-conditions" className="hover:text-white transition-colors">Shipping Policy</Link></li>
                <li><Link href="/terms-conditions" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
                <li><Link href="/find-food" className="hover:text-white transition-colors">Pet Parent Resources</Link></li>
              </ul>
            </div>

            {/* Column 3: SUPPORT */}
            <div className="col-span-2 md:col-span-3 space-y-3.5">
              <h3
                className="text-xs sm:text-sm font-bold uppercase tracking-wider !text-white"
                style={{ color: '#ffffff' }}
              >
                Support
              </h3>
              <div className="space-y-3 text-xs sm:text-sm text-white/85 font-normal">
                <a
                  href="tel:+918860503685"
                  className="flex items-center gap-2.5 hover:text-white transition-colors group"
                >
                  <Phone className="w-4 h-4 text-white shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="tracking-wide">+91 8860503685</span>
                </a>
                <a
                  href="mailto:care@furbowl.com"
                  className="flex items-center gap-2.5 hover:text-white transition-colors group"
                >
                  <Mail className="w-4 h-4 text-white shrink-0 group-hover:scale-110 transition-transform" />
                  <span>care@furbowl.com</span>
                </a>
                <p className="text-xs text-white/75 pt-1.5 leading-relaxed">
                  Contact Us: Monday–Saturday, 9am to 9pm
                </p>
              </div>
            </div>

            {/* Column 4: FOLLOW US */}
            <div className="col-span-2 md:col-span-3 space-y-3.5">
              <h3
                className="text-xs sm:text-sm font-bold uppercase tracking-wider !text-white"
                style={{ color: '#ffffff' }}
              >
                Follow Us
              </h3>

              {/* Boxed Social Media Grid with Dividers */}
              <div className="inline-flex items-center border border-white/40 divide-x divide-white/40 rounded-xs overflow-hidden bg-white/5">
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* X / Twitter */}
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X"
                  className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#15aec0" />
                  </svg>
                </a>
              </div>
            </div>

          </div>

          {/* Bottom Bar: Copyright + CIN on Left, Developed by D2Cbox on Right */}
          <div className="border-t border-white/20 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs !text-white/80 font-normal" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>

            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 text-center sm:text-left">
              <Link href="/" className="inline-block shrink-0" aria-label="FurBowl Home">
                <Image
                  src="/images/furbowl-logo-white.png"
                  alt={SITE_NAME}
                  width={120}
                  height={96}
                  className="h-8 sm:h-9 w-auto object-contain hover:opacity-90 transition-opacity"
                />
              </Link>
              <span>
                © 2026 FurBowl Petcare Pvt. Ltd. | All Rights Reserved
              </span>
            </div>

            <div className="text-white/75 hover:text-white transition-colors shrink-0 text-center sm:text-right">
              Developed by D2Cbox
            </div>

          </div>

        </div>
      </div>
    </footer>
  );
}

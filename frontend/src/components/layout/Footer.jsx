'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PawPrint, CheckCircle2, Heart, ArrowUp } from 'lucide-react';
import { SITE_NAME } from '@/lib/constants';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#15aec0] text-white pt-12 sm:pt-16 pb-8 overflow-hidden" role="contentinfo">
      <div className="container-main max-w-6xl">
        
        {/* Top Newsletter Section (Full width inside teal footer, not a separate card) */}
        <div className="relative pb-12 sm:pb-16 border-b border-white/20">
          
          {/* Playful dashed curved path & floating paw */}
          <div className="absolute top-6 right-[38%] opacity-35 hidden md:block select-none pointer-events-none">
            <svg width="140" height="40" viewBox="0 0 140 40" fill="none">
              <path d="M5 25 C 45 5, 95 38, 135 15" stroke="white" strokeWidth="2" strokeDasharray="5 5" />
            </svg>
          </div>
          <div className="absolute top-3 right-[35%] select-none pointer-events-none hidden md:block">
            <PawPrint className="w-7 h-7 text-white/30" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left: Copy & Pill Input */}
            <div className="lg:col-span-7 text-center lg:text-left">
              <span className="text-[11px] font-black uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full inline-block mb-3">
                The FurBowl Community
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1] mb-2">
                Good food. <br />
                Happier dogs.
              </h2>

              <p className="text-xs sm:text-sm text-white/90 font-normal max-w-md mx-auto lg:mx-0 mb-6 leading-relaxed">
                Real food drops, nutrition advice from certified pet dietitians, and exclusive pack discounts.
              </p>

              {submitted ? (
                <div className="bg-white/20 backdrop-blur-xs border border-white/40 rounded-full px-5 py-3 text-xs sm:text-sm font-bold flex items-center justify-center lg:justify-start gap-2.5 max-w-md mx-auto lg:mx-0">
                  <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
                  <span>Welcome to the pack! Check your inbox for 15% off.</span>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-white rounded-full p-1.5 sm:p-2 flex items-center shadow-md max-w-md mx-auto lg:mx-0 border border-white/40"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="px-4 py-2 text-xs sm:text-sm text-plum-900 placeholder-plum-900/40 bg-transparent flex-1 outline-none font-medium"
                  />
                  <button
                    type="submit"
                    className="bg-peach-500 hover:bg-peach-600 text-white font-bold text-xs sm:text-sm px-5 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all shrink-0 cursor-pointer shadow-sm"
                  >
                    Join the pack
                  </button>
                </form>
              )}
            </div>

            {/* Right: Golden Retriever Pup Portrait */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-44 sm:w-56 lg:w-64 aspect-square">
                <Image
                  src="/images/home/hero-golden-dog.jpg"
                  alt="Happy Golden Retriever in FurBowl community banner"
                  fill
                  className="object-cover rounded-full border-4 border-white/50 shadow-xl"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Middle: 4 Columns on Same Teal Background */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 py-10 sm:py-12 border-b border-white/20">
          
          {/* Column 1: Shop */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-butter-100">
              Shop
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-white/85 font-medium">
              <li><Link href="/shop" className="hover:text-white hover:underline transition-colors">All Products</Link></li>
              <li><Link href="/shop" className="hover:text-white hover:underline transition-colors">Build Your Box</Link></li>
              <li><Link href="/shop" className="hover:text-white hover:underline transition-colors">Subscription</Link></li>
              <li><Link href="/shop/chicken-harvest" className="hover:text-white hover:underline transition-colors">Chicken Harvest</Link></li>
              <li><Link href="/shop/paneer-greens" className="hover:text-white hover:underline transition-colors">Paneer &amp; Greens</Link></li>
            </ul>
          </div>

          {/* Column 2: Learn */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-butter-100">
              Learn
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-white/85 font-medium">
              <li><Link href="/why-furbowl" className="hover:text-white hover:underline transition-colors">FurBowl School</Link></li>
              <li><Link href="/#ingredients" className="hover:text-white hover:underline transition-colors">Ingredients</Link></li>
              <li><Link href="/why-furbowl" className="hover:text-white hover:underline transition-colors">Feeding Guide</Link></li>
              <li><Link href="/find-food" className="hover:text-white hover:underline transition-colors">Taste Profile Finder</Link></li>
            </ul>
          </div>

          {/* Column 3: About */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-butter-100">
              About
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-white/85 font-medium">
              <li><Link href="/about" className="hover:text-white hover:underline transition-colors">Our Story</Link></li>
              <li><Link href="/about" className="hover:text-white hover:underline transition-colors">Sustainability</Link></li>
              <li><Link href="/contact" className="hover:text-white hover:underline transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-white hover:underline transition-colors">Vet FAQs</Link></li>
            </ul>
          </div>

          {/* Column 4: Follow the pack */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-butter-100">
              Follow the pack
            </h3>
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/20 hover:bg-white hover:text-[#15aec0] text-white flex items-center justify-center transition-colors shadow-2xs"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/20 hover:bg-white hover:text-[#15aec0] text-white flex items-center justify-center transition-colors shadow-2xs"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full bg-white/20 hover:bg-white hover:text-[#15aec0] text-white flex items-center justify-center transition-colors shadow-2xs"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white"/>
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-9 h-9 rounded-full bg-white/20 hover:bg-white hover:text-[#15aec0] text-white flex items-center justify-center transition-colors shadow-2xs"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
            <p className="text-[11px] text-white/80 font-normal pt-2">
              Share your pup’s meal moments with #FurBowlPack
            </p>
          </div>

        </div>

        {/* Bottom Bar: Logo (Left) + Copyright (Center) + Heart (Right) */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/80 font-medium">
          
          {/* Logo on Left (seamless on teal background) */}
          <Link href="/" className="inline-block" aria-label="FurBowl Home">
            <Image
              src="/images/LOGO1.png"
              alt={SITE_NAME}
              width={140}
              height={112}
              unoptimized
              className="h-10 sm:h-12 w-auto object-contain brightness-0 invert"
            />
          </Link>

          {/* Copyright in Center */}
          <div className="text-center">
            © 2026 FurBowl. All rights reserved. | Real Food. Happier Dogs.
          </div>

          {/* Privacy / Terms / Top Button on Right */}
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-white hover:underline transition-colors">Privacy</Link>
            <Link href="/terms-conditions" className="hover:text-white hover:underline transition-colors">Terms</Link>
            <button
              onClick={scrollToTop}
              className="hover:text-white transition-colors flex items-center gap-1.5 font-bold text-white bg-white/20 hover:bg-white hover:text-[#15aec0] px-3 py-1 rounded-full cursor-pointer ml-2"
              aria-label="Back to top"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
            <span className="text-white ml-1 inline-flex items-center" aria-label="Pure love">
              <Heart className="w-4 h-4 fill-white text-white" />
            </span>
          </div>

        </div>

      </div>
    </footer>
  );
}

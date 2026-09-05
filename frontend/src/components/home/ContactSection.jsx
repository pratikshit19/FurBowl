'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ContactSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <section className="section-padding bg-[#faf6ed]" aria-labelledby="contact-section-heading">
      <div className="container-main space-y-16">
        
        {/* Newsletter Banner — Dark Plum with Dog Photo (from reference image) */}
        <div className="relative rounded-3xl bg-plum-900 text-white p-8 sm:p-12 overflow-hidden shadow-2xl">
          <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left — Email Form */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-butter-300 flex items-center justify-center text-plum-900 shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Join the FurBowl Family
                </h2>
              </div>

              <p className="text-plum-100 text-sm sm:text-base leading-relaxed">
                Get exclusive offers, fresh feeding tips, and 10% off your first order!
              </p>

              {subscribed ? (
                <div className="bg-white/10 border border-white/20 p-4 rounded-2xl text-butter-300 font-bold text-sm flex items-center gap-2">
                  <svg className="w-5 h-5 text-butter-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Thanks for joining! Welcome to the FurBowl family.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 pt-2 max-w-md">
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="flex-1 bg-white text-plum-900 font-medium px-4 py-3.5 rounded-2xl text-sm placeholder-plum-900/40 border border-plum-900/10 focus:outline-none focus:border-coral-500 focus:ring-1 focus:ring-coral-500/30 transition-all"
                  />
                  <button
                    type="submit"
                    className="bg-coral-500 hover:bg-coral-600 text-white font-extrabold px-6 py-3.5 rounded-2xl text-sm transition-all shadow-md active:scale-95 shrink-0"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>

            {/* Right — Cute Dog Photo sitting at floor */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end items-end relative h-[200px] sm:h-[240px]">
              <div className="relative w-48 sm:w-56 h-48 sm:h-56 rounded-full bg-butter-300 overflow-hidden border-4 border-white/20 shadow-xl">
                <Image
                  src="/images/dog2.jpg"
                  alt="Cute dog member of FurBowl family"
                  fill
                  className="object-cover"
                  sizes="224px"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Simple Contact Info Card Grid */}
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-plum-900/10 shadow-sm text-center">
            <div className="w-12 h-12 rounded-full bg-butter-300 text-plum-900 flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-plum-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <h3 className="font-extrabold text-plum-900 text-base mb-1">Email Us</h3>
            <p className="text-xs text-plum-900/60 mb-2">Mon – Sat, 10 AM – 6 PM IST</p>
            <a href="mailto:hello@furbowl.in" className="text-xs font-extrabold text-coral-500 hover:underline">
              hello@furbowl.in
            </a>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-plum-900/10 shadow-sm text-center">
            <div className="w-12 h-12 rounded-full bg-butter-300 text-plum-900 flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-emerald-600 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
            </div>
            <h3 className="font-extrabold text-plum-900 text-base mb-1">WhatsApp Support</h3>
            <p className="text-xs text-plum-900/60 mb-2">Instant help for orders & delivery</p>
            <a href="https://wa.me/918860503685" target="_blank" rel="noreferrer" className="text-xs font-extrabold text-coral-500 hover:underline">
              +91 88605 03685
            </a>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-plum-900/10 shadow-sm text-center">
            <div className="w-12 h-12 rounded-full bg-butter-300 text-plum-900 flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-plum-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M12 18h.008v.008H12V18z" />
              </svg>
            </div>
            <h3 className="font-extrabold text-plum-900 text-base mb-1">Help &amp; FAQs</h3>
            <p className="text-xs text-plum-900/60 mb-2">Common feeding &amp; shipping questions</p>
            <Link href="/faq" className="text-xs font-extrabold text-coral-500 hover:underline">
              Browse FAQs →
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}

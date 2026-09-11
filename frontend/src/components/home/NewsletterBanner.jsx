'use client';

import { useState } from 'react';
import Image from 'next/image';

import { CheckCircle2 } from 'lucide-react';

export default function NewsletterBanner() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="bg-gradient-to-r from-coral-500 to-coral-600 text-white overflow-hidden relative">
      <div className="container-main max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center py-10 sm:py-14">
          
          {/* Left Column: Headline, form */}
          <div className="lg:col-span-8 text-center lg:text-left z-10">
            <span className="text-[11px] font-black uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full inline-block mb-3">
              The FurBowl Community
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-2">
              Good food. <br className="hidden sm:inline" />
              Happier dogs.
            </h2>

            <p className="text-sm sm:text-base text-white/85 font-normal max-w-lg mx-auto lg:mx-0 mb-6">
              Get fresh meal drops, dog health tips from certified nutritionists, and 15% off your first starter box.
            </p>

            {submitted ? (
              <div className="bg-white/20 backdrop-blur-xs border border-white/30 rounded-2xl p-4 max-w-md mx-auto lg:mx-0 text-sm font-bold flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
                <span>You’re in the pack! Check your inbox for your 15% off coupon.</span>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto lg:mx-0"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="flex-1 px-5 py-3.5 rounded-full text-plum-900 bg-white placeholder-plum-900/40 text-sm font-medium outline-none focus:ring-2 focus:ring-white/40 shadow-sm"
                />
                <button
                  type="submit"
                  className="bg-plum-900 hover:bg-plum-800 text-white font-black text-sm px-7 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all shrink-0 cursor-pointer"
                >
                  Join the pack
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Joyous Dog popping up */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end relative">
            <div className="relative w-48 sm:w-60 lg:w-72 aspect-square">
              <Image
                src="/images/home/hero-golden-dog.jpg"
                alt="Happy dog smiling in community banner"
                fill
                className="object-cover rounded-full border-4 border-white/40 shadow-2xl"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PawPrint, Heart, Package, Home, Target, BookOpen, ArrowRight } from 'lucide-react';
import useAuthStore from '@/store/authStore';

export default function AccountPage() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState('journey');

  useEffect(() => {
    useAuthStore.persist.rehydrate();
  }, []);

  return (
    <div className="min-h-screen bg-butter-50/40 py-10 sm:py-16">
      <div className="container-main max-w-5xl">
        
        {/* Header (Matching Screen 12) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-coral-600 bg-coral-500/10 px-3 py-1 rounded-full inline-block mb-2">
              The FurBowl Pack Member
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-plum-900 tracking-tight">
              Welcome to the pack!
            </h1>
            <p className="text-sm text-plum-900/60 font-normal mt-1">
              Here’s {user?.dogName || 'Bruno'}’s food journey. Track meal favourites, nutrition milestones, and deliveries.
            </p>
          </div>

          <button
            onClick={() => {
              logout();
              router.push('/');
            }}
            className="text-xs text-rose-600 hover:text-rose-700 font-bold px-4 py-2 border border-rose-200 rounded-full bg-white shadow-2xs self-start sm:self-auto cursor-pointer"
          >
            Log Out
          </button>
        </div>

        {/* Pup Profile Main Card (Matching Screen 12) */}
        <div className="bg-white rounded-3xl border-2 border-plum-900/10 p-6 sm:p-8 shadow-sm mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left: Bruno Avatar & Details */}
            <div className="lg:col-span-7 flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
              <div className="relative w-28 h-28 shrink-0 rounded-full overflow-hidden border-4 border-butter-200 shadow-md">
                <Image
                  src="/images/home/bruno-passport-dog.jpg"
                  alt="Bruno"
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                  <h2 className="text-2xl font-black text-plum-900">{user?.dogName || 'Bruno'}</h2>
                  <span className="inline-flex items-center gap-1 text-xs font-black bg-coral-500/10 text-coral-600 px-2.5 py-0.5 rounded-full">
                    <span>Food Explorer</span>
                    <PawPrint className="w-3 h-3" />
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-plum-900/70 font-medium mb-4">
                  <p className="flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-coral-500 shrink-0 inline" />
                    <span>Favourite: <span className="font-bold text-plum-900">Chicken Harvest</span></span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5 text-amber-600 shrink-0 inline" />
                    <span>Last order: <span className="font-bold text-plum-900">Delivered Fresh (Sep 2026)</span></span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Home className="w-3.5 h-3.5 text-teal-600 shrink-0 inline" />
                    <span>Account: <span className="font-bold text-plum-900">+91 {user?.phone || 'Verified Pack Member'}</span></span>
                  </p>
                </div>

                {/* Progress: Recipes Tried 3/6 */}
                <div className="max-w-xs">
                  <div className="flex items-center justify-between text-xs font-bold text-plum-900 mb-1.5">
                    <span>Recipes tried</span>
                    <span className="text-coral-600">3 / 6</span>
                  </div>
                  <div className="w-full h-2.5 bg-plum-900/10 rounded-full overflow-hidden">
                    <div className="h-full bg-coral-500 rounded-full w-1/2" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: "What's next?" Card (Matching Screen 12) */}
            <div className="lg:col-span-5 bg-butter-50 rounded-2xl border border-plum-900/10 p-5 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-coral-600">
                  What’s next?
                </span>
                <h3 className="text-base font-black text-plum-900 mt-1 mb-2">
                  Bruno hasn’t tried Golden Egg &amp; Quinoa yet!
                </h3>
                <p className="text-xs text-plum-900/60 leading-relaxed mb-4">
                  Farm eggs, ancient Andean quinoa, and pumpkin — perfect for next week’s superfood energy boost.
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-plum-900/10">
                <div className="flex items-center gap-2">
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white border border-plum-900/10">
                    <Image
                      src="/images/products/golden-egg-quinoa-front.jpg"
                      alt="Golden Egg & Quinoa"
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-plum-900">₹189</div>
                    <div className="text-[10px] text-plum-900/50">100g Pouch</div>
                  </div>
                </div>

                <Link
                  href="/shop/golden-egg-quinoa"
                  className="bg-coral-500 hover:bg-coral-600 text-white font-bold text-xs px-5 py-2 rounded-full shadow-sm transition-all inline-flex items-center gap-1"
                >
                  <span>Try Now</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* Quick Nav Links */}
        <div className="grid sm:grid-cols-3 gap-4">
          <Link
            href="/shop"
            className="bg-white rounded-2xl border border-plum-900/10 p-5 shadow-xs hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-butter-100 flex items-center justify-center text-coral-600 mb-3">
              <Package className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-plum-900 group-hover:text-coral-600 text-sm">
              Explore All 6 Recipes
            </h3>
            <p className="text-xs text-plum-900/50 mt-1">Browse recipes and reorder favourite bowls.</p>
          </Link>

          <Link
            href="/find-food"
            className="bg-white rounded-2xl border border-plum-900/10 p-5 shadow-xs hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-butter-100 flex items-center justify-center text-coral-600 mb-3">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-plum-900 group-hover:text-coral-600 text-sm">
              Retake Taste Quiz
            </h3>
            <p className="text-xs text-plum-900/50 mt-1">Update dietary goals or register another dog.</p>
          </Link>

          <Link
            href="/why-furbowl"
            className="bg-white rounded-2xl border border-plum-900/10 p-5 shadow-xs hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-butter-100 flex items-center justify-center text-coral-600 mb-3">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-plum-900 group-hover:text-coral-600 text-sm">
              FurBowl School
            </h3>
            <p className="text-xs text-plum-900/50 mt-1">Read transition tips and nutritional guides.</p>
          </Link>
        </div>

      </div>
    </div>
  );
}

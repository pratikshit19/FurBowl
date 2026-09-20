'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PawPrint, Heart, Package, Home, Target, BookOpen, ArrowRight, User } from 'lucide-react';
import useAuthStore from '@/store/authStore';
import useAuthModalStore from '@/store/authModalStore';

const CORE_RECIPES = [
  {
    name: 'Chicken Harvest',
    slug: 'chicken-harvest',
    price: 179,
    size: '100g Pouch',
    image: '/images/products/chicken-harvest-front.jpg',
    description: 'Farm fresh chicken, garden carrots, pumpkin & spinach — protein-packed daily nourishment.',
  },
  {
    name: 'Chicken Homestyle',
    slug: 'chicken-homestyle',
    price: 189,
    size: '100g Pouch',
    image: '/images/products/chicken-homestyle-front.jpg',
    description: 'Tender simmered chicken, sweet potato & peas — gentle on sensitive stomachs.',
  },
  {
    name: 'Golden Egg & Quinoa',
    slug: 'golden-egg-quinoa',
    price: 189,
    size: '100g Pouch',
    image: '/images/products/golden-egg-quinoa-front.jpg',
    description: 'Farm eggs, ancient Andean quinoa, and pumpkin — perfect for next week’s superfood energy boost.',
  },
  {
    name: 'Paneer & Greens',
    slug: 'paneer-greens',
    price: 179,
    size: '100g Pouch',
    image: '/images/products/paneer-greens-front.jpg',
    description: 'Fresh dairy paneer, spinach & peas — rich in calcium and vegetarian goodness.',
  },
  {
    name: 'Lamb Lentil Harvest',
    slug: 'lamb-lentil-harvest',
    price: 219,
    size: '100g Pouch',
    image: '/images/products/lamb-lentil-harvest-front.jpg',
    description: 'Slow-cooked lamb with sprouted lentils & zucchini for peak stamina and muscle recovery.',
  },
  {
    name: 'Golden Chicken Broth',
    slug: 'golden-chicken-broth',
    price: 149,
    size: '200ml Bottle',
    image: '/images/products/golden-chicken-broth-front.jpg',
    description: 'Slow-simmered bone broth packed with collagen, turmeric, and joint support.',
  },
];

export default function AccountPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [hydrated, setHydrated] = useState(false);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [dogName, setDogName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    useAuthStore.persist.rehydrate();
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    const token = useAuthStore.getState().token;
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://furbowl.onrender.com/api/v1';
    fetch(`${API_URL}/orders/stats`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.stats) {
          setStats(data.stats);
          useAuthStore.getState().updateUser({
            mostOrderedProduct: data.stats.mostOrderedProduct,
            lastOrderDate: data.stats.lastOrderDate,
            lastOrderSummary: data.stats.lastOrderSummary,
            lastOrderStatus: data.stats.lastOrderStatus,
          });
        }
      })
      .catch((err) => console.error('Failed to load order stats:', err));
  }, [isAuthenticated]);

  useEffect(() => {
    if (user?.name) setName(user.name);
    if (user?.dogName) setDogName(user.dogName);
    if (user?.email) setEmail(user.email);
    if (user?.phone) setPhone(user.phone.replace(/^\+91/, '').trim());
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSaving(true);
    try {
      const token = useAuthStore.getState().token;
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://furbowl.onrender.com/api/v1';
      const cleanedPhone = phone.replace(/\D/g, '');
      const payload = {
        name: name.trim(),
        dogName: dogName.trim() || null,
        email: email.trim() || null,
        phone: cleanedPhone || null,
      };
      if (password.trim()) {
        payload.password = password.trim();
      }
      const res = await fetch(`${API_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        useAuthStore.getState().updateUser(data.user || {
          name: name.trim(),
          dogName: dogName.trim() || null,
          email: email.trim() || null,
          phone: cleanedPhone || null,
        });
        if (data.token) {
          useAuthStore.getState().setUser(data.user, data.token);
        }
        setPassword('');
        setEditing(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  // If logged out, never show dashboard or Edit Profile
  if (hydrated && (!isAuthenticated || !user)) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-6 bg-butter-50/40">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 sm:p-10 shadow-lg border border-plum-900/10 text-center animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-peach-50 text-coral-600 mx-auto flex items-center justify-center mb-4 border-2 border-coral-200">
            <User className="w-8 h-8 text-coral-500" />
          </div>
          <h2 className="text-2xl font-bold text-plum-900 tracking-tight mb-2">
            Please Log In
          </h2>
          <p className="text-sm text-plum-900/60 mb-6">
            You must be logged in to view your orders, feeding plans, and profile.
          </p>
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => useAuthModalStore.getState().openAuthModal()}
              className="w-full py-3 px-6 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl shadow-xs transition-colors cursor-pointer text-sm"
            >
              Log In / Sign Up
            </button>
            <Link
              href="/"
              className="block w-full py-2.5 px-4 text-xs font-bold text-plum-900/60 hover:text-plum-900 transition-colors text-center"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const triedNames = new Set(
    (stats?.triedRecipes || []).map((r) => r.toLowerCase().trim())
  );
  const nextRecipe = CORE_RECIPES.find((r) => !triedNames.has(r.name.toLowerCase().trim())) || CORE_RECIPES[0];
  const recipesTriedCount = stats?.recipesTriedCount ?? (stats?.triedRecipes?.length || 0);
  const allTried = recipesTriedCount >= 6;
  const pupName = user?.dogName || 'Your pup';
  const mostOrdered = stats?.mostOrderedProduct || user?.mostOrderedProduct || 'No orders yet';
  const lastOrderText = stats?.lastOrderSummary || user?.lastOrderSummary || 'No orders yet';

  return (
    <div className="min-h-screen bg-butter-50/40 py-10 sm:py-16">
      <div className="container-main max-w-5xl">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-teal-600 bg-teal-500/10 px-3 py-1 rounded-full inline-block mb-2">
              The FurBowl Pack Member
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-plum-900 tracking-tight">
              Welcome, {user?.name || 'Pack Member'}!
            </h1>
            <p className="text-sm text-plum-900/60 font-normal mt-1">
              Here is {user?.name ? `${user.name}’s` : 'your'} FurBowl dashboard. Track most ordered bowls, nutrition milestones, and deliveries.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setEditing((prev) => !prev)}
              className="text-xs text-teal-600 hover:text-teal-700 font-bold px-4 py-2 border border-teal-200 rounded bg-white shadow-2xs cursor-pointer transition-colors"
            >
              {editing ? 'Cancel' : 'Edit Profile'}
            </button>
            <button
              onClick={() => {
                logout();
                router.push('/');
              }}
              className="text-xs text-peach-700 hover:text-peach-800 font-bold px-4 py-2 border border-peach-200 rounded bg-white shadow-2xs cursor-pointer transition-colors"
            >
              Log Out
            </button>
          </div>
        </div>

        {/* Profile Edit Panel */}
        {editing && (
          <form onSubmit={handleSave} className="bg-white rounded-3xl border-2 border-teal-500/20 p-6 shadow-sm mb-8 space-y-4">
            <h3 className="text-base font-extrabold text-plum-900">Edit Your Profile</h3>
            <div className="max-w-md space-y-3">
              <div>
                <label className="block text-xs font-bold text-plum-900/70 mb-1">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full border border-plum-900/15 rounded-xl px-4 py-2.5 text-sm text-plum-900 focus:outline-none focus:border-teal-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-plum-900/70 mb-1">Pup's Name</label>
                <input
                  type="text"
                  value={dogName}
                  onChange={(e) => setDogName(e.target.value)}
                  placeholder="e.g. Bruno, Max, Bella"
                  className="w-full border border-plum-900/15 rounded-xl px-4 py-2.5 text-sm text-plum-900 focus:outline-none focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-plum-900/70 mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full border border-plum-900/15 rounded-xl px-4 py-2.5 text-sm text-plum-900 focus:outline-none focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-plum-900/70 mb-1">Mobile Number</label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-sm font-bold text-plum-900/50 select-none">
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="10-digit number"
                    className="w-full pl-12 pr-4 py-2.5 border border-plum-900/15 rounded-xl text-sm text-plum-900 focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-plum-900/70">Set Password</label>
                  <span className="text-[10px] text-plum-900/50">Leave blank to keep unchanged</span>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="•••••••• (min 6 characters)"
                  className="w-full border border-plum-900/15 rounded-xl px-4 py-2.5 text-sm text-plum-900 focus:outline-none focus:border-teal-500"
                />
              </div>
              <button
                type="submit"
                disabled={saving || !name.trim()}
                className="bg-teal-500 hover:bg-teal-600 text-white font-bold text-xs px-6 py-2.5 rounded transition-all shadow-xs cursor-pointer disabled:opacity-50"
              >
                {saving ? 'Saving…' : 'Save Profile'}
              </button>
            </div>
          </form>
        )}

        {/* Pup Profile Main Card (Matching Screen 12) */}
        <div className="bg-white rounded-3xl border-2 border-plum-900/10 p-6 sm:p-8 shadow-sm mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left: Dog Avatar & Details */}
            <div className="lg:col-span-7 flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
              <div className="relative w-28 h-28 shrink-0 rounded-full overflow-hidden border-4 border-butter-200 shadow-md">
                <Image
                  src="/images/home/bruno-passport-dog.jpg"
                  alt={pupName}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                  <h2 className="text-2xl font-bold text-plum-900">{pupName}</h2>
                  <span className="inline-flex items-center gap-1 text-xs font-bold bg-coral-500/10 text-coral-600 px-2.5 py-0.5 rounded-full">
                    <span>Food Explorer</span>
                    <PawPrint className="w-3 h-3" />
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-plum-900/70 font-medium mb-4">
                  <p className="flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-coral-500 shrink-0 inline" />
                    <span>Most ordered: <span className="font-bold text-plum-900">{mostOrdered}</span></span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5 text-amber-600 shrink-0 inline" />
                    <span>Last order: <span className="font-bold text-plum-900">{lastOrderText}</span></span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-teal-600 shrink-0 inline" />
                    <span>Name: <span className="font-bold text-plum-900">{user?.name || 'Customer'}</span></span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Home className="w-3.5 h-3.5 text-teal-600 shrink-0 inline" />
                    <span>Account: <span className="font-bold text-plum-900">{user?.phone ? (user.phone.startsWith('+91') ? user.phone : `+91 ${user.phone}`) : 'Verified Pack Member'}</span></span>
                  </p>
                </div>

                {/* Progress: Recipes Tried */}
                <div className="max-w-xs">
                  <div className="flex items-center justify-between text-xs font-bold text-plum-900 mb-1.5">
                    <span>Recipes tried</span>
                    <span className="text-coral-600">{recipesTriedCount} / 6</span>
                  </div>
                  <div className="w-full h-2.5 bg-plum-900/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-coral-500 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, Math.round((recipesTriedCount / 6) * 100))}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: "What's next?" Card (Matching Screen 12) */}
            <div className="lg:col-span-5 bg-butter-50 rounded-2xl border border-plum-900/10 p-5 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-coral-600">
                  What’s next?
                </span>
                <h3 className="text-base font-bold text-plum-900 mt-1 mb-2">
                  {allTried
                    ? `${pupName} has tried all 6 fresh recipes! 🎉`
                    : `${pupName} hasn’t tried ${nextRecipe.name} yet!`}
                </h3>
                <p className="text-xs text-plum-900/60 leading-relaxed mb-4">
                  {allTried
                    ? `Keep ${pupName} thriving with a fresh monthly subscription or explore all recipes.`
                    : nextRecipe.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-plum-900/10">
                <div className="flex items-center gap-2">
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white border border-plum-900/10">
                    <Image
                      src={nextRecipe.image}
                      alt={nextRecipe.name}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-plum-900">₹{nextRecipe.price}</div>
                    <div className="text-[10px] text-plum-900/50">{nextRecipe.size}</div>
                  </div>
                </div>

                <Link
                  href={`/shop/${nextRecipe.slug}`}
                  className="bg-coral-500 hover:bg-coral-600 text-white font-bold text-xs px-5 py-2 rounded shadow-sm transition-all inline-flex items-center gap-1"
                >
                  <span>{allTried ? 'Reorder' : 'Try Now'}</span>
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

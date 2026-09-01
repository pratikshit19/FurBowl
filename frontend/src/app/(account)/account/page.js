'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/authStore';
import Link from 'next/link';

export default function AccountPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    useAuthStore.persist.rehydrate();
  }, []);

  return (
    <div className="section-padding bg-gray-50/50">
      <div className="container-main max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
            <p className="text-gray-500 text-sm mt-1">
              Welcome back{user?.name ? `, ${user.name}` : ''}!
            </p>
          </div>
          <button
            onClick={() => { logout(); router.push('/'); }}
            className="text-sm text-red-600 hover:text-red-700 font-medium px-4 py-2 border border-red-200 rounded-lg bg-white"
          >
            Log Out
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Card 1: Orders */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="text-3xl mb-3">📦</div>
              <h3 className="font-bold text-gray-900 mb-1">My Orders</h3>
              <p className="text-xs text-gray-500">Track current orders and view past purchases.</p>
            </div>
            <Link href="/account/orders" className="mt-6 text-turquoise-600 font-semibold text-sm hover:underline">
              View Orders →
            </Link>
          </div>

          {/* Card 2: Saved Addresses */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="text-3xl mb-3">🏡</div>
              <h3 className="font-bold text-gray-900 mb-1">Addresses</h3>
              <p className="text-xs text-gray-500">Manage saved delivery addresses.</p>
            </div>
            <span className="mt-6 text-gray-400 text-xs font-medium">Saved during checkout</span>
          </div>

          {/* Card 3: Profile Info */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="text-3xl mb-3">👤</div>
              <h3 className="font-bold text-gray-900 mb-1">Profile Details</h3>
              <p className="text-xs text-gray-500">Phone: +91 {user?.phone || 'Not set'}</p>
            </div>
            <span className="mt-6 text-turquoise-600 font-semibold text-xs">Phone Verified ✓</span>
          </div>
        </div>
      </div>
    </div>
  );
}

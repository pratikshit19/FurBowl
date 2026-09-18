'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useCartStore from '@/store/cartStore';
import { Home, Search, LayoutGrid, ShoppingCart, RotateCcw, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const cartCount = useCartStore((state) => state.getItemCount());

  useEffect(() => {
    setHydrated(true);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navItems = [
    {
      label: 'Home',
      href: '/',
      icon: Home,
      isActive: pathname === '/',
    },
    {
      label: 'Search',
      isAction: true,
      onClick: () => setSearchOpen(true),
      icon: Search,
      isActive: searchOpen,
    },
    {
      label: 'Shop',
      href: '/shop',
      icon: LayoutGrid,
      isActive: pathname.startsWith('/shop'),
    },
    {
      label: 'Cart',
      isAction: true,
      onClick: () => useCartStore.getState().openDrawer(),
      icon: ShoppingCart,
      isCart: true,
      isActive: pathname === '/cart',
    },
    {
      label: 'Reorder',
      href: '/plans',
      icon: RotateCcw,
      isActive: pathname === '/plans' || pathname.startsWith('/account'),
    },
  ];

  return (
    <>
      {/* Mobile Search Modal Drawer */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setSearchOpen(false)}
          />

          {/* Search Sheet */}
          <div className="relative z-10 bg-white rounded-t-3xl p-5 shadow-2xl border-t border-plum-900/10 max-h-[80vh] overflow-y-auto">
            <div className="w-12 h-1.5 bg-plum-900/20 rounded-full mx-auto mb-4" />
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-plum-900">Search FurBowl</h3>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="w-8 h-8 rounded-full bg-cream-100 flex items-center justify-center text-plum-900 hover:bg-cream-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-plum-900/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search fresh meals, broths..."
                  autoFocus
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-cream-100/70 border border-plum-900/10 text-sm font-medium text-plum-900 placeholder:text-plum-900/40 focus:outline-none focus:border-teal-500"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-3 rounded bg-teal-500 text-white font-bold text-sm hover:bg-teal-600 transition-colors shrink-0"
              >
                Search
              </button>
            </form>

            <div className="space-y-2">
              <p className="text-[11px] font-bold text-plum-900/50 uppercase tracking-wider">Popular Searches</p>
              <div className="flex flex-wrap gap-2">
                {['Chicken Harvest', 'Lamb & Lentils', 'Trial Packs', 'Monthly Plans', 'Bone Broth'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      router.push(`/shop?q=${encodeURIComponent(tag)}`);
                      setSearchOpen(false);
                    }}
                    className="px-3 py-1.5 rounded bg-cream-100 text-xs font-bold text-plum-900 hover:bg-peach-50 hover:text-peach-600 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fixed Bottom Navigation Bar on Mobile */}
      <nav
        aria-label="Mobile bottom navigation"
        className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white/95 backdrop-blur-md border-t border-plum-900/10 shadow-[0_-4px_24px_rgba(0,0,0,0.06)] rounded-t-2xl pb-[max(0.5rem,env(safe-area-inset-bottom))]"
      >
        <div className="grid grid-cols-5 items-center px-2 py-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const content = (
              <div
                className={`flex flex-col items-center justify-center py-1 transition-colors relative ${
                  item.isActive ? 'text-peach-600 font-bold' : 'text-plum-900/70 hover:text-plum-900'
                }`}
              >
                <div className="relative">
                  <Icon className={`w-5 h-5 transition-transform ${item.isActive ? 'scale-110 stroke-[2.4]' : 'stroke-[1.9]'}`} />
                  {item.isCart && hydrated && cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 px-1 bg-peach-500 text-white text-[10px] font-extrabold rounded-full flex items-center justify-center leading-none shadow-xs">
                      {cartCount > 9 ? '9+' : cartCount}
                    </span>
                  )}
                </div>
                <span className="text-[11px] tracking-tight mt-1 leading-none font-medium">
                  {item.label}
                </span>
                {item.isActive && (
                  <span className="w-1 h-1 rounded-full bg-peach-500 absolute bottom-0 left-1/2 -translate-x-1/2" />
                )}
              </div>
            );

            if (item.isAction) {
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={item.onClick}
                  className="w-full focus:outline-none"
                  aria-label={item.label}
                >
                  {content}
                </button>
              );
            }

            return (
              <Link key={item.label} href={item.href} className="w-full focus:outline-none" aria-label={item.label}>
                {content}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { User } from 'lucide-react';
import { NAV_LINKS, PRODUCTS_NAV, SITE_NAME } from '@/lib/constants';
import MobileNav from './MobileNav';
import SearchDrawer from './SearchDrawer';
import useCartStore from '@/store/cartStore';
import useAuthStore from '@/store/authStore';
import useWishlistStore from '@/store/wishlistStore';
import useAuthModalStore from '@/store/authModalStore';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { openAuthModal } = useAuthModalStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [contactDropdownOpen, setContactDropdownOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [searchDrawerOpen, setSearchDrawerOpen] = useState(false);

  // Rehydrate stores on mount
  useEffect(() => {
    if (useCartStore.persist?.rehydrate) {
      useCartStore.persist.rehydrate();
    } else if (typeof window !== 'undefined') {
      useCartStore.getState().setUserScope(useAuthStore.getState().user?.id || null);
    }
    if (useAuthStore.persist?.rehydrate) {
      useAuthStore.persist.rehydrate();
    }
    useWishlistStore.getState().setUserScope(useAuthStore.getState().user?.id || null);
    setHydrated(true);
  }, []);

  const cartCount = useCartStore((s) => s.getItemCount());
  const wishlistCount = useWishlistStore((s) => s.getItemCount());
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileNavOpen(false);
    setProductsDropdownOpen(false);
    setContactDropdownOpen(false);
    setSearchDrawerOpen(false);
  }, [pathname]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim() && !selectedCategory) return;
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set('search', searchQuery.trim());
    if (selectedCategory) params.set('category', selectedCategory);
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-shadow duration-200 bg-white border-b border-plum-900/10 ${
          scrolled ? 'shadow-md' : ''
        }`}
      >
        {/* Top Announcement Bar */}
        <div
          className={`bg-[#15aec0] text-white text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 ease-in-out overflow-hidden ${
            scrolled ? 'max-h-0 py-0 opacity-0' : 'max-h-12 py-2 px-4 opacity-100'
          }`}
        >
          <div className="container-main flex items-center justify-center text-center">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-butter-100 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.25h2.25c.427 0 .831.18 1.117.495l2.25 2.54m-5.617-3.035H12m-9 0h9" />
              </svg>
              <span>Free shipping on orders above ₹499</span>
            </div>
          </div>
        </div>

        {/* Main Middle Row (Logo, Navigation Links, Account & Cart) */}
        <div className="container-main py-1.5 sm:py-2">
          {/* Mobile Header Row (lg:hidden) — Left Menu, Centered Logo, Right Search & Cart */}
          <div className="flex lg:hidden items-center justify-between gap-2 py-1">
            {/* Left: Hamburger Menu Button (opens bottom drawer) */}
            <button
              type="button"
              className="flex items-center justify-center w-10 h-10 -ml-1.5 rounded-full text-plum-900 hover:text-peach-600 active:scale-95 transition-all"
              onClick={() => setMobileNavOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileNavOpen}
            >
              <svg className="w-7 h-7 stroke-[2.2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
              </svg>
            </button>

            {/* Center: FurBowl Logo */}
            <Link href="/" className="flex items-center justify-center py-1" aria-label={`${SITE_NAME} - Home`}>
              <Image
                src="/images/LOGO2.png"
                alt={SITE_NAME}
                width={180}
                height={70}
                priority
                unoptimized
                className="h-12 sm:h-14 w-auto object-contain"
              />
            </Link>

            {/* Right: Search & Cart Icons (Increased size for mobile touch and visibility) */}
            <div className="flex items-center gap-1.5 sm:gap-2 -mr-1">
              <button
                type="button"
                onClick={() => setSearchDrawerOpen(true)}
                className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full text-plum-900 hover:text-teal-600 active:scale-95 transition-all cursor-pointer"
                aria-label="Search products"
              >
                <svg className="w-6 h-6 sm:w-6.5 sm:h-6.5 stroke-[2.2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => useCartStore.getState().openDrawer()}
                className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full text-plum-900 hover:text-teal-600 relative active:scale-95 transition-all cursor-pointer"
                aria-label={`Cart${hydrated && cartCount > 0 ? ` (${cartCount} items)` : ''}`}
              >
                <svg className="w-6.5 h-6.5 sm:w-7 sm:h-7 stroke-[2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
                </svg>
                {hydrated && cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[19px] h-5 px-1 bg-peach-500 text-white text-[11px] font-extrabold rounded-full flex items-center justify-center leading-none shadow-xs">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Desktop Header Row (hidden lg:flex) */}
          <div className="hidden lg:flex items-center justify-between gap-4 md:gap-8">
            
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center py-1" aria-label={`${SITE_NAME} - Home`}>
              <Image
                src="/images/LOGO2.png"
                alt={SITE_NAME}
                width={240}
                height={190}
                priority
                unoptimized
                className="h-16 sm:h-18 lg:h-20 xl:h-22 w-auto object-contain"
              />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8 2xl:gap-10" aria-label="Main navigation">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));

                if (link.hasDropdown) {
                  return (
                    <div
                      key={link.href}
                      className="relative"
                      onMouseEnter={() => setProductsDropdownOpen(true)}
                      onMouseLeave={() => setProductsDropdownOpen(false)}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setProductsDropdownOpen(false)}
                        className={`inline-flex items-center gap-1.5 text-[17.5px] xl:text-[18.5px] font-semibold transition-colors hover:text-peach-600 ${
                          isActive || productsDropdownOpen ? 'text-peach-600' : 'text-plum-900'
                        }`}
                      >
                        <span>{link.label}</span>
                        <svg
                          className={`w-4 h-4 text-plum-900/50 transition-transform duration-200 ${
                            productsDropdownOpen ? 'rotate-180 text-peach-600' : ''
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </Link>

                      {/* Dropdown Menu Panel */}
                      <div
                        className={`absolute top-full left-0 w-[280px] bg-white border border-plum-900/10 rounded-lg shadow-xl p-3 transition-all duration-200 z-50 transform origin-top-left ${
                          productsDropdownOpen
                            ? 'opacity-100 visible translate-y-1'
                            : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                        }`}
                      >
                        <div className="flex items-center justify-between pb-2.5 mb-1.5 border-b border-plum-900/5 px-2">
                          <span className="text-xs font-semibold uppercase tracking-widest text-plum-900/50">Our Fresh Dog Meals</span>
                          <Link
                            href="/shop"
                            onClick={() => setProductsDropdownOpen(false)}
                            className="text-xs font-bold text-peach-600 hover:text-plum-900 transition-colors flex items-center gap-1"
                          >
                            View All <span>→</span>
                          </Link>
                        </div>

                        <div className="space-y-0.5">
                          {PRODUCTS_NAV.map((product) => (
                            <Link
                              key={product.slug}
                              href={`/shop/${product.slug}`}
                              onClick={() => setProductsDropdownOpen(false)}
                              className="block px-3 py-2 rounded-md hover:bg-teal-50 transition-colors group/item"
                            >
                              <span className="text-[15px] font-semibold text-plum-900 group-hover/item:text-teal-600 transition-colors truncate block">
                                {product.name}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-[17.5px] xl:text-[18.5px] font-semibold transition-colors hover:text-peach-600 ${
                      isActive ? 'text-peach-600' : 'text-plum-900'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Center Search Bar Widget (Commented out — easily uncomment to restore)
            <form
              onSubmit={handleSearchSubmit}
              className="hidden md:flex flex-1 max-w-2xl lg:max-w-3xl items-stretch h-11 border border-plum-900/15 rounded-md bg-white shadow-xs transition-all overflow-hidden focus-within:border-plum-900/15 focus-within:ring-0 focus-within:outline-none"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search fresh meals, broth..."
                className="flex-1 px-4 text-sm text-plum-900 placeholder-plum-900/40 bg-transparent outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus:border-transparent h-full"
              />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{ outline: 'none', boxShadow: 'none' }}
                className="text-xs font-medium text-plum-900/70 bg-plum-900/[0.03] border-l border-gray-200 px-3 outline-none focus:outline-none focus:ring-0 focus-visible:outline-none cursor-pointer h-full border-y-0"
              >
                <option value="">All categories</option>
                <option value="meals">Fresh Meals</option>
                <option value="broth">Bone Broth</option>
              </select>
              <button
                type="submit"
                className="bg-coral-500 hover:bg-coral-600 text-white px-5 flex items-center justify-center transition-colors shrink-0 h-full self-stretch border-none outline-none focus:outline-none focus:ring-0 focus-visible:outline-none"
                aria-label="Search"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </button>
            </form>
            */}

            {/* Right Actions */}
            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              
              {/* Search Button -> Opens Right Slide-Out Search Drawer */}
              <button
                type="button"
                onClick={() => setSearchDrawerOpen(true)}
                className="relative flex items-center justify-center w-10 h-10 rounded-full text-plum-900 hover:text-teal-600 hover:bg-plum-900/5 transition-colors cursor-pointer"
                aria-label="Search products"
                title="Search products"
              >
                <svg className="w-6 h-6 stroke-[2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </button>

              {/* Account Quick Login Button -> Opens Centered Auth Modal */}
              <button
                type="button"
                onClick={openAuthModal}
                className="relative flex items-center justify-center w-10 h-10 rounded-full text-plum-900 hover:text-coral-500 hover:bg-plum-900/5 transition-colors cursor-pointer focus:outline-none"
                aria-label="Account profile"
              >
                <User className="w-6 h-6 stroke-[2]" />
              </button>

              {/* Wishlist Icon */}
              <Link
                href="/wishlist"
                className="relative flex items-center justify-center w-10 h-10 rounded-full text-plum-900 hover:text-peach-600 hover:bg-plum-900/5 transition-colors"
                aria-label={`Wishlist${hydrated && wishlistCount > 0 ? ` (${wishlistCount} items)` : ''}`}
              >
                <svg className={`w-6 h-6 stroke-[2] ${hydrated && wishlistCount > 0 ? 'text-coral-600 fill-coral-50' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </Link>

              {/* Cart Button (Icon + Counter + "Cart" text) */}
              <button
                type="button"
                onClick={() => useCartStore.getState().openDrawer()}
                className="flex items-center gap-2.5 px-3 py-2 rounded text-plum-900 hover:text-teal-600 hover:bg-plum-900/5 transition-all group cursor-pointer"
                aria-label={`Cart${hydrated && cartCount > 0 ? ` (${cartCount} items)` : ''}`}
              >
                <div className="relative flex items-center justify-center">
                  <svg className="w-7 h-7 text-plum-900 group-hover:text-teal-600 transition-colors stroke-[2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
                  </svg>
                  {hydrated && cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 min-w-[18px] h-4.5 px-1 bg-peach-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none shadow-xs">
                      {cartCount > 9 ? '9+' : cartCount}
                    </span>
                  )}
                </div>
                <span className="text-[17.5px] font-semibold text-plum-900 group-hover:text-teal-600 transition-colors hidden sm:inline">
                  Cart
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Horizontal Navigation Row (Commented out — navigation is now integrated into primary header row)
        <div className="bg-white">
          <div className="container-main">
            ...
          </div>
        </div>
        */}
      </header>

      <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
      <SearchDrawer isOpen={searchDrawerOpen} onClose={() => setSearchDrawerOpen(false)} />
    </>
  );
}

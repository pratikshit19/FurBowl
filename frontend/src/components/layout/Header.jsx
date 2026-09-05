'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { NAV_LINKS, PRODUCTS_NAV, SITE_NAME } from '@/lib/constants';
import MobileNav from './MobileNav';
import useCartStore from '@/store/cartStore';
import useAuthStore from '@/store/authStore';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const accountRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Quick Login state inside popover
  const [quickPhone, setQuickPhone] = useState('');
  const [quickOtp, setQuickOtp] = useState('');
  const [quickStep, setQuickStep] = useState('phone'); // 'phone' | 'otp'
  const [quickLoading, setQuickLoading] = useState(false);
  const [quickError, setQuickError] = useState('');

  // Rehydrate stores on mount
  useEffect(() => {
    useCartStore.persist.rehydrate();
    useAuthStore.persist.rehydrate();
    setHydrated(true);
  }, []);

  const cartCount = useCartStore((s) => s.getItemCount());
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close account dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setAccountDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileNavOpen(false);
    setProductsDropdownOpen(false);
    setAccountDropdownOpen(false);
  }, [pathname]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim() && !selectedCategory) return;
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set('search', searchQuery.trim());
    if (selectedCategory) params.set('category', selectedCategory);
    router.push(`/shop?${params.toString()}`);
  };

  const handleQuickSendOtp = async (e) => {
    e.preventDefault();
    const cleaned = quickPhone.replace(/\D/g, '');
    if (cleaned.length !== 10) {
      setQuickError('Enter valid 10-digit number');
      return;
    }
    setQuickLoading(true); setQuickError('');
    try {
      const res = await fetch(`${API_URL}/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: cleaned }),
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send OTP');
      setQuickStep('otp');
    } catch (err) {
      setQuickError(err.message);
    } finally {
      setQuickLoading(false);
    }
  };

  const handleQuickVerifyOtp = async (e) => {
    e.preventDefault();
    const cleanedPhone = quickPhone.replace(/\D/g, '');
    const cleanedOtp = quickOtp.replace(/\D/g, '');
    if (cleanedOtp.length !== 6) {
      setQuickError('Enter 6-digit OTP');
      return;
    }
    setQuickLoading(true); setQuickError('');
    try {
      const res = await fetch(`${API_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: cleanedPhone, otp: cleanedOtp }),
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Invalid OTP');
      useAuthStore.getState().setUser(data.user, data.token);
      setAccountDropdownOpen(false);
      setQuickStep('phone');
      setQuickPhone('');
      setQuickOtp('');
    } catch (err) {
      setQuickError(err.message);
    } finally {
      setQuickLoading(false);
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-shadow duration-200 bg-white border-b border-plum-900/10 ${
          scrolled ? 'shadow-md' : ''
        }`}
      >
        {/* Top Announcement Bar */}
        <div className="bg-plum-900 text-white text-xs sm:text-sm font-normal tracking-wide py-2 px-4">
          <div className="container-main flex items-center justify-center text-center">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-butter-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.25h2.25c.427 0 .831.18 1.117.495l2.25 2.54m-5.617-3.035H12m-9 0h9" />
              </svg>
              <span>Free shipping on orders above ₹499</span>
            </div>
          </div>
        </div>

        {/* Main Middle Row (Logo, Search Bar, Account & Cart) */}
        <div className="container-main py-3.5">
          <div className="flex items-center justify-between gap-4 md:gap-8">
            
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center" aria-label={`${SITE_NAME} - Home`}>
              <Image
                src="/images/dark-logo.png"
                alt={SITE_NAME}
                width={160}
                height={48}
                priority
                unoptimized
                className="h-11 sm:h-12 w-auto object-contain"
              />
            </Link>

            {/* Center Search Bar Widget */}
            <form
              onSubmit={handleSearchSubmit}
              className="hidden md:flex flex-1 max-w-xl items-stretch h-11 border border-plum-900/15 rounded-xl bg-white shadow-xs transition-all overflow-hidden focus-within:border-plum-900/15 focus-within:ring-0 focus-within:outline-none"
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
                className="text-xs font-semibold text-plum-900/70 bg-plum-900/[0.03] border-l border-gray-200 focus:border-l-gray-200 px-3 outline-none focus:outline-none focus:ring-0 focus-visible:outline-none cursor-pointer h-full border-y-0"
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

            {/* Right Actions */}
            <div className="flex items-center gap-3 sm:gap-5">
              
              {/* Account Quick Login Dropdown */}
              <div className="relative hidden sm:block" ref={accountRef}>
                <button
                  type="button"
                  onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                  className="flex flex-col text-left group cursor-pointer focus:outline-none"
                  aria-expanded={accountDropdownOpen}
                >
                  <span className="text-[11px] font-medium text-plum-900/50 leading-none">
                    {hydrated && isAuthenticated ? 'Welcome' : 'Login / Signup'}
                  </span>
                  <span className="text-xs font-bold text-plum-900 group-hover:text-coral-500 transition-colors flex items-center gap-1 mt-0.5">
                    {hydrated && isAuthenticated ? user?.name?.split(' ')[0] || 'My Account' : 'My account'}
                    <svg
                      className={`w-3.5 h-3.5 text-plum-900/40 group-hover:text-coral-500 transition-transform duration-200 ${
                        accountDropdownOpen ? 'rotate-180 text-coral-500' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </button>

                {/* Dropdown Modal Panel */}
                <div
                  className={`absolute right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 top-full mt-3 w-80 bg-white border border-plum-900/10 rounded-3xl shadow-2xl p-6 transition-all duration-200 z-50 ${
                    accountDropdownOpen
                      ? 'opacity-100 visible translate-y-0'
                      : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                  }`}
                >
                  {/* Pointer Triangle Arrow */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-t border-l border-plum-900/10" />

                  {hydrated && isAuthenticated ? (
                    /* Logged-In Menu */
                    <div className="relative z-10 space-y-3">
                      <div className="flex items-center gap-3 pb-3 border-b border-plum-900/10">
                        <div className="w-10 h-10 rounded-full bg-butter-300 text-plum-900 font-extrabold flex items-center justify-center text-sm shadow-xs">
                          {user?.name?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-plum-900">{user?.name || 'Customer'}</p>
                          <p className="text-[11px] text-plum-900/60">{user?.phone || user?.email}</p>
                        </div>
                      </div>

                      <div className="space-y-1 pt-1">
                        <Link
                          href="/account"
                          onClick={() => setAccountDropdownOpen(false)}
                          className="flex items-center justify-between px-3 py-2 text-xs font-bold text-plum-900 hover:bg-[#faf6ed] rounded-xl transition-colors"
                        >
                          <span>My Dashboard</span>
                          <span>→</span>
                        </Link>
                        <button
                          onClick={() => {
                            logout();
                            setAccountDropdownOpen(false);
                          }}
                          className="w-full flex items-center justify-between px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                        >
                          <span>Logout</span>
                          <span>↳</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Unauthenticated Quick Login Form */
                    <div className="relative z-10">
                      <h3 className="text-base font-extrabold text-plum-900 text-center mb-1">
                        Login to my account
                      </h3>
                      <p className="text-xs text-plum-900/60 text-center mb-5">
                        {quickStep === 'phone'
                          ? 'Enter your mobile number to receive OTP:'
                          : `Enter OTP sent to +91 ${quickPhone}:`}
                      </p>

                      {quickStep === 'phone' ? (
                        <form onSubmit={handleQuickSendOtp} className="space-y-3">
                          <div className="flex rounded-xl border border-plum-900/15 focus-within:border-coral-500 focus-within:ring-1 focus-within:ring-coral-500/30 transition-all bg-white overflow-hidden">
                            <div className="flex items-center bg-plum-900/5 px-3 text-xs text-plum-900/70 font-bold border-r border-plum-900/10">
                              +91
                            </div>
                            <input
                              type="tel"
                              inputMode="numeric"
                              maxLength={10}
                              value={quickPhone}
                              onChange={(e) => setQuickPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                              placeholder="Mobile number"
                              className="w-full px-3 py-2.5 text-xs text-plum-900 font-medium placeholder-plum-900/30 focus:outline-none"
                              required
                            />
                          </div>

                          {quickError && (
                            <p className="text-[11px] text-rose-500 font-semibold text-center">{quickError}</p>
                          )}

                          <button
                            type="submit"
                            disabled={quickLoading || quickPhone.length !== 10}
                            className="w-full bg-coral-500 hover:bg-coral-600 text-white font-extrabold text-xs py-3 rounded-xl transition-all shadow-md shadow-coral-500/20 disabled:opacity-50"
                          >
                            {quickLoading ? 'Sending OTP…' : 'Login'}
                          </button>
                        </form>
                      ) : (
                        <form onSubmit={handleQuickVerifyOtp} className="space-y-3">
                          <input
                            type="text"
                            inputMode="numeric"
                            maxLength={6}
                            value={quickOtp}
                            onChange={(e) => setQuickOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                            placeholder="Enter 6-digit OTP"
                            className="w-full text-center tracking-widest px-3 py-2.5 text-sm font-extrabold text-plum-900 border border-plum-900/15 rounded-xl focus:outline-none focus:border-coral-500 focus:ring-1 focus:ring-coral-500/30 transition-all"
                            required
                            autoFocus
                          />

                          {quickError && (
                            <p className="text-[11px] text-rose-500 font-semibold text-center">{quickError}</p>
                          )}

                          <button
                            type="submit"
                            disabled={quickLoading || quickOtp.length !== 6}
                            className="w-full bg-coral-500 hover:bg-coral-600 text-white font-extrabold text-xs py-3 rounded-xl transition-all shadow-md shadow-coral-500/20 disabled:opacity-50"
                          >
                            {quickLoading ? 'Verifying…' : 'Verify & Login'}
                          </button>

                          <button
                            type="button"
                            onClick={() => setQuickStep('phone')}
                            className="w-full text-center text-[11px] font-bold text-plum-900/60 hover:text-coral-500 transition-colors pt-1"
                          >
                            ← Change Mobile Number
                          </button>
                        </form>
                      )}

                      {/* Footer links inside popover */}
                      <div className="mt-5 pt-4 border-t border-plum-900/10 text-center space-y-1">
                        <p className="text-[11px] text-plum-900/60">
                          New customer?{' '}
                          <Link
                            href="/login"
                            onClick={() => setAccountDropdownOpen(false)}
                            className="font-bold text-coral-500 hover:underline"
                          >
                            Create account
                          </Link>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Wishlist Icon */}
              <Link
                href="/wishlist"
                className="flex items-center justify-center w-9 h-9 rounded-full text-plum-900 hover:text-coral-500 hover:bg-plum-900/5 transition-colors"
                aria-label="Wishlist"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </Link>

              {/* Cart Button (Icon + Counter + "Cart" text) */}
              <Link
                href="/cart"
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-plum-900 hover:text-coral-500 hover:bg-plum-900/5 transition-all group"
                aria-label={`Cart${hydrated && cartCount > 0 ? ` (${cartCount} items)` : ''}`}
              >
                <div className="relative flex items-center justify-center">
                  <svg className="w-6 h-6 text-plum-900 group-hover:text-coral-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
                  </svg>
                  {hydrated && cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-coral-500 text-white text-[10px] font-extrabold rounded-full flex items-center justify-center leading-none shadow-xs">
                      {cartCount > 9 ? '9+' : cartCount}
                    </span>
                  )}
                </div>
                <span className="text-xs font-bold text-plum-900 group-hover:text-coral-500 transition-colors hidden sm:inline">
                  Cart
                </span>
              </Link>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full text-plum-900 hover:text-coral-500 hover:bg-plum-900/5 transition-colors"
                onClick={() => setMobileNavOpen(true)}
                aria-label="Open menu"
                aria-expanded={mobileNavOpen}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Horizontal Navigation Row */}
        <div className="bg-white">
          <div className="container-main">
            <nav className="hidden lg:flex items-center justify-center gap-8 py-2.5" aria-label="Main navigation">
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
                        className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold transition-colors hover:text-coral-500 ${
                          isActive || productsDropdownOpen ? 'text-coral-500 font-extrabold' : 'text-plum-900/90'
                        }`}
                      >
                        <span>{link.label}</span>
                        <svg
                          className={`w-3.5 h-3.5 text-plum-900/50 transition-transform duration-200 ${
                            productsDropdownOpen ? 'rotate-180 text-coral-500' : ''
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
                        className={`absolute top-full left-0 w-[360px] bg-white border border-plum-900/10 rounded-2xl shadow-xl p-3.5 transition-all duration-200 z-50 transform origin-top-left ${
                          productsDropdownOpen
                            ? 'opacity-100 visible translate-y-1'
                            : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                        }`}
                      >
                        <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-plum-900/5 px-2">
                          <span className="text-[11px] font-bold uppercase tracking-widest text-plum-900/50">Our Fresh Dog Meals</span>
                          <Link
                            href="/shop"
                            onClick={() => setProductsDropdownOpen(false)}
                            className="text-xs font-bold text-coral-500 hover:text-plum-900 transition-colors flex items-center gap-1"
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
                              className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#faf6ed] transition-colors group/item"
                            >
                              <div className="w-10 h-10 relative rounded-lg bg-[#faf6ed] border border-plum-900/5 overflow-hidden shrink-0 flex items-center justify-center p-1">
                                <Image
                                  src={product.image}
                                  alt={product.name}
                                  fill
                                  className="object-contain p-0.5 group-hover/item:scale-105 transition-transform"
                                  sizes="40px"
                                />
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5 mb-0.5">
                                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${product.isVeg ? 'bg-emerald-500' : 'bg-red-500'}`} />
                                  <h4 className="text-xs font-semibold text-plum-900 group-hover/item:text-coral-500 transition-colors truncate">
                                    {product.name}
                                  </h4>
                                </div>
                                <p className="text-[11px] text-plum-900/50 truncate font-normal">
                                  {product.shortDescription}
                                </p>
                              </div>
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
                    className={`text-xs sm:text-sm font-semibold transition-colors hover:text-coral-500 ${
                      isActive ? 'text-coral-500 font-extrabold' : 'text-plum-900/90'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
    </>
  );
}

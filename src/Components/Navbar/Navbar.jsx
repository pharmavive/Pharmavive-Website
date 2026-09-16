'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useEnquiryCart } from '@/context/EnquiryCartContext';
import {
  IoSearchOutline,
  IoFlaskOutline,
  IoCartOutline,
  IoPersonOutline,
  IoMenuOutline,
  IoCloseOutline,
  IoCallOutline,
  IoMailOutline,
  IoShieldCheckmarkOutline,
  IoArrowForward,
  IoHomeOutline,
  IoInformationCircleOutline,
  IoGitNetworkOutline,
} from 'react-icons/io5';
import MovingGlowButton from '@/Components/UI/MovingGlowButton';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { openCart, totalItems } = useEnquiryCart();
  const { data: session } = useSession();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const searchInputRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor scroll with rAF throttle for butter-smooth header transition
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut (Ctrl+K or Cmd+K) to focus search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
        setTimeout(() => searchInputRef.current?.focus(), 100);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setIsMobileMenuOpen(false);
    }
  };

  const closeMobile = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Main Sticky Header with smooth scroll-elevation transition */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 w-full ${
          isScrolled
            ? 'bg-white/98 backdrop-blur-md border-b border-[#CBD5E1] shadow-md'
            : 'bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] shadow-2xs'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between h-20 gap-2 lg:gap-3 xl:gap-4 w-full">
            {/* Logo: Preserves natural ~3.13:1 aspect ratio with no duplicate plain text */}
            <Link href="/" className="flex items-center group flex-shrink-0" onClick={closeMobile} aria-label="Pharmavive Home">
              <div className="relative h-10 sm:h-14 lg:h-[58px] xl:h-16 w-36 sm:w-48 lg:w-56 xl:w-60 flex-shrink-0">
                <Image
                  src="/logo.png"
                  alt="Pharmavive - Bringing Science To Life"
                  fill
                  sizes="(max-width: 640px) 144px, (max-width: 1024px) 208px, 240px"
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation Links - Clean Direct Single Pages (No Dropdowns) */}
            <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 shrink-0">
              <Link
                href="/"
                prefetch={true}
                className={`relative px-2 xl:px-3 py-1.5 text-xs xl:text-sm rounded-lg transition-colors ${
                  pathname === '/'
                    ? 'text-[#00A389] font-semibold'
                    : 'text-[#0E2358] hover:text-[#00A389] hover:bg-[#EBF7F6] font-medium'
                }`}
              >
                <span>Home</span>
                {pathname === '/' && (
                  <span className="absolute bottom-0 left-2 right-2 h-[2.5px] bg-[#00A389] rounded-full shadow-[0_0_8px_rgba(0,229,190,0.8)]" />
                )}
              </Link>

              <Link
                href="/about"
                prefetch={true}
                className={`relative px-2 xl:px-3 py-1.5 text-xs xl:text-sm rounded-lg transition-colors ${
                  pathname === '/about'
                    ? 'text-[#00A389] font-semibold'
                    : 'text-[#0E2358] hover:text-[#00A389] hover:bg-[#EBF7F6] font-medium'
                }`}
              >
                <span>About Us</span>
                {pathname === '/about' && (
                  <span className="absolute bottom-0 left-2 right-2 h-[2.5px] bg-[#00A389] rounded-full shadow-[0_0_8px_rgba(0,229,190,0.8)]" />
                )}
              </Link>

              <Link
                href="/products"
                prefetch={true}
                className={`relative px-2 xl:px-3 py-1.5 text-xs xl:text-sm rounded-lg transition-colors ${
                  pathname?.startsWith('/products')
                    ? 'text-[#00A389] font-semibold'
                    : 'text-[#0E2358] hover:text-[#00A389] hover:bg-[#EBF7F6] font-medium'
                }`}
              >
                <span>Products</span>
                {pathname?.startsWith('/products') && (
                  <span className="absolute bottom-0 left-2 right-2 h-[2.5px] bg-[#00A389] rounded-full shadow-[0_0_8px_rgba(0,229,190,0.8)]" />
                )}
              </Link>

              <Link
                href="/services"
                prefetch={true}
                className={`relative px-2 xl:px-3 py-1.5 text-xs xl:text-sm rounded-lg transition-colors ${
                  pathname?.startsWith('/services') || pathname === '/synthesis' || pathname === '/analytical'
                    ? 'text-[#00A389] font-semibold'
                    : 'text-[#0E2358] hover:text-[#00A389] hover:bg-[#EBF7F6] font-medium'
                }`}
              >
                <span>Services</span>
                {(pathname?.startsWith('/services') || pathname === '/synthesis' || pathname === '/analytical') && (
                  <span className="absolute bottom-0 left-2 right-2 h-[2.5px] bg-[#00A389] rounded-full shadow-[0_0_8px_rgba(0,229,190,0.8)]" />
                )}
              </Link>

              <Link
                href="/contact"
                prefetch={true}
                className={`relative px-2 xl:px-3 py-1.5 text-xs xl:text-sm rounded-lg transition-colors ${
                  pathname === '/contact'
                    ? 'text-[#00A389] font-semibold'
                    : 'text-[#0E2358] hover:text-[#00A389] hover:bg-[#EBF7F6] font-medium'
                }`}
              >
                <span>Contact Us</span>
                {pathname === '/contact' && (
                  <span className="absolute bottom-0 left-2 right-2 h-[2.5px] bg-[#00A389] rounded-full shadow-[0_0_8px_rgba(0,229,190,0.8)]" />
                )}
              </Link>
            </nav>

            {/* Desktop Search Bar in Empty Center Space */}
            <div className="hidden md:flex flex-1 min-w-[225px] lg:min-w-[245px] max-w-[340px] xl:max-w-[420px] mx-1 xl:mx-3 items-center">
              <form onSubmit={handleSearchSubmit} className="relative w-full">
                <div className="relative flex items-center w-full rounded-full border border-slate-300 bg-slate-50/80 hover:bg-white hover:border-[#00A389]/60 hover:shadow-[0_0_12px_rgba(0,163,137,0.14)] focus-within:bg-white focus-within:border-[#00A389] focus-within:ring-4 focus-within:ring-[#00A389]/20 focus-within:shadow-[0_0_20px_rgba(0,163,137,0.28)] transition-all duration-300 shadow-2xs">
                  <IoSearchOutline size={15} className="text-[#00A389] shrink-0 ml-2.5" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search CAS, Cat No, Compound..."
                    autoComplete="off"
                    spellCheck={false}
                    className={`w-full bg-transparent pl-1.5 ${searchQuery ? 'pr-7' : 'pr-2.5'} py-2 text-[11px] xl:text-xs text-[#0E2358] placeholder:text-[#94A3B8] outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 border-none`}
                    style={{ outline: 'none', boxShadow: 'none' }}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2 p-0.5 text-slate-400 hover:text-slate-600 rounded-full cursor-pointer"
                      aria-label="Clear search"
                    >
                      <IoCloseOutline size={14} />
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Right Action Suite: Search, Profile, Cart Badge & Log In / Sign Up CTA */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              {/* Search Trigger (Mobile only) */}
              <Link
                href="/search"
                prefetch={true}
                className="md:hidden p-2 text-slate-700 hover:text-[#00A389] transition-colors cursor-pointer"
                aria-label="Search catalog"
              >
                <IoSearchOutline size={20} />
              </Link>

              {/* Profile / Account Trigger */}
              <Link
                href={session?.user ? '/profile' : '/admin/signin'}
                prefetch={true}
                className="p-1.5 sm:p-2 text-slate-700 hover:text-[#00A389] transition-colors cursor-pointer"
                aria-label="User account and profile"
                title={session?.user ? `View Profile (${session.user.name || session.user.email})` : 'Log In / Sign Up'}
              >
                <IoPersonOutline size={20} />
              </Link>

              {/* Cart / Quote List Trigger */}
              <button
                type="button"
                onClick={openCart}
                className="relative p-1.5 sm:p-2 text-slate-700 hover:text-[#00A389] transition-colors cursor-pointer group active:scale-95"
                aria-label="View quotation inquiry list"
              >
                <IoCartOutline size={21} className="group-hover:scale-105 transition-transform" />
                <span
                  key={totalItems}
                  className={`absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[17px] h-[17px] px-1 text-[10px] font-mono font-bold text-white bg-[#00A389] rounded-full transition-all ${
                    totalItems > 0 ? 'animate-badge-bounce shadow-[0_0_10px_rgba(0,163,137,0.7)] ring-1 ring-white/60' : ''
                  }`}
                >
                  {totalItems}
                </span>
              </button>

              {/* Desktop Auth Status / Log In / Sign Up Button */}
              <div className="hidden lg:flex items-center gap-2 ml-1">
                {session?.user ? (
                  <>
                    <Link
                      href="/profile"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-[#0f3d3a] border border-emerald-200 text-xs font-semibold transition-colors"
                      title={`View Researcher Profile (${session.user.email})`}
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="max-w-[120px] truncate">{session.user.name || session.user.email}</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => signOut({ callbackUrl: '/' })}
                      className="text-xs text-slate-500 hover:text-red-600 font-medium px-2 py-1 transition-colors cursor-pointer"
                      title="Sign Out"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <MovingGlowButton
                    href="/admin/signin"
                    prefetch={true}
                    variant="teal"
                    innerClassName="!px-3 xl:!px-5 !py-2 !text-xs xl:!text-sm font-semibold whitespace-nowrap"
                  >
                    Log In / Sign Up
                  </MovingGlowButton>
                )}
              </div>

              {/* Mobile Hamburger Menu Toggle */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-100/90 hover:bg-[#00A389]/10 text-[#0E2358] hover:text-[#00A389] border border-slate-200/80 transition-colors shrink-0 cursor-pointer"
                aria-label="Toggle navigation menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <IoCloseOutline size={22} /> : <IoMenuOutline size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-[#E2E8F0] bg-white px-4 py-5 space-y-4 max-h-[85vh] overflow-y-auto shadow-xl">
            {/* Top Auth Banner: Log In / Sign Up or Researcher Status */}
            {session?.user ? (
              <div className="p-3.5 rounded-2xl bg-emerald-50/90 border border-emerald-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-[#0f3d3a] truncate">{session.user.name || 'Researcher'}</p>
                    <p className="text-[11px] text-slate-500 truncate">{session.user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href="/profile"
                    onClick={closeMobile}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-medium hover:bg-emerald-700 transition-colors"
                  >
                    Profile
                  </Link>
                  <button
                    type="button"
                    onClick={() => { closeMobile(); signOut({ callbackUrl: '/' }); }}
                    className="px-2.5 py-1.5 rounded-lg text-slate-600 hover:text-red-600 text-xs font-medium transition-colors cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-teal-50 via-emerald-50 to-slate-50 border border-[#00A389]/25 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#0E2358]">Researcher Portal</p>
                  <p className="text-[11px] text-slate-500">Sign in to track orders &amp; quotes</p>
                </div>
                <Link
                  href="/admin/signin"
                  onClick={closeMobile}
                  className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#00A389] hover:bg-[#078F83] text-white text-xs font-semibold shadow-sm transition-all active:scale-95"
                >
                  <span>Log In / Sign Up</span>
                  <IoArrowForward size={14} />
                </Link>
              </div>
            )}

            {/* Mobile Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search CAS, Cat No, Compound..."
                autoComplete="off"
                spellCheck={false}
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 bg-slate-50/80 focus:bg-white focus:outline-none focus-visible:outline-none focus:border-[#00A389] focus:ring-4 focus:ring-[#00A389]/20 focus:shadow-[0_0_16px_rgba(0,163,137,0.22)] transition-all outline-none"
                style={{ outline: 'none', boxShadow: 'none' }}
              />
              <IoSearchOutline className="absolute left-3 top-3 text-[#00A389]" size={18} />
            </form>

            {/* Navigation Links: Home & other pages */}
            <div className="py-1 space-y-1">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 px-3 pb-1">
                Navigation
              </div>
              <Link
                href="/"
                prefetch={true}
                onClick={closeMobile}
                className={`flex items-center justify-between px-3.5 py-2.5 text-sm rounded-xl transition-colors ${
                  pathname === '/'
                    ? 'text-[#00A389] bg-[#EBF7F6] font-semibold'
                    : 'text-[#0E2358] hover:bg-[#EBF7F6] font-medium'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <IoHomeOutline size={18} className={pathname === '/' ? 'text-[#00A389]' : 'text-slate-400'} />
                  <span>Home</span>
                </div>
                {pathname === '/' && <span className="w-1.5 h-1.5 rounded-full bg-[#00A389]" />}
              </Link>
              <Link
                href="/about"
                prefetch={true}
                onClick={closeMobile}
                className={`flex items-center justify-between px-3.5 py-2.5 text-sm rounded-xl transition-colors ${
                  pathname === '/about'
                    ? 'text-[#00A389] bg-[#EBF7F6] font-semibold'
                    : 'text-[#0E2358] hover:bg-[#EBF7F6] font-medium'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <IoInformationCircleOutline size={18} className={pathname === '/about' ? 'text-[#00A389]' : 'text-slate-400'} />
                  <span>About Us</span>
                </div>
                {pathname === '/about' && <span className="w-1.5 h-1.5 rounded-full bg-[#00A389]" />}
              </Link>
              <Link
                href="/products"
                prefetch={true}
                onClick={closeMobile}
                className={`flex items-center justify-between px-3.5 py-2.5 text-sm rounded-xl transition-colors ${
                  pathname?.startsWith('/products')
                    ? 'text-[#00A389] bg-[#EBF7F6] font-semibold'
                    : 'text-[#0E2358] hover:bg-[#EBF7F6] font-medium'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <IoFlaskOutline size={18} className={pathname?.startsWith('/products') ? 'text-[#00A389]' : 'text-slate-400'} />
                  <span>Products</span>
                </div>
                {pathname?.startsWith('/products') && <span className="w-1.5 h-1.5 rounded-full bg-[#00A389]" />}
              </Link>
              <Link
                href="/services"
                prefetch={true}
                onClick={closeMobile}
                className={`flex items-center justify-between px-3.5 py-2.5 text-sm rounded-xl transition-colors ${
                  pathname?.startsWith('/services') || pathname === '/synthesis' || pathname === '/analytical'
                    ? 'text-[#00A389] bg-[#EBF7F6] font-semibold'
                    : 'text-[#0E2358] hover:bg-[#EBF7F6] font-medium'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <IoGitNetworkOutline size={18} className={pathname?.startsWith('/services') || pathname === '/synthesis' || pathname === '/analytical' ? 'text-[#00A389]' : 'text-slate-400'} />
                  <span>Services</span>
                </div>
                {(pathname?.startsWith('/services') || pathname === '/synthesis' || pathname === '/analytical') && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00A389]" />
                )}
              </Link>
              <Link
                href="/contact"
                prefetch={true}
                onClick={closeMobile}
                className={`flex items-center justify-between px-3.5 py-2.5 text-sm rounded-xl transition-colors ${
                  pathname === '/contact'
                    ? 'text-[#00A389] bg-[#EBF7F6] font-semibold'
                    : 'text-[#0E2358] hover:bg-[#EBF7F6] font-medium'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <IoCallOutline size={18} className={pathname === '/contact' ? 'text-[#00A389]' : 'text-slate-400'} />
                  <span>Contact Us</span>
                </div>
                {pathname === '/contact' && <span className="w-1.5 h-1.5 rounded-full bg-[#00A389]" />}
              </Link>
            </div>

            {/* Institutional Contact & Direct Support */}
            <div className="pt-3 border-t border-[#E2E8F0] space-y-2">
              <p className="text-[10.5px] font-mono uppercase tracking-wider text-[#94A3B8]">
                Direct Inquiries &amp; Support
              </p>
              <div className="flex flex-col gap-2 text-xs">
                <a
                  href="tel:+916302616273"
                  className="flex items-center gap-2 text-[#0E2358] hover:text-[#08A698] font-mono py-1"
                >
                  <IoCallOutline className="text-[#08A698]" size={15} />
                  <span>+91 63026 16273</span>
                </a>
                <a
                  href="mailto:info@pharmavive.com"
                  className="flex items-center gap-2 text-[#0E2358] hover:text-[#08A698] font-mono py-1"
                >
                  <IoMailOutline className="text-[#08A698]" size={15} />
                  <span>info@pharmavive.com</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

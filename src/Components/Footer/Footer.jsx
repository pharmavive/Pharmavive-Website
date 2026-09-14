'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  IoShieldCheckmarkOutline,
  IoFlaskOutline,
  IoGlobeOutline,
  IoLeafOutline,
  IoChevronForward,
  IoMailOutline,
  IoArrowForward,
  IoCheckmarkCircle,
  IoLocationOutline,
  IoCallOutline,
} from 'react-icons/io5';
import {
  FaLinkedinIn,
  FaXTwitter,
  FaDiscord,
  FaYoutube,
} from 'react-icons/fa6';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3500);
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#095E54] via-[#074D45] to-[#053D37] text-slate-100 overflow-hidden text-sm border-t border-[#13756A]">
      {/* Background Ambient Radial Glows */}
      <div className="absolute -left-20 -bottom-20 w-96 h-96 rounded-full bg-[#00D2B4]/15 blur-3xl pointer-events-none" />
      <div className="absolute right-0 top-1/4 w-80 h-80 rounded-full bg-[#08A698]/20 blur-3xl pointer-events-none" />

      {/* Decorative 3D Molecular Lattice SVG Art (Bottom Left) */}
      <div className="absolute -left-12 -bottom-10 w-64 h-64 opacity-25 pointer-events-none">
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
          <line x1="40" y1="160" x2="80" y2="120" stroke="#2DF4D7" strokeWidth="6" strokeLinecap="round" strokeOpacity="0.4" />
          <line x1="80" y1="120" x2="140" y2="140" stroke="#2DF4D7" strokeWidth="6" strokeLinecap="round" strokeOpacity="0.4" />
          <line x1="80" y1="120" x2="70" y2="60" stroke="#2DF4D7" strokeWidth="5" strokeLinecap="round" strokeOpacity="0.4" />
          <circle cx="40" cy="160" r="22" fill="url(#sphereGrad1)" />
          <circle cx="80" cy="120" r="26" fill="url(#sphereGrad2)" />
          <circle cx="140" cy="140" r="20" fill="url(#sphereGrad1)" />
          <circle cx="70" cy="60" r="18" fill="url(#sphereGrad2)" />
          <defs>
            <radialGradient id="sphereGrad1" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#A6FFF5" />
              <stop offset="50%" stopColor="#08A698" />
              <stop offset="100%" stopColor="#043831" />
            </radialGradient>
            <radialGradient id="sphereGrad2" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#80FFF0" />
              <stop offset="50%" stopColor="#00A389" />
              <stop offset="100%" stopColor="#043831" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Decorative 3D Molecular Lattice SVG Art (Right Edge) */}
      <div className="absolute -right-8 top-2 w-72 h-80 opacity-25 pointer-events-none">
        <svg viewBox="0 0 240 320" fill="none" className="w-full h-full">
          <line x1="160" y1="40" x2="190" y2="120" stroke="#2DF4D7" strokeWidth="7" strokeLinecap="round" strokeOpacity="0.4" />
          <line x1="190" y1="120" x2="140" y2="190" stroke="#2DF4D7" strokeWidth="7" strokeLinecap="round" strokeOpacity="0.4" />
          <line x1="140" y1="190" x2="180" y2="270" stroke="#2DF4D7" strokeWidth="6" strokeLinecap="round" strokeOpacity="0.4" />
          <circle cx="160" cy="40" r="28" fill="url(#sphereGradR1)" />
          <circle cx="190" cy="120" r="34" fill="url(#sphereGradR2)" />
          <circle cx="140" cy="190" r="30" fill="url(#sphereGradR1)" />
          <circle cx="180" cy="270" r="26" fill="url(#sphereGradR2)" />
          <defs>
            <radialGradient id="sphereGradR1" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#A6FFF5" />
              <stop offset="50%" stopColor="#08A698" />
              <stop offset="100%" stopColor="#043831" />
            </radialGradient>
            <radialGradient id="sphereGradR2" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#80FFF0" />
              <stop offset="50%" stopColor="#00A389" />
              <stop offset="100%" stopColor="#043831" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Main 4-Column Architectural Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 lg:py-9">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-0">
          {/* Column 1: Brand Logo, Narrative & 4 Trust Badges (lg:col-span-4) */}
          <div className="lg:col-span-4 lg:pr-8 lg:border-r lg:border-[#13756A]/60 flex flex-col justify-between space-y-4">
            <div className="space-y-2.5">
              {/* Official Pharmavive Logo (Clean Logo for Green Background) */}
              <Link href="/" className="inline-block group" aria-label="Pharmavive Home">
                <div className="relative h-11 sm:h-12 w-48 sm:w-56 group-hover:opacity-90 transition-opacity">
                  <Image
                    src="/pharmavive_logo_dark.png"
                    alt="Pharmavive - Bringing Science To Life"
                    fill
                    sizes="(max-width: 640px) 192px, 224px"
                    className="object-contain object-left"
                    priority
                  />
                </div>
              </Link>

              {/* Company Narrative */}
              <p className="text-xs text-emerald-100/80 leading-relaxed max-w-xs">
                Your trusted partner in pharmaceutical products, APIs, intermediates, specialty chemicals and research solutions.
              </p>
            </div>

            {/* 4 Trust Badges Horizontal Row */}
            <div className="pt-1">
              <div className="grid grid-cols-4 gap-2 max-w-xs">
                {/* Badge 1: Quality Assured */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-7 h-7 rounded-full border border-[#1FA99A]/50 bg-[#063B34] flex items-center justify-center text-[#2DF4D7] shadow-xs group-hover:border-[#2DF4D7] group-hover:bg-[#2DF4D7] group-hover:text-[#053D37] transition-all">
                    <IoShieldCheckmarkOutline size={14} />
                  </div>
                  <span className="text-[9px] font-semibold text-emerald-100 leading-tight mt-1">
                    Quality<br />Assured
                  </span>
                </div>

                {/* Badge 2: Global Standards */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-7 h-7 rounded-full border border-[#1FA99A]/50 bg-[#063B34] flex items-center justify-center text-[#2DF4D7] shadow-xs group-hover:border-[#2DF4D7] group-hover:bg-[#2DF4D7] group-hover:text-[#053D37] transition-all">
                    <IoFlaskOutline size={14} />
                  </div>
                  <span className="text-[9px] font-semibold text-emerald-100 leading-tight mt-1">
                    Global<br />Standards
                  </span>
                </div>

                {/* Badge 3: Reliable Supply */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-7 h-7 rounded-full border border-[#1FA99A]/50 bg-[#063B34] flex items-center justify-center text-[#2DF4D7] shadow-xs group-hover:border-[#2DF4D7] group-hover:bg-[#2DF4D7] group-hover:text-[#053D37] transition-all">
                    <IoGlobeOutline size={14} />
                  </div>
                  <span className="text-[9px] font-semibold text-emerald-100 leading-tight mt-1">
                    Reliable<br />Supply
                  </span>
                </div>

                {/* Badge 4: Sustainable Future */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-7 h-7 rounded-full border border-[#1FA99A]/50 bg-[#063B34] flex items-center justify-center text-[#2DF4D7] shadow-xs group-hover:border-[#2DF4D7] group-hover:bg-[#2DF4D7] group-hover:text-[#053D37] transition-all">
                    <IoLeafOutline size={14} />
                  </div>
                  <span className="text-[9px] font-semibold text-emerald-100 leading-tight mt-1">
                    Sustainable<br />Future
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links (lg:col-span-2) */}
          <div className="lg:col-span-2 lg:px-6 lg:border-r lg:border-[#13756A]/60 space-y-2">
            <div>
              <h3 className="font-bold text-white text-xs sm:text-sm tracking-wide">Quick Links</h3>
              <div className="w-5 h-0.5 bg-[#2DF4D7] rounded-full mt-1 mb-2.5 shadow-[0_0_8px_rgba(45,244,215,0.6)]" />
            </div>

            <ul className="space-y-1">
              {[
                { label: 'Home', href: '/' },
                { label: 'About Us', href: '/about' },
                { label: 'Products', href: '/products' },
                { label: 'Services', href: '/synthesis' },
                { label: 'Contact Us', href: '/contact' },
                { label: 'Login / Sign Up', href: '/admin/signin' },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    prefetch={true}
                    className="flex items-center justify-between text-xs text-emerald-100/75 hover:text-white font-medium transition-all py-0.5 group"
                  >
                    <span className="group-hover:translate-x-0.5 transition-transform">{link.label}</span>
                    <IoChevronForward size={10} className="text-emerald-300/40 group-hover:text-[#2DF4D7] group-hover:translate-x-0.5 transition-colors shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Product Categories (lg:col-span-3) */}
          <div className="lg:col-span-3 lg:px-6 lg:border-r lg:border-[#13756A]/60 space-y-2">
            <div>
              <h3 className="font-bold text-white text-xs sm:text-sm tracking-wide">Product Categories</h3>
              <div className="w-5 h-0.5 bg-[#2DF4D7] rounded-full mt-1 mb-2.5 shadow-[0_0_8px_rgba(45,244,215,0.6)]" />
            </div>

            <ul className="space-y-0.5">
              {[
                { label: 'APIs', href: '/products/category/api-impurity-standards' },
                { label: 'Intermediates', href: '/products/category/building-blocks' },
                { label: 'Specialty Chemicals', href: '/products/category/specialty-chemicals' },
                { label: 'Amino Acids', href: '/products/category/peptide-coupling-reagents' },
                { label: 'Peptide', href: '/products/category/peptide-coupling-reagents' },
                { label: 'Peptide Impurity', href: '/products/category/api-impurity-standards' },
                { label: 'Reagents', href: '/products/category/reagents' },
                { label: 'CDMO / Custom Synthesis', href: '/synthesis' },
                { label: 'Impurities', href: '/products/category/nitrosamines' },
              ].map((cat, idx) => (
                <li key={idx}>
                  <Link
                    href={cat.href}
                    prefetch={true}
                    className="flex items-center justify-between text-xs text-emerald-100/75 hover:text-white font-medium transition-all py-0.5 group"
                  >
                    <span className="group-hover:translate-x-0.5 transition-transform">{cat.label}</span>
                    <IoChevronForward size={10} className="text-emerald-300/40 group-hover:text-[#2DF4D7] group-hover:translate-x-0.5 transition-colors shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Stay Connected & Contact Us (lg:col-span-3) */}
          <div className="lg:col-span-3 lg:pl-6 space-y-3.5 relative">
            {/* Stay Connected Sub-block */}
            <div className="space-y-1.5">
              <h3 className="font-bold text-white text-xs sm:text-sm tracking-wide">Stay Connected</h3>
              <p className="text-xs text-emerald-100/80 leading-snug">
                Get the latest updates on new products and research insights.
              </p>

              {/* Newsletter Capsule Input */}
              <form onSubmit={handleSubscribe} className="relative flex items-center rounded-full border border-[#1FA99A]/60 bg-[#063B34]/90 px-3 py-1 focus-within:border-[#2DF4D7] focus-within:ring-2 focus-within:ring-[#2DF4D7]/25 transition-all shadow-inner">
                <IoMailOutline size={14} className="text-[#2DF4D7] shrink-0 mr-2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="bg-transparent text-xs text-white placeholder:text-emerald-200/50 outline-none flex-1 min-w-0"
                  required
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="w-6 h-6 rounded-full bg-[#2DF4D7] hover:bg-white text-[#053D37] font-bold flex items-center justify-center shrink-0 shadow-xs transition-all hover:scale-105 cursor-pointer"
                >
                  {subscribed ? <IoCheckmarkCircle size={13} /> : <IoArrowForward size={11} />}
                </button>
              </form>
              {subscribed && (
                <div className="text-[10px] text-[#2DF4D7] font-medium pl-2">
                  ✓ Thank you for subscribing!
                </div>
              )}
            </div>

            {/* Contact Us & Cursive Script Sub-block (Side by Side) */}
            <div className="pt-2 border-t border-[#13756A]/60">
              <h3 className="font-bold text-white text-xs sm:text-sm mb-1.5 tracking-wide">Contact Us</h3>
              <div className="flex items-center justify-between gap-2">
                {/* Contact items */}
                <div className="space-y-1.5">
                  {/* Email */}
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#063B34] border border-[#1FA99A]/60 flex items-center justify-center text-[#2DF4D7] shrink-0">
                      <IoMailOutline size={12} />
                    </div>
                    <div>
                      <a
                        href="mailto:sales@pharmavive.com"
                        className="block text-[11px] font-bold text-white hover:text-[#2DF4D7] transition-colors leading-tight"
                      >
                        sales@pharmavive.com
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#063B34] border border-[#1FA99A]/60 flex items-center justify-center text-[#2DF4D7] shrink-0">
                      <IoCallOutline size={12} />
                    </div>
                    <div>
                      <a
                        href="tel:+916302616273"
                        className="block text-[11px] font-bold text-white hover:text-[#2DF4D7] transition-colors leading-tight"
                      >
                        +91 63026 16273
                      </a>
                    </div>
                  </div>
                </div>

                {/* Signature Script Callout: "Bringing Science to Life" */}
                <div className="select-none text-right shrink-0 pr-1">
                  <span className="font-serif italic font-bold text-xs sm:text-sm text-[#2DF4D7] tracking-wide rotate-[-5deg] block leading-tight drop-shadow-sm">
                    Bringing <br />
                    <span className="text-white">Science</span> <br />
                    to Life
                  </span>
                  <div className="w-8 h-0.5 bg-[#2DF4D7] rounded-full mt-0.5 ml-auto opacity-75 shadow-[0_0_6px_rgba(45,244,215,0.8)]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Global Locations Strip */}
      <div className="relative z-10 border-t border-[#13756A] bg-[#053831]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 text-xs">
            {/* Corporate Office */}
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#084D44]/70 border border-[#14796E]/70 shadow-xs hover:border-[#2DF4D7]/60 hover:bg-[#0A574E] transition-all">
              <div className="w-7 h-7 rounded-lg bg-[#063B34] border border-[#1FA99A]/50 text-[#2DF4D7] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                <IoLocationOutline size={15} />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-bold text-white text-xs tracking-wide">Corporate office</h4>
                <p className="text-emerald-100/85 text-[11px] leading-relaxed font-sans">
                  Road No. 10, beside AV Towers<br />
                  ICRISAT Colony, Jubilee Hills<br />
                  Hyderabad– 500045, Telangana | India
                </p>
              </div>
            </div>

            {/* Shanghai Office */}
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#084D44]/70 border border-[#14796E]/70 shadow-xs hover:border-[#2DF4D7]/60 hover:bg-[#0A574E] transition-all">
              <div className="w-7 h-7 rounded-lg bg-[#063B34] border border-[#1FA99A]/50 text-[#2DF4D7] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                <IoLocationOutline size={15} />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-bold text-white text-xs tracking-wide">Shanghai Office</h4>
                <p className="text-emerald-100/85 text-[11px] leading-relaxed font-sans">
                  Building 28, Room 201, Lane 358,<br />
                  Sanmen Road, Wujiaochang Subdistrict,<br />
                  Yangpu District, Shanghai | China
                </p>
              </div>
            </div>

            {/* Research & Development */}
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#084D44]/70 border border-[#14796E]/70 shadow-xs hover:border-[#2DF4D7]/60 hover:bg-[#0A574E] transition-all">
              <div className="w-7 h-7 rounded-lg bg-[#063B34] border border-[#1FA99A]/50 text-[#2DF4D7] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                <IoLocationOutline size={15} />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-bold text-white text-xs tracking-wide">Research &amp; Development</h4>
                <p className="text-emerald-100/85 text-[11px] leading-relaxed font-sans">
                  Plot No-A-40/B Part -B, Gandhinagar,<br />
                  Kukatpally-500037, Telangana | India
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Social Bar */}
      <div className="border-t border-[#0F6359] bg-[#042F29]/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          {/* Copyright & Tagline */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-emerald-200/70">
            <span>© 2025 Pharmavive. All rights reserved.</span>
            <span className="hidden sm:inline text-emerald-600">|</span>
            <span className="text-[#2DF4D7] font-semibold">Bringing Science to Life</span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-2.5 text-emerald-200/80">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-6 h-6 rounded-full bg-[#063B34] border border-[#14796E]/60 flex items-center justify-center hover:text-[#2DF4D7] hover:border-[#2DF4D7] hover:bg-[#0A574E] transition-colors"
            >
              <FaLinkedinIn size={11} />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="w-6 h-6 rounded-full bg-[#063B34] border border-[#14796E]/60 flex items-center justify-center hover:text-[#2DF4D7] hover:border-[#2DF4D7] hover:bg-[#0A574E] transition-colors"
            >
              <FaXTwitter size={11} />
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Discord"
              className="w-6 h-6 rounded-full bg-[#063B34] border border-[#14796E]/60 flex items-center justify-center hover:text-[#2DF4D7] hover:border-[#2DF4D7] hover:bg-[#0A574E] transition-colors"
            >
              <FaDiscord size={11} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-6 h-6 rounded-full bg-[#063B34] border border-[#14796E]/60 flex items-center justify-center hover:text-[#2DF4D7] hover:border-[#2DF4D7] hover:bg-[#0A574E] transition-colors"
            >
              <FaYoutube size={11} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

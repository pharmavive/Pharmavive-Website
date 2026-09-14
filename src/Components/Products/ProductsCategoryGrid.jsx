'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { IoArrowForward, IoFlaskOutline } from 'react-icons/io5';
import { useScrollReveal } from '@/utils/useScrollReveal';
import { getClientMainCategories } from '@/utils/clientCache';

const STATIC_CATEGORIES = [
  {
    num: '01',
    title: 'API Impurities',
    description: 'High-purity reference standards and impurities for API development and quality control.',
    count: '1,842 Products',
    slug: 'api-impurity-standards',
    href: '/products/category/api-impurity-standards',
    type: 'impurities',
  },
  {
    num: '02',
    title: 'Reagents',
    description: 'High-purity analytical, synthesis and laboratory reagents for advanced research and pharmaceutical development.',
    count: '687 Products',
    slug: 'reagents',
    href: '/products/category/reagents',
    type: 'reagents',
  },
  {
    num: '03',
    title: 'Building Blocks',
    description: 'Versatile intermediates for pharmaceutical synthesis and derivatization.',
    count: '1,236 Products',
    slug: 'building-blocks',
    href: '/products/category/building-blocks',
    type: 'blocks',
  },
  {
    num: '04',
    title: 'Nitrosamines',
    description: 'Nitrosamine impurities and reference standards for safety and compliance testing.',
    count: '412 Products',
    slug: 'nitrosamines',
    href: '/products/category/nitrosamines',
    type: 'nitrosamines',
  },
  {
    num: '05',
    title: 'Specialty Chemicals',
    description: 'Unique molecules for research, formulation and custom applications.',
    count: '953 Products',
    slug: 'specialty-chemicals',
    href: '/products/category/specialty-chemicals',
    type: 'specialty',
  },
  {
    num: '06',
    title: 'Custom Synthesis CDMO',
    description: 'Tailored synthesis solutions from early development to scale-up.',
    count: '321 Products',
    slug: 'cdmo',
    href: '/synthesis',
    type: 'synthesis',
  },
];

/* Custom Vector Illustrations matching reference mockup */
function CategoryIllustration({ type }) {
  if (type === 'impurities') {
    // 3D Turquoise ball-and-stick cluster
    return (
      <svg viewBox="0 0 140 140" fill="none" className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 transition-transform duration-500 group-hover:scale-105">
        <defs>
          <radialGradient id="tealSphere" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#6EE7B7" />
            <stop offset="40%" stopColor="#00A389" />
            <stop offset="100%" stopColor="#0A4D45" />
          </radialGradient>
          <radialGradient id="blueSphere" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="45%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#0C4A6E" />
          </radialGradient>
        </defs>
        {/* Bonds */}
        <line x1="70" y1="70" x2="40" y2="40" stroke="#00A389" strokeWidth="3" opacity="0.6" strokeLinecap="round" />
        <line x1="70" y1="70" x2="105" y2="50" stroke="#00A389" strokeWidth="3" opacity="0.6" strokeLinecap="round" />
        <line x1="70" y1="70" x2="70" y2="105" stroke="#0284C7" strokeWidth="3" opacity="0.6" strokeLinecap="round" />
        <line x1="105" y1="50" x2="120" y2="85" stroke="#00A389" strokeWidth="2.5" opacity="0.5" strokeLinecap="round" />
        <line x1="40" y1="40" x2="25" y2="70" stroke="#00A389" strokeWidth="2.5" opacity="0.5" strokeLinecap="round" />
        {/* Outer spheres */}
        <circle cx="40" cy="40" r="10" fill="url(#tealSphere)" />
        <circle cx="25" cy="70" r="8" fill="url(#blueSphere)" />
        <circle cx="105" cy="50" r="11" fill="url(#tealSphere)" />
        <circle cx="120" cy="85" r="9" fill="url(#blueSphere)" />
        <circle cx="70" cy="105" r="10" fill="url(#tealSphere)" />
        {/* Center Sphere */}
        <circle cx="70" cy="70" r="15" fill="url(#blueSphere)" />
        <circle cx="66" cy="66" r="3.5" fill="#BAE6FD" opacity="0.8" />
      </svg>
    );
  }

  if (type === 'reagents' || type === 'isotopes') {
    // Deuterated / 13C structure
    return (
      <svg viewBox="0 0 140 140" fill="none" className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 transition-transform duration-500 group-hover:scale-105">
        <defs>
          <radialGradient id="isoTeal" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#5EEAD4" />
            <stop offset="50%" stopColor="#0D9488" />
            <stop offset="100%" stopColor="#134E4A" />
          </radialGradient>
        </defs>
        <circle cx="70" cy="70" r="38" stroke="#00A389" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
        <circle cx="70" cy="70" r="14" fill="url(#isoTeal)" />
        <text x="64" y="74" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="monospace">¹³C</text>
        {/* Surrounding Deuterium Nodes */}
        <line x1="70" y1="56" x2="70" y2="34" stroke="#00A389" strokeWidth="2" strokeLinecap="round" />
        <text x="66" y="28" fill="#00A389" fontSize="11" fontWeight="bold" fontFamily="monospace">D</text>
        <line x1="84" y1="70" x2="106" y2="70" stroke="#00A389" strokeWidth="2" strokeLinecap="round" />
        <text x="110" y="74" fill="#00A389" fontSize="11" fontWeight="bold" fontFamily="monospace">D</text>
        <line x1="56" y1="70" x2="34" y2="70" stroke="#00A389" strokeWidth="2" strokeLinecap="round" />
        <text x="22" y="74" fill="#00A389" fontSize="11" fontWeight="bold" fontFamily="monospace">D</text>
        <line x1="70" y1="84" x2="70" y2="106" stroke="#00A389" strokeWidth="2" strokeLinecap="round" />
        <text x="66" y="118" fill="#0E2358" fontSize="10" fontWeight="bold" fontFamily="monospace">¹³C</text>
      </svg>
    );
  }

  if (type === 'blocks') {
    // Heterocyclic hexagonal ring
    return (
      <svg viewBox="0 0 140 140" fill="none" className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 transition-transform duration-500 group-hover:scale-105">
        <defs>
          <radialGradient id="ringSphere" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="50%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#0C4A6E" />
          </radialGradient>
        </defs>
        {/* Hexagonal Ring */}
        <polygon points="70,36 98,52 98,86 70,102 42,86 42,52" stroke="#00A389" strokeWidth="3" fill="none" opacity="0.7" strokeLinejoin="round" />
        <circle cx="70" cy="69" r="16" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5" />
        {/* Vertices spheres */}
        <circle cx="70" cy="36" r="6" fill="url(#ringSphere)" />
        <circle cx="98" cy="52" r="6" fill="url(#ringSphere)" />
        <circle cx="98" cy="86" r="6" fill="url(#ringSphere)" />
        <circle cx="70" cy="102" r="6" fill="url(#ringSphere)" />
        <circle cx="42" cy="86" r="6" fill="url(#ringSphere)" />
        <circle cx="42" cy="52" r="6" fill="url(#ringSphere)" />
        {/* External bond */}
        <line x1="98" y1="52" x2="118" y2="40" stroke="#00A389" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="118" cy="40" r="5" fill="#00A389" />
      </svg>
    );
  }

  if (type === 'nitrosamines') {
    // Nitrosamine structure
    return (
      <svg viewBox="0 0 140 140" fill="none" className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 transition-transform duration-500 group-hover:scale-105">
        <defs>
          <radialGradient id="nitroBlue" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#67E8F9" />
            <stop offset="50%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#0E7490" />
          </radialGradient>
        </defs>
        <circle cx="56" cy="70" r="12" fill="url(#nitroBlue)" />
        <text x="52" y="74" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="monospace">N</text>
        <line x1="68" y1="67" x2="88" y2="67" stroke="#00A389" strokeWidth="2" />
        <line x1="68" y1="73" x2="88" y2="73" stroke="#00A389" strokeWidth="2" />
        <circle cx="98" cy="70" r="10" fill="url(#nitroBlue)" />
        <text x="94" y="74" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="monospace">N</text>
        <line x1="108" y1="70" x2="122" y2="52" stroke="#00A389" strokeWidth="2" />
        <circle cx="122" cy="52" r="7" fill="#00A389" />
        {/* Carbon tails */}
        <line x1="56" y1="82" x2="42" y2="104" stroke="#06B6D4" strokeWidth="2.5" />
        <circle cx="42" cy="104" r="6" fill="#0E7490" />
        <line x1="44" y1="70" x2="24" y2="60" stroke="#06B6D4" strokeWidth="2.5" />
        <circle cx="24" cy="60" r="6" fill="#0E7490" />
      </svg>
    );
  }

  if (type === 'specialty') {
    // Specialty Chemicals branched structure
    return (
      <svg viewBox="0 0 140 140" fill="none" className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 transition-transform duration-500 group-hover:scale-105">
        <defs>
          <radialGradient id="specSphere" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#2DD4BF" />
            <stop offset="50%" stopColor="#0F766E" />
            <stop offset="100%" stopColor="#115E59" />
          </radialGradient>
        </defs>
        <line x1="40" y1="100" x2="65" y2="75" stroke="#00A389" strokeWidth="3" strokeLinecap="round" />
        <line x1="65" y1="75" x2="90" y2="50" stroke="#00A389" strokeWidth="3" strokeLinecap="round" />
        <line x1="65" y1="75" x2="95" y2="90" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="90" y1="50" x2="115" y2="30" stroke="#00A389" strokeWidth="3" strokeLinecap="round" />
        <line x1="90" y1="50" x2="70" y2="30" stroke="#00A389" strokeWidth="2" strokeLinecap="round" />
        <circle cx="40" cy="100" r="8" fill="url(#specSphere)" />
        <circle cx="65" cy="75" r="10" fill="url(#specSphere)" />
        <circle cx="90" cy="50" r="9" fill="url(#specSphere)" />
        <circle cx="95" cy="90" r="7" fill="#0284C7" />
        <circle cx="115" cy="30" r="8" fill="url(#specSphere)" />
        <circle cx="70" cy="30" r="6" fill="#00A389" />
      </svg>
    );
  }

  // CDMO: Laboratory volumetric flask with teal fluid
  return (
    <svg viewBox="0 0 140 140" fill="none" className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 transition-transform duration-500 group-hover:scale-105">
      <defs>
        <linearGradient id="flaskFluid" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2DD4BF" opacity="0.6" />
          <stop offset="100%" stopColor="#00A389" opacity="0.9" />
        </linearGradient>
      </defs>
      {/* Flask Glass Outline */}
      <path
        d="M62 25 L78 25 M66 25 L66 50 L40 102 A 8 8 0 0 0 47 112 L93 112 A 8 8 0 0 0 100 102 L74 50 L74 25"
        stroke="#0E2358"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="white"
      />
      {/* Liquid Fill */}
      <path
        d="M48 85 Q 70 80 92 85 L96 102 A 6 6 0 0 1 90 110 L50 110 A 6 6 0 0 1 44 102 Z"
        fill="url(#flaskFluid)"
      />
      {/* Orbital Ring */}
      <ellipse cx="70" cy="95" rx="38" ry="10" stroke="#00A389" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.7" />
      {/* Graduation Markings */}
      <line x1="68" y1="36" x2="72" y2="36" stroke="#0E2358" strokeWidth="1.5" />
      <line x1="66" y1="44" x2="74" y2="44" stroke="#0E2358" strokeWidth="1.5" />
    </svg>
  );
}

export default function ProductsCategoryGrid() {
  const [categories, setCategories] = useState(STATIC_CATEGORIES);
  const sectionRef = useScrollReveal({ threshold: 0.1 });

  // Attempt to enrich with real MongoDB category names if available
  useEffect(() => {
    let isMounted = true;
    getClientMainCategories()
      .then((mainCategories) => {
        if (isMounted && Array.isArray(mainCategories) && mainCategories.length > 0) {
          setCategories((prev) =>
            prev.map((c) => {
              const match = mainCategories.find(
                (mc) => mc.slug?.toLowerCase() === c.slug.toLowerCase() || mc.name?.toLowerCase().includes(c.title.toLowerCase())
              );
              return match ? { ...c, href: `/products/category/${encodeURIComponent(match.slug.toLowerCase())}` } : c;
            })
          );
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="categories-section" ref={sectionRef} className="scroll-reveal py-16 sm:py-20 bg-white text-[#0E2358]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div className="space-y-3 max-w-2xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF7F6] border border-[#B3E7E2] text-[#00A389] text-[11px] font-mono font-semibold tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00A389]" />
              <span>Explore By Category</span>
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0E2358] tracking-tight">
              Find What You Need, Faster
            </h2>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-[#475569] font-normal leading-relaxed">
              Browse our well-organized categories to discover the right chemicals, reference standards and custom synthesis services for your research and production needs.
            </p>
          </div>

          {/* Right Trust Mark */}
          <div className="hidden sm:flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#F8FDFA] border border-[#E2E8F0] shadow-2xs">
            <div className="w-8 h-8 rounded-xl bg-[#EBF7F6] text-[#00A389] flex items-center justify-center flex-shrink-0">
              <IoFlaskOutline size={18} />
            </div>
            <div className="text-left leading-tight">
              <div className="text-xs font-bold text-[#0E2358]">Quality Molecules</div>
              <div className="text-[11px] font-medium text-[#00A389]">for a Healthier Tomorrow</div>
            </div>
          </div>
        </div>

        {/* 6 Category Cards Grid (2 rows of 3 cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => {
            const delayClass = ['delay-100', 'delay-150', 'delay-200', 'delay-250', 'delay-300', 'delay-350'][idx % 6];
            return (
              <Link
                key={cat.num}
                href={cat.href}
                className={`card-hover-scientific group relative rounded-3xl bg-[#F8FDFA] border border-[#E2E8F0] p-6 flex flex-col justify-between overflow-hidden ${delayClass}`}
              >
              {/* Card Top & Body */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <span className="text-lg sm:text-xl font-mono font-extrabold text-[#00A389]/80">
                    {cat.num}
                  </span>
                  <CategoryIllustration type={cat.type} />
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#0E2358] group-hover:text-[#00A389] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#64748B] mt-2 leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>
                </div>
              </div>

              {/* Card Footer: Product Count & Action Link */}
              <div className="mt-6 pt-4 border-t border-[#E2E8F0]/70 flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-[#E2E8F0] text-[11px] font-mono font-medium text-[#475569]">
                  <IoFlaskOutline size={13} className="text-[#00A389]" />
                  <span>{cat.count}</span>
                </div>

                <div className="flex items-center gap-1 text-xs font-semibold text-[#00A389] group-hover:translate-x-1 transition-transform">
                  <span>Explore Category</span>
                  <IoArrowForward size={14} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      </div>
    </section>
  );
}

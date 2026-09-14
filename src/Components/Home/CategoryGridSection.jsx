'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IoArrowForward } from 'react-icons/io5';
import { getClientMainCategories, peekClientMainCategories } from '@/utils/clientCache';

const CATEGORY_THEMES = {
  'api-impurity-standards': {
    image: '/category-icons/apis.png',
    bgColor: 'bg-[#E1F6F3]',
    hoverBg: 'hover:bg-[#D4EFEA]',
    borderColor: 'border-[#CCEAE4]',
  },
  'speciality-chemicals': {
    image: '/category-icons/specialty-chemicals.png',
    bgColor: 'bg-[#E1F1FE]',
    hoverBg: 'hover:bg-[#D3E8FC]',
    borderColor: 'border-[#CBE3FC]',
  },
  'building-blocks': {
    image: '/category-icons/intermediates.png',
    bgColor: 'bg-[#E6EBFE]',
    hoverBg: 'hover:bg-[#DAE1FC]',
    borderColor: 'border-[#D2DCFC]',
  },
  'peptide-coupling-reagents': {
    image: '/category-icons/research-chemicals.png',
    bgColor: 'bg-[#FDF2E8]',
    hoverBg: 'hover:bg-[#F9E8D9]',
    borderColor: 'border-[#FAE1CD]',
  },
  'nitrosamines': {
    image: '/category-icons/impurities.png',
    bgColor: 'bg-[#E8EAFE]',
    hoverBg: 'hover:bg-[#DDE0FB]',
    borderColor: 'border-[#D6D9FC]',
  },
  'stable-isotopes': {
    image: '/category-icons/amino-acids.png',
    bgColor: 'bg-[#E7F6F7]',
    hoverBg: 'hover:bg-[#D8EEF0]',
    borderColor: 'border-[#CEECF0]',
  },
  'cdmo': {
    image: '/category-icons/cdmo.png',
    bgColor: 'bg-[#DEF5F2]',
    hoverBg: 'hover:bg-[#CFEDE8]',
    borderColor: 'border-[#C4ECE6]',
    href: '/services',
  },
};

function formatCategoryItems(mainCategories) {
  if (!Array.isArray(mainCategories)) return [];
  return mainCategories
    .filter((c) => c.slug !== 'uncategorized')
    .map((c) => {
      const theme = CATEGORY_THEMES[c.slug] || {
        image: '/category-icons/apis.png',
        bgColor: 'bg-[#E1F6F3]',
        hoverBg: 'hover:bg-[#D4EFEA]',
        borderColor: 'border-[#CCEAE4]',
      };
      return {
        id: c.slug,
        name: c.name,
        count: c.displayCount || `${c.productCount || 0} Products`,
        href: theme.href || `/products/category/${encodeURIComponent(c.slug)}`,
        bgColor: theme.bgColor,
        hoverBg: theme.hoverBg,
        borderColor: theme.borderColor,
        image: theme.image,
      };
    });
}

export default function CategoryGridSection() {
  const initialData = peekClientMainCategories();
  const [categories, setCategories] = useState(() => formatCategoryItems(initialData));
  const [loading, setLoading] = useState(!initialData || initialData.length === 0);

  useEffect(() => {
    let isMounted = true;
    getClientMainCategories()
      .then((data) => {
        if (data && Array.isArray(data) && data.length > 0 && isMounted) {
          setCategories(formatCategoryItems(data));
        }
        if (isMounted) setLoading(false);
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <section className="pt-10 pb-6 sm:pt-14 sm:pb-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-4">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF7F6] text-[#08A698] text-xs font-mono font-bold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-[#08A698] animate-pulse" />
              <span>PRODUCT CATEGORIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-[#0E2358] leading-tight">
              Explore Our <span className="text-[#08A698]">Product Categories</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Discover high-purity pharmaceutical impurities, stable isotope-labelled compounds, specialty intermediates, reference standards, and custom synthesis solutions designed for research, analytical development, and pharmaceutical innovation.
            </p>
          </div>

          {/* Laboratory Beaker & Crystal Lattice Illustration */}
          <div className="hidden md:block relative w-52 h-36 lg:w-60 lg:h-40 rounded-2xl overflow-hidden shadow-md border border-slate-200/80 shrink-0 group hover:shadow-[0_0_25px_rgba(0,163,137,0.25)] hover:border-[#00A389]/40 transition-all duration-300">
            <Image
              src="/hero_molecular_crystal.jpg"
              alt="Scientific Glassware & Crystal Lattice"
              fill
              sizes="240px"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-2.5 left-3 right-3 text-white text-[11px] font-medium bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-md">
              Analytical Grade Matrix
            </div>
          </div>
        </div>

        {/* 6-Column Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5 items-stretch">
          {loading ? (
            [...Array(6)].map((_, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 h-64 animate-pulse"
              >
                <div className="w-20 h-20 bg-slate-100 rounded-full mx-auto my-2" />
                <div className="space-y-2">
                  <div className="w-3/4 h-4 bg-slate-200 rounded" />
                  <div className="w-1/2 h-3 bg-slate-100 rounded" />
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-100 mt-3" />
              </div>
            ))
          ) : (
            categories.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                prefetch={true}
                className={`group flex flex-col justify-between rounded-2xl border ${item.borderColor} ${item.bgColor} ${item.hoverBg} p-3.5 sm:p-4.5 transition-transform duration-200 ease-out hover:-translate-y-1.5 hover:border-[#00E5BE]/70 card-glow-hover`}
              >
                {/* 3D Logo Graphic */}
                <div className="relative w-full h-24 sm:h-28 flex items-center justify-center mb-2">
                  <div className="relative w-24 h-20 sm:w-28 sm:h-24">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 16vw"
                      className="object-contain group-hover:scale-105 transition-transform duration-300 ease-out pointer-events-none"
                    />
                  </div>
                </div>

                {/* Title & Count */}
                <div className="space-y-0.5 pt-1">
                  <h3 className="font-extrabold text-[13px] sm:text-sm lg:text-[14px] leading-snug text-[#0E2358] group-hover:text-[#08A698] transition-colors min-h-[36px] flex items-center">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {item.count}
                  </p>
                </div>

                {/* Bottom Arrow Button on bottom-left */}
                <div className="pt-3 sm:pt-4">
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-slate-300/80 bg-white/80 backdrop-blur-xs flex items-center justify-center text-slate-600 group-hover:bg-[#08A698] group-hover:text-white group-hover:border-[#08A698] group-hover:shadow-[0_0_12px_rgba(0,163,137,0.45)] transition-all duration-200 shadow-2xs">
                    <IoArrowForward size={13} className="group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            ))
          )}

          {/* 10th Card: Wide Custom Synthesis & Bulk Orders Banner */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-3 rounded-2xl bg-gradient-to-br from-[#063935] via-[#084A45] to-[#042825] border border-[#0E5953] hover:border-[#00E5BE]/50 p-5 sm:p-6 lg:p-7 flex flex-col justify-between relative overflow-hidden shadow-md hover:shadow-[0_15px_45px_rgba(0,163,137,0.3)] transition-all duration-500 text-white group">
            {/* Smooth Hardware-Accelerated Ambient Glow Flares (Native Radial Gradient) */}
            <div className="absolute -right-8 -bottom-8 w-56 h-56 rounded-full bg-[radial-gradient(circle,rgba(0,229,190,0.18)_0%,transparent_70%)] pointer-events-none" />
            <div className="absolute -left-12 -top-12 w-48 h-48 rounded-full bg-[radial-gradient(circle,rgba(0,163,137,0.22)_0%,transparent_70%)] pointer-events-none" />
            
            {/* Watermark Beaker Graphic */}
            <div className="absolute right-4 bottom-2 opacity-15 pointer-events-none w-32 h-32 group-hover:opacity-25 transition-opacity duration-500">
              <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.75" className="w-full h-full text-emerald-200">
                <path d="M45 20 L75 20 M60 20 L60 38 L30 85 A 10 10 0 0 0 38 98 L82 98 A 10 10 0 0 0 90 85 L60 38" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="38" y1="75" x2="82" y2="75" strokeDasharray="3 3" />
                <circle cx="50" cy="82" r="3.5" fill="currentColor" />
                <circle cx="68" cy="88" r="2.5" fill="currentColor" />
              </svg>
            </div>

            <div className="relative z-10 space-y-2">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold tracking-wider text-[#2DD4BF] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2DD4BF] animate-pulse" />
                <span>CAN&apos;T FIND WHAT YOU NEED?</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Custom Synthesis &amp; Bulk Orders
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed max-w-md">
                From a target structure to a specific research requirement, connect with Pharmavive for custom synthesis solutions.
              </p>
            </div>

            <div className="relative z-10 pt-4 mt-2">
              <Link
                href="/contact"
                className="relative overflow-hidden inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#063E3A] hover:bg-emerald-50 text-xs sm:text-sm font-bold shadow-md hover:shadow-[0_0_20px_rgba(255,255,255,0.45)] hover:translate-x-1 transition-all duration-200"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent animate-shimmer-sweep pointer-events-none" />
                <span>Contact Us</span>
                <IoArrowForward size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

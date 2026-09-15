'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IoArrowForward } from 'react-icons/io5';

const ROW1_CATEGORIES = [
  {
    id: 'api-impurity-standards',
    name: 'Impurity',
    href: '/products/category/api-impurity-standards',
    image: '/category-icons/apis.png',
    textColor: 'text-white',
    btnTextColor: 'text-[#205b50]',
    gradId: 'grad-impurity',
    gradTop: '#76b1a4',
    gradMid: '#4e8d80',
    gradBot: '#2d6458',
    backFill: '#3f786d',
    backFillOpacity: '0.22',
    backStroke: '#3f786d',
    cardBorder: 'rgba(255,255,255,0.35)',
    dishBg: 'bg-white/20 border-white/30',
  },
  {
    id: 'building-blocks',
    name: 'Building Blocks',
    href: '/products/category/building-blocks',
    image: '/category-icons/intermediates.png',
    textColor: 'text-[#131f37]',
    btnTextColor: 'text-[#131f37]',
    gradId: 'grad-blocks',
    gradTop: '#f3f1fd',
    gradMid: '#e0dcfb',
    gradBot: '#cbcdfa',
    backFill: '#c2c1f0',
    backFillOpacity: '0.32',
    backStroke: '#b2b0ea',
    cardBorder: 'rgba(255,255,255,0.7)',
    dishBg: 'bg-white/50 border-white/60 shadow-inner',
  },
  {
    id: 'cdmo',
    name: 'CDMO',
    href: '/services',
    image: '/category-icons/cdmo.png',
    textColor: 'text-[#131f37]',
    btnTextColor: 'text-[#131f37]',
    gradId: 'grad-cdmo',
    gradTop: '#effaf8',
    gradMid: '#d4f4ed',
    gradBot: '#b6ede0',
    backFill: '#a7e4d5',
    backFillOpacity: '0.32',
    backStroke: '#87d7c4',
    cardBorder: 'rgba(255,255,255,0.7)',
    dishBg: 'bg-white/50 border-white/60 shadow-inner',
  },
  {
    id: 'nitrosamines',
    name: 'Nitrosamines',
    href: '/products/category/nitrosamines',
    image: '/category-icons/impurities.png',
    textColor: 'text-[#131f37]',
    btnTextColor: 'text-[#131f37]',
    gradId: 'grad-nitrosamines',
    gradTop: '#f5f3fd',
    gradMid: '#e4dffb',
    gradBot: '#cfc9fa',
    backFill: '#c8c5f1',
    backFillOpacity: '0.32',
    backStroke: '#b6b2ea',
    cardBorder: 'rgba(255,255,255,0.7)',
    dishBg: 'bg-white/50 border-white/60 shadow-inner',
  },
  {
    id: 'peptide-coupling-reagents',
    name: 'Peptide Coupling Reagents',
    displayName: (
      <>
        Peptide Coupling<br />Reagents
      </>
    ),
    href: '/products/category/peptide-coupling-reagents',
    image: '/category-icons/research-chemicals.png',
    textColor: 'text-[#131f37]',
    btnTextColor: 'text-[#131f37]',
    gradId: 'grad-peptides',
    gradTop: '#fff5ed',
    gradMid: '#fde4cd',
    gradBot: '#fbd3b2',
    backFill: '#fbd7bb',
    backFillOpacity: '0.32',
    backStroke: '#f6c49e',
    cardBorder: 'rgba(255,255,255,0.7)',
    dishBg: 'bg-white/50 border-white/60 shadow-inner',
  },
  {
    id: 'speciality-chemicals',
    name: 'Speciality Chemicals',
    displayName: (
      <>
        Speciality<br />Chemicals
      </>
    ),
    href: '/products/category/speciality-chemicals',
    image: '/category-icons/specialty-chemicals.png',
    textColor: 'text-[#131f37]',
    btnTextColor: 'text-[#131f37]',
    gradId: 'grad-spec',
    gradTop: '#eff6fe',
    gradMid: '#d4e8fd',
    gradBot: '#b6daf8',
    backFill: '#89beec',
    backFillOpacity: '0.32',
    backStroke: '#72aee0',
    cardBorder: 'rgba(255,255,255,0.7)',
    dishBg: 'bg-white/50 border-white/60 shadow-inner',
  },
];

export default function CategoryGridSection() {
  return (
    <section className="pt-8 pb-8 sm:pt-12 sm:pb-12 bg-gradient-to-b from-[#F8FAFB] via-white to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-2">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF7F6] text-[#008766] text-xs font-mono font-bold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-[#008766] animate-pulse" />
              <span>PRODUCT CATEGORIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold tracking-tight text-[#0E2358] leading-tight">
              Explore Our <span className="text-[#008766]">Product Categories</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Discover high-purity pharmaceutical impurities, stable isotope-labelled compounds, specialty intermediates, reference standards, and custom synthesis solutions designed for research, analytical development, and pharmaceutical innovation.
            </p>
          </div>

          {/* Laboratory Beaker & Crystal Lattice Illustration */}
          <div className="hidden md:block relative w-52 h-36 lg:w-60 lg:h-40 rounded-2xl overflow-hidden shadow-md border border-slate-200/80 shrink-0 group hover:shadow-[0_0_25px_rgba(0,135,102,0.25)] hover:border-[#008766]/40 transition-all duration-300">
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

        {/* Outer White Card Container matching user mockup */}
        <div className="bg-white rounded-[28px] sm:rounded-[36px] lg:rounded-[40px] p-4 sm:p-6 lg:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-slate-200/70 relative">
          
          {/* Row 1: 6 Hexagonal Cards with Molecular Connector Ribbon */}
          <div className="relative mb-5">
            {/* Molecular Bond Ribbon connecting cards horizontally */}
            <div className="hidden lg:flex absolute top-[48%] -translate-y-1/2 left-2 right-2 h-10 pointer-events-none z-0 items-center justify-between opacity-35">
              <svg className="w-full h-full" viewBox="0 0 900 40" fill="none" stroke="#2dd4bf" strokeWidth="1.6">
                <line x1="125" y1="20" x2="165" y2="20" strokeDasharray="2 3" />
                <polygon points="165,20 174,12 188,12 197,20 188,28 174,28" stroke="#14b8a6" strokeWidth="1.3" />
                <line x1="197" y1="20" x2="275" y2="20" strokeDasharray="2 3" />
                <polygon points="275,20 284,12 298,12 307,20 298,28 284,28" stroke="#14b8a6" strokeWidth="1.3" />
                <line x1="307" y1="20" x2="425" y2="20" strokeDasharray="2 3" />
                <polygon points="425,20 434,12 448,12 457,20 448,28 434,28" stroke="#14b8a6" strokeWidth="1.3" />
                <line x1="457" y1="20" x2="575" y2="20" strokeDasharray="2 3" />
                <polygon points="575,20 584,12 598,12 607,20 598,28 584,28" stroke="#14b8a6" strokeWidth="1.3" />
                <line x1="607" y1="20" x2="725" y2="20" strokeDasharray="2 3" />
                <polygon points="725,20 734,12 748,12 757,20 748,28 734,28" stroke="#14b8a6" strokeWidth="1.3" />
                <line x1="757" y1="20" x2="785" y2="20" strokeDasharray="2 3" />
              </svg>
            </div>

            {/* 6 Grid Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-3.5 relative z-10">
              {ROW1_CATEGORIES.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  prefetch={true}
                  className="relative flex flex-col items-center justify-between p-3 sm:p-3.5 h-[185px] sm:h-[190px] group cursor-pointer transition-transform duration-200 hover:-translate-y-1.5 focus:outline-none"
                >
                  {/* Hexagonal Faceted SVG Card Background */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-xs group-hover:drop-shadow-sm transition-all" viewBox="0 0 135 190" preserveAspectRatio="none">
                    {/* Outer Hexagon Backplate Tip */}
                    <path
                      d="M 12,24 L 63,4 Q 67.5,2 72,4 L 123,24 Q 129,27 129,35 L 129,152 Q 129,160 123,163 L 72,185 Q 67.5,187 63,185 L 12,163 Q 6,160 6,152 L 6,35 Q 6,27 12,24 Z"
                      fill={item.backFill}
                      fillOpacity={item.backFillOpacity}
                      stroke={item.backStroke}
                      strokeOpacity="0.6"
                      strokeWidth="1.5"
                    />
                    {/* Foreground Card with Peaked Roof and Smooth Rounded Bottom */}
                    <path
                      d="M 12,24 L 63,4 Q 67.5,2 72,4 L 123,24 Q 129,27 129,35 L 129,148 Q 129,165 112,165 L 23,165 Q 6,165 6,148 L 6,35 Q 6,27 12,24 Z"
                      fill={`url(#${item.gradId})`}
                      stroke={item.cardBorder}
                      strokeWidth="1"
                    />
                    <defs>
                      <linearGradient id={item.gradId} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={item.gradTop} />
                        <stop offset="50%" stopColor={item.gradMid} />
                        <stop offset="100%" stopColor={item.gradBot} />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Card Content */}
                  <div className="relative z-10 w-full flex flex-col items-center justify-between h-full pt-2.5 sm:pt-3 pb-1 text-center">
                    {/* 3D Graphic inside Frosted Capsule Dish */}
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full ${item.dishBg} backdrop-blur-xs flex items-center justify-center p-1.5 transition-transform duration-300 group-hover:scale-105`}>
                      <div className="relative w-10 h-10 sm:w-11 sm:h-11">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="64px"
                          className="object-contain drop-shadow-xs pointer-events-none"
                        />
                      </div>
                    </div>

                    {/* Category Title */}
                    <div className={`${item.textColor} font-bold text-xs sm:text-[13px] tracking-tight min-h-[32px] flex items-center justify-center px-1`}>
                      {item.displayName || item.name}
                    </div>

                    {/* Explore Capsule Pill Button */}
                    <div className={`bg-white ${item.btnTextColor} text-[11px] font-bold px-3.5 py-1 rounded-full shadow-xs flex items-center gap-1 group-hover:shadow-sm group-hover:scale-[1.03] transition-all`}>
                      <span>Explore</span>
                      <IoArrowForward size={11} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Row 2: Stable Isotopes (2 cols) + Custom Synthesis & Bulk Orders Banner (4 cols) */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-3.5 items-stretch">
            
            {/* Stable Isotopes (col-span-1 md:col-span-2) */}
            <Link
              href="/products/category/stable-isotopes"
              prefetch={true}
              className="col-span-1 md:col-span-2 rounded-2xl bg-gradient-to-br from-[#7791a5] via-[#657e92] to-[#50687b] border border-white/30 p-4 sm:p-5 flex items-center justify-between shadow-md relative overflow-hidden group cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            >
              {/* Soft glass sheen */}
              <div className="absolute -top-12 -left-12 w-36 h-36 rounded-full bg-white/10 blur-xl pointer-events-none" />

              {/* Isotope 3D Molecule Graphic with Labeled Atoms */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 flex items-center justify-center">
                <Image
                  src="/category-icons/stable-isotopes-feathered.png"
                  alt="Stable Isotopes Molecule"
                  width={112}
                  height={112}
                  className="object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Text & Explore Button */}
              <div className="flex flex-col items-start justify-center pl-3 space-y-3 relative z-10">
                <h3 className="text-white font-bold text-base sm:text-lg leading-tight tracking-tight group-hover:text-emerald-100 transition-colors">
                  Stable Isotopes
                </h3>
                <div className="bg-white text-[#2a4556] text-xs font-bold px-4 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 group-hover:shadow group-hover:scale-[1.03] transition-all">
                  <span>Explore</span>
                  <IoArrowForward size={11} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Custom Synthesis & Bulk Orders Banner (col-span-1 md:col-span-4) */}
            <div className="col-span-1 md:col-span-4 rounded-2xl bg-gradient-to-r from-[#023326] via-[#044c3a] to-[#016f52] border border-emerald-500/30 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5 shadow-lg relative overflow-hidden group">
              {/* Luminous radial glow behind flask */}
              <div className="absolute right-28 -top-8 w-52 h-52 rounded-full bg-emerald-400/25 blur-2xl pointer-events-none" />

              {/* Diamond sparkle watermark */}
              <div className="absolute right-3.5 bottom-2.5 opacity-25 pointer-events-none">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
                  <path d="M12 0 Q12 12 0 12 Q12 12 12 24 Q12 12 24 12 Q12 12 12 0 Z" />
                </svg>
              </div>

              {/* Left Content */}
              <div className="space-y-1.5 max-w-md relative z-10">
                <div className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-[#34d399] uppercase font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-pulse" />
                  <span>CAN&apos;T FIND WHAT YOU NEED?</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                  Custom Synthesis &amp; Bulk Orders
                </h3>
                <p className="text-xs sm:text-[13px] text-emerald-100/80 leading-relaxed">
                  From target structure synthesis and impurity profiling to bulk commercial sourcing, connect directly with our specialized chemistry laboratory.
                </p>
              </div>

              {/* Right Content: Glowing Flask + Contact Button */}
              <div className="flex items-center gap-5 relative z-10 shrink-0">
                {/* Glowing Laboratory Flask SVG */}
                <div className="hidden sm:flex w-12 h-14 relative items-center justify-center filter drop-shadow-[0_0_8px_rgba(255,255,255,0.75)]">
                  <svg viewBox="0 0 50 60" fill="none" stroke="white" strokeWidth="2.2" className="w-full h-full">
                    <line x1="15" y1="7" x2="35" y2="7" strokeLinecap="round" />
                    <line x1="25" y1="7" x2="25" y2="18" />
                    <path d="M 25,18 L 8,48 Q 6,52 10,54 L 40,54 Q 44,52 42,48 L 25,18 Z" strokeLinejoin="round" strokeLinecap="round" />
                    <line x1="14" y1="40" x2="36" y2="40" strokeDasharray="2.5 2" strokeWidth="1.5" />
                    <circle cx="20" cy="46" r="2.5" fill="white" stroke="none" />
                    <circle cx="30" cy="48" r="1.8" fill="white" stroke="none" />
                  </svg>
                </div>

                {/* Contact Us Pill Button */}
                <Link
                  href="/contact"
                  prefetch={true}
                  className="bg-white text-[#043328] text-xs sm:text-[13px] font-bold px-5 py-2.5 rounded-full shadow-md hover:bg-emerald-50 hover:shadow-lg hover:scale-[1.02] transition-all flex items-center gap-1.5 shrink-0"
                >
                  <span>Contact Us</span>
                  <IoArrowForward size={13} />
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

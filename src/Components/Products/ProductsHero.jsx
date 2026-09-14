'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IoArrowForward, IoSearchOutline } from 'react-icons/io5';

export default function ProductsHero() {
  return (
    <section className="relative overflow-hidden bg-[#F8FDFA] text-[#0E2358] pt-10 pb-16 lg:pt-14 lg:pb-24 border-b border-[#E2E8F0]">
      {/* High-Fidelity 3D Luminous Molecular Background & Fluid Caustics */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <Image
          src="/hero_molecular_crystal.jpg"
          alt="Pharmavive Chemical Portfolio"
          fill
          priority
          className="object-cover object-right-top opacity-95 select-none"
          sizes="100vw"
        />
        {/* Soft gradient wash on the left ensuring crisp typography contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 sm:via-white/75 to-transparent w-full lg:w-[60%]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center min-h-[400px] lg:min-h-[460px]">
          {/* LEFT COLUMN: Editorial Authority & Proposition */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Scientific Eyebrow Badge */}
            <div className="hero-enter-1 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-[#B3E7E2] text-[#00A389] text-[11px] sm:text-xs font-mono font-semibold tracking-wider uppercase shadow-2xs backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-[#00A389] animate-pulse flex-shrink-0" />
              <span>Products</span>
            </div>

            {/* Disciplined Editorial Headline */}
            <h1 className="hero-enter-2 text-3xl sm:text-4xl lg:text-[3.35rem] font-extrabold tracking-tight text-[#0E2358] leading-[1.12]">
              Explore Our <br />
              <span className="text-[#00A389]">Chemical Portfolio</span>
            </h1>

            {/* Factual Concise Narrative (Exact match to reference mockup) */}
            <p className="hero-enter-3 text-sm sm:text-base lg:text-[1.05rem] text-[#475569] font-normal leading-relaxed max-w-xl">
              Pharmavive offers a comprehensive range of pharmaceutical chemicals, APIs, intermediates, impurities, reagents, specialty chemicals and custom synthesis solutions.
            </p>

            {/* Action Triggers */}
            <div className="hero-enter-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2 w-full">
              <a
                href="#categories-section"
                className="btn-scientific-primary w-full sm:w-auto justify-center px-6 sm:px-7 py-3.5 rounded-2xl bg-[#00A389] hover:bg-[#008F78] text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg flex items-center gap-2.5 group cursor-pointer"
              >
                <span>Explore All Products</span>
                <IoArrowForward size={16} className="group-hover:translate-x-1.5 transition-transform duration-200" />
              </a>

              <Link
                href="/search"
                className="btn-scientific-secondary w-full sm:w-auto justify-center px-5 sm:px-6 py-3.5 rounded-2xl bg-white hover:bg-[#F8FAFC] text-[#64748B] hover:text-[#0E2358] font-medium text-xs sm:text-sm border border-[#CBD5E1] hover:border-[#00A389] flex items-center gap-2 cursor-pointer shadow-xs group"
              >
                <IoSearchOutline size={16} className="text-[#00A389] group-hover:scale-110 transition-transform duration-200" />
                <span>Search by CAS / Catalog No.</span>
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: Better Molecules Callout Floating on Centerpiece */}
          <div className="hidden lg:flex lg:col-span-5 relative w-full h-[400px] items-start justify-end pr-4 select-none pointer-events-auto">
            {/* Top Right Scientific Callout */}
            <div className="card-hover-scientific animate-float-slow mt-8 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/90 group-hover:bg-white border border-[#00A389]/30 group-hover:border-[#00A389] backdrop-blur-md shadow-sm group-hover:shadow-md cursor-default">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="14" stroke="#00A389" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
                <circle cx="16" cy="16" r="6" fill="#00A389" className="animate-node-pulse" />
                <circle cx="8" cy="10" r="3" fill="#0E2358" />
                <circle cx="24" cy="10" r="3" fill="#0E2358" />
                <line x1="16" y1="16" x2="8" y2="10" stroke="#00A389" strokeWidth="1.5" />
                <line x1="16" y1="16" x2="24" y2="10" stroke="#00A389" strokeWidth="1.5" />
              </svg>
              <div className="text-left leading-tight">
                <div className="text-[11px] font-bold text-[#0E2358]">Better Molecules</div>
                <div className="text-[10px] font-semibold text-[#00A389]">Better Medicines</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

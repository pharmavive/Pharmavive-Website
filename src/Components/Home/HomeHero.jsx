'use client';

import React from 'react';
import Link from 'next/link';
import { LuArrowRight } from 'react-icons/lu';
import ChemicalSlideshow from './ChemicalSlideshow';
import HeroMoleculesAnimation from './HeroMoleculesAnimation';

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-white text-[#0E2358] pt-12 pb-16 lg:pt-16 lg:pb-22 border-b border-[#E2E8F0]">
      {/* Top-Left Organic Teal Decorative Corner matching reference mockup */}
      <div className="absolute top-0 left-0 w-44 h-44 sm:w-56 sm:h-56 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-24 -left-24 w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-[#E0F7F2]/60" />
        <div className="absolute -top-28 -left-28 w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-[#008766]" />
        <div className="absolute -top-20 -left-20 w-60 h-60 sm:w-68 sm:h-68 rounded-full border-[12px] sm:border-[15px] border-[#92DEC9]/40" />
      </div>

      {/* Soft Ambient Depth Lighting */}
      <div className="absolute -top-16 -left-16 w-96 h-96 rounded-full bg-[#E0F7F2]/40 blur-3xl pointer-events-none -z-0" />
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-slate-100/50 blur-3xl pointer-events-none" />

      {/* Floating 3D Molecules Animation Layer & Ambient Lattice */}
      <HeroMoleculesAnimation />

      <div className="relative z-10 max-w-7xl xl:max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center min-h-[480px] lg:min-h-[520px]">
          {/* LEFT COLUMN: Value Proposition & Editorial Actions (5 cols) */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-5 text-left">
            {/* Scientific Eyebrow List & Dual Pill Accent */}
            <div className="space-y-2">
              <div className="hero-enter-1 text-[11px] sm:text-xs font-semibold tracking-[0.15em] text-[#475569] uppercase flex flex-wrap items-center gap-x-2.5 gap-y-1">
                <span>PHARMACEUTICALS</span>
                <span className="text-[#008766] font-bold">•</span>
                <span>APIS</span>
                <span className="text-[#008766] font-bold">•</span>
                <span>INTERMEDIATES</span>
                <span className="text-[#008766] font-bold">•</span>
                <span>SPECIALTY CHEMICALS</span>
              </div>

              {/* Dual Pill Indicator Bars */}
              <div className="flex items-center gap-1.5 pt-0.5">
                <div className="w-9 h-[3.5px] rounded-full bg-[#008766]" />
                <div className="w-6 h-[3.5px] rounded-full bg-[#B2EBF2]" />
              </div>
            </div>

            {/* Disciplined Editorial Headline */}
            <h1 className="hero-enter-2 text-[2.5rem] leading-[1.08] xs:text-4xl sm:text-5xl lg:text-[3.85rem] font-extrabold tracking-tight text-[#0E2358]">
              Bringing Science <br />
              <span className="text-[#00A389]">to Life</span>
            </h1>

            {/* Narrative Paragraph */}
            <p className="hero-enter-3 text-sm sm:text-base lg:text-[1.02rem] text-[#475569] font-normal leading-relaxed max-w-lg">
              Advancing pharmaceutical research through high-purity APIs, impurities, intermediates, specialty chemicals, and custom synthesis solutions.
            </p>

            {/* Exact Pill Action Buttons matching mockup */}
            <div className="hero-enter-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1 w-full">
              <Link
                href="/products"
                prefetch={true}
                className="w-full sm:w-auto justify-center px-6 sm:px-7 py-3.5 rounded-full bg-[#008766] hover:bg-[#007356] text-white font-semibold text-xs sm:text-sm shadow-[0_8px_20px_rgba(0,135,102,0.28)] hover:shadow-[0_12px_28px_rgba(0,135,102,0.38)] flex items-center gap-2.5 cursor-pointer transition-all active:scale-[0.98]"
              >
                <svg className="w-4.5 h-4.5 text-white shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2" />
                  <path d="M8.5 2h7" />
                  <path d="M7 16h10" />
                  <circle cx="10" cy="18.5" r="0.75" fill="currentColor" stroke="none" />
                  <circle cx="13.5" cy="17.5" r="0.75" fill="currentColor" stroke="none" />
                </svg>
                <span>Explore Products</span>
                <LuArrowRight size={17} className="stroke-[2.2] shrink-0" />
              </Link>
              <Link
                href="/services"
                prefetch={true}
                className="w-full sm:w-auto justify-center px-6 sm:px-7 py-3.5 rounded-full bg-white/90 hover:bg-teal-50/50 text-[#008766] font-semibold text-xs sm:text-sm border-[1.5px] border-[#008766] flex items-center gap-2.5 cursor-pointer shadow-xs transition-all active:scale-[0.98]"
              >
                <svg className="w-5 h-5 text-[#008766] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                  <polygon points="12 7.5 13.2 10.1 16 10.5 14 12.4 14.5 15.2 12 13.8 9.5 15.2 10 12.4 8 10.5 10.8 10.1 12 7.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
                <span>Our Services</span>
                <LuArrowRight size={17} className="stroke-[2.2] shrink-0" />
              </Link>
            </div>

            {/* 4 Trust / Quality Pillars matching mockup */}
            <div className="hero-enter-4 pt-4 sm:pt-6 w-full max-w-lg">
              <div className="grid grid-cols-4 items-start">
                {/* 1. HIGH PURITY STANDARDS */}
                <div className="flex flex-col items-center text-center px-1">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#E0F7F2] flex items-center justify-center text-[#008766] mb-2 shadow-xs transition-transform hover:scale-105">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2" />
                      <path d="M8.5 2h7" />
                      <path d="M7 16h10" />
                      <circle cx="10" cy="18.5" r="0.8" fill="currentColor" stroke="none" />
                      <circle cx="13.5" cy="17.5" r="0.8" fill="currentColor" stroke="none" />
                    </svg>
                  </div>
                  <span className="text-[9px] xs:text-[10px] sm:text-[11px] font-bold tracking-wider text-[#475569] uppercase leading-tight font-sans">
                    HIGH PURITY<br />STANDARDS
                  </span>
                </div>

                {/* 2. RESEARCH DRIVEN */}
                <div className="flex flex-col items-center text-center px-1 relative">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 h-10 w-[1px] bg-slate-200" />
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#E0F7F2] flex items-center justify-center text-[#008766] mb-2 shadow-xs transition-transform hover:scale-105">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </div>
                  <span className="text-[9px] xs:text-[10px] sm:text-[11px] font-bold tracking-wider text-[#475569] uppercase leading-tight font-sans">
                    RESEARCH<br />DRIVEN
                  </span>
                </div>

                {/* 3. GLOBAL QUALITY */}
                <div className="flex flex-col items-center text-center px-1 relative">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 h-10 w-[1px] bg-slate-200" />
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#E0F7F2] flex items-center justify-center text-[#008766] mb-2 shadow-xs transition-transform hover:scale-105">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M8.2 14.5L7 20.5l5-2.2 5 2.2-1.2-6" />
                      <path d="M4.5 9.2a3.2 3.2 0 0 1 3.8-3.8 3.2 3.2 0 0 1 7.4 0 3.2 3.2 0 0 1 3.8 3.8 3.2 3.2 0 0 1 0 5 3.2 3.2 0 0 1-3.8 3.8 3.2 3.2 0 0 1-7.4 0 3.2 3.2 0 0 1-3.8-3.8 3.2 3.2 0 0 1 0-5Z" />
                      <polygon points="12 7.6 12.8 9.3 14.7 9.6 13.3 10.9 13.6 12.8 12 11.9 10.4 12.8 10.7 10.9 9.3 9.6 11.2 9.3 12 7.6" strokeWidth="1.3" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-[9px] xs:text-[10px] sm:text-[11px] font-bold tracking-wider text-[#475569] uppercase leading-tight font-sans">
                    GLOBAL<br />QUALITY
                  </span>
                </div>

                {/* 4. CUSTOM SOLUTIONS */}
                <div className="flex flex-col items-center text-center px-1 relative">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 h-10 w-[1px] bg-slate-200" />
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#E0F7F2] flex items-center justify-center text-[#008766] mb-2 shadow-xs transition-transform hover:scale-105">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12.5" r="3.8" strokeWidth="1.8" />
                      <line x1="12" y1="8.7" x2="12" y2="6.2" strokeWidth="1.8" />
                      <circle cx="12" cy="4.5" r="1.8" strokeWidth="1.8" />
                      <line x1="9.5" y1="14.8" x2="7.4" y2="17.2" strokeWidth="1.8" />
                      <circle cx="6.2" cy="18.8" r="1.8" strokeWidth="1.8" />
                      <line x1="14.5" y1="14.8" x2="16.6" y2="17.2" strokeWidth="1.8" />
                      <circle cx="17.8" cy="18.8" r="1.8" strokeWidth="1.8" />
                      <line x1="5.2" y1="11.5" x2="8.2" y2="11.5" strokeWidth="1.8" />
                      <line x1="15.8" y1="11.5" x2="18.8" y2="11.5" strokeWidth="1.8" />
                    </svg>
                  </div>
                  <span className="text-[9px] xs:text-[10px] sm:text-[11px] font-bold tracking-wider text-[#475569] uppercase leading-tight font-sans">
                    CUSTOM<br />SOLUTIONS
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: 3D Chemical Slideshow Showcase (7 cols) */}
          <div className="lg:col-span-7 relative w-full flex justify-center items-center">
            <ChemicalSlideshow />
          </div>
        </div>
      </div>
    </section>
  );
}

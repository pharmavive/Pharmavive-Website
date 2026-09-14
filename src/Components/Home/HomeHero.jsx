'use client';

import React from 'react';
import Link from 'next/link';
import { IoArrowForward } from 'react-icons/io5';
import ChemicalSlideshow from './ChemicalSlideshow';
import HeroMoleculesAnimation from './HeroMoleculesAnimation';

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-white text-[#0E2358] pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-[#E2E8F0]">
      {/* Soft Ambient Depth Lighting (Neutral Slate, no green) */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-slate-100/60 blur-3xl pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-slate-100/50 blur-3xl pointer-events-none" />

      {/* Floating 3D Molecules Animation Layer & Ambient Lattice */}
      <HeroMoleculesAnimation />

      <div className="relative z-10 max-w-7xl xl:max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center min-h-[480px] lg:min-h-[520px]">
          {/* LEFT COLUMN: Value Proposition & Editorial Actions matching media_1788863713293.png (5 cols) */}
          <div className="lg:col-span-5 space-y-5 text-left">
            {/* Scientific Eyebrow List */}
            <div className="hero-enter-1 text-[11px] sm:text-xs font-mono font-semibold tracking-[0.16em] text-[#475569] uppercase flex flex-wrap items-center gap-x-2 gap-y-1">
              <span>PHARMACEUTICALS</span>
              <span className="text-[#00A389]">•</span>
              <span>APIS</span>
              <span className="text-[#00A389]">•</span>
              <span>INTERMEDIATES</span>
              <span className="text-[#00A389]">•</span>
              <span>SPECIALTY CHEMICALS</span>
            </div>

            {/* Disciplined Editorial Headline */}
            <h1 className="hero-enter-2 text-[2.4rem] leading-[1.10] xs:text-4xl sm:text-5xl lg:text-[3.75rem] font-extrabold tracking-tight text-[#0E2358]">
              Bringing Science <br />
              <span className="text-[#00A389]">to Life</span>
            </h1>

            {/* Narrative Paragraph */}
            <p className="hero-enter-3 text-sm sm:text-base lg:text-[1.02rem] text-[#475569] font-normal leading-relaxed max-w-lg">
              Advancing pharmaceutical research through high-purity APIs, impurities, intermediates, specialty chemicals, and custom synthesis solutions.
            </p>

            {/* Exact Pill Action Buttons matching mockup */}
            <div className="hero-enter-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2 w-full">
              <Link
                href="/products"
                prefetch={true}
                className="btn-scientific-primary w-full sm:w-auto justify-center px-7 py-3.5 rounded-full bg-[#007a68] hover:bg-[#006657] text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer transition-all"
              >
                <span>Explore Products</span>
                <IoArrowForward size={16} />
              </Link>
              <Link
                href="/services"
                prefetch={true}
                className="btn-scientific-secondary w-full sm:w-auto justify-center px-7 py-3.5 rounded-full bg-transparent hover:bg-white/80 text-[#007a68] font-semibold text-xs sm:text-sm border border-[#007a68] flex items-center gap-2 cursor-pointer shadow-xs transition-all"
              >
                <span>Our Services</span>
              </Link>
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

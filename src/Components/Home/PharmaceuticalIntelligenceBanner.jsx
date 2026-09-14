'use client';

import React from 'react';
import Link from 'next/link';
import { IoArrowForward } from 'react-icons/io5';
import { useScrollReveal } from '@/utils/useScrollReveal';

export default function PharmaceuticalIntelligenceBanner() {
  const sectionRef = useScrollReveal({ threshold: 0.1 });

  return (
    <section className="bg-white pt-2">
      <div
        ref={sectionRef}
        className="scroll-reveal max-w-7xl mx-auto rounded-t-[2.5rem] lg:rounded-t-[3.5rem] bg-[#0A242B] text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl border-t border-x border-[#00A389]/20"
      >
        {/* Subtle Ambient Radial Glow & Molecular Lattice Overlay */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#00A389]/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#00A389]/10 blur-3xl pointer-events-none" />

        {/* Ambient Subtle Wave/Ribbon Path */}
        <div className="absolute inset-0 opacity-15 pointer-events-none select-none overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 1200 300" fill="none" preserveAspectRatio="none">
            <path
              d="M0,150 C300,50 600,250 1200,100"
              stroke="#00A389"
              strokeWidth="2"
              strokeDasharray="6 6"
              className="animate-pathway-flow"
            />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          {/* Left Textual Block */}
          <div className="space-y-3 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-mono font-semibold tracking-[0.2em] text-[#00A389] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#00A389] animate-pulse" />
              <span>TRUSTED PARTNER IN</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Pharmaceutical Intelligence
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed max-w-xl pt-1">
              Precision synthesis, comprehensive pharmacopeial impurity standards, and validated analytical dossiers supporting global drug discovery and commercial formulation.
            </p>
          </div>

          {/* Right Action Trigger */}
          <div className="flex-shrink-0">
            <Link
              href="/about"
              className="btn-scientific-primary inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-[#00A389]/40 hover:border-[#00A389] text-white font-semibold text-xs sm:text-sm backdrop-blur-sm shadow-md transition-all group cursor-pointer"
            >
              <span className="w-8 h-8 rounded-full bg-[#00A389] text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                <IoArrowForward size={15} />
              </span>
              <span>About Pharmavive</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

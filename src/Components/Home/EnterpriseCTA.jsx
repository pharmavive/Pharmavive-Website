'use client';

import React from 'react';
import Link from 'next/link';
import { useScrollReveal } from '@/utils/useScrollReveal';
import { IoMailOutline, IoLogoWhatsapp, IoArrowForward } from 'react-icons/io5';

export default function EnterpriseCTA() {
  const sectionRef = useScrollReveal({ threshold: 0.1 });

  return (
    <section
      ref={sectionRef}
      className="scroll-reveal py-16 sm:py-20 bg-gradient-to-br from-[#060F26] via-[#0E2358] to-[#060F26] text-white relative overflow-hidden border-t border-slate-800"
    >
      <div className="absolute inset-0 scientific-grid-dark opacity-30 animated-scientific-grid" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <span className="inline-block px-3.5 py-1 rounded-full bg-[#08A698]/20 border border-[#08A698]/40 text-[#08A698] text-xs font-mono font-medium">
          DIRECT TECHNICAL CONSULTATION & RFQ
        </span>

        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
          Ready to Accelerate Your Synthesis Pipeline?
        </h2>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Whether you need immediate dispatch of catalog reference standards or a dedicated team for multi-step organic synthesis, our technical experts in Hyderabad are ready to assist.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="group px-6 py-3.5 rounded-xl bg-[#08A698] hover:bg-[#078F83] text-white font-semibold text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98] transition-all flex items-center gap-2"
          >
            <IoMailOutline size={18} />
            <span>Submit Quotation Request (RFQ)</span>
            <IoArrowForward size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>

          <a
            href="https://wa.me/916302616273"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm border border-emerald-500/50 shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98] transition-all flex items-center gap-2"
          >
            <IoLogoWhatsapp size={18} />
            <span>Direct WhatsApp Desk</span>
          </a>
        </div>
      </div>
    </section>
  );
}

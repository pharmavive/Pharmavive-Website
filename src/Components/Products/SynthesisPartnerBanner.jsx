'use client';

import React from 'react';
import Link from 'next/link';
import {
  IoFlaskOutline,
  IoArrowForward,
  IoShieldCheckmarkOutline,
  IoGitNetworkOutline,
  IoPersonOutline,
} from 'react-icons/io5';
import { useScrollReveal } from '@/utils/useScrollReveal';

export default function SynthesisPartnerBanner() {
  const sectionRef = useScrollReveal({ threshold: 0.1 });

  return (
    <section ref={sectionRef} className="scroll-reveal py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#EBF9F7] via-[#F3FCFA] to-[#E8F8F5] border border-[#B3E7E2] p-8 sm:p-10 lg:p-12 overflow-hidden shadow-sm">
          {/* Subtle decorative molecular clusters floating in background */}
          <div className="absolute -left-6 -bottom-6 w-32 h-32 opacity-20 pointer-events-none animate-float-slow">
            <svg viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="18" fill="#00A389" />
              <circle cx="20" cy="20" r="10" fill="#00A389" />
              <circle cx="80" cy="80" r="12" fill="#0284C7" />
              <line x1="50" y1="50" x2="20" y2="20" stroke="#00A389" strokeWidth="3" />
              <line x1="50" y1="50" x2="80" y2="80" stroke="#00A389" strokeWidth="3" />
            </svg>
          </div>
          <div className="absolute -right-6 -top-6 w-32 h-32 opacity-20 pointer-events-none animate-float-delayed">
            <svg viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="16" fill="#0284C7" />
              <circle cx="80" cy="20" r="10" fill="#00A389" />
              <line x1="50" y1="50" x2="80" y2="20" stroke="#0284C7" strokeWidth="3" />
            </svg>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left & Center: Title, Narrative & RFQ Action */}
            <div className="lg:col-span-8 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-[#00A389]/30 text-[#00A389] text-[11px] font-mono font-semibold tracking-wider uppercase shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A389]" />
                <span>Need a Custom Solution?</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0E2358] tracking-tight">
                Your Synthesis Partner
              </h2>

              <p className="text-sm sm:text-base text-[#475569] font-normal max-w-2xl leading-relaxed">
                From milligrams to kilograms, we provide flexible and reliable custom synthesis services for your unique requirements.
              </p>

              <div className="pt-2">
                <Link
                  href="/synthesis"
                  className="btn-scientific-secondary inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white hover:bg-[#F8FDFA] text-[#0E2358] hover:text-[#00A389] font-semibold text-xs sm:text-sm border border-[#0E2358]/40 hover:border-[#00A389] shadow-sm group cursor-pointer"
                >
                  <IoFlaskOutline size={17} className="text-[#00A389] group-hover:rotate-12 transition-transform duration-200" />
                  <span>Request Custom Synthesis RFQ</span>
                  <IoArrowForward size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </div>

            {/* Right: 3 Key Pillars */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3.5 lg:border-l lg:border-[#CBD5E1]/60 lg:pl-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white border border-[#B3E7E2] text-[#00A389] flex items-center justify-center flex-shrink-0 shadow-2xs">
                  <IoPersonOutline size={16} />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-[#0E2358]">Expert Chemists</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white border border-[#B3E7E2] text-[#00A389] flex items-center justify-center flex-shrink-0 shadow-2xs">
                  <IoGitNetworkOutline size={16} />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-[#0E2358]">Flexible Scale</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white border border-[#B3E7E2] text-[#00A389] flex items-center justify-center flex-shrink-0 shadow-2xs">
                  <IoShieldCheckmarkOutline size={16} />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-[#0E2358]">Confidential &amp; Secure</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

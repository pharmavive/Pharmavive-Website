'use client';

import React from 'react';
import Link from 'next/link';
import { useScrollReveal } from '@/utils/useScrollReveal';

export default function HeroPillarsStrip() {
  const sectionRef = useScrollReveal({ threshold: 0.1 });

  const PILLARS = [
    {
      title: 'APIs & Intermediates',
      desc: 'High-purity APIs and intermediates for your manufacturing needs.',
      href: '/products',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 2v4.5L4.5 18a2 2 0 0 0 1.8 3h11.4a2 2 0 0 0 1.8-3L14 6.5V2" />
          <path d="M8.5 2h7" />
          <path d="M7 15h10" />
        </svg>
      ),
    },
    {
      title: 'Specialty Chemicals',
      desc: 'Advanced chemicals for specialized applications.',
      href: '/products',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
    },
    {
      title: 'Reagents',
      desc: 'High-purity analytical & synthesis reagents.',
      href: '/products',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 18h8" />
          <path d="M3 22h18" />
          <path d="M14 22a7 7 0 1 0-14 0" />
          <path d="M9 14h2" />
          <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2" />
          <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
        </svg>
      ),
    },
    {
      title: 'CDMO / Custom Synthesis',
      desc: 'Tailored synthesis solutions for your unique goals.',
      href: '/services',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="m2 15 5-5m0 0 5 5m-5-5V2" />
          <path d="m14 9 5 5m0 0 5-5m-5 5v10" />
          <path d="M6 18a4 4 0 0 0 6 3 4 4 0 0 0 6-3" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      ),
    },
    {
      title: 'Impurities',
      desc: 'Reliable standards for accurate research and analysis.',
      href: '/products',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
      ),
    },
  ];

  return (
    <section ref={sectionRef} className="scroll-reveal bg-white py-10 sm:py-12 border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-0 lg:divide-x lg:divide-slate-200/80">
          {PILLARS.map((p, idx) => {
            const delayClass = ['delay-75', 'delay-150', 'delay-225', 'delay-300', 'delay-350'][idx];
            return (
              <Link
                key={p.title}
                href={p.href}
                className={`scroll-reveal ${delayClass} card-hover-scientific group flex flex-col items-center text-center px-4 sm:px-6 py-4 rounded-2xl hover:bg-[#F8FDFA] transition-all cursor-pointer`}
              >
                {/* Circular Mint Icon Badge */}
                <div className="w-13 h-13 rounded-full bg-[#EBF7F6] text-[#00A389] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#D5F3EF] group-hover:shadow-sm transition-all duration-300 flex-shrink-0">
                  {p.icon}
                </div>

                {/* Pillar Title */}
                <h3 className="text-sm sm:text-base font-bold text-[#0E2358] group-hover:text-[#00A389] transition-colors mb-1.5 leading-snug">
                  {p.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-[#64748B] leading-relaxed max-w-[210px]">
                  {p.desc}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

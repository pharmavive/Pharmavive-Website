'use client';

import React from 'react';
import { useScrollReveal } from '@/utils/useScrollReveal';
import { IoShieldCheckmarkOutline, IoSpeedometerOutline, IoRibbonOutline, IoCheckmarkDoneOutline } from 'react-icons/io5';

export default function QualityPillars() {
  const sectionRef = useScrollReveal({ threshold: 0.1 });

  const pillars = [
    {
      icon: <IoShieldCheckmarkOutline size={24} className="text-[#08A698]" />,
      title: 'Analytical Data Documentation',
      description: 'Characterization data packages including 1H/13C-NMR, Mass Spectrometry, and HPLC purity profiles are provided with reference standards upon request.',
    },
    {
      icon: <IoRibbonOutline size={24} className="text-[#08A698]" />,
      title: 'Standards Alignment',
      description: 'Synthesized to support pharmaceutical analytical identification, qualification, and formulation R&D workflows.',
    },
    {
      icon: <IoSpeedometerOutline size={24} className="text-[#08A698]" />,
      title: 'Responsive Synthesis Turnaround',
      description: 'Streamlined synthetic route scouting and parallel synthesis enable fast turnaround for time-critical stability and formulation studies.',
    },
    {
      icon: <IoCheckmarkDoneOutline size={24} className="text-[#08A698]" />,
      title: 'Strict IP & Confidentiality',
      description: 'Comprehensive non-disclosure agreements and secure data protocols protect all client project inquiries and synthetic routes.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="scroll-reveal py-16 sm:py-20 bg-[#FBFBFC] text-[#0E2358] relative overflow-hidden border-t border-[#E2E8F0]"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-[#08A698] font-semibold bg-[#EBF7F6] px-3.5 py-1 rounded-full border border-[#B3E7E2]">
            Quality &amp; Technical Rigor
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0E2358] tracking-tight mt-3">
            Engineered for Pharmaceutical Scrutiny
          </h2>
          <p className="text-sm sm:text-base text-[#475569] mt-3 leading-relaxed">
            Our quality management approach is built to ensure reliable data integrity, consistent chemical purity, and responsive technical collaboration for pharmaceutical research.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => {
            const delayClass = ['delay-100', 'delay-150', 'delay-200', 'delay-250'][idx % 4];
            return (
              <div
                key={idx}
                className={`card-hover-scientific p-6 rounded-2xl bg-white border border-[#E2E8F0] flex flex-col justify-between space-y-4 group ${delayClass}`}
              >
                <div className="w-12 h-12 rounded-xl bg-[#EBF7F6] border border-[#B3E7E2] group-hover:border-[#08A698]/60 flex items-center justify-center group-hover:scale-105 transition-all duration-300">
                  {p.icon}
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0E2358] mb-2 group-hover:text-[#08A698] transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs text-[#475569] leading-relaxed">{p.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

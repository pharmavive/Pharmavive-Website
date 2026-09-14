'use client';

import React from 'react';
import { useScrollReveal } from '@/utils/useScrollReveal';
import { IoFlaskOutline, IoGitNetworkOutline, IoCheckmarkCircleOutline, IoAirplaneOutline } from 'react-icons/io5';

export default function TrustMetrics() {
  const sectionRef = useScrollReveal({ threshold: 0.1 });

  const pillars = [
    {
      icon: <IoFlaskOutline size={22} className="text-[#08A698]" />,
      metric: '2,500+',
      metricLabel: 'Reference Standards',
      label: 'Impurity Reference Standards',
      description: 'Well-characterized reference compounds for analytical identification and regulatory testing.',
    },
    {
      icon: <IoGitNetworkOutline size={22} className="text-[#0E2358]" />,
      metric: '500+',
      metricLabel: 'Scalable Routes',
      label: 'Custom Organic Synthesis',
      description: 'Complex multi-step synthetic chemistry, route development, and scalable kilo production.',
    },
    {
      icon: <IoCheckmarkCircleOutline size={22} className="text-[#08A698]" />,
      metric: '> 99%',
      metricLabel: 'Chemical Purity',
      label: 'Analytical Characterization',
      description: 'Structure elucidation verified through 1H/13C NMR, LC-MS, HPLC, and thermal profiling.',
    },
    {
      icon: <IoAirplaneOutline size={22} className="text-[#0E2358]" />,
      metric: '48h',
      metricLabel: 'Global Dispatch',
      label: 'Global Cold-Chain Logistics',
      description: 'Secure, temperature-controlled worldwide distribution dispatched from Hyderabad, India.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="scroll-reveal bg-white border-y border-slate-200 py-8 sm:py-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => {
            const delayClass = ['delay-100', 'delay-150', 'delay-200', 'delay-250'][idx % 4];
            return (
              <div
                key={idx}
                className={`card-hover-scientific p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 flex flex-col justify-between space-y-3 group ${delayClass}`}
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-2xs group-hover:scale-110 group-hover:border-[#08A698]/50 group-hover:bg-[#EBF7F6] transition-all duration-300">
                    {p.icon}
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-sm font-extrabold text-[#00A389] block leading-none">
                      {p.metric}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
                      {p.metricLabel}
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0E2358] tracking-tight group-hover:text-[#08A698] transition-colors">
                    {p.label}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

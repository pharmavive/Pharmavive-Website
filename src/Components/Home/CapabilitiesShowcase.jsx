'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useScrollReveal } from '@/utils/useScrollReveal';
import { IoCheckmarkCircle, IoArrowForward, IoFlaskOutline, IoAnalyticsOutline } from 'react-icons/io5';

export default function CapabilitiesShowcase() {
  const sectionRef = useScrollReveal({ threshold: 0.1 });
  const [activeTab, setActiveTab] = useState('analytical');

  const analyticalPoints = [
    'High-Resolution Liquid Chromatography & Mass Spectrometry (LC-MS)',
    'High-Performance Liquid Chromatography (HPLC) with UV/PDA Detectors',
    'Preparative & Semi-Prep HPLC Systems for High-Purity Impurity Isolation',
    'Gas Chromatography (GC) for Volatile Purity & Residual Solvent Analysis',
    'Karl Fischer Moisture Titration & Loss on Drying (LOD) Profiling',
    'Structural Verification via 1H & 13C NMR Spectroscopy',
  ];

  const synthesisPoints = [
    'Custom Synthesis of Complex Organic Molecules & Intermediates',
    'Stable Isotope Labelled Compounds (Deuterium 2H, 13C, 15N)',
    'Drug Metabolites, Glucuronides & Degradation Impurity Isolation',
    'Project-Based & Dedicated Full-Time-Equivalent (FTE) Synthetic Teams',
    'Custom Organic Synthesis & Process Optimization',
    'Strict Contractual IP Protection & Mutual Confidentiality',
  ];

  return (
    <section
      ref={sectionRef}
      className="scroll-reveal py-16 sm:py-20 bg-white border-t border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E6F7F5] text-[#08A698] border border-[#B3E7E2] text-xs font-mono font-medium mb-3">
            <IoFlaskOutline size={14} />
            <span>LABORATORY & CDMO CAPABILITIES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0E2358] tracking-tight">
            Integrated Synthesis & Analytical Capabilities
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Our facilities in Hyderabad combine comprehensive analytical characterization with agile synthetic organic chemistry to support pharmaceutical discovery and development.
          </p>

          {/* Tab Switcher */}
          <div className="flex flex-col sm:inline-flex sm:flex-row items-stretch sm:items-center p-1.5 rounded-2xl sm:rounded-xl bg-slate-100 border border-slate-200 mt-8 gap-2 w-full sm:w-auto max-w-md mx-auto">
            <button
              type="button"
              onClick={() => setActiveTab('analytical')}
              className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer w-full sm:w-auto ${
                activeTab === 'analytical'
                  ? 'bg-[#08A698] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <IoAnalyticsOutline size={16} />
              <span>Analytical Capabilities</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('synthesis')}
              className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer w-full sm:w-auto ${
                activeTab === 'synthesis'
                  ? 'bg-[#08A698] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <IoFlaskOutline size={16} />
              <span>Custom Organic Synthesis</span>
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        {activeTab === 'analytical' ? (
          <div
            key="analytical"
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center rounded-3xl bg-[#F8FAFC] border border-slate-200 p-6 sm:p-10 animate-backdrop-fade"
          >
            {/* Image */}
            <div className="group relative h-72 sm:h-96 rounded-2xl overflow-hidden shadow-md border border-slate-200">
              <Image
                src="/ab5.jpg"
                alt="Analytical Facility at Pharmavive"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-6">
                <span className="text-white text-xs font-mono bg-slate-900/80 backdrop-blur-xs px-3 py-1 rounded-md border border-white/20">
                  Analytical Suite & Preparative Isolation
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#08A698] font-bold">
                  Analytical Methodology
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0E2358] mt-1">
                  Chromatographic Purity & Structure Verification
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  Equipped with modern analytical instrumentation, our laboratory provides chromatographic purity determination and structure verification across chemical reference batches.
                </p>
              </div>

              <ul className="space-y-2.5">
                {analyticalPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <IoCheckmarkCircle className="text-[#08A698] flex-shrink-0 mt-0.5" size={18} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2">
                <Link
                  href="/products/all"
                  className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0E2358] hover:bg-[#060F26] text-white text-xs sm:text-sm font-semibold transition-all shadow-sm active:scale-[0.98]"
                >
                  <span>Explore Characterized Compounds</span>
                  <IoArrowForward size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div
            key="synthesis"
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center rounded-3xl bg-[#F8FAFC] border border-slate-200 p-6 sm:p-10 animate-backdrop-fade"
          >
            {/* Content */}
            <div className="space-y-6 order-2 lg:order-1">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#08A698] font-bold">
                  Organic Chemistry & CDMO
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0E2358] mt-1">
                  Custom Organic Synthesis & FTE Solutions
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  From complex multi-step route scouting to scalable organic synthesis, our dedicated synthetic chemistry teams deliver high-purity molecules on reliable timelines.
                </p>
              </div>

              <ul className="space-y-2.5">
                {synthesisPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <IoCheckmarkCircle className="text-[#08A698] flex-shrink-0 mt-0.5" size={18} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2">
                <Link
                  href="/synthesis"
                  className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#08A698] hover:bg-[#078F83] text-white text-xs sm:text-sm font-semibold transition-all shadow-sm active:scale-[0.98]"
                >
                  <span>Request Custom Synthesis Quote</span>
                  <IoArrowForward size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="group relative h-72 sm:h-96 rounded-2xl overflow-hidden shadow-md border border-slate-200 order-1 lg:order-2">
              <Image
                src="/ab6.jpg"
                alt="Synthesis Laboratory at Pharmavive"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-6">
                <span className="text-white text-xs font-mono bg-slate-900/80 backdrop-blur-xs px-3 py-1 rounded-md border border-white/20">
                  Organic Synthesis Lab
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

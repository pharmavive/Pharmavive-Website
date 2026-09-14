'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  IoAnalyticsOutline,
  IoCheckmarkCircle,
  IoDocumentTextOutline,
  IoArrowForward,
} from 'react-icons/io5';

const INSTRUMENTS = [
  {
    name: 'Shimadzu LCMS 8060 NX',
    category: 'Mass Spectrometry',
    desc: 'High-sensitivity triple quadrupole LC-MS/MS system for trace-level impurity quantification, genotoxic analysis, and molecular mass confirmation.',
    specs: 'Femtogram-level sensitivity, high-speed polarity switching (5 ms)',
  },
  {
    name: 'HPLC Systems with UV / PDA Detectors',
    category: 'Liquid Chromatography',
    desc: 'Analytical HPLC suites dedicated to chromatographic purity determination, assay quantification, and degradation profiling.',
    specs: 'Multi-wavelength UV/Vis & Photodiode Array (PDA) detection',
  },
  {
    name: 'Shimadzu Preparative HPLC Systems',
    category: 'Isolation Chemistry',
    desc: 'High-throughput preparative and semi-preparative chromatographic purification for isolating unknown impurities and target metabolites.',
    specs: 'Milligram to multi-gram isolation throughput with fraction collection',
  },
  {
    name: 'Agilent GC-HS Systems',
    category: 'Gas Chromatography',
    desc: 'Gas chromatography coupled with automated headspace sampling for residual solvent screening and volatile impurity profiling (ICH Q3C).',
    specs: 'Headspace sampler with flame ionization detection (FID)',
  },
  {
    name: 'TGA & Thermal Instruments',
    category: 'Physical Characterization',
    desc: 'Thermogravimetric analyzers for loss on drying, moisture content, decomposition temperature, and thermal stability profiles.',
    specs: 'Sub-microgram balance resolution with high-precision furnace',
  },
  {
    name: 'Automated Flash Chromatography',
    category: 'Purification',
    desc: 'High-pressure automated column purification systems ensuring rapid separation and recovery of high-purity synthetic intermediates.',
    specs: 'UV detection with gradient solvent programming',
  },
  {
    name: 'Lyophilizers & Freeze Dryers',
    category: 'Isolation Chemistry',
    desc: 'Industrial-grade freeze-drying equipment designed for hygroscopic peptides, reference standards, and moisture-sensitive compounds.',
    specs: 'Deep vacuum low-temperature sublimation systems',
  },
  {
    name: 'Perkin Elmer Spectrophotometers & Polarimeters (SOR)',
    category: 'Spectroscopy & Optical',
    desc: 'Specific Optical Rotation (SOR) measurement for chiral purity verification and Fourier-transform infrared spectroscopy (FTIR).',
    specs: 'Chiral angle accuracy to ±0.002°',
  },
];

export default function AnalyticalPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Section */}
        <div className="rounded-3xl bg-slate-950 text-white p-8 sm:p-14 relative overflow-hidden border border-slate-800">
          <div className="absolute inset-0 scientific-grid-dark opacity-30" />
          <div className="relative z-10 max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300 text-xs font-mono">
              <IoAnalyticsOutline size={14} />
              <span>PRECISION ANALYTICAL TESTING</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Analytical Characterization & Impurity Isolation
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Pharmavive’s four state-of-the-art analytical testing laboratories support complex pharmaceutical projects with certified instrumentation, rigorous method development, and regulatory documentation.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/contact?type=analytical"
                className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
              >
                <span>Request Analytical Services</span>
                <IoArrowForward size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* Facility Capabilities Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center rounded-3xl bg-white border border-slate-200 p-8 sm:p-12 shadow-xs">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-700">
              Four Modern Laboratories
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              A Specialized Infrastructure for Stringent Regulatory Audits
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Our research laboratories are tailored to meet rigorous standards in both analytical precision and quality testing, adhering strictly to global industry analytical guidelines.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Including a dedicated <strong>Preparative & Impurity Isolation Lab</strong>, our scientists isolate and elucidate unknown impurities from API batches, degradation stress tests, and formulated drug products.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-3 text-xs font-semibold text-slate-800">
              <span className="flex items-center gap-2">
                <IoCheckmarkCircle className="text-sky-600" size={16} />
                <span>ICH Q3A / Q3B Guidelines</span>
              </span>
              <span className="flex items-center gap-2">
                <IoCheckmarkCircle className="text-sky-600" size={16} />
                <span>Genotoxic Impurity Limits</span>
              </span>
              <span className="flex items-center gap-2">
                <IoCheckmarkCircle className="text-sky-600" size={16} />
                <span>CoA Dossier with Spectra</span>
              </span>
              <span className="flex items-center gap-2">
                <IoCheckmarkCircle className="text-sky-600" size={16} />
                <span>Nitrosamines Analysis</span>
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 relative h-80 sm:h-96 rounded-2xl overflow-hidden shadow-md border border-slate-200">
            <Image
              src="/ab5.jpg"
              alt="Pharmavive Analytical Facility"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
              <span className="text-white text-xs font-mono bg-slate-900/80 backdrop-blur-xs px-3 py-1 rounded-md border border-white/20">
                Analytical Testing & Preparative HPLC Labs
              </span>
            </div>
          </div>
        </div>

        {/* Detailed Instrumentation Matrix */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
              Equipment Suite
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Analytical Instrumentation & Specifications
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Our comprehensive instrumentation profile delivers robust detection limits and unequivocal structure elucidation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {INSTRUMENTS.map((inst, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-slate-200 p-6 flex flex-col justify-between hover:border-sky-300 hover:shadow-lg transition-all space-y-4"
              >
                <div className="space-y-2">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-medium uppercase tracking-wider bg-slate-100 text-slate-600">
                    {inst.category}
                  </span>
                  <h3 className="text-base font-bold text-slate-900">{inst.name}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{inst.desc}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 text-[11px] font-mono text-sky-800 bg-sky-50/50 p-2.5 rounded-xl">
                  <strong>Key Spec:</strong> {inst.specs}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Deliverables Section */}
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 text-sky-400 text-xs font-mono font-bold uppercase tracking-wider">
              <IoDocumentTextOutline size={18} />
              <span>Standard CoA Data Package</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Comprehensive Analytical Data Package Delivered with Every Compound
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We eliminate ambiguity in regulatory filings by supplying complete chromatographic and spectroscopic evidence for every batch release.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-200">
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                <strong className="block text-white mb-1">1H & 13C Nuclear Magnetic Resonance (NMR)</strong>
                Proton and carbon spectra verifying exact chemical connectivity and structure.
              </div>
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                <strong className="block text-white mb-1">Mass Spectrometry (LC-MS / MS)</strong>
                Confirmation of exact molecular ion mass, fragmentation patterns, and isotopic ratios.
              </div>
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                <strong className="block text-white mb-1">High-Performance Liquid Chromatography (HPLC)</strong>
                Validated chromatographic purity profile with retention times and peak area percentages.
              </div>
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                <strong className="block text-white mb-1">Thermogravimetric Analysis & Karl Fischer (TGA/KF)</strong>
                Assay correction for moisture content, residual solvents, and inorganic ash.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  IoFlaskOutline,
  IoShieldCheckmarkOutline,
  IoArrowForward,
  IoCheckmarkCircle,
  IoAnalyticsOutline,
  IoGitNetworkOutline,
  IoLeafOutline,
  IoPeopleOutline,
  IoChevronBack,
  IoChevronForward,
  IoCubeOutline,
  IoGlobeOutline,
  IoRibbonOutline,
  IoDocumentTextOutline,
  IoSparklesOutline,
  IoCloseOutline,
} from 'react-icons/io5';

// 6 Core Scientific Pillars from Reference Design
const SCIENTIFIC_PILLARS = [
  {
    id: 'synthesis',
    title: 'Custom Organic Synthesis',
    desc: 'Tailored synthesis solutions for unique research and industrial needs.',
    icon: IoFlaskOutline,
    href: '/contact',
  },
  {
    id: 'impurities',
    title: 'Impurity Profiling & Standards',
    desc: 'High-purity reference standards and impurity analysis for accurate results.',
    icon: IoShieldCheckmarkOutline,
    href: '/contact',
  },
  {
    id: 'analytical',
    title: 'High-Precision Analytical Characterization',
    desc: 'Advanced analytical services for structure, purity and identity confirmation.',
    icon: IoAnalyticsOutline,
    href: '/contact',
  },
  {
    id: 'scaleup',
    title: 'Scalable Synthesis & Route Scouting',
    desc: 'From concept to commercial scale, we support every step of your journey.',
    icon: IoGitNetworkOutline,
    href: '/contact',
  },
  {
    id: 'regulatory',
    title: 'Regulatory Support',
    desc: 'Guidance and documentation support for global compliance and faster approvals.',
    icon: IoLeafOutline,
    href: '/contact',
  },
  {
    id: 'partnerships',
    title: 'Long-Term Partnerships',
    desc: 'Building reliable partnerships for sustained growth and shared success.',
    icon: IoPeopleOutline,
    href: '/contact',
  },
];

// 4 Modern Facility Showcase Cards from Reference Design
const FACILITIES_LIST = [
  {
    id: 1,
    title: 'R&D Laboratory',
    subtitle: "Advanced research for tomorrow's solutions.",
    image: '/facility_rd_lab.jpg',
    category: 'Synthesis & Discovery',
    overview: 'Our synthetic research laboratory specializes in custom organic synthesis, multi-step heterocyclic building blocks, and synthetic route scouting for life science research and drug development.',
    keyCapabilities: [
      {
        title: 'Retrosynthetic Route Scouting',
        desc: 'Systematic design of scalable, atom-economical pathways with optimized reagent selection.',
      },
      {
        title: 'Chiral & Heterocyclic Synthesis',
        desc: 'High-enantioselectivity synthesis and complex heterocycles for active pharmaceutical research.',
      },
      {
        title: 'Impurity Standard Synthesis',
        desc: 'Targeted synthesis of process-related, degradation, and isomeric impurity reference materials.',
      },
      {
        title: 'Process Chemistry Feasibility',
        desc: 'Reaction parameter profiling, kinetic investigation, and catalytic screening for reproducible yields.',
      },
    ],
    qualityAssurance: 'Every synthesized lot undergoes full spectroscopic confirmation (NMR, LC-MS) with traceable documentation.',
  },
  {
    id: 2,
    title: 'Analytical Lab',
    subtitle: 'Precision. Purity. Performance.',
    image: '/facility_analytical_lab.jpg',
    category: 'Analytical Testing & QC',
    overview: 'High-precision analytical laboratory dedicated to definitive structural elucidation, chromatographic assaying, and rigorous quality certification for high-purity chemical standards.',
    keyCapabilities: [
      {
        title: 'Chromatographic Purity Assays',
        desc: 'Validated UHPLC/HPLC methods with multi-wavelength PDA detection ensuring purity >= 98.0%.',
      },
      {
        title: 'Structural Elucidation & Confirmation',
        desc: 'Comprehensive 1D/2D NMR (1H, 13C, 19F) and High-Resolution Mass Spectrometry (HRMS).',
      },
      {
        title: 'Impurity Identification & Quantification',
        desc: 'Advanced LC-MS/MS and GC-MS profiling of degradation products and potential genotoxic impurities.',
      },
      {
        title: 'Physicochemical & Volatiles Analysis',
        desc: 'Karl Fischer coulometric titration for water content, residual solvents by HS-GC, and melting point analysis.',
      },
    ],
    qualityAssurance: 'Batch release includes an authentic, traceable Certificate of Analysis (CoA) with raw analytical spectra.',
  },
  {
    id: 3,
    title: 'Pilot Plant',
    subtitle: 'From lab to larger scale.',
    image: '/facility_pilot_plant.jpg',
    category: 'Scale-Up & Process Development',
    overview: 'Our scale-up facility bridges milligram-scale bench discoveries to reliable multi-kilogram non-GMP and intermediate batches under strict process safety and quality controls.',
    keyCapabilities: [
      {
        title: 'Gram-to-Kilogram Scalable Synthesis',
        desc: 'Reproducible batch scale-up of complex APIs, key intermediates, and reference standard stocks.',
      },
      {
        title: 'Critical Process Parameter (CPP) Mapping',
        desc: 'Systematic control of thermodynamics, mixing kinetics, mass transfer, and yield optimization.',
      },
      {
        title: 'Process Safety & Calorimetric Profiling',
        desc: 'Reaction heat screening and off-gas monitoring to ensure safe, scalable, and stable operations.',
      },
      {
        title: 'Controlled Crystallization & Isolation',
        desc: 'Particle size engineering, selective polymorph crystallization, and high-efficiency filtration protocols.',
      },
    ],
    qualityAssurance: 'Batch Production Records (BPR) and comprehensive in-process testing verify batch-to-batch consistency.',
  },
  {
    id: 4,
    title: 'Formulation Development',
    subtitle: 'Better formulations. Greater impact.',
    image: '/facility_formulation.jpg',
    category: 'Formulation & Material Science',
    overview: 'Pre-formulation and solid-state characterization laboratory evaluating compound stability, excipient compatibility, and degradation kinetics to support drug delivery development.',
    keyCapabilities: [
      {
        title: 'Pre-Formulation Characterization',
        desc: 'Equilibrium solubility, pKa determination, partition coefficients (LogP/LogD), and hygroscopicity.',
      },
      {
        title: 'Excipient Compatibility Screening',
        desc: 'Stress testing of API-excipient binary mixtures to identify chemical degradation mechanisms.',
      },
      {
        title: 'Forced Degradation & Stress Testing',
        desc: 'Acid, base, oxidation, photolytic, and thermal stress studies to develop stability-indicating assays.',
      },
      {
        title: 'Solid-State & Polymorphic Screening',
        desc: 'Evaluation of crystal forms, amorphous dispersions, and thermal transitions to prevent phase changes.',
      },
    ],
    qualityAssurance: 'Conducted in alignment with ICH Q1A(R2) stability testing guidelines and pharmacopeial standards.',
  },
];

export default function AboutPage() {
  const [activeFacilityIndex, setActiveFacilityIndex] = useState(0);
  const [selectedFacilityModal, setSelectedFacilityModal] = useState(null);

  const handleNextFacility = () => {
    setActiveFacilityIndex((prev) => (prev + 1) % FACILITIES_LIST.length);
  };

  const handlePrevFacility = () => {
    setActiveFacilityIndex((prev) => (prev - 1 + FACILITIES_LIST.length) % FACILITIES_LIST.length);
  };

  return (
    <div className="min-h-screen bg-[#F5FAFA] text-[#0F172A]">

      {/* ================================================================
          1. HIGH-TECH HERO SECTION (PRESERVED & REFINED)
          ================================================================ */}
      <section className="relative overflow-hidden bg-white border-b border-[#E2E8F0] pt-12 pb-14 lg:pt-16 lg:pb-20">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(8,166,152,0.06)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(14,35,88,0.04)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Content (7 Cols) */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-[#0D3840] leading-[1.14]">
                Precision Chemistry <br />
                <span className="text-[#08A698]">for the Science</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                Pharmavive delivers high-purity chemical standards, complex impurity synthesis, specialty compounds, and custom organic chemistry solutions for pharmaceutical research and analytical development. Our work connects precise chemistry with the evolving needs of modern life sciences.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/products"
                  className="px-6 py-3.5 rounded-full bg-[#08A698] hover:bg-[#068A7E] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 cursor-pointer hover:-translate-y-0.5"
                >
                  <span>Explore Compound Catalog</span>
                  <IoArrowForward size={16} />
                </Link>

                <Link
                  href="/synthesis"
                  className="px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-[#0D3840] border border-slate-300 hover:border-[#08A698] text-xs sm:text-sm font-bold shadow-2xs transition-all duration-200 flex items-center gap-2 cursor-pointer hover:-translate-y-0.5"
                >
                  <span>Request Custom Synthesis</span>
                  <IoFlaskOutline size={16} className="text-[#08A698]" />
                </Link>
              </div>
            </div>

            {/* Right Media (5 Cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200/90 aspect-4/3 group">
                <Image
                  src="/why_choose_lab.jpg"
                  alt="Pharmavive Analytical Research Facility"
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#063F46]/85 via-transparent to-transparent pointer-events-none" />
                
                {/* Overlay Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/80 shadow-md text-left space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                    <span className="text-[11px] font-mono font-bold text-[#0D3840] uppercase">
                      GLP &amp; ISO 9001:2015 Aligned
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">
                    Integrated synthetic suites, cleanrooms, and advanced spectroscopic characterization infrastructure.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Key Trust Metrics Ribbon */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-2">
            <div className="bg-[#F8FAFC] rounded-2xl border border-slate-200/80 p-5 text-left transition-transform duration-200 hover:-translate-y-1 hover:border-[#08A698]/50 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-[#E6F7F5] text-[#08A698] flex items-center justify-center mb-2.5">
                <IoCubeOutline size={20} />
              </div>
              <div className="text-2xl font-extrabold text-[#0D3840] tracking-tight font-mono">
                12,450+
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Catalog Compounds &amp; Impurities
              </p>
            </div>

            <div className="bg-[#F8FAFC] rounded-2xl border border-slate-200/80 p-5 text-left transition-transform duration-200 hover:-translate-y-1 hover:border-[#08A698]/50 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-[#E6F7F5] text-[#08A698] flex items-center justify-center mb-2.5">
                <IoGlobeOutline size={20} />
              </div>
              <div className="text-2xl font-extrabold text-[#0D3840] tracking-tight font-mono">
                40+
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Global Partner Destinations
              </p>
            </div>

            <div className="bg-[#F8FAFC] rounded-2xl border border-slate-200/80 p-5 text-left transition-transform duration-200 hover:-translate-y-1 hover:border-[#08A698]/50 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-[#E6F7F5] text-[#08A698] flex items-center justify-center mb-2.5">
                <IoRibbonOutline size={20} />
              </div>
              <div className="text-2xl font-extrabold text-[#0D3840] tracking-tight font-mono">
                ≥ 99.5%
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Certified HPLC Purity Benchmark
              </p>
            </div>

            <div className="bg-[#F8FAFC] rounded-2xl border border-slate-200/80 p-5 text-left transition-transform duration-200 hover:-translate-y-1 hover:border-[#08A698]/50 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-[#E6F7F5] text-[#08A698] flex items-center justify-center mb-2.5">
                <IoDocumentTextOutline size={20} />
              </div>
              <div className="text-2xl font-extrabold text-[#0D3840] tracking-tight font-mono">
                100%
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Full COA &amp; Spectroscopic Traces
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ================================================================
          2. SECTION 1: OUR MISSION (MATCHING REFERENCE DESIGN)
          ================================================================ */}
      <section className="py-16 sm:py-20 relative overflow-hidden bg-gradient-to-b from-white via-[#F4FBFA] to-[#ECF7F5]">
        
        {/* Soft Ambient Chemical Wave Glow Background */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-[radial-gradient(circle,rgba(8,166,152,0.08)_0%,transparent_70%)] pointer-events-none -translate-y-1/2" />
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(0,229,190,0.06)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column (Mission Statement with 3D Molecule Orb Visual) */}
            <div className="lg:col-span-7 flex flex-col md:flex-row items-center gap-8 text-left">
              {/* 3D Translucent Molecule Orb Graphic */}
              <div className="relative w-44 h-44 sm:w-56 sm:h-56 shrink-0 group">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#08A698]/20 to-[#00E5BE]/30 blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/80 shadow-[0_15px_35px_rgba(8,166,152,0.2)]">
                  <Image
                    src="/about_mission_orb.jpg"
                    alt="Pharmavive Science-Driven Molecular Solutions"
                    fill
                    sizes="(max-width: 768px) 180px, 230px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

              {/* Text Description */}
              <div className="space-y-4 flex-1">
                <span className="text-xs font-mono font-bold tracking-widest text-[#08A698] uppercase">
                  OUR MISSION
                </span>
                
                <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#0D3840] tracking-tight leading-snug">
                  Science-Driven Solutions for a Better Tomorrow
                </h2>

                <p className="text-xs sm:text-[13.5px] text-slate-600 leading-relaxed">
                  We empower progress by delivering high-quality pharmaceuticals and specialty chemicals, enabling breakthroughs in research, healthcare and industry. Our commitment is to make advanced chemical solutions accessible, reliable and sustainable — for a healthier, safer and brighter future.
                </p>

                <div className="pt-2">
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#08545B] hover:bg-[#064247] text-white text-xs sm:text-sm font-semibold shadow-sm hover:shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <span>Learn More</span>
                    <IoArrowForward size={14} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column (Two Strategic Focus Cards) */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Top Light Card: Accelerating Discovery */}
              <div className="p-6 rounded-3xl bg-white/95 backdrop-blur-sm border border-[#D5EFEA] shadow-xs hover:shadow-md transition-all duration-200 text-left flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-[#E5F7F4] text-[#08A698] flex items-center justify-center shrink-0 group-hover:bg-[#08A698] group-hover:text-white transition-colors duration-200">
                  <IoSparklesOutline size={22} />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-base text-[#0D3840] group-hover:text-[#08A698] transition-colors">
                      Accelerating Discovery &amp; Analytical Rigor
                    </h3>
                    <div className="w-7 h-7 rounded-full border border-[#D5EFEA] group-hover:border-[#08A698] text-[#08A698] flex items-center justify-center shrink-0 ml-2 transition-colors">
                      <IoArrowForward size={13} />
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    We enable faster research, safer development and better healthcare outcomes with high-quality products and expert support.
                  </p>
                </div>
              </div>

              {/* Bottom Dark Teal Card: Global Standards. Local Support. */}
              <div className="relative overflow-hidden rounded-3xl p-6 bg-gradient-to-r from-[#063F46] via-[#084D55] to-[#0A5760] text-white border border-[#0E6A75] shadow-md hover:shadow-lg transition-all duration-200 text-left flex items-start gap-4 group">
                {/* Background Chemistry Glassware */}
                <Image
                  src="/about_glassware_banner.jpg"
                  alt="Laboratory Glassware"
                  fill
                  sizes="450px"
                  className="object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#063F46]/95 via-[#084D55]/90 to-[#0A5760]/85 pointer-events-none" />

                <div className="w-12 h-12 rounded-2xl bg-[#0E606A] border border-[#167884] text-[#4EE5D6] flex items-center justify-center shrink-0 relative z-10">
                  <IoShieldCheckmarkOutline size={22} />
                </div>

                <div className="flex-1 space-y-1 relative z-10">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-base text-white">
                      Global Standards. Local Support.
                    </h3>
                    <div className="w-7 h-7 rounded-full border border-white/30 text-white/90 group-hover:text-white flex items-center justify-center shrink-0 ml-2 transition-colors">
                      <IoArrowForward size={13} />
                    </div>
                  </div>
                  <p className="text-xs text-slate-200/90 leading-relaxed">
                    From APIs to custom synthesis, we follow rigorous quality systems and regulatory frameworks to deliver consistency, safety and peace of mind.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ================================================================
          3. SECTION 2: OUR SCIENTIFIC PILLARS (MATCHING REFERENCE DESIGN)
          ================================================================ */}
      <section className="py-16 sm:py-20 relative bg-[#F5FAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Large Clean Enclosure Container */}
          <div className="bg-white/80 backdrop-blur-md rounded-[32px] sm:rounded-[40px] border border-[#D5EFEA] p-6 sm:p-10 lg:p-12 shadow-sm space-y-8">
            
            {/* Section Header Row */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-left border-b border-slate-100 pb-6">
              <div className="space-y-1.5 max-w-2xl">
                <span className="text-xs font-mono font-bold tracking-widest text-[#08A698] uppercase">
                  OUR SCIENTIFIC PILLARS
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#0D3840] tracking-tight">
                  Built on Science. Driven by Purpose.
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  We bring together expertise, infrastructure and innovation to deliver high-quality chemicals and customized solutions for a wide range of industries.
                </p>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#08A698] hover:text-[#064247] transition-colors shrink-0 group cursor-pointer"
              >
                <span>Explore all</span>
                <IoArrowForward size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* 6 Scientific Pillars Grid (2x3 Layout) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {SCIENTIFIC_PILLARS.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <Link
                    key={pillar.id}
                    href={pillar.href}
                    className="p-6 rounded-2xl sm:rounded-3xl bg-white border border-[#DDF0ED] shadow-2xs hover:shadow-md hover:border-[#08A698]/50 transition-all duration-200 flex flex-col justify-between text-left group hover:-translate-y-1"
                  >
                    <div>
                      {/* Top Action Row */}
                      <div className="flex items-center justify-between">
                        <div className="w-11 h-11 rounded-full bg-[#E5F7F4] text-[#08A698] flex items-center justify-center group-hover:bg-[#08A698] group-hover:text-white transition-colors duration-200">
                          <Icon size={20} />
                        </div>
                        <div className="w-7 h-7 rounded-full border border-[#D5EFEA] group-hover:border-[#08A698] group-hover:bg-[#E5F7F4] text-[#08A698] flex items-center justify-center text-xs transition-colors">
                          <IoArrowForward size={12} className="group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>

                      {/* Content */}
                      <h3 className="text-base font-bold text-[#0D3840] mt-4 group-hover:text-[#08A698] transition-colors leading-snug">
                        {pillar.title}
                      </h3>

                      <p className="text-xs text-slate-500 leading-relaxed mt-2">
                        {pillar.desc}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>

          </div>

        </div>
      </section>

      {/* ================================================================
          4. SECTION 3: OUR FACILITIES (MATCHING REFERENCE DESIGN)
          ================================================================ */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-[#F5FAFA] via-white to-[#F0F9F8] border-t border-[#E2E8F0] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Section Header Row with Controls */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 text-left">
            <div className="space-y-1.5 max-w-2xl">
              <span className="text-xs font-mono font-bold tracking-widest text-[#08A698] uppercase">
                OUR FACILITIES
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#0D3840] tracking-tight">
                State-of-the-Art Research Facilities
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Our modern laboratories and advanced infrastructure enable us to maintain the highest standards of quality, safety and innovation.
              </p>
            </div>

            {/* Carousel Pagination Dots & Action Buttons */}
            <div className="flex items-center gap-4 shrink-0">
              {/* Interactive Pagination Dots */}
              <div className="hidden sm:flex items-center gap-1.5">
                {FACILITIES_LIST.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveFacilityIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      activeFacilityIndex === idx ? 'w-6 bg-[#08A698]' : 'w-2 bg-[#C5ECE5] hover:bg-[#08A698]/60'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Explore Capabilities Pill */}
              <Link
                href="/services"
                className="px-4 py-2 rounded-full border border-[#08A698] text-[#08A698] hover:bg-[#E5F7F4] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Explore Capabilities</span>
                <IoArrowForward size={13} />
              </Link>

              {/* Prev / Next Arrows */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handlePrevFacility}
                  className="w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 hover:text-[#08A698] shadow-2xs transition-colors cursor-pointer"
                  aria-label="Previous facility"
                >
                  <IoChevronBack size={15} />
                </button>
                <button
                  type="button"
                  onClick={handleNextFacility}
                  className="w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 hover:text-[#08A698] shadow-2xs transition-colors cursor-pointer"
                  aria-label="Next facility"
                >
                  <IoChevronForward size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* 4 Facility Showcase Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {FACILITIES_LIST.map((fac, idx) => (
              <div
                key={fac.id}
                onClick={() => setSelectedFacilityModal(fac)}
                className={`group relative rounded-3xl overflow-hidden shadow-xs hover:shadow-xl border transition-all duration-300 cursor-pointer flex flex-col justify-end aspect-4/3 sm:aspect-3/4 ${
                  activeFacilityIndex === idx ? 'border-[#08A698] ring-2 ring-[#08A698]/20' : 'border-slate-200/90'
                }`}
              >
                {/* Background Photo */}
                <Image
                  src={fac.image}
                  alt={fac.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />

                {/* Gradient Shading */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#063F46] via-[#063F46]/60 to-transparent pointer-events-none" />

                {/* Bottom Overlay Info Banner */}
                <div className="relative z-10 p-4 sm:p-5 text-left text-white flex items-end justify-between">
                  <div className="space-y-0.5 max-w-[80%]">
                    <h3 className="font-bold text-base text-white group-hover:text-[#55E6D5] transition-colors">
                      {fac.title}
                    </h3>
                    <p className="text-[11.5px] text-slate-200/90 leading-snug">
                      {fac.subtitle}
                    </p>
                  </div>

                  {/* Circular Action Arrow */}
                  <div className="w-8 h-8 rounded-full bg-[#08545B] group-hover:bg-[#08A698] text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-all">
                    <IoArrowForward size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================================================================
          5. CALL TO ACTION: COLLABORATION DESK
          ================================================================ */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[32px] sm:rounded-[40px] bg-gradient-to-br from-[#063238] via-[#08454D] to-[#042428] border border-[#0D5963] p-8 sm:p-12 lg:p-14 text-white relative overflow-hidden shadow-xl text-left space-y-6">
            
            <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(0,229,190,0.18)_0%,transparent_70%)] pointer-events-none" />
            <div className="absolute -left-16 -top-16 w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(8,166,152,0.16)_0%,transparent_70%)] pointer-events-none" />

            <div className="relative z-10 max-w-3xl space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#2DD4BF] text-xs font-mono font-bold tracking-wider uppercase border border-white/15">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2DD4BF] animate-pulse" />
                <span>SCIENTIFIC COLLABORATION</span>
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Ready to Accelerate Your Chemistry or Synthesis Pipeline?
              </h2>

              <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed max-w-2xl">
                Whether you need custom synthesis route feasibility, a specialized degradation impurity standard, or high-purity reference materials, our scientific team is ready to assist.
              </p>
            </div>

            <div className="relative z-10 flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/contact"
                className="px-7 py-3.5 rounded-full bg-white hover:bg-emerald-50 text-[#063E3A] text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 cursor-pointer hover:-translate-y-0.5"
              >
                <span>Consult Our Scientific Team</span>
                <IoArrowForward size={16} />
              </Link>

              <Link
                href="/synthesis"
                className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/30 text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 cursor-pointer hover:-translate-y-0.5"
              >
                <span>Custom Synthesis Solutions</span>
                <IoFlaskOutline size={16} className="text-[#2DD4BF]" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ================================================================
          6. MODAL FOR FACILITY DETAILS
          ================================================================ */}
      {selectedFacilityModal && (
        <div
          onClick={() => setSelectedFacilityModal(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 text-left"
          >
            {/* Modal Hero Header */}
            <div className="relative h-48 sm:h-56 w-full shrink-0">
              <Image
                src={selectedFacilityModal.image}
                alt={selectedFacilityModal.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              
              {/* Close Button Top-Right */}
              <button
                type="button"
                onClick={() => setSelectedFacilityModal(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-all cursor-pointer shadow-md z-10"
                title="Close"
                aria-label="Close modal"
              >
                <IoCloseOutline size={22} />
              </button>

              <div className="absolute bottom-4 left-5 right-5 text-white">
                <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-mono font-bold bg-[#08A698] text-white">
                  {selectedFacilityModal.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold mt-1 text-white">
                  {selectedFacilityModal.title}
                </h3>
                <p className="text-xs text-slate-200 mt-0.5">
                  {selectedFacilityModal.subtitle}
                </p>
              </div>
            </div>

            {/* Modal Body with Rich Scientific Details */}
            <div className="p-5 sm:p-6 space-y-4">
              {/* Overview paragraph */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {selectedFacilityModal.overview}
              </p>

              {/* Core Scientific Focus */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-3.5 rounded-full bg-[#08A698]" />
                  <h4 className="text-[11px] font-mono font-bold text-[#0D3840] uppercase tracking-wider">
                    Core Scientific Focus &amp; Methodologies
                  </h4>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedFacilityModal.keyCapabilities.map((cap, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-[#F8FAFC] border border-slate-100 hover:border-[#08A698]/30 transition-colors space-y-1"
                    >
                      <div className="flex items-start gap-1.5">
                        <IoCheckmarkCircle className="text-[#08A698] shrink-0 mt-0.5" size={15} />
                        <h5 className="text-xs font-bold text-[#0F172A] leading-snug">
                          {cap.title}
                        </h5>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-normal pl-5">
                        {cap.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quality & Regulatory Benchmark */}
              <div className="p-3.5 bg-gradient-to-r from-[#F0FDF4] to-[#F4FBFA] rounded-2xl border border-emerald-200/70 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <IoShieldCheckmarkOutline size={18} />
                </div>
                <div className="space-y-0.5">
                  <div className="text-[11px] font-mono font-bold text-emerald-800 uppercase tracking-wide">
                    Quality &amp; Regulatory Benchmark
                  </div>
                  <p className="text-xs text-slate-700 font-medium leading-relaxed">
                    {selectedFacilityModal.qualityAssurance}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

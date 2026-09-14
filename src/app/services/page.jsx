'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  IoFlaskOutline,
  IoAnalyticsOutline,
  IoCheckmarkCircle,
  IoArrowForward,
  IoShieldCheckmarkOutline,
  IoPeopleOutline,
  IoGitNetworkOutline,
  IoDocumentTextOutline,
  IoSendOutline,
  IoLayersOutline,
  IoTimeOutline,
  IoSparklesOutline,
  IoLockClosedOutline,
  IoCallOutline,
  IoChevronForward,
  IoCubeOutline,
  IoColorWandOutline,
  IoBusinessOutline,
  IoGlobeOutline,
} from 'react-icons/io5';

// 4 Core Scientific Pillars
const SCIENTIFIC_PILLARS = [
  {
    id: 'synthesis',
    title: 'Custom Organic Synthesis',
    badge: 'Target Molecule Synthesis',
    icon: IoFlaskOutline,
    headline: 'Complex Multi-Step Synthesis & Route Scouting',
    desc: 'Tailored synthesis of complex organic targets, chiral building blocks, heterocyclic intermediates, and bioactive analogues from milligram exploratory scales to multi-kilogram supply.',
    capabilities: [
      {
        name: 'Retrosynthetic Route Scouting',
        detail: 'Systematic screening of scalable, atom-economical synthetic pathways with optimized reagent selection.',
      },
      {
        name: 'Chiral & Stereoselective Chemistry',
        detail: 'High-enantioselectivity synthesis, asymmetric reductions, and resolved chiral center building blocks.',
      },
      {
        name: 'Heterocyclic Scaffolds',
        detail: 'Deep expertise in pyridine, indole, pyrimidine, quinoline, and novel spiro-fused heterocyclic architectures.',
      },
      {
        name: 'Reaction Optimization',
        detail: 'Reaction parameter profiling, kinetic investigation, and catalytic screening for reproducible yields.',
      },
    ],
    deliverables: 'Full structural dossier: 1H-NMR, 13C-NMR, LC-MS, HPLC chromatogram (purity >= 98.0%), and synthetic batch summary.',
    image: '/facility_rd_lab.jpg',
  },
  {
    id: 'impurities',
    title: 'Impurity Standards & Isolation',
    badge: 'Reference Standards',
    icon: IoShieldCheckmarkOutline,
    headline: 'High-Purity Impurities & Stable Isotope Labeling',
    desc: 'Targeted synthesis of process-related impurities, active degradation metabolites, and stable isotope-labelled (SIL) internal standards (2H, 13C, 15N) for bioanalytical LC-MS/MS validation.',
    capabilities: [
      {
        name: 'Degradation & Stress Impurities',
        detail: 'Targeted synthesis and isolation of forced-degradation, oxidative, hydrolytic, and photolytic products.',
      },
      {
        name: 'Stable Isotope Labeling (SIL)',
        detail: 'Deuterium (2H), Carbon-13 (13C), and Nitrogen-15 (15N) incorporation with isotopic purity > 99 atom %.',
      },
      {
        name: 'Nitrosamine & Mutagenic Standards',
        detail: 'Trace-level reference standards for nitrosamines and genotoxic impurities under strict safety protocols.',
      },
      {
        name: 'Semi-Preparative HPLC Isolation',
        detail: 'Chromatographic fraction isolation from stressed API batches followed by definitive spectroscopic elucidation.',
      },
    ],
    deliverables: 'Certificate of Analysis (CoA), isotopic enrichment confirmation, chromatographic assay, and safety data sheet (SDS).',
    image: '/facility_analytical_lab.jpg',
  },
  {
    id: 'analytical',
    title: 'Analytical Characterization',
    badge: 'Quality Release',
    icon: IoAnalyticsOutline,
    headline: 'Definitive Structural Elucidation & Purity Assaying',
    desc: 'High-precision analytical testing services providing unequivocal structural confirmation, chromatographic purity validation, and quantitative residual solvent screening.',
    capabilities: [
      {
        name: 'High-Resolution Chromatographic Assays',
        detail: 'Validated UHPLC and HPLC methods with multi-wavelength PDA detection ensuring purity >= 98.0%.',
      },
      {
        name: 'Nuclear Magnetic Resonance (NMR)',
        detail: 'Comprehensive 1D and 2D NMR (1H, 13C, 19F, 31P, COSY, HSQC, HMBC) for definitive connectivity proof.',
      },
      {
        name: 'High-Resolution Mass Spectrometry',
        detail: 'HRMS and LC-MS/MS accurate mass determination verifying molecular formulas and fragmentation patterns.',
      },
      {
        name: 'Volatiles & Moisture Determination',
        detail: 'Residual solvents by headspace GC-FID (ICH Q3C) and coulometric Karl Fischer titration for water content.',
      },
    ],
    deliverables: 'Comprehensive Certificate of Analysis (CoA) with raw spectra overlays and analytical method descriptions.',
    image: '/about_glassware_banner.jpg',
  },
  {
    id: 'scaleup',
    title: 'Process Scale-Up & Feasibility',
    badge: 'Scale-Up Chemistry',
    icon: IoGitNetworkOutline,
    headline: 'Kilogram-Scale Demonstration & Process Optimization',
    desc: 'Bridging discovery chemistry and commercial scale-up through systematic evaluation of critical process parameters (CPP), reaction safety calorimetry, and reproducible crystal form isolation.',
    capabilities: [
      {
        name: 'Gram-to-Kilogram Synthetic Batches',
        detail: 'Reproducible batch scale-up of key intermediates, specialty building blocks, and reference materials.',
      },
      {
        name: 'Critical Process Parameter (CPP) Mapping',
        detail: 'Systematic evaluation of temperature gradients, reaction kinetics, agitation, and mass transfer efficiency.',
      },
      {
        name: 'Reaction Safety & Exotherm Profiling',
        detail: 'Thermal runaway screening, off-gas monitoring, and reaction calorimetry to ensure safe scalability.',
      },
      {
        name: 'Controlled Crystallization & Isolation',
        detail: 'Particle size engineering, selective polymorph crystallization, and high-efficiency filtration protocols.',
      },
    ],
    deliverables: 'Batch Production Records (BPR), in-process testing controls (IPC), and technology transfer dossiers.',
    image: '/facility_pilot_plant.jpg',
  },
];

// 9 Core Services from Reference Design
const CORE_SERVICES = [
  {
    id: 'api-intermediates',
    title: 'API & Intermediates',
    desc: 'High-quality APIs and intermediates for pharmaceutical and biotech applications.',
    icon: IoFlaskOutline,
    image: '/service-icons/api-intermediates.png',
    href: '/contact',
  },
  {
    id: 'building-blocks',
    title: 'Building Blocks',
    desc: 'Essential building blocks for innovative drug discovery and development.',
    icon: IoCubeOutline,
    image: '/service-icons/building-blocks.png',
    href: '/contact',
  },
  {
    id: 'heterocyclic',
    title: 'Heterocyclic Intermediates',
    desc: 'Specialized heterocyclic intermediates for advanced synthesis and research applications.',
    icon: IoGitNetworkOutline,
    image: '/service-icons/heterocyclic.png',
    href: '/contact',
  },
  {
    id: 'fine-chemicals',
    title: 'Fine Chemicals',
    desc: 'High-purity fine chemicals for R&D, analytical and industrial use.',
    icon: IoFlaskOutline,
    image: '/service-icons/fine-chemicals.png',
    href: '/contact',
  },
  {
    id: 'peptides',
    title: 'Peptides',
    desc: 'Custom and catalog peptides for research, therapeutic and biotech applications.',
    icon: IoSparklesOutline,
    image: '/service-icons/peptides.png',
    href: '/contact',
  },
  {
    id: 'impurities',
    title: 'Impurities',
    desc: 'Reference standards and impurities for quality control and regulatory compliance.',
    icon: IoShieldCheckmarkOutline,
    image: '/service-icons/impurities.png',
    href: '/contact',
  },
  {
    id: 'custom-synthesis',
    title: 'Custom Synthesis',
    desc: 'Tailored synthesis solutions for unique research and industrial needs.',
    icon: IoColorWandOutline,
    image: '/service-icons/custom-synthesis.png',
    href: '/contact',
  },
  {
    id: 'cdmo',
    title: 'CDMO / Custom Synthesis',
    desc: 'End-to-end development and manufacturing services for your molecules.',
    icon: IoBusinessOutline,
    image: '/service-icons/cdmo.png',
    href: '/contact',
  },
  {
    id: 'impurity-profiling',
    title: 'Impurity Profiling & Standards',
    desc: 'Analytical services and certified standards for accurate results and compliance.',
    icon: IoAnalyticsOutline,
    image: '/service-icons/impurity-profiling.png',
    href: '/contact',
  },
];

// 4 Advantage Pillars from Reference Design
const ADVANTAGE_PILLARS = [
  {
    id: 'expertise',
    title: 'Global Expertise',
    desc: 'Serving clients across 50+ countries.',
    icon: IoGlobeOutline,
  },
  {
    id: 'facilities',
    title: 'State-of-the-Art Facilities',
    desc: 'Modern labs & advanced technology.',
    icon: IoFlaskOutline,
  },
  {
    id: 'engagement',
    title: 'Flexible Engagement Models',
    desc: 'R&D, custom synthesis, CDMO & more.',
    icon: IoGitNetworkOutline,
  },
  {
    id: 'partnerships',
    title: 'Long-Term Partnerships',
    desc: 'More than just a supplier — a trusted partner.',
    icon: IoPeopleOutline,
  },
];

export default function ServicesPage() {
  const [activePillar, setActivePillar] = useState('synthesis');

  // RFQ Form State
  const [selectedService, setSelectedService] = useState('Custom Organic Synthesis');
  const [selectedScale, setSelectedScale] = useState('Gram (1 g - 100 g)');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [inquiryText, setInquiryText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [inquiryError, setInquiryError] = useState('');

  const currentPillar =
    SCIENTIFIC_PILLARS.find((p) => p.id === activePillar) || SCIENTIFIC_PILLARS[0];

  const handleQuickInquiry = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setInquiryError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          company: company.trim(),
          serviceCategory: selectedService,
          targetScale: selectedScale,
          message: inquiryText.trim(),
          type: 'service_rfq',
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
        setEmail('');
        setCompany('');
        setInquiryText('');
        setTimeout(() => setSubmitted(false), 6000);
      } else {
        setInquiryError(data.error || 'Failed to transmit inquiry.');
      }
    } catch {
      setInquiryError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-[#0E2358]">
      {/* ================================================================
          1. HIGH-TECH SERVICES HERO SECTION
          ================================================================ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F5FAFA] via-white to-white pt-12 pb-16 lg:pt-16 lg:pb-20 border-b border-slate-200/80 text-left">
        {/* Ambient Subtle Radial Flares */}
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[radial-gradient(circle,rgba(8,166,152,0.08)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[radial-gradient(circle,rgba(14,35,88,0.05)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Main Hero Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Column: Heading & Value Proposition */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Scientific Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF7F6] border border-[#B3E7E2] text-[#08A698] text-[11px] sm:text-xs font-mono font-bold tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-[#08A698] animate-pulse shrink-0" />
                <span>SCIENTIFIC SERVICES &amp; CDMO EXCELLENCE</span>
              </div>

              {/* Editorial Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold tracking-tight text-[#0E2358] leading-[1.12]">
                Precision Chemistry &amp; <br />
                <span className="text-[#08A698]">Analytical Services</span>
              </h1>

              {/* Narrative Paragraph */}
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                From retrosynthetic route scouting and complex custom organic synthesis to rigorous structural elucidation and process scale-up, Pharmavive accelerates drug discovery and validation with certified analytical dossiers.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <a
                  href="#rfq-section"
                  className="px-7 py-3.5 rounded-full bg-[#007a68] hover:bg-[#006657] text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all hover:-translate-y-0.5"
                >
                  <span>Request Service RFQ</span>
                  <IoArrowForward size={16} />
                </a>

                <a
                  href="#capabilities"
                  className="px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-[#0E2358] font-semibold text-xs sm:text-sm border border-slate-300 flex items-center justify-center gap-2 cursor-pointer shadow-2xs transition-all hover:-translate-y-0.5"
                >
                  <IoFlaskOutline size={16} className="text-[#08A698]" />
                  <span>Explore Capabilities</span>
                </a>
              </div>

            </div>

            {/* Right Column: Hero Visual Glassware Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200/90 aspect-4/3 sm:aspect-16/11 group">
                <Image
                  src="/hero_molecular_crystal.jpg"
                  alt="Scientific Research & Analytical Matrix"
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#063238] via-black/20 to-transparent" />
                
                {/* Floating Overlay Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/60 shadow-lg text-left flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#EBF7F6] text-[#08A698] flex items-center justify-center shrink-0">
                    <IoShieldCheckmarkOutline size={22} />
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <div className="text-xs font-bold text-[#0E2358]">
                      Certified Analytical Dossiers
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">
                      NMR, LC-MS, HPLC &ge; 98.0% &bull; Full Batch Traceability
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* 4 Proof-Point Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-slate-200/80">
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#08A698]">
                &ge; 99.2%
              </div>
              <div className="text-xs font-bold text-[#0E2358]">Average HPLC Purity</div>
              <div className="text-[11px] text-slate-500">Rigorous baseline assays</div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#08A698]">
                500+
              </div>
              <div className="text-xs font-bold text-[#0E2358]">Syntheses Delivered</div>
              <div className="text-[11px] text-slate-500">Global research batches</div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#08A698]">
                24–48h
              </div>
              <div className="text-xs font-bold text-[#0E2358]">Feasibility &amp; Quote</div>
              <div className="text-[11px] text-slate-500">Rapid turnaround time</div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#08A698]">
                100%
              </div>
              <div className="text-xs font-bold text-[#0E2358]">Traceable CoA Packages</div>
              <div className="text-[11px] text-slate-500">With raw spectra files</div>
            </div>
          </div>

        </div>
      </section>

      {/* ================================================================
          2. CORE SCIENTIFIC CAPABILITIES (INTERACTIVE PILLARS)
          ================================================================ */}
      <section id="capabilities" className="py-16 sm:py-20 bg-white text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Section Heading */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2 border-b border-slate-100">
            <div className="space-y-2.5 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF7F6] text-[#08A698] text-xs font-mono font-bold tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-[#08A698] animate-pulse" />
                <span>SCIENTIFIC DISCIPLINES</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold tracking-tight text-[#0E2358]">
                Core Chemistry &amp; Analytical Capabilities
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Explore our specialized capabilities designed to support every stage of small-molecule discovery, impurity profiling, and process development.
              </p>
            </div>

            {/* Tab Selectors */}
            <div className="flex flex-wrap items-center gap-2">
              {SCIENTIFIC_PILLARS.map((pil) => (
                <button
                  key={pil.id}
                  type="button"
                  onClick={() => setActivePillar(pil.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    activePillar === pil.id
                      ? 'bg-[#007a68] text-white shadow-sm'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80'
                  }`}
                >
                  {pil.title}
                </button>
              ))}
            </div>
          </div>

          {/* Active Pillar Showcase Card */}
          <div className="rounded-3xl bg-[#F8FAFA] border border-slate-200/90 overflow-hidden shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 lg:p-10 items-center">
              
              {/* Left Column: Details & Capabilities List */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-2">
                  <span className="px-3 py-1 rounded-full text-[10.5px] font-mono font-bold bg-[#08A698] text-white uppercase tracking-wider">
                    {currentPillar.badge}
                  </span>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#0E2358] tracking-tight">
                    {currentPillar.headline}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                    {currentPillar.desc}
                  </p>
                </div>

                {/* 4 Feature Items */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {currentPillar.capabilities.map((cap, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-[#08A698]/40 transition-colors space-y-1"
                    >
                      <div className="flex items-start gap-1.5">
                        <IoCheckmarkCircle className="text-[#08A698] shrink-0 mt-0.5" size={15} />
                        <h4 className="text-xs font-bold text-[#0E2358] leading-tight">
                          {cap.name}
                        </h4>
                      </div>
                      <p className="text-[11.5px] text-slate-500 leading-snug pl-5">
                        {cap.detail}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Deliverables Callout */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-[#F0FDF4] to-[#F4FBFA] border border-emerald-200/70 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <IoDocumentTextOutline size={18} />
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-[11px] font-mono font-bold text-emerald-800 uppercase tracking-wide">
                      Standard Deliverables &amp; Data Package
                    </div>
                    <p className="text-xs text-slate-700 font-medium leading-snug">
                      {currentPillar.deliverables}
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="#rfq-section"
                    onClick={() => setSelectedService(currentPillar.title)}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#007a68] hover:text-[#005a4d] hover:underline cursor-pointer"
                  >
                    <span>Request Quotation for {currentPillar.title}</span>
                    <IoArrowForward size={14} />
                  </a>
                </div>
              </div>

              {/* Right Column: Visual Photo Card */}
              <div className="lg:col-span-5 relative">
                <div className="relative h-64 sm:h-80 lg:h-96 w-full rounded-2xl overflow-hidden shadow-md border border-slate-200/80 group">
                  <Image
                    src={currentPillar.image}
                    alt={currentPillar.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-xs font-mono font-bold text-[#2DD4BF] uppercase">
                      Validated Chemistry Suites
                    </div>
                    <div className="text-sm font-bold mt-0.5">
                      {currentPillar.title}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ================================================================
          3. OUR CORE SERVICES (3x3 GRID MATCHING REFERENCE DESIGN)
          ================================================================ */}
      <section id="core-services" className="py-16 sm:py-20 bg-gradient-to-b from-[#F5FAFA] via-white to-[#F0F9F8] border-t border-slate-200/80 text-left relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
          
          {/* Section Heading Row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-slate-100">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-mono font-bold tracking-widest text-[#08A698] uppercase">
                OUR SERVICES
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold tracking-tight text-[#0D3840]">
                Our Core Services
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Comprehensive chemical solutions designed to drive your research, development and manufacturing success.
              </p>
            </div>

            <div className="text-right shrink-0">
              <span className="text-[11px] sm:text-xs font-mono font-semibold tracking-wider text-slate-400 uppercase">
                FROM MOLECULES TO MARKET &bull; &bull; &bull;
              </span>
            </div>
          </div>

          {/* 3x3 Card Grid (9 Services) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {CORE_SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  className="rounded-2xl sm:rounded-3xl bg-white/90 backdrop-blur-sm border border-[#DDF0ED] p-6 sm:p-7 shadow-2xs hover:shadow-lg hover:border-[#08A698]/50 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 relative overflow-hidden text-left"
                >
                  <div>
                    {/* Top Row: Circular Icon Pill on Left, 3D Illustration on Right */}
                    <div className="flex items-start justify-between">
                      <div className="w-11 h-11 rounded-full bg-[#E5F7F4] text-[#08A698] flex items-center justify-center shrink-0 group-hover:bg-[#08A698] group-hover:text-white transition-colors duration-200 shadow-2xs">
                        <Icon size={20} />
                      </div>
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 pointer-events-none -mt-1 -mr-1">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-contain group-hover:scale-110 transition-transform duration-500 ease-out"
                          sizes="(max-width: 640px) 64px, 80px"
                        />
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-base sm:text-lg font-bold text-[#0D3840] group-hover:text-[#08A698] transition-colors leading-snug mt-4">
                      {service.title}
                    </h3>

                    <p className="text-xs text-slate-500 leading-relaxed mt-2 line-clamp-2">
                      {service.desc}
                    </p>
                  </div>

                  {/* Bottom: Learn More */}
                  <div className="pt-4 mt-2">
                    <Link
                      href={service.href}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#08A698] group-hover:text-[#064247] transition-colors cursor-pointer"
                    >
                      <span>Learn More</span>
                      <IoArrowForward size={13} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ================================================================
          4. THE PHARMAVIVE ADVANTAGE / WHY CHOOSE PHARMAVIVE SERVICES?
          ================================================================ */}
      <section className="py-16 sm:py-20 bg-white border-t border-slate-200/80 text-left relative overflow-hidden">
        {/* Ambient Subtle Background Graphic */}
        <div className="absolute right-0 bottom-0 w-80 h-80 opacity-20 pointer-events-none">
          <Image
            src="/service-icons/bg-molecule-deco.png"
            alt="Molecular Matrix Decoration"
            fill
            className="object-contain object-right-bottom"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Header Column (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <span className="text-xs font-mono font-bold tracking-widest text-[#08A698] uppercase">
                THE PHARMAVIVE ADVANTAGE
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold tracking-tight text-[#0D3840] leading-tight">
                Why Choose Pharmavive Services?
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                We combine scientific expertise, advanced infrastructure and a customer-first approach to deliver reliable and scalable solutions for your success.
              </p>
              
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#006657] hover:bg-[#004d42] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
                >
                  <span>Partner With Us</span>
                  <IoArrowForward size={14} />
                </Link>
              </div>
            </div>

            {/* Right Advantage Cards Row (8 cols) */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
              {ADVANTAGE_PILLARS.map((adv) => {
                const AdvIcon = adv.icon;
                return (
                  <div
                    key={adv.id}
                    className="p-5 rounded-2xl bg-white border border-[#DDF0ED] shadow-2xs hover:shadow-md hover:border-[#08A698]/40 transition-all duration-200 flex flex-col justify-between space-y-3 group hover:-translate-y-0.5"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#E5F7F4] text-[#08A698] flex items-center justify-center shrink-0 group-hover:bg-[#08A698] group-hover:text-white transition-colors duration-200">
                      <AdvIcon size={18} />
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-xs sm:text-sm font-bold text-[#0D3840] group-hover:text-[#08A698] transition-colors leading-snug">
                        {adv.title}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                        {adv.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </section>

      {/* ================================================================
          5. INTERACTIVE SERVICE RFQ & CONSULTATION DESK
          ================================================================ */}
      <section id="rfq-section" className="py-16 sm:py-20 bg-gradient-to-b from-[#F0F9F8] to-white border-t border-slate-200/80 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="rounded-[32px] sm:rounded-[40px] bg-gradient-to-br from-[#063238] via-[#08454D] to-[#042428] border border-[#0D5963] p-8 sm:p-12 lg:p-14 text-white relative overflow-hidden shadow-2xl space-y-8">
            
            {/* Ambient Background Flares */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(0,229,190,0.18)_0%,transparent_70%)] pointer-events-none" />
            <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(8,166,152,0.16)_0%,transparent_70%)] pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* Left Column: Information & Trust Seals */}
              <div className="lg:col-span-6 space-y-6">
                <div className="space-y-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#2DD4BF] text-xs font-mono font-bold tracking-wider uppercase border border-white/15">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2DD4BF] animate-pulse" />
                    <span>CONFIDENTIAL SERVICE RFQ</span>
                  </span>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                    Request a Technical Consultation or Route Feasibility
                  </h2>

                  <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed max-w-lg">
                    Send your target structure, CAS number, desired purity, or synthesis requirements. Our PhD synthetic chemists evaluate feasibility and respond with a formal proposal within 24 to 48 business hours.
                  </p>
                </div>

                {/* Trust Badges */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white/10 text-[#2DD4BF] flex items-center justify-center shrink-0">
                      <IoLockClosedOutline size={18} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Strict Mutual NDA Protected</div>
                      <div className="text-[11px] text-emerald-200/70">Your compound structures and IP are strictly safeguarded</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white/10 text-[#2DD4BF] flex items-center justify-center shrink-0">
                      <IoShieldCheckmarkOutline size={18} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Guaranteed Specification Release</div>
                      <div className="text-[11px] text-emerald-200/70">100% CoA verification (NMR, LC-MS, HPLC &ge; 98.0%)</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white/10 text-[#2DD4BF] flex items-center justify-center shrink-0">
                      <IoTimeOutline size={18} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Fast-Track Feasibility Assessment</div>
                      <div className="text-[11px] text-emerald-200/70">Detailed proposal &amp; timeline within 24–48 business hours</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Quotation Form */}
              <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 text-[#0E2358] shadow-xl border border-white/20">
                <form onSubmit={handleQuickInquiry} className="space-y-4">
                  
                  {/* Service Category Selector */}
                  <div>
                    <label className="block text-xs font-bold text-[#0E2358] mb-1.5">
                      Service Category
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        'Custom Organic Synthesis',
                        'Impurity Reference Standards',
                        'Analytical Characterization',
                        'Scale-Up / FTE Collaboration',
                      ].map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setSelectedService(cat)}
                          className={`px-3 py-2 rounded-xl text-[11px] font-semibold text-left transition-colors cursor-pointer border ${
                            selectedService === cat
                              ? 'bg-[#EBF7F6] text-[#007a68] border-[#08A698]'
                              : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Target Scale Selector */}
                  <div>
                    <label className="block text-xs font-bold text-[#0E2358] mb-1.5">
                      Desired Scale / Quantity
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                      {[
                        'Milligrams (mg)',
                        'Grams (1g - 100g)',
                        'Kilograms (kg+)',
                        'Analytical Only',
                      ].map((sc) => (
                        <button
                          key={sc}
                          type="button"
                          onClick={() => setSelectedScale(sc)}
                          className={`px-2.5 py-1.5 rounded-xl text-[10.5px] font-semibold text-center transition-colors cursor-pointer border ${
                            selectedScale === sc
                              ? 'bg-[#007a68] text-white border-[#007a68]'
                              : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {sc}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Email & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#0E2358] mb-1">
                        Business Email <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="scientist@pharma-corp.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#08A698] transition-all bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0E2358] mb-1">
                        Company / Institution
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g. BioTherapeutics Inc."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#08A698] transition-all bg-white"
                      />
                    </div>
                  </div>

                  {/* Project Details */}
                  <div>
                    <label className="block text-xs font-bold text-[#0E2358] mb-1">
                      Compound CAS #, Structure or Project Requirements <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={inquiryText}
                      onChange={(e) => setInquiryText(e.target.value)}
                      placeholder="Specify CAS #, chemical name, required purity, target delivery timeline, or attach smiles..."
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#08A698] transition-all bg-white"
                    />
                  </div>

                  {inquiryError && (
                    <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                      {inquiryError}
                    </div>
                  )}

                  {submitted && (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2">
                      <IoCheckmarkCircle size={16} className="text-emerald-600" />
                      <span>Thank you! Your service RFQ has been received. Our scientific team will contact you within 24 hours.</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 rounded-xl bg-[#007a68] hover:bg-[#006657] text-white font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 hover:-translate-y-0.5"
                  >
                    {submitting ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Transmitting RFQ...</span>
                      </>
                    ) : (
                      <>
                        <IoSendOutline size={15} />
                        <span>Transmit Service RFQ</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-slate-400">
                    By submitting, your inquiry is safeguarded under standard scientific mutual non-disclosure.
                  </p>
                </form>
              </div>

            </div>

          </div>

        </div>
      </section>
    </main>
  );
}

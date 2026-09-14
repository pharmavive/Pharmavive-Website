'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  IoFlaskOutline,
  IoPeopleOutline,
  IoCheckmarkCircle,
  IoArrowForward,
  IoLockClosedOutline,
} from 'react-icons/io5';

const SYNTHESIS_CAPABILITIES = [
  {
    title: 'Custom Synthesis of Complex Organic Molecules',
    desc: 'Multi-step synthetic routes, heterocyclic chemistry, macrocycles, and stereoselective organic transformations.',
  },
  {
    title: 'Pharmaceutical Reference Standards',
    desc: 'High-purity primary and secondary reference standards for impurity identification and assay qualification.',
  },
  {
    title: 'Stable Isotope Labelled Compounds (SIL)',
    desc: 'Deuterium (D), Carbon-13 (13C), and Nitrogen-15 (15N) labeled compounds for quantitative bioanalytical LC-MS/MS.',
  },
  {
    title: 'Drug Metabolites & Glucuronides',
    desc: 'Phase I and Phase II metabolites, glucuronide conjugates, sulfates, and N-oxides for preclinical DMPK studies.',
  },
  {
    title: 'Isolation & Unknown Impurity Elucidation',
    desc: 'Semi-preparative HPLC isolation from stressed API batches followed by comprehensive spectroscopic structure identification.',
  },
  {
    title: 'Genotoxic & Nitrosamine Impurities',
    desc: 'Targeted synthesis of trace-level mutagenic impurities with rigorous analytical safety handling and packaging.',
  },
  {
    title: 'Process Scale-Up & Kilo Lab Manufacturing',
    desc: 'Scale-up from milligram feasibility to multi-kilogram non-GMP / regulatory starting material batches.',
  },
  {
    title: 'Peptide Synthesis & Coupling Reagents',
    desc: 'Solid-phase and solution-phase peptide synthesis, specialized amino acid derivatives, and high-efficiency coupling reagents.',
  },
];

const PROJECT_STEPS = [
  {
    step: '01',
    title: 'Inquiry & Requirements',
    desc: 'Send project structures, CAS numbers, or synthetic target specifications to info@pharmavive.com or via our RFQ form.',
  },
  {
    step: '02',
    title: 'Feasibility & Route Scouting',
    desc: 'Our synthetic chemistry team conducts literature review, retro-synthetic analysis, and provides a formal proposal with lead time.',
  },
  {
    step: '03',
    title: 'Synthesis & Optimization',
    desc: 'Under dedicated Ph.D. chemist supervision, synthesis proceeds with bi-weekly updates, milestone reports, and real-time communication.',
  },
  {
    step: '04',
    title: 'Analytical Quality Release',
    desc: 'Batches undergo comprehensive testing (1H/13C-NMR, LC-MS, HPLC Purity, TGA) to ensure strict compliance.',
  },
  {
    step: '05',
    title: 'Secure Delivery & CoA',
    desc: 'Door-to-door temperature-controlled delivery worldwide, accompanied by complete analytical dossiers and safety data sheets.',
  },
];

export default function SynthesisPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Section */}
        <div className="rounded-3xl bg-slate-950 text-white p-8 sm:p-14 relative overflow-hidden border border-slate-800">
          <div className="absolute inset-0 scientific-grid-dark opacity-30" />
          <div className="relative z-10 max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-mono">
              <IoFlaskOutline size={14} />
              <span>CUSTOM ORGANIC SYNTHESIS & CDMO</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Contract Synthesis & Full-Time Equivalent (FTE) Services
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Synthesis of complex organic molecules is our core competence. Leveraging decades of chemical research experience and agile laboratory management, we turn around challenging synthetic targets with guaranteed purity and complete IP protection.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/contact?type=custom-synthesis"
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
              >
                <span>Request Custom Synthesis Quote</span>
                <IoArrowForward size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* Facility Overview Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center rounded-3xl bg-white border border-slate-200 p-8 sm:p-12 shadow-xs">
          <div className="lg:col-span-6 relative h-80 sm:h-96 rounded-2xl overflow-hidden shadow-md border border-slate-200">
            <Image
              src="/ab6.jpg"
              alt="Pharmavive Synthesis Facility"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
              <span className="text-white text-xs font-mono bg-slate-900/80 backdrop-blur-xs px-3 py-1 rounded-md border border-white/20">
                Custom Organic Synthesis & Kilo Scale-Up Lab
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700">
              Gram to Multi-Kilogram Capacity
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Synthetic Innovation for Every Stage of Drug Development
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Our synthetic operations bridge laboratory discovery with kilo scale-up. Equipped with VAV fume hoods, automated hydrogenation, cryogenic reactors, and rotary evaporators, we handle complex multi-step transformations under rigorous safety protocols.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Whether you require a single milligram batch of a toxic degradation impurity or multi-kilogram intermediate manufacturing, our team delivers reproducible chemical excellence.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-3 text-xs font-semibold text-slate-800">
              <span className="flex items-center gap-2">
                <IoCheckmarkCircle className="text-emerald-600" size={16} />
                <span>Milligram to Kilogram Scale</span>
              </span>
              <span className="flex items-center gap-2">
                <IoCheckmarkCircle className="text-emerald-600" size={16} />
                <span>Stereoselective Synthesis</span>
              </span>
              <span className="flex items-center gap-2">
                <IoCheckmarkCircle className="text-emerald-600" size={16} />
                <span>Cryogenic Reactions (-78°C)</span>
              </span>
              <span className="flex items-center gap-2">
                <IoCheckmarkCircle className="text-emerald-600" size={16} />
                <span>High-Pressure Hydrogenation</span>
              </span>
            </div>
          </div>
        </div>

        {/* Core Synthetic Capabilities Matrix */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
              Chemical Services
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Custom Synthesis Capabilities
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SYNTHESIS_CAPABILITIES.map((cap, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-slate-200 p-6 flex flex-col justify-between hover:border-emerald-300 hover:shadow-lg transition-all space-y-3"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-mono font-bold text-xs mb-3">
                    0{idx + 1}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">{cap.title}</h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">{cap.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Full-Time-Equivalent (FTE) Model Section */}
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-14 relative overflow-hidden space-y-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
              <IoPeopleOutline size={18} />
              <span>DEDICATED RESEARCH TEAMS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Full-Time Equivalent (FTE) Collaboration
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              For complex, longer-term, or iterative medicinal chemistry programs, our FTE model provides a dedicated team of Ph.D. scientists operating as a seamless extension of your internal laboratory.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-200">
            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
              <h3 className="text-white font-bold text-sm">Predictable Cost & Scalability</h3>
              <p className="text-slate-400 leading-relaxed">
                A flat, transparent monthly rate per scientist that eliminates administrative overhead and enables agile task pivoting without rewriting work orders.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
              <h3 className="text-white font-bold text-sm">Direct Project Management</h3>
              <p className="text-slate-400 leading-relaxed">
                Regular bi-weekly video conferences, comprehensive written milestone reports, and real-time electronic laboratory notebook (ELN) synchronization.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
              <h3 className="text-white font-bold text-sm">Complete Analytical Access</h3>
              <p className="text-slate-400 leading-relaxed">
                FTE teams have immediate, unhindered access to our LCMS, HPLC, GC-HS, and NMR suites, ensuring rapid reaction monitoring and zero analytical bottlenecks.
              </p>
            </div>
          </div>
        </div>

        {/* 5-Step Project Pipeline */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
              Project Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              From Inquiry to Compound Delivery
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {PROJECT_STEPS.map((step) => (
              <div
                key={step.step}
                className="rounded-2xl bg-white border border-slate-200 p-5 space-y-3 relative flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xl font-extrabold text-emerald-600 block mb-1">
                    {step.step}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900">{step.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Code of Conduct & IP Protection */}
        <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-12 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <IoLockClosedOutline size={22} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Code of Conduct & IP Protection</h3>
              <p className="text-xs text-slate-500">Contractually guaranteed measures safeguarding your chemical discoveries</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-600 leading-relaxed">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <strong className="block text-slate-900 mb-1">100% Client IP Ownership</strong>
              All synthetic routes, compound samples, analytical data, and intellectual property generated belong exclusively to the client.
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <strong className="block text-slate-900 mb-1">Zero Conflict of Interest</strong>
              We do not accept overlapping or competing research projects that could create conflicts with client programs.
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <strong className="block text-slate-900 mb-1">Strict Confidentiality</strong>
              Comprehensive NDAs cover all personnel, physical premises, and electronic communications with encrypted archiving.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

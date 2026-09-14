'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  IoStar,
  IoShieldCheckmarkOutline,
  IoFlaskOutline,
  IoCheckmarkCircle,
  IoArrowForward,
  IoDocumentTextOutline,
} from 'react-icons/io5';

const REVIEWS_DATA = [
  {
    id: 1,
    category: 'impurities',
    rating: 5,
    title: 'Flawless Impurity Profiling & Exceptional CoA Data',
    review:
      'We required two specialized degradation impurities for a regulatory filing on a tight timeline. Pharmavive delivered both compounds at >99.1% chromatographic purity with exhaustive 1H-NMR, 13C-NMR, and LC-MS spectral data. Our analytical method validation was accepted on the first submission.',
    author: 'Dr. Arthur Pendelton',
    role: 'Principal Analytical Chemist',
    organization: 'Cambridge Life Sciences Lab',
    location: 'United Kingdom',
    tag: 'Degradation Impurity Standards',
    date: 'February 2026',
    verified: true,
  },
  {
    id: 2,
    category: 'synthesis',
    rating: 5,
    title: 'Dependable Retrosynthetic Design & Multi-Gram Supply',
    review:
      'Finding a chemistry team capable of tackling a challenging 6-step chiral intermediate was proving difficult until we partnered with Pharmavive. Their synthetic route scouting was atom-economical, reaction yields were consistent, and batch documentation was impeccably detailed.',
    author: 'Dr. Priya Sundaram',
    role: 'VP of Medicinal Chemistry',
    organization: 'Apex BioTherapeutics',
    location: 'Hyderabad, India',
    tag: 'Custom Synthesis & Route Scouting',
    date: 'January 2026',
    verified: true,
  },
  {
    id: 3,
    category: 'analytical',
    rating: 5,
    title: 'Unmatched Batch Purity and Rapid Global Dispatch',
    review:
      'The consistency of their reference standards has significantly accelerated our release testing protocols. Packaging integrity, temperature monitoring during courier transit, and instant access to raw analytical trace spectra set Pharmavive apart as a premier chemistry supplier.',
    author: 'Elena Rostova',
    role: 'Head of Quality Assurance & Compliance',
    organization: 'EuroChem Analytical Matrix',
    location: 'Switzerland',
    tag: 'Reference Standards & CoA',
    date: 'March 2026',
    verified: true,
  },
  {
    id: 4,
    category: 'impurities',
    rating: 5,
    title: 'Crucial Stable Isotope Standards for Our LC-MS Assays',
    review:
      'Their deuterated and 13C-labelled internal standards exhibited isotopic enrichment over 99 atom % with zero cross-contamination. This level of chemical precision is indispensable for high-throughput pharmacokinetic screening.',
    author: 'Dr. Marcus Vance',
    role: 'Lead DMPK Investigator',
    organization: 'Pacific BioInnovation Center',
    location: 'California, USA',
    tag: 'Stable Isotope Standards',
    date: 'February 2026',
    verified: true,
  },
  {
    id: 5,
    category: 'synthesis',
    rating: 5,
    title: 'Seamless Bench-to-Pilot Scale Transition',
    review:
      'We initiated our project with a 20-gram exploratory synthesis and subsequently scaled to 1.5 kilograms. The crystalline polymorphism remained identical across all lots, and process safety profiles were comprehensively mapped.',
    author: 'Dr. Henri Chauvin',
    role: 'Director of Process Development',
    organization: 'Solvix Chemical Research',
    location: 'France',
    tag: 'Kilogram Scale-Up Synthesis',
    date: 'January 2026',
    verified: true,
  },
  {
    id: 6,
    category: 'analytical',
    rating: 5,
    title: 'Extremely Responsive Scientific Support Team',
    review:
      'Whenever we have technical questions regarding structural elucidation or chromatographic peak resolution, Pharmavive’s PhD analytical chemists respond within hours with concrete spectroscopic interpretations. Outstanding service.',
    author: 'David Chen',
    role: 'Senior QC Operations Manager',
    organization: 'Apex Life Sciences Hub',
    location: 'Singapore',
    tag: 'Technical & Analytical Support',
    date: 'March 2026',
    verified: true,
  },
];

const CATEGORY_TABS = [
  { id: 'all', label: 'All Reviews' },
  { id: 'impurities', label: 'Impurity & Reference Standards' },
  { id: 'synthesis', label: 'Custom Synthesis & Scale-Up' },
  { id: 'analytical', label: 'Analytical Testing & CoA' },
];

export default function ReviewsSection() {
  const [activeTab, setActiveTab] = useState('all');

  const filteredReviews =
    activeTab === 'all'
      ? REVIEWS_DATA
      : REVIEWS_DATA.filter((r) => r.category === activeTab);

  return (
    <section className="w-full bg-white pt-4 pb-2 text-left">
      <div className="space-y-8">
        
        {/* Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2 border-b border-slate-100">
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF7F6] text-[#08A698] text-xs font-mono font-bold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-[#08A698] animate-pulse" />
              <span>RESEARCHER REVIEWS &amp; TESTIMONIALS</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold tracking-tight text-[#0E2358] leading-tight">
              Trusted by Leading Scientists &amp; Laboratories
            </h2>

            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Read how our high-purity chemical standards, custom synthesis precision, and transparent analytical dossiers support drug discovery and validation programs worldwide.
            </p>
          </div>

          {/* Rating Summary Card */}
          <div className="flex items-center gap-4 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-[#F4FBFA] to-[#EDF9F7] border border-[#C5ECE5] shrink-0">
            <div className="text-center pl-1 pr-3 border-r border-[#A8E2D7]">
              <div className="text-2xl sm:text-3xl font-black text-[#0D3840] leading-none">
                4.9
              </div>
              <div className="text-[10px] font-bold text-slate-500 mt-1 uppercase tracking-wide">
                out of 5.0
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-0.5 text-[#F59E0B]">
                {[...Array(5)].map((_, i) => (
                  <IoStar key={i} size={15} />
                ))}
              </div>
              <div className="text-xs font-bold text-[#0D3840]">
                Over 500+ Syntheses Delivered
              </div>
              <div className="text-[11px] text-[#08A698] font-medium flex items-center gap-1">
                <IoCheckmarkCircle size={13} />
                <span>100% Certified Data Packages</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#007a68] text-white shadow-sm'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 hover:border-[#08A698]/50 shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-4 text-left"
            >
              {/* Top Meta: Stars & Tag */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1 text-[#F59E0B]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <IoStar key={i} size={14} />
                    ))}
                  </div>

                  {rev.verified && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10.5px] font-medium border border-emerald-200/70">
                      <IoShieldCheckmarkOutline size={12} className="text-emerald-600" />
                      <span>Verified Partner</span>
                    </span>
                  )}
                </div>

                {/* Review Title & Snippet */}
                <h4 className="font-bold text-sm sm:text-base text-[#0E2358] leading-snug">
                  &ldquo;{rev.title}&rdquo;
                </h4>

                <p className="text-xs sm:text-[12.5px] text-slate-600 leading-relaxed">
                  {rev.review}
                </p>
              </div>

              {/* Bottom: Tag & Author */}
              <div className="pt-3 border-t border-slate-100 space-y-3">
                <span className="inline-block text-[11px] font-mono font-semibold px-2.5 py-1 rounded-lg bg-[#F1F9F8] text-[#087F74] border border-[#D5EFEA]">
                  {rev.tag}
                </span>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#074D45] to-[#095E54] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                    {rev.author
                      .split(' ')
                      .filter((part) => !part.includes('.'))
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join('')}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-slate-900 truncate">
                      {rev.author}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">
                      {rev.role} • {rev.location}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-medium">
            <div className="flex items-center gap-1.5 text-slate-700">
              <IoCheckmarkCircle className="text-[#08A698]" size={16} />
              <span>HPLC/UHPLC Purity &ge; 98.0%</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-700">
              <IoDocumentTextOutline className="text-[#08A698]" size={16} />
              <span>Complete NMR &amp; MS Dossiers</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-700">
              <IoFlaskOutline className="text-[#08A698]" size={16} />
              <span>Custom Route Feasibility</span>
            </div>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#007a68] hover:text-[#005a4d] hover:underline"
          >
            <span>Have a research inquiry? Request a quotation</span>
            <IoArrowForward size={13} />
          </Link>
        </div>

      </div>
    </section>
  );
}

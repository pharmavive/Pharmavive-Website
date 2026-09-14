'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  IoArrowForward,
  IoFlaskOutline,
  IoSparklesOutline,
  IoLayersOutline,
  IoConstructOutline,
} from 'react-icons/io5';
import { useScrollReveal } from '@/utils/useScrollReveal';
import { getClientMainCategories, peekClientMainCategories } from '@/utils/clientCache';

// Bespoke 2D vector molecular illustrations tailored to each chemical classification
function ImpurityMolecularVector() {
  return (
    <svg viewBox="0 0 360 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full transition-transform duration-500 group-hover:scale-[1.02]">
      {/* Conjugated polyene backbone with aromatic ring */}
      <polygon points="60,80 90,62 120,80 120,114 90,132 60,114" stroke="#0E2358" strokeWidth="2" fill="#F8FAFC" />
      <circle cx="90" cy="97" r="16" stroke="#08A698" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
      <line x1="120" y1="80" x2="155" y2="60" stroke="#0E2358" strokeWidth="2" strokeLinecap="round" />
      <line x1="155" y1="60" x2="190" y2="80" stroke="#08A698" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="190" y1="80" x2="225" y2="60" stroke="#0E2358" strokeWidth="2" strokeLinecap="round" />
      <line x1="225" y1="60" x2="260" y2="80" stroke="#08A698" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="260" y1="80" x2="295" y2="60" stroke="#0E2358" strokeWidth="2" strokeLinecap="round" />
      {/* Carbonyl group */}
      <line x1="293" y1="60" x2="293" y2="34" stroke="#0E2358" strokeWidth="2" />
      <line x1="297" y1="60" x2="297" y2="34" stroke="#0E2358" strokeWidth="2" />
      <text x="290" y="26" fill="#0E2358" fontSize="11" fontWeight="bold" fontFamily="monospace">O</text>
      {/* Terminal functional group */}
      <line x1="295" y1="60" x2="330" y2="80" stroke="#08A698" strokeWidth="2" strokeLinecap="round" />
      <text x="334" y="86" fill="#08A698" fontSize="12" fontWeight="bold" fontFamily="monospace">OH</text>
      {/* Side methyl branches */}
      <line x1="190" y1="80" x2="190" y2="108" stroke="#0E2358" strokeWidth="2" strokeLinecap="round" />
      <text x="182" y="122" fill="#64748B" fontSize="9" fontFamily="monospace">CH3</text>
      <line x1="260" y1="80" x2="260" y2="108" stroke="#0E2358" strokeWidth="2" strokeLinecap="round" />
      <text x="252" y="122" fill="#64748B" fontSize="9" fontFamily="monospace">CH3</text>
      {/* Analytical annotation */}
      <circle cx="60" cy="80" r="4" fill="#08A698" className="animate-node-pulse" />
      <circle cx="120" cy="114" r="4" fill="#08A698" />
      <text x="60" y="150" fill="#94A3B8" fontSize="9" fontFamily="monospace">RETINOID_CORE // 13-CIS STEREOCHEMISTRY</text>
    </svg>
  );
}

function IsotopeVector() {
  return (
    <svg viewBox="0 0 180 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full transition-transform duration-300 group-hover:scale-105">
      <circle cx="70" cy="45" r="32" stroke="#08A698" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4" />
      <circle cx="70" cy="45" r="18" stroke="#0E2358" strokeWidth="1.5" />
      <circle cx="70" cy="45" r="6" fill="#08A698" className="animate-node-pulse" />
      <line x1="88" y1="45" x2="140" y2="45" stroke="#0E2358" strokeWidth="2" strokeLinecap="round" />
      <circle cx="140" cy="45" r="5" fill="#0E2358" />
      <text x="148" y="49" fill="#08A698" fontSize="11" fontWeight="bold" fontFamily="monospace">2H (D)</text>
      <text x="58" y="24" fill="#0E2358" fontSize="10" fontWeight="bold" fontFamily="monospace">13C</text>
    </svg>
  );
}

function SynthesisVector() {
  return (
    <svg viewBox="0 0 180 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full transition-transform duration-300 group-hover:scale-105">
      <path d="M40 25 L55 25 M47 25 L47 40 L30 70 A 5 5 0 0 0 35 76 L65 76 A 5 5 0 0 0 70 70 L53 40 L53 25" stroke="#0E2358" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" fill="#F8FAFC" />
      <line x1="78" y1="52" x2="105" y2="52" stroke="#08A698" strokeWidth="2" strokeLinecap="round" />
      <polygon points="105,48 113,52 105,56" fill="#08A698" />
      <polygon points="135,38 152,48 152,68 135,78 118,68 118,48" stroke="#0E2358" strokeWidth="1.75" fill="#EBF7F6" />
      <circle cx="135" cy="58" r="3" fill="#08A698" />
    </svg>
  );
}

function BuildingBlocksVector() {
  return (
    <svg viewBox="0 0 180 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full transition-transform duration-300 group-hover:scale-105">
      <rect x="25" y="28" width="34" height="34" rx="6" stroke="#0E2358" strokeWidth="1.75" fill="#F8FAFC" />
      <line x1="59" y1="45" x2="85" y2="45" stroke="#08A698" strokeWidth="2" strokeDasharray="3 3" />
      <rect x="85" y="28" width="34" height="34" rx="6" stroke="#08A698" strokeWidth="2" fill="#EBF7F6" />
      <line x1="119" y1="45" x2="145" y2="45" stroke="#0E2358" strokeWidth="2" strokeLinecap="round" />
      <circle cx="145" cy="45" r="4" fill="#0E2358" />
    </svg>
  );
}

const STATIC_FALLBACK_CATEGORIES = [
  {
    _id: 'api-impurity-standards',
    name: 'API Impurity Standards',
    slug: 'api-impurity-standards',
    code: 'CAT-01 // REFERENCE STANDARDS',
    description:
      'Characterized reference materials for identification, quantification, and impurity profiling in pharmaceutical drug development and regulatory filing.',
    href: '/products/category/api-impurity-standards',
    subTags: ['Nitrosamines', 'Degradation Products', 'Process Impurities', 'Active Metabolites'],
    vector: 'impurity',
  },
  {
    _id: 'reagents',
    name: 'Reagents & Analytical Chemicals',
    slug: 'reagents',
    code: 'CAT-02 // REAGENTS',
    description:
      'High-purity analytical, coupling, and synthesis reagents for drug discovery and quality control testing.',
    href: '/products/category/reagents',
    vector: 'isotope',
  },
  {
    _id: 'custom-synthesis',
    name: 'Custom Organic Synthesis',
    slug: 'cdmo',
    code: 'CAT-03 // CDMO SERVICES',
    description:
      'Dedicated synthetic chemistry solutions, route scouting, impurity isolation, and scalable custom synthesis.',
    href: '/synthesis',
    vector: 'synthesis',
  },
  {
    _id: 'building-blocks',
    name: 'Specialty Intermediates & Precursors',
    slug: 'building-blocks',
    code: 'CAT-04 // BUILDING BLOCKS',
    description:
      'High-purity functionalized building blocks, heterocyclic intermediates, and specialized reagents for organic synthesis.',
    href: '/products/category/building-blocks',
    vector: 'building_blocks',
  },
];

export default function CategoryMatrix() {
  const initialData = peekClientMainCategories();
  const [categories, setCategories] = useState(
    initialData && initialData.length > 0 ? initialData : STATIC_FALLBACK_CATEGORIES
  );
  const [loading, setLoading] = useState(false);
  const scrollRef = useScrollReveal({ threshold: 0.1 });

  useEffect(() => {
    let isMounted = true;
    getClientMainCategories()
      .then((cats) => {
        if (isMounted && Array.isArray(cats) && cats.length > 0) {
          setCategories(cats);
        }
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  // Split into Featured Pillar (first category) and Supporting (remaining categories)
  const featured = categories[0] || {
    name: 'API Impurity Standards',
    code: 'CAT-01 // REFERENCE STANDARDS',
    description:
      'Characterized reference materials for identification, quantification, and impurity profiling in pharmaceutical drug development.',
    href: '/products/category/api-impurity-standards',
    subTags: ['Nitrosamines', 'Degradation Products', 'Process Impurities', 'Active Metabolites'],
  };

  return (
    <section ref={scrollRef} className="scroll-reveal py-20 bg-[#FBFBFC] text-[#0E2358] border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E2E8F0]">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF7F6] text-[#08A698] text-xs font-mono font-semibold tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#08A698] animate-pulse" />
              <span>Chemical Portfolio Matrix</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0E2358]">
              Our Chemical Portfolio
            </h2>
            <p className="text-sm sm:text-base text-[#475569]">
              Precision reference standards, stable isotope analogues, and specialized synthetic chemistry solutions
              structured for pharmaceutical analytical R&amp;D.
            </p>
          </div>

          <Link
            href="/products/all"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#08A698] hover:text-[#078F83] transition-colors group flex-shrink-0"
          >
            <span>View All Compounds</span>
            <IoArrowForward size={16} className="group-hover:translate-x-1.5 transition-transform duration-200" />
          </Link>
        </div>

        {/* Curated Scientific Portfolio Grid: 1 Featured Pillar + 3 Supporting Rows */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* FEATURED PILLAR (60% / col-span-7) */}
          <div className="card-hover-scientific lg:col-span-7 flex flex-col justify-between rounded-2xl bg-white border border-[#E2E8F0] p-7 sm:p-9 relative overflow-hidden group">
            {/* Top Brand Stripe */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#08A698] transition-all duration-300 group-hover:h-1.5" />

            <div className="space-y-6">
              {/* Category Code Pill */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold tracking-wider text-[#08A698] bg-[#EBF7F6] px-3 py-1 rounded-md">
                  {featured.code || 'CAT-01 // REFERENCE STANDARDS'}
                </span>
                <span className="text-xs font-mono text-[#94A3B8]">VERIFIED CDMO PORTFOLIO</span>
              </div>

              {/* Title & Description */}
              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0E2358] group-hover:text-[#08A698] transition-colors duration-200">
                  {featured.name}
                </h3>
                <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                  {featured.description ||
                    'Characterized reference materials for identification, quantification, and impurity profiling in pharmaceutical drug development and regulatory documentation.'}
                </p>
              </div>

              {/* Real Subcategory Tag Pills with subtle hover */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                  Key Compound Classes:
                </div>
                <div className="flex flex-wrap gap-2">
                  {(featured.subTags || [
                    'Nitrosamines',
                    'Degradation Products',
                    'Process Impurities',
                    'Active Metabolites',
                  ]).map((tag, idx) => (
                    <Link
                      key={idx}
                      href={`/products/category/${featured.slug || 'api-impurity-standards'}`}
                      className="px-3 py-1 rounded-lg bg-[#F8FAFC] hover:bg-[#EBF7F6] border border-[#E2E8F0] hover:border-[#B3E7E2] text-xs font-medium text-[#0E2358] hover:text-[#08A698] hover:-translate-y-0.5 active:translate-y-0 transition-all"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Bespoke Molecular Schematic with Internal Movement */}
              <div className="w-full h-36 sm:h-44 bg-[#F8FAFC] rounded-xl border border-[#F1F5F9] p-3 flex items-center justify-center overflow-hidden transition-colors duration-300 group-hover:bg-[#F0FDF4]/30">
                <ImpurityMolecularVector />
              </div>
            </div>

            {/* Bottom Action */}
            <div className="pt-6 mt-6 border-t border-[#F1F5F9] flex items-center justify-between">
              <Link
                href={featured.href || `/products/category/${featured.slug}`}
                className="inline-flex items-center gap-2 font-bold text-sm text-[#08A698] hover:text-[#078F83] transition-colors group/link"
              >
                <span>Browse {featured.name}</span>
                <IoArrowForward size={16} className="group-hover/link:translate-x-1.5 transition-transform duration-200" />
              </Link>
              <span className="text-xs text-[#94A3B8] font-mono">Real-time Sourcing</span>
            </div>
          </div>

          {/* SUPPORTING CATEGORIES (40% / col-span-5, Stacked 3 Rows) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-5">
            {/* Row 1: Reagents */}
            <div className="card-hover-scientific delay-100 flex-1 rounded-2xl bg-white border border-[#E2E8F0] p-5 sm:p-6 flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold tracking-wider text-[#08A698] bg-[#EBF7F6] px-2.5 py-0.5 rounded">
                    CAT-02 // REAGENTS
                  </span>
                  <div className="w-20 h-10">
                    <IsotopeVector />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[#0E2358] group-hover:text-[#08A698] transition-colors duration-200">
                    Reagents &amp; Laboratory Chemicals
                  </h4>
                  <p className="text-xs text-[#475569] mt-1 leading-relaxed">
                    High-purity analytical, coupling, and synthesis reagents for pharmaceutical research, titration, and process chemistry.
                  </p>
                </div>
              </div>
              <div className="pt-3 mt-3 border-t border-[#F1F5F9]">
                <Link
                  href="/products/category/reagents"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#08A698] hover:text-[#078F83] group-hover:translate-x-1 transition-all"
                >
                  <span>Explore Reagents</span>
                  <IoArrowForward size={13} />
                </Link>
              </div>
            </div>

            {/* Row 2: Custom Organic Synthesis */}
            <div className="card-hover-scientific delay-200 flex-1 rounded-2xl bg-white border border-[#E2E8F0] p-5 sm:p-6 flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold tracking-wider text-[#08A698] bg-[#EBF7F6] px-2.5 py-0.5 rounded">
                    CAT-03 // CDMO SERVICES
                  </span>
                  <div className="w-20 h-10">
                    <SynthesisVector />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[#0E2358] group-hover:text-[#08A698] transition-colors duration-200">
                    Custom Organic Synthesis
                  </h4>
                  <p className="text-xs text-[#475569] mt-1 leading-relaxed">
                    Dedicated synthetic chemistry solutions, route design, impurity isolation, and scalable custom synthesis.
                  </p>
                </div>
              </div>
              <div className="pt-3 mt-3 border-t border-[#F1F5F9]">
                <Link
                  href="/synthesis"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#08A698] hover:text-[#078F83] group-hover:translate-x-1 transition-all"
                >
                  <span>View Custom Synthesis Scope</span>
                  <IoArrowForward size={13} />
                </Link>
              </div>
            </div>

            {/* Row 3: Building Blocks & Intermediates */}
            <div className="card-hover-scientific delay-300 flex-1 rounded-2xl bg-white border border-[#E2E8F0] p-5 sm:p-6 flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold tracking-wider text-[#08A698] bg-[#EBF7F6] px-2.5 py-0.5 rounded">
                    CAT-04 // BUILDING BLOCKS
                  </span>
                  <div className="w-20 h-10">
                    <BuildingBlocksVector />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[#0E2358] group-hover:text-[#08A698] transition-colors duration-200">
                    Specialty Intermediates &amp; Precursors
                  </h4>
                  <p className="text-xs text-[#475569] mt-1 leading-relaxed">
                    High-purity functionalized building blocks, heterocyclic intermediates, and reagents for medicinal chemistry.
                  </p>
                </div>
              </div>
              <div className="pt-3 mt-3 border-t border-[#F1F5F9]">
                <Link
                  href="/products/category/building-blocks"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#08A698] hover:text-[#078F83] group-hover:translate-x-1 transition-all"
                >
                  <span>Browse Intermediates</span>
                  <IoArrowForward size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

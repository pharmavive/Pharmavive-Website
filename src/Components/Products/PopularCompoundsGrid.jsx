'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useEnquiryCart } from '@/context/EnquiryCartContext';
import {
  IoFlaskOutline,
  IoArrowForward,
  IoHeartOutline,
  IoHeart,
  IoCheckmarkCircle,
} from 'react-icons/io5';
import { useScrollReveal } from '@/utils/useScrollReveal';

const POPULAR_COMPOUNDS = [
  {
    id: 'comp-1',
    name: 'Ranitidine Impurity A',
    category: 'API Impurities',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    cas: '102202-06-6',
    formula: 'C13H22N4O3S',
    mw: '326.41 g/mol',
    purity: '≥ 98%',
    slug: 'ranitidine-impurity-a',
    structureType: 'ranitidine',
  },
  {
    id: 'comp-2',
    name: 'Labeled Acetone-d6',
    category: 'Reagents',
    badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
    cas: '13138-15-9',
    formula: 'C3H6D6O',
    mw: '66.13 g/mol',
    purity: '≥ 99 atom % D',
    slug: 'labeled-acetone-d6',
    structureType: 'acetone_d6',
  },
  {
    id: 'comp-3',
    name: '4-Bromopyridine',
    category: 'Building Block',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    cas: '626-55-1',
    formula: 'C5H4BrN',
    mw: '157.00 g/mol',
    purity: '≥ 98%',
    slug: '4-bromopyridine',
    structureType: 'bromopyridine',
  },
  {
    id: 'comp-4',
    name: 'Citric Acid',
    category: 'Specialty Chemicals',
    badgeColor: 'bg-teal-50 text-teal-700 border-teal-200',
    cas: '77-92-9',
    formula: 'C6H8O7',
    mw: '192.12 g/mol',
    purity: '≥ 99%',
    slug: 'citric-acid',
    structureType: 'citric_acid',
  },
];

/* 2D Skeletal Molecular Diagrams matching ChemDraw styling in reference mockup */
function CompoundStructureDiagram({ type }) {
  if (type === 'ranitidine') {
    // Ranitidine Impurity A skeletal line diagram
    return (
      <svg viewBox="0 0 200 95" fill="none" className="w-full h-full max-h-[90px]">
        {/* Skeletal chain with nodes */}
        <polyline
          points="20,60 38,45 56,60 74,45 92,60 110,45 128,60 146,45 164,60"
          stroke="#0E2358"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Terminal and side branches */}
        <line x1="74" y1="45" x2="74" y2="30" stroke="#0E2358" strokeWidth="1.75" strokeLinecap="round" />
        <circle cx="74" cy="27" r="3" fill="#00A389" />
        <line x1="128" y1="60" x2="128" y2="75" stroke="#0E2358" strokeWidth="1.75" strokeLinecap="round" />
        <circle cx="128" cy="78" r="3" fill="#DC2626" />
        <line x1="146" y1="45" x2="146" y2="30" stroke="#0E2358" strokeWidth="1.75" strokeLinecap="round" />
        <circle cx="146" cy="27" r="3" fill="#DC2626" />
        {/* Terminal nodes */}
        <circle cx="20" cy="60" r="3" fill="#00A389" />
        <circle cx="164" cy="60" r="3" fill="#0E2358" />
        <line x1="164" y1="60" x2="178" y2="52" stroke="#0E2358" strokeWidth="1.75" strokeLinecap="round" />
        <circle cx="180" cy="51" r="3" fill="#00A389" />
      </svg>
    );
  }

  if (type === 'acetone_d6') {
    // Labeled Acetone-d6 structure with Deuterium labels
    return (
      <svg viewBox="0 0 200 95" fill="none" className="w-full h-full max-h-[90px]">
        {/* Carbonyl C=O */}
        <line x1="97" y1="48" x2="97" y2="24" stroke="#0E2358" strokeWidth="1.75" />
        <line x1="103" y1="48" x2="103" y2="24" stroke="#0E2358" strokeWidth="1.75" />
        <text x="95" y="19" fill="#DC2626" fontSize="12" fontWeight="bold" fontFamily="sans-serif">O</text>
        {/* Central C */}
        <circle cx="100" cy="48" r="3" fill="#0E2358" />
        {/* Left Methyl C-D bonds */}
        <line x1="100" y1="48" x2="72" y2="64" stroke="#0E2358" strokeWidth="1.75" strokeLinecap="round" />
        <circle cx="72" cy="64" r="3" fill="#0E2358" />
        <line x1="72" y1="64" x2="52" y2="64" stroke="#00A389" strokeWidth="1.5" strokeLinecap="round" />
        <text x="40" y="68" fill="#00A389" fontSize="11" fontWeight="bold" fontFamily="monospace">D</text>
        <line x1="72" y1="64" x2="68" y2="40" stroke="#00A389" strokeWidth="1.5" strokeLinecap="round" />
        <text x="64" y="34" fill="#00A389" fontSize="11" fontWeight="bold" fontFamily="monospace">D</text>
        {/* Right Methyl C-D bonds */}
        <line x1="100" y1="48" x2="128" y2="64" stroke="#0E2358" strokeWidth="1.75" strokeLinecap="round" />
        <circle cx="128" cy="64" r="3" fill="#0E2358" />
        <line x1="128" y1="64" x2="148" y2="64" stroke="#00A389" strokeWidth="1.5" strokeLinecap="round" />
        <text x="152" y="68" fill="#00A389" fontSize="11" fontWeight="bold" fontFamily="monospace">D</text>
        <line x1="128" y1="64" x2="132" y2="40" stroke="#00A389" strokeWidth="1.5" strokeLinecap="round" />
        <text x="130" y="34" fill="#00A389" fontSize="11" fontWeight="bold" fontFamily="monospace">D</text>
      </svg>
    );
  }

  if (type === 'bromopyridine') {
    // 4-Bromopyridine structure
    return (
      <svg viewBox="0 0 200 95" fill="none" className="w-full h-full max-h-[90px]">
        {/* Pyridine 6-membered ring */}
        <polygon points="120,38 140,50 140,72 120,84 100,72 100,50" stroke="#0E2358" strokeWidth="1.75" fill="none" strokeLinejoin="round" />
        {/* Alternating double bonds */}
        <line x1="135" y1="52" x2="135" y2="70" stroke="#0E2358" strokeWidth="1.5" />
        <line x1="117" y1="80" x2="105" y2="73" stroke="#0E2358" strokeWidth="1.5" />
        <line x1="105" y1="51" x2="117" y2="44" stroke="#0E2358" strokeWidth="1.5" />
        {/* Nitrogen at bottom */}
        <circle cx="120" cy="84" r="5" fill="white" />
        <text x="116" y="88" fill="#0284C7" fontSize="11" fontWeight="bold" fontFamily="sans-serif">N</text>
        {/* Br substituent at 4-position (left) */}
        <line x1="100" y1="61" x2="82" y2="61" stroke="#0E2358" strokeWidth="1.75" strokeLinecap="round" />
        <text x="64" y="65" fill="#7C3AED" fontSize="11" fontWeight="bold" fontFamily="sans-serif">Br</text>
      </svg>
    );
  }

  // Citric Acid
  return (
    <svg viewBox="0 0 200 95" fill="none" className="w-full h-full max-h-[90px]">
      {/* Central backbone */}
      <polyline points="80,68 100,52 120,68 140,52 160,68" stroke="#0E2358" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      {/* Left OH / HO */}
      <text x="60" y="72" fill="#DC2626" fontSize="11" fontWeight="bold" fontFamily="sans-serif">HO</text>
      {/* Central -OH branch */}
      <line x1="120" y1="68" x2="120" y2="84" stroke="#0E2358" strokeWidth="1.75" strokeLinecap="round" />
      <text x="114" y="93" fill="#DC2626" fontSize="10" fontWeight="bold" fontFamily="sans-serif">OH</text>
      {/* Carbonyl oxygens */}
      <line x1="97" y1="52" x2="97" y2="36" stroke="#0E2358" strokeWidth="1.5" />
      <line x1="103" y1="52" x2="103" y2="36" stroke="#0E2358" strokeWidth="1.5" />
      <circle cx="100" cy="34" r="3" fill="#DC2626" />
      <line x1="157" y1="68" x2="157" y2="52" stroke="#0E2358" strokeWidth="1.5" />
      <line x1="163" y1="68" x2="163" y2="52" stroke="#0E2358" strokeWidth="1.5" />
      <circle cx="160" cy="50" r="3" fill="#DC2626" />
      {/* Right terminal O */}
      <line x1="160" y1="68" x2="174" y2="76" stroke="#0E2358" strokeWidth="1.75" strokeLinecap="round" />
      <circle cx="176" cy="77" r="3" fill="#DC2626" />
    </svg>
  );
}

export default function PopularCompoundsGrid() {
  const { addToCart } = useEnquiryCart();
  const [favorites, setFavorites] = useState({});
  const [addedMap, setAddedMap] = useState({});
  const sectionRef = useScrollReveal({ threshold: 0.1 });

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddToCart = (e, compound) => {
    e.preventDefault();
    addToCart(
      {
        _id: compound.id,
        name: compound.name,
        catalogNumber: compound.cas,
        molecularFormula: compound.formula,
        molecularWeight: compound.mw,
        purity: compound.purity,
        slug: compound.slug,
      },
      { packSize: '10mg', quantity: 1, autoOpen: false }
    );

    setAddedMap((prev) => ({ ...prev, [compound.id]: true }));
    setTimeout(() => {
      setAddedMap((prev) => ({ ...prev, [compound.id]: false }));
    }, 1800);
  };

  return (
    <section ref={sectionRef} className="scroll-reveal py-16 sm:py-20 bg-[#F8FDFA] border-t border-b border-[#E2E8F0] text-[#0E2358]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div className="space-y-3 max-w-2xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#B3E7E2] text-[#00A389] text-[11px] font-mono font-semibold tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00A389]" />
              <span>Featured Products</span>
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0E2358] tracking-tight">
              Popular Compounds
            </h2>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-[#475569] font-normal leading-relaxed">
              Explore our most requested and high-demand chemical compounds with detailed specifications and reliable quality.
            </p>
          </div>

          {/* Right Action Link */}
          <Link
            href="/search"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#00A389] hover:text-[#008F78] group cursor-pointer"
          >
            <span>View All Products</span>
            <IoArrowForward size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {POPULAR_COMPOUNDS.map((comp, idx) => {
            const isAdded = addedMap[comp.id];
            const isFav = favorites[comp.id];
            const delayClass = ['delay-100', 'delay-150', 'delay-200', 'delay-250'][idx % 4];

            return (
              <div
                key={comp.id}
                className={`card-hover-scientific rounded-3xl bg-white border border-[#E2E8F0] p-5 flex flex-col justify-between group ${delayClass}`}
              >
                <div>
                  {/* Top Bar: Category Pill & Favorite Toggle */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-semibold border ${comp.badgeColor}`}
                    >
                      <IoFlaskOutline size={12} />
                      <span>{comp.category}</span>
                    </span>

                    <button
                      type="button"
                      onClick={() => toggleFavorite(comp.id)}
                      className="p-1.5 rounded-full text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                      aria-label="Save to favorites"
                    >
                      {isFav ? (
                        <IoHeart className="text-rose-500" size={17} />
                      ) : (
                        <IoHeartOutline size={17} />
                      )}
                    </button>
                  </div>

                  {/* 2D Molecular Skeletal Structure Diagram */}
                  <div className="h-28 bg-[#FAFDFB] rounded-2xl border border-slate-100 flex items-center justify-center p-2 mb-4 group-hover:border-[#B3E7E2] transition-colors">
                    <CompoundStructureDiagram type={comp.structureType} />
                  </div>

                  {/* Compound Name */}
                  <h3 className="text-base font-bold text-[#0E2358] group-hover:text-[#00A389] transition-colors line-clamp-1">
                    {comp.name}
                  </h3>

                  {/* Chemical Specifications Grid */}
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-slate-500 font-mono">
                      <span className="text-slate-400 font-sans">CAS No.</span>
                      <span className="font-semibold text-slate-700">{comp.cas}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-500 font-mono">
                      <span className="text-slate-400 font-sans">Molecular Formula</span>
                      <span className="font-semibold text-slate-700">{comp.formula}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-500 font-mono">
                      <span className="text-slate-400 font-sans">Molecular Weight</span>
                      <span className="font-semibold text-slate-700">{comp.mw}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-500 font-mono">
                      <span className="text-slate-400 font-sans">Purity</span>
                      <span className="font-semibold text-[#00A389]">{comp.purity}</span>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
                  <button
                    type="button"
                    onClick={(e) => handleAddToCart(e, comp)}
                    className={`btn-scientific-primary w-full py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs ${
                      isAdded
                        ? 'bg-emerald-600 text-white animate-badge-bounce'
                        : 'bg-[#00A389] hover:bg-[#008F78] text-white hover:shadow-md'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <IoCheckmarkCircle size={15} />
                        <span>Added to Enquiry</span>
                      </>
                    ) : (
                      <>
                        <IoFlaskOutline size={15} />
                        <span>Add to Enquiry</span>
                      </>
                    )}
                  </button>

                  <Link
                    href={`/search?q=${encodeURIComponent(comp.cas)}`}
                    className="btn-scientific-secondary w-full py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-[#00A389] text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>View Details</span>
                    <IoArrowForward size={13} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

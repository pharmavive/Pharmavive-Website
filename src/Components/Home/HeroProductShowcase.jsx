'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  IoFlaskOutline,
  IoShieldCheckmarkOutline,
  IoCheckmarkCircle,
  IoArrowForward,
  IoSparklesOutline,
  IoCartOutline,
  IoCopyOutline,
} from 'react-icons/io5';
import { useEnquiryCart } from '@/context/EnquiryCartContext';

const SHOWCASE_COMPOUNDS = [
  {
    id: 'pv-ato-042',
    name: 'Atorvastatin Related Compound H',
    category: 'API Impurity Reference Standard',
    catNumber: 'PV-ATO-042',
    casNumber: '137071-32-0',
    formula: 'C₃₃H₃₅FN₂O₅',
    molWeight: '558.64 g/mol',
    purity: '> 99.4%',
    technique: 'HPLC / UV 246 nm',
    leadTime: 'In Stock (48h Global Dispatch)',
    grade: 'USP / EP Grade Standard',
    application: 'Assay validation & impurity quantification in formulation R&D.',
    structureSvg: (
      <svg viewBox="0 0 280 140" className="w-full h-full text-[#00A389]" fill="none" stroke="currentColor">
        {/* Central Pyrrole / Heterocycle Core */}
        <polygon points="140,40 168,58 158,92 122,92 112,58" strokeWidth="2.2" strokeLinejoin="round" />
        {/* Double bonds inside core */}
        <line x1="140" y1="46" x2="162" y2="60" strokeWidth="1.6" strokeDasharray="3 2" />
        <line x1="126" y1="86" x2="154" y2="86" strokeWidth="1.6" strokeDasharray="3 2" />
        
        {/* Top Phenyl Ring */}
        <line x1="140" y1="40" x2="140" y2="20" strokeWidth="2" />
        <polygon points="140,20 155,11 155,-7 140,-16 125,-7 125,11" strokeWidth="1.8" />
        
        {/* Left Isopropyl group */}
        <line x1="112" y1="58" x2="88" y2="52" strokeWidth="2.2" />
        <line x1="88" y1="52" x2="74" y2="34" strokeWidth="2" />
        <line x1="88" y1="52" x2="72" y2="70" strokeWidth="2" />
        
        {/* Right Aniline / Amide bridge */}
        <line x1="168" y1="58" x2="194" y2="50" strokeWidth="2.2" />
        <line x1="194" y1="50" x2="216" y2="64" strokeWidth="2.2" />
        <line x1="216" y1="64" x2="242" y2="52" strokeWidth="2.2" />
        <line x1="194" y1="50" x2="194" y2="32" strokeWidth="2" />
        <text x="188" y="26" fill="#0E2358" fontSize="11" fontWeight="bold" fontFamily="monospace">O</text>
        <text x="210" y="80" fill="#00A389" fontSize="11" fontWeight="bold" fontFamily="monospace">NH</text>

        {/* Right Phenyl Ring */}
        <polygon points="242,52 260,62 260,84 242,94 224,84 224,62" strokeWidth="1.8" />
        
        {/* Bottom Dihydroxyheptanoic Acid Chain */}
        <line x1="140" y1="92" x2="140" y2="114" strokeWidth="2.2" />
        <line x1="140" y1="114" x2="160" y2="126" strokeWidth="2.2" />
        <line x1="160" y1="126" x2="182" y2="114" strokeWidth="2.2" />
        <line x1="182" y1="114" x2="204" y2="126" strokeWidth="2.2" />
        
        {/* Hydroxyl branches */}
        <line x1="160" y1="126" x2="160" y2="138" strokeWidth="2" />
        <text x="154" y="148" fill="#00A389" fontSize="10" fontWeight="bold" fontFamily="monospace">OH</text>
        <line x1="182" y1="114" x2="182" y2="98" strokeWidth="2" />
        <text x="176" y="94" fill="#00A389" fontSize="10" fontWeight="bold" fontFamily="monospace">OH</text>
        
        {/* Carboxylic Acid End */}
        <text x="206" y="132" fill="#0E2358" fontSize="11" fontWeight="bold" fontFamily="monospace">COOH</text>
        
        {/* Fluorophenyl Node (Bottom Left) */}
        <line x1="122" y1="92" x2="102" y2="108" strokeWidth="2.2" />
        <polygon points="102,108 84,108 72,122 84,136 102,136 114,122" strokeWidth="1.8" />
        <line x1="72" y1="122" x2="56" y2="122" strokeWidth="2" />
        <text x="46" y="126" fill="#00A389" fontSize="12" fontWeight="bold" fontFamily="monospace">F</text>
      </svg>
    ),
  },
  {
    id: 'pv-sil-119',
    name: 'Enzalutamide-d6 (Stable Isotope)',
    category: 'Deuterated SIL Analytical Standard',
    catNumber: 'PV-SIL-119',
    casNumber: '143782-41-2 (d6)',
    formula: 'C₂₁H₁₀D₆F₄N₄O₂S',
    molWeight: '470.47 g/mol',
    purity: '> 99.2%',
    technique: 'LC-MS/MS & 1H/2H-NMR',
    leadTime: 'In Stock (48h Global Dispatch)',
    grade: 'Internal Standard (DMPK Grade)',
    application: 'Mass spectrometry bioanalysis, pharmacokinetics & internal standard.',
    structureSvg: (
      <svg viewBox="0 0 280 140" className="w-full h-full text-[#00A389]" fill="none" stroke="currentColor">
        {/* Imidazolidine-Dione Core */}
        <polygon points="135,46 165,46 175,76 125,76" strokeWidth="2.2" />
        <line x1="135" y1="46" x2="135" y2="28" strokeWidth="2" />
        <text x="130" y="24" fill="#0E2358" fontSize="11" fontWeight="bold" fontFamily="monospace">O</text>
        
        <line x1="175" y1="76" x2="190" y2="86" strokeWidth="2" />
        <text x="192" y="92" fill="#0E2358" fontSize="11" fontWeight="bold" fontFamily="monospace">S</text>
        
        {/* Left Benzonitrile Ring */}
        <line x1="125" y1="76" x2="95" y2="76" strokeWidth="2.2" />
        <polygon points="95,76 80,60 55,60 40,76 55,92 80,92" strokeWidth="1.8" />
        <line x1="40" y1="76" x2="20" y2="76" strokeWidth="2" />
        <text x="2" y="80" fill="#00A389" fontSize="11" fontWeight="bold" fontFamily="monospace">CN</text>
        <line x1="55" y1="60" x2="45" y2="46" strokeWidth="2" />
        <text x="35" y="44" fill="#00A389" fontSize="11" fontWeight="bold" fontFamily="monospace">CF3</text>
        
        {/* Right Pyridine Ring */}
        <line x1="165" y1="46" x2="195" y2="46" strokeWidth="2.2" />
        <polygon points="195,46 210,32 235,32 250,46 235,60 210,60" strokeWidth="1.8" />
        <text x="230" y="42" fill="#0E2358" fontSize="11" fontWeight="bold" fontFamily="monospace">N</text>
        
        {/* Deuterated Methyl groups (CD3) */}
        <line x1="150" y1="76" x2="150" y2="105" strokeWidth="2.2" />
        <line x1="150" y1="105" x2="130" y2="124" strokeWidth="2" />
        <text x="110" y="132" fill="#00A389" fontSize="11" fontWeight="bold" fontFamily="monospace">CD3</text>
        <line x1="150" y1="105" x2="170" y2="124" strokeWidth="2" />
        <text x="172" y="132" fill="#00A389" fontSize="11" fontWeight="bold" fontFamily="monospace">CD3</text>
      </svg>
    ),
  },
  {
    id: 'pv-sem-088',
    name: 'Semaglutide Impurity B (Acyldegradant)',
    category: 'GLP-1 Related Impurity Standard',
    catNumber: 'PV-PEP-088',
    casNumber: '910463-68-2',
    formula: 'C₁₈₇H₂₉₁N₄₅O₅₉',
    molWeight: '4113.6 g/mol',
    purity: '> 98.8%',
    technique: 'UPLC-HRMS & Peptide Map',
    leadTime: 'In Stock (Cold-Chain -20°C)',
    grade: 'Ph. Eur. Impurity Grade',
    application: 'Regulatory drug filings, biosimilar comparability & purity release.',
    structureSvg: (
      <svg viewBox="0 0 280 140" className="w-full h-full text-[#00A389]" fill="none" stroke="currentColor">
        {/* Peptide Backbone Wave */}
        <path d="M 20 80 Q 50 40 80 80 T 140 80 T 200 80 T 260 80" strokeWidth="2.4" />
        {/* Disulfide / Side chain loop */}
        <path d="M 80 80 C 80 120, 140 120, 140 80" strokeWidth="1.8" strokeDasharray="4 2" />
        <circle cx="110" cy="115" r="4" fill="#00A389" />
        <text x="100" y="132" fill="#0E2358" fontSize="10" fontWeight="bold" fontFamily="monospace">S-S Link</text>
        
        {/* Fatty Diacid Spacer */}
        <line x1="140" y1="80" x2="140" y2="40" strokeWidth="2" />
        <line x1="140" y1="40" x2="180" y2="25" strokeWidth="2" />
        <text x="185" y="28" fill="#00A389" fontSize="10" fontWeight="bold" fontFamily="monospace">AEEA-Glu-C18</text>
        
        {/* N-Terminus & C-Terminus */}
        <text x="10" y="95" fill="#00A389" fontSize="11" fontWeight="bold" fontFamily="monospace">H-His</text>
        <text x="245" y="95" fill="#00A389" fontSize="11" fontWeight="bold" fontFamily="monospace">-Gly-OH</text>
        
        {/* Alpha-Helical Ribbon Accent */}
        <path d="M 40 65 Q 60 50 80 65" strokeWidth="1.5" opacity="0.6" />
        <path d="M 160 65 Q 180 50 200 65" strokeWidth="1.5" opacity="0.6" />
        <path d="M 220 65 Q 240 50 260 65" strokeWidth="1.5" opacity="0.6" />
      </svg>
    ),
  },
];

export default function HeroProductShowcase() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const [addedToQuote, setAddedToQuote] = useState(false);

  const { addToCart, openCart } = useEnquiryCart();
  const compound = SHOWCASE_COMPOUNDS[selectedIdx];

  const handleCopyCas = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(compound.casNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleAddToQuote = () => {
    addToCart({
      _id: compound.id,
      name: compound.name,
      catNumber: compound.catNumber,
      casNumber: compound.casNumber,
      molecularFormula: compound.formula,
      purity: compound.purity,
      packSize: '50mg',
      quantity: 1,
    });
    setAddedToQuote(true);
    setTimeout(() => setAddedToQuote(false), 2200);
  };

  return (
    <div className="w-full max-w-lg mx-auto lg:mx-0 bg-white/95 backdrop-blur-xl rounded-3xl border border-[#B3E7E2] p-6 sm:p-7 shadow-2xl shadow-slate-200/70 relative overflow-hidden card-hover-scientific transition-all">
      {/* Subtle Refraction Glow Effect */}
      <div className="absolute -top-16 -right-16 w-44 h-44 bg-gradient-to-br from-[#00A389]/15 via-transparent to-transparent rounded-full blur-2xl pointer-events-none" />

      {/* Top Header Row: Category Badge & Interactive Switcher Tabs */}
      <div className="space-y-3 pb-3.5 border-b border-slate-100">
        <div className="flex items-center justify-between gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF7F6] border border-[#B3E7E2] text-[#00A389] text-[11px] font-mono font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00A389] animate-pulse" />
            <span>{compound.grade}</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
            <IoShieldCheckmarkOutline className="text-[#00A389]" size={15} />
            <span>CoA Included</span>
          </div>
        </div>

        {/* 3 Compound Switcher Pills */}
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100/80 rounded-2xl">
          {SHOWCASE_COMPOUNDS.map((c, idx) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelectedIdx(idx)}
              className={`px-2 py-1.5 rounded-xl text-[11px] font-semibold transition-all cursor-pointer truncate text-center ${
                selectedIdx === idx
                  ? 'bg-white text-[#0E2358] shadow-xs font-bold border border-slate-200/80'
                  : 'text-slate-500 hover:text-[#0E2358] hover:bg-white/60'
              }`}
            >
              {c.name.split(' ')[0]} {c.name.split(' ')[1] || ''}
            </button>
          ))}
        </div>
      </div>

      {/* Compound Title & Identifier */}
      <div className="pt-3.5 space-y-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-[#0E2358] leading-snug">
              {compound.name}
            </h3>
            <p className="text-xs text-[#64748B]">{compound.category}</p>
          </div>

          {/* Quick Copy CAS Badge */}
          <button
            type="button"
            onClick={handleCopyCas}
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-50 hover:bg-[#EBF7F6] border border-slate-200 hover:border-[#B3E7E2] text-[11px] font-mono font-medium text-slate-700 transition-colors flex-shrink-0 cursor-pointer"
            title="Click to copy CAS #"
          >
            <span className="text-[#00A389]">CAS:</span>
            <span>{compound.casNumber.split(' ')[0]}</span>
            <IoCopyOutline size={12} className="text-slate-400" />
          </button>
        </div>
      </div>

      {/* 2D Chemical Structure Interactive Showcase Box */}
      <div className="my-3.5 relative rounded-2xl bg-gradient-to-b from-[#F8FDFA] via-white to-[#F8FDFA] border border-[#E2E8F0] p-4 flex items-center justify-center min-h-[145px] group/chem overflow-hidden">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-[0.06] scientific-grid pointer-events-none" />

        {/* Interactive Structure Diagram */}
        <div className="relative z-10 w-full max-w-[260px] h-[115px] flex items-center justify-center group-hover/chem:scale-105 transition-transform duration-300">
          {compound.structureSvg}
        </div>

        {/* Purity Guarantee Tag */}
        <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-xs border border-[#00A389]/40 text-[#00A389] text-[10px] font-mono font-bold shadow-2xs">
          Purity: {compound.purity}
        </div>

        {/* Formula Badge Bottom Left */}
        <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-lg bg-white/90 text-slate-600 font-mono text-[10.5px] border border-slate-200/80 shadow-2xs">
          {compound.formula}
        </div>
      </div>

      {/* Chemical Metrics Grid (3 Pillars) */}
      <div className="grid grid-cols-3 gap-2 py-2">
        <div className="p-2.5 rounded-xl bg-[#F8FDFA] border border-[#E2E8F0]/80 text-center">
          <div className="text-[10px] font-mono uppercase text-[#64748B] font-semibold">Purity</div>
          <div className="text-xs sm:text-sm font-extrabold text-[#00A389] mt-0.5">{compound.purity}</div>
          <div className="text-[9px] text-slate-400 truncate">{compound.technique.split(' ')[0]}</div>
        </div>

        <div className="p-2.5 rounded-xl bg-[#F8FDFA] border border-[#E2E8F0]/80 text-center">
          <div className="text-[10px] font-mono uppercase text-[#64748B] font-semibold">Cat No</div>
          <div className="text-xs sm:text-sm font-bold font-mono text-[#0E2358] mt-0.5">{compound.catNumber}</div>
          <div className="text-[9px] text-slate-400">Pharmavive ID</div>
        </div>

        <div className="p-2.5 rounded-xl bg-[#F8FDFA] border border-[#E2E8F0]/80 text-center">
          <div className="text-[10px] font-mono uppercase text-[#64748B] font-semibold">Dispatch</div>
          <div className="text-xs sm:text-sm font-bold text-[#0E2358] mt-0.5">48 Hours</div>
          <div className="text-[9px] text-[#00A389] font-medium">Worldwide</div>
        </div>
      </div>

      {/* Action Footer Suite */}
      <div className="mt-3.5 pt-3.5 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-2.5">
        <button
          type="button"
          onClick={handleAddToQuote}
          className={`btn-scientific-primary w-full sm:flex-1 py-3 px-4 rounded-2xl font-semibold text-xs transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer ${
            addedToQuote
              ? 'bg-emerald-600 text-white'
              : 'bg-[#007a68] hover:bg-[#006657] text-white'
          }`}
        >
          {addedToQuote ? (
            <>
              <IoCheckmarkCircle size={16} />
              <span>Added to Inquiry!</span>
            </>
          ) : (
            <>
              <IoFlaskOutline size={16} />
              <span>Add to Quote List</span>
            </>
          )}
        </button>

        <Link
          href="/products"
          className="btn-scientific-secondary w-full sm:w-auto py-3 px-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#00A389] text-[#0E2358] hover:text-[#00A389] font-medium text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
        >
          <span>Catalog</span>
          <IoArrowForward size={13} />
        </Link>
      </div>
    </div>
  );
}

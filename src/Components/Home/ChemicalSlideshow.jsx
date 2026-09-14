'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  IoCartOutline,
  IoArrowForward,
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoCheckmarkCircle,
  IoPersonOutline,
  IoGitNetworkOutline,
  IoCubeOutline,
  IoBarcodeOutline,
} from 'react-icons/io5';
import { useEnquiryCart } from '@/context/EnquiryCartContext';
import { prefetchProduct } from '@/utils/clientCache';

const CHEMICAL_SLIDES = [
  {
    id: 'zabedosertib-reagent-intermediate',
    badge: 'Reagent',
    name: 'N-(6-(2-Hydroxypropan-2-yl)-1-(2-(methylsulfonyl)ethyl)-1H-indazol-5-yl)-6-(trifluoromethyl)picolinamide',
    chemicalName: 'N-(6-(2-Hydroxypropan-2-yl)-1-(2-(methylsulfonyl)ethyl)-1H-indazol-5-yl)-6-(trifluoromethyl)picolinamide',
    catNumber: 'PV-REA-2751',
    casNumber: '2751749-06-9',
    molecularWeight: '470.47 g/mol',
    molecularFormula: 'C₂₀H₂₁F₃N₄O₄S',
    category: 'Reagents',
    formulaSubscript: 'C₂₀H₂₁F₃N₄O₄S',
    structureImage: '/excel_structures/excel_structure_1.png',
    link: '/products/browse/zabedosertib/zabedosertib-reagent-intermediate',
  },
  {
    id: '5-piperazin-1-yl-benzofuran-2-carboxamide',
    badge: 'Reference Standard',
    name: '5-(Piperazin-1-yl)benzofuran-2-carboxamide',
    chemicalName: '5-(Piperazin-1-yl)benzofuran-2-carboxamide',
    catNumber: 'PV-STD-1832',
    casNumber: '183288-46-2',
    molecularWeight: '245.28 g/mol',
    molecularFormula: 'C₁₃H₁₅N₃O₂',
    category: 'Reference Standards',
    formulaSubscript: 'C₁₃H₁₅N₃O₂',
    structureImage: '/excel_structures/excel_structure_2.png',
    link: '/products/browse/vilazodone/5-piperazin-1-yl-benzofuran-2-carboxamide',
  },
  {
    id: 'moxifloxacin-difluoro-methoxy-impurity',
    badge: 'Impurity',
    name: '1-Cyclopropyl-6,7-difluoro-8-methoxy-4-oxo-1,4-dihydroquinoline-3-carboxylic acid',
    chemicalName: '1-Cyclopropyl-6,7-difluoro-8-methoxy-4-oxo-1,4-dihydroquinoline-3-carboxylic acid',
    catNumber: 'PV-MXF-1128',
    casNumber: '112811-72-0',
    molecularWeight: '295.24 g/mol',
    molecularFormula: 'C₁₄H₁₁F₂NO₄',
    category: 'Impurity',
    formulaSubscript: 'C₁₄H₁₁F₂NO₄',
    structureImage: '/excel_structures/excel_structure_3.png',
    link: '/products/browse/moxifloxacin/moxifloxacin-difluoro-methoxy-impurity',
  },
  {
    id: 'eletriptan-bromo-indole-impurity',
    badge: 'Impurity',
    name: '(R)-Benzyl 2-(5-bromo-1H-indole-3-carbonyl)pyrrolidine-1-carboxylate',
    chemicalName: '(R)-Benzyl 2-(5-bromo-1H-indole-3-carbonyl)pyrrolidine-1-carboxylate',
    catNumber: 'PV-ELT-1433',
    casNumber: '143322-56-9',
    molecularWeight: '427.29 g/mol',
    molecularFormula: 'C₂₁H₁₉BrN₂O₃',
    category: 'Impurity',
    formulaSubscript: 'C₂₁H₁₉BrN₂O₃',
    structureImage: '/excel_structures/excel_structure_4.png',
    link: '/products/browse/eletriptan/eletriptan-bromo-indole-impurity',
  },
];

/**
 * 2D Skeletal Chemical Structure Component (ChemDraw / Kekule Style)
 * Uses high-contrast black bonds, scientific blue nitrogens, red oxygens,
 * teal fluorines, purple bromines, and amber sulfurs.
 */
function SkeletalStructure2D({ type }) {
  if (type === 'zabedosertib-intermediate') {
    return (
      <svg viewBox="0 36 195 152" className="w-full h-full select-none" fill="none">
        {/* Indazole Benzene Ring */}
        <polygon points="70,100 92,88 92,64 70,52 48,64 48,88" stroke="#0f172a" strokeWidth="2.2" strokeLinejoin="round" />
        <line x1="88" y1="86" x2="88" y2="66" stroke="#0f172a" strokeWidth="1.6" />
        <line x1="68" y1="56" x2="52" y2="66" stroke="#0f172a" strokeWidth="1.6" />
        <line x1="52" y1="86" x2="68" y2="96" stroke="#0f172a" strokeWidth="1.6" />

        {/* Fused Pyrazole Ring */}
        <line x1="92" y1="64" x2="108" y2="60" stroke="#0f172a" strokeWidth="2.2" />
        <text x="110" y="64" fill="#0284c7" fontSize="12" fontWeight="bold" fontFamily="system-ui, sans-serif">N</text>
        <line x1="116" y1="67" x2="116" y2="82" stroke="#0f172a" strokeWidth="2.2" />
        <text x="111" y="93" fill="#0284c7" fontSize="12" fontWeight="bold" fontFamily="system-ui, sans-serif">N</text>
        <line x1="110" y1="92" x2="92" y2="88" stroke="#0f172a" strokeWidth="2.2" />

        {/* C6 Hydroxypropan-2-yl branch from (48,88) */}
        <line x1="48" y1="88" x2="32" y2="100" stroke="#0f172a" strokeWidth="2.2" />
        <line x1="32" y1="100" x2="20" y2="114" stroke="#0f172a" strokeWidth="2.2" />
        <line x1="32" y1="100" x2="18" y2="92" stroke="#0f172a" strokeWidth="2.2" />
        <line x1="32" y1="100" x2="38" y2="116" stroke="#0f172a" strokeWidth="2.2" />
        <text x="34" y="128" fill="#dc2626" fontSize="11" fontWeight="bold" fontFamily="system-ui, sans-serif">OH</text>

        {/* N1 branch: -CH2-CH2-SO2-CH3 */}
        <line x1="124" y1="92" x2="138" y2="102" stroke="#0f172a" strokeWidth="2.2" />
        <line x1="138" y1="102" x2="138" y2="120" stroke="#0f172a" strokeWidth="2.2" />
        <line x1="138" y1="120" x2="152" y2="128" stroke="#0f172a" strokeWidth="2.2" />
        {/* S (Sulfur) */}
        <text x="153" y="134" fill="#d97706" fontSize="13" fontWeight="bold" fontFamily="system-ui, sans-serif">S</text>
        {/* S=O up */}
        <line x1="158" y1="122" x2="158" y2="110" stroke="#0f172a" strokeWidth="2" />
        <line x1="162" y1="122" x2="162" y2="110" stroke="#0f172a" strokeWidth="2" />
        <text x="156" y="106" fill="#dc2626" fontSize="11" fontWeight="bold" fontFamily="system-ui, sans-serif">O</text>
        {/* S=O down */}
        <line x1="158" y1="136" x2="158" y2="148" stroke="#0f172a" strokeWidth="2" />
        <line x1="162" y1="136" x2="162" y2="148" stroke="#0f172a" strokeWidth="2" />
        <text x="156" y="158" fill="#dc2626" fontSize="11" fontWeight="bold" fontFamily="system-ui, sans-serif">O</text>
        {/* S-CH3 right */}
        <line x1="165" y1="130" x2="178" y2="130" stroke="#0f172a" strokeWidth="2.2" />

        {/* C5 Amide link from (70,100) */}
        <line x1="70" y1="100" x2="70" y2="118" stroke="#0f172a" strokeWidth="2.2" />
        <text x="61" y="131" fill="#0284c7" fontSize="12" fontWeight="bold" fontFamily="system-ui, sans-serif">HN</text>
        {/* Carbonyl */}
        <line x1="78" y1="130" x2="94" y2="138" stroke="#0f172a" strokeWidth="2.2" />
        <line x1="92" y1="138" x2="92" y2="154" stroke="#0f172a" strokeWidth="2" />
        <line x1="96" y1="138" x2="96" y2="154" stroke="#0f172a" strokeWidth="2" />
        <text x="90" y="166" fill="#dc2626" fontSize="11" fontWeight="bold" fontFamily="system-ui, sans-serif">O</text>

        {/* Pyridine Ring from (94,138) */}
        <line x1="94" y1="138" x2="110" y2="130" stroke="#0f172a" strokeWidth="2.2" />
        <polygon points="110,130 126,138 126,158 110,166 98,158" stroke="#0f172a" strokeWidth="2.2" strokeLinejoin="round" />
        <line x1="122" y1="140" x2="122" y2="156" stroke="#0f172a" strokeWidth="1.6" />
        {/* Pyridine Nitrogen */}
        <text x="106" y="142" fill="#0284c7" fontSize="11" fontWeight="bold" fontFamily="system-ui, sans-serif">N</text>
        {/* CF3 group at C6 of pyridine */}
        <line x1="126" y1="158" x2="140" y2="166" stroke="#0f172a" strokeWidth="2.2" />
        <text x="142" y="172" fill="#00A389" fontSize="11.5" fontWeight="bold" fontFamily="system-ui, sans-serif">CF₃</text>
      </svg>
    );
  }

  if (type === 'piperazinyl-benzofuran') {
    return (
      <svg viewBox="10 74 235 86" className="w-full h-full select-none" fill="none">
        {/* Piperazine Ring (Left) */}
        <line x1="28" y1="105" x2="38" y2="98" stroke="#0f172a" strokeWidth="2.2" />
        <text x="37" y="96" fill="#0284c7" fontSize="12" fontWeight="bold" fontFamily="system-ui, sans-serif">HN</text>
        <line x1="52" y1="98" x2="62" y2="105" stroke="#0f172a" strokeWidth="2.2" />
        <line x1="62" y1="105" x2="62" y2="120" stroke="#0f172a" strokeWidth="2.2" />
        {/* Nitrogen attached to Benzofuran */}
        <text x="58" y="132" fill="#0284c7" fontSize="12" fontWeight="bold" fontFamily="system-ui, sans-serif">N</text>
        <line x1="58" y1="134" x2="48" y2="140" stroke="#0f172a" strokeWidth="2.2" />
        <line x1="48" y1="140" x2="28" y2="125" stroke="#0f172a" strokeWidth="2.2" />
        <line x1="28" y1="125" x2="28" y2="105" stroke="#0f172a" strokeWidth="2.2" />

        {/* Bond from Piperazine N to Benzofuran C5 */}
        <line x1="68" y1="128" x2="88" y2="128" stroke="#0f172a" strokeWidth="2.2" />

        {/* Benzene Ring of Benzofuran */}
        <polygon points="88,128 102,114 122,114 132,128 122,146 102,146" stroke="#0f172a" strokeWidth="2.2" strokeLinejoin="round" />
        <line x1="104" y1="118" x2="120" y2="118" stroke="#0f172a" strokeWidth="1.6" />
        <line x1="120" y1="142" x2="104" y2="142" stroke="#0f172a" strokeWidth="1.6" />
        <line x1="92" y1="128" x2="100" y2="118" stroke="#0f172a" strokeWidth="1.6" />

        {/* Fused Furan Ring */}
        <line x1="122" y1="114" x2="138" y2="110" stroke="#0f172a" strokeWidth="2.2" />
        <text x="140" y="113" fill="#dc2626" fontSize="12" fontWeight="bold" fontFamily="system-ui, sans-serif">O</text>
        <line x1="152" y1="112" x2="164" y2="126" stroke="#0f172a" strokeWidth="2.2" />
        <line x1="164" y1="126" x2="148" y2="140" stroke="#0f172a" strokeWidth="2.2" />
        <line x1="148" y1="140" x2="122" y2="146" stroke="#0f172a" strokeWidth="2.2" />
        <line x1="156" y1="126" x2="144" y2="136" stroke="#0f172a" strokeWidth="1.6" />

        {/* Carboxamide branch from C2 (164,126) */}
        <line x1="164" y1="126" x2="184" y2="126" stroke="#0f172a" strokeWidth="2.2" />
        {/* Carbonyl =O */}
        <line x1="182" y1="126" x2="182" y2="108" stroke="#0f172a" strokeWidth="2" />
        <line x1="186" y1="126" x2="186" y2="108" stroke="#0f172a" strokeWidth="2" />
        <text x="179" y="102" fill="#dc2626" fontSize="12" fontWeight="bold" fontFamily="system-ui, sans-serif">O</text>

        {/* Amide NH2 - generous right margin so NH2 is completely visible */}
        <line x1="184" y1="126" x2="198" y2="136" stroke="#0f172a" strokeWidth="2.2" />
        <text x="199" y="142" fill="#0284c7" fontSize="12" fontWeight="bold" fontFamily="system-ui, sans-serif">NH₂</text>
      </svg>
    );
  }

  if (type === 'moxifloxacin-impurity') {
    return (
      <svg viewBox="6 32 218 158" className="w-full h-full select-none" fill="none">
        {/* Left Benzene Ring */}
        <polygon points="76,80 102,94 102,126 76,140 50,126 50,94" stroke="#0f172a" strokeWidth="2.2" strokeLinejoin="round" />
        <line x1="76" y1="86" x2="98" y2="98" stroke="#0f172a" strokeWidth="1.6" />
        <line x1="98" y1="122" x2="76" y2="134" stroke="#0f172a" strokeWidth="1.6" />
        <line x1="54" y1="122" x2="54" y2="98" stroke="#0f172a" strokeWidth="1.6" />

        {/* Substituents on Benzene */}
        {/* C6 - F */}
        <line x1="50" y1="94" x2="34" y2="84" stroke="#0f172a" strokeWidth="2.2" />
        <text x="22" y="86" fill="#00A389" fontSize="13" fontWeight="bold" fontFamily="system-ui, sans-serif">F</text>
        {/* C7 - F */}
        <line x1="50" y1="126" x2="34" y2="136" stroke="#0f172a" strokeWidth="2.2" />
        <text x="22" y="142" fill="#00A389" fontSize="13" fontWeight="bold" fontFamily="system-ui, sans-serif">F</text>
        {/* C8 - OCH3 */}
        <line x1="76" y1="140" x2="76" y2="158" stroke="#0f172a" strokeWidth="2.2" />
        <text x="64" y="170" fill="#dc2626" fontSize="11" fontWeight="bold" fontFamily="system-ui, sans-serif">OCH₃</text>

        {/* Right Pyridone Ring (fused at 102,94 and 102,126) */}
        <line x1="102" y1="94" x2="126" y2="80" stroke="#0f172a" strokeWidth="2.2" />
        {/* C4 Carbonyl =O */}
        <line x1="124" y1="80" x2="124" y2="60" stroke="#0f172a" strokeWidth="2" />
        <line x1="128" y1="80" x2="128" y2="60" stroke="#0f172a" strokeWidth="2" />
        <text x="121" y="54" fill="#dc2626" fontSize="13" fontWeight="bold" fontFamily="system-ui, sans-serif">O</text>

        {/* C4 to C3 */}
        <line x1="126" y1="80" x2="150" y2="94" stroke="#0f172a" strokeWidth="2.2" />
        {/* C3 to C2 */}
        <line x1="150" y1="94" x2="150" y2="126" stroke="#0f172a" strokeWidth="2.2" />
        <line x1="146" y1="98" x2="146" y2="122" stroke="#0f172a" strokeWidth="1.6" />

        {/* C3 Carboxylic Acid -COOH */}
        <line x1="150" y1="94" x2="174" y2="80" stroke="#0f172a" strokeWidth="2.2" />
        {/* Carbonyl =O */}
        <line x1="172" y1="80" x2="172" y2="62" stroke="#0f172a" strokeWidth="2" />
        <line x1="176" y1="80" x2="176" y2="62" stroke="#0f172a" strokeWidth="2" />
        <text x="169" y="56" fill="#dc2626" fontSize="12" fontWeight="bold" fontFamily="system-ui, sans-serif">O</text>
        {/* Hydroxyl -OH */}
        <line x1="174" y1="80" x2="192" y2="90" stroke="#0f172a" strokeWidth="2.2" />
        <text x="194" y="96" fill="#dc2626" fontSize="12" fontWeight="bold" fontFamily="system-ui, sans-serif">OH</text>

        {/* C2 to N1 */}
        <line x1="150" y1="126" x2="134" y2="134" stroke="#0f172a" strokeWidth="2.2" />
        <text x="122" y="142" fill="#0284c7" fontSize="13" fontWeight="bold" fontFamily="system-ui, sans-serif">N</text>
        {/* N1 to (102,126) */}
        <line x1="120" y1="134" x2="102" y2="126" stroke="#0f172a" strokeWidth="2.2" />

        {/* N1 Cyclopropyl group */}
        <line x1="126" y1="146" x2="126" y2="162" stroke="#0f172a" strokeWidth="2.2" />
        <polygon points="126,162 116,182 136,182" stroke="#0f172a" strokeWidth="2.2" strokeLinejoin="round" fill="none" />
      </svg>
    );
  }

  if (type === 'eletriptan-impurity') {
    return (
      <svg viewBox="-2 35 212 162" className="w-full h-full select-none" fill="none">
        {/* Indole Benzene Ring */}
        <polygon points="56,88 74,76 74,56 56,46 38,56 38,76" stroke="#0f172a" strokeWidth="2.2" strokeLinejoin="round" />
        <line x1="70" y1="74" x2="70" y2="58" stroke="#0f172a" strokeWidth="1.6" />
        <line x1="54" y1="50" x2="42" y2="58" stroke="#0f172a" strokeWidth="1.6" />
        <line x1="42" y1="74" x2="54" y2="84" stroke="#0f172a" strokeWidth="1.6" />

        {/* Bromine at C5 */}
        <line x1="38" y1="56" x2="24" y2="50" stroke="#0f172a" strokeWidth="2.2" />
        <text x="10" y="52" fill="#7c3aed" fontSize="13" fontWeight="bold" fontFamily="system-ui, sans-serif">Br</text>

        {/* Fused Pyrrole Ring */}
        <line x1="74" y1="56" x2="92" y2="64" stroke="#0f172a" strokeWidth="2.2" />
        <line x1="92" y1="64" x2="88" y2="82" stroke="#0f172a" strokeWidth="2.2" />
        <line x1="88" y1="66" x2="84" y2="80" stroke="#0f172a" strokeWidth="1.6" />
        <line x1="88" y1="82" x2="82" y2="92" stroke="#0f172a" strokeWidth="2.2" />
        <text x="70" y="104" fill="#0284c7" fontSize="12" fontWeight="bold" fontFamily="system-ui, sans-serif">HN</text>
        <line x1="74" y1="92" x2="74" y2="76" stroke="#0f172a" strokeWidth="2.2" />

        {/* Carbonyl from C3 */}
        <line x1="88" y1="82" x2="108" y2="88" stroke="#0f172a" strokeWidth="2.2" />
        {/* Carbonyl =O */}
        <line x1="106" y1="88" x2="106" y2="104" stroke="#0f172a" strokeWidth="2" />
        <line x1="110" y1="88" x2="110" y2="104" stroke="#0f172a" strokeWidth="2" />
        <text x="103" y="116" fill="#dc2626" fontSize="11.5" fontWeight="bold" fontFamily="system-ui, sans-serif">O</text>

        {/* Pyrrolidine Ring */}
        <line x1="108" y1="88" x2="126" y2="82" stroke="#0f172a" strokeWidth="2.2" />
        <polygon points="126,82 144,92 140,112 120,112 116,96" stroke="#0f172a" strokeWidth="2.2" strokeLinejoin="round" />
        {/* Pyrrolidine Nitrogen */}
        <text x="122" y="122" fill="#0284c7" fontSize="12" fontWeight="bold" fontFamily="system-ui, sans-serif">N</text>

        {/* Carbamate (-COO-CH2-Ph) from Nitrogen */}
        <line x1="126" y1="126" x2="126" y2="142" stroke="#0f172a" strokeWidth="2.2" />
        {/* Carbonyl =O */}
        <line x1="124" y1="142" x2="110" y2="142" stroke="#0f172a" strokeWidth="2" />
        <line x1="124" y1="146" x2="110" y2="146" stroke="#0f172a" strokeWidth="2" />
        <text x="98" y="148" fill="#dc2626" fontSize="11.5" fontWeight="bold" fontFamily="system-ui, sans-serif">O</text>
        {/* Ester Oxygen -O- */}
        <line x1="126" y1="142" x2="138" y2="150" stroke="#0f172a" strokeWidth="2.2" />
        <text x="140" y="156" fill="#dc2626" fontSize="12" fontWeight="bold" fontFamily="system-ui, sans-serif">O</text>

        {/* Methylene -CH2- to Phenyl */}
        <line x1="152" y1="154" x2="166" y2="162" stroke="#0f172a" strokeWidth="2.2" />
        {/* Benzyl Phenyl Ring */}
        <polygon points="166,162 180,154 196,162 196,180 180,188 166,180" stroke="#0f172a" strokeWidth="2" strokeLinejoin="round" />
        <line x1="180" y1="158" x2="192" y2="164" stroke="#0f172a" strokeWidth="1.5" />
        <line x1="192" y1="178" x2="180" y2="184" stroke="#0f172a" strokeWidth="1.5" />
        <line x1="170" y1="178" x2="170" y2="164" stroke="#0f172a" strokeWidth="1.5" />
      </svg>
    );
  }
}

/**
 * Chemical Card Content Surface (Scientific Spec Split + 2D ChemDraw Stage)
 */
function ChemicalCardContent({ slide, added, onAddToCart }) {
  return (
    <>
      {/* Card Top: Badges, Catalog No, & Compound Name */}
      <div className="text-left">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="inline-block px-3 py-0.5 rounded-full text-[11px] font-semibold bg-[#E2F7F4] text-[#00897B] tracking-wide border border-[#00E5BE]/30 shadow-[0_0_10px_rgba(0,229,190,0.15)]">
            {slide.badge}
          </span>
          <span className="text-[11.5px] font-mono font-bold text-[#00897B] bg-[#F0FDFB] px-2.5 py-0.5 rounded-md border border-[#00E5BE]/20">
            {slide.catNumber}
          </span>
        </div>

        <h3 className="text-sm sm:text-base font-bold text-[#0E2358] tracking-tight leading-snug line-clamp-2 min-h-[2.4rem] sm:min-h-[2.65rem] flex items-center" title={slide.chemicalName || slide.name}>
          {slide.name}
        </h3>
      </div>

      {/* Middle Body: Landscape Rectangular Split between Left Specs & Spacious Right Structure */}
      <div className="grid grid-cols-12 gap-2.5 sm:gap-4 items-stretch h-[225px] sm:h-[235px] my-auto pt-2.5 border-t border-slate-100">
        {/* Left Specs with Mint Circular Icons (5 of 12 cols = ~40%) */}
        <div className="col-span-5 flex flex-col justify-around py-1 text-left h-full">
          {/* CAS No */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="w-7.5 sm:w-8.5 h-7.5 sm:h-8.5 rounded-full bg-[#E2F7F4] text-[#00897B] flex items-center justify-center flex-shrink-0 shadow-[0_0_8px_rgba(0,163,137,0.15)]">
              <IoPersonOutline size={14} className="sm:text-[15px]" />
            </div>
            <div className="leading-tight min-w-0">
              <span className="text-[9.5px] sm:text-[10px] font-mono uppercase text-slate-400 font-semibold block">CAS No.</span>
              <span className="text-[11.5px] sm:text-[13px] font-bold font-mono text-[#0E2358] truncate block">{slide.casNumber}</span>
            </div>
          </div>

          {/* Molecular Weight */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="w-7.5 sm:w-8.5 h-7.5 sm:h-8.5 rounded-full bg-[#E2F7F4] text-[#00897B] flex items-center justify-center flex-shrink-0 shadow-[0_0_8px_rgba(0,163,137,0.15)]">
              <IoGitNetworkOutline size={14} className="sm:text-[15px]" />
            </div>
            <div className="leading-tight min-w-0">
              <span className="text-[9.5px] sm:text-[10px] font-mono uppercase text-slate-400 font-semibold block">Mol. Weight</span>
              <span className="text-[11.5px] sm:text-[13px] font-bold font-mono text-[#0E2358] truncate block">{slide.molecularWeight}</span>
            </div>
          </div>

          {/* Molecular Formula */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="w-7.5 sm:w-8.5 h-7.5 sm:h-8.5 rounded-full bg-[#E2F7F4] text-[#00897B] flex items-center justify-center flex-shrink-0 shadow-[0_0_8px_rgba(0,163,137,0.15)]">
              <IoCubeOutline size={14} className="sm:text-[15px]" />
            </div>
            <div className="leading-tight min-w-0">
              <span className="text-[9.5px] sm:text-[10px] font-mono uppercase text-slate-400 font-semibold block">Formula</span>
              <span className="text-[11.5px] sm:text-[13px] font-bold font-mono text-[#0E2358] truncate block">{slide.molecularFormula}</span>
            </div>
          </div>
        </div>

        {/* Right 2D Skeletal Chemical Structure Stage (7 of 12 cols = ~60% - Spacious Rectangle) */}
        <div className="col-span-7 relative flex flex-col items-center justify-center rounded-[20px] bg-[#FAFDFD] border border-slate-200/90 p-2 sm:p-3 h-full transition-all duration-300 hover:border-slate-300 hover:shadow-xs group/struct">
          <div className="w-full h-full max-h-[195px] sm:max-h-[205px] flex items-center justify-center p-1.5 transition-transform duration-300 group-hover/struct:scale-[1.01]">
            {slide.structureImage ? (
              <img
                src={slide.structureImage}
                alt={slide.name}
                className="w-full h-full object-contain max-h-[185px] sm:max-h-[195px] select-none pointer-events-none drop-shadow-[0_2px_8px_rgba(15,23,42,0.06)]"
                loading="eager"
              />
            ) : (
              <SkeletalStructure2D type={slide.structureType} />
            )}
          </div>
          <div className="absolute bottom-2 right-2.5 pointer-events-none">
            <span className="text-[9.5px] sm:text-[10.5px] font-mono text-slate-500 font-bold tracking-wider bg-white/95 px-1.5 py-0.5 rounded border border-slate-200/80 shadow-2xs">
              {slide.formulaSubscript}
            </span>
          </div>
        </div>
      </div>

      {/* Action Footer Bar */}
      <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-3 relative z-10">
        <button
          type="button"
          onClick={onAddToCart}
          className={`relative overflow-hidden px-5 sm:px-6 py-2 sm:py-2.5 rounded-full font-semibold text-xs sm:text-sm shadow-md flex items-center gap-2 cursor-pointer transition-all active:scale-95 ${
            added
              ? 'bg-emerald-600 text-white shadow-[0_0_18px_rgba(16,185,129,0.45)]'
              : 'bg-[#0B3B3C] hover:bg-[#072627] text-white hover:shadow-[0_0_20px_rgba(0,163,137,0.38)]'
          }`}
        >
          {!added && (
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer-sweep pointer-events-none" />
          )}
          {added ? (
            <>
              <IoCheckmarkCircle size={16} />
              <span>Added to Cart!</span>
            </>
          ) : (
            <>
              <IoCartOutline size={16} />
              <span>Add to Enquiry Cart</span>
            </>
          )}
        </button>

        <Link
          href={slide.link || "/products"}
          prefetch={true}
          onMouseEnter={() => prefetchProduct(slide.id)}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#00897B] hover:text-[#0B3B3C] transition-colors"
        >
          <span>View Details</span>
          <IoArrowForward size={14} />
        </Link>
      </div>
    </>
  );
}

export default function ChemicalSlideshow() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState(null);
  const [direction, setDirection] = useState('next'); // 'next' | 'prev'
  const [added, setAdded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const transitionTimerRef = useRef(null);
  const touchStartXRef = useRef(null);
  const touchStartYRef = useRef(null);
  const { addToCart } = useEnquiryCart();

  const total = CHEMICAL_SLIDES.length;
  const activeSlide = CHEMICAL_SLIDES[currentIdx];

  const goToSlide = (newIdx, dir = 'next') => {
    if (newIdx === currentIdx) return;
    if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);

    setDirection(dir);
    setPrevIdx(currentIdx);
    setCurrentIdx(newIdx);

    transitionTimerRef.current = setTimeout(() => {
      setPrevIdx(null);
    }, 280);
  };

  const handleNext = () => {
    const nextIdx = (currentIdx + 1) % total;
    goToSlide(nextIdx, 'next');
  };

  const handlePrev = () => {
    const prevIdxVal = (currentIdx - 1 + total) % total;
    goToSlide(prevIdxVal, 'prev');
  };

  const handleDotClick = (idx) => {
    if (idx === currentIdx) return;
    const dir = idx > currentIdx ? 'next' : 'prev';
    goToSlide(idx, dir);
  };

  // Autoplay timer: advances smoothly every 2s, pauses on hover / touch
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      const nextIdx = (currentIdx + 1) % total;
      goToSlide(nextIdx, 'next');
    }, 2000);
    return () => clearInterval(timer);
  }, [isPaused, currentIdx, total]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    };
  }, []);

  // Mobile Touch Swipe Handling
  const handleTouchStart = (e) => {
    if (e.touches && e.touches.length > 0) {
      touchStartXRef.current = e.touches[0].clientX;
      touchStartYRef.current = e.touches[0].clientY;
      setIsPaused(true);
    }
  };

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current === null) return;
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const diffX = touchStartXRef.current - endX;
    const diffY = touchStartYRef.current - endY;

    // Minimum 45px swipe with horizontal dominance
    if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
    setIsPaused(false);
  };

  const handleAddToCart = () => {
    addToCart({
      _id: activeSlide.id,
      name: activeSlide.name,
      catNumber: activeSlide.catNumber,
      casNumber: activeSlide.casNumber,
      chemicalName: activeSlide.name,
      molecularFormula: activeSlide.molecularFormula,
      molecularWeight: activeSlide.molecularWeight,
      structureType: activeSlide.structureType,
      category: activeSlide.category,
      purity: '99.5% (HPLC)',
      stock: 'Instock',
      packSize: '50mg',
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <div
      className="relative w-full max-w-[640px] xl:max-w-[670px] select-none mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Soft subtle base shadow */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[60%] h-6 bg-[#00A389]/10 blur-xl rounded-full pointer-events-none" />

      {/* ================================================================
          PERMANENT MOVING GLOW CARD CONTAINER (Steady & 100% Stable 24/7)
          This outer frame NEVER moves, resets, or unmounts during transitions.
          The beam continuously rotates around the perimeter with zero interruption.
          ================================================================ */}
      <div className="moving-glow-card w-full h-[415px] sm:h-[420px] select-none relative shadow-[0_20px_50px_-12px_rgba(15,23,42,0.08)]">
        {/* 1. Luminous Rotating Glow Beam (Exact same class as Log In / Sign Up button) */}
        <span className="moving-glow-beam" aria-hidden="true" />

        {/* 2. Ambient Bloom Layer (Exact same class as Log In / Sign Up button) */}
        <span className="moving-glow-beam-bloom" aria-hidden="true" />

        {/* 3. Inner White Surface with Overflow Hidden for Smooth Slide Transitions */}
        <div className="relative z-10 w-full h-full rounded-[25.5px] bg-white overflow-hidden">
          {/* Outgoing slide during transition */}
          {prevIdx !== null && (
            <div
              key={`prev-${CHEMICAL_SLIDES[prevIdx].id}`}
              className={`absolute inset-0 p-5 sm:p-6 flex flex-col justify-between pointer-events-none ${
                direction === 'next' ? 'slide-content-out-next' : 'slide-content-out-prev'
              }`}
            >
              <ChemicalCardContent
                slide={CHEMICAL_SLIDES[prevIdx]}
                added={false}
                onAddToCart={() => {}}
              />
            </div>
          )}

          {/* Current active slide */}
          <div
            key={`curr-${activeSlide.id}`}
            className={`w-full h-full p-5 sm:p-6 flex flex-col justify-between ${
              prevIdx !== null
                ? direction === 'next'
                  ? 'slide-content-in-next'
                  : 'slide-content-in-prev'
                : ''
            }`}
          >
            <ChemicalCardContent
              slide={activeSlide}
              added={added}
              onAddToCart={handleAddToCart}
            />
          </div>
        </div>
      </div>

      {/* ================================================================
          NEXT & PREVIOUS DIRECTIONAL ARROWS
          Floating comfortably over card edges with high z-index
          ================================================================ */}
      <button
        type="button"
        onClick={handlePrev}
        className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-40 w-11 sm:w-12 h-11 sm:h-12 rounded-full bg-white hover:bg-slate-50 text-slate-700 shadow-[0_4px_16px_rgba(15,23,42,0.12)] border border-slate-200/90 hover:border-slate-300 flex items-center justify-center transition-all duration-300 group active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
        aria-label="Previous Chemical Product"
        title="Previous product"
      >
        <span className="transition-transform duration-300 group-hover:-translate-x-0.5">
          <IoChevronBackOutline size={22} />
        </span>
      </button>

      <button
        type="button"
        onClick={handleNext}
        className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-40 w-11 sm:w-12 h-11 sm:h-12 rounded-full bg-white hover:bg-slate-50 text-slate-700 shadow-[0_4px_16px_rgba(15,23,42,0.12)] border border-slate-200/90 hover:border-slate-300 flex items-center justify-center transition-all duration-300 group active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
        aria-label="Next Chemical Product"
        title="Next product"
      >
        <span className="transition-transform duration-300 group-hover:translate-x-0.5">
          <IoChevronForwardOutline size={22} />
        </span>
      </button>

      {/* ================================================================
          BOTTOM NAVIGATION INDICATORS (Polished Pill Dots)
          ================================================================ */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {CHEMICAL_SLIDES.map((c, idx) => (
          <button
            key={c.id}
            type="button"
            onClick={() => handleDotClick(idx)}
            className={`h-1.5 transition-all duration-300 cursor-pointer rounded-full ${
              currentIdx === idx
                ? 'w-7 bg-[#00897B] shadow-[0_0_10px_rgba(0,163,137,0.5)]'
                : 'w-4 bg-slate-300 hover:bg-slate-400'
            }`}
            aria-label={`Jump to ${c.name}`}
          />
        ))}
      </div>
    </div>
  );
}


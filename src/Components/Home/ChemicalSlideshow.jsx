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
  IoFlaskOutline,
  IoRemoveOutline,
  IoAddOutline,
} from 'react-icons/io5';
import { useEnquiryCart } from '@/context/EnquiryCartContext';
import { prefetchProduct } from '@/utils/clientCache';

const CHEMICAL_SLIDES = [
  {
    id: '-cyclodextrin-epichlorohydrin-polymer',
    badge: 'Specialty Polymer',
    name: 'β-Cyclodextrin Epichlorohydrin Polymer',
    chemicalName: 'β-Cyclodextrin Epichlorohydrin Polymer',
    description: 'A specialized crosslinked cyclodextrin polymer used for molecular encapsulation and drug delivery research.',
    catNumber: 'PV-CDX-2565',
    casNumber: '25655-42-9',
    molecularWeight: '272.68 g/mol',
    molecularFormula: 'C₉H₁₇ClO₇',
    category: 'Cyclodextrins',
    formulaSubscript: 'C₉H₁₇ClO₇',
    structureImage: '/excel_structures/structure_cas_25655-42-9.png',
    link: '/products/browse/cyclodextrins/-cyclodextrin-epichlorohydrin-polymer',
  },
  {
    id: 'cyclosporin-a',
    badge: 'Active Standard',
    name: 'Cyclosporin A',
    chemicalName: 'Cyclosporin A',
    description: 'A cyclic nonribosomal peptide immunosuppressant standard used in therapeutic drug monitoring.',
    catNumber: 'PV-CYC-5986',
    casNumber: '59865-13-3',
    molecularWeight: '1202.61 g/mol',
    molecularFormula: 'C₆₂H₁₁₁N₁₁O₁₂',
    category: 'Cyclosporin',
    formulaSubscript: 'C₆₂H₁₁₁N₁₁O₁₂',
    structureImage: '/excel_structures/structure_cas_59865-13-3.png',
    link: '/products/browse/cyclosporin/cyclosporin-a',
  },
  {
    id: 'dantrolene-sodium-salt-hemiheptahydrate',
    badge: 'Reference Standard',
    name: 'Dantrolene Sodium Salt Hemiheptahydrate',
    chemicalName: 'Dantrolene Sodium Salt Hemiheptahydrate',
    description: 'A post-synaptic muscle relaxant reference standard for analytical assays and formulation studies.',
    catNumber: 'PV-DAN-2486',
    casNumber: '24868-20-0',
    molecularWeight: '798.57 g/mol',
    molecularFormula: 'C₂₈H₃₂N₈Na₂O₁₇',
    category: 'Dantrolene',
    formulaSubscript: 'C₂₈H₃₂N₈Na₂O₁₇',
    structureImage: '/excel_structures/structure_cas_24868-20-0.png',
    link: '/products/browse/dantrolene/dantrolene-sodium-salt-hemiheptahydrate',
  },
  {
    id: 'dihydrostreptomycin-sulfate',
    badge: 'Antibiotic Standard',
    name: 'Dihydrostreptomycin Sulfate',
    chemicalName: 'Dihydrostreptomycin Sulfate',
    description: 'An aminoglycoside antibiotic reference standard utilized in antibacterial research and purity assays.',
    catNumber: 'PV-DHS-5490',
    casNumber: '5490-27-7',
    molecularWeight: '730.71 g/mol',
    molecularFormula: 'C₂₁H₄₁N₇O₁₂ · 1.5H₂SO₄',
    category: 'Streptomycin',
    formulaSubscript: 'C₂₁H₄₁N₇O₁₂ · 1.5H₂SO₄',
    structureImage: '/excel_structures/structure_cas_5490-27-7.png',
    link: '/products/browse/streptomycin/dihydrostreptomycin-sulfate',
  },
  {
    id: 'dirithromycin',
    badge: 'Macrolide Standard',
    name: 'Dirithromycin',
    chemicalName: 'Dirithromycin',
    description: 'An advanced macrolide antibiotic derivative for antimicrobial efficacy and impurity profiling.',
    catNumber: 'PV-DIR-6201',
    casNumber: '62013-04-1',
    molecularWeight: '835.09 g/mol',
    molecularFormula: 'C₄₂H₇₈N₂O₁₄',
    category: 'Dirithromycin',
    formulaSubscript: 'C₄₂H₇₈N₂O₁₄',
    structureImage: '/excel_structures/structure_cas_62013-04-1.png',
    link: '/products/browse/dirithromycin/dirithromycin',
  },
  {
    id: 'ginsenoside-ro',
    badge: 'Phytochemical Standard',
    name: 'Ginsenoside Ro',
    chemicalName: 'Ginsenoside Ro',
    description: 'An oleanolic acid-type triterpenoid saponin reference standard for phytochemical and metabolic research.',
    catNumber: 'PV-GIN-3436',
    casNumber: '34367-04-9',
    molecularWeight: '957.12 g/mol',
    molecularFormula: 'C₄₈H₇₆O₁₉',
    category: 'Ginsenosides',
    formulaSubscript: 'C₄₈H₇₆O₁₉',
    structureImage: '/excel_structures/structure_cas_34367-04-9.png',
    link: '/products/browse/ginsenosides/ginsenoside-ro',
  },
  {
    id: 'pneumocandin-b0',
    badge: 'Antifungal Standard',
    name: 'Pneumocandin B0',
    chemicalName: 'Pneumocandin B0',
    description: 'A potent antifungal compound used in research and pharmaceutical applications.',
    catNumber: 'PV-PNE-1355',
    casNumber: '135575-42-7',
    molecularWeight: '1065.21 g/mol',
    molecularFormula: 'C₅₀H₈₀N₈O₁₇',
    category: 'Echinocandins',
    formulaSubscript: 'C₅₀H₈₀N₈O₁₇',
    structureImage: '/excel_structures/structure_cas_135575-42-7.png',
    link: '/products/browse/echinocandins/pneumocandin-b0',
  },
  {
    id: 'hederacoside-c',
    badge: 'Reference Standard',
    name: 'Hederacoside C',
    chemicalName: 'Hederacoside C',
    description: 'A bioactive triterpene saponin marker compound for natural product characterization and standardization.',
    catNumber: 'PV-HED-1421',
    casNumber: '14216-03-6',
    molecularWeight: '1221.39 g/mol',
    molecularFormula: 'C₅₉H₉₆O₂₆',
    category: 'Triterpenoid Saponins',
    formulaSubscript: 'C₅₉H₉₆O₂₆',
    structureImage: '/excel_structures/structure_cas_14216-03-6.png',
    link: '/products/browse/triterpenoid-saponins/hederacoside-c',
  },
  {
    id: 'fosaprepitant-dimeglumine',
    badge: 'Pharmaceutical Standard',
    name: 'Fosaprepitant Dimeglumine',
    chemicalName: 'Fosaprepitant Dimeglumine',
    description: 'A water-soluble neurokinin-1 receptor antagonist prodrug reference standard for oncology research.',
    catNumber: 'PV-FOS-2651',
    casNumber: '265121-04-8',
    molecularWeight: '1004.84 g/mol',
    molecularFormula: 'C₂₃H₂₂F₇N₄O₆P · 2C₇H₁₇NO₅',
    category: 'Aprepitant',
    formulaSubscript: 'C₂₃H₂₂F₇N₄O₆P · 2C₇H₁₇NO₅',
    structureImage: '/excel_structures/structure_cas_265121-04-8.png',
    link: '/products/browse/aprepitant/fosaprepitant-dimeglumine',
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
 * Chemical Card Content Surface (Exact Design matching user mockup)
 */
function ChemicalCardContent({ slide, added, onAddToCart }) {
  const [zoom, setZoom] = useState(1);

  // Reset zoom when slide changes
  useEffect(() => {
    setZoom(1);
  }, [slide.id]);

  const handleZoomIn = (e) => {
    e.stopPropagation();
    setZoom((z) => Math.min(1.6, +(z + 0.15).toFixed(2)));
  };

  const handleZoomOut = (e) => {
    e.stopPropagation();
    setZoom((z) => Math.max(0.7, +(z - 0.15).toFixed(2)));
  };

  const handleZoomReset = (e) => {
    e.stopPropagation();
    setZoom(1);
  };

  const mwValue = (slide.molecularWeight || '').replace(/\s*g\/mol/i, '').trim();

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="w-full h-full flex flex-col justify-between">
      {/* 1. Top Badges Row: Left Category Badge & Catalog Number, Right Certified Grade */}
      <div className="flex items-center justify-between gap-2 mb-2 font-sans flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#E6F7F5] text-[#007A6C] border border-[#00A389]/25 shadow-2xs tracking-wide">
            <IoCheckmarkCircle className="text-[#00897B] text-[15px]" />
            {slide.badge}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-50 border border-slate-200/90 text-slate-700 tracking-wide font-sans">
            {slide.catNumber}
          </span>
        </div>

        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-[#E8F8F5] text-[#007A6C] border border-[#B2EBE2] shadow-2xs">
          <IoCheckmarkCircle className="text-[#00897B] text-[15px]" />
          Certified Grade
        </span>
      </div>

      {/* 2. Compound Title & Subtitle with Mint Beaker Icon */}
      <div className="flex items-start gap-3.5 my-1.5 text-left font-sans">
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#E6F7F5] border border-[#C6F0E8] text-[#00897B] flex items-center justify-center flex-shrink-0 shadow-2xs mt-0.5">
          <IoFlaskOutline size={22} className="stroke-[2.2]" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight leading-tight line-clamp-1" title={slide.chemicalName || slide.name}>
            {slide.name}
          </h3>
          <p className="text-xs sm:text-[13px] text-slate-500 font-normal leading-relaxed mt-1 line-clamp-1">
            {slide.description}
          </p>
          {/* Decorative Mint Accent Line */}
          <div className="w-12 h-0.75 bg-[#00A389] rounded-full mt-2" />
        </div>
      </div>

      {/* 3. Middle Body: Spec Cards & 2D Structure Canvas */}
      <div className="flex flex-col sm:grid sm:grid-cols-12 gap-2.5 sm:gap-4 items-stretch my-1.5 sm:my-2 font-sans flex-1 min-w-0">
        {/* Spec Cards Column: On mobile, horizontal 3-column pill row; on desktop, vertical 3 spec cards */}
        <div className="order-2 sm:order-1 sm:col-span-5 flex flex-row sm:flex-col justify-between gap-1.5 sm:gap-2.5 text-left min-w-0">
          {/* CAS NO. */}
          <div className="flex-1 sm:flex-initial flex items-center gap-1.5 sm:gap-3 p-1.5 sm:p-3 rounded-xl sm:rounded-2xl bg-[#F8FCFC] border border-[#E1F3F1] hover:border-[#00A389]/40 hover:bg-[#F0FAF8] transition-colors shadow-2xs min-w-0">
            <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#E2F7F4] border border-[#C5EFE8] text-[#00897B] flex items-center justify-center shrink-0">
              <IoFlaskOutline size={15} className="sm:text-[18px] stroke-[2.2]" />
            </div>
            <div className="leading-tight min-w-0 flex-1">
              <span className="text-[9px] sm:text-[10px] font-bold tracking-wider text-slate-400 uppercase font-sans block mb-0.5">CAS NO.</span>
              <span className="text-[11px] sm:text-[15px] font-extrabold text-[#0F172A] font-sans truncate block">{slide.casNumber}</span>
            </div>
          </div>

          {/* MOLECULAR WEIGHT */}
          <div className="flex-1 sm:flex-initial flex items-center gap-1.5 sm:gap-3 p-1.5 sm:p-3 rounded-xl sm:rounded-2xl bg-[#F8FCFC] border border-[#E1F3F1] hover:border-[#00A389]/40 hover:bg-[#F0FAF8] transition-colors shadow-2xs min-w-0">
            <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#E2F7F4] border border-[#C5EFE8] text-[#00897B] flex items-center justify-center shrink-0">
              <IoGitNetworkOutline size={15} className="sm:text-[18px] stroke-[2.2]" />
            </div>
            <div className="leading-tight min-w-0 flex-1">
              <span className="text-[9px] sm:text-[10px] font-bold tracking-wider text-slate-400 uppercase font-sans block mb-0.5">Mol. Weight</span>
              <div className="text-[11px] sm:text-[15px] font-extrabold text-[#0F172A] font-sans truncate block">
                {mwValue}
                <span className="text-[9px] sm:text-xs font-medium text-slate-500 ml-0.5 sm:ml-1">g/mol</span>
              </div>
            </div>
          </div>

          {/* MOLECULAR FORMULA */}
          <div className="flex-1 sm:flex-initial flex items-center gap-1.5 sm:gap-3 p-1.5 sm:p-3 rounded-xl sm:rounded-2xl bg-[#F8FCFC] border border-[#E1F3F1] hover:border-[#00A389]/40 hover:bg-[#F0FAF8] transition-colors shadow-2xs min-w-0">
            <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#E2F7F4] border border-[#C5EFE8] text-[#00897B] flex items-center justify-center shrink-0">
              <IoCubeOutline size={15} className="sm:text-[18px] stroke-[2.2]" />
            </div>
            <div className="leading-tight min-w-0 flex-1">
              <span className="text-[9px] sm:text-[10px] font-bold tracking-wider text-slate-400 uppercase font-sans block mb-0.5">Formula</span>
              <span className="text-[11px] sm:text-[14px] font-extrabold text-[#0F172A] font-sans break-words line-clamp-1 block leading-snug">
                {slide.molecularFormula}
              </span>
            </div>
          </div>
        </div>

        {/* 2D Chemical Structure Stage with Zoom Controls */}
        <div className="order-1 sm:order-2 sm:col-span-7 relative flex flex-col rounded-2xl bg-[#FCFDFD] border border-slate-200/90 shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)] p-2.5 sm:p-3 h-[180px] sm:h-full overflow-hidden min-w-0">
          {/* Header Toolbar: Zoom Controls */}
          <div className="flex items-center justify-end mb-1 relative z-20">
            {/* Interactive Zoom Control Segment */}
            <div className="flex items-center gap-1.5 bg-white border border-slate-200/90 rounded-lg px-2 py-0.5 shadow-2xs text-xs font-semibold text-slate-600">
              <button
                type="button"
                onClick={handleZoomOut}
                disabled={zoom <= 0.7}
                className="w-5 h-5 flex items-center justify-center text-slate-500 hover:text-slate-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                title="Zoom Out"
              >
                <IoRemoveOutline size={14} />
              </button>
              <button
                type="button"
                onClick={handleZoomReset}
                className="px-1 text-[11px] font-bold text-slate-700 hover:text-[#00897B] cursor-pointer"
                title="Reset Zoom (100%)"
              >
                {Math.round(zoom * 100)}%
              </button>
              <button
                type="button"
                onClick={handleZoomIn}
                disabled={zoom >= 1.6}
                className="w-5 h-5 flex items-center justify-center text-slate-500 hover:text-slate-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                title="Zoom In"
              >
                <IoAddOutline size={14} />
              </button>
            </div>
          </div>

          {/* Structure Canvas */}
          <div className="w-full flex-1 flex items-center justify-center p-1 sm:p-2 overflow-hidden select-none min-h-[120px] sm:min-h-[170px]">
            <div
              className="w-full h-full flex items-center justify-center transition-transform duration-200 origin-center"
              style={{ transform: `scale(${zoom})` }}
            >
              {slide.structureImage ? (
                <img
                  src={slide.structureImage}
                  alt={slide.name}
                  className="w-full h-full object-contain max-h-[125px] sm:max-h-[175px] select-none pointer-events-none drop-shadow-[0_2px_8px_rgba(15,23,42,0.06)]"
                  loading="eager"
                />
              ) : (
                <SkeletalStructure2D type={slide.structureType} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Action Footer Bar */}
      <div className="pt-3 border-t border-slate-100/90 flex items-center justify-between gap-3 relative z-10 font-sans">
        <button
          type="button"
          onClick={onAddToCart}
          className={`relative overflow-hidden px-7 py-3 rounded-full font-bold text-sm shadow-md flex items-center gap-2.5 cursor-pointer transition-all active:scale-95 ${
            added
              ? 'bg-emerald-600 text-white shadow-[0_0_18px_rgba(16,185,129,0.45)]'
              : 'bg-[#005E54] hover:bg-[#004D45] text-white shadow-[0_4px_16px_rgba(0,94,84,0.3)] hover:shadow-[0_6px_22px_rgba(0,94,84,0.45)]'
          }`}
        >
          {added ? (
            <>
              <IoCheckmarkCircle size={18} />
              <span>Added to Cart!</span>
            </>
          ) : (
            <>
              <IoCartOutline size={18} />
              <span>Add to Enquiry Cart</span>
              <IoArrowForward size={16} />
            </>
          )}
        </button>

        <Link
          href={slide.link || "/products"}
          prefetch={true}
          onMouseEnter={() => prefetchProduct(slide.id)}
          className="inline-flex items-center gap-2 text-[15px] font-bold text-[#00897B] hover:text-[#005E54] px-4 py-2 rounded-full hover:bg-teal-50/60 transition-all group/link font-sans"
        >
          <span>View Details</span>
          <IoArrowForward size={16} className="transition-transform duration-200 group-hover/link:translate-x-1" />
        </Link>
      </div>
    </div>
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
      style={{ fontFamily: "'Inter', sans-serif" }}
      className="relative w-full max-w-[740px] xl:max-w-[780px] select-none mx-auto font-sans"
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
      <div className="moving-glow-card w-full h-[495px] sm:h-[490px] select-none relative shadow-[0_20px_50px_-12px_rgba(15,23,42,0.08)] overflow-hidden">
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
        className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 z-40 w-11 sm:w-12 h-11 sm:h-12 rounded-full bg-white hover:bg-slate-50 text-[#00897B] shadow-[0_4px_18px_rgba(15,23,42,0.12)] border border-slate-200/90 hover:border-[#00897B]/40 flex items-center justify-center transition-all duration-300 group active:scale-95 cursor-pointer focus:outline-none"
        aria-label="Previous Chemical Product"
        title="Previous product"
      >
        <span className="transition-transform duration-300 group-hover:-translate-x-0.5">
          <IoChevronBackOutline size={22} className="stroke-[2.5]" />
        </span>
      </button>

      <button
        type="button"
        onClick={handleNext}
        className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 z-40 w-11 sm:w-12 h-11 sm:h-12 rounded-full bg-white hover:bg-slate-50 text-[#00897B] shadow-[0_4px_18px_rgba(15,23,42,0.12)] border border-slate-200/90 hover:border-[#00897B]/40 flex items-center justify-center transition-all duration-300 group active:scale-95 cursor-pointer focus:outline-none"
        aria-label="Next Chemical Product"
        title="Next product"
      >
        <span className="transition-transform duration-300 group-hover:translate-x-0.5">
          <IoChevronForwardOutline size={22} className="stroke-[2.5]" />
        </span>
      </button>

      {/* ================================================================
          BOTTOM NAVIGATION INDICATORS (Polished Pill Dots)
          ================================================================ */}
      <div className="flex items-center justify-center gap-1.5 mt-5">
        {CHEMICAL_SLIDES.map((c, idx) => (
          <button
            key={c.id}
            type="button"
            onClick={() => handleDotClick(idx)}
            className={`h-2 transition-all duration-300 cursor-pointer rounded-full ${
              currentIdx === idx
                ? 'w-7 bg-[#00897B] shadow-[0_0_10px_rgba(0,163,137,0.5)]'
                : 'w-2 bg-slate-300 hover:bg-slate-400'
            }`}
            aria-label={`Jump to ${c.name}`}
          />
        ))}
      </div>
    </div>
  );
}


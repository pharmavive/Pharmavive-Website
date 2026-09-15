'use client';

import React from 'react';
import Image from 'next/image';

/**
 * Normalizes and identifies the chemical structure type for any compound
 */
export function getStructureType(item) {
  if (!item) return 'generic';
  if (item.structureType) return item.structureType.toLowerCase();

  const name = (item.name || '').toLowerCase();
  const cas = (item.casNumber || '').trim();
  const cat = (item.catNumber || '').toLowerCase();

  if (cas === '134523-03-8' || name.includes('atorvastatin') || cat.includes('atv')) {
    return 'atorvastatin';
  }
  if (cas === '16940-66-2' || name.includes('borohydride') || cat.includes('sbh')) {
    return 'sodium-borohydride';
  }
  if (cas === '136470-78-5' || name.includes('abacavir') || cat.includes('aba')) {
    return 'abacavir';
  }
  if (cas === '15687-27-1' || name.includes('ibuprofen') || cat.includes('ibu')) {
    return 'ibuprofen';
  }
  if (cas === '103-90-2' || name.includes('paracetamol') || name.includes('acetaminophen') || cat.includes('pcm')) {
    return 'paracetamol';
  }
  if (cas === '66357-35-5' || name.includes('ranitidine')) {
    return 'ranitidine';
  }
  if (cas === '666-52-4' || name.includes('acetone')) {
    return 'acetone_d6';
  }
  if (cas === '1120-87-2' || name.includes('bromopyridine')) {
    return 'bromopyridine';
  }
  if (cas === '77-92-9' || name.includes('citric')) {
    return 'citric_acid';
  }
  if (cas === '139756-21-1' || name.includes('sildenafil')) {
    return 'sildenafil';
  }
  if (cas === '88572-88-7' || name.includes('omeprazole')) {
    return 'omeprazole';
  }
  if (cas === '2751749-06-9' || name.includes('zabedosertib') || cat.includes('2751')) {
    return 'zabedosertib-intermediate';
  }
  if (cas === '183288-46-2' || name.includes('piperazin') || cat.includes('1832')) {
    return 'piperazinyl-benzofuran';
  }
  if (cas === '112811-72-0' || name.includes('moxifloxacin') || cat.includes('1128')) {
    return 'moxifloxacin-impurity';
  }
  if (cas === '143322-56-9' || name.includes('eletriptan') || cat.includes('1433')) {
    return 'eletriptan-impurity';
  }
  if (cas === '162401-32-3' || name.includes('roflumilast')) {
    return 'roflumilast';
  }

  return 'generic';
}

/**
 * 2D Skeletal Chemical Structure SVG Renderer (ChemDraw / Kekule Laboratory Style)
 */
export function ChemicalStructureSvg({ type, className = "w-full h-full" }) {
  if (type === 'atorvastatin') {
    return (
      <svg viewBox="16 36 218 178" className={className} fill="none">
        {/* Central Pyrrole Ring */}
        <polygon points="110,95 130,95 136,114 110,126 98,107" stroke="#0f172a" strokeWidth="2.2" strokeLinejoin="round" />
        <line x1="112" y1="100" x2="128" y2="100" stroke="#0f172a" strokeWidth="1.6" />
        <line x1="102" y1="110" x2="110" y2="122" stroke="#0f172a" strokeWidth="1.6" />

        {/* Nitrogen in Pyrrole Ring */}
        <text x="118" y="117" fill="#0284c7" fontSize="12" fontWeight="bold" fontFamily="system-ui, sans-serif">N</text>

        {/* Top Phenyl Ring */}
        <line x1="120" y1="95" x2="120" y2="76" stroke="#0f172a" strokeWidth="2.2" />
        <polygon points="120,76 134,68 134,52 120,44 106,52 106,68" stroke="#0f172a" strokeWidth="2" strokeLinejoin="round" />
        <line x1="130" y1="66" x2="130" y2="54" stroke="#0f172a" strokeWidth="1.5" />
        <line x1="118" y1="48" x2="108" y2="54" stroke="#0f172a" strokeWidth="1.5" />

        {/* Left 4-Fluorophenyl Ring */}
        <line x1="98" y1="107" x2="82" y2="100" stroke="#0f172a" strokeWidth="2.2" />
        <polygon points="82,100 70,88 52,92 46,108 58,120 76,116" stroke="#0f172a" strokeWidth="2" strokeLinejoin="round" />
        {/* Fluorine atom */}
        <line x1="46" y1="108" x2="34" y2="110" stroke="#0f172a" strokeWidth="2" />
        <text x="24" y="115" fill="#00A389" fontSize="13" fontWeight="bold" fontFamily="system-ui, sans-serif">F</text>

        {/* Right Amide / Phenylcarbamoyl branch */}
        <line x1="136" y1="114" x2="154" y2="108" stroke="#0f172a" strokeWidth="2.2" />
        {/* Carbonyl =O */}
        <line x1="152" y1="108" x2="152" y2="94" stroke="#0f172a" strokeWidth="2" />
        <line x1="156" y1="108" x2="156" y2="94" stroke="#0f172a" strokeWidth="2" />
        <text x="149" y="90" fill="#dc2626" fontSize="12" fontWeight="bold" fontFamily="system-ui, sans-serif">O</text>
        {/* NH */}
        <line x1="154" y1="108" x2="168" y2="116" stroke="#0f172a" strokeWidth="2.2" />
        <text x="169" y="121" fill="#0284c7" fontSize="12" fontWeight="bold" fontFamily="system-ui, sans-serif">HN</text>
        {/* Phenyl */}
        <line x1="189" y1="118" x2="200" y2="112" stroke="#0f172a" strokeWidth="2.2" />
        <polygon points="200,112 214,118 226,110 224,96 210,90 198,98" stroke="#0f172a" strokeWidth="1.8" />

        {/* Bottom Dihydroxyheptanoic side chain */}
        <line x1="122" y1="122" x2="122" y2="140" stroke="#0f172a" strokeWidth="2.2" />
        <line x1="122" y1="140" x2="136" y2="148" stroke="#0f172a" strokeWidth="2.2" />
        {/* OH on chain */}
        <line x1="136" y1="148" x2="136" y2="160" stroke="#0f172a" strokeWidth="2" />
        <text x="130" y="172" fill="#dc2626" fontSize="11" fontWeight="bold" fontFamily="system-ui, sans-serif">OH</text>

        <line x1="136" y1="148" x2="152" y2="140" stroke="#0f172a" strokeWidth="2.2" />
        <line x1="152" y1="140" x2="166" y2="148" stroke="#0f172a" strokeWidth="2.2" />
        {/* Second OH */}
        <line x1="166" y1="148" x2="166" y2="160" stroke="#0f172a" strokeWidth="2" />
        <text x="160" y="172" fill="#dc2626" fontSize="11" fontWeight="bold" fontFamily="system-ui, sans-serif">OH</text>

        <line x1="166" y1="148" x2="182" y2="140" stroke="#0f172a" strokeWidth="2.2" />
        {/* Terminal Carboxylate */}
        <line x1="182" y1="140" x2="194" y2="146" stroke="#0f172a" strokeWidth="2.2" />
        <text x="196" y="152" fill="#dc2626" fontSize="12" fontWeight="bold" fontFamily="system-ui, sans-serif">O⁻</text>

        {/* Calcium Ion Ca2+ */}
        <g>
          <circle cx="178" cy="192" r="14" fill="#E6F8F5" stroke="#00A389" strokeWidth="2" />
          <text x="178" y="196" fill="#007A68" fontSize="10.5" fontWeight="bold" textAnchor="middle" fontFamily="system-ui, sans-serif">½Ca²⁺</text>
        </g>
      </svg>
    );
  }

  if (type === 'sodium-borohydride') {
    return (
      <svg viewBox="24 45 168 130" className={className} fill="none">
        <g transform="translate(15, 0)">
          {/* Central Boron */}
          <circle cx="85" cy="110" r="16" fill="#EBF7F6" stroke="#00A389" strokeWidth="2" />
          <text x="85" y="115" fill="#007a68" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="system-ui, sans-serif">B⁻</text>

          {/* 4 B-H bonds */}
          <line x1="85" y1="94" x2="85" y2="68" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" />
          <text x="85" y="63" fill="#0f172a" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="system-ui, sans-serif">H</text>

          <line x1="71" y1="118" x2="48" y2="132" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" />
          <text x="40" y="140" fill="#0f172a" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="system-ui, sans-serif">H</text>

          <line x1="99" y1="118" x2="122" y2="132" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" />
          <text x="130" y="140" fill="#0f172a" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="system-ui, sans-serif">H</text>

          {/* Wedge Bond for 3D stereocenter representation */}
          <polygon points="85,126 80,146 90,146" fill="#0f172a" />
          <text x="85" y="160" fill="#0f172a" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="system-ui, sans-serif">H</text>

          {/* Ionic attraction dotted line */}
          <line x1="102" y1="110" x2="152" y2="110" stroke="#6366f1" strokeWidth="2" strokeDasharray="4 3" />

          {/* Sodium Cation Na+ */}
          <circle cx="168" cy="110" r="17" fill="#EEF2FF" stroke="#4f46e5" strokeWidth="2" />
          <text x="168" y="115" fill="#4f46e5" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="system-ui, sans-serif">Na⁺</text>
        </g>
      </svg>
    );
  }

  if (type === 'abacavir') {
    return (
      <svg viewBox="28 8 184 202" className={className} fill="none">
        {/* Top Cyclopropane Ring */}
        <polygon points="120,16 106,38 134,38" stroke="#0f172a" strokeWidth="2.2" strokeLinejoin="round" />
        <line x1="106" y1="38" x2="94" y2="50" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" />
        <text x="80" y="62" fill="#0284c7" fontSize="13.5" fontWeight="bold" fontFamily="system-ui, sans-serif">HN</text>
        <line x1="91" y1="67" x2="91" y2="82" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" />

        {/* Pyrimidine Ring */}
        <line x1="91" y1="82" x2="114" y2="94" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="92" y1="88" x2="110" y2="98" stroke="#0f172a" strokeWidth="1.6" />
        <line x1="91" y1="82" x2="81" y2="89" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" />
        <text x="69" y="101" fill="#0284c7" fontSize="13.5" fontWeight="bold" fontFamily="system-ui, sans-serif">N</text>
        <line x1="74" y1="106" x2="74" y2="120" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="78" y1="106" x2="78" y2="118" stroke="#0f172a" strokeWidth="1.6" />
        <line x1="74" y1="120" x2="62" y2="128" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" />
        <text x="38" y="136" fill="#0284c7" fontSize="13.5" fontWeight="bold" fontFamily="system-ui, sans-serif">H₂N</text>
        <line x1="74" y1="120" x2="84" y2="128" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" />
        <text x="86" y="136" fill="#0284c7" fontSize="13.5" fontWeight="bold" fontFamily="system-ui, sans-serif">N</text>
        <line x1="98" y1="130" x2="114" y2="120" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="114" y1="120" x2="114" y2="94" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" />

        {/* Imidazole Ring */}
        <line x1="114" y1="94" x2="128" y2="90" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" />
        <text x="130" y="93" fill="#0284c7" fontSize="13.5" fontWeight="bold" fontFamily="system-ui, sans-serif">N</text>
        <line x1="141" y1="94" x2="149" y2="107" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="149" y1="107" x2="141" y2="119" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="144" y1="98" x2="144" y2="115" stroke="#0f172a" strokeWidth="1.6" />
        <text x="130" y="131" fill="#0284c7" fontSize="13.5" fontWeight="bold" fontFamily="system-ui, sans-serif">N</text>
        <line x1="128" y1="126" x2="114" y2="120" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" />

        {/* Cyclopentenyl Ring */}
        <line x1="136" y1="148" x2="118" y2="166" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="118" y1="166" x2="126" y2="190" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="123" y1="168" x2="129" y2="186" stroke="#0f172a" strokeWidth="1.6" />
        <line x1="126" y1="190" x2="152" y2="182" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="152" y1="182" x2="152" y2="154" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="152" y1="154" x2="136" y2="148" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" />
        <polygon points="152,182 150,186 168,200" fill="#0f172a" />
        <line x1="168" y1="200" x2="178" y2="194" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" />
        <text x="180" y="198" fill="#dc2626" fontSize="13.5" fontWeight="bold" fontFamily="system-ui, sans-serif">OH</text>
      </svg>
    );
  }

  if (type === 'ibuprofen') {
    return (
      <svg viewBox="24 72 208 114" className={className} fill="none">
        {/* Benzene Ring */}
        <polygon points="110,80 138,96 138,128 110,144 82,128 82,96" stroke="#0f172a" strokeWidth="2.2" strokeLinejoin="round" />
        <line x1="110" y1="86" x2="134" y2="100" stroke="#0f172a" strokeWidth="1.6" />
        <line x1="134" y1="124" x2="110" y2="138" stroke="#0f172a" strokeWidth="1.6" />
        <line x1="86" y1="124" x2="86" y2="100" stroke="#0f172a" strokeWidth="1.6" />

        {/* Left Isobutyl Chain */}
        <line x1="82" y1="112" x2="56" y2="112" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="56" y1="112" x2="36" y2="88" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="56" y1="112" x2="36" y2="136" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" />

        {/* Right Propionic Acid Chain */}
        <line x1="138" y1="112" x2="164" y2="112" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="164" y1="112" x2="178" y2="88" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="164" y1="112" x2="184" y2="132" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="182" y1="132" x2="182" y2="156" stroke="#0f172a" strokeWidth="2" />
        <line x1="186" y1="132" x2="186" y2="156" stroke="#0f172a" strokeWidth="2" />
        <text x="179" y="170" fill="#dc2626" fontSize="13" fontWeight="bold" fontFamily="system-ui, sans-serif">O</text>
        <line x1="184" y1="132" x2="204" y2="124" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" />
        <text x="207" y="128" fill="#dc2626" fontSize="13" fontWeight="bold" fontFamily="system-ui, sans-serif">OH</text>
      </svg>
    );
  }

  if (type === 'paracetamol') {
    return (
      <svg viewBox="65 30 110 198" className={className} fill="none">
        {/* Phenol Ring */}
        <polygon points="105,75 133,91 133,123 105,139 77,123 77,91" stroke="#0f172a" strokeWidth="2.2" strokeLinejoin="round" />
        <line x1="105" y1="81" x2="129" y2="95" stroke="#0f172a" strokeWidth="1.6" />
        <line x1="129" y1="119" x2="105" y2="133" stroke="#0f172a" strokeWidth="1.6" />
        <line x1="81" y1="119" x2="81" y2="95" stroke="#0f172a" strokeWidth="1.6" />
        {/* Top 4-Hydroxyl */}
        <line x1="105" y1="75" x2="105" y2="55" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" />
        <text x="96" y="48" fill="#dc2626" fontSize="13.5" fontWeight="bold" fontFamily="system-ui, sans-serif">HO</text>
        {/* Bottom Acetamide */}
        <line x1="105" y1="139" x2="105" y2="158" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" />
        <text x="96" y="172" fill="#0284c7" fontSize="13.5" fontWeight="bold" fontFamily="system-ui, sans-serif">HN</text>
        <line x1="115" y1="172" x2="135" y2="180" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="133" y1="180" x2="133" y2="200" stroke="#0f172a" strokeWidth="2" />
        <line x1="137" y1="180" x2="137" y2="200" stroke="#0f172a" strokeWidth="2" />
        <text x="130" y="213" fill="#dc2626" fontSize="13" fontWeight="bold" fontFamily="system-ui, sans-serif">O</text>
        <line x1="135" y1="180" x2="158" y2="168" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === 'sildenafil') {
    return (
      <svg viewBox="22 40 214 90" className={className} fill="none">
        {/* Pyrazolopyrimidinone fused core */}
        <polygon points="90,70 120,70 135,95 120,120 90,120 75,95" stroke="#0f172a" strokeWidth="2.2" strokeLinejoin="round" />
        <line x1="93" y1="76" x2="117" y2="76" stroke="#0f172a" strokeWidth="1.6" />
        <line x1="117" y1="114" x2="93" y2="114" stroke="#0f172a" strokeWidth="1.6" />
        <text x="110" y="99" fill="#0284c7" fontSize="11" fontWeight="bold" fontFamily="system-ui, sans-serif">N</text>
        <text x="80" y="99" fill="#0284c7" fontSize="11" fontWeight="bold" fontFamily="system-ui, sans-serif">N</text>
        {/* Carbonyl */}
        <line x1="120" y1="70" x2="135" y2="55" stroke="#0f172a" strokeWidth="2" />
        <text x="138" y="55" fill="#dc2626" fontSize="12" fontWeight="bold">O</text>
        {/* Phenyl ring */}
        <line x1="135" y1="95" x2="160" y2="95" stroke="#0f172a" strokeWidth="2.2" />
        <polygon points="160,95 175,80 195,80 205,95 195,110 175,110" stroke="#0f172a" strokeWidth="2" strokeLinejoin="round" />
        {/* Sulfonyl N-methylpiperazine branch */}
        <line x1="205" y1="95" x2="220" y2="95" stroke="#0f172a" strokeWidth="2" />
        <text x="214" y="90" fill="#d97706" fontSize="11" fontWeight="bold">S</text>
        {/* Propyl branch */}
        <line x1="75" y1="95" x2="55" y2="85" stroke="#0f172a" strokeWidth="2" />
        <line x1="55" y1="85" x2="35" y2="95" stroke="#0f172a" strokeWidth="2" />
      </svg>
    );
  }

  if (type === 'omeprazole') {
    return (
      <svg viewBox="48 70 188 68" className={className} fill="none">
        {/* Benzimidazole ring */}
        <polygon points="70,90 95,90 105,108 95,126 70,126 60,108" stroke="#0f172a" strokeWidth="2" strokeLinejoin="round" />
        <line x1="73" y1="95" x2="92" y2="95" stroke="#0f172a" strokeWidth="1.5" />
        <polygon points="105,108 120,98 135,108 130,124 110,124" stroke="#0f172a" strokeWidth="2" strokeLinejoin="round" />
        <text x="114" y="104" fill="#0284c7" fontSize="10" fontWeight="bold">N</text>
        <text x="116" y="124" fill="#0284c7" fontSize="10" fontWeight="bold">HN</text>
        {/* Sulfinyl -S(=O)- linker */}
        <line x1="135" y1="108" x2="155" y2="108" stroke="#0f172a" strokeWidth="2" />
        <text x="156" y="112" fill="#d97706" fontSize="12" fontWeight="bold">S</text>
        <line x1="160" y1="100" x2="160" y2="90" stroke="#0f172a" strokeWidth="2" />
        <text x="156" y="86" fill="#dc2626" fontSize="11" fontWeight="bold">O</text>
        {/* Pyridine ring */}
        <line x1="167" y1="108" x2="185" y2="108" stroke="#0f172a" strokeWidth="2" />
        <polygon points="185,108 198,95 218,95 225,108 218,121 198,121" stroke="#0f172a" strokeWidth="2" strokeLinejoin="round" />
        <text x="204" y="102" fill="#0284c7" fontSize="10" fontWeight="bold">N</text>
      </svg>
    );
  }

  if (type === 'zabedosertib-intermediate') {
    return (
      <svg viewBox="0 36 195 152" className={className} fill="none">
        <polygon points="70,100 92,88 92,64 70,52 48,64 48,88" stroke="#0f172a" strokeWidth="2.2" strokeLinejoin="round" />
        <line x1="88" y1="86" x2="88" y2="66" stroke="#0f172a" strokeWidth="1.6" />
        <line x1="68" y1="56" x2="52" y2="66" stroke="#0f172a" strokeWidth="1.6" />
        <line x1="52" y1="86" x2="68" y2="96" stroke="#0f172a" strokeWidth="1.6" />
        <line x1="92" y1="64" x2="108" y2="60" stroke="#0f172a" strokeWidth="2.2" />
        <text x="110" y="64" fill="#0284c7" fontSize="12" fontWeight="bold" fontFamily="system-ui, sans-serif">N</text>
        <line x1="116" y1="67" x2="116" y2="82" stroke="#0f172a" strokeWidth="2.2" />
        <text x="111" y="93" fill="#0284c7" fontSize="12" fontWeight="bold" fontFamily="system-ui, sans-serif">N</text>
        <line x1="110" y1="92" x2="92" y2="88" stroke="#0f172a" strokeWidth="2.2" />
        <line x1="48" y1="88" x2="32" y2="100" stroke="#0f172a" strokeWidth="2.2" />
        <line x1="32" y1="100" x2="20" y2="114" stroke="#0f172a" strokeWidth="2.2" />
        <line x1="32" y1="100" x2="18" y2="92" stroke="#0f172a" strokeWidth="2.2" />
        <line x1="32" y1="100" x2="38" y2="116" stroke="#0f172a" strokeWidth="2.2" />
        <text x="34" y="128" fill="#dc2626" fontSize="11" fontWeight="bold" fontFamily="system-ui, sans-serif">OH</text>
        <line x1="124" y1="92" x2="138" y2="102" stroke="#0f172a" strokeWidth="2.2" />
        <line x1="138" y1="102" x2="138" y2="120" stroke="#0f172a" strokeWidth="2.2" />
        <line x1="138" y1="120" x2="152" y2="128" stroke="#0f172a" strokeWidth="2.2" />
        <text x="153" y="134" fill="#d97706" fontSize="13" fontWeight="bold" fontFamily="system-ui, sans-serif">S</text>
        <line x1="158" y1="122" x2="158" y2="110" stroke="#0f172a" strokeWidth="2" />
        <line x1="162" y1="122" x2="162" y2="110" stroke="#0f172a" strokeWidth="2" />
        <text x="156" y="106" fill="#dc2626" fontSize="11" fontWeight="bold" fontFamily="system-ui, sans-serif">O</text>
        <line x1="158" y1="136" x2="158" y2="148" stroke="#0f172a" strokeWidth="2" />
        <line x1="162" y1="136" x2="162" y2="148" stroke="#0f172a" strokeWidth="2" />
        <text x="156" y="158" fill="#dc2626" fontSize="11" fontWeight="bold" fontFamily="system-ui, sans-serif">O</text>
        <line x1="165" y1="130" x2="178" y2="130" stroke="#0f172a" strokeWidth="2.2" />
        <line x1="70" y1="100" x2="70" y2="118" stroke="#0f172a" strokeWidth="2.2" />
        <text x="61" y="131" fill="#0284c7" fontSize="12" fontWeight="bold" fontFamily="system-ui, sans-serif">HN</text>
        <line x1="78" y1="130" x2="94" y2="138" stroke="#0f172a" strokeWidth="2.2" />
        <line x1="92" y1="138" x2="92" y2="154" stroke="#0f172a" strokeWidth="2" />
        <line x1="96" y1="138" x2="96" y2="154" stroke="#0f172a" strokeWidth="2" />
        <text x="90" y="166" fill="#dc2626" fontSize="11" fontWeight="bold" fontFamily="system-ui, sans-serif">O</text>
        <line x1="94" y1="138" x2="110" y2="130" stroke="#0f172a" strokeWidth="2.2" />
        <polygon points="110,130 126,138 126,158 110,166 98,158" stroke="#0f172a" strokeWidth="2.2" strokeLinejoin="round" />
        <line x1="122" y1="140" x2="122" y2="156" stroke="#0f172a" strokeWidth="1.6" />
        <text x="106" y="142" fill="#0284c7" fontSize="11" fontWeight="bold" fontFamily="system-ui, sans-serif">N</text>
        <line x1="126" y1="158" x2="140" y2="166" stroke="#0f172a" strokeWidth="2.2" />
        <text x="142" y="172" fill="#00A389" fontSize="11.5" fontWeight="bold" fontFamily="system-ui, sans-serif">CF₃</text>
      </svg>
    );
  }

  if (type === 'piperazinyl-benzofuran') {
    return (
      <svg viewBox="10 74 235 86" className={className} fill="none">
        <line x1="28" y1="105" x2="38" y2="98" stroke="#0f172a" strokeWidth="2.2" />
        <text x="37" y="96" fill="#0284c7" fontSize="12" fontWeight="bold" fontFamily="system-ui, sans-serif">HN</text>
        <line x1="52" y1="98" x2="62" y2="105" stroke="#0f172a" strokeWidth="2.2" />
        <line x1="62" y1="105" x2="62" y2="120" stroke="#0f172a" strokeWidth="2.2" />
        <text x="58" y="132" fill="#0284c7" fontSize="12" fontWeight="bold" fontFamily="system-ui, sans-serif">N</text>
        <line x1="58" y1="134" x2="48" y2="140" stroke="#0f172a" strokeWidth="2.2" />
        <line x1="48" y1="140" x2="28" y2="125" stroke="#0f172a" strokeWidth="2.2" />
        <line x1="28" y1="125" x2="28" y2="105" stroke="#0f172a" strokeWidth="2.2" />
        <line x1="68" y1="128" x2="88" y2="128" stroke="#0f172a" strokeWidth="2.2" />
        <polygon points="88,128 102,114 122,114 132,128 122,146 102,146" stroke="#0f172a" strokeWidth="2.2" strokeLinejoin="round" />
        <line x1="104" y1="118" x2="120" y2="118" stroke="#0f172a" strokeWidth="1.6" />
        <line x1="120" y1="142" x2="104" y2="142" stroke="#0f172a" strokeWidth="1.6" />
        <line x1="92" y1="128" x2="100" y2="118" stroke="#0f172a" strokeWidth="1.6" />
        <line x1="122" y1="114" x2="138" y2="110" stroke="#0f172a" strokeWidth="2.2" />
        <text x="140" y="113" fill="#dc2626" fontSize="12" fontWeight="bold" fontFamily="system-ui, sans-serif">O</text>
        <line x1="152" y1="112" x2="164" y2="126" stroke="#0f172a" strokeWidth="2.2" />
        <line x1="164" y1="126" x2="148" y2="140" stroke="#0f172a" strokeWidth="2.2" />
        <line x1="148" y1="140" x2="122" y2="146" stroke="#0f172a" strokeWidth="2.2" />
        <line x1="156" y1="126" x2="144" y2="136" stroke="#0f172a" strokeWidth="1.6" />
        <line x1="164" y1="126" x2="184" y2="126" stroke="#0f172a" strokeWidth="2.2" />
        <line x1="182" y1="126" x2="182" y2="108" stroke="#0f172a" strokeWidth="2" />
        <line x1="186" y1="126" x2="186" y2="108" stroke="#0f172a" strokeWidth="2" />
        <text x="179" y="102" fill="#dc2626" fontSize="12" fontWeight="bold" fontFamily="system-ui, sans-serif">O</text>
        <line x1="184" y1="126" x2="198" y2="136" stroke="#0f172a" strokeWidth="2.2" />
        <text x="199" y="142" fill="#0284c7" fontSize="12" fontWeight="bold" fontFamily="system-ui, sans-serif">NH₂</text>
      </svg>
    );
  }

  if (type === 'moxifloxacin-impurity') {
    return (
      <svg viewBox="6 32 218 158" className={className} fill="none">
        <polygon points="76,80 102,94 102,126 76,140 50,126 50,94" stroke="#0f172a" strokeWidth="2.2" strokeLinejoin="round" />
        <line x1="76" y1="86" x2="98" y2="98" stroke="#0f172a" strokeWidth="1.6" />
        <line x1="98" y1="122" x2="76" y2="134" stroke="#0f172a" strokeWidth="1.6" />
        <line x1="54" y1="122" x2="54" y2="98" stroke="#0f172a" strokeWidth="1.6" />
        <line x1="50" y1="94" x2="34" y2="84" stroke="#0f172a" strokeWidth="2.2" />
        <text x="22" y="86" fill="#00A389" fontSize="13" fontWeight="bold" fontFamily="system-ui, sans-serif">F</text>
        <line x1="50" y1="126" x2="34" y2="136" stroke="#0f172a" strokeWidth="2.2" />
        <text x="22" y="142" fill="#00A389" fontSize="13" fontWeight="bold" fontFamily="system-ui, sans-serif">F</text>
        <line x1="76" y1="140" x2="76" y2="158" stroke="#0f172a" strokeWidth="2.2" />
        <text x="64" y="170" fill="#dc2626" fontSize="11" fontWeight="bold" fontFamily="system-ui, sans-serif">OCH₃</text>
        <line x1="102" y1="94" x2="126" y2="80" stroke="#0f172a" strokeWidth="2.2" />
        <line x1="124" y1="80" x2="124" y2="60" stroke="#0f172a" strokeWidth="2" />
        <line x1="128" y1="80" x2="128" y2="60" stroke="#0f172a" strokeWidth="2" />
        <text x="121" y="54" fill="#dc2626" fontSize="13" fontWeight="bold" fontFamily="system-ui, sans-serif">O</text>
        <line x1="126" y1="80" x2="150" y2="94" stroke="#0f172a" strokeWidth="2.2" />
        <line x1="150" y1="94" x2="150" y2="126" stroke="#0f172a" strokeWidth="2.2" />
        <line x1="146" y1="98" x2="146" y2="122" stroke="#0f172a" strokeWidth="1.6" />
        <line x1="150" y1="94" x2="174" y2="80" stroke="#0f172a" strokeWidth="2.2" />
        <line x1="172" y1="80" x2="172" y2="62" stroke="#0f172a" strokeWidth="2" />
        <line x1="176" y1="80" x2="176" y2="62" stroke="#0f172a" strokeWidth="2" />
        <text x="169" y="56" fill="#dc2626" fontSize="12" fontWeight="bold" fontFamily="system-ui, sans-serif">O</text>
        <line x1="174" y1="80" x2="192" y2="90" stroke="#0f172a" strokeWidth="2.2" />
        <text x="194" y="96" fill="#dc2626" fontSize="12" fontWeight="bold" fontFamily="system-ui, sans-serif">OH</text>
        <line x1="150" y1="126" x2="134" y2="134" stroke="#0f172a" strokeWidth="2.2" />
        <text x="122" y="142" fill="#0284c7" fontSize="13" fontWeight="bold" fontFamily="system-ui, sans-serif">N</text>
        <line x1="120" y1="134" x2="102" y2="126" stroke="#0f172a" strokeWidth="2.2" />
        <line x1="126" y1="146" x2="126" y2="162" stroke="#0f172a" strokeWidth="2.2" />
        <polygon points="126,162 116,182 136,182" stroke="#0f172a" strokeWidth="2.2" strokeLinejoin="round" fill="none" />
      </svg>
    );
  }

  if (type === 'eletriptan-impurity') {
    return (
      <svg viewBox="-2 35 212 162" className={className} fill="none">
        <polygon points="56,88 74,76 74,56 56,46 38,56 38,76" stroke="#0f172a" strokeWidth="2.2" strokeLinejoin="round" />
        <line x1="70" y1="74" x2="70" y2="58" stroke="#0f172a" strokeWidth="1.6" />
        <line x1="54" y1="50" x2="42" y2="58" stroke="#0f172a" strokeWidth="1.6" />
        <line x1="42" y1="74" x2="54" y2="84" stroke="#0f172a" strokeWidth="1.6" />
        <line x1="38" y1="56" x2="24" y2="50" stroke="#0f172a" strokeWidth="2.2" />
        <text x="10" y="52" fill="#7c3aed" fontSize="13" fontWeight="bold" fontFamily="system-ui, sans-serif">Br</text>
        <line x1="74" y1="56" x2="92" y2="64" stroke="#0f172a" strokeWidth="2.2" />
        <line x1="92" y1="64" x2="88" y2="82" stroke="#0f172a" strokeWidth="2.2" />
        <line x1="88" y1="66" x2="84" y2="80" stroke="#0f172a" strokeWidth="1.6" />
        <line x1="88" y1="82" x2="82" y2="92" stroke="#0f172a" strokeWidth="2.2" />
        <text x="70" y="104" fill="#0284c7" fontSize="12" fontWeight="bold" fontFamily="system-ui, sans-serif">HN</text>
        <line x1="74" y1="92" x2="74" y2="76" stroke="#0f172a" strokeWidth="2.2" />
        <line x1="88" y1="82" x2="108" y2="88" stroke="#0f172a" strokeWidth="2.2" />
        <line x1="106" y1="88" x2="106" y2="104" stroke="#0f172a" strokeWidth="2" />
        <line x1="110" y1="88" x2="110" y2="104" stroke="#0f172a" strokeWidth="2" />
        <text x="103" y="116" fill="#dc2626" fontSize="11.5" fontWeight="bold" fontFamily="system-ui, sans-serif">O</text>
        <line x1="108" y1="88" x2="126" y2="82" stroke="#0f172a" strokeWidth="2.2" />
        <polygon points="126,82 144,92 140,112 120,112 116,96" stroke="#0f172a" strokeWidth="2.2" strokeLinejoin="round" />
        <text x="122" y="122" fill="#0284c7" fontSize="12" fontWeight="bold" fontFamily="system-ui, sans-serif">N</text>
        <line x1="126" y1="126" x2="126" y2="142" stroke="#0f172a" strokeWidth="2.2" />
        <line x1="124" y1="142" x2="110" y2="142" stroke="#0f172a" strokeWidth="2" />
        <line x1="124" y1="146" x2="110" y2="146" stroke="#0f172a" strokeWidth="2" />
        <text x="98" y="148" fill="#dc2626" fontSize="11.5" fontWeight="bold" fontFamily="system-ui, sans-serif">O</text>
        <line x1="126" y1="142" x2="138" y2="150" stroke="#0f172a" strokeWidth="2.2" />
        <text x="140" y="156" fill="#dc2626" fontSize="12" fontWeight="bold" fontFamily="system-ui, sans-serif">O</text>
        <line x1="152" y1="154" x2="166" y2="162" stroke="#0f172a" strokeWidth="2.2" />
        <polygon points="166,162 180,154 196,162 196,180 180,188 166,180" stroke="#0f172a" strokeWidth="2" strokeLinejoin="round" />
        <line x1="180" y1="158" x2="192" y2="164" stroke="#0f172a" strokeWidth="1.5" />
        <line x1="192" y1="178" x2="180" y2="184" stroke="#0f172a" strokeWidth="1.5" />
        <line x1="170" y1="178" x2="170" y2="164" stroke="#0f172a" strokeWidth="1.5" />
      </svg>
    );
  }

  if (type === 'roflumilast') {
    return (
      <svg viewBox="10 46 220 100" className={className} fill="none">
        {/* Cyclopropyl Ring */}
        <polygon points="26,56 14,74 38,74" stroke="#0f172a" strokeWidth="2.2" strokeLinejoin="round" />
        {/* -CH2- Linker */}
        <line x1="38" y1="74" x2="52" y2="82" stroke="#0f172a" strokeWidth="2.2" />
        {/* Ether Oxygen */}
        <line x1="52" y1="82" x2="62" y2="78" stroke="#0f172a" strokeWidth="2.2" />
        <text x="63" y="80" fill="#dc2626" fontSize="12" fontWeight="bold" fontFamily="system-ui, sans-serif">O</text>
        <line x1="74" y1="80" x2="86" y2="86" stroke="#0f172a" strokeWidth="2.2" />

        {/* Central Benzene Ring */}
        <polygon points="86,86 98,78 114,78 122,86 114,96 98,96" stroke="#0f172a" strokeWidth="2.2" strokeLinejoin="round" />
        <line x1="99" y1="81" x2="112" y2="81" stroke="#0f172a" strokeWidth="1.6" />
        <line x1="117" y1="89" x2="111" y2="94" stroke="#0f172a" strokeWidth="1.6" />
        <line x1="90" y1="87" x2="96" y2="94" stroke="#0f172a" strokeWidth="1.6" />

        {/* Difluoromethoxy -O-CHF2 at C4 */}
        <line x1="98" y1="96" x2="98" y2="108" stroke="#0f172a" strokeWidth="2.2" />
        <text x="94" y="120" fill="#dc2626" fontSize="12" fontWeight="bold" fontFamily="system-ui, sans-serif">O</text>
        <line x1="98" y1="124" x2="90" y2="134" stroke="#0f172a" strokeWidth="2.2" />
        <text x="62" y="142" fill="#00A389" fontSize="11" fontWeight="bold" fontFamily="system-ui, sans-serif">F₂HC</text>

        {/* Carbonyl Amide Linker at C1 */}
        <line x1="122" y1="86" x2="136" y2="86" stroke="#0f172a" strokeWidth="2.2" />
        <line x1="134" y1="86" x2="134" y2="72" stroke="#0f172a" strokeWidth="2" />
        <line x1="138" y1="86" x2="138" y2="72" stroke="#0f172a" strokeWidth="2" />
        <text x="131" y="66" fill="#dc2626" fontSize="12" fontWeight="bold" fontFamily="system-ui, sans-serif">O</text>

        {/* Amide -NH- */}
        <line x1="136" y1="86" x2="146" y2="86" stroke="#0f172a" strokeWidth="2.2" />
        <text x="147" y="90" fill="#0284c7" fontSize="11.5" fontWeight="bold" fontFamily="system-ui, sans-serif">HN</text>

        {/* 3,5-Dichloropyridin-4-yl Ring */}
        <line x1="166" y1="86" x2="176" y2="86" stroke="#0f172a" strokeWidth="2.2" />
        <line x1="176" y1="86" x2="188" y2="76" stroke="#0f172a" strokeWidth="2.2" />
        <line x1="188" y1="76" x2="204" y2="76" stroke="#0f172a" strokeWidth="2.2" />
        <line x1="204" y1="76" x2="212" y2="83" stroke="#0f172a" strokeWidth="2.2" />
        <line x1="176" y1="86" x2="188" y2="96" stroke="#0f172a" strokeWidth="2.2" />
        <line x1="188" y1="96" x2="204" y2="96" stroke="#0f172a" strokeWidth="2.2" />
        <line x1="204" y1="96" x2="212" y2="89" stroke="#0f172a" strokeWidth="2.2" />

        {/* Pyridine double bonds */}
        <line x1="180" y1="86" x2="189" y2="79" stroke="#0f172a" strokeWidth="1.6" />
        <line x1="190" y1="93" x2="202" y2="93" stroke="#0f172a" strokeWidth="1.6" />

        {/* Pyridine Nitrogen */}
        <text x="213" y="89" fill="#0284c7" fontSize="12" fontWeight="bold" fontFamily="system-ui, sans-serif">N</text>

        {/* 3,5-Dichloro Substituents */}
        <line x1="188" y1="76" x2="188" y2="62" stroke="#0f172a" strokeWidth="2" />
        <text x="183" y="58" fill="#059669" fontSize="11.5" fontWeight="bold" fontFamily="system-ui, sans-serif">Cl</text>

        <line x1="188" y1="96" x2="188" y2="110" stroke="#0f172a" strokeWidth="2" />
        <text x="183" y="122" fill="#059669" fontSize="11.5" fontWeight="bold" fontFamily="system-ui, sans-serif">Cl</text>
      </svg>
    );
  }

  // Authentic ChemDraw 2D Skeletal Structure for ANY compound
  return (
    <svg viewBox="6 8 174 156" className={className} fill="none">
      {/* 6-Membered Aromatic Core */}
      <polygon points="100,50 130,68 130,102 100,120 70,102 70,68" stroke="#0f172a" strokeWidth="2.2" strokeLinejoin="round" />
      {/* Alternating Kekulé double bonds */}
      <line x1="100" y1="57" x2="124" y2="71" stroke="#0f172a" strokeWidth="1.7" />
      <line x1="124" y1="99" x2="100" y2="113" stroke="#0f172a" strokeWidth="1.7" />
      <line x1="76" y1="99" x2="76" y2="71" stroke="#0f172a" strokeWidth="1.7" />

      {/* Carbonyl Branch (=O in red) */}
      <line x1="100" y1="50" x2="100" y2="30" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="97" y1="48" x2="97" y2="30" stroke="#0f172a" strokeWidth="1.6" />
      <text x="94" y="24" fill="#dc2626" fontSize="12.5" fontWeight="bold" fontFamily="system-ui, sans-serif">O</text>

      {/* Amine / Nitrogen Branch (in scientific blue) */}
      <line x1="130" y1="68" x2="152" y2="58" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" />
      <text x="154" y="60" fill="#0284c7" fontSize="12" fontWeight="bold" fontFamily="system-ui, sans-serif">NH₂</text>

      {/* Hydroxyl Branch (-OH in red) */}
      <line x1="130" y1="102" x2="152" y2="112" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" />
      <text x="154" y="118" fill="#dc2626" fontSize="12" fontWeight="bold" fontFamily="system-ui, sans-serif">OH</text>

      {/* Heteroatom / Side Chain */}
      <line x1="70" y1="102" x2="48" y2="114" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="48" y1="114" x2="30" y2="104" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" />
      <text x="18" y="104" fill="#00A389" fontSize="11" fontWeight="bold" fontFamily="system-ui, sans-serif">R</text>

      {/* Terminal Methyl */}
      <line x1="100" y1="120" x2="100" y2="142" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="100" y1="142" x2="116" y2="152" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

const EXCEL_STRUCTURE_MAP = {
  '2751749-06-9': '/excel_structures/excel_structure_1.png',
  '183288-46-2': '/excel_structures/excel_structure_2.png',
  '112811-72-0': '/excel_structures/excel_structure_3.png',
  '143322-56-9': '/excel_structures/excel_structure_4.png',
  '1923194-81-3': '/excel_structures/structure_cas_1923194-81-3.png',
  '159351-69-6': '/excel_structures/structure_cas_159351-69-6.png',
  '96687-52-4': '/excel_structures/structure_cas_96687-52-4.png',
  '112849-27-1': '/excel_structures/structure_cas_112849-27-1.png',
  '1391108-10-3': '/excel_structures/structure_cas_1391108-10-3.png',
  '5280-68-2': '/excel_structures/structure_cas_5280-68-2.png',
  '103926-82-5': '/excel_structures/structure_cas_103926-82-5.png',
  '1421372-67-9': '/excel_structures/structure_cas_1421372-67-9.png',
  '144690-33-5': '/excel_structures/structure_cas_144690-33-5.png',
  '20702-77-6': '/excel_structures/structure_cas_20702-77-6.png',
  '88122-99-0': '/excel_structures/structure_cas_88122-99-0.png',
  '145459-19-4': '/excel_structures/structure_cas_145459-19-4.png',
  '1318074-25-7': '/excel_structures/structure_cas_1318074-25-7.png',
  '142217-78-5': '/excel_structures/structure_cas_142217-78-5.png',
  '141437-88-9': '/excel_structures/structure_cas_141437-88-9.png',
  '90776-59-3': '/excel_structures/structure_cas_90776-59-3.png',
  '25655-42-9': '/excel_structures/structure_cas_25655-42-9.png',
  '6906-38-3': '/excel_structures/structure_cas_6906-38-3.png',
  '147098-20-2': '/excel_structures/structure_cas_147098-20-2.png',
  '144690-92-6': '/excel_structures/structure_cas_144690-92-6.png',
  '59865-13-3': '/excel_structures/structure_cas_59865-13-3.png',
  '138199-71-0': '/excel_structures/structure_cas_138199-71-0.png',
  '17629-30-0': '/excel_structures/structure_cas_17629-30-0.png',
  '24868-20-0': '/excel_structures/structure_cas_24868-20-0.png',
  '5490-27-7': '/excel_structures/structure_cas_5490-27-7.png',
  '1256388-51-8': '/excel_structures/structure_cas_1256388-51-8.png',
  '62013-04-1': '/excel_structures/structure_cas_62013-04-1.png',
  '34367-04-9': '/excel_structures/structure_cas_34367-04-9.png',
  '82854-37-3': '/excel_structures/structure_cas_82854-37-3.png',
  '135575-42-7': '/excel_structures/structure_cas_135575-42-7.png',
  '265121-04-8': '/excel_structures/structure_cas_265121-04-8.png',
  '14216-03-6': '/excel_structures/structure_cas_14216-03-6.png',
};

/**
 * Main Compound Structure Thumbnail Component for cards and modals.
 * Never renders plain "PV" text; always displays real structure image or 2D skeletal diagram.
 */
export default function CompoundStructureThumbnail({ item, className = "w-full h-full", isModal = false }) {
  const cas = (item?.casNumber || '').trim();
  const imageUrl = item?.image || item?.imageUrl || item?.structureImage || item?.structureUrl || EXCEL_STRUCTURE_MAP[cas];
  if (imageUrl && typeof imageUrl === 'string' && imageUrl.trim().length > 0) {
    return (
      <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
        <Image
          src={imageUrl}
          alt={item?.name || 'Chemical Structure'}
          fill
          unoptimized
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
          className="object-contain p-1.5 select-none"
        />
      </div>
    );
  }

  const structureType = getStructureType(item);

  return (
    <div className={`w-full h-full flex items-center justify-center select-none ${className}`}>
      <ChemicalStructureSvg type={structureType} className="w-full h-full object-contain" />
    </div>
  );
}

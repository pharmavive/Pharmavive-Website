'use client';

import React from 'react';
import Link from 'next/link';
import CompoundStructureThumbnail from '@/Components/EnquiryCart/CompoundStructureThumbnail';

const TICKER_COMPOUNDS = [
  {
    _id: 'ticker-1',
    name: 'Cyclosporin A',
    casNumber: '59865-13-3',
    molecularFormula: 'C62H111N11O12',
    molecularWeight: '1202.61',
    image: '/excel_structures/structure_cas_59865-13-3.png',
    link: '/products/browse/cyclosporin/cyclosporin-a',
  },
  {
    _id: 'ticker-2',
    name: 'Hederacoside C',
    casNumber: '14216-03-6',
    molecularFormula: 'C59H96O26',
    molecularWeight: '1221.39',
    image: '/excel_structures/structure_cas_14216-03-6.png',
    link: '/products/browse/triterpenoid-saponins/hederacoside-c',
  },
  {
    _id: 'ticker-3',
    name: 'Cisatracurium Besilate EP Impurity R Dioxalate',
    casNumber: '96687-52-4',
    molecularFormula: 'C51H66N2O12 · 2C2H2O4',
    molecularWeight: '1079.10',
    image: '/excel_structures/structure_cas_96687-52-4.png',
    link: '/products/browse/cisatracurium/cisatracurium-besilate-ep-impurity-r-dioxalate',
  },
  {
    _id: 'ticker-4',
    name: 'Pneumocandin B0',
    casNumber: '135575-42-7',
    molecularFormula: 'C50H80N8O17',
    molecularWeight: '1065.21',
    image: '/excel_structures/structure_cas_135575-42-7.png',
    link: '/products/browse/echinocandins/pneumocandin-b0',
  },
  {
    _id: 'ticker-5',
    name: 'BM-1074 Bcl-2 Inhibitor',
    casNumber: '1391108-10-3',
    molecularFormula: 'C50H57ClN8O7S3',
    molecularWeight: '1013.69',
    image: '/excel_structures/structure_cas_1391108-10-3.png',
    link: '/products/browse/bcl-2-inhibitors/bm-1074-bcl-2-inhibitor',
  },
  {
    _id: 'ticker-6',
    name: 'Rosuvastatin Calcium',
    casNumber: '147098-20-2',
    molecularFormula: 'C44H54CaF2N6O12S2',
    molecularWeight: '1001.14',
    image: '/excel_structures/structure_cas_147098-20-2.png',
    link: '/products/browse/rosuvastatin/rosuvastatin-calcium',
  },
  {
    _id: 'ticker-7',
    name: 'Fosaprepitant Dimeglumine',
    casNumber: '265121-04-8',
    molecularFormula: 'C23H22F7N4O6P · 2C7H17NO5',
    molecularWeight: '1004.84',
    image: '/excel_structures/structure_cas_265121-04-8.png',
    link: '/products/browse/aprepitant/fosaprepitant-dimeglumine',
  },
  {
    _id: 'ticker-8',
    name: 'Everolimus Reference Standard',
    casNumber: '159351-69-6',
    molecularFormula: 'C53H83NO14',
    molecularWeight: '958.22',
    image: '/excel_structures/structure_cas_159351-69-6.png',
    link: '/products/browse/everolimus/everolimus-reference-standard',
  },
  {
    _id: 'ticker-9',
    name: 'Ginsenoside Ro',
    casNumber: '34367-04-9',
    molecularFormula: 'C48H76O19',
    molecularWeight: '957.12',
    image: '/excel_structures/structure_cas_34367-04-9.png',
    link: '/products/browse/ginsenosides/ginsenoside-ro',
  },
  {
    _id: 'ticker-10',
    name: 'Ledipasvir',
    casNumber: '1256388-51-8',
    molecularFormula: 'C49H54F2N8O6',
    molecularWeight: '889.00',
    image: '/excel_structures/structure_cas_1256388-51-8.png',
    link: '/products/browse/ledipasvir/ledipasvir',
  },
  {
    _id: 'ticker-11',
    name: 'Quetiapine Fumarate Impurity E',
    casNumber: '1923194-81-3',
    molecularFormula: 'C42H52Cl4N6O2S2',
    molecularWeight: '878.84',
    image: '/excel_structures/structure_cas_1923194-81-3.png',
    link: '/products/browse/quetiapine/quetiapine-fumarate-impurity-e-tetrahydrochloride',
  },
  {
    _id: 'ticker-12',
    name: 'Dirithromycin',
    casNumber: '62013-04-1',
    molecularFormula: 'C42H78N2O14',
    molecularWeight: '835.09',
    image: '/excel_structures/structure_cas_62013-04-1.png',
    link: '/products/browse/dirithromycin/dirithromycin',
  },
  {
    _id: 'ticker-13',
    name: 'Ethylhexyl Triazone Reference Standard',
    casNumber: '88122-99-0',
    molecularFormula: 'C48H66N6O6',
    molecularWeight: '823.07',
    image: '/excel_structures/structure_cas_88122-99-0.png',
    link: '/products/browse/triazines/ethylhexyl-triazone-reference-standard',
  },
  {
    _id: 'ticker-14',
    name: 'Entecavir Trityl Benzyl Intermediate',
    casNumber: '142217-78-5',
    molecularFormula: 'C53H49N5O4',
    molecularWeight: '820.00',
    image: '/excel_structures/structure_cas_142217-78-5.png',
    link: '/products/browse/entecavir/entecavir-trityl-benzyl-intermediate',
  },
  {
    _id: 'ticker-15',
    name: 'Cyclic Octapeptide Research Compound',
    casNumber: '145459-19-4',
    molecularFormula: 'C43H62N8O8',
    molecularWeight: '819.00',
    image: '/excel_structures/structure_cas_145459-19-4.png',
    link: '/products/browse/peptide-standards/cyclic-octapeptide-research-compound',
  },
  {
    _id: 'ticker-16',
    name: 'Trityl Olmesartan Medoxomil',
    casNumber: '144690-92-6',
    molecularFormula: 'C48H44N6O6',
    molecularWeight: '800.90',
    image: '/excel_structures/structure_cas_144690-92-6.png',
    link: '/products/browse/olmesartan/trityl-olmesartan-medoxomil',
  },
  {
    _id: 'ticker-17',
    name: 'Dantrolene Sodium Salt Hemiheptahydrate',
    casNumber: '24868-20-0',
    molecularFormula: 'C28H32N8Na2O17',
    molecularWeight: '798.57',
    image: '/excel_structures/structure_cas_24868-20-0.png',
    link: '/products/browse/dantrolene/dantrolene-sodium-salt-hemiheptahydrate',
  },
  {
    _id: 'ticker-18',
    name: 'Echinacoside',
    casNumber: '82854-37-3',
    molecularFormula: 'C35H46O20',
    molecularWeight: '786.73',
    image: '/excel_structures/structure_cas_82854-37-3.png',
    link: '/products/browse/phenylethanoid-glycosides/echinacoside',
  },
];

export default function ChemicalTickerStrip() {
  // Seamless infinite horizontal looping
  const marqueeItems = [...TICKER_COMPOUNDS, ...TICKER_COMPOUNDS];

  return (
    <section className="relative w-full bg-slate-50/80 border-y border-slate-200/90 pt-8 sm:pt-10 pb-10 sm:pb-12 select-none">
      {/* Section Header / Title */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6F7F5] border border-[#B3E7E2]/70 mb-2.5">
              <span className="w-2 h-2 rounded-full bg-[#00A389] animate-pulse" />
              <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-[#00A389]">
                Research Catalog Highlights
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Featured <span className="text-[#00A389]">Products</span>
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-xl">
              High-purity reference standards, complex APIs, and advanced research intermediates with certified 2D chemical structures.
            </p>
          </div>

          <Link
            href="/products/all"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#00A389] hover:text-[#008f78] transition-colors shrink-0 group/link"
          >
            Explore All Compounds
            <span className="inline-block transition-transform group-hover/link:translate-x-1">→</span>
          </Link>
        </div>
      </div>

      {/* Marquee Track Wrapper with Ambient Gradient Fade Masks */}
      <div className="relative w-full overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 sm:w-44 bg-gradient-to-r from-slate-50 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 sm:w-44 bg-gradient-to-l from-slate-50 to-transparent z-10" />

        {/* Infinite Horizontal Marquee Track */}
        <div className="chemical-ticker-track flex items-center py-2">
        {marqueeItems.map((item, idx) => (
          <Link
            key={`${item._id}-${idx}`}
            href={item.link || `/search?q=${item.casNumber}`}
            className="flex items-center gap-5 sm:gap-6 p-4 sm:p-5 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#00A389]/60 hover:bg-[#FAFDFD] transition-all duration-300 group shrink-0 w-[500px] sm:w-[560px] md:w-[600px] lg:w-[640px] cursor-pointer"
            title={`${item.name} (CAS: ${item.casNumber} | MW: ${item.molecularWeight} | MF: ${item.molecularFormula})`}
          >
            {/* 1. Large Chemical 2D Skeletal Structure Box */}
            <div className="w-48 sm:w-56 md:w-60 h-44 sm:h-48 md:h-52 rounded-2xl bg-white border border-slate-200/80 p-3 flex items-center justify-center shrink-0 group-hover:scale-[1.02] group-hover:border-[#00A389]/40 group-hover:shadow-md transition-all duration-300 relative overflow-hidden">
              <CompoundStructureThumbnail item={item} />
            </div>

            {/* 2. Compound Details: Name, CAS No., Molecular Formula & Molecular Weight */}
            <div className="min-w-0 flex-1 flex flex-col justify-between h-44 sm:h-48 md:h-52 py-0.5">
              {/* Top: Category Tag & Name */}
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#E6F7F5] text-[#008f78] border border-[#B3E7E2]/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00A389]" />
                    Certified Standard
                  </span>
                </div>

                {/* Title with exact fixed height so all cards align identically */}
                <div className="h-[2.85rem] sm:h-[3.1rem] flex items-center">
                  <h4
                    className="font-bold text-slate-900 text-sm sm:text-[15px] md:text-base leading-snug line-clamp-2 group-hover:text-[#00A389] transition-colors"
                    title={item.name}
                  >
                    {item.name}
                  </h4>
                </div>
              </div>

              {/* Bottom: Structured Specifications & Action (Uniform across 100% of cards) */}
              <div className="flex flex-col gap-2">
                <div className="pt-2 border-t border-slate-100 flex flex-col gap-1.5">
                  {/* Row 1: CAS on Left, MW on Right */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 min-w-0">
                      <span className="text-[10px] uppercase font-bold text-[#00A389] tracking-wider shrink-0">CAS</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300 shrink-0" />
                      <span className="font-mono font-semibold text-slate-800 text-[11px] sm:text-xs truncate">{item.casNumber}</span>
                    </div>

                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 min-w-0">
                      <span className="text-[10px] uppercase font-bold text-[#00A389] tracking-wider shrink-0">MW</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300 shrink-0" />
                      <span className="font-mono font-semibold text-slate-800 text-[11px] sm:text-xs truncate">{item.molecularWeight}</span>
                    </div>
                  </div>

                  {/* Row 2: Molecular Formula (Full width bar so long formulas never break) */}
                  <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs min-w-0">
                    <span className="text-[10px] uppercase font-bold text-[#00A389] tracking-wider shrink-0">MF</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300 shrink-0" />
                    <span className="font-mono font-semibold text-slate-800 text-[11px] sm:text-xs truncate" title={item.molecularFormula}>
                      {item.molecularFormula}
                    </span>
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="flex items-center justify-between text-[11px] font-medium text-slate-400 pt-0.5">
                  <span className="text-[11px] text-slate-400">High Purity Grade</span>
                  <span className="text-[#00A389] font-semibold inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform shrink-0">
                    View Details <span className="text-xs">&rarr;</span>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
        </div>
      </div>
    </section>
  );
}

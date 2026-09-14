'use client';

import React from 'react';
import Link from 'next/link';
import CompoundStructureThumbnail from '@/Components/EnquiryCart/CompoundStructureThumbnail';

const TICKER_COMPOUNDS = [
  {
    _id: 'ticker-1',
    name: 'Zabedosertib Reagent Intermediate',
    casNumber: '2751749-06-9',
    structureType: 'zabedosertib-intermediate',
    link: '/products/browse/zabedosertib/zabedosertib-reagent-intermediate',
  },
  {
    _id: 'ticker-2',
    name: 'Atorvastatin Calcium',
    casNumber: '134523-03-8',
    structureType: 'atorvastatin',
    link: '/products/all',
  },
  {
    _id: 'ticker-3',
    name: 'Moxifloxacin Difluoro Methoxy Impurity',
    casNumber: '112811-72-0',
    structureType: 'moxifloxacin-impurity',
    link: '/products/browse/moxifloxacin/moxifloxacin-difluoro-methoxy-impurity',
  },
  {
    _id: 'ticker-4',
    name: '5-(Piperazin-1-yl)benzofuran-2-carboxamide',
    casNumber: '183288-46-2',
    structureType: 'piperazinyl-benzofuran',
    link: '/products/browse/vilazodone/5-piperazin-1-yl-benzofuran-2-carboxamide',
  },
  {
    _id: 'ticker-5',
    name: '(R)-Benzyl 2-(5-Bromo-1H-Indole-3-Carbonyl)Pyrrolidine-1-Carboxylate',
    casNumber: '143322-56-9',
    structureType: 'eletriptan-impurity',
    link: '/products/browse/eletriptan/eletriptan-bromo-indole-impurity',
  },
  {
    _id: 'ticker-6',
    name: 'Roflumilast',
    casNumber: '162401-32-3',
    structureType: 'roflumilast',
    link: '/products/all',
  },
  {
    _id: 'ticker-7',
    name: 'Sildenafil Citrate Related Substance',
    casNumber: '139756-21-1',
    structureType: 'sildenafil',
    link: '/products/all',
  },
  {
    _id: 'ticker-8',
    name: 'Omeprazole Sulfone',
    casNumber: '88572-88-7',
    structureType: 'omeprazole',
    link: '/products/all',
  },
  {
    _id: 'ticker-9',
    name: '13-Cis-Acitretin',
    casNumber: '54247-25-5',
    image: '/ProductImages/13-Cis-Acitretin.png',
    link: '/products/all',
  },
  {
    _id: 'ticker-10',
    name: '13-Cis-Acitretin-D3',
    casNumber: '1185242-60-7',
    image: '/ProductImages/13-Cis-Acitretin-D3.png',
    link: '/products/all',
  },
  {
    _id: 'ticker-11',
    name: 'Abacavir Related Substance',
    casNumber: '136470-78-5',
    structureType: 'abacavir',
    link: '/products/all',
  },
];

export default function ChemicalTickerStrip() {
  // Seamless infinite horizontal looping
  const marqueeItems = [...TICKER_COMPOUNDS, ...TICKER_COMPOUNDS];

  return (
    <section className="relative w-full bg-slate-50/80 border-y border-slate-200/90 py-5 sm:py-6 overflow-hidden select-none">
      {/* Ambient Gradient Fade Masks for Smooth Edge Flow */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-slate-50 to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-slate-50 to-transparent z-10" />

      {/* Infinite Horizontal Marquee Track */}
      <div className="chemical-ticker-track flex items-center">
        {marqueeItems.map((item, idx) => (
          <Link
            key={`${item._id}-${idx}`}
            href={item.link || '/products/all'}
            className="flex items-center gap-4 sm:gap-5 px-4 sm:px-5 py-3.5 sm:py-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-[#00A389]/60 hover:bg-[#FAFDFD] transition-all duration-300 group shrink-0 w-[360px] sm:w-[420px] cursor-pointer"
            title={`${item.name} (CAS: ${item.casNumber})`}
          >
            {/* 1. Chemical 2D Skeletal Structure (Enlarged for complex structures) */}
            <div className="w-28 sm:w-36 h-24 sm:h-28 rounded-xl bg-white border border-slate-200/80 p-2 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:border-[#00A389]/30 transition-all duration-300 overflow-hidden">
              <CompoundStructureThumbnail item={item} />
            </div>

            {/* 2. Compound Name & CAS No. ONLY */}
            <div className="min-w-0 flex-1">
              <h4 className="font-bold text-slate-900 text-[13px] sm:text-[14px] leading-snug line-clamp-2 group-hover:text-[#00A389] transition-colors">
                {item.name}
              </h4>
              <div className="mt-2 inline-flex items-center font-mono text-[11px] sm:text-xs font-semibold text-[#00A389] bg-[#E6F7F5] px-2.5 py-1 rounded-md border border-[#B3E7E2]/70">
                CAS: {item.casNumber}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

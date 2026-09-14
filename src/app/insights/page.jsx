'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  IoBookOutline,
  IoNewspaperOutline,
  IoArrowForward,
  IoTimeOutline,
  IoCalendarOutline,
  IoFilterOutline,
} from 'react-icons/io5';

const INSIGHT_ITEMS = [
  {
    id: '1',
    title: 'Characterization of Complex Impurities in API Drug Substances',
    category: 'Scientific Articles',
    date: 'August 2026',
    readTime: '6 min read',
    excerpt: 'Comprehensive spectroscopic workflows utilizing 1H/13C-NMR and high-resolution LC-MS/MS for trace-level impurity isolation and regulatory profiling under ICH Q3A/B guidelines.',
    slug: 'characterization-of-complex-impurities',
  },
  {
    id: '2',
    title: 'Applications of Stable Isotopically Labelled Standards in Quantitative Bioanalysis',
    category: 'Scientific Articles',
    date: 'July 2026',
    readTime: '8 min read',
    excerpt: 'How Deuterated (2H) and Carbon-13 (13C) internal standards eliminate matrix effects in pharmacokinetic LC-MS/MS bioanalytical assays.',
    slug: 'applications-of-stable-isotopes-in-bioanalysis',
  },
  {
    id: '3',
    title: 'Pharmavive Expands High-Resolution LC-MS/MS Testing Capacity in Hyderabad',
    category: 'Company News',
    date: 'September 2026',
    readTime: '3 min read',
    excerpt: 'Installation of high-sensitivity triple quadrupole mass spectrometers to enhance turnaround times for nitrosamine and genotoxic impurity screening.',
    slug: 'pharmavive-expands-lcms-capacity',
  },
  {
    id: '4',
    title: 'Mitigating Nitrosamine Risks in Solid Oral Dosage Forms',
    category: 'Scientific Articles',
    date: 'June 2026',
    readTime: '5 min read',
    excerpt: 'Analytical testing strategies and custom reference standards for N-nitroso impurity identification according to FDA and EMA regulatory guidelines.',
    slug: 'mitigating-nitrosamine-risks',
  },
  {
    id: '5',
    title: 'Pharmavive Participates in Global Pharmaceutical CPHI Worldwide Exhibition',
    category: 'Company News',
    date: 'May 2026',
    readTime: '2 min read',
    excerpt: 'Meet our synthetic chemistry leadership to discuss custom synthesis partnerships, reference standards distribution, and FTE programs.',
    slug: 'pharmavive-cphi-worldwide',
  },
];

export default function InsightsPage() {
  const [filter, setFilter] = useState('All');

  const filteredItems =
    filter === 'All'
      ? INSIGHT_ITEMS
      : INSIGHT_ITEMS.filter((item) => item.category === filter);

  return (
    <main className="min-h-screen bg-[#F8FDFA] py-12 text-[#0E2358]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Page Header */}
        <div className="border-b border-[#E2E8F0] pb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#B3E7E2] text-[#00A389] text-[11px] font-mono font-semibold tracking-wider uppercase">
            <IoBookOutline size={14} />
            <span>Knowledge Base &amp; News</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0E2358]">
            Scientific Insights &amp; Updates
          </h1>
          <p className="text-sm sm:text-base text-[#475569] max-w-2xl leading-relaxed">
            Technical articles, impurity characterization methodologies, stable isotope synthesis perspectives, and company announcements from our scientific team.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#64748B] mr-2">
            <IoFilterOutline size={14} className="text-[#00A389]" />
            <span>Filter:</span>
          </div>
          {['All', 'Scientific Articles', 'Company News'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                filter === cat
                  ? 'bg-[#00A389] text-white shadow-xs'
                  : 'bg-white hover:bg-slate-100 text-[#0E2358] border border-[#E2E8F0]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl bg-white border border-[#E2E8F0] hover:border-[#00A389]/40 p-6 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-[#64748B]">
                  <span className="inline-block px-2.5 py-1 rounded-full text-[10.5px] font-semibold bg-[#EBF7F6] text-[#00A389]">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <IoTimeOutline size={13} />
                    <span>{item.readTime}</span>
                  </div>
                </div>

                <h2 className="text-base sm:text-lg font-bold text-[#0E2358] group-hover:text-[#00A389] transition-colors leading-snug">
                  {item.title}
                </h2>

                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed line-clamp-3">
                  {item.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#00A389]">
                <div className="flex items-center gap-1 text-slate-400 font-normal">
                  <IoCalendarOutline size={13} />
                  <span>{item.date}</span>
                </div>
                <Link
                  href="/contact"
                  className="flex items-center gap-1 group-hover:translate-x-1 transition-transform cursor-pointer"
                >
                  <span>Request Whitepaper</span>
                  <IoArrowForward size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

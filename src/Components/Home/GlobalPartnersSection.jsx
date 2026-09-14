'use client';

import React from 'react';

function ThermoFisherLogo() {
  return (
    <div className="flex items-center gap-2 transition-all duration-300 opacity-80 hover:opacity-100 group">
      <svg className="h-6 w-6 shrink-0" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="5" fill="#E11926" />
        <path d="M10 20 L20 10 L30 20 L25 25 L20 20 L15 25 Z" fill="white" />
        <path d="M20 23 L26 29 L21 34 L15 28 Z" fill="white" opacity="0.9" />
      </svg>
      <div className="flex flex-col text-left">
        <span className="text-xs font-black tracking-tight text-slate-800 leading-none group-hover:text-[#0E2358] transition-colors">
          ThermoFisher
        </span>
        <span className="text-[8px] font-bold tracking-[0.2em] text-slate-500 uppercase mt-0.5">
          SCIENTIFIC
        </span>
      </div>
    </div>
  );
}

function MerckLogo() {
  return (
    <div className="flex items-center gap-1.5 transition-all duration-300 opacity-80 hover:opacity-100 group">
      <svg className="h-6 w-6 shrink-0" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="16" stroke="#007A87" strokeWidth="3" />
        <circle cx="20" cy="12" r="5" fill="#EB3300" />
        <circle cx="27" cy="24" r="5" fill="#007A87" />
        <circle cx="13" cy="24" r="5" fill="#502C84" />
      </svg>
      <span className="text-sm font-black tracking-wider text-slate-800 group-hover:text-[#007A87] transition-colors">
        MERCK
      </span>
    </div>
  );
}

function RocheLogo() {
  return (
    <div className="flex items-center transition-all duration-300 opacity-80 hover:opacity-100 group">
      <svg className="h-7 w-14" viewBox="0 0 70 34" fill="none">
        <polygon points="12,2 58,2 68,17 58,32 12,32 2,17" stroke="#0066CC" strokeWidth="2.5" fill="#F0F7FF" />
        <text x="35" y="22" textAnchor="middle" fill="#0066CC" fontSize="12" fontWeight="bold" fontFamily="sans-serif">
          Roche
        </text>
      </svg>
    </div>
  );
}

function CiplaLogo() {
  return (
    <div className="flex items-center transition-all duration-300 opacity-80 hover:opacity-100 group">
      <div className="flex items-baseline">
        <span className="text-lg font-extrabold text-slate-800 tracking-tight group-hover:text-[#0E2358] transition-colors">
          Cipla
        </span>
        <span className="inline-block w-2 h-2 rounded-full bg-[#E52320] ml-0.5 translate-y-[-5px]" />
      </div>
    </div>
  );
}

function PfizerLogo() {
  return (
    <div className="flex items-center transition-all duration-300 opacity-80 hover:opacity-100 group">
      <div className="px-2.5 py-0.5 rounded-full bg-[#EBF4FA] border border-[#0093D0]/40 group-hover:border-[#0093D0] transition-colors">
        <span className="font-serif italic font-black text-sm text-[#0093D0] tracking-wide">
          Pfizer
        </span>
      </div>
    </div>
  );
}

function BMSLogo() {
  return (
    <div className="flex items-center gap-1.5 transition-all duration-300 opacity-80 hover:opacity-100 group">
      <svg className="h-6 w-6 shrink-0" viewBox="0 0 36 36" fill="none">
        <path d="M6 18 C6 10 12 6 18 6 C24 6 30 10 30 18" stroke="#7A2279" strokeWidth="3" strokeLinecap="round" />
        <path d="M10 22 C10 15 14 11 18 11 C22 11 26 15 26 22" stroke="#E83C5C" strokeWidth="3" strokeLinecap="round" />
        <circle cx="18" cy="26" r="3.5" fill="#7A2279" />
      </svg>
      <div className="flex flex-col text-left">
        <span className="text-[10px] font-bold text-slate-800 leading-tight group-hover:text-[#7A2279] transition-colors">
          Bristol Myers
        </span>
        <span className="text-[10px] font-bold text-slate-800 leading-tight group-hover:text-[#E83C5C] transition-colors">
          Squibb
        </span>
      </div>
    </div>
  );
}

export default function GlobalPartnersSection() {
  return (
    <section className="w-full bg-white pt-2">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono font-bold tracking-widest text-[#00A389] uppercase mb-1">
              TRUSTED BY
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0E2358]">
              Our Global Partners
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-slate-500 max-w-sm leading-relaxed">
            We work with researchers, manufacturers and businesses across the globe to advance science and innovation.
          </p>
        </div>

        {/* 6 Partner Logos in Clean Row */}
        <div className="flex flex-wrap items-center justify-between gap-5 sm:gap-6 py-4">
          <ThermoFisherLogo />
          <MerckLogo />
          <RocheLogo />
          <CiplaLogo />
          <PfizerLogo />
          <BMSLogo />
        </div>
      </div>
    </section>
  );
}

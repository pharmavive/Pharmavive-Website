'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  IoArrowForward,
  IoFlaskOutline,
  IoGlobeOutline,
  IoShieldCheckmarkOutline,
} from 'react-icons/io5';

export default function CustomSolutionBanner() {
  return (
    <section className="w-full">
      <div className="relative overflow-hidden rounded-[26px] sm:rounded-[32px] bg-gradient-to-r from-[#095E54] via-[#074D45] to-[#053D37] border border-[#13756A] p-6 sm:p-8 lg:p-10 text-white shadow-xl">
        {/* Subtle Ambient Radial Glows */}
        <div className="absolute -right-12 -top-12 w-72 h-72 rounded-full bg-[#00D2B4]/20 blur-3xl pointer-events-none" />
        <div className="absolute left-1/4 -bottom-16 w-80 h-80 rounded-full bg-[#08A698]/25 blur-3xl pointer-events-none" />

        {/* Decorative 3D Molecular SVG Art (Bottom Left Ambient) */}
        <div className="absolute -left-10 -bottom-10 w-48 h-48 opacity-20 pointer-events-none">
          <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
            <line x1="40" y1="160" x2="90" y2="120" stroke="#2DF4D7" strokeWidth="5" strokeLinecap="round" strokeOpacity="0.5" />
            <line x1="90" y1="120" x2="150" y2="140" stroke="#2DF4D7" strokeWidth="5" strokeLinecap="round" strokeOpacity="0.5" />
            <circle cx="40" cy="160" r="18" fill="#2DF4D7" fillOpacity="0.8" />
            <circle cx="90" cy="120" r="22" fill="#00D2B4" fillOpacity="0.9" />
            <circle cx="150" cy="140" r="16" fill="#2DF4D7" fillOpacity="0.8" />
          </svg>
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Column (5 cols): Title, Subtitle & Button */}
          <div className="md:col-span-5 space-y-3.5">
            <div className="text-[11px] font-mono font-bold tracking-widest text-[#2DF4D7] uppercase">
              LET&apos;S WORK TOGETHER
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-white leading-tight">
              Need a Custom <br />
              <span className="text-[#2DF4D7]">Chemical Solution?</span>
            </h3>

            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-sm">
              Whether you&apos;re looking for a specific compound, bulk supply or custom synthesis,
              our team is here to help you find the right solution.
            </p>

            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-[#074D45] hover:bg-emerald-50 text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all"
              >
                <span>Send Enquiry</span>
                <IoArrowForward size={14} />
              </Link>
            </div>
          </div>

          {/* Middle Column (3.5 cols): 3 Vertically Stacked Metric Badges */}
          <div className="md:col-span-4 flex flex-col gap-3.5 sm:gap-4 pl-0 md:pl-2">
            {/* Metric 1 */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#063B34]/70 border border-[#1FA99A]/40 flex items-center justify-center shrink-0 text-[#2DF4D7] shadow-xs">
                <IoFlaskOutline size={18} />
              </div>
              <div>
                <div className="text-base sm:text-lg font-extrabold text-white leading-tight">50,000+</div>
                <div className="text-[11px] text-emerald-200/90 font-medium">Products in Database</div>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#063B34]/70 border border-[#1FA99A]/40 flex items-center justify-center shrink-0 text-[#2DF4D7] shadow-xs">
                <IoGlobeOutline size={18} />
              </div>
              <div>
                <div className="text-base sm:text-lg font-extrabold text-white leading-tight">Global</div>
                <div className="text-[11px] text-emerald-200/90 font-medium">Shipping &amp; Support</div>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#063B34]/70 border border-[#1FA99A]/40 flex items-center justify-center shrink-0 text-[#2DF4D7] shadow-xs">
                <IoShieldCheckmarkOutline size={18} />
              </div>
              <div>
                <div className="text-base sm:text-lg font-extrabold text-white leading-tight">100%</div>
                <div className="text-[11px] text-emerald-200/90 font-medium">Quality Assured</div>
              </div>
            </div>
          </div>

          {/* Right Column (3.5 cols): Glowing Cyan Circular Ring with Custom Chemical Synthesis */}
          <div className="md:col-span-3 flex items-center justify-center md:justify-end">
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full border border-[#2DF4D7]/40 p-1 flex items-center justify-center shadow-[0_0_35px_rgba(45,244,215,0.3)]">
              {/* Inner Circular Frame */}
              <div className="relative w-full h-full rounded-full overflow-hidden bg-[#053D37]">
                <Image
                  src="/custom_synthesis_reaction.jpg"
                  alt="Custom Chemical Synthesis Reaction with Heated Reflux Apparatus"
                  fill
                  sizes="220px"
                  className="object-cover scale-100 hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#053D37]/35 via-transparent to-[#00D2B4]/15 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

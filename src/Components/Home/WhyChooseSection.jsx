'use client';

import React from 'react';
import Image from 'next/image';
import {
  IoShieldCheckmarkOutline,
  IoFlaskOutline,
  IoNuclearOutline,
  IoHeadsetOutline,
  IoLeafOutline,
} from 'react-icons/io5';

const VALUE_PROPS = [
  {
    title: 'Verified Quality',
    desc: 'Stringent quality control for every batch.',
    icon: IoShieldCheckmarkOutline,
  },
  {
    title: 'Global Supply',
    desc: 'Reliable sourcing & timely delivery.',
    icon: IoFlaskOutline,
  },
  {
    title: 'Research Driven',
    desc: 'Supporting innovation across industries.',
    icon: IoNuclearOutline,
  },
  {
    title: 'Dedicated Support',
    desc: 'Our team is here to help you.',
    icon: IoHeadsetOutline,
  },
  {
    title: 'Sustainable Future',
    desc: 'Responsible practices for a better tomorrow.',
    icon: IoLeafOutline,
  },
];

export default function WhyChooseSection() {
  return (
    <section className="w-full bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* Left Column: Headings & 5 Value Props in 3-Column / 2-Row Grid */}
        <div className="lg:col-span-7 space-y-5">
          {/* Eyebrow & Title */}
          <div>
            <div className="text-xs font-mono font-bold tracking-widest text-[#00A389] uppercase mb-1.5">
              WHY CHOOSE PHARMAVIVE
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold tracking-tight text-[#0E2358] leading-[1.15]">
              Built for Science. <br />
              <span className="text-[#00A389]">Designed for You.</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl leading-relaxed mt-2.5">
              We combine quality, reliability and innovation to deliver chemical solutions that help you move forward.
            </p>
          </div>

          {/* 5 Value Props: 3 on Top Row, 2 on Bottom Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-5 gap-y-4 pt-2">
            {/* 1. Verified Quality */}
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#E6F7F4] border border-[#BDEEE5] flex items-center justify-center shrink-0 text-[#00A389] mt-0.5">
                <IoShieldCheckmarkOutline size={17} />
              </div>
              <div className="min-w-0">
                <h4 className="text-[13px] font-bold text-[#0E2358] leading-tight">Verified Quality</h4>
                <p className="text-[11px] text-slate-500 leading-snug mt-0.5">Stringent quality control for every batch.</p>
              </div>
            </div>

            {/* 2. Global Supply */}
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#E6F7F4] border border-[#BDEEE5] flex items-center justify-center shrink-0 text-[#00A389] mt-0.5">
                <IoFlaskOutline size={17} />
              </div>
              <div className="min-w-0">
                <h4 className="text-[13px] font-bold text-[#0E2358] leading-tight">Global Supply</h4>
                <p className="text-[11px] text-slate-500 leading-snug mt-0.5">Reliable sourcing &amp; timely delivery.</p>
              </div>
            </div>

            {/* 3. Research Driven */}
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#E6F7F4] border border-[#BDEEE5] flex items-center justify-center shrink-0 text-[#00A389] mt-0.5">
                <IoNuclearOutline size={17} />
              </div>
              <div className="min-w-0">
                <h4 className="text-[13px] font-bold text-[#0E2358] leading-tight">Research Driven</h4>
                <p className="text-[11px] text-slate-500 leading-snug mt-0.5">Supporting innovation across industries.</p>
              </div>
            </div>

            {/* 4. Dedicated Support */}
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#E6F7F4] border border-[#BDEEE5] flex items-center justify-center shrink-0 text-[#00A389] mt-0.5">
                <IoHeadsetOutline size={17} />
              </div>
              <div className="min-w-0">
                <h4 className="text-[13px] font-bold text-[#0E2358] leading-tight">Dedicated Support</h4>
                <p className="text-[11px] text-slate-500 leading-snug mt-0.5">Our team is here to help you.</p>
              </div>
            </div>

            {/* 5. Sustainable Future */}
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#E6F7F4] border border-[#BDEEE5] flex items-center justify-center shrink-0 text-[#00A389] mt-0.5">
                <IoLeafOutline size={17} />
              </div>
              <div className="min-w-0">
                <h4 className="text-[13px] font-bold text-[#0E2358] leading-tight">Sustainable Future</h4>
                <p className="text-[11px] text-slate-500 leading-snug mt-0.5">Responsible practices for a better tomorrow.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Sculpted Pharmavive Leaf Ribbon Frame & "Bringing Science to Life" */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-[1.15/1]">
            {/* Left Decorative Cyan Pill Ribbon */}
            <div className="absolute left-0 top-[28%] w-10 sm:w-12 h-24 sm:h-28 rounded-full bg-gradient-to-b from-[#84EBDC] to-[#38D5BF] shadow-sm z-0" />
            
            {/* Outer Dark Teal Crescent Rim */}
            <div 
              className="absolute left-8 sm:left-10 top-0 bottom-6 right-8 sm:right-10 bg-gradient-to-tr from-[#043A34] via-[#00A389] to-[#043A34] z-0 shadow-lg"
              style={{ borderRadius: '150px 0 150px 70px' }}
            />

            {/* Bottom Teal Curled Fold */}
            <div 
              className="absolute left-16 sm:left-20 bottom-0 w-28 sm:w-32 h-14 sm:h-16 bg-gradient-to-r from-[#032C28] via-[#086B61] to-[#00A389] z-20 shadow-md"
              style={{ borderRadius: '0 0 60px 40px' }}
            />

            {/* Main Aperture: Organic Leaf Shape with Laboratory Photography */}
            <div 
              className="relative ml-8 sm:ml-10 w-[calc(100%-48px)] sm:w-[calc(100%-60px)] h-[calc(100%-24px)] overflow-hidden z-10 border-4 border-white shadow-xl"
              style={{ borderRadius: '140px 0 140px 60px' }}
            >
              <Image
                src="/why_choose_lab.jpg"
                alt="High-End Pharmaceutical Research Laboratory"
                fill
                sizes="420px"
                className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#042825]/30 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating Script Callout: "Bringing Science to Life" */}
            <div className="absolute -bottom-2 -right-2 sm:-right-4 z-30 select-none text-right">
              <div className="font-serif italic text-base sm:text-lg font-bold text-[#00A389] tracking-wide rotate-[-6deg] drop-shadow-sm leading-tight">
                Bringing <br />
                <span className="text-[#088A75]">Science</span> <br />
                to Life
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

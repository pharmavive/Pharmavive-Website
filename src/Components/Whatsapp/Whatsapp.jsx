'use client';

import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsappIcon() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
      {/* Tooltip on hover */}
      {isHovered && (
        <div className="hidden sm:block px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs shadow-lg border border-slate-700 animate-in fade-in slide-in-from-right-2 duration-150 whitespace-nowrap">
          <span className="font-semibold text-emerald-400">Chemical Desk:</span> Inquire on WhatsApp
        </div>
      )}

      <a
        href="https://wa.me/916302616273"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact Pharmavive on WhatsApp"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-emerald-400/30"
      >
        <FaWhatsapp size={26} />
      </a>
    </div>
  );
}

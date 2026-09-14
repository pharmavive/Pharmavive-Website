// src/Components/Froxy/FroxyAssistant.jsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useEnquiryCart } from '@/context/EnquiryCartContext';
import {
  IoSparklesOutline,
  IoSparkles,
  IoCloseOutline,
  IoFlaskOutline,
  IoDocumentTextOutline,
  IoArrowForward,
  IoReloadOutline,
  IoCartOutline,
  IoLogoWhatsapp,
  IoMailOutline,
  IoCheckmarkCircle,
  IoGlobeOutline,
} from 'react-icons/io5';

// Mini ChemDraw 2D Chemical Structure SVGs for Chat Compound Cards
function FroxyCompoundSvg({ type }) {
  switch (type) {
    case 'atorvastatin':
      return (
        <svg viewBox="0 0 160 90" className="w-full h-full max-h-[75px]" fill="none">
          <polygon points="70,45 82,45 86,55 72,62 64,52" stroke="#0E2358" strokeWidth="1.6" strokeLinejoin="round" />
          <text x="75" y="56" fill="#0284C7" fontSize="7" fontWeight="bold">N</text>
          <line x1="76" y1="45" x2="76" y2="34" stroke="#0E2358" strokeWidth="1.5" />
          <polygon points="76,34 84,29 84,19 76,14 68,19 68,29" stroke="#0E2358" strokeWidth="1.3" />
          <line x1="64" y1="52" x2="54" y2="48" stroke="#0E2358" strokeWidth="1.5" />
          <polygon points="54,48 46,41 36,43 32,52 39,59 49,57" stroke="#0E2358" strokeWidth="1.3" />
          <text x="23" y="56" fill="#00A389" fontSize="8" fontWeight="bold">F</text>
          <line x1="86" y1="55" x2="96" y2="52" stroke="#0E2358" strokeWidth="1.5" />
          <text x="98" y="54" fill="#DC2626" fontSize="7" fontWeight="bold">O</text>
          <line x1="96" y1="52" x2="104" y2="57" stroke="#0E2358" strokeWidth="1.5" />
          <text x="105" y="60" fill="#0284C7" fontSize="7" fontWeight="bold">HN</text>
          <polyline points="76,60 76,70 86,74 96,70 106,74" stroke="#0E2358" strokeWidth="1.5" />
          <text x="83" y="82" fill="#DC2626" fontSize="6.5" fontWeight="bold">OH</text>
          <text x="93" y="82" fill="#DC2626" fontSize="6.5" fontWeight="bold">OH</text>
        </svg>
      );
    case 'bpc157':
      return (
        <svg viewBox="0 0 160 90" className="w-full h-full max-h-[75px]" fill="none">
          <text x="18" y="42" fill="#0284C7" fontSize="8" fontWeight="bold">H₂N</text>
          <polyline points="35,40 45,50 55,40 65,50 75,40 85,50 95,40 105,50 115,40 125,50" stroke="#0E2358" strokeWidth="1.6" strokeLinecap="round" />
          <text x="130" y="42" fill="#0284C7" fontSize="8" fontWeight="bold">NH₂</text>
          <line x1="45" y1="50" x2="45" y2="60" stroke="#0E2358" strokeWidth="1.4" />
          <text x="42" y="67" fill="#DC2626" fontSize="7" fontWeight="bold">O</text>
          <line x1="65" y1="50" x2="65" y2="60" stroke="#0E2358" strokeWidth="1.4" />
          <text x="62" y="67" fill="#DC2626" fontSize="7" fontWeight="bold">O</text>
          <line x1="85" y1="50" x2="85" y2="60" stroke="#0E2358" strokeWidth="1.4" />
          <text x="82" y="67" fill="#DC2626" fontSize="7" fontWeight="bold">O</text>
          <circle cx="55" cy="33" r="3" fill="#E2F7F4" stroke="#00A389" strokeWidth="1.2" />
          <circle cx="75" cy="33" r="3" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="1.2" />
          <circle cx="95" cy="33" r="3" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.2" />
        </svg>
      );
    case 'chloroaniline':
      return (
        <svg viewBox="0 0 160 90" className="w-full h-full max-h-[75px]" fill="none">
          <polygon points="80,30 92,37 92,52 80,59 68,52 68,37" stroke="#0E2358" strokeWidth="1.5" />
          <line x1="89" y1="39" x2="89" y2="50" stroke="#0E2358" strokeWidth="1.2" />
          <line x1="80" y1="30" x2="80" y2="18" stroke="#0E2358" strokeWidth="1.5" />
          <text x="74" y="15" fill="#0284C7" fontSize="8.5" fontWeight="bold">NH₂</text>
          <line x1="80" y1="59" x2="80" y2="71" stroke="#0E2358" strokeWidth="1.5" />
          <text x="76" y="80" fill="#059669" fontSize="8.5" fontWeight="bold">Cl</text>
        </svg>
      );
    case 'metformin':
      return (
        <svg viewBox="0 0 160 90" className="w-full h-full max-h-[75px]" fill="none">
          <text x="20" y="48" fill="#0284C7" fontSize="8" fontWeight="bold">H₂N</text>
          <line x1="36" y1="45" x2="52" y2="45" stroke="#0E2358" strokeWidth="1.6" />
          <line x1="50" y1="45" x2="50" y2="33" stroke="#0E2358" strokeWidth="1.4" />
          <text x="47" y="30" fill="#0284C7" fontSize="7.5" fontWeight="bold">NH</text>
          <text x="56" y="48" fill="#0284C7" fontSize="8" fontWeight="bold">NH</text>
          <line x1="72" y1="45" x2="88" y2="45" stroke="#0E2358" strokeWidth="1.6" />
          <line x1="86" y1="45" x2="86" y2="33" stroke="#0E2358" strokeWidth="1.4" />
          <text x="83" y="30" fill="#0284C7" fontSize="7.5" fontWeight="bold">NH</text>
          <text x="92" y="48" fill="#0284C7" fontSize="8" fontWeight="bold">N(CH₃)₂</text>
          <text x="65" y="70" fill="#00A389" fontSize="7.5" fontWeight="bold">• HCl</text>
        </svg>
      );
    case 'rosuvastatin':
      return (
        <svg viewBox="0 0 160 90" className="w-full h-full max-h-[75px]" fill="none">
          <polygon points="65,35 80,35 88,46 80,57 65,57 57,46" stroke="#0E2358" strokeWidth="1.6" />
          <text x="71" y="39" fill="#0284C7" fontSize="7.5" fontWeight="bold">N</text>
          <text x="71" y="55" fill="#0284C7" fontSize="7.5" fontWeight="bold">N</text>
          <line x1="57" y1="46" x2="43" y2="46" stroke="#0E2358" strokeWidth="1.5" />
          <polygon points="43,46 35,39 25,41 21,49 29,57 39,55" stroke="#0E2358" strokeWidth="1.3" />
          <text x="12" y="53" fill="#00A389" fontSize="8" fontWeight="bold">F</text>
          <line x1="88" y1="46" x2="102" y2="46" stroke="#0E2358" strokeWidth="1.5" />
          <polyline points="102,46 111,54 120,46 129,54 138,46" stroke="#0E2358" strokeWidth="1.5" />
          <text x="139" y="49" fill="#DC2626" fontSize="7" fontWeight="bold">COO⁻</text>
          <circle cx="151" cy="57" r="5" fill="#E2F7F4" stroke="#00A389" strokeWidth="0.8" />
          <text x="148" y="59" fill="#00897B" fontSize="5" fontWeight="bold">½Ca²⁺</text>
        </svg>
      );
    case 'tirzepatide':
      return (
        <svg viewBox="0 0 160 90" className="w-full h-full max-h-[75px]" fill="none">
          <path d="M 25,50 Q 48,25 70,50 T 115,50 T 145,40" stroke="#0E2358" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <circle cx="36" cy="39" r="4" fill="#E2F7F4" stroke="#00A389" strokeWidth="1.2" />
          <circle cx="58" cy="39" r="4" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="1.2" />
          <circle cx="82" cy="50" r="4" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.2" />
          <circle cx="104" cy="43" r="4" fill="#FCE7F3" stroke="#DB2777" strokeWidth="1.2" />
          <circle cx="126" cy="50" r="4" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.2" />
          <line x1="82" y1="54" x2="82" y2="70" stroke="#D97706" strokeWidth="1.4" strokeDasharray="1.5 1.5" />
          <text x="68" y="78" fill="#D97706" fontSize="6.5" fontWeight="bold">C20-diacid</text>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 160 90" className="w-full h-full max-h-[75px]" fill="none">
          <polygon points="80,32 94,40 94,56 80,64 66,56 66,40" stroke="#0E2358" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="80" cy="48" r="8" fill="#E2F7F4" stroke="#00A389" strokeWidth="1.2" />
          <line x1="56" y1="48" x2="44" y2="48" stroke="#0E2358" strokeWidth="1.4" />
          <circle cx="41" cy="48" r="3" fill="#00A389" />
          <line x1="104" y1="48" x2="116" y2="48" stroke="#0E2358" strokeWidth="1.4" />
          <circle cx="119" cy="48" r="3" fill="#DC2626" />
        </svg>
      );
  }
}

// Pre-indexed Authentic Chemical Compounds for Instant Chat Lookup
const PRELOADED_COMPOUNDS = [
  {
    name: 'Atorvastatin Calcium',
    casNumber: '134523-03-8',
    catNumber: 'AT-001',
    category: 'APIs',
    formula: 'C₆₆H₆₈CaN₄O₁₀',
    weight: '1209.42 g/mol',
    slug: 'atorvastatin-calcium',
    subCategorySlug: 'api-impurity-standards',
    structureType: 'atorvastatin',
    summary: 'High-purity HMG-CoA reductase inhibitor reference standard, with validated HPLC purity ≥ 98% and complete 1H/13C-NMR characterization.',
  },
  {
    name: 'BPC-157',
    casNumber: '137525-51-0',
    catNumber: 'PEP-006',
    category: 'Peptide',
    formula: 'C₆₂H₉₈N₁₆O₂₂S',
    weight: '1419.53 g/mol',
    slug: 'bpc-157',
    subCategorySlug: 'peptides',
    structureType: 'bpc157',
    summary: 'Synthetic 15-amino acid pentadecapeptide research standard (>98% purity by RP-HPLC and verified by electrospray mass spectrometry).',
  },
  {
    name: '4-Chloroaniline',
    casNumber: '106-47-8',
    catNumber: 'INT-042',
    category: 'Intermediates',
    formula: 'C₆H₆ClN',
    weight: '127.57 g/mol',
    slug: '4-chloroaniline',
    subCategorySlug: 'building-blocks',
    structureType: 'chloroaniline',
    summary: 'Key organochlorine building block and intermediate (>99% purity) used in pharmaceutical dye and API synthesis.',
  },
  {
    name: 'Metformin Hydrochloride',
    casNumber: '1115-70-4',
    catNumber: 'MET-009',
    category: 'APIs',
    formula: 'C₄H₁₁N₅·HCl',
    weight: '165.62 g/mol',
    slug: 'metformin-hydrochloride',
    subCategorySlug: 'api-impurity-standards',
    structureType: 'metformin',
    summary: 'Biguanide antihyperglycemic active pharmaceutical reference standard with comprehensive impurity profiling.',
  },
  {
    name: 'Rosuvastatin Calcium',
    casNumber: '147098-20-2',
    catNumber: 'ROS-010',
    category: 'APIs',
    formula: 'C₄₄H₅₄CaF₂N₆O₁₂S₂',
    weight: '1001.14 g/mol',
    slug: 'rosuvastatin-calcium',
    subCategorySlug: 'api-impurity-standards',
    structureType: 'rosuvastatin',
    summary: 'Potent competitive HMG-CoA reductase inhibitor standard (>98% purity) with complete chromatographic assay CoA.',
  },
  {
    name: 'Tirzepatide',
    casNumber: '2023788-19-2',
    catNumber: 'TZP-011',
    category: 'Peptide',
    formula: 'C₂₂₅H₃₄₈N₄₈O₆₈',
    weight: '4813.45 g/mol',
    slug: 'tirzepatide',
    subCategorySlug: 'peptides',
    structureType: 'tirzepatide',
    summary: 'Dual GIP and GLP-1 receptor agonist 39-amino acid peptide standard synthesized with C20-diacid lipid sidechain.',
  },
];

const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: 'froxy',
    text: "Hello! I am **Froxy**, your Pharmavive Chemical Intelligence Assistant. How can I assist with your pharmaceutical research or CDMO project today?",
    isWelcome: true,
  },
];

// 4 Primary Reference Action Pills
const QUICK_ACTIONS = [
  {
    id: 'standards',
    title: 'Search API Impurity Standards',
    query: 'Search API Impurity Standards',
    iconType: 'hex',
  },
  {
    id: 'synthesis',
    title: 'Custom Synthesis Feasibility',
    query: 'Custom Synthesis Feasibility',
    iconType: 'flask',
  },
  {
    id: 'coa',
    title: 'Request Certificate of Analysis (CoA)',
    query: 'Request Certificate of Analysis (CoA)',
    iconType: 'doc',
  },
  {
    id: 'coldchain',
    title: 'Global Lead Times & Cold-Chain',
    query: 'Global Lead Times & Cold-Chain',
    iconType: 'globe',
  },
];

// Helper to render bold markdown cleanly without raw asterisks
function FormattedMessageText({ text }) {
  if (!text) return null;

  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return (
    <div className="whitespace-pre-line text-xs sm:text-[13px] leading-relaxed text-[#16363B]">
      {parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={index} className="font-bold text-[#0D444A]">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </div>
  );
}

export default function FroxyAssistant() {
  const { addToCart, isInCart } = useEnquiryCart();
  const [isOpen, setIsOpen] = useState(false);
  const [showNotificationBadge, setShowNotificationBadge] = useState(true);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [cartSuccessToast, setCartSuccessToast] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // External triggers (e.g. from Hero or header links)
  useEffect(() => {
    const handleOpenFroxy = (e) => {
      setIsOpen(true);
      setShowNotificationBadge(false);
      if (e.detail?.prompt) {
        handleSendMessage(e.detail.prompt);
      }
    };
    window.addEventListener('open-froxy-chat', handleOpenFroxy);
    return () => window.removeEventListener('open-froxy-chat', handleOpenFroxy);
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  const handleAddToCartFromChat = (compound) => {
    addToCart(
      {
        _id: compound.catNumber,
        name: compound.name,
        catNumber: compound.catNumber,
        casNumber: compound.casNumber,
        molecularFormula: compound.formula,
        molecularWeight: compound.weight,
        slug: compound.slug,
        subCategory: { name: compound.category, slug: compound.subCategorySlug },
      },
      { quantity: 1, packSize: '50mg', autoOpen: true }
    );
    setCartSuccessToast(compound.name);
    setTimeout(() => setCartSuccessToast(null), 3000);
  };

  const handleSendMessage = (customText) => {
    const query = (customText || inputVal).trim();
    if (!query) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      const lower = query.toLowerCase();
      let matchedCompound = null;

      // Check if query matches any preloaded compound or CAS number
      for (const comp of PRELOADED_COMPOUNDS) {
        if (
          lower.includes(comp.name.toLowerCase()) ||
          lower.includes(comp.casNumber.toLowerCase()) ||
          lower.includes(comp.catNumber.toLowerCase())
        ) {
          matchedCompound = comp;
          break;
        }
      }

      let botResponse = {};

      if (matchedCompound) {
        botResponse = {
          id: Date.now() + 1,
          sender: 'froxy',
          text: `I found **${matchedCompound.name}** (CAS: **${matchedCompound.casNumber}**) in the Pharmavive catalog.\n\n${matchedCompound.summary}`,
          compoundCard: matchedCompound,
          quickChips: [
            { label: '📑 Request Official CoA', query: `Send CoA request for ${matchedCompound.name}` },
            { label: '⚗️ Custom Batch Quotation', query: `Request quote for 10g of ${matchedCompound.name}` },
            { label: '🔍 Search Another Standard', query: 'Search API Impurity Standards' },
          ],
        };
      } else if (
        lower.includes('impurity') ||
        lower.includes('standard') ||
        lower.includes('search api')
      ) {
        const featured = PRELOADED_COMPOUNDS[0]; // Atorvastatin Calcium
        botResponse = {
          id: Date.now() + 1,
          sender: 'froxy',
          text: "Pharmavive supplies over **4,800+ pharmaceutical impurity reference standards**, working standards, and isotope-labeled compounds.\n\n• Each standard is synthesized under strict quality controls and dispatched with comprehensive analytical dossiers (**1H/13C-NMR**, **HPLC Purity ≥ 98%**, **LC-MS/MS**).\n\nHere is an example reference standard from our active catalog:",
          compoundCard: featured,
          actionButton: { label: 'Explore All 4,800+ Impurity Standards', href: '/products/browse/api-impurity-standards' },
          quickChips: [
            { label: 'Metformin Hydrochloride', query: 'Metformin Hydrochloride' },
            { label: 'Rosuvastatin Calcium', query: 'Rosuvastatin Calcium' },
            { label: 'Request CoA Dossier', query: 'Request Certificate of Analysis (CoA)' },
          ],
        };
      } else if (
        lower.includes('synthesis') ||
        lower.includes('cdmo') ||
        lower.includes('custom') ||
        lower.includes('route') ||
        lower.includes('quote')
      ) {
        botResponse = {
          id: Date.now() + 1,
          sender: 'froxy',
          text: "Our **Custom Organic Synthesis & CDMO unit** provides comprehensive route scouting, process optimization, and scalable production from milligram to multi-kilogram scale.\n\n• **Reaction Capabilities**: Cryogenic down to -78°C, high-pressure hydrogenation, stereoselective synthesis, and organometallic chemistry.\n• **Turnaround**: Feasibility evaluation and formal quote delivered within **24 business hours**.",
          actionButton: { label: 'Submit Custom Synthesis RFQ', href: '/services' },
          contactEscalation: true,
          quickChips: [
            { label: '💬 WhatsApp Chemist', action: 'whatsapp' },
            { label: '✉️ Email Tech Desk', action: 'email' },
            { label: 'Explore Chemical Catalog', query: 'Search API Impurity Standards' },
          ],
        };
      } else if (
        lower.includes('coa') ||
        lower.includes('nmr') ||
        lower.includes('spectra') ||
        lower.includes('analysis') ||
        lower.includes('certificate')
      ) {
        botResponse = {
          id: Date.now() + 1,
          sender: 'froxy',
          text: "Every reference standard from Pharmavive is dispatched with an **authentic, batch-specific Certificate of Analysis (CoA)**.\n\n• **Analytical Suite**: 1H-NMR, 13C-NMR, HPLC Chromatographic Purity (typically ≥ 98.0%), LC-MS/MS, and Karl Fischer water content.\n• **Instant Access**: CoAs are accessible on product detail pages, or you can send us your batch number.",
          actionButton: { label: 'Browse Products & CoAs', href: '/products' },
          quickChips: [
            { label: 'Atorvastatin CoA', query: 'Atorvastatin Calcium' },
            { label: 'BPC-157 CoA', query: 'BPC-157' },
            { label: 'Email Technical Desk', action: 'email' },
          ],
        };
      } else if (
        lower.includes('ship') ||
        lower.includes('cold') ||
        lower.includes('deliver') ||
        lower.includes('lead') ||
        lower.includes('logistics')
      ) {
        botResponse = {
          id: Date.now() + 1,
          sender: 'froxy',
          text: "**Global Cold-Chain Logistics**:\n\n• **Dispatch Hub**: Hyderabad, India.\n• **Destinations**: North America, Europe, United Kingdom, Asia-Pacific, and Latin America.\n• **Temperature Controls**: Ambient, 2–8°C ice-gel packs, or -20°C dry ice with continuous data-loggers.\n• **Transit Times**: 3 to 5 business days door-to-door via validated pharmaceutical couriers.",
          actionButton: { label: 'Contact Logistics Desk', href: '/contact' },
          quickChips: [
            { label: 'Search In-Stock Standards', query: 'Search API Impurity Standards' },
            { label: '💬 Chat on WhatsApp', action: 'whatsapp' },
          ],
        };
      } else {
        botResponse = {
          id: Date.now() + 1,
          sender: 'froxy',
          text: "I can assist you with chemical specifications, pharmacopeial standards, CAS lookup, or custom synthesis feasibility.\n\nWould you like to explore our catalog of 4,800+ reference products or submit an official inquiry?",
          actionButton: { label: 'Explore Products Catalog', href: '/products' },
          contactEscalation: true,
          quickChips: [
            { label: '🔍 Atorvastatin Calcium', query: 'Atorvastatin Calcium' },
            { label: '🧬 BPC-157 Peptide', query: 'BPC-157' },
            { label: '⚗️ Custom Synthesis RFQ', query: 'Custom Synthesis Feasibility' },
            { label: '💬 WhatsApp Chemist Desk', action: 'whatsapp' },
          ],
        };
      }

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 500);
  };

  const handleChipClick = (chip) => {
    if (chip.action === 'whatsapp') {
      window.open('https://wa.me/919999999999?text=Hello%20Pharmavive%2C%20I%20need%20assistance%20with%20chemical%20synthesis%20or%20standards.', '_blank');
    } else if (chip.action === 'email') {
      window.location.href = 'mailto:info.pharmavive@gmail.com?subject=Pharmavive%20Chemical%20Inquiry%20via%20Froxy';
    } else if (chip.query) {
      handleSendMessage(chip.query);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* ================================================================
          1. FLOATING LAUNCHER BUTTON (SHOWN ONLY WHEN MODAL IS CLOSED)
          ================================================================ */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
          {/* Proactive Floating Banner Pill */}
          {showNotificationBadge && (
            <div className="hidden sm:flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#093C42] text-white text-xs font-medium shadow-2xl border border-[#00E5BE]/30 animate-in fade-in slide-in-from-right-4 duration-300">
              <span className="w-2 h-2 rounded-full bg-[#00E5BE] animate-ping shrink-0" />
              <span>
                Need a <strong className="text-[#55E6D5]">CAS #</strong> or <strong className="text-[#55E6D5]">Synthesis Quote</strong>?
              </span>
              <button
                type="button"
                onClick={() => setShowNotificationBadge(false)}
                className="ml-1 text-slate-300 hover:text-white p-0.5 rounded-full transition-colors cursor-pointer"
                title="Dismiss"
              >
                <IoCloseOutline size={14} />
              </button>
            </div>
          )}

          {/* Mascot Face Floating Button */}
          <button
            type="button"
            onClick={() => {
              setIsOpen(true);
              setShowNotificationBadge(false);
            }}
            className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-[0_10px_30px_-5px_rgba(21,140,127,0.5)] hover:shadow-[0_15px_35px_-5px_rgba(21,140,127,0.7)] hover:scale-108 active:scale-95 transition-all duration-300 border-2 border-white cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#158C7F]/40"
            aria-label="Open Froxy Chemical Assistant"
          >
            {/* Radiant Pulsating Aura Halo */}
            <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#00E5BE] via-[#158C7F] to-[#0284C7] opacity-70 blur-md group-hover:opacity-100 group-hover:blur-lg transition-all duration-500 animate-pulse -z-10" />

            <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-[#093C42]">
              <img
                src="/froxy-avatar-hd.png"
                alt="Froxy Mascot"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-[#10B981] border-2 border-white shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            </div>
          </button>
        </div>
      )}

      {/* Cart Toast inside Chat */}
      {cartSuccessToast && (
        <div className="fixed bottom-28 right-6 z-50 bg-[#093C42] text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2.5 border border-[#00E5BE]/40 text-xs animate-in fade-in slide-in-from-bottom-2">
          <IoCheckmarkCircle className="text-[#00E5BE]" size={18} />
          <span>Added <strong>{cartSuccessToast}</strong> to Enquiry Cart!</span>
        </div>
      )}

      {/* ================================================================
          2. FROXY MODAL WORKBENCH (EXACT REFERENCE DESIGN)
          ================================================================ */}
      {isOpen && (
        <div
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[410px] md:w-[420px] h-[640px] max-h-[88vh] rounded-[28px] sm:rounded-[32px] shadow-[0_25px_65px_-10px_rgba(10,56,62,0.4)] border border-[#CDECE6] bg-[#F5FAFA] flex flex-col overflow-hidden animate-in slide-in-from-bottom-6 zoom-in-95 duration-200"
        >
          {/* Header Banner - Complete Reference Artwork with Interactive Overlay */}
          <div className="relative w-full overflow-hidden select-none shrink-0 bg-[#0B3D44]">
            <img
              src="/froxy-header-full.png"
              alt="Froxy - Pharmavive Chemical & CDMO Assistant"
              className="w-full h-auto block select-none pointer-events-none"
            />

            {/* Clickable Overlay for Minimize ('—') - Exact pixel center: 89.9%, 35.6% */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              style={{ left: '89.9%', top: '35.6%' }}
              className="absolute -translate-x-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full hover:bg-white/20 active:bg-white/35 transition-colors cursor-pointer flex items-center justify-center focus:outline-none z-10"
              title="Minimize"
              aria-label="Minimize"
            />

            {/* Clickable Overlay for Close ('✕') - Exact pixel center: 95.3%, 35.6% */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              style={{ left: '95.3%', top: '35.6%' }}
              className="absolute -translate-x-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full hover:bg-white/20 active:bg-white/35 transition-colors cursor-pointer flex items-center justify-center focus:outline-none z-10"
              title="Close"
              aria-label="Close"
            />
          </div>

          {/* Chat Feed Area with Subtle Molecular Background */}
          <div className="relative flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3.5 bg-gradient-to-b from-[#FFFFFF] via-[#F4FBFA] to-[#E6F6F4]">
            
            {/* Subtle Molecular Spheres Background Decoration */}
            <svg
              className="absolute bottom-6 right-2 w-44 h-44 pointer-events-none text-[#158C7F]/15 select-none"
              viewBox="0 0 200 200"
              fill="currentColor"
            >
              <circle cx="150" cy="140" r="20" fill="currentColor" fillOpacity="0.10" />
              <circle cx="105" cy="100" r="14" fill="currentColor" fillOpacity="0.08" />
              <circle cx="170" cy="85" r="16" fill="currentColor" fillOpacity="0.10" />
              <line x1="150" y1="140" x2="105" y2="100" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.12" />
              <line x1="150" y1="140" x2="170" y2="85" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.12" />
            </svg>

            {messages.map((m) => (
              <div
                key={m.id}
                className={`relative flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'} space-y-3`}
              >
                {/* Froxy Message Row */}
                {m.sender === 'froxy' ? (
                  <div className="flex items-start gap-2.5 w-full">
                    {/* Froxy Mascot Circle Avatar */}
                    <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#D4F1EB] border-2 border-white shadow-xs overflow-hidden shrink-0 flex items-center justify-center mt-0.5">
                      <img
                        src="/froxy-avatar.png"
                        alt="Froxy"
                        className="w-full h-full object-cover"
                      />
                      <IoSparkles className="absolute -bottom-0.5 -right-0.5 text-[#00A389] drop-shadow-xs" size={10} />
                    </div>

                    {/* Froxy Message Bubble */}
                    <div className="flex-1 max-w-[88%] space-y-2.5">
                      <div className="bg-white rounded-[22px] rounded-tl-sm p-3.5 sm:p-4 shadow-[0_4px_24px_rgba(13,110,99,0.06)] border border-[#DDF0EC] text-[#16363B]">
                        <FormattedMessageText text={m.text} />

                        {/* Interactive Compound Card (if compound matched) */}
                        {m.compoundCard && (
                          <div className="mt-3 p-3 bg-[#F8FCFB] rounded-2xl border border-[#B3E7E2] shadow-2xs space-y-2.5">
                            <div className="flex items-center justify-between">
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#E2F7F4] text-[#00897B] border border-[#B3E7E2]">
                                {m.compoundCard.category}
                              </span>
                              <span className="text-[10px] font-mono text-slate-400">
                                Cat: {m.compoundCard.catNumber}
                              </span>
                            </div>

                            {/* 2D Structure */}
                            <div className="w-full h-20 bg-white rounded-xl border border-slate-100 flex items-center justify-center p-1">
                              <FroxyCompoundSvg type={m.compoundCard.structureType} />
                            </div>

                            {/* Chemical Details */}
                            <div className="text-[11px] font-mono space-y-0.5 text-slate-600">
                              <div className="flex justify-between font-bold text-[#0D444A]">
                                <span>CAS:</span>
                                <span>{m.compoundCard.casNumber}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-400">Formula:</span>
                                <span className="font-semibold">{m.compoundCard.formula}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-400">Weight:</span>
                                <span className="font-semibold">{m.compoundCard.weight}</span>
                              </div>
                            </div>

                            {/* Action buttons inside card */}
                            <div className="flex items-center gap-1.5 pt-1">
                              <Link
                                href={`/products/browse/${m.compoundCard.subCategorySlug}/${m.compoundCard.slug}`}
                                onClick={() => setIsOpen(false)}
                                className="flex-1 py-1.5 px-2.5 rounded-xl bg-[#093C42] hover:bg-[#158C7F] text-white text-[11px] font-semibold flex items-center justify-center gap-1 transition-all text-center"
                              >
                                <span>View Dossier</span>
                                <IoArrowForward size={11} />
                              </Link>

                              <button
                                type="button"
                                onClick={() => handleAddToCartFromChat(m.compoundCard)}
                                className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                                  isInCart(m.compoundCard.catNumber)
                                    ? 'bg-[#158C7F] text-white'
                                    : 'bg-[#EBF7F4] text-[#00897B] hover:bg-[#158C7F] hover:text-white'
                                }`}
                                title="Add to Enquiry Cart"
                              >
                                <IoCartOutline size={14} />
                                <span>{isInCart(m.compoundCard.catNumber) ? 'Added' : 'Enquire'}</span>
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Dedicated Action Button */}
                        {m.actionButton && (
                          <div className="pt-2">
                            <Link
                              href={m.actionButton.href}
                              onClick={() => setIsOpen(false)}
                              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#093C42] hover:bg-[#158C7F] text-white font-semibold text-xs transition-colors shadow-2xs"
                            >
                              <span>{m.actionButton.label}</span>
                              <IoArrowForward size={12} />
                            </Link>
                          </div>
                        )}

                        {/* Human Escalation Row */}
                        {m.contactEscalation && (
                          <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                            <a
                              href="https://wa.me/919999999999?text=Hello%20Pharmavive%2C%20I%20need%20assistance%20with%20chemical%20synthesis."
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#15803D] font-semibold text-[11px] transition-colors"
                            >
                              <IoLogoWhatsapp size={13} className="text-[#25D366]" />
                              <span>WhatsApp Chemist</span>
                            </a>
                            <a
                              href="mailto:info.pharmavive@gmail.com"
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] transition-colors"
                            >
                              <IoMailOutline size={13} />
                              <span>Email Desk</span>
                            </a>
                          </div>
                        )}
                      </div>

                      {/* Follow-up Quick Chips */}
                      {m.quickChips && m.quickChips.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-0.5 pl-1">
                          {m.quickChips.map((chip, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => handleChipClick(chip)}
                              className="text-[11px] px-3 py-1 rounded-full bg-white hover:bg-[#EBF7F4] text-[#0D444A] hover:text-[#158C7F] border border-[#D5EFEA] hover:border-[#158C7F] transition-all font-medium cursor-pointer shadow-2xs text-left flex items-center gap-1"
                            >
                              <span>{chip.label}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  /* User Message Bubble */
                  <div className="max-w-[85%] rounded-2xl rounded-br-xs px-4 py-2.5 bg-[#158C7F] text-white text-xs sm:text-[13px] font-medium shadow-xs">
                    {m.text}
                  </div>
                )}

                {/* 4 PRIMARY QUICK ACTION PILLS (Centered full width under Welcome Message) */}
                {m.isWelcome && (
                  <div className="w-full flex flex-col gap-2.5 pt-1 px-0.5">
                    {QUICK_ACTIONS.map((action) => (
                      <button
                        key={action.id}
                        type="button"
                        onClick={() => handleSendMessage(action.query)}
                        className="w-full flex items-center justify-between px-4 py-2.5 sm:py-3 rounded-full bg-[#EAF6F4] hover:bg-[#DCF2EE] border border-[#BEE7DF] hover:border-[#158C7F]/50 shadow-[0_2px_8px_rgba(13,110,99,0.04)] hover:shadow-xs transition-all duration-200 group cursor-pointer text-left"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-full bg-[#D6EFEA] flex items-center justify-center text-[#115E59] shrink-0">
                            {action.iconType === 'hex' && (
                              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                                <line x1="12" y1="22.08" x2="12" y2="12" />
                              </svg>
                            )}
                            {action.iconType === 'flask' && <IoFlaskOutline size={16} />}
                            {action.iconType === 'doc' && <IoDocumentTextOutline size={16} />}
                            {action.iconType === 'globe' && <IoGlobeOutline size={16} />}
                          </div>
                          <span className="font-semibold text-xs sm:text-[13px] text-[#134E4A] tracking-tight">
                            {action.title}
                          </span>
                        </div>
                        <IoArrowForward size={14} className="text-[#158C7F] group-hover:translate-x-0.5 transition-transform shrink-0" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Animated Typing State */}
            {isTyping && (
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-[#D5EFEA] w-fit text-[#093C42] text-xs shadow-2xs animate-in fade-in ml-2">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#158C7F] animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-[#158C7F] animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-[#158C7F] animate-bounce [animation-delay:0.4s]" />
                </div>
                <span className="text-[11.5px] font-mono text-slate-500 font-medium">
                  Froxy is consulting chemical knowledge base...
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* ================================================================
              3. INPUT CAPSULE & SUB-FOOTER (EXACT REFERENCE DESIGN)
              ================================================================ */}
          <div className="p-3.5 sm:p-4 bg-white/95 backdrop-blur-sm border-t border-[#DDF0EC] shrink-0 space-y-2.5">
            <div className="flex items-center gap-2.5">
              {/* Rounded Input Capsule */}
              <div className="flex-1 relative flex items-center bg-[#F4FAF8] border border-[#CDECE6] focus-within:border-[#158C7F] focus-within:ring-2 focus-within:ring-[#158C7F]/15 rounded-full px-4 py-2 sm:py-2.5 transition-all shadow-xs">
                <IoSparklesOutline className="text-[#5BB5A8] shrink-0 mr-2.5" size={17} />
                <div className="w-px h-4 bg-slate-300/80 mr-2.5 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask Froxy about compounds, CAS #, CDMO..."
                  className="w-full bg-transparent text-xs sm:text-[13px] text-[#0F2A38] placeholder:text-slate-400 border-none outline-none focus:outline-none ring-0 focus:ring-0 font-medium"
                />
                {inputVal && (
                  <button
                    type="button"
                    onClick={() => setInputVal('')}
                    className="text-slate-400 hover:text-slate-600 ml-1.5 cursor-pointer"
                    title="Clear"
                  >
                    <IoCloseOutline size={16} />
                  </button>
                )}
              </div>

              {/* Circular Send Button with Angled Paper Plane */}
              <button
                type="button"
                onClick={() => handleSendMessage()}
                disabled={!inputVal.trim() || isTyping}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#158C7F] hover:bg-[#0E756A] disabled:opacity-40 text-white flex items-center justify-center shrink-0 shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
                aria-label="Send message to Froxy"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 -rotate-45 translate-x-0.5 -translate-y-0.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </div>

            {/* Sub-footer Bar */}
            <div className="flex items-center justify-between px-2 text-[11px] text-[#6E9E99] font-medium select-none">
              <div className="flex items-center gap-1.5">
                <IoSparkles size={12} className="text-[#158C7F]" />
                <span>Pharmavive AI Chemical Assistant</span>
              </div>
              <button
                type="button"
                onClick={() => setMessages(INITIAL_MESSAGES)}
                className="flex items-center gap-1 text-[#6E9E99] hover:text-[#115E59] transition-colors cursor-pointer"
                title="Restart conversation"
              >
                <IoReloadOutline size={12} />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  IoMailOutline,
  IoCallOutline,
  IoLocationOutline,
  IoLogoWhatsapp,
  IoSendOutline,
  IoCheckmarkCircle,
  IoShieldCheckmarkOutline,
  IoTimeOutline,
  IoDocumentTextOutline,
  IoHelpCircleOutline,
  IoGlobeOutline,
  IoAirplaneOutline,
  IoCopyOutline,
  IoCheckmark,
  IoChevronDownOutline,
} from 'react-icons/io5';
import { useScrollReveal } from '@/utils/useScrollReveal';

const FAQS = [
  {
    q: 'How fast can I expect a feasibility review and quote?',
    a: 'Our synthetic chemistry and analytical team reviews technical feasibility within 2 to 4 business hours. For complex multistep routes, a detailed synthetic plan and pricing quotation are typically finalized within 24 hours.',
  },
  {
    q: 'What analytical documentation is supplied with each compound?',
    a: 'Every delivered batch is accompanied by an authenticated Certificate of Analysis (CoA) featuring HPLC/UHPLC purity profile, 1H-NMR spectrum, and High-Resolution Mass Spectrometry (HRMS). Additional 2D-NMR, GC-MS, or water content (Karl Fischer) data are available upon request.',
  },
  {
    q: 'Can we execute a Non-Disclosure Agreement (NDA) before sharing structures?',
    a: 'Yes. We treat all scientific inquiries with utmost commercial confidentiality. We readily execute bilateral NDAs before you disclose proprietary structures, targets, or analytical methods.',
  },
  {
    q: 'How are temperature-sensitive and international orders shipped?',
    a: 'We ship worldwide across 50+ countries via courier logistics (FedEx / DHL Priority) with cold-chain packaging (blue ice / dry ice at -20°C or -80°C) and calibrated temperature monitoring data loggers where required.',
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    country: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [activeLocation, setActiveLocation] = useState('corporate');
  const [copiedKey, setCopiedKey] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const sectionRef = useScrollReveal({ threshold: 0.05 });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopy = (key, text) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2200);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          organization: formData.organization,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          message: formData.message,
          type: 'contact',
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
        setFormData({
          name: '',
          organization: '',
          email: '',
          phone: '',
          country: '',
          message: '',
        });
      } else {
        setErrorMsg(data.error || 'Failed to dispatch inquiry. Please try again.');
      }
    } catch {
      setErrorMsg('Network connection error. Please try again or reach out to info@pharmavive.com directly.');
    } finally {
      setSubmitting(false);
    }
  };

  const corporateAddressText = `Pharmavive\nRoad No. 10, beside AV Towers\nICRISAT Colony, Jubilee Hills\nHyderabad– 500045, Telangana | India`;
  const chinaAddressText = `Pharmavive\nBuilding 28, Room 201, Lane 358, \nSanmen Road, Wujiaochang Subdistrict, \nYangpu District, Shanghai | China`;
  const rdAddressText = `Pharmavive\nPlot No-A-40/B Part -B, Gandhinagar,\nKukatpally-500037, Telangana | India`;

  return (
    <div className="min-h-screen bg-slate-50/60 selection:bg-[#00A389]/20 selection:text-[#0E2358]">
      {/* Contact Hero Banner */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-4">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-4">
          <Link href="/" className="hover:text-slate-900 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#08A698] font-semibold">Contact & Global Desks</span>
        </nav>

        {/* Recreated Contact Hero Card */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl shadow-slate-200/60 border border-slate-200/80 bg-gradient-to-r from-[#F9FBFC] via-[#F4F8FA] to-[#E5EFF2] min-h-[440px] sm:min-h-[480px] flex items-center">
          {/* Subtle Ambient Radial Glows */}
          <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#00A389]/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-sky-400/10 blur-3xl pointer-events-none" />

          {/* Right Side 3D Molecule Graphic with Left Edge Fade */}
          <div className="absolute right-0 top-0 bottom-0 w-full sm:w-[56%] lg:w-[52%] pointer-events-none select-none overflow-hidden">
            <div
              className="relative w-full h-full"
              style={{
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 12%, black 35%)',
                maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 12%, black 35%)',
              }}
            >
              <Image
                src="/contact-hero-molecule-hd.jpg"
                alt="Pharmavive Molecular Science"
                fill
                priority
                quality={95}
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Top-Right "SCIENCE BUILDS TOMORROW" Badge (Pure Vector/HTML) */}
          <div className="hidden md:flex absolute top-8 right-8 lg:right-12 z-20 items-start gap-2.5 select-none pointer-events-none">
            <div className="flex flex-col items-center pt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00A389]" />
              <span className="w-0.5 h-9 bg-gradient-to-b from-[#00A389] to-transparent rounded-full" />
            </div>
            <div className="text-[10px] font-bold tracking-[0.22em] leading-[1.35] text-slate-500 uppercase font-sans">
              Science<br />
              Builds<br />
              <span className="text-[#00A389] font-extrabold">Tomorrow</span>
            </div>
          </div>

          {/* Left Column: Pure HTML Typography & Interactive Contact Cards */}
          <div className="relative z-10 w-full max-w-xl p-8 sm:p-12 lg:p-14 flex flex-col justify-between h-full space-y-8">
            <div className="space-y-4">
              {/* Eyebrow Tag */}
              <div className="flex items-center gap-3">
                <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-slate-500 uppercase font-sans">
                  GET IN TOUCH
                </span>
                <span className="w-12 h-px bg-slate-300 inline-block" />
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                Let’s Connect <br />
                for <span className="text-[#00A389]">What’s Next.</span>
              </h1>

              {/* Body Narrative */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md font-sans">
                Whether you have a specific compound requirement, need technical support, or want to explore a partnership, our team is here to help. Reach out — we’d love to hear from you.
              </p>
            </div>

            {/* 3 Contact Badges Row */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-8 pt-2">
              {/* 1. Email Us */}
              <a
                href="mailto:hello@pharmavive.com"
                className="group flex items-start gap-2.5 p-2 rounded-xl hover:bg-white/80 transition-all cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-[#00A389]/15 text-[#00A389] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#00A389] group-hover:text-white transition-colors shadow-xs">
                  <IoMailOutline size={14} />
                </div>
                <div>
                  <span className="block text-xs font-bold text-slate-900 leading-tight">Email Us</span>
                  <span className="text-[11px] text-slate-500 font-medium group-hover:text-[#00A389] transition-colors truncate block">
                    hello@pharmavive.com
                  </span>
                </div>
              </a>

              {/* 2. Call Us */}
              <a
                href="tel:+916302616273"
                className="group flex items-start gap-2.5 p-2 rounded-xl hover:bg-white/80 transition-all cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-[#00A389]/15 text-[#00A389] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#00A389] group-hover:text-white transition-colors shadow-xs">
                  <IoCallOutline size={14} />
                </div>
                <div>
                  <span className="block text-xs font-bold text-slate-900 leading-tight">Call Us</span>
                  <span className="text-[11px] text-slate-500 font-medium group-hover:text-[#00A389] transition-colors truncate block">
                    +91 6302-616273
                  </span>
                </div>
              </a>

              {/* 3. Business Inquiries */}
              <a
                href="#inquiry-workspace"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('inquiry-workspace')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group flex items-start gap-2.5 p-2 rounded-xl hover:bg-white/80 transition-all cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-[#00A389]/15 text-[#00A389] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#00A389] group-hover:text-white transition-colors shadow-xs">
                  <IoLogoWhatsapp size={14} />
                </div>
                <div>
                  <span className="block text-xs font-bold text-slate-900 leading-tight">Business Inquiries</span>
                  <span className="text-[11px] text-slate-500 font-medium group-hover:text-[#00A389] transition-colors truncate block">
                    Let&apos;s discuss your needs
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* 4 Key Assurance Highlights Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 mt-6">
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-[#00A389]/10 text-[#00A389] flex items-center justify-center shrink-0">
              <IoTimeOutline size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">2–4h Feasibility</p>
              <p className="text-[11px] text-slate-500">Expedited RFQ Turnaround</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center shrink-0">
              <IoShieldCheckmarkOutline size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Bilateral NDA</p>
              <p className="text-[11px] text-slate-500">Strict IP & Structure Safety</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <IoDocumentTextOutline size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">100% CoA Certified</p>
              <p className="text-[11px] text-slate-500">NMR, LC-MS & HPLC Data</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
              <IoGlobeOutline size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Global Dispatch</p>
              <p className="text-[11px] text-slate-500">Temperature-Controlled 50+ Countries</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Form & Desk Workspace */}
      <div id="inquiry-workspace" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-16 relative z-20">
        <div ref={sectionRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Inquiry Workspace (7 Cols) */}
          <div className="scroll-reveal lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 p-6 sm:p-10 space-y-7">
            
            {/* Form Header */}
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Technical Inquiry & RFQ Desk
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Submit structure targets, CAS numbers, or batch quantities for fast-track feasibility.
              </p>
            </div>

            {/* Form State: Submitted / Input */}
            {submitted ? (
              <div className="p-8 sm:p-10 rounded-3xl bg-emerald-50/70 border border-emerald-200 text-center space-y-6">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-xs">
                  <IoCheckmarkCircle size={36} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-extrabold text-emerald-950">
                    Inquiry Transmitted Successfully
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-800 max-w-lg mx-auto leading-relaxed">
                    Your inquiry has been logged in our technical portal and dispatched to our synthetic chemistry team. A chemical specialist will review feasibility and respond with formal pricing, delivery schedule, and CoA specifications within 2–4 business hours.
                  </p>
                </div>

                {/* Next Steps Timeline */}
                <div className="max-w-md mx-auto p-4 rounded-2xl bg-white border border-emerald-200 text-left space-y-3">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    What happens next:
                  </span>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0 text-[10px]">1</span>
                      <p className="text-slate-700"><strong>Chemical Route Feasibility:</strong> Our synthetic team reviews synthetic steps and safety parameters.</p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0 text-[10px]">2</span>
                      <p className="text-slate-700"><strong>Formal Quotation:</strong> Purity specifications, lead times, and transparent pricing delivered to your email.</p>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-[#0E2358] hover:bg-[#071940] text-white font-bold text-xs transition-all cursor-pointer shadow-sm active:scale-95"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {errorMsg && (
                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                    {errorMsg}
                  </div>
                )}

                {/* Name & Organization Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00A389]/30 focus:border-[#00A389] text-xs sm:text-sm text-slate-800 transition-all font-sans"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1.5">
                      Organization / Institute
                    </label>
                    <input
                      type="text"
                      name="organization"
                      value={formData.organization}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00A389]/30 focus:border-[#00A389] text-xs sm:text-sm text-slate-800 transition-all font-sans"
                    />
                  </div>
                </div>

                {/* Email & Phone Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1.5">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="name@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00A389]/30 focus:border-[#00A389] text-xs sm:text-sm text-slate-800 transition-all font-sans"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1.5">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00A389]/30 focus:border-[#00A389] text-xs sm:text-sm text-slate-800 transition-all font-sans"
                    />
                  </div>
                </div>

                {/* Country */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00A389]/30 focus:border-[#00A389] text-xs sm:text-sm text-slate-800 transition-all font-sans"
                  />
                </div>

                {/* Project Details Textarea */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block font-semibold text-slate-700">
                      Chemical Specification & Project Details *
                    </label>
                    <span className="text-[11px] text-slate-400">Include CAS / Target Structure</span>
                  </div>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Specify Compound Name, CAS numbers, target purity (>98%), quantity (e.g. 50mg, 100g), or synthetic route constraints..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00A389]/30 focus:border-[#00A389] text-xs sm:text-sm text-slate-800 resize-none transition-all leading-relaxed font-sans"
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#0E2358] hover:bg-[#0B3B3C] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Transmitting Technical Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <IoSendOutline size={16} className="text-[#00D2B4]" />
                      <span>Transmit Technical Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Direct Channels & Global Headquarters (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Desks */}
            <div className="scroll-reveal delay-100 card-hover-scientific rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xl shadow-slate-200/40 space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900">
                  Direct Communication Desks
                </h3>
                <span className="text-[11px] font-semibold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
                  Mon – Sat (IST)
                </span>
              </div>

              <div className="space-y-3.5 text-xs">
                {/* Phone Channel */}
                <div className="group flex items-start justify-between gap-3 p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 hover:border-sky-200 hover:bg-sky-50/30 transition-all">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                      <IoCallOutline size={18} />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block text-xs">Phone</span>
                      <a href="tel:+916302616273" className="text-sky-700 hover:underline font-semibold text-xs tracking-tight">
                        +91 63026 16273
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy('phone', '+91 63026 16273')}
                    title="Copy Phone Number"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
                  >
                    {copiedKey === 'phone' ? <IoCheckmark size={15} className="text-emerald-600" /> : <IoCopyOutline size={15} />}
                  </button>
                </div>

                {/* Email Channel */}
                <div className="group flex items-start justify-between gap-3 p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 hover:border-sky-200 hover:bg-sky-50/30 transition-all">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                      <IoMailOutline size={18} />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block text-xs">Email</span>
                      <a href="mailto:info@pharmavive.com" className="text-sky-700 hover:underline font-semibold text-xs tracking-tight">
                        info@pharmavive.com
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy('email', 'info@pharmavive.com')}
                    title="Copy Email Address"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
                  >
                    {copiedKey === 'email' ? <IoCheckmark size={15} className="text-emerald-600" /> : <IoCopyOutline size={15} />}
                  </button>
                </div>

                {/* WhatsApp Channel */}
                <a
                  href="https://wa.me/916302616273"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100 hover:border-emerald-300 hover:bg-emerald-50 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                      <IoLogoWhatsapp size={20} />
                    </div>
                    <span className="font-bold text-emerald-950 group-hover:text-emerald-700 text-xs sm:text-[13px] block transition-colors">
                      Chat with us on WhatsApp
                    </span>
                  </div>
                  <span className="text-emerald-700 font-bold text-sm group-hover:translate-x-0.5 transition-transform pr-1">
                    →
                  </span>
                </a>
              </div>
            </div>

            {/* Corporate Location Card - Clean Font & Exact User Text */}
            <div className="scroll-reveal delay-200 card-hover-scientific rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xl shadow-slate-200/40 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center">
                    <IoLocationOutline size={18} />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">Address</h3>
                </div>
                <span className="text-[11px] font-semibold text-slate-500">Global Facilities</span>
              </div>

              {/* Address Blocks with Clean Sans-Serif Typography */}
              <div className="space-y-3.5">
                {/* Corporate Office Block */}
                <div className="p-4 rounded-2xl bg-slate-50/90 border border-slate-200/80 space-y-1.5 relative group hover:border-[#00A389]/30 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-xs tracking-tight block">
                      Corporate office
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy('corporate-address', corporateAddressText)}
                      title="Copy Corporate Office Address"
                      className="text-slate-400 hover:text-slate-700 p-1 rounded-md hover:bg-slate-200/60 transition-colors cursor-pointer"
                    >
                      {copiedKey === 'corporate-address' ? (
                        <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                          <IoCheckmark size={13} /> Copied
                        </span>
                      ) : (
                        <IoCopyOutline size={14} />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-sans">
                    <strong className="font-semibold text-slate-900">Pharmavive</strong><br />
                    Road No. 10, beside AV Towers<br />
                    ICRISAT Colony, Jubilee Hills<br />
                    Hyderabad– 500045, Telangana | India
                  </p>
                </div>

                {/* Shanghai Office Block */}
                <div className="p-4 rounded-2xl bg-slate-50/90 border border-slate-200/80 space-y-1.5 relative group hover:border-[#00A389]/30 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-xs tracking-tight block">
                      Shanghai Office
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy('china-address', chinaAddressText)}
                      title="Copy Shanghai Office Address"
                      className="text-slate-400 hover:text-slate-700 p-1 rounded-md hover:bg-slate-200/60 transition-colors cursor-pointer"
                    >
                      {copiedKey === 'china-address' ? (
                        <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                          <IoCheckmark size={13} /> Copied
                        </span>
                      ) : (
                        <IoCopyOutline size={14} />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-sans">
                    <strong className="font-semibold text-slate-900">Pharmavive</strong><br />
                    Building 28, Room 201, Lane 358,<br />
                    Sanmen Road, Wujiaochang Subdistrict,<br />
                    Yangpu District, Shanghai | China
                  </p>
                </div>

                {/* Research & Development Block */}
                <div className="p-4 rounded-2xl bg-slate-50/90 border border-slate-200/80 space-y-1.5 relative group hover:border-[#00A389]/30 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-xs tracking-tight block">
                      Research &amp; Development
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy('rd-address', rdAddressText)}
                      title="Copy Research & Development Address"
                      className="text-slate-400 hover:text-slate-700 p-1 rounded-md hover:bg-slate-200/60 transition-colors cursor-pointer"
                    >
                      {copiedKey === 'rd-address' ? (
                        <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                          <IoCheckmark size={13} /> Copied
                        </span>
                      ) : (
                        <IoCopyOutline size={14} />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-sans">
                    <strong className="font-semibold text-slate-900">Pharmavive</strong><br />
                    Plot No-A-40/B Part -B, Gandhinagar,<br />
                    Kukatpally-500037, Telangana | India
                  </p>
                </div>
              </div>

              {/* Interactive Location Map Switcher */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Interactive Map
                  </span>
                  <div className="inline-flex rounded-lg bg-slate-100 p-0.5 text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => setActiveLocation('corporate')}
                      className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                        activeLocation === 'corporate'
                          ? 'bg-[#0E2358] text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Corporate
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveLocation('china')}
                      className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                        activeLocation === 'china'
                          ? 'bg-[#0E2358] text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Shanghai
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveLocation('rd')}
                      className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                        activeLocation === 'rd'
                          ? 'bg-[#0E2358] text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      R&amp;D
                    </button>
                  </div>
                </div>

                {/* Map Iframe Container */}
                <div className="rounded-2xl overflow-hidden border border-slate-200 h-52 relative bg-slate-100 shadow-inner">
                  {activeLocation === 'corporate' ? (
                    <iframe
                      src="https://maps.google.com/maps?q=Road+No.+10,+beside+AV+Towers,+ICRISAT+Colony,+Jubilee+Hills,+Hyderabad+500045&t=&z=15&ie=UTF8&iwloc=&output=embed"
                      width="100%"
                      height="100%"
                      title="Pharmavive Corporate Office Location"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                    />
                  ) : activeLocation === 'china' ? (
                    <iframe
                      src="https://maps.google.com/maps?q=Building+28,+Room+201,+Lane+358,+Sanmen+Road,+Yangpu+District,+Shanghai&t=&z=14&ie=UTF8&iwloc=&output=embed"
                      width="100%"
                      height="100%"
                      title="Pharmavive Shanghai Office Location"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                    />
                  ) : (
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30443.5010739173!2d78.41710581705271!3d17.486610388701322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb904e044d1bbb%3A0xb542222eec8368b4!2sHyderabad%2C%20Telangana%20500037!5e0!3m2!1sen!2sin!4v1749034975862!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      title="Pharmavive R&D Facility Location"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Procurement FAQ Section */}
        <div className="mt-16 pt-12 border-t border-slate-200/80 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-semibold">
              <IoHelpCircleOutline size={15} />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Technical Procurement & Inquiries
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Clear answers regarding our analytical documentation, synthetic lead times, and global shipping policies.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-bold text-slate-900 text-xs sm:text-sm hover:text-[#00A389] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <IoChevronDownOutline
                      size={18}
                      className={`text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#00A389]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 font-sans">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Global Logistics & Quality Guarantee Ribbon */}
        <div className="mt-12 rounded-3xl bg-gradient-to-r from-[#0E2358] via-[#0A3E48] to-[#042824] text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#00D2B4]">
              <IoAirplaneOutline size={16} />
              <span>Worldwide Regulated Chemical Shipments</span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-white">
              Need urgent delivery for an analytical campaign?
            </h3>
            <p className="text-xs text-slate-300 max-w-xl">
              We provide priority air-freight with temperature-controlled logistics (-20°C / dry ice) and customs documentation to North America, Europe, and Asia.
            </p>
          </div>
          <a
            href="mailto:info@pharmavive.com?subject=Urgent%20Analytical%20Delivery%20Inquiry"
            className="shrink-0 px-6 py-3 rounded-xl bg-[#00D2B4] hover:bg-[#20E5C9] text-[#042824] font-bold text-xs shadow-md transition-all hover:scale-105"
          >
            Email Urgent Request →
          </a>
        </div>

      </div>
    </div>
  );
}
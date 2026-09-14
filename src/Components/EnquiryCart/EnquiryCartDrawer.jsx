'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useEnquiryCart } from '@/context/EnquiryCartContext';
import { formatMolecularFormula } from '@/utils/chemUtils';
import CompoundStructureThumbnail from './CompoundStructureThumbnail';
import ProductInfoModal from './ProductInfoModal';
import { 
  IoCloseOutline, 
  IoTrashOutline, 
  IoLogoWhatsapp, 
  IoMailOutline, 
  IoFlaskOutline, 
  IoArrowForward, 
  IoArrowBackOutline,
  IoCheckmarkCircleOutline,
  IoShieldCheckmarkOutline
} from 'react-icons/io5';

const PACK_SIZES = ['10mg', '25mg', '50mg', '100mg', '500mg', '1g', '5g', 'Custom'];

export default function EnquiryCartDrawer() {
  const { cart, isOpen, closeCart, removeFromCart, updateQuantity, clearCart, totalItems } = useEnquiryCart();
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    country: '',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generateWhatsAppMessage = () => {
    let msg = `*PHARMAVIVE CHEMICAL ENQUIRY / RFQ*\n`;
    msg += `------------------------------------\n`;
    msg += `Date: ${new Date().toLocaleDateString()}\n\n`;
    msg += `*Requested Compounds (${cart.length}):*\n\n`;

    cart.forEach((item, idx) => {
      msg += `${idx + 1}. *${item.name}*\n`;
      msg += `   • Cat No: ${item.catNumber || 'N/A'}\n`;
      if (item.casNumber) msg += `   • CAS: ${item.casNumber}\n`;
      msg += `   • Pack / Qty: ${item.quantity} x ${item.packSize || 'Standard'}\n`;
      if (item.purity) msg += `   • Purity: ${item.purity}\n`;
      if (item.notes) msg += `   • Note: ${item.notes}\n`;
      msg += `\n`;
    });

    if (formData.name) {
      msg += `*Client Details:*\n`;
      msg += `• Name: ${formData.name}\n`;
      if (formData.company) msg += `• Company: ${formData.company}\n`;
      if (formData.email) msg += `• Email: ${formData.email}\n`;
      if (formData.country) msg += `• Country: ${formData.country}\n`;
    }

    msg += `\nPlease provide availability, lead time, and pricing with complete CoA.`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/916302616273?text=${encoded}`, '_blank');
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          organization: formData.company,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          message: formData.notes || 'Official Request for Quotation (RFQ) for selected chemical compounds.',
          type: 'rfq_cart',
          items: cart.map((item) => ({
            name: item.name,
            catNumber: item.catNumber,
            casNumber: item.casNumber,
            quantity: item.quantity || 1,
            packSize: item.packSize || '50mg',
            purity: item.purity || 'Standard',
            notes: item.notes || '',
          })),
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setShowEmailForm(false);
          clearCart();
        }, 3500);
      } else {
        setErrorMsg(data.error || 'Failed to dispatch quotation request. Please try again.');
      }
    } catch {
      setErrorMsg('Network error. Please try again or email info@pharmavive.com directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-backdrop-fade transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-full sm:w-screen max-w-xl bg-white shadow-2xl flex flex-col border-l border-slate-200/80 animate-drawer-slide">
          {/* Subtle Top Brand Accent Line */}
          <div className="h-[3px] w-full bg-gradient-to-r from-[#00A389] via-[#08A698] to-[#0E2358] shrink-0" />

          {/* Clean, Modern Header */}
          <div className="px-4 sm:px-6 py-3.5 sm:py-4.5 border-b border-slate-100 bg-white/95 backdrop-blur-md flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl bg-gradient-to-br from-[#E6F7F5] to-[#d6f5f0] border border-[#B3E7E2]/70 flex items-center justify-center text-[#00A389] shadow-2xs shrink-0">
                <IoFlaskOutline size={20} />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-sm sm:text-base font-bold tracking-tight text-slate-900 truncate">
                    Chemical Enquiry List
                  </h2>
                  <span className="px-2 sm:px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-mono font-semibold bg-[#E6F7F5] text-[#00A389] border border-[#00A389]/25">
                    {totalItems} {totalItems === 1 ? 'item' : 'items'}
                  </span>
                  {cart.length > 0 && (
                    <button
                      type="button"
                      onClick={clearCart}
                      className="text-[11px] sm:text-xs text-slate-400 hover:text-red-500 hover:underline transition-colors cursor-pointer ml-1 font-medium"
                    >
                      Clear all
                    </button>
                  )}
                </div>
                <p className="text-[11px] sm:text-xs text-slate-500 font-normal mt-0.5 truncate">Direct Request for Quotation (RFQ) & Technical Dossier</p>
              </div>
            </div>
            <button
              onClick={closeCart}
              className="w-8 h-8 rounded-full bg-slate-100/90 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center active:scale-90 transition-all cursor-pointer shrink-0 ml-2"
              aria-label="Close cart"
            >
              <IoCloseOutline size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="py-12 px-4 text-center flex flex-col items-center">
                <div className="w-20 h-20 mb-5 rounded-3xl bg-gradient-to-br from-[#E6F7F5] via-white to-[#d6f5f0] border border-[#B3E7E2]/60 flex items-center justify-center text-[#00A389] shadow-sm animate-node-pulse">
                  <IoFlaskOutline size={36} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1.5">Your Enquiry List is Empty</h3>
                <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6 leading-relaxed">
                  Browse our high-purity chemical catalog to add API impurities, reagents, and reference standards for an instant quotation.
                </p>
                <Link
                  href="/products/all"
                  onClick={closeCart}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00A389] to-[#08A698] hover:from-[#008f78] hover:to-[#078f83] text-white text-sm font-semibold shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
                >
                  <span>Explore Product Catalogue</span>
                  <IoArrowForward size={16} />
                </Link>

                {/* Trust Highlights in Empty State */}
                <div className="mt-10 w-full grid grid-cols-1 gap-2.5 text-left">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center text-[#00A389] shrink-0 mt-0.5">
                      <IoCheckmarkCircleOutline size={16} />
                    </div>
                    <div>
                      <h5 className="text-xs font-semibold text-slate-800">Analytical Dossier with Every Batch</h5>
                      <p className="text-[11px] text-slate-500">Comprehensive CoA with HPLC, 1H-NMR, and Mass Spectrometry validation.</p>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center text-[#00A389] shrink-0 mt-0.5">
                      <IoShieldCheckmarkOutline size={16} />
                    </div>
                    <div>
                      <h5 className="text-xs font-semibold text-slate-800">Rapid Global Quote Turnaround</h5>
                      <p className="text-[11px] text-slate-500">Direct technical pricing and worldwide dispatch estimates within 2–4 hours.</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : showEmailForm ? (
              /* Email RFQ Form View */
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setShowEmailForm(false)}
                      className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                      title="Back to list"
                    >
                      <IoArrowBackOutline size={18} />
                    </button>
                    <h3 className="text-sm font-bold text-slate-900">Formal Quotation Details</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowEmailForm(false)}
                    className="text-xs text-[#00A389] hover:underline font-medium cursor-pointer"
                  >
                    Back to compound list
                  </button>
                </div>

                {submitted ? (
                  <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                    <p className="text-emerald-800 font-semibold text-sm">Quotation Request Prepared!</p>
                    <p className="text-xs text-emerald-700">
                      Your email client has been launched with the complete chemical dossier and specification details.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleEmailSubmit} className="space-y-3.5">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Dr. Jane Smith"
                          className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:border-[#00A389] focus:ring-2 focus:ring-[#00A389]/20 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Organization / Institute *</label>
                        <input
                          type="text"
                          name="company"
                          required
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder="Pharma Lab / University"
                          className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:border-[#00A389] focus:ring-2 focus:ring-[#00A389]/20 transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Corporate Email *</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="researcher@pharma.com"
                          className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:border-[#00A389] focus:ring-2 focus:ring-[#00A389]/20 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+1 (555) 000-0000"
                          className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:border-[#00A389] focus:ring-2 focus:ring-[#00A389]/20 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Destination Country</label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        placeholder="e.g. United States, Germany, India"
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:border-[#00A389] focus:ring-2 focus:ring-[#00A389]/20 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Special Requirements / Target Purity</label>
                      <textarea
                        name="notes"
                        rows={3}
                        value={formData.notes}
                        onChange={handleInputChange}
                        placeholder="Any custom purity target, chiral separation, or analytical documentation requirements..."
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:border-[#00A389] focus:ring-2 focus:ring-[#00A389]/20 transition-all resize-none"
                      />
                    </div>

                    {errorMsg && (
                      <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                        {errorMsg}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#00A389] to-[#08A698] hover:from-[#008f78] hover:to-[#078f83] active:scale-[0.98] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all cursor-pointer disabled:opacity-60"
                    >
                      {submitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Transmitting Quotation Request...</span>
                        </>
                      ) : (
                        <>
                          <IoMailOutline size={18} />
                          <span>Dispatch Official Quotation Request</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            ) : (
              /* Compounds List */
              cart.map((item) => (
                <div
                  key={item._id}
                  className="p-4 rounded-2xl border border-slate-200/90 bg-white hover:border-[#00A389]/40 hover:shadow-sm transition-all duration-200 flex flex-col gap-3 group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      {/* Interactive Chemical Structure Canvas (replaces PV) */}
                      <div 
                        onClick={() => setSelectedProductForModal(item)}
                        className="w-16 h-16 rounded-xl bg-white border border-slate-200/90 flex-shrink-0 relative overflow-hidden flex items-center justify-center p-1 cursor-pointer hover:border-[#00A389] hover:shadow-xs group/thumb transition-all"
                        title="Click to view full product information"
                      >
                        <CompoundStructureThumbnail item={item} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 
                          onClick={() => setSelectedProductForModal(item)}
                          className="text-sm font-bold text-slate-900 truncate hover:text-[#00A389] transition-colors cursor-pointer" 
                          title="Click to view full product dossier"
                        >
                          {item.name}
                        </h4>
                        <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                          {item.catNumber && (
                            <span className="font-mono text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium border border-slate-200/60">
                              Cat: {item.catNumber}
                            </span>
                          )}
                          {item.casNumber && (
                            <span className="font-mono text-[11px] px-2 py-0.5 rounded-md bg-[#E6F7F5] text-[#00A389] border border-[#B3E7E2]/70 font-semibold">
                              CAS: {item.casNumber}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between gap-2 mt-1">
                          {item.molecularFormula && (
                            <p className="text-[11px] text-slate-500 font-mono">
                              Formula: {formatMolecularFormula(item.molecularFormula)}
                            </p>
                          )}
                          <button
                            type="button"
                            onClick={() => setSelectedProductForModal(item)}
                            className="text-[11px] text-[#00A389] hover:underline font-semibold cursor-pointer shrink-0 ml-auto"
                          >
                            Quick View →
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="w-8 h-8 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 flex items-center justify-center active:scale-90 transition-all cursor-pointer"
                      title="Remove compound"
                      aria-label="Remove item"
                    >
                      <IoTrashOutline size={17} />
                    </button>
                  </div>

                  {/* Quantity and Pack Size controls */}
                  <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 font-medium text-[11px]">Pack Size:</span>
                      <select
                        value={item.packSize || '50mg'}
                        onChange={(e) => updateQuantity(item._id, item.quantity, e.target.value)}
                        className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white font-mono text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#00A389] focus:border-[#00A389] cursor-pointer"
                      >
                        {PACK_SIZES.map((size) => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-500 font-medium text-[11px]">Qty:</span>
                      <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-100/80 p-0.5">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() => updateQuantity(item._id, Math.max(1, (item.quantity || 1) - 1), item.packSize)}
                          className="w-6 h-6 rounded flex items-center justify-center bg-white hover:bg-slate-50 text-slate-700 active:scale-90 font-bold transition-all cursor-pointer shadow-2xs text-xs"
                        >
                          -
                        </button>
                        <span className="px-2.5 font-mono text-xs font-bold text-slate-800">
                          {item.quantity || 1}
                        </span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() => updateQuantity(item._id, (item.quantity || 1) + 1, item.packSize)}
                          className="w-6 h-6 rounded flex items-center justify-center bg-white hover:bg-slate-50 text-slate-700 active:scale-90 font-bold transition-all cursor-pointer shadow-2xs text-xs"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with Actions */}
          {cart.length > 0 && !showEmailForm && (
            <div className="p-4 sm:p-5 border-t border-slate-200/90 bg-slate-50/90 backdrop-blur-xs shrink-0">
              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                <button
                  type="button"
                  onClick={generateWhatsAppMessage}
                  className="w-full py-3 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] active:scale-[0.98] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2 shadow-sm hover:shadow-md transition-all cursor-pointer"
                >
                  <IoLogoWhatsapp size={18} className="shrink-0" />
                  <span className="truncate">WhatsApp RFQ</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowEmailForm(true)}
                  className="w-full py-3 px-3 rounded-xl bg-gradient-to-r from-[#00A389] to-[#08A698] hover:from-[#008f78] hover:to-[#078f83] active:scale-[0.98] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2 shadow-sm hover:shadow-md transition-all cursor-pointer"
                >
                  <IoMailOutline size={18} className="shrink-0" />
                  <span className="truncate">Formal Email RFQ</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Full Product Dossier & Specifications Quick View Modal */}
      {selectedProductForModal && (
        <ProductInfoModal
          product={selectedProductForModal}
          onClose={() => setSelectedProductForModal(null)}
          onUpdateQuantity={updateQuantity}
        />
      )}
    </div>
  );
}

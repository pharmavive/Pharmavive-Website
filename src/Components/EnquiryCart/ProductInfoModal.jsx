'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { formatMolecularFormula, copyToClipboard } from '@/utils/chemUtils';
import CompoundStructureThumbnail from './CompoundStructureThumbnail';
import {
  IoCloseOutline,
  IoCopyOutline,
  IoCheckmarkOutline,
  IoLogoWhatsapp,
  IoArrowForward
} from 'react-icons/io5';

const PACK_SIZES = ['10mg', '25mg', '50mg', '100mg', '500mg', '1g', '5g', 'Custom'];

export default function ProductInfoModal({ product, onClose, onUpdateQuantity }) {
  const [copiedKey, setCopiedKey] = useState(null);
  const [localPackSize, setLocalPackSize] = useState(product?.packSize || '50mg');
  const [localQty, setLocalQty] = useState(product?.quantity || 1);

  if (!product) return null;

  const handleCopy = async (text, key) => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  const handlePackChange = (newSize) => {
    setLocalPackSize(newSize);
    if (onUpdateQuantity) {
      onUpdateQuantity(product._id, localQty, newSize);
    }
  };

  const handleQtyChange = (newQty) => {
    const safeQty = Math.max(1, newQty);
    setLocalQty(safeQty);
    if (onUpdateQuantity) {
      onUpdateQuantity(product._id, safeQty, localPackSize);
    }
  };

  const handleDirectWhatsApp = () => {
    let msg = `*PHARMAVIVE PRODUCT ENQUIRY*\n`;
    msg += `------------------------------------\n`;
    msg += `• Compound: *${product.name}*\n`;
    msg += `• Cat No: ${product.catNumber || 'N/A'}\n`;
    if (product.casNumber) msg += `• CAS No: ${product.casNumber}\n`;
    if (product.chemicalName) msg += `• Chemical Name: ${product.chemicalName}\n`;
    msg += `• Pack Size: ${localPackSize}\n`;
    msg += `• Quantity: ${localQty}\n`;
    msg += `• Stock Status: ${product.stock || 'Instock'}\n\n`;
    msg += `Please provide quotation, lead time, and complete CoA.`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/916302616273?text=${encoded}`, '_blank');
  };

  // Generate catalog link if available
  const productUrl = product.subCategorySlug && product.productSlug
    ? `/products/browse/${encodeURIComponent(product.subCategorySlug)}/${encodeURIComponent(product.productSlug)}`
    : product.productSlug
    ? `/products/browse/all/${encodeURIComponent(product.productSlug)}`
    : `/search?q=${encodeURIComponent(product.catNumber || product.casNumber || product.name)}`;

  return (
    <div className="fixed inset-0 z-[70] overflow-y-auto flex items-center justify-center p-3 sm:p-6 select-none">
      {/* Dark Blur Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity animate-backdrop-fade cursor-pointer"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Window */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col max-h-[92vh] z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Top Brand Precision Line */}
        <div className="h-[3.5px] w-full bg-gradient-to-r from-[#00A389] via-[#08A698] to-[#0E2358] shrink-0" />

        {/* Modal Header */}
        <div className="px-6 py-4.5 border-b border-slate-100 bg-white/95 backdrop-blur-md flex items-start justify-between gap-4 shrink-0">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              {product.catNumber && (
                <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-md bg-slate-900 text-white flex items-center gap-1.5 shadow-2xs">
                  <span>Cat No: {product.catNumber}</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(product.catNumber, 'cat')}
                    className="hover:text-[#00A389] p-0.5 transition-colors cursor-pointer"
                    title="Copy Catalog Number"
                  >
                    {copiedKey === 'cat' ? <IoCheckmarkOutline size={13} className="text-[#00A389]" /> : <IoCopyOutline size={13} />}
                  </button>
                </span>
              )}
              {product.casNumber && (
                <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-md bg-[#E6F7F5] text-[#00A389] border border-[#B3E7E2]/80 flex items-center gap-1.5">
                  <span>CAS: {product.casNumber}</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(product.casNumber, 'cas')}
                    className="hover:text-[#078F83] p-0.5 transition-colors cursor-pointer"
                    title="Copy CAS Number"
                  >
                    {copiedKey === 'cas' ? <IoCheckmarkOutline size={13} className="text-emerald-600" /> : <IoCopyOutline size={13} />}
                  </button>
                </span>
              )}
              <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                {product.stock || 'Instock'}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {product.name}
            </h3>
            {product.chemicalName && (
              <p className="text-xs text-slate-500 font-mono italic mt-1 line-clamp-2">
                IUPAC: {product.chemicalName}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-all cursor-pointer shrink-0 active:scale-90"
            aria-label="Close product details"
          >
            <IoCloseOutline size={22} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          {/* Chemical 2D Structure Canvas */}
          <div className="rounded-2xl bg-white border border-slate-200/90 p-4 shadow-2xs relative">
            <div className="w-full h-52 sm:h-60 bg-gradient-to-b from-slate-50 to-white rounded-xl border border-slate-100 flex items-center justify-center p-3 relative overflow-hidden">
              <CompoundStructureThumbnail item={product} isModal={true} className="w-full h-full" />
            </div>
          </div>

          {/* Technical Specifications Matrix (identical to product page) */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs bg-white">
            <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Technical Specifications</span>
              <span className="text-[11px] font-mono text-slate-500">Lot & Batch Verified</span>
            </div>
            <table className="w-full text-xs">
              <tbody className="divide-y divide-slate-100">
                {product.catNumber && (
                  <tr className="bg-slate-50/40">
                    <td className="py-2.5 px-4 font-semibold text-slate-500 w-1/3">Catalog Number</td>
                    <td className="py-2.5 px-4 font-mono font-bold text-slate-900">{product.catNumber}</td>
                  </tr>
                )}
                {product.casNumber && (
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-slate-500">CAS Registry No</td>
                    <td className="py-2.5 px-4 font-mono font-bold text-[#00A389]">{product.casNumber}</td>
                  </tr>
                )}
                {product.molecularFormula && (
                  <tr className="bg-slate-50/40">
                    <td className="py-2.5 px-4 font-semibold text-slate-500">Molecular Formula</td>
                    <td className="py-2.5 px-4 font-semibold text-slate-900 font-mono">
                      {formatMolecularFormula(product.molecularFormula)}
                    </td>
                  </tr>
                )}
                {product.molecularWeight && (
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-slate-500">Molecular Weight</td>
                    <td className="py-2.5 px-4 font-mono font-semibold text-slate-900">{product.molecularWeight}</td>
                  </tr>
                )}
                <tr className="bg-slate-50/40">
                  <td className="py-2.5 px-4 font-semibold text-slate-500">Purity Standard</td>
                  <td className="py-2.5 px-4 font-mono font-semibold text-emerald-800">{product.purity || '≥ 98.5% (HPLC)'}</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-semibold text-slate-500">Stock Availability</td>
                  <td className="py-2.5 px-4">
                    <span className="font-semibold text-emerald-700">
                      {product.stock || 'Instock'} (Ready for dispatch)
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Quotation Adjustment Controls in Modal */}
          <div className="p-4 rounded-2xl bg-[#E6F7F5]/40 border border-[#B3E7E2]/70 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-700">Adjust Inquiry:</span>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-500 font-medium">Pack:</span>
                <select
                  value={localPackSize}
                  onChange={(e) => handlePackChange(e.target.value)}
                  className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white font-mono text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#00A389] focus:border-[#00A389] cursor-pointer"
                >
                  {PACK_SIZES.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-500 font-medium">Quantity:</span>
              <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white p-0.5">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => handleQtyChange(localQty - 1)}
                  className="w-6 h-6 rounded flex items-center justify-center bg-slate-50 hover:bg-slate-100 text-slate-700 active:scale-90 font-bold transition-all cursor-pointer text-xs"
                >
                  -
                </button>
                <span className="px-3 font-mono text-xs font-bold text-slate-800">
                  {localQty}
                </span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => handleQtyChange(localQty + 1)}
                  className="w-6 h-6 rounded flex items-center justify-center bg-slate-50 hover:bg-slate-100 text-slate-700 active:scale-90 font-bold transition-all cursor-pointer text-xs"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Actions Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3 shrink-0">
          <Link
            href={productUrl}
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-[#00A389] font-medium transition-colors cursor-pointer"
          >
            <span>View Complete Product Dossier</span>
            <IoArrowForward size={14} />
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDirectWhatsApp}
              className="py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] active:scale-[0.98] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <IoLogoWhatsapp size={18} />
              <span>Direct WhatsApp RFQ</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white font-semibold text-xs sm:text-sm transition-all cursor-pointer"
            >
              Return to List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useEnquiryCart } from '@/context/EnquiryCartContext';
import { formatMolecularFormula, copyToClipboard } from '@/utils/chemUtils';
import { useScrollReveal } from '@/utils/useScrollReveal';
import { IoFlaskOutline, IoArrowForward, IoCheckmarkCircle, IoCopyOutline } from 'react-icons/io5';

export default function FeaturedCompounds() {
  const { addToCart } = useEnquiryCart();
  const sectionRef = useScrollReveal({ threshold: 0.1 });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);
  const [addedIds, setAddedIds] = useState({});

  useEffect(() => {
    let isMounted = true;
    async function loadFeatured() {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);
      try {
        const res = await fetch('/api/products?limit=4', { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await res.json();
        if (data.success && Array.isArray(data.products) && isMounted) {
          setProducts(data.products);
        } else if (isMounted) {
          setProducts([]);
        }
      } catch (err) {
        if (isMounted) setProducts([]);
      } finally {
        clearTimeout(timeoutId);
        if (isMounted) setLoading(false);
      }
    }
    loadFeatured();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleCopyCas = async (e, id, cas) => {
    e.preventDefault();
    e.stopPropagation();
    if (!cas || cas === 'N/A') return;
    const ok = await copyToClipboard(cas);
    if (ok) {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    }
  };

  const handleAdd = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, { packSize: '10mg', quantity: 1, autoOpen: false });
    setAddedIds((prev) => ({ ...prev, [product._id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product._id]: false }));
    }, 1800);
  };

  return (
    <section
      ref={sectionRef}
      className="scroll-reveal py-16 sm:py-20 bg-white border-t border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6F7F5] text-[#08A698] border border-[#B3E7E2] text-xs font-mono font-medium mb-3">
              <IoFlaskOutline size={14} />
              <span>AUTHENTICATED REFERENCE STANDARDS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0E2358] tracking-tight">
              Featured Chemical Compounds
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl leading-relaxed">
              Synthesized reference materials and isotope-labelled standards ready for immediate dispatch or technical quotation.
            </p>
          </div>

          <Link
            href="/products/all"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#08A698] hover:text-[#078F83] font-mono transition-colors group flex-shrink-0"
          >
            <span>Browse Full Catalog</span>
            <IoArrowForward size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-80 rounded-2xl bg-slate-50 border border-slate-200 p-5 animate-pulse flex flex-col justify-between"
              >
                <div className="h-36 bg-slate-200 rounded-xl mb-4" />
                <div className="space-y-2">
                  <div className="w-3/4 h-5 bg-slate-200 rounded" />
                  <div className="w-1/2 h-4 bg-slate-200 rounded" />
                </div>
                <div className="w-full h-9 bg-slate-200 rounded-xl mt-4" />
              </div>
            ))}
          </div>
        )}

        {/* Products Grid */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p, idx) => {
              const subSlug = p.subCategory?.slug || p.subCategorySlug || 'catalog';
              const pSlug = p.slug || p.name.toLowerCase().replace(/\s+/g, '-');
              const linkUrl = `/products/browse/${encodeURIComponent(subSlug)}/${encodeURIComponent(pSlug)}`;
              const isAdded = addedIds[p._id];
              const delayClass = ['delay-100', 'delay-150', 'delay-200', 'delay-250'][idx % 4];

              return (
                <div
                  key={p._id}
                  className={`card-hover-scientific group rounded-2xl bg-[#F8FAFC] border border-slate-200 p-5 flex flex-col justify-between ${delayClass}`}
                >
                  <div>
                    {/* Header Badges */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      {p.catNumber ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#0E2358] text-white">
                          {p.catNumber}
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-slate-200 text-slate-700">
                          STANDARD
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-[#E6F7F5] text-[#08A698] border border-[#B3E7E2]">
                        {p.stock === 'Out of stock' ? 'Made to Order' : 'In Stock'}
                      </span>
                    </div>

                    {/* Image Area */}
                    <Link href={linkUrl} className="block relative h-40 w-full rounded-xl bg-white border border-slate-100 overflow-hidden mb-4 p-3 flex items-center justify-center">
                      {p.image ? (
                        <Image
                          src={p.image}
                          alt={p.name}
                          fill
                          unoptimized
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-contain p-2 group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-slate-300 space-y-1">
                          <IoFlaskOutline size={32} className="text-slate-400" />
                          <span className="text-[10px] font-mono uppercase">Chemical Structure</span>
                        </div>
                      )}
                    </Link>

                    {/* Compound Name */}
                    <Link href={linkUrl} className="block group-hover:text-[#08A698] transition-colors">
                      <h3 className="text-sm font-bold text-[#0E2358] line-clamp-2 leading-snug" title={p.name}>
                        {p.name}
                      </h3>
                    </Link>

                    {/* Chemical Metadata */}
                    <div className="mt-3 space-y-1.5 text-xs">
                      {p.casNumber && p.casNumber !== 'N/A' && (
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400 font-mono text-[11px]">CAS:</span>
                          <button
                            type="button"
                            onClick={(e) => handleCopyCas(e, p._id, p.casNumber)}
                            className="inline-flex items-center gap-1 font-mono text-[11px] text-slate-700 hover:text-[#08A698] active:scale-95 transition-all cursor-pointer"
                            title="Click to copy CAS"
                          >
                            <span>{p.casNumber}</span>
                            {copiedId === p._id ? (
                              <IoCheckmarkCircle size={12} className="text-[#08A698] animate-pulse" />
                            ) : (
                              <IoCopyOutline size={12} className="text-slate-400" />
                            )}
                          </button>
                        </div>
                      )}

                      {p.molecularFormula && (
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400 font-mono text-[11px]">Formula:</span>
                          <span className="font-mono text-[11px] text-slate-700">
                            {formatMolecularFormula(p.molecularFormula)}
                          </span>
                        </div>
                      )}

                      {p.molecularWeight && (
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400 font-mono text-[11px]">Mol Wt:</span>
                          <span className="font-mono text-[11px] text-slate-700">
                            {p.molecularWeight} g/mol
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 mt-4 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={(e) => handleAdd(e, p)}
                      className={`w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 active:scale-[0.98] shadow-xs cursor-pointer ${
                        isAdded
                          ? 'bg-emerald-600 text-white scale-[1.01]'
                          : 'bg-[#08A698] hover:bg-[#078F83] text-white hover:shadow-md'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <IoCheckmarkCircle size={15} />
                          <span>Added to Quote!</span>
                        </>
                      ) : (
                        <>
                          <IoFlaskOutline size={15} />
                          <span>+ Add to Quote</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

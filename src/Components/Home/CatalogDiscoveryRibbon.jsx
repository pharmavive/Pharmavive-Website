'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  IoSearchOutline,
  IoCloseOutline,
  IoArrowForward,
  IoFlaskOutline,
  IoFilterOutline,
  IoSyncOutline,
} from 'react-icons/io5';
import { useScrollReveal } from '@/utils/useScrollReveal';

const QUICK_FILTERS = [
  { label: 'API Impurities', href: '/products/category/api-impurity-standards' },
  { label: 'Reagents', href: '/products/category/reagents' },
  { label: 'Building Blocks', href: '/products/category/building-blocks' },
  { label: 'Nitrosamines', href: '/products/category/nitrosamines' },
  { label: 'Custom Synthesis CDMO', href: '/products/category/cdmo' },
];

export default function CatalogDiscoveryRibbon() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef(null);
  const scrollRef = useScrollReveal({ threshold: 0.1 });

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced autocomplete lookup against real API
  useEffect(() => {
    if (!query.trim() || query.trim().length < 2) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/products?search=${encodeURIComponent(query.trim())}&limit=4`);
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.products)) {
            setSuggestions(data.products.slice(0, 4));
            setIsOpen(true);
          }
        }
      } catch (err) {
        console.error('Catalog autocomplete error:', err);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <section ref={scrollRef} className="scroll-reveal relative z-20 -mt-7 sm:-mt-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        ref={wrapperRef}
        className="rounded-2xl bg-white border border-[#E2E8F0] shadow-lg shadow-slate-200/50 p-3 sm:p-4 transition-all hover:border-[#B3E7E2]"
      >
        {/* Search Input Bar */}
        <form onSubmit={handleSearch} className="relative flex flex-col sm:flex-row items-stretch gap-2.5 w-full">
          <div className="relative flex-1 min-w-0 flex items-center bg-[#F8FAFC] border border-[#CBD5E1] rounded-2xl px-4 focus-within:border-[#00A389] focus-within:bg-white focus-within:ring-3 focus-within:ring-[#00A389]/15 transition-all duration-200">
            <IoSearchOutline className="text-[#00A389] flex-shrink-0 transition-transform duration-200 group-focus-within:scale-110" size={20} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by CAS # (e.g. 69427-46-9), compound name, or catalog code..."
              className="w-full min-w-0 bg-transparent px-3 py-3.5 text-xs sm:text-sm text-[#0E2358] placeholder-[#94A3B8] focus:outline-none font-sans"
            />
            {loading && (
              <IoSyncOutline className="text-[#00A389] animate-spin flex-shrink-0 mr-1.5" size={18} />
            )}
            {query && !loading && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setIsOpen(false);
                }}
                className="text-[#94A3B8] hover:text-[#0E2358] p-1 transition-colors cursor-pointer"
                aria-label="Clear search"
              >
                <IoCloseOutline size={18} />
              </button>
            )}
          </div>

          <button
            type="submit"
            className="px-7 py-3.5 rounded-2xl bg-[#00A389] hover:bg-[#008F78] text-white font-semibold text-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 cursor-pointer flex-shrink-0 group"
          >
            <span>Search Catalog</span>
            <IoArrowForward size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
          </button>

          {/* Autocomplete Dropdown with Smooth Animation */}
          {isOpen && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl border border-[#E2E8F0] shadow-xl z-50 overflow-hidden divide-y divide-[#F1F5F9] animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-2 bg-[#F8FAFC] text-[11px] font-mono text-[#64748B] flex items-center justify-between">
                <span>VERIFIED CATALOG MATCHES</span>
                <span>Press Enter to view all results</span>
              </div>
              {suggestions.length > 0 ? (
                suggestions.map((p) => (
                  <Link
                    key={p._id}
                    href={`/products/${p.slug || p._id}`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between px-4 py-3 hover:bg-[#EBF7F6] transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#F1F5F9] group-hover:bg-white text-[#08A698] flex items-center justify-center flex-shrink-0 transition-colors">
                        <IoFlaskOutline size={16} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#0E2358] group-hover:text-[#08A698] transition-colors">
                          {p.title || p.name}
                        </div>
                        <div className="text-xs text-[#64748B] flex items-center gap-2 font-mono">
                          {p.casNumber && p.casNumber !== 'NA' && <span>CAS: {p.casNumber}</span>}
                          {p.catNo && <span>Cat: {p.catNo}</span>}
                        </div>
                      </div>
                    </div>
                    <IoArrowForward size={16} className="text-[#94A3B8] group-hover:text-[#08A698] group-hover:translate-x-1 transition-all" />
                  </Link>
                ))
              ) : (
                <div className="p-4 text-center text-xs text-[#64748B]">
                  No exact compounds found for &ldquo;{query}&rdquo;. Press Enter to view full directory search.
                </div>
              )}
            </div>
          )}
        </form>

        {/* Quick Sourcing Category Filters with subtle hover */}
        <div className="mt-3 pt-3 border-t border-[#F1F5F9] flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#64748B] mr-1">
            <IoFilterOutline size={13} className="text-[#00A389]" />
            <span>Quick Filters:</span>
          </div>
          {QUICK_FILTERS.map((f, i) => (
            <Link
              key={i}
              href={f.href}
              className="px-3.5 py-1 rounded-full bg-[#F8FAFC] hover:bg-[#EBF7F6] border border-[#CBD5E1]/60 hover:border-[#00A389]/40 text-xs font-medium text-[#475569] hover:text-[#00A389] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
            >
              {f.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

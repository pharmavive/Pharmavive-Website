// src/Components/Products/CatalogProductsExplorer.jsx
'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useEnquiryCart } from '@/context/EnquiryCartContext';
import CompoundStructureThumbnail from '@/Components/EnquiryCart/CompoundStructureThumbnail';
import { formatMolecularFormula } from '@/utils/chemUtils';
import { setCachedProduct, prefetchProduct } from '@/utils/clientCache';
import {
  IoSearchOutline,
  IoCloseOutline,
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoRefreshOutline,
  IoHeartOutline,
  IoHeart,
  IoCartOutline,
  IoArrowForward,
  IoGridOutline,
  IoListOutline,
  IoCheckmarkCircle,
  IoFilterOutline,
} from 'react-icons/io5';

// Category quick-filter tabs matching MongoDB Atlas collections
const CATEGORY_TABS = [
  'All',
  'API Impurity Standards',
  'Speciality Chemicals',
  'Building Blocks',
  'Peptide Coupling Reagents',
  'Nitrosamines',
  'Stable Isotopes',
];

// Module-level client cache for instant zero-latency tab and page navigation
const catalogClientCache = new Map();

export default function CatalogProductsExplorer() {
  const { addToCart, isInCart } = useEnquiryCart();
  const catalogAnchorRef = useRef(null);

  const initialCacheKey = '1_20__all';
  const initialCached = catalogClientCache.get(initialCacheKey);

  // Live products from MongoDB
  const [products, setProducts] = useState(initialCached?.products || []);
  const [totalCount, setTotalCount] = useState(initialCached?.totalCount || 0);
  const [loading, setLoading] = useState(!initialCached);
  const [error, setError] = useState(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedStockOnly, setSelectedStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [wishlist, setWishlist] = useState([]);
  const [addedToast, setAddedToast] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [jumpPageInput, setJumpPageInput] = useState('');

  // Fetch live products from MongoDB via /api/products
  useEffect(() => {
    const cacheKey = `${currentPage}_${itemsPerPage}_${searchQuery.trim().toLowerCase()}_${activeCategory.toLowerCase()}`;
    const cached = catalogClientCache.get(cacheKey);
    if (cached) {
      setProducts(cached.products || []);
      setTotalCount(cached.totalCount || 0);
      setLoading(false);
      setError(null);
      return;
    }

    let isMounted = true;
    setLoading(true);
    setError(null);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const params = new URLSearchParams();
    params.set('page', String(currentPage));
    params.set('limit', String(itemsPerPage));
    if (searchQuery.trim()) {
      params.set('search', searchQuery.trim());
    }
    if (activeCategory !== 'All') {
      let mapped = activeCategory.toLowerCase().replace(/\s+/g, '-');
      if (activeCategory === 'API Impurity Standards') {
        mapped = 'api-impurity-standards';
      } else if (activeCategory === 'Speciality Chemicals') {
        mapped = 'speciality-chemicals';
      } else if (activeCategory === 'Building Blocks') {
        mapped = 'building-blocks';
      } else if (activeCategory === 'Peptide Coupling Reagents') {
        mapped = 'peptide-coupling-reagents';
      }
      params.set('mainCategorySlug', mapped);
    }

    fetch(`/api/products?${params.toString()}`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        clearTimeout(timeoutId);
        if (data.success && isMounted) {
          const prods = data.products || [];
          const count = data.totalCount || 0;
          setProducts(prods);
          setTotalCount(count);
          setError(null);

          // Cache client-side for instant revisit
          catalogClientCache.set(cacheKey, { products: prods, totalCount: count });

          // Also seed individual products into global productCache so clicking ANY product opens in 0ms!
          prods.forEach((p) => {
            if (p.slug) {
              setCachedProduct(p.slug, { product: p, relatedProducts: [] });
            }
          });
        } else if (isMounted) {
          setProducts([]);
          setTotalCount(0);
          setError(data.error || 'Failed to fetch products');
        }
        if (isMounted) setLoading(false);
      })
      .catch((err) => {
        clearTimeout(timeoutId);
        if (isMounted && err.name !== 'AbortError') {
          setProducts([]);
          setTotalCount(0);
          setError('Unable to load compounds from database. Please check your connection.');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [currentPage, itemsPerPage, searchQuery, activeCategory]);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setActiveCategory('All');
    setSelectedStockOnly(false);
    setSortBy('popular');
    setCurrentPage(1);
  };

  const handleAddToCart = (item) => {
    addToCart(
      {
        _id: item._id,
        name: item.name,
        catNumber: item.catNumber,
        casNumber: item.casNumber,
        molecularFormula: item.molecularFormula,
        molecularWeight: item.molecularWeight,
        image: item.image,
        slug: item.slug,
        subCategory: item.subCategory,
      },
      { quantity: 1, packSize: '50mg', autoOpen: true }
    );
    setAddedToast(item.name);
    setTimeout(() => setAddedToast(null), 3000);
  };

  // Filter and sort client-side adjustments (e.g. stock toggle and sorting)
  const displayedProducts = useMemo(() => {
    let list = [...products];
    if (selectedStockOnly) {
      list = list.filter((p) => p.stock === 'Instock');
    }

    if (sortBy === 'name-asc') {
      list.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    } else if (sortBy === 'name-desc') {
      list.sort((a, b) => (b.name || '').localeCompare(a.name || ''));
    } else if (sortBy === 'mw-asc') {
      list.sort((a, b) => (parseFloat(a.molecularWeight) || 0) - (parseFloat(b.molecularWeight) || 0));
    } else if (sortBy === 'mw-desc') {
      list.sort((a, b) => (parseFloat(b.molecularWeight) || 0) - (parseFloat(a.molecularWeight) || 0));
    }
    return list;
  }, [products, selectedStockOnly, sortBy]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(totalCount / itemsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  // Scroll smoothly to catalog top on page change
  const scrollToCatalogTop = () => {
    if (catalogAnchorRef.current) {
      catalogAnchorRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const goToPage = (pageNumber) => {
    const page = Math.max(1, Math.min(pageNumber, totalPages));
    setCurrentPage(page);
    scrollToCatalogTop();
  };

  const handleJumpSubmit = (e) => {
    e.preventDefault();
    const parsed = parseInt(jumpPageInput, 10);
    if (!isNaN(parsed) && parsed >= 1 && parsed <= totalPages) {
      goToPage(parsed);
      setJumpPageInput('');
    }
  };

  // Generate sliding pagination numbers
  const pageNumbers = useMemo(() => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (safeCurrentPage > 3) pages.push('...');

      const start = Math.max(2, safeCurrentPage - 1);
      const end = Math.min(totalPages - 1, safeCurrentPage + 1);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (safeCurrentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  }, [totalPages, safeCurrentPage]);

  const hasActiveFilters = searchQuery !== '' || activeCategory !== 'All' || selectedStockOnly;

  return (
    <section ref={catalogAnchorRef} className="py-10 bg-[#F8FCFB] border-t border-[#E5F2EE]">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 space-y-6">

        {/* ================================================================
            EXPANDED SEARCH BAR & QUICK FILTERS (FULL WIDTH)
            ================================================================ */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#D5EFEA] shadow-[0_8px_30px_-10px_rgba(0,163,137,0.1)] space-y-4">
          
          {/* Main Search Input */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <IoSearchOutline size={20} className="text-[#00A389]" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search by Product Name, CAS No., Catalog No., or Molecular Formula..."
                className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-[#F4FAF8] hover:bg-[#EBF7F4] focus:bg-white border border-[#D5EFEA] focus:border-[#00A389] focus:ring-4 focus:ring-[#00A389]/15 text-sm text-[#0E2358] placeholder:text-slate-400 transition-all outline-none font-medium"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setCurrentPage(1);
                  }}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <IoCloseOutline size={18} />
                </button>
              )}
            </div>

            {/* Quick Actions: In Stock Toggle & Clear */}
            <div className="flex items-center gap-2.5 shrink-0 self-end md:self-auto">
              <button
                type="button"
                onClick={() => {
                  setSelectedStockOnly((prev) => !prev);
                  setCurrentPage(1);
                }}
                className={`px-3.5 py-2.5 rounded-2xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
                  selectedStockOnly
                    ? 'bg-[#EBF7F4] border-[#00A389] text-[#00897B]'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${selectedStockOnly ? 'bg-[#00A389]' : 'bg-slate-300'}`} />
                <span>In Stock Only</span>
              </button>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-red-500 bg-red-50 hover:bg-red-100 border border-red-100 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <IoRefreshOutline size={14} />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Category Horizontal Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
            <span className="text-xs font-mono text-slate-400 font-bold uppercase shrink-0 flex items-center gap-1 mr-1">
              <IoFilterOutline size={13} className="text-[#00A389]" />
              Category:
            </span>
            {CATEGORY_TABS.map((tab) => {
              const isActive = activeCategory === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => {
                    setActiveCategory(tab);
                    setCurrentPage(1);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs whitespace-nowrap transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-[#00A389] text-white font-bold shadow-[0_0_12px_rgba(0,163,137,0.4)] ring-2 ring-[#00E5BE]/50'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium hover:border-[#00E5BE]/30'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Added to cart toast notification */}
        {addedToast && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#0E2358] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-[#00A389]/40 animate-in fade-in slide-in-from-bottom-4">
            <IoCheckmarkCircle className="text-[#00A389]" size={20} />
            <span className="text-xs sm:text-sm font-medium">Added <strong>{addedToast}</strong> to Enquiry Cart!</span>
          </div>
        )}

        {/* Error Notification Banner if fetch fails */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-3 rounded-2xl text-xs sm:text-sm font-medium flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={() => {
                setCurrentPage(1);
              }}
              className="underline font-bold text-xs"
            >
              Retry
            </button>
          </div>
        )}

        {/* ================================================================
            TOP CONTROL BAR: PAGE INDICATOR + COUNTER + SORT + VIEW TOGGLE
            ================================================================ */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white px-5 py-3.5 rounded-2xl border border-[#D5EFEA] shadow-2xs">
          
          {/* Results Counter with Page Badge */}
          <div className="flex items-center flex-wrap gap-2.5">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#EBF7F4] text-[#00897B] border border-[#B3E7E2] shadow-[0_0_10px_rgba(0,163,137,0.15)]">
              Page {safeCurrentPage} of {totalPages}
            </span>

            <span className="text-xs sm:text-sm font-mono text-slate-500 font-semibold">
              Showing {totalCount > 0 ? (safeCurrentPage - 1) * itemsPerPage + 1 : 0} - {Math.min(safeCurrentPage * itemsPerPage, totalCount)} of {totalCount.toLocaleString()} products
            </span>

            {activeCategory !== 'All' && (
              <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-md">
                Filtered by {activeCategory}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto flex-wrap">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-400 font-medium">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs font-semibold text-[#0E2358] bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 focus:border-[#00A389] outline-none cursor-pointer"
              >
                <option value="popular">Database Order</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
                <option value="mw-asc">MW: Low to High</option>
                <option value="mw-desc">MW: High to Low</option>
              </select>
            </div>

            {/* Items Per Page */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-400 font-medium">Per Page:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="text-xs font-semibold text-[#0E2358] bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 focus:border-[#00A389] outline-none cursor-pointer"
              >
                <option value={15}>15</option>
                <option value={20}>20</option>
                <option value={25}>25</option>
                <option value={40}>40</option>
              </select>
            </div>

            {/* View Mode Toggle: Grid / List */}
            <div className="flex items-center border border-slate-200 rounded-xl p-0.5 bg-slate-50">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-[#00A389] text-white shadow-2xs'
                    : 'text-slate-500 hover:text-[#0E2358]'
                }`}
                title="Grid View"
              >
                <IoGridOutline size={15} />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-[#00A389] text-white shadow-2xs'
                    : 'text-slate-500 hover:text-[#0E2358]'
                }`}
                title="List View"
              >
                <IoListOutline size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* ================================================================
            5-COLUMN PRODUCT GRID (FULL WIDTH - MONGODB LIVE DATA)
            ================================================================ */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
            {[...Array(itemsPerPage > 20 ? 20 : itemsPerPage)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl border border-[#D5EFEA] p-4 sm:p-5 flex flex-col justify-between h-80 animate-pulse"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="w-16 h-4 bg-slate-100 rounded" />
                  <div className="w-5 h-5 bg-slate-100 rounded-full" />
                </div>
                <div className="w-full h-32 bg-slate-50 rounded-2xl mb-3" />
                <div className="space-y-2">
                  <div className="w-3/4 h-4 bg-slate-100 rounded" />
                  <div className="w-1/2 h-3 bg-slate-100 rounded" />
                </div>
                <div className="w-full h-8 bg-slate-100 rounded-full mt-3" />
              </div>
            ))}
          </div>
        ) : displayedProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-14 text-center border border-[#D5EFEA] space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <IoSearchOutline size={30} />
            </div>
            <h3 className="text-lg font-bold text-[#0E2358]">No chemical compounds match your current filters</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Try adjusting your search query, choosing a different category, or resetting all filters.
            </p>
            <button
              type="button"
              onClick={handleClearFilters}
              className="px-6 py-2.5 rounded-full bg-[#00A389] text-white font-semibold text-xs transition-all shadow-xs cursor-pointer hover:shadow-[0_0_18px_rgba(0,163,137,0.4)]"
            >
              Reset All Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
            {displayedProducts.map((prod) => {
              const inCart = isInCart(prod._id);
              const isWishlisted = wishlist.includes(prod._id);
              const subSlug = prod.subCategory?.slug || 'api-impurity-standards';
              const catName = prod.subCategory?.mainCategory?.name || prod.subCategory?.name || 'Standard';

              return (
                <div
                  key={prod._id}
                  className="bg-white rounded-3xl border border-[#D5EFEA] card-glow-hover hover:border-[#00E5BE]/70 hover:-translate-y-1.5 transition-transform duration-200 ease-out p-4 sm:p-5 flex flex-col justify-between group relative"
                >
                  {/* Top Row: Category Pill Badge + Wishlist Heart Button */}
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold border bg-[#E2F7F4] text-[#00897B] border-[#B3E7E2] truncate max-w-[130px]"
                      title={catName}
                    >
                      {catName}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleWishlist(prod._id)}
                      className={`p-1 rounded-full transition-colors cursor-pointer ${
                        isWishlisted ? 'text-red-500' : 'text-slate-400 hover:text-red-500'
                      }`}
                      title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                    >
                      {isWishlisted ? <IoHeart size={16} /> : <IoHeartOutline size={16} />}
                    </button>
                  </div>

                  {/* 2D Chemical Structure Canvas */}
                  <div className="relative w-full h-32 flex items-center justify-center my-1 bg-[#F8FCFB] rounded-2xl border border-slate-100 p-2 group-hover:scale-102 group-hover:border-[#00A389]/30 group-hover:shadow-[0_0_15px_rgba(0,163,137,0.15)] transition-all duration-300">
                    <CompoundStructureThumbnail item={prod} className="w-full h-full object-contain" />
                  </div>

                  {/* Compound Name & Identifiers */}
                  <div className="mt-2.5 space-y-1">
                    <h3 className="font-extrabold text-sm text-[#0E2358] leading-snug line-clamp-1 group-hover:text-[#00A389] transition-colors" title={prod.name}>
                      <Link
                        href={`/products/browse/${encodeURIComponent(subSlug.toLowerCase())}/${encodeURIComponent(prod.slug || '')}`}
                        prefetch={true}
                        onMouseEnter={() => prefetchProduct(prod.slug)}
                      >
                        {prod.name}
                      </Link>
                    </h3>

                    {/* CAS and Cat No */}
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                      <span>CAS No. <strong>{prod.casNumber || 'N/A'}</strong></span>
                    </div>
                    <div className="text-[10.5px] font-mono text-slate-400 truncate">
                      Cat No. {prod.catNumber || 'PV-N/A'}
                    </div>
                  </div>

                  {/* Chemical Specifications Matrix (2 Columns) */}
                  <div className="my-2.5 pt-2.5 border-t border-slate-100 text-[11px] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Formula</span>
                      <span className="font-mono font-semibold text-slate-700 text-right truncate max-w-[120px]">
                        {prod.molecularFormula ? formatMolecularFormula(prod.molecularFormula) : 'N/A'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Weight</span>
                      <span className="font-mono font-semibold text-slate-700 truncate max-w-[120px]">
                        {prod.molecularWeight ? `${prod.molecularWeight} g/mol` : 'N/A'}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons: View Details + Cart Button */}
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                    <Link
                      href={`/products/browse/${encodeURIComponent(subSlug.toLowerCase())}/${encodeURIComponent(prod.slug || '')}`}
                      className="flex-1 py-2 px-3 rounded-full bg-[#0E2358] hover:bg-[#09413E] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-2xs group-hover:bg-[#00A389] group-hover:shadow-[0_0_15px_rgba(0,163,137,0.35)]"
                    >
                      <span>View Details</span>
                      <IoArrowForward size={12} />
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleAddToCart(prod)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-2xs ${
                        inCart
                          ? 'bg-[#00A389] text-white shadow-[0_0_10px_rgba(0,163,137,0.5)]'
                          : 'bg-[#EBF7F4] text-[#00897B] hover:bg-[#00A389] hover:text-white hover:shadow-[0_0_10px_rgba(0,163,137,0.35)]'
                      }`}
                      title="Add to Enquiry Cart"
                    >
                      <IoCartOutline size={15} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* List View Table (Full-Width Responsive Data Table) */
          <div className="bg-white rounded-3xl border border-[#D5EFEA] shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F4FAF8] border-b border-[#D5EFEA] font-mono text-[11px] text-slate-500 uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Compound</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">CAS Number</th>
                    <th className="py-3 px-4">Formula</th>
                    <th className="py-3 px-4">Mol. Weight</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {displayedProducts.map((prod) => {
                    const subSlug = prod.subCategory?.slug || 'api-impurity-standards';
                    const catName = prod.subCategory?.mainCategory?.name || prod.subCategory?.name || 'Standard';

                    return (
                      <tr key={prod._id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4 font-bold text-[#0E2358]">
                          <Link
                            href={`/products/browse/${encodeURIComponent(subSlug.toLowerCase())}/${encodeURIComponent(prod.slug || '')}`}
                            prefetch={true}
                            onMouseEnter={() => prefetchProduct(prod.slug)}
                            className="hover:text-[#00A389]"
                          >
                            {prod.name}
                          </Link>
                          <span className="block text-[10px] font-mono text-slate-400 font-normal">{prod.catNumber || 'PV-N/A'}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#E2F7F4] text-[#00897B] border border-[#B3E7E2]">
                            {catName}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono font-semibold">{prod.casNumber || 'N/A'}</td>
                        <td className="py-3 px-4 font-mono">{prod.molecularFormula ? formatMolecularFormula(prod.molecularFormula) : 'N/A'}</td>
                        <td className="py-3 px-4 font-mono">{prod.molecularWeight ? `${prod.molecularWeight} g/mol` : 'N/A'}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            prod.stock === 'Instock' ? 'bg-[#EBF7F4] text-[#00897B]' : 'bg-amber-50 text-amber-700'
                          }`}>
                            {prod.stock || 'Instock'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/products/browse/${encodeURIComponent(subSlug.toLowerCase())}/${encodeURIComponent(prod.slug || '')}`}
                              prefetch={true}
                              onMouseEnter={() => prefetchProduct(prod.slug)}
                              className="px-3 py-1 rounded-full bg-slate-100 hover:bg-[#00A389] hover:text-white font-semibold text-[11px] transition-colors"
                            >
                              View
                            </Link>
                            <button
                              type="button"
                              onClick={() => handleAddToCart(prod)}
                              className="p-1.5 rounded-full bg-[#EBF7F4] text-[#00897B] hover:bg-[#00A389] hover:text-white transition-colors cursor-pointer"
                              title="Add to Cart"
                            >
                              <IoCartOutline size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================================================================
            PAGINATION CONTROLS (Live Total Pages from MongoDB)
            ================================================================ */}
        {!loading && totalPages > 1 && (
          <div className="bg-white rounded-3xl p-5 border border-[#D5EFEA] shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Left: Current Page Pill & Range */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-[#0E2358] bg-[#EBF7F4] px-3.5 py-1.5 rounded-full border border-[#B3E7E2]">
                Page {safeCurrentPage} of {totalPages}
              </span>
              <span className="text-xs text-slate-500 font-mono hidden sm:inline">
                ({totalCount.toLocaleString()} Total Products in MongoDB)
              </span>
            </div>

            {/* Center: Pagination Button Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-center">
              {/* Previous Button */}
              <button
                type="button"
                onClick={() => goToPage(safeCurrentPage - 1)}
                disabled={safeCurrentPage === 1}
                className={`px-3.5 py-2 rounded-2xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  safeCurrentPage === 1
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                    : 'bg-white hover:bg-[#00A389] text-slate-700 hover:text-white border border-[#D5EFEA] shadow-2xs'
                }`}
              >
                <IoChevronBackOutline size={14} />
                <span>Previous</span>
              </button>

              {/* Numbered Page Buttons */}
              {pageNumbers.map((page, idx) => {
                if (page === '...') {
                  return (
                    <span key={`ellipsis-${idx}`} className="px-2 py-1 text-slate-400 font-bold text-xs select-none">
                      ...
                    </span>
                  );
                }

                const isActive = page === safeCurrentPage;
                return (
                  <button
                    key={`page-${page}`}
                    type="button"
                    onClick={() => goToPage(page)}
                    className={`w-9 h-9 rounded-2xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-[#00A389] text-white shadow-[0_0_14px_rgba(0,163,137,0.45)] ring-2 ring-[#00E5BE]/60 scale-105'
                        : 'bg-white hover:bg-slate-100 text-slate-700 border border-[#D5EFEA] hover:border-[#00E5BE]/40'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              {/* Next Button */}
              <button
                type="button"
                onClick={() => goToPage(safeCurrentPage + 1)}
                disabled={safeCurrentPage === totalPages}
                className={`px-3.5 py-2 rounded-2xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  safeCurrentPage === totalPages
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                    : 'bg-white hover:bg-[#00A389] text-slate-700 hover:text-white border border-[#D5EFEA] shadow-2xs'
                }`}
              >
                <span>Next</span>
                <IoChevronForwardOutline size={14} />
              </button>
            </div>

            {/* Right: Direct Jump to Page Form */}
            <form onSubmit={handleJumpSubmit} className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Go to:</span>
              <input
                type="number"
                min="1"
                max={totalPages}
                value={jumpPageInput}
                onChange={(e) => setJumpPageInput(e.target.value)}
                placeholder={String(safeCurrentPage)}
                className="w-14 px-2 py-1.5 text-center text-xs font-mono font-semibold border border-slate-200 rounded-xl focus:border-[#00A389] outline-none"
              />
              <span className="text-xs text-slate-400 font-mono">/ {totalPages}</span>
              <button
                type="submit"
                className="px-3 py-1.5 bg-slate-100 hover:bg-[#00A389] hover:text-white text-slate-700 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Go
              </button>
            </form>

          </div>
        )}

      </div>
    </section>
  );
}

'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { capitalizeWords } from '@/utils/stringUtils';
import { formatMolecularFormula, copyToClipboard } from '@/utils/chemUtils';
import { useEnquiryCart } from '@/context/EnquiryCartContext';
import CompoundStructureThumbnail from '@/Components/EnquiryCart/CompoundStructureThumbnail';
import {
  IoFlaskOutline,
  IoCopyOutline,
  IoCheckmarkOutline,
  IoGridOutline,
  IoListOutline,
  IoFilterOutline,
  IoChevronForwardOutline,
  IoArrowBack,
  IoAddOutline,
} from 'react-icons/io5';

const PRODUCTS_PER_PAGE = 12;

// Client-side memory cache for instantaneous subcategory page transitions
const clientSubCatCache = new Map();

export default function ProductsBySubCategoryPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const { subCategorySlug } = params || {};
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const { addToCart, isInCart } = useEnquiryCart();
  const cacheKey = subCategorySlug ? `${subCategorySlug.toLowerCase()}_page_${currentPage}` : '';
  const initialCached = cacheKey ? clientSubCatCache.get(cacheKey) : null;

  const [products, setProducts] = useState(initialCached?.products || []);
  const [subCategory, setSubCategory] = useState(initialCached?.subCategory || null);
  const [loading, setLoading] = useState(!initialCached);
  const [error, setError] = useState(null);
  const [totalProducts, setTotalProducts] = useState(initialCached?.totalProducts || 0);

  // View mode: 'grid' or 'table'
  const [viewMode, setViewMode] = useState('grid');
  // Stock filter: 'all' or 'instock'
  const [stockFilter, setStockFilter] = useState('all');
  // Local text search within this subcategory
  const [searchFilter, setSearchFilter] = useState('');
  // Copied feedback map: { [id]: boolean }
  const [copiedId, setCopiedId] = useState({});

  useEffect(() => {
    if (!subCategorySlug) return;

    const cacheKey = `${subCategorySlug.toLowerCase()}_page_${currentPage}`;
    const cached = clientSubCatCache.get(cacheKey);
    if (cached) {
      if (cached.subCategory) setSubCategory(cached.subCategory);
      setProducts(cached.products || []);
      setTotalProducts(cached.totalProducts || 0);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    let isMounted = true;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    async function fetchData() {
      try {
        // Parallel concurrent fetching of subcategory metadata & products
        const [subRes, prodRes] = await Promise.all([
          fetch(`/api/sub-categories?slug=${encodeURIComponent(subCategorySlug)}`, { signal: controller.signal }),
          fetch(`/api/products?subCategorySlug=${encodeURIComponent(subCategorySlug)}&page=${currentPage}&limit=${PRODUCTS_PER_PAGE}`, { signal: controller.signal }),
        ]);

        const [subData, prodData] = await Promise.all([
          subRes.json(),
          prodRes.json(),
        ]);

        if (isMounted) {
          let foundSub = null;
          if (subRes.ok && subData.success && subData.subCategories?.length > 0) {
            foundSub = subData.subCategories[0];
            setSubCategory(foundSub);
          }

          if (prodRes.ok && prodData.success && Array.isArray(prodData.products)) {
            const fetchedProds = prodData.products;
            const count = prodData.totalCount ?? fetchedProds.length;
            setProducts(fetchedProds);
            setTotalProducts(count);
            setError(null);

            // Cache client-side for instant zero-latency revisit
            clientSubCatCache.set(cacheKey, {
              subCategory: foundSub,
              products: fetchedProds,
              totalProducts: count,
            });
          } else {
            setProducts([]);
            setTotalProducts(0);
          }
        }
      } catch (err) {
        if (isMounted && err.name !== 'AbortError') {
          setError('Unable to load compounds from database. Please try again.');
          setProducts([]);
          setTotalProducts(0);
        }
      } finally {
        clearTimeout(timeoutId);
        if (isMounted) setLoading(false);
      }
    }

    fetchData();

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [subCategorySlug, currentPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(totalProducts / PRODUCTS_PER_PAGE) || 1;
  }, [totalProducts]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      const sp = new URLSearchParams(searchParams.toString());
      sp.set('page', newPage.toString());
      router.push(`/products/browse/${encodeURIComponent(subCategorySlug)}?${sp.toString()}`);
    }
  };

  const handleCopy = async (text, id) => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedId((prev) => ({ ...prev, [id]: true }));
      setTimeout(() => {
        setCopiedId((prev) => ({ ...prev, [id]: false }));
      }, 2000);
    }
  };

  const displayedProducts = useMemo(() => {
    return products.filter((item) => {
      if (stockFilter === 'instock' && item.stock !== 'Instock') return false;
      if (searchFilter.trim()) {
        const query = searchFilter.toLowerCase();
        const matchesName = item.name?.toLowerCase().includes(query);
        const matchesCat = item.catNumber?.toLowerCase().includes(query);
        const matchesCas = item.casNumber?.toLowerCase().includes(query);
        const matchesFormula = item.molecularFormula?.toLowerCase().includes(query);
        if (!matchesName && !matchesCat && !matchesCas && !matchesFormula) return false;
      }
      return true;
    });
  }, [products, stockFilter, searchFilter]);

  const mainCategorySlug = subCategory?.mainCategory?.slug;
  const mainCategoryName = subCategory?.mainCategory?.name;

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 font-mono flex-wrap">
          <Link href="/" className="hover:text-slate-800 transition-colors">Home</Link>
          <IoChevronForwardOutline size={12} className="text-slate-400" />
          <Link href="/products/all" className="hover:text-slate-800 transition-colors">Categories</Link>
          {mainCategorySlug && (
            <>
              <IoChevronForwardOutline size={12} className="text-slate-400" />
              <Link
                href={`/products/category/${encodeURIComponent(mainCategorySlug.toLowerCase())}`}
                className="hover:text-slate-800 transition-colors"
              >
                {capitalizeWords(mainCategoryName)}
              </Link>
            </>
          )}
          <IoChevronForwardOutline size={12} className="text-slate-400" />
          <span className="text-slate-900 font-semibold truncate">
            {capitalizeWords(subCategory?.name || (subCategorySlug || '').replace(/-/g, ' '))}
          </span>
        </nav>

        {/* Subcategory Header Banner */}
        <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-mono font-medium">
              <IoFlaskOutline size={14} />
              <span>CHEMICAL INVENTORY</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {capitalizeWords(subCategory?.name || (subCategorySlug || '').replace(/-/g, ' '))}
            </h1>
            {subCategory?.description ? (
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                {subCategory.description}
              </p>
            ) : (
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed pt-1">
                High-purity reference standards, impurities, and derivatives synthesized under strict analytical controls.
              </p>
            )}
          </div>
        </div>

        {/* Layout Grid: Sidebar Filters & Products Listing */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Left Sticky Filter Drawer */}
          <aside className="lg:col-span-1 bg-white rounded-2xl border border-slate-200 p-5 space-y-6 lg:sticky lg:top-24">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900">
                <IoFilterOutline size={16} className="text-sky-600" />
                <span>Filter Standards</span>
              </div>
              <span className="font-mono text-xs text-slate-400">
                {totalProducts} total
              </span>
            </div>

            {/* Quick Search within Subcategory */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">Filter In Page</label>
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="CAS, Cat No, Name..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            {/* Stock Status Filter */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700">Availability</label>
              <div className="space-y-1.5 text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-slate-700 hover:text-slate-900">
                  <input
                    type="radio"
                    name="stock"
                    checked={stockFilter === 'all'}
                    onChange={() => setStockFilter('all')}
                    className="text-sky-600 focus:ring-sky-500"
                  />
                  <span>All Compounds</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-slate-700 hover:text-slate-900">
                  <input
                    type="radio"
                    name="stock"
                    checked={stockFilter === 'instock'}
                    onChange={() => setStockFilter('instock')}
                    className="text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>In Stock Only</span>
                  </span>
                </label>
              </div>
            </div>

            {/* Custom Synthesis Help Box */}
            <div className="pt-4 border-t border-slate-100 rounded-xl bg-slate-50 p-3.5 space-y-2 text-xs">
              <p className="font-bold text-slate-900">Need a derivative not listed?</p>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Pharmavive provides custom organic synthesis and metabolite isolation from grams to kilograms.
              </p>
              <Link
                href="/synthesis"
                className="inline-block text-xs font-semibold text-sky-700 hover:text-sky-900 underline"
              >
                Inquire for Custom Synthesis →
              </Link>
            </div>
          </aside>

          {/* Right Product Showcase & Table */}
          <main className="lg:col-span-3 space-y-4">
            {/* View Bar & Metrics */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs font-mono text-slate-600">
                Showing <strong className="text-slate-900">{displayedProducts.length}</strong> of{' '}
                <strong className="text-slate-900">{totalProducts}</strong> compounds
              </p>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                    viewMode === 'grid'
                      ? 'bg-white text-slate-900 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <IoGridOutline size={14} />
                  <span>Card Grid</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('table')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                    viewMode === 'table'
                      ? 'bg-white text-slate-900 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <IoListOutline size={14} />
                  <span>Technical Table</span>
                </button>
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="h-80 rounded-2xl bg-white border border-slate-200 p-5 animate-pulse flex flex-col justify-between"
                  >
                    <div className="h-36 bg-slate-100 rounded-xl mb-4" />
                    <div className="space-y-2">
                      <div className="w-1/2 h-4 bg-slate-200 rounded" />
                      <div className="w-3/4 h-5 bg-slate-200 rounded" />
                    </div>
                    <div className="w-full h-8 bg-slate-100 rounded-lg mt-4" />
                  </div>
                ))}
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="p-8 rounded-2xl bg-red-50 border border-red-200 text-center max-w-lg mx-auto space-y-3">
                <h2 className="text-base font-bold text-red-800">Unable to load compounds</h2>
                <p className="text-xs text-red-600">{error}</p>
                <button
                  onClick={() => router.back()}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-semibold hover:bg-red-700 transition-colors shadow-sm"
                >
                  <IoArrowBack size={14} />
                  <span>Go Back</span>
                </button>
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && displayedProducts.length === 0 && (
              <div className="py-16 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
                <div className="w-12 h-12 mx-auto rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                  <IoFlaskOutline size={24} />
                </div>
                <h3 className="text-base font-bold text-slate-800">No compounds found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  {searchFilter || stockFilter !== 'all'
                    ? 'No compounds match your active filters.'
                    : 'There are no products listed in this subcategory yet.'}
                </p>
                {(searchFilter || stockFilter !== 'all') && (
                  <button
                    onClick={() => {
                      setSearchFilter('');
                      setStockFilter('all');
                    }}
                    className="text-xs text-sky-700 font-semibold underline pt-2"
                  >
                    Reset all filters
                  </button>
                )}
              </div>
            )}

            {/* View Mode: Card Grid */}
            {!loading && !error && displayedProducts.length > 0 && viewMode === 'grid' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {displayedProducts.map((product) => {
                  const alreadyInCart = isInCart(product._id);
                  const isCopied = copiedId[product._id];

                  return (
                    <div
                      key={product._id}
                      className="group rounded-2xl bg-white border border-slate-200 hover:border-sky-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-between overflow-hidden"
                    >
                      <div>
                        {/* Thumbnail */}
                        <div className="relative h-44 w-full bg-slate-50 border-b border-slate-100 flex items-center justify-center p-3">
                          <CompoundStructureThumbnail
                            item={product}
                            className="h-full w-full object-contain p-2 group-hover:scale-105 transition-transform duration-200"
                          />

                          {/* Stock Pill Badge */}
                          <span
                            className={`absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                              product.stock === 'Instock'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : 'bg-amber-100 text-amber-800 border border-amber-300'
                            }`}
                          >
                            {product.stock}
                          </span>
                        </div>

                        {/* Details */}
                        <div className="p-4 space-y-2.5">
                          {/* Cat No & Copy Button */}
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                              {product.catNumber || 'Cat N/A'}
                            </span>
                            {product.catNumber && (
                              <button
                                type="button"
                                onClick={() => handleCopy(product.catNumber, product._id)}
                                className="text-slate-400 hover:text-slate-800 p-1 rounded transition-colors"
                                title="Copy Catalog Number"
                              >
                                {isCopied ? (
                                  <IoCheckmarkOutline size={14} className="text-emerald-600" />
                                ) : (
                                  <IoCopyOutline size={14} />
                                )}
                              </button>
                            )}
                          </div>

                          {/* Compound Title */}
                          <Link
                            href={`/products/browse/${encodeURIComponent(subCategorySlug.toLowerCase())}/${encodeURIComponent(product.slug)}`}
                            className="block text-sm font-bold text-slate-900 group-hover:text-sky-700 transition-colors line-clamp-2"
                            title={product.name}
                          >
                            {product.name}
                          </Link>

                          {/* Chemical Specs */}
                          <div className="space-y-1 text-xs text-slate-500 pt-1">
                            {product.casNumber && (
                              <p className="flex items-center justify-between font-mono">
                                <span>CAS:</span>
                                <span className="text-slate-800 font-semibold">{product.casNumber}</span>
                              </p>
                            )}
                            {product.molecularFormula && (
                              <p className="flex items-center justify-between">
                                <span>Formula:</span>
                                <span className="text-slate-800 font-medium">
                                  {formatMolecularFormula(product.molecularFormula)}
                                </span>
                              </p>
                            )}
                            {product.molecularWeight && (
                              <p className="flex items-center justify-between font-mono">
                                <span>Mol. Wt:</span>
                                <span className="text-slate-800 font-medium">{product.molecularWeight}</span>
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Card Action Footer */}
                      <div className="p-4 pt-0 border-t border-slate-100 mt-2 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => addToCart(product)}
                          className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs ${
                            alreadyInCart
                              ? 'bg-sky-50 text-sky-700 border border-sky-200'
                              : 'bg-slate-900 hover:bg-slate-800 text-white'
                          }`}
                        >
                          <IoAddOutline size={16} />
                          <span>{alreadyInCart ? 'Added to Quote' : 'Add to Quote'}</span>
                        </button>

                        <Link
                          href={`/products/browse/${encodeURIComponent(subCategorySlug.toLowerCase())}/${encodeURIComponent(product.slug)}`}
                          className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors"
                          title="View Technical Specification Sheet"
                        >
                          Specs
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* View Mode: Technical Table */}
            {!loading && !error && displayedProducts.length > 0 && viewMode === 'table' && (
              <div className="bg-white rounded-2xl border border-slate-200 overflow-x-auto shadow-2xs">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-900 text-white font-mono text-[11px] uppercase tracking-wider">
                      <th className="py-3 px-4">Catalog No</th>
                      <th className="py-3 px-4">Compound Name</th>
                      <th className="py-3 px-4">CAS Number</th>
                      <th className="py-3 px-4">Formula</th>
                      <th className="py-3 px-4">Mol. Weight</th>
                      <th className="py-3 px-4">Availability</th>
                      <th className="py-3 px-4 text-right">RFQ Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    {displayedProducts.map((product) => {
                      const alreadyInCart = isInCart(product._id);
                      return (
                        <tr key={product._id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3 px-4 font-bold text-sky-700 whitespace-nowrap">
                            <Link
                              href={`/products/browse/${encodeURIComponent(subCategorySlug.toLowerCase())}/${encodeURIComponent(product.slug)}`}
                              className="hover:underline"
                            >
                              {product.catNumber || 'N/A'}
                            </Link>
                          </td>
                          <td className="py-3 px-4 font-sans font-semibold text-slate-900 max-w-xs">
                            <Link
                              href={`/products/browse/${encodeURIComponent(subCategorySlug.toLowerCase())}/${encodeURIComponent(product.slug)}`}
                              className="hover:text-sky-700"
                            >
                              {product.name}
                            </Link>
                          </td>
                          <td className="py-3 px-4 text-slate-700 whitespace-nowrap">
                            {product.casNumber || '—'}
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap">
                            {product.molecularFormula ? formatMolecularFormula(product.molecularFormula) : '—'}
                          </td>
                          <td className="py-3 px-4 text-slate-700 whitespace-nowrap">
                            {product.molecularWeight || '—'}
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                product.stock === 'Instock'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {product.stock}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right whitespace-nowrap">
                            <button
                              type="button"
                              onClick={() => addToCart(product)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-sans font-semibold transition-colors ${
                                alreadyInCart
                                  ? 'bg-sky-50 text-sky-700 border border-sky-200'
                                  : 'bg-slate-900 hover:bg-slate-800 text-white'
                              }`}
                            >
                              {alreadyInCart ? 'In Quote' : '+ Quote'}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="pt-6 flex items-center justify-between border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage <= 1 || loading}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>

                <span className="text-xs font-mono text-slate-500">
                  Page <strong className="text-slate-900">{currentPage}</strong> of{' '}
                  <strong className="text-slate-900">{totalPages}</strong>
                </span>

                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= totalPages || loading}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

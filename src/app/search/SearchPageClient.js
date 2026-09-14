'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { formatMolecularFormula, copyToClipboard } from '@/utils/chemUtils';
import { useEnquiryCart } from '@/context/EnquiryCartContext';
import {
  IoSearchOutline,
  IoFlaskOutline,
  IoCopyOutline,
  IoCheckmarkOutline,
  IoGridOutline,
  IoListOutline,
  IoCloseOutline,
  IoAddOutline,
} from 'react-icons/io5';

const MIN_SEARCH_LENGTH = 2;

export default function SearchPageClient() {
  const searchParams = useSearchParams();
  const initialSearchQuery = searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // View mode and filters
  const [viewMode, setViewMode] = useState('grid');
  const [stockFilter, setStockFilter] = useState('all');
  const [copiedId, setCopiedId] = useState({});

  const { addToCart, isInCart } = useEnquiryCart();

  const fetchProducts = useCallback(async (query) => {
    if (query.length > 0 && query.length < MIN_SEARCH_LENGTH) {
      setProducts([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch(`/api/products?search=${encodeURIComponent(query)}&limit=10000`);
      const data = await response.json();

      if (response.ok && data.success) {
        setProducts(data.products || []);
      } else {
        setError(data.error || 'Failed to fetch search results.');
        setProducts([]);
      }
    } catch (err) {
      console.error('Network error during product search:', err);
      setError('An unexpected network error occurred. Please try again.');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchQuery.length === 0 || searchQuery.length >= MIN_SEARCH_LENGTH) {
        fetchProducts(searchQuery);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [searchQuery, fetchProducts]);

  useEffect(() => {
    if (initialSearchQuery.length >= MIN_SEARCH_LENGTH) {
      fetchProducts(initialSearchQuery);
    }
  }, [initialSearchQuery, fetchProducts]);

  const handleCopy = async (text, id) => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedId((prev) => ({ ...prev, [id]: true }));
      setTimeout(() => setCopiedId((prev) => ({ ...prev, [id]: false })), 2000);
    }
  };

  const displayedProducts = useMemo(() => {
    if (stockFilter === 'instock') {
      return products.filter((p) => p.stock === 'Instock');
    }
    return products;
  }, [products, stockFilter]);

  const suggestions = ['Acitretin', 'Nitrosamines', 'Deuterated', 'Peptide'];

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Search Header Banner */}
        <div className="rounded-3xl bg-slate-950 text-white p-8 sm:p-12 relative overflow-hidden border border-slate-800">
          <div className="absolute inset-0 scientific-grid-dark opacity-30" />
          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300 text-xs font-mono">
              <IoFlaskOutline size={14} />
              <span>CHEMICAL INVENTORY SEARCH</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Search Reference Standards & APIs
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Query across compound names, Catalog numbers, CAS numbers, chemical names, and molecular formulas.
            </p>

            {/* Main Interactive Search Input */}
            <div className="relative pt-2">
              <div className="relative flex items-center">
                <IoSearchOutline className="absolute left-4 text-slate-400" size={22} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter compound name, CAS (e.g. 69427-46-9), or Cat No..."
                  className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-white text-slate-900 placeholder-slate-400 text-sm sm:text-base focus:outline-none focus:ring-4 focus:ring-sky-500/40 shadow-xl"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 text-slate-400 hover:text-slate-600 p-1"
                  >
                    <IoCloseOutline size={20} />
                  </button>
                )}
              </div>

              {/* Quick suggestions */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-3 text-xs text-slate-400">
                <span className="font-mono text-[11px] text-slate-500">Try searching:</span>
                {suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSearchQuery(s)}
                    className="px-2.5 py-0.5 rounded-md bg-white/10 hover:bg-white/20 text-slate-300 font-mono text-[11px] border border-white/10"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-wrap items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-600">
              {loading ? (
                'Searching database...'
              ) : (
                <>
                  Found <strong className="text-slate-900">{displayedProducts.length}</strong> matching compounds
                  {searchQuery && <> for &quot;<span className="text-sky-700">{searchQuery}</span>&quot;</>}
                </>
              )}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Filter by Stock */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-medium">
              <button
                type="button"
                onClick={() => setStockFilter('all')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  stockFilter === 'all' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600'
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setStockFilter('instock')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  stockFilter === 'instock' ? 'bg-white text-emerald-800 shadow-2xs font-bold' : 'text-slate-600'
                }`}
              >
                In Stock Only
              </button>
            </div>

            {/* View Mode */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-all ${
                  viewMode === 'grid' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                }`}
                title="Grid view"
              >
                <IoGridOutline size={16} />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg transition-all ${
                  viewMode === 'table' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                }`}
                title="Table view"
              >
                <IoListOutline size={16} />
              </button>
            </div>
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
            <p className="text-sm font-bold text-red-800">Search Error</p>
            <p className="text-xs text-red-600">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && displayedProducts.length === 0 && (
          <div className="py-20 text-center bg-white rounded-3xl border border-slate-200 space-y-4 max-w-lg mx-auto p-8 shadow-xs">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center">
              <IoSearchOutline size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              {searchQuery ? 'No matching chemical standards' : 'Ready to search the chemical library'}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {searchQuery
                ? `No compounds matched your query "${searchQuery}". Check the spelling, try searching by CAS number directly, or contact our synthesis desk.`
                : 'Type a compound name, CAS number (e.g. 69427-46-9), or Catalog number to search across our complete inventory.'}
            </p>
            {searchQuery && (
              <div className="pt-2">
                <Link
                  href="/contact?type=custom-synthesis"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors shadow-sm"
                >
                  <IoFlaskOutline size={16} />
                  <span>Request Custom Synthesis Quote</span>
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Grid View */}
        {!loading && !error && displayedProducts.length > 0 && viewMode === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayedProducts.map((product) => {
              const alreadyInCart = isInCart(product._id);
              const isCopied = copiedId[product._id];
              const subCatSlug = product.subCategory?.slug || 'browse';

              return (
                <div
                  key={product._id}
                  className="group rounded-2xl bg-white border border-slate-200 hover:border-sky-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-between overflow-hidden"
                >
                  <div>
                    {/* Thumbnail */}
                    <div className="relative h-44 w-full bg-slate-50 border-b border-slate-100 flex items-center justify-center p-3">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          unoptimized
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-contain p-2 group-hover:scale-105 transition-transform duration-200"
                        />
                      ) : (
                        <div className="text-center space-y-1 text-slate-400">
                          <IoFlaskOutline size={32} className="mx-auto" />
                          <span className="text-[10px] font-mono">Structure on File</span>
                        </div>
                      )}

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

                      <Link
                        href={`/products/browse/${encodeURIComponent(subCatSlug)}/${encodeURIComponent(product.slug)}`}
                        className="block text-sm font-bold text-slate-900 group-hover:text-sky-700 transition-colors line-clamp-2"
                        title={product.name}
                      >
                        {product.name}
                      </Link>

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

                  {/* Footer */}
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
                      <span>{alreadyInCart ? 'In Quote Cart' : 'Add to Quote'}</span>
                    </button>

                    <Link
                      href={`/products/browse/${encodeURIComponent(subCatSlug)}/${encodeURIComponent(product.slug)}`}
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

        {/* Table View */}
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
                  const subCatSlug = product.subCategory?.slug || 'browse';
                  return (
                    <tr key={product._id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-bold text-sky-700 whitespace-nowrap">
                        <Link
                          href={`/products/browse/${encodeURIComponent(subCatSlug)}/${encodeURIComponent(product.slug)}`}
                          className="hover:underline"
                        >
                          {product.catNumber || 'N/A'}
                        </Link>
                      </td>
                      <td className="py-3 px-4 font-sans font-semibold text-slate-900 max-w-xs">
                        <Link
                          href={`/products/browse/${encodeURIComponent(subCatSlug)}/${encodeURIComponent(product.slug)}`}
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
      </div>
    </div>
  );
}

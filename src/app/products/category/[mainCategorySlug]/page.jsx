'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { capitalizeWords } from '@/utils/stringUtils';
import { IoArrowForward, IoArrowBack, IoSearchOutline, IoFlaskOutline, IoChevronForwardOutline } from 'react-icons/io5';

// Client-side cache for instantaneous category transition
const clientMainCatSubCache = new Map();

export default function SubCategoriesByMainCategoryPage() {
  const router = useRouter();
  const params = useParams();
  const { mainCategorySlug } = params || {};
  const cacheKey = mainCategorySlug ? mainCategorySlug.toLowerCase() : '';
  const initialCached = cacheKey ? clientMainCatSubCache.get(cacheKey) : null;

  const [subCategories, setSubCategories] = useState(initialCached || []);
  const [loading, setLoading] = useState(!initialCached);
  const [error, setError] = useState(null);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    if (!mainCategorySlug) {
      setError('Main category identifier missing.');
      setLoading(false);
      return;
    }

    const cached = clientMainCatSubCache.get(cacheKey);
    if (cached) {
      setSubCategories(cached);
      setLoading(false);
      setError(null);
      return;
    }

    async function fetchSubCategories() {
      setLoading(true);
      setError(null);

      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 8000);

        const response = await fetch(
          `/api/sub-categories?mainCategorySlug=${encodeURIComponent(mainCategorySlug)}`,
          { signal: controller.signal }
        );
        clearTimeout(timer);
        const data = await response.json();

        if (response.ok && data.success && Array.isArray(data.subCategories)) {
          setSubCategories(data.subCategories);
          clientMainCatSubCache.set(cacheKey, data.subCategories);
          setError(null);
        } else {
          setSubCategories([]);
          setError(data.error || 'Failed to fetch subcategories.');
        }
      } catch (err) {
        setSubCategories([]);
        setError('Unable to load subcategories from database. Please try again.');
      } finally {
        setLoading(false);
      }
    }
    fetchSubCategories();
  }, [mainCategorySlug, cacheKey]);

  const mainCategoryDisplayName = useMemo(() => {
    if (subCategories[0]?.mainCategory?.name) {
      return capitalizeWords(subCategories[0].mainCategory.name);
    }
    return mainCategorySlug ? capitalizeWords(mainCategorySlug.replace(/-/g, ' ')) : 'Category';
  }, [subCategories, mainCategorySlug]);

  const filteredSubCategories = useMemo(() => {
    if (!filterText.trim()) return subCategories;
    const lower = filterText.toLowerCase();
    return subCategories.filter(
      (sub) =>
        sub.name.toLowerCase().includes(lower) ||
        (sub.description && sub.description.toLowerCase().includes(lower))
    );
  }, [subCategories, filterText]);

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 font-mono flex-wrap">
          <Link href="/" className="hover:text-slate-800 transition-colors">Home</Link>
          <IoChevronForwardOutline size={12} className="text-slate-400" />
          <Link href="/products/all" className="hover:text-slate-800 transition-colors">Categories</Link>
          <IoChevronForwardOutline size={12} className="text-slate-400" />
          <span className="text-slate-900 font-semibold">{mainCategoryDisplayName}</span>
        </nav>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-mono font-medium mb-3">
              <IoFlaskOutline size={14} />
              <span>SUB-CLASSIFICATIONS</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {mainCategoryDisplayName}
            </h1>
            <p className="text-sm text-slate-600 mt-2 max-w-xl">
              Select a subcategory to browse specific chemical compounds, molecular formulas, CAS numbers, and certified stock availability.
            </p>
          </div>

          {/* Quick Filter */}
          <div className="relative w-full md:w-72">
            <IoSearchOutline className="absolute left-3.5 top-3 text-slate-400" size={18} />
            <input
              type="text"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              placeholder="Search subcategory..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-2xs"
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-44 rounded-2xl bg-white border border-slate-200 p-6 animate-pulse flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-24 h-4 bg-slate-200 rounded" />
                  <div className="w-3/4 h-6 bg-slate-200 rounded" />
                </div>
                <div className="w-1/3 h-4 bg-slate-100 rounded" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="p-8 rounded-2xl bg-red-50 border border-red-200 text-center max-w-lg mx-auto space-y-4">
            <h2 className="text-base font-bold text-red-800">Error Loading Subcategories</h2>
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
        {!loading && !error && filteredSubCategories.length === 0 && (
          <div className="py-16 text-center space-y-4 max-w-md mx-auto">
            <p className="text-base font-semibold text-slate-800">No subcategories found</p>
            <p className="text-xs text-slate-500">
              {filterText
                ? `No subcategory matches "${filterText}".`
                : `There are no subcategories catalogued under "${mainCategoryDisplayName}" yet.`}
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              {filterText && (
                <button
                  onClick={() => setFilterText('')}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Clear Filter
                </button>
              )}
              <Link
                href="/products/all"
                className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 shadow-sm"
              >
                Back to All Categories
              </Link>
            </div>
          </div>
        )}

        {/* Subcategories Grid */}
        {!loading && !error && filteredSubCategories.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSubCategories.map((subCategory) => (
              <Link
                key={subCategory._id}
                href={`/products/browse/${encodeURIComponent(subCategory.slug.toLowerCase())}`}
                className="group rounded-2xl bg-white border border-slate-200 p-6 hover:border-sky-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium uppercase tracking-wider bg-slate-100 text-slate-600">
                      Subcategory
                    </span>
                    <span className="font-mono text-xs text-sky-600 font-semibold group-hover:translate-x-0.5 transition-transform">
                      →
                    </span>
                  </div>
                  <h2 className="text-base font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                    {capitalizeWords(subCategory.name)}
                  </h2>
                  {subCategory.description && (
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {subCategory.description}
                    </p>
                  )}
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-sky-700 group-hover:text-sky-900">
                  <span>View Compounds</span>
                  <IoArrowForward size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Footer Navigation */}
        <div className="pt-6 border-t border-slate-200">
          <Link
            href="/products/all"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <IoArrowBack size={16} />
            <span>Back to All Main Categories</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

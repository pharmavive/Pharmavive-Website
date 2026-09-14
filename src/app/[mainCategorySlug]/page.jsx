'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { capitalizeWords } from '@/utils/stringUtils';
import { IoFlaskOutline, IoArrowForward, IoArrowBack, IoChevronForwardOutline } from 'react-icons/io5';

export default function MainCategoryPage() {
  const router = useRouter();
  const params = useParams();
  const mainCategorySlug = params.mainCategorySlug;

  const [mainCategory, setMainCategory] = useState(null);
  const [subCategoriesForDisplay, setSubCategoriesForDisplay] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!mainCategorySlug) {
        setLoading(false);
        setError('Main category identifier missing.');
        return;
      }

      setLoading(true);
      setError('');
      try {
        const mainCatResponse = await fetch(`/api/main-categories?slug=${encodeURIComponent(mainCategorySlug)}`);
        const mainCatData = await mainCatResponse.json();

        const currentMainCat =
          mainCatData.mainCategories?.length > 0 ? mainCatData.mainCategories[0] : null;

        if (!currentMainCat) {
          setError('Main category not found or the slug is incorrect.');
          setLoading(false);
          return;
        }
        setMainCategory(currentMainCat);

        // Fetch subcategories associated with this category
        const subCatsResponse = await fetch(`/api/sub-categories?mainCategorySlug=${encodeURIComponent(mainCategorySlug)}`);
        const subCatsData = await subCatsResponse.json();

        if (subCatsResponse.ok && subCatsData.success && Array.isArray(subCatsData.subCategories)) {
          setSubCategoriesForDisplay(subCatsData.subCategories);
        } else {
          setSubCategoriesForDisplay([]);
        }
      } catch (err) {
        console.error('Error fetching main category:', err);
        setError('An unexpected network error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [mainCategorySlug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse space-y-6">
          <div className="w-48 h-6 bg-slate-200 rounded" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-44 rounded-2xl bg-white border border-slate-200" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !mainCategory) {
    return (
      <div className="min-h-screen bg-slate-50 py-20">
        <div className="max-w-md mx-auto px-4 text-center space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Category Not Found</h2>
          <p className="text-xs text-slate-500">{error || 'Unable to locate this chemical classification.'}</p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => router.back()}
              className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100"
            >
              Go Back
            </button>
            <Link
              href="/products/all"
              className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 shadow-sm"
            >
              All Categories
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <nav className="flex items-center gap-2 text-xs text-slate-500 font-mono">
          <Link href="/" className="hover:text-slate-800 transition-colors">Home</Link>
          <IoChevronForwardOutline size={12} className="text-slate-400" />
          <Link href="/products/all" className="hover:text-slate-800 transition-colors">Categories</Link>
          <IoChevronForwardOutline size={12} className="text-slate-400" />
          <span className="text-slate-900 font-semibold">{capitalizeWords(mainCategory.name)}</span>
        </nav>

        <div className="border-b border-slate-200 pb-6 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-mono font-medium">
            <IoFlaskOutline size={14} />
            <span>PRIMARY CLASSIFICATION</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {capitalizeWords(mainCategory.name)}
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl">
            Browse authenticated reference standards and specialized chemical intermediates available under this main category.
          </p>
        </div>

        {subCategoriesForDisplay.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-3xl border border-slate-200 max-w-md mx-auto p-8 space-y-3">
            <h3 className="text-base font-bold text-slate-800">No Subcategories Yet</h3>
            <p className="text-xs text-slate-500">
              No products are currently assigned to subcategories in this division.
            </p>
            <div className="pt-2">
              <Link
                href="/products/all"
                className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800"
              >
                Browse All Categories
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {subCategoriesForDisplay.map((subCat) => (
              <Link
                key={subCat.slug}
                href={`/products/browse/${encodeURIComponent(subCat.slug.toLowerCase())}`}
                className="group rounded-2xl bg-white border border-slate-200 p-6 hover:border-sky-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium uppercase tracking-wider bg-slate-100 text-slate-600">
                    Subcategory
                  </span>
                  <h2 className="text-base font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                    {capitalizeWords(subCat.name)}
                  </h2>
                  {subCat.description && (
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {subCat.description}
                    </p>
                  )}
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-sky-700 group-hover:text-sky-900">
                  <span>Browse Products</span>
                  <IoArrowForward size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="pt-6 border-t border-slate-200">
          <Link
            href="/products/all"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <IoArrowBack size={16} />
            <span>Back to All Categories</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

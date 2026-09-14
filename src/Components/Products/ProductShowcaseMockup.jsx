// src/Components/Products/ProductShowcaseMockup.jsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  IoArrowForward,
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoShieldCheckmarkOutline,
  IoFlaskOutline,
  IoHeadsetOutline,
  IoCubeOutline,
} from 'react-icons/io5';
import { getClientMainCategories, peekClientMainCategories } from '@/utils/clientCache';

// Category visual themes tailored to chemical classifications
const CATEGORY_THEMES = {
  'api-impurity-standards': {
    badge: 'API Standards',
    image: '/category-icons/apis_transparent.png',
    fallbackCard: '/category-icons/apis_card.png',
    bgGradient: 'from-[#E6F8F3] to-[#D4F3EB]',
    activeBorder: 'border-[#00A389]',
    glowColor: 'rgba(0, 163, 137, 0.25)',
  },
  'speciality-chemicals': {
    badge: 'Speciality',
    image: '/category-icons/specialty-chemicals_transparent.png',
    fallbackCard: '/category-icons/specialty-chemicals_card.png',
    bgGradient: 'from-[#E0F2FE] to-[#BAE6FD]',
    activeBorder: 'border-[#0284C7]',
    glowColor: 'rgba(2, 132, 199, 0.22)',
  },
  'building-blocks': {
    badge: 'Building Blocks',
    image: '/category-icons/intermediates_transparent.png',
    fallbackCard: '/category-icons/intermediates_card.png',
    bgGradient: 'from-[#F3E8FF] to-[#E9D5FF]',
    activeBorder: 'border-[#9333EA]',
    glowColor: 'rgba(147, 51, 234, 0.22)',
  },
  'peptide-coupling-reagents': {
    badge: 'Reagents',
    image: '/category-icons/research-chemicals_transparent.png',
    fallbackCard: '/category-icons/research-chemicals_card.png',
    bgGradient: 'from-[#FEF3C7] to-[#FDE68A]',
    activeBorder: 'border-[#D97706]',
    glowColor: 'rgba(217, 119, 6, 0.22)',
  },
  'nitrosamines': {
    badge: 'Nitrosamines',
    image: '/category-icons/impurities_transparent.png',
    fallbackCard: '/category-icons/impurities_card.png',
    bgGradient: 'from-[#EDE9FE] to-[#DDD6FE]',
    activeBorder: 'border-[#7C3AED]',
    glowColor: 'rgba(124, 58, 237, 0.22)',
  },
  'stable-isotopes': {
    badge: 'Isotopes',
    image: '/category-icons/amino-acids_transparent.png',
    fallbackCard: '/category-icons/amino-acids_card.png',
    bgGradient: 'from-[#ECFDF5] to-[#D1FAE5]',
    activeBorder: 'border-[#059669]',
    glowColor: 'rgba(5, 150, 105, 0.22)',
  },
  'cdmo': {
    badge: 'CDMO',
    image: '/category-icons/cdmo_transparent.png',
    fallbackCard: '/category-icons/cdmo_card.png',
    bgGradient: 'from-[#CCFBF1] to-[#99F6E4]',
    activeBorder: 'border-[#0D9488]',
    glowColor: 'rgba(13, 148, 136, 0.22)',
    link: '/services',
  },
};

const INITIAL_CATEGORIES = [
  {
    id: 'api-impurity-standards',
    name: 'API Impurity Standards',
    count: '1,250+ Products',
    badge: 'API Standards',
    image: '/category-icons/apis_transparent.png',
    fallbackCard: '/category-icons/apis_card.png',
    bgGradient: 'from-[#E6F8F3] to-[#D4F3EB]',
    activeBorder: 'border-[#00A389]',
    glowColor: 'rgba(0, 163, 137, 0.25)',
    link: '/products/category/api-impurity-standards',
  },
  {
    id: 'speciality-chemicals',
    name: 'Speciality Chemicals',
    count: '340+ Products',
    badge: 'Speciality',
    image: '/category-icons/specialty-chemicals_transparent.png',
    fallbackCard: '/category-icons/specialty-chemicals_card.png',
    bgGradient: 'from-[#E0F2FE] to-[#BAE6FD]',
    activeBorder: 'border-[#0284C7]',
    glowColor: 'rgba(2, 132, 199, 0.22)',
    link: '/products/category/speciality-chemicals',
  },
  {
    id: 'building-blocks',
    name: 'Building Blocks',
    count: '820+ Products',
    badge: 'Building Blocks',
    image: '/category-icons/intermediates_transparent.png',
    fallbackCard: '/category-icons/intermediates_card.png',
    bgGradient: 'from-[#F3E8FF] to-[#E9D5FF]',
    activeBorder: 'border-[#9333EA]',
    glowColor: 'rgba(147, 51, 234, 0.22)',
    link: '/products/category/building-blocks',
  },
  {
    id: 'peptide-coupling-reagents',
    name: 'Peptide Coupling Reagents',
    count: '180+ Products',
    badge: 'Reagents',
    image: '/category-icons/research-chemicals_transparent.png',
    fallbackCard: '/category-icons/research-chemicals_card.png',
    bgGradient: 'from-[#FEF3C7] to-[#FDE68A]',
    activeBorder: 'border-[#D97706]',
    glowColor: 'rgba(217, 119, 6, 0.22)',
    link: '/products/category/peptide-coupling-reagents',
  },
  {
    id: 'nitrosamines',
    name: 'Nitrosamines',
    count: '95+ Products',
    badge: 'Nitrosamines',
    image: '/category-icons/impurities_transparent.png',
    fallbackCard: '/category-icons/impurities_card.png',
    bgGradient: 'from-[#EDE9FE] to-[#DDD6FE]',
    activeBorder: 'border-[#7C3AED]',
    glowColor: 'rgba(124, 58, 237, 0.22)',
    link: '/products/category/nitrosamines',
  },
  {
    id: 'stable-isotopes',
    name: 'Stable Isotopes',
    count: '150+ Products',
    badge: 'Isotopes',
    image: '/category-icons/amino-acids_transparent.png',
    fallbackCard: '/category-icons/amino-acids_card.png',
    bgGradient: 'from-[#ECFDF5] to-[#D1FAE5]',
    activeBorder: 'border-[#059669]',
    glowColor: 'rgba(5, 150, 105, 0.22)',
    link: '/products/category/stable-isotopes',
  },
  {
    id: 'cdmo',
    name: 'CDMO Services',
    count: 'Available on Request',
    badge: 'CDMO',
    image: '/category-icons/cdmo_transparent.png',
    fallbackCard: '/category-icons/cdmo_card.png',
    bgGradient: 'from-[#CCFBF1] to-[#99F6E4]',
    activeBorder: 'border-[#0D9488]',
    glowColor: 'rgba(13, 148, 136, 0.22)',
    link: '/services',
  },
];

function formatShowcaseCategories(mainCategories) {
  if (!Array.isArray(mainCategories) || mainCategories.length === 0) return null;
  return mainCategories
    .filter((c) => c.slug !== 'uncategorized')
    .map((cat) => {
      const theme = CATEGORY_THEMES[cat.slug] || {
        badge: 'Chemicals',
        image: '/category-icons/apis_transparent.png',
        fallbackCard: '/category-icons/apis_card.png',
        bgGradient: 'from-[#E6F8F3] to-[#D4F3EB]',
        activeBorder: 'border-[#00A389]',
        glowColor: 'rgba(0, 163, 137, 0.25)',
      };
      return {
        id: cat.slug,
        name: cat.name,
        count: cat.displayCount || `${cat.productCount || 0} Products`,
        badge: theme.badge,
        image: theme.image,
        fallbackCard: theme.fallbackCard,
        bgGradient: theme.bgGradient,
        activeBorder: theme.activeBorder,
        glowColor: theme.glowColor,
        link: theme.link || `/products/category/${encodeURIComponent(cat.slug)}`,
      };
    });
}

export default function ProductShowcaseMockup() {
  const initialData = peekClientMainCategories();
  const formattedInitial = formatShowcaseCategories(initialData);
  const [categories, setCategories] = useState(formattedInitial || INITIAL_CATEGORIES);
  const [loading, setLoading] = useState(false);
  const [selectedCatIndex, setSelectedCatIndex] = useState(0);
  const carouselRef = useRef(null);
  const scrollRafRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    getClientMainCategories()
      .then((data) => {
        if (data && Array.isArray(data) && isMounted) {
          const filtered = formatShowcaseCategories(data);
          if (filtered && filtered.length > 0) {
            setCategories(filtered);
          }
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
      if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);
    };
  }, []);

  const scrollToCard = (index) => {
    if (carouselRef.current) {
      const firstCard = carouselRef.current.firstElementChild;
      const cardWidth = firstCard ? firstCard.offsetWidth + 16 : 260;
      carouselRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth',
      });
    }
  };

  // Handle Carousel Prev / Next
  const handlePrev = () => {
    if (categories.length === 0) return;
    setSelectedCatIndex((prev) => {
      const nextIdx = prev > 0 ? prev - 1 : categories.length - 1;
      scrollToCard(nextIdx);
      return nextIdx;
    });
  };

  const handleNext = () => {
    if (categories.length === 0) return;
    setSelectedCatIndex((prev) => {
      const nextIdx = prev < categories.length - 1 ? prev + 1 : 0;
      scrollToCard(nextIdx);
      return nextIdx;
    });
  };

  const handleSelectCategory = (idx) => {
    setSelectedCatIndex(idx);
    scrollToCard(idx);
  };

  // Throttled scroll listener via requestAnimationFrame to eliminate layout thrashing
  const handleScroll = () => {
    if (scrollRafRef.current) return;
    scrollRafRef.current = requestAnimationFrame(() => {
      if (carouselRef.current && categories.length > 0) {
        const firstCard = carouselRef.current.firstElementChild;
        if (firstCard) {
          const cardWidth = firstCard.offsetWidth + 16;
          if (cardWidth > 0) {
            const currentIdx = Math.round(carouselRef.current.scrollLeft / cardWidth);
            if (currentIdx >= 0 && currentIdx < categories.length && currentIdx !== selectedCatIndex) {
              setSelectedCatIndex(currentIdx);
            }
          }
        }
      }
      scrollRafRef.current = null;
    });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F2FBF8] via-[#F8FCFB] to-white py-10 sm:py-14 border-b border-[#D5EFEA]">
      {/* Precision Ambient Laboratory Glows (Native Hardware Radial Gradients) */}
      <div className="absolute top-0 -left-20 w-[550px] h-[550px] bg-[radial-gradient(circle,rgba(0,163,137,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(45,212,191,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(216,243,236,0.5)_0%,transparent_70%)] pointer-events-none" />

      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 space-y-9 relative z-10">

        {/* ================================================================
            EXPANDED CATEGORIES HEADER & CAROUSEL CONTROLLER
            ================================================================ */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E2F7F4] text-[#00897B] text-[11px] font-mono font-bold tracking-wider uppercase border border-[#B3E7E2]/60 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#00A389] animate-pulse" />
              <span>PRODUCT CATEGORIES</span>
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0E2358] tracking-tight leading-tight">
              Explore Our Categories
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
              Discover Pharmavive&apos;s verified catalog directly from our certified database, built for analytical research, reference standards, and custom synthesis.
            </p>
          </div>

          {/* Carousel Navigation Buttons & Live Counter */}
          <div className="flex items-center gap-3 shrink-0 self-start sm:self-end">
            <button
              type="button"
              onClick={handlePrev}
              disabled={loading || categories.length <= 1}
              className="w-10 h-10 rounded-full bg-white hover:bg-[#F2FBF9] border border-slate-200 text-slate-700 hover:text-[#00A389] hover:border-[#00E5BE]/60 hover:shadow-[0_0_15px_rgba(0,229,190,0.35)] flex items-center justify-center shadow-2xs transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous category"
            >
              <IoChevronBackOutline size={18} />
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={loading || categories.length <= 1}
              className="w-10 h-10 rounded-full bg-white hover:bg-[#F2FBF9] border border-slate-200 text-slate-700 hover:text-[#00A389] hover:border-[#00E5BE]/60 hover:shadow-[0_0_15px_rgba(0,229,190,0.35)] flex items-center justify-center shadow-2xs transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next category"
            >
              <IoChevronForwardOutline size={18} />
            </button>

            <span className="font-mono text-xs sm:text-sm font-bold text-slate-600 bg-white px-3.5 py-2 rounded-full border border-slate-200/80 shadow-2xs">
              {categories.length > 0 ? selectedCatIndex + 1 : 0} / {categories.length}
            </span>
          </div>
        </div>

        {/* ================================================================
            HORIZONTAL CAROUSEL OF CATEGORY CARDS (LIVE MONGODB DATA)
            ================================================================ */}
        <div
          ref={carouselRef}
          onScroll={handleScroll}
          className="flex items-stretch gap-4 overflow-x-auto pb-5 pt-2 snap-x scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent select-none"
        >
          {loading ? (
            [...Array(5)].map((_, idx) => (
              <div
                key={idx}
                className="shrink-0 w-[85%] sm:w-[calc((100%-16px)/2)] md:w-[calc((100%-32px)/3)] lg:w-[calc((100%-48px)/4)] xl:w-[calc((100%-64px)/5)] rounded-3xl p-5 flex flex-col justify-between border border-slate-200 bg-white h-72 animate-pulse"
              >
                <div className="flex justify-between items-center">
                  <div className="w-16 h-4 bg-slate-200 rounded-full" />
                  <div className="w-6 h-3 bg-slate-100 rounded" />
                </div>
                <div className="w-24 h-24 bg-slate-100 rounded-full mx-auto my-4" />
                <div className="space-y-2">
                  <div className="w-3/4 h-5 bg-slate-200 rounded" />
                  <div className="w-1/2 h-3 bg-slate-100 rounded" />
                </div>
                <div className="w-full h-8 bg-slate-100 rounded-full mt-3" />
              </div>
            ))
          ) : (
            categories.map((cat, idx) => {
              const isSelected = selectedCatIndex === idx;
              return (
                <div
                  key={cat.id}
                  onClick={() => handleSelectCategory(idx)}
                  className={`shrink-0 w-[85%] sm:w-[calc((100%-16px)/2)] md:w-[calc((100%-32px)/3)] lg:w-[calc((100%-48px)/4)] xl:w-[calc((100%-64px)/5)] rounded-3xl p-5 flex flex-col justify-between cursor-pointer transition-transform duration-200 ease-out relative group snap-start bg-gradient-to-b ${cat.bgGradient} ${
                    isSelected
                      ? `ring-2 ring-[#00A389] shadow-lg -translate-y-1.5 ${cat.activeBorder}`
                      : 'border border-white/80 hover:-translate-y-1 hover:shadow-md'
                  }`}
                  style={{
                    boxShadow: isSelected ? `0 12px 28px -6px ${cat.glowColor}` : undefined,
                  }}
                >
                  {/* Radiant Ambient Aurora Backdrop Behind Active Card */}
                  {isSelected && (
                    <div className="absolute -inset-1 rounded-3xl bg-[radial-gradient(ellipse_at_center,rgba(0,229,190,0.25)_0%,transparent_70%)] -z-10 pointer-events-none" />
                  )}

                  {/* Category Top Pill Badge */}
                  <div className="flex items-center justify-between">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10.5px] font-mono font-bold bg-white/80 text-[#0E2358] backdrop-blur-xs border border-white/60 shadow-2xs">
                      {cat.badge}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 font-semibold">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* 3D Visual Illustration */}
                  <div className="relative w-full h-32 flex items-center justify-center my-3">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      width={115}
                      height={115}
                      priority={idx < 5}
                      className="object-contain group-hover:scale-105 transition-transform duration-200 ease-out pointer-events-none"
                      onError={(e) => {
                        e.currentTarget.src = cat.fallbackCard;
                      }}
                    />
                  </div>

                  {/* Category Title & Product Count */}
                  <div className="mt-2 space-y-1">
                    <h3 className="font-extrabold text-sm sm:text-base text-[#0E2358] leading-tight line-clamp-1">
                      {cat.name}
                    </h3>
                    <p className="text-xs font-mono text-slate-500 font-semibold">
                      {cat.count}
                    </p>
                  </div>

                  {/* Bottom Action Area: Direct Link to Category Portal */}
                  <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between">
                    <Link
                      href={cat.link}
                      className="text-xs font-semibold text-slate-600 group-hover:text-[#00A389] transition-colors inline-flex items-center gap-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>Explore Products</span>
                    </Link>
                    <Link
                      href={cat.link}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-[#00A389] text-white shadow-[0_0_12px_rgba(0,163,137,0.5)]'
                          : 'bg-white/90 text-slate-700 group-hover:bg-[#00A389] group-hover:text-white group-hover:shadow-[0_0_10px_rgba(0,163,137,0.4)] shadow-2xs'
                      }`}
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`Explore ${cat.name}`}
                    >
                      <IoArrowForward size={14} />
                    </Link>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* ================================================================
            CATEGORY FILTER PILLS BAR (DYNAMICALLY DRIVEN BY LIVE MONGODB)
            ================================================================ */}
        {!loading && categories.length > 0 && (
          <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat, idx) => {
              const isPillActive = selectedCatIndex === idx;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleSelectCategory(idx)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                    isPillActive
                      ? 'bg-[#00A389] text-white font-bold shadow-[0_0_16px_rgba(0,163,137,0.45)] ring-2 ring-[#00E5BE]/60 scale-102'
                      : 'bg-white text-slate-600 hover:text-[#00A389] hover:bg-slate-50 border border-slate-200/80 hover:border-[#00E5BE]/40 shadow-2xs'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        )}

        {/* ================================================================
            BOTTOM SCIENTIFIC ASSURANCE BAR (Floating Card with 4 Pillars)
            ================================================================ */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl sm:rounded-full border border-[#D5EFEA] shadow-[0_10px_30px_-10px_rgba(0,163,137,0.12)] p-4 sm:px-8 sm:py-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">

            {/* Pillar 1: High Purity */}
            <div className="flex items-center gap-3.5 sm:px-3 pt-2 sm:pt-0">
              <div className="w-11 h-11 rounded-2xl bg-[#E6F8F3] text-[#00A389] flex items-center justify-center shrink-0 shadow-2xs">
                <IoShieldCheckmarkOutline size={22} />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-[#0E2358]">High Purity</h4>
                <p className="text-[11px] text-slate-500 font-normal">Consistent quality &amp; reliability</p>
              </div>
            </div>

            {/* Pillar 2: Global Supply */}
            <div className="flex items-center gap-3.5 sm:px-3 pt-2 sm:pt-0">
              <div className="w-11 h-11 rounded-2xl bg-[#CCFBF1] text-[#0D9488] flex items-center justify-center shrink-0 shadow-2xs">
                <IoFlaskOutline size={22} />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-[#0E2358]">Global Supply</h4>
                <p className="text-[11px] text-slate-500 font-normal">Worldwide availability</p>
              </div>
            </div>

            {/* Pillar 3: Technical Support */}
            <div className="flex items-center gap-3.5 sm:px-3 pt-2 sm:pt-0">
              <div className="w-11 h-11 rounded-2xl bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center shrink-0 shadow-2xs">
                <IoHeadsetOutline size={22} />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-[#0E2358]">Technical Support</h4>
                <p className="text-[11px] text-slate-500 font-normal">Expert assistance for your needs</p>
              </div>
            </div>

            {/* Pillar 4: Custom Packaging */}
            <div className="flex items-center gap-3.5 sm:px-3 pt-2 sm:pt-0">
              <div className="w-11 h-11 rounded-2xl bg-[#EDE9FE] text-[#7C3AED] flex items-center justify-center shrink-0 shadow-2xs">
                <IoCubeOutline size={22} />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-[#0E2358]">Custom Packaging</h4>
                <p className="text-[11px] text-slate-500 font-normal">Flexible pack sizes &amp; solutions</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}


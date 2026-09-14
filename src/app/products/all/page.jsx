'use client';

import React from 'react';
import ProductShowcaseMockup from '@/Components/Products/ProductShowcaseMockup';
import CatalogProductsExplorer from '@/Components/Products/CatalogProductsExplorer';
import SynthesisPartnerBanner from '@/Components/Products/SynthesisPartnerBanner';

export default function ProductsAllPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* 1. Hero Showcase: Direct Match to Reference Mockup */}
      <ProductShowcaseMockup />

      {/* 2. Catalog Products Explorer: Search Bar, Filter Sidebar, and 4-Column Product Grid */}
      <CatalogProductsExplorer />

      {/* 3. Your Synthesis Partner: Custom Synthesis RFQ Banner */}
      <SynthesisPartnerBanner />
    </main>
  );
}

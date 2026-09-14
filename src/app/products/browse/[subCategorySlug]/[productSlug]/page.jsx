'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { capitalizeWords } from '@/utils/stringUtils';
import { formatMolecularFormula, copyToClipboard } from '@/utils/chemUtils';
import { useEnquiryCart } from '@/context/EnquiryCartContext';
import CompoundStructureThumbnail from '@/Components/EnquiryCart/CompoundStructureThumbnail';
import {
  IoChevronForwardOutline,
  IoCopyOutline,
  IoCheckmarkOutline,
  IoLogoWhatsapp,
  IoMailOutline,
  IoArrowForward,
  IoArrowBack,
  IoExpandOutline,
  IoCloseOutline,
  IoFlaskOutline,
  IoShareSocialOutline,
} from 'react-icons/io5';
import { getCachedProduct, setCachedProduct } from '@/utils/clientCache';

const PACK_SIZES = ['10mg', '25mg', '50mg', '100mg', '500mg', '1g', '5g', 'Custom'];

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { subCategorySlug, productSlug } = params || {};
  const slugKey = productSlug ? productSlug.toLowerCase() : '';
  const initialCached = slugKey ? getCachedProduct(slugKey) : null;

  const [product, setProduct] = useState(initialCached?.product || null);
  const [loading, setLoading] = useState(!initialCached);
  const [error, setError] = useState(null);

  // Sibling / Related products in same subcategory
  const [relatedProducts, setRelatedProducts] = useState(initialCached?.relatedProducts || []);

  // Quotation controls
  const [selectedPackSize, setSelectedPackSize] = useState('50mg');
  const [customPackInput, setCustomPackInput] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [copiedKey, setCopiedKey] = useState(null);
  const [showStructureModal, setShowStructureModal] = useState(false);

  const { addToCart, isInCart, cart } = useEnquiryCart();

  useEffect(() => {
    if (!productSlug) return;

    const cached = getCachedProduct(slugKey);
    if (cached) {
      setProduct(cached.product);
      setRelatedProducts(cached.relatedProducts || []);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    fetch(`/api/products/single/${encodeURIComponent(productSlug)}`, { signal: controller.signal })
      .then(res => res.json())
      .then(data => {
        clearTimeout(timeoutId);
        if (data.success && data.product) {
          setProduct(data.product);
          setRelatedProducts(data.relatedProducts || []);
          setError(null);

          // Cache current compound for instant revisit
          setCachedProduct(slugKey, {
            product: data.product,
            relatedProducts: data.relatedProducts || [],
          });

          // Pre-seed sibling compounds into cache so clicking them is 0ms instant
          if (Array.isArray(data.relatedProducts)) {
            data.relatedProducts.forEach((rel) => {
              if (rel.slug) {
                setCachedProduct(rel.slug, {
                  product: rel,
                  relatedProducts: [
                    data.product,
                    ...data.relatedProducts.filter((r) => r.slug !== rel.slug),
                  ],
                });
              }
            });
          }
        } else {
          setError(data.error || 'Product not found');
        }
        setLoading(false);
      })
      .catch((err) => {
        clearTimeout(timeoutId);
        if (err.name === 'AbortError') {
          // Request was aborted by new navigation; ignore cleanly
          return;
        }
        setError('Unable to load product information from database. Please try again.');
        setLoading(false);
      });

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [productSlug, subCategorySlug, slugKey]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showStructureModal) {
        setShowStructureModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showStructureModal]);

  const handleCopy = async (text, key) => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  const handleShare = async () => {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    const ok = await copyToClipboard(currentUrl);
    if (ok) {
      setCopiedKey('share');
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  const activePackSize = selectedPackSize === 'Custom' && customPackInput.trim()
    ? customPackInput.trim()
    : selectedPackSize;

  const handleAddEnquiry = () => {
    if (!product) return;
    const itemToAdd = {
      ...product,
      _id: product._id || product.slug || productSlug || ('pv-' + (product.name || 'item').toLowerCase().replace(/\s+/g, '-')),
      slug: product.slug || productSlug,
    };
    addToCart(itemToAdd, {
      quantity,
      packSize: activePackSize,
      autoOpen: true,
    });
  };

  const handleDirectWhatsApp = () => {
    if (!product) return;
    let msg = `*PHARMAVIVE CHEMICAL ENQUIRY*\n`;
    msg += `------------------------------------\n`;
    msg += `• Compound: *${product.name}*\n`;
    msg += `• Cat No: ${product.catNumber || 'N/A'}\n`;
    if (product.casNumber && product.casNumber !== 'NA') msg += `• CAS No: ${product.casNumber}\n`;
    if (product.chemicalName) msg += `• Systematic Name: ${product.chemicalName}\n`;
    msg += `• Desired Pack: ${activePackSize}\n`;
    msg += `• Quantity: ${quantity}\n\n`;
    msg += `Please provide quotation and Certificate of Analysis availability.`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/916302616273?text=${encoded}`, '_blank');
  };

  if (loading && !product) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] py-4 sm:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 animate-pulse">
          <div className="w-56 h-4 bg-slate-200 rounded-full" />
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-4 sm:p-6 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              <div className="lg:col-span-6 h-[340px] sm:h-[380px] bg-slate-100 rounded-2xl" />
              <div className="lg:col-span-6 space-y-3.5 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="w-3/4 h-8 bg-slate-200 rounded-lg" />
                  <div className="w-40 h-4 bg-slate-100 rounded" />
                </div>
                <div className="w-full h-32 bg-slate-50 border border-slate-100 rounded-xl" />
                <div className="w-full h-10 bg-slate-100 rounded-xl" />
                <div className="w-full h-11 bg-slate-200 rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!loading && error && !product) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] py-24 flex items-center justify-center">
        <div className="max-w-md mx-auto px-6 text-center space-y-5 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-[#E2F7F4] text-[#00897B] flex items-center justify-center">
            <IoFlaskOutline size={32} />
          </div>
          <h1 className="text-2xl font-extrabold text-[#0E2358]">Compound Not Found</h1>
          <p className="text-xs text-slate-500 leading-relaxed">{error || 'The requested product could not be located in our active database.'}</p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => router.back()}
              className="px-5 py-2.5 rounded-full border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer transition-all"
            >
              Go Back
            </button>
            <Link
              href="/products"
              className="px-6 py-2.5 rounded-full bg-[#00A389] hover:bg-[#00897B] text-white text-xs font-semibold shadow-sm cursor-pointer transition-all"
            >
              Browse Catalog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const subCategoryName = product.subCategory?.name
    ? capitalizeWords(product.subCategory.name)
    : 'Subcategory';
  const mainCategoryName = product.subCategory?.mainCategory?.name
    ? capitalizeWords(product.subCategory.mainCategory.name)
    : 'Pharmaceuticals';
  const mainCategorySlug = product.subCategory?.mainCategory?.slug || 'api-impurity-standards';

  const alreadyInCart = isInCart(product._id);
  const cartItemCount = (cart || []).find(i => (i._id || i.slug) === (product._id || product.slug))?.quantity;

  const emailSubject = `RFQ Enquiry: ${product.name} (${product.catNumber || 'N/A'})`;
  const emailBody = `Hello Pharmavive Team,\n\nPlease provide quotation and technical documentation for:\n• Compound: ${product.name}\n• Cat No: ${product.catNumber || 'N/A'}\n• CAS No: ${product.casNumber || 'N/A'}\n• Pack Size: ${activePackSize}\n• Quantity: ${quantity}\n\nThank you.`;
  const emailHref = `mailto:info.pharmavive@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0E2358] selection:bg-[#00A389]/15">
      
      {/* Precision Brand Gradient Accent Top Line */}
      <div className="h-[3px] w-full bg-gradient-to-r from-[#00A389] via-[#08A698] to-[#0E2358]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 space-y-4">
        
        {/* ================================================================
            BREADCRUMB & UTILITY NAVIGATION
            ================================================================ */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <nav className="flex items-center gap-2 text-slate-500 flex-wrap">
            <Link href="/" className="hover:text-[#00A389] transition-colors">Home</Link>
            <span className="text-slate-300">/</span>
            <Link href="/products" className="hover:text-[#00A389] transition-colors">Products</Link>
            {mainCategorySlug && (
              <>
                <span className="text-slate-300">/</span>
                <Link
                  href={`/products/category/${encodeURIComponent(mainCategorySlug.toLowerCase())}`}
                  className="hover:text-[#00A389] transition-colors"
                >
                  {mainCategoryName}
                </Link>
              </>
            )}
            {subCategorySlug && (
              <>
                <span className="text-slate-300">/</span>
                <Link
                  href={`/products/browse/${encodeURIComponent(subCategorySlug.toLowerCase())}`}
                  className="hover:text-[#00A389] transition-colors font-semibold"
                >
                  {subCategoryName}
                </Link>
              </>
            )}
            <span className="text-slate-300">/</span>
            <span className="text-[#00897B] font-bold truncate max-w-[200px] sm:max-w-xs">{product.name}</span>
          </nav>

          <div className="flex items-center gap-3 self-start sm:self-auto text-xs">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 text-slate-500 hover:text-[#00897B] transition-colors cursor-pointer py-1 font-medium"
              title="Copy link to compound"
            >
              {copiedKey === 'share' ? (
                <>
                  <IoCheckmarkOutline size={14} className="text-[#00A389]" />
                  <span className="text-[#00897B] font-bold">Link Copied</span>
                </>
              ) : (
                <>
                  <IoShareSocialOutline size={14} />
                  <span>Share</span>
                </>
              )}
            </button>
            <span className="text-slate-300">·</span>
            <Link
              href={subCategorySlug ? `/products/browse/${encodeURIComponent(subCategorySlug.toLowerCase())}` : '/products'}
              className="text-slate-500 hover:text-[#00A389] transition-colors flex items-center gap-1 font-medium"
            >
              <IoArrowBack size={13} />
              <span>Back to {subCategoryName}</span>
            </Link>
          </div>
        </div>

        {/* ================================================================
            SCIENTIFIC PRODUCT PANEL (Clean Sans-Serif Typography - Compact)
            ================================================================ */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm p-4 sm:p-5 lg:p-6">
          
          {/* Header Tag */}
          <div className="text-[11px] font-bold tracking-wider text-[#00A389] uppercase mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00A389]" />
            <span>PRODUCT · {subCategoryName.toUpperCase()}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-stretch">
            
            {/* ------------------------------------------------------------
                LEFT: MOLECULAR STRUCTURE STAGE (Compact Scientific Showcase)
                ------------------------------------------------------------ */}
            <div className="lg:col-span-6 flex flex-col">
              <div
                onClick={() => setShowStructureModal(true)}
                className="relative w-full h-[320px] sm:h-[360px] lg:h-full min-h-[320px] lg:min-h-[360px] rounded-2xl border border-slate-200/90 bg-[#FAFDFD] p-4 sm:p-5 flex flex-col justify-between cursor-pointer group transition-all duration-300 hover:border-[#00A389]/60 hover:shadow-md overflow-hidden"
              >
                {/* Top Utility: Enlarge action */}
                <div className="flex items-center justify-end pb-1">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 text-slate-500 group-hover:text-[#00897B] bg-white group-hover:bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
                  >
                    <IoExpandOutline size={14} />
                    <span>Enlarge</span>
                  </button>
                </div>

                {/* 2D Skeletal Molecular Structure graphic (Big & Centered in Middle) */}
                <div className="relative flex-1 w-full h-full flex items-center justify-center overflow-hidden my-auto p-1 sm:p-2">
                  <div className="relative w-full h-full max-w-[400px] max-h-[300px] flex items-center justify-center transform scale-115 sm:scale-125 transition-transform duration-300 group-hover:scale-[1.32]">
                    <CompoundStructureThumbnail item={product} isModal={true} className="w-full h-full" />
                  </div>
                </div>

                {/* Bottom Details Strip */}
                <div className="pt-2 border-t border-slate-100 flex items-center text-slate-400 text-xs">
                  <span>Cat. No: <strong className="text-slate-700 font-semibold">{product.catNumber || 'PV-SPEC-001'}</strong></span>
                </div>
              </div>
            </div>

            {/* ------------------------------------------------------------
                RIGHT: EDITORIAL METADATA, SPECS STRIP & COMMERCIAL ACTIONS
                Compact, high-density scientific presentation (fits above fold)
                ------------------------------------------------------------ */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-3 sm:space-y-3.5">
              
              {/* Compound Title & Identification */}
              <div className="space-y-1.5">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#0E2358] tracking-tight leading-snug">
                  {product.name}
                </h1>
                
                {/* Horizontal Separator Rule */}
                <div className="w-full h-px bg-slate-200 my-1.5" />

                {/* Catalog Code & Systematic Chemical Name */}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-bold text-[#00897B] bg-[#E6F7F4] px-2.5 py-0.5 rounded-md border border-[#BDE8E1]">
                    {product.catNumber || 'PV-SPEC-001'}
                  </span>
                  {product.chemicalName && (
                    <>
                      <span className="text-slate-300">·</span>
                      <span className="text-slate-500 italic truncate max-w-xs sm:max-w-sm lg:max-w-md text-xs" title={product.chemicalName}>
                        {product.chemicalName}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Clean Scientific Specification Strip (Compact row padding) */}
              <div className="border-t border-b border-slate-200/80 divide-y divide-slate-100 text-xs sm:text-sm">
                
                {/* CAS No. */}
                <div className="py-1.5 sm:py-2 flex items-center justify-between sm:justify-start sm:gap-8">
                  <span className="text-slate-500 font-medium w-24 sm:w-28 shrink-0 text-xs">
                    CAS No.
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-slate-900 text-xs sm:text-sm">
                      {product.casNumber && product.casNumber !== 'NA' ? product.casNumber : 'NA (Impurity Standard)'}
                    </span>
                    {product.casNumber && product.casNumber !== 'NA' && (
                      <button
                        type="button"
                        onClick={() => handleCopy(product.casNumber, 'cas')}
                        className="text-slate-400 hover:text-[#00A389] transition-colors cursor-pointer p-0.5"
                        title="Copy CAS"
                      >
                        {copiedKey === 'cas' ? <IoCheckmarkOutline size={15} className="text-[#00A389]" /> : <IoCopyOutline size={14} />}
                      </button>
                    )}
                  </div>
                </div>

                {/* Cat. No. */}
                <div className="py-1.5 sm:py-2 flex items-center justify-between sm:justify-start sm:gap-8">
                  <span className="text-slate-500 font-medium w-24 sm:w-28 shrink-0 text-xs">
                    Cat. No.
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-slate-900 text-xs sm:text-sm">
                      {product.catNumber || 'N/A'}
                    </span>
                    {product.catNumber && (
                      <button
                        type="button"
                        onClick={() => handleCopy(product.catNumber, 'cat')}
                        className="text-slate-400 hover:text-[#00A389] transition-colors cursor-pointer p-0.5"
                        title="Copy Cat No"
                      >
                        {copiedKey === 'cat' ? <IoCheckmarkOutline size={15} className="text-[#00A389]" /> : <IoCopyOutline size={14} />}
                      </button>
                    )}
                  </div>
                </div>

                {/* Formula */}
                <div className="py-1.5 sm:py-2 flex items-center justify-between sm:justify-start sm:gap-8">
                  <span className="text-slate-500 font-medium w-24 sm:w-28 shrink-0 text-xs">
                    Formula
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-slate-900 text-xs sm:text-sm">
                      {product.molecularFormula ? formatMolecularFormula(product.molecularFormula) : 'Verified on CoA'}
                    </span>
                    {product.molecularFormula && (
                      <button
                        type="button"
                        onClick={() => handleCopy(product.molecularFormula, 'formula')}
                        className="text-slate-400 hover:text-[#00A389] transition-colors cursor-pointer p-0.5"
                        title="Copy Formula"
                      >
                        {copiedKey === 'formula' ? <IoCheckmarkOutline size={15} className="text-[#00A389]" /> : <IoCopyOutline size={14} />}
                      </button>
                    )}
                  </div>
                </div>

                {/* Molecular Weight */}
                <div className="py-1.5 sm:py-2 flex items-center justify-between sm:justify-start sm:gap-8">
                  <span className="text-slate-500 font-medium w-24 sm:w-28 shrink-0 text-xs">
                    Mol Wt.
                  </span>
                  <span className="font-semibold text-slate-900 text-xs sm:text-sm">
                    {product.molecularWeight ? `${product.molecularWeight} g/mol` : 'Specified on CoA'}
                  </span>
                </div>

                {/* Availability */}
                <div className="py-1.5 sm:py-2 flex items-center justify-between sm:justify-start sm:gap-8">
                  <span className="text-slate-500 font-medium w-24 sm:w-28 shrink-0 text-xs">
                    Availability
                  </span>
                  <div className="flex items-center gap-1.5 font-semibold text-emerald-700 text-xs sm:text-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{product.stock && product.stock.toLowerCase() !== 'out of stock' ? 'In Stock' : (product.stock || 'In Stock')}</span>
                  </div>
                </div>
              </div>

              {/* Pack Size & Quantity Header with Chips */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                    SELECT PACK SIZE:
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-600">Qty:</span>
                    <div className="inline-flex items-center rounded-full border border-slate-200 bg-white shadow-2xs px-1 py-0.5">
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-5 h-5 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100 active:bg-slate-200 font-bold text-xs cursor-pointer transition-colors"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="w-7 text-center text-xs font-bold text-[#0E2358]">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-5 h-5 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100 active:bg-slate-200 font-bold text-xs cursor-pointer transition-colors"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Pack Size Buttons */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {PACK_SIZES.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedPackSize(size)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        selectedPackSize === size
                          ? 'bg-[#0E2358] text-white border border-[#0E2358] shadow-2xs'
                          : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 shadow-2xs'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                {/* Custom Pack Size Input */}
                {selectedPackSize === 'Custom' && (
                  <div className="pt-0.5">
                    <input
                      type="text"
                      value={customPackInput}
                      onChange={(e) => setCustomPackInput(e.target.value)}
                      placeholder="Specify custom quantity (e.g. 250mg, 5g, bulk)..."
                      className="w-full text-xs px-3 py-1.5 rounded-lg bg-white border border-[#00A389] focus:outline-none text-[#0E2358] shadow-2xs transition-all"
                    />
                  </div>
                )}
              </div>

              {/* Action Deck: Add to Enquiry + Highlighted Email & WhatsApp Buttons */}
              <div className="space-y-2 pt-0.5">
                {/* Dominant Primary: Add to Enquiry */}
                <button
                  type="button"
                  onClick={handleAddEnquiry}
                  className="w-full py-2.5 sm:py-3 px-6 rounded-xl bg-[#0E2358] hover:bg-[#00897B] active:scale-[0.99] text-white font-bold text-xs sm:text-sm tracking-wider uppercase shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>ADD TO ENQUIRY</span>
                  {alreadyInCart && (
                    <span className="text-[11px] bg-white/20 px-2.5 py-0.5 rounded-full font-medium tracking-normal">
                      {cartItemCount} added
                    </span>
                  )}
                </button>

                {/* Highlighted Secondary Actions: Email RFQ & WhatsApp */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <a
                    href={emailHref}
                    className="py-2 sm:py-2.5 px-4 rounded-xl bg-white hover:bg-slate-50 text-[#0E2358] border-2 border-[#0E2358] font-bold text-xs tracking-wide uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                  >
                    <IoMailOutline size={16} className="text-[#0E2358]" />
                    <span>Email RFQ</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleDirectWhatsApp}
                    className="py-2 sm:py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs tracking-wide uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <IoLogoWhatsapp size={16} />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ================================================================
            SECTION 2: COMPANION REFERENCE STANDARDS (Impurity Series)
            ================================================================ */}
        {relatedProducts.length > 0 && (
          <div className="pt-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#00A389] block">
                  Series Impurity Standards
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0E2358] tracking-tight">
                  Related Compounds in {subCategoryName}
                </h3>
              </div>
              <Link
                href={`/products/browse/${encodeURIComponent((subCategorySlug || '').toLowerCase())}`}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#00897B] hover:text-[#0E2358] transition-colors"
              >
                <span>View All ({relatedProducts.length + 1})</span>
                <IoChevronForwardOutline size={13} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedProducts.map((relItem) => (
                <Link
                  key={relItem._id || relItem.slug}
                  href={`/products/browse/${encodeURIComponent((subCategorySlug || 'all').toLowerCase())}/${encodeURIComponent(relItem.slug)}`}
                  className="group rounded-2xl bg-white hover:bg-slate-50 border border-slate-200/90 hover:border-[#00A389] p-4 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-full h-36 rounded-xl bg-[#FAFDFD] border border-slate-100 flex items-center justify-center p-3 relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
                      <CompoundStructureThumbnail item={relItem} className="w-full h-full" />
                    </div>
                    <div>
                      {relItem.catNumber && (
                        <span className="text-[10px] font-bold text-slate-400 block mb-0.5">
                          {relItem.catNumber}
                        </span>
                      )}
                      <h4 className="text-xs font-bold text-[#0E2358] group-hover:text-[#00A389] transition-colors line-clamp-2 leading-snug">
                        {relItem.name}
                      </h4>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>{relItem.casNumber && relItem.casNumber !== 'NA' ? `CAS: ${relItem.casNumber}` : 'Standard'}</span>
                    <span className="text-[#00897B] font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                      <span>View</span>
                      <IoArrowForward size={11} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ================================================================
            SECTION 3: BESPOKE SYNTHESIS & SCALE-UP BANNER
            ================================================================ */}
        <div className="rounded-3xl bg-gradient-to-br from-[#063935] via-[#084A45] to-[#042825] border border-[#0E5953] p-6 sm:p-8 lg:p-10 relative overflow-hidden shadow-sm text-white">
          <div className="absolute -right-8 -bottom-8 w-60 h-60 rounded-full bg-[#00A389]/25 blur-3xl pointer-events-none" />

          {/* Watermark Flask Graphic */}
          <div className="absolute right-6 bottom-2 opacity-15 pointer-events-none w-36 h-36">
            <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.75" className="w-full h-full text-emerald-200">
              <path d="M45 20 L75 20 M60 20 L60 38 L30 85 A 10 10 0 0 0 38 98 L82 98 A 10 10 0 0 0 90 85 L60 38" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="38" y1="75" x2="82" y2="75" strokeDasharray="3 3" />
              <circle cx="50" cy="82" r="3.5" fill="currentColor" />
              <circle cx="68" cy="88" r="2.5" fill="currentColor" />
            </svg>
          </div>

          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-[#2DD4BF] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2DD4BF] animate-pulse" />
              <span>CUSTOM SYNTHESIS &amp; SCALE-UP</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Need Gram-to-Kilogram Quantities or Custom Analogs?
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/85 leading-relaxed">
              Pharmavive delivers bespoke organic synthesis, stable isotope labeling, and impurity isolation tailored to your analytical specifications.
            </p>
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <Link
                href="/synthesis"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#063E3A] hover:bg-emerald-50 text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <span>Request Custom Synthesis</span>
                <IoArrowForward size={14} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-transparent hover:bg-white/10 text-white border border-emerald-300/40 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
              >
                <span>Speak with a Chemist</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================
          STRUCTURE EXPAND MODAL LIGHTBOX
          ================================================================ */}
      {showStructureModal && (
        <div className="fixed inset-0 z-[80] overflow-y-auto flex items-center justify-center p-4 select-none animate-in fade-in duration-200">
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity cursor-pointer"
            onClick={() => setShowStructureModal(false)}
            aria-hidden="true"
          />

          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in zoom-in-95 duration-200">
            <div className="h-1 w-full bg-gradient-to-r from-[#00A389] via-[#08A698] to-[#0E2358]" />

            <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
              <div>
                <span className="text-xs text-[#00897B] font-bold block uppercase tracking-wider">
                  Molecular Structure Analysis
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-[#0E2358]">{product.name}</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowStructureModal(false)}
                className="w-9 h-9 rounded-full bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                title="Close Lightbox"
              >
                <IoCloseOutline size={22} />
              </button>
            </div>

            <div className="p-8 bg-[#FAFDFD] flex items-center justify-center h-80 sm:h-96 relative overflow-hidden">
              <div className="relative w-full h-full max-w-md max-h-80 flex items-center justify-center">
                <CompoundStructureThumbnail item={product} isModal={true} className="w-full h-full" />
              </div>
            </div>

            <div className="p-4 sm:p-5 border-t border-slate-100 bg-white flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-3">
                {product.catNumber && (
                  <span className="font-bold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-md">
                    Cat: {product.catNumber}
                  </span>
                )}
                {product.casNumber && product.casNumber !== 'NA' && (
                  <span className="text-[#00897B] font-bold bg-[#E6F7F4] px-2.5 py-1 rounded-md">
                    CAS: {product.casNumber}
                  </span>
                )}
                {product.molecularFormula && (
                  <span className="text-slate-600 font-bold bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200">
                    {formatMolecularFormula(product.molecularFormula)}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setShowStructureModal(false)}
                className="px-5 py-2 rounded-full bg-[#0E2358] text-white font-semibold hover:bg-slate-800 transition-all cursor-pointer shadow-xs"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

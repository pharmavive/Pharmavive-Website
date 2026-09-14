// src/utils/clientCache.js
/**
 * High-Performance Client-Side In-Memory Cache & Promise Deduplicator
 * Provides instant (0ms) zero-latency transitions for compound detail pages,
 * hero products, and main categories across route changes.
 */

// 1. Pre-seeded Hero Compounds from Excel Catalog
// Ensures clicking "View Details" from homepage hero renders in 0ms on the very first frame
const PRESEEDED_PRODUCTS = {
  'zabedosertib-reagent-intermediate': {
    product: {
      _id: '6aa7af01649ade3d90871f64',
      name: 'N-(6-(2-Hydroxypropan-2-yl)-1-(2-(methylsulfonyl)ethyl)-1H-indazol-5-yl)-6-(trifluoromethyl)picolinamide',
      catNumber: 'PV-REA-2751',
      chemicalName: 'N-(6-(2-Hydroxypropan-2-yl)-1-(2-(methylsulfonyl)ethyl)-1H-indazol-5-yl)-6-(trifluoromethyl)picolinamide',
      casNumber: '2751749-06-9',
      molecularFormula: 'C20H21F3N4O4S',
      molecularWeight: '470.47',
      purity: '≥98.5% (HPLC)',
      stock: 'Instock',
      slug: 'zabedosertib-reagent-intermediate',
      subCategory: {
        _id: '6aa7af01649ade3d90871f60',
        name: 'Zabedosertib',
        slug: 'zabedosertib',
        description: 'Zabedosertib research intermediates and reagents.',
        mainCategory: {
          _id: '685bb07bf10edd4a8ff75b56',
          name: 'Peptide Coupling Reagents',
          slug: 'peptide-coupling-reagents',
        },
      },
      image: '/excel_structures/excel_structure_1.png',
    },
    relatedProducts: [],
  },
  '5-piperazin-1-yl-benzofuran-2-carboxamide': {
    product: {
      _id: '6aa7af01649ade3d90871f65',
      name: '5-(Piperazin-1-yl)benzofuran-2-carboxamide',
      catNumber: 'PV-STD-1832',
      chemicalName: '5-(Piperazin-1-yl)benzofuran-2-carboxamide',
      casNumber: '183288-46-2',
      molecularFormula: 'C13H15N3O2',
      molecularWeight: '245.28',
      purity: '≥99.0% (HPLC)',
      stock: 'Instock',
      slug: '5-piperazin-1-yl-benzofuran-2-carboxamide',
      subCategory: {
        _id: '6aa7af01649ade3d90871f61',
        name: 'Vilazodone',
        slug: 'vilazodone',
        description: 'Vilazodone intermediates and reference standards.',
        mainCategory: {
          _id: '685bb05cf10edd4a8ff75b50',
          name: 'Building Blocks',
          slug: 'building-blocks',
        },
      },
      image: '/excel_structures/excel_structure_2.png',
    },
    relatedProducts: [],
  },
  'moxifloxacin-difluoro-methoxy-impurity': {
    product: {
      _id: '6aa7af01649ade3d90871f66',
      name: '1-Cyclopropyl-6,7-difluoro-8-methoxy-4-oxo-1,4-dihydroquinoline-3-carboxylic acid',
      catNumber: 'PV-MXF-1128',
      chemicalName: '1-Cyclopropyl-6,7-difluoro-8-methoxy-4-oxo-1,4-dihydroquinoline-3-carboxylic acid',
      commonName: 'Moxifloxacin Difluoro Methoxy Impurity',
      casNumber: '112811-72-0',
      molecularFormula: 'C14H11F2NO4',
      molecularWeight: '295.24',
      purity: '≥99.0% (HPLC)',
      stock: 'Instock',
      slug: 'moxifloxacin-difluoro-methoxy-impurity',
      subCategory: {
        _id: '6aa7af01649ade3d90871f62',
        name: 'Moxifloxacin',
        slug: 'moxifloxacin',
        description: 'Moxifloxacin impurity standards and analytical compounds.',
        mainCategory: {
          _id: '685bb03ff10edd4a8ff75b4a',
          name: 'API Impurity Standards',
          slug: 'api-impurity-standards',
        },
      },
      image: '/excel_structures/excel_structure_3.png',
    },
    relatedProducts: [],
  },
  'eletriptan-bromo-indole-impurity': {
    product: {
      _id: '6aa7af02649ade3d90871f67',
      name: '(R)-Benzyl 2-(5-bromo-1H-indole-3-carbonyl)pyrrolidine-1-carboxylate',
      catNumber: 'PV-ELT-1433',
      chemicalName: '(R)-Benzyl 2-(5-bromo-1H-indole-3-carbonyl)pyrrolidine-1-carboxylate',
      casNumber: '143322-56-9',
      molecularFormula: 'C21H19BrN2O3',
      molecularWeight: '427.29',
      purity: '≥98.0% (HPLC)',
      stock: 'Instock',
      slug: 'eletriptan-bromo-indole-impurity',
      subCategory: {
        _id: '6aa7af01649ade3d90871f63',
        name: 'Eletriptan',
        slug: 'eletriptan',
        description: 'Eletriptan impurity standards and pharmaceutical compounds.',
        mainCategory: {
          _id: '685bb03ff10edd4a8ff75b4a',
          name: 'API Impurity Standards',
          slug: 'api-impurity-standards',
        },
      },
      image: '/excel_structures/excel_structure_4.png',
    },
    relatedProducts: [],
  },
};

// Global singleton in-memory product cache
const productCache = new Map(Object.entries(PRESEEDED_PRODUCTS));

// In-flight request deduplicator for single products
const inflightProductRequests = new Map();

/**
 * Retrieve a cached product entry if available
 * @param {string} slug
 * @returns {{ product: object, relatedProducts: Array } | null}
 */
export function getCachedProduct(slug) {
  if (!slug) return null;
  const key = String(slug).trim().toLowerCase();
  return productCache.get(key) || null;
}

/**
 * Store product data in client-side memory
 * @param {string} slug
 * @param {{ product: object, relatedProducts?: Array }} data
 */
export function setCachedProduct(slug, data) {
  if (!slug || !data || !data.product) return;
  const key = String(slug).trim().toLowerCase();
  productCache.set(key, {
    product: data.product,
    relatedProducts: Array.isArray(data.relatedProducts) ? data.relatedProducts : [],
  });
}

/**
 * Proactively prefetch a product into memory on link hover/focus
 * Deduplicates concurrent requests to prevent duplicate network calls.
 * @param {string} slug
 * @returns {Promise<object | null>}
 */
export async function prefetchProduct(slug) {
  if (!slug || typeof window === 'undefined') return null;
  const key = String(slug).trim().toLowerCase();

  // Already cached
  if (productCache.has(key)) {
    return productCache.get(key);
  }

  // Deduplicate existing in-flight request
  if (inflightProductRequests.has(key)) {
    return inflightProductRequests.get(key);
  }

  const fetchPromise = (async () => {
    try {
      const res = await fetch(`/api/products/single/${encodeURIComponent(key)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.product) {
          const entry = {
            product: data.product,
            relatedProducts: Array.isArray(data.relatedProducts) ? data.relatedProducts : [],
          };
          productCache.set(key, entry);

          // Also seed sibling compounds
          if (Array.isArray(data.relatedProducts)) {
            data.relatedProducts.forEach((rel) => {
              if (rel.slug) {
                const relKey = rel.slug.toLowerCase();
                if (!productCache.has(relKey)) {
                  productCache.set(relKey, {
                    product: rel,
                    relatedProducts: [
                      data.product,
                      ...data.relatedProducts.filter((r) => r.slug !== rel.slug),
                    ],
                  });
                }
              }
            });
          }

          return entry;
        }
      }
      return null;
    } catch {
      return null;
    } finally {
      inflightProductRequests.delete(key);
    }
  })();

  inflightProductRequests.set(key, fetchPromise);
  return fetchPromise;
}

// 2. Categories In-Memory Cache & Shared Promise Deduplicator
let cachedMainCategories = null;
let inflightMainCategoriesPromise = null;

/**
 * Get main categories from client-side memory or single shared fetch.
 * Guarantees that across all page transitions and components, /api/main-categories
 * is fetched at most ONCE per session.
 * @returns {Promise<Array>}
 */
export async function getClientMainCategories() {
  // Return cached result immediately (0ms)
  if (cachedMainCategories && Array.isArray(cachedMainCategories) && cachedMainCategories.length > 0) {
    return cachedMainCategories;
  }

  // Deduplicate simultaneous requests from multiple mounting components
  if (inflightMainCategoriesPromise) {
    return inflightMainCategoriesPromise;
  }

  inflightMainCategoriesPromise = (async () => {
    try {
      const res = await fetch('/api/main-categories');
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.mainCategories)) {
          cachedMainCategories = data.mainCategories;
          return cachedMainCategories;
        }
      }
      return cachedMainCategories || [];
    } catch {
      return cachedMainCategories || [];
    } finally {
      inflightMainCategoriesPromise = null;
    }
  })();

  return inflightMainCategoriesPromise;
}

/**
 * Synchronously inspect if main categories are already available in memory
 * @returns {Array | null}
 */
export function peekClientMainCategories() {
  return cachedMainCategories;
}

// src/app/api/main-categories/route.js
import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import MainCategory from '../../../models/MainCategory';
import SubCategory from '../../../models/SubCategory';
import Product from '../../../models/Product';
import cache from '../../../lib/cache';

// Category aliases map
const CATEGORY_ALIASES = {
  'impurities': 'api-impurity-standards',
  'api-impurities': 'api-impurity-standards',
  'apis': 'api-impurity-standards',
  'pharmaceuticals': 'api-impurity-standards',
  'specialty-chemicals': 'speciality-chemicals',
  'intermediates': 'building-blocks',
  'reagents': 'peptide-coupling-reagents',
  'custom-synthesis': 'cdmo',
};

// GET: Fetch all main categories enriched with live counts for public display
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');

    const cacheKey = slug ? `main_cat_${slug.toLowerCase()}` : 'main_cat_all';
    const cached = cache.get(cacheKey);
    if (cached) {
      return NextResponse.json(
        { success: true, mainCategories: cached },
        {
          status: 200,
          headers: {
            'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
          },
        }
      );
    }

    await connectDB();

    let query = {};
    if (slug) {
      const mappedSlug = CATEGORY_ALIASES[slug.toLowerCase()] || slug;
      query.$or = [
        { slug: slug },
        { slug: mappedSlug },
        { name: new RegExp(`^${slug.replace(/-/g, ' ')}$`, 'i') },
        { name: new RegExp(`^${mappedSlug.replace(/-/g, ' ')}$`, 'i') },
      ];
    }

    // Run all 4 queries concurrently for maximum database throughput
    const [mainCategories, subCounts, prodSubCounts, allSubs] = await Promise.all([
      MainCategory.find(query).sort({ name: 1 }).lean(),
      SubCategory.aggregate([
        { $group: { _id: '$mainCategory', count: { $sum: 1 } } }
      ]),
      Product.aggregate([
        { $group: { _id: '$subCategory', count: { $sum: 1 } } }
      ]),
      SubCategory.find({}, { _id: 1, mainCategory: 1 }).lean(),
    ]);

    // 1. Compute subcategory count per mainCategory
    const subCountMap = {};
    subCounts.forEach(s => {
      if (s._id) subCountMap[s._id.toString()] = s.count;
    });

    // 2. Compute product count per subcategory
    const prodSubMap = {};
    prodSubCounts.forEach(p => {
      if (p._id) prodSubMap[p._id.toString()] = p.count;
    });

    // 3. Map subcategories to mainCategories for aggregated product counts
    const prodMainCountMap = {};
    allSubs.forEach(s => {
      const mainId = s.mainCategory ? s.mainCategory.toString() : 'none';
      const pCount = prodSubMap[s._id.toString()] || 0;
      prodMainCountMap[mainId] = (prodMainCountMap[mainId] || 0) + pCount;
    });

    // 4. Enrich categories with live data
    const enriched = mainCategories.map(mc => {
      const idStr = mc._id.toString();
      const pCount = prodMainCountMap[idStr] || 0;
      const sCount = subCountMap[idStr] || 0;
      return {
        ...mc,
        subCategoryCount: sCount,
        productCount: pCount,
        displayCount: pCount > 0 ? `${pCount.toLocaleString()}+ Products` : (sCount > 0 ? `${sCount} Subcategories` : 'Available on Request'),
      };
    });

    // Cache server-side for 10 minutes
    cache.set(cacheKey, enriched, 600);

    return NextResponse.json(
      { success: true, mainCategories: enriched },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    );
  } catch (error) {
    console.error('[GET /api/main-categories] Error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

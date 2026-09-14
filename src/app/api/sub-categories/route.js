// src/app/api/sub-categories/route.js
import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import SubCategory from '../../../models/SubCategory';
import MainCategory from '../../../models/MainCategory';
import cache from '../../../lib/cache';

// GET: Fetch subcategories (optionally filtered by mainCategorySlug or by subcategory slug directly) for public display
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const mainCategorySlug = searchParams.get('mainCategorySlug');
    const subCategorySlug = searchParams.get('slug');

    // Check in-memory cache first
    const cacheKey = `subcats_${(mainCategorySlug || '').toLowerCase()}_${(subCategorySlug || '').toLowerCase()}`;
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return NextResponse.json(cachedData, {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
          'X-Cache': 'HIT',
        },
      });
    }

    await connectDB();

    let query = {};

    if (subCategorySlug) {
      const cleanSubSlug = subCategorySlug.replace(/-impurities$/i, '');
      query.$or = [
        { slug: subCategorySlug },
        { slug: cleanSubSlug },
        { name: new RegExp(`^${cleanSubSlug.replace(/-/g, ' ')}$`, 'i') },
        { name: new RegExp(`^${subCategorySlug.replace(/-/g, ' ')}$`, 'i') }
      ];
    } else if (mainCategorySlug) {
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
      const mappedMainSlug = CATEGORY_ALIASES[mainCategorySlug.toLowerCase()] || mainCategorySlug;

      const mainCategory = await MainCategory.findOne({
        $or: [
          { slug: mainCategorySlug },
          { slug: mappedMainSlug },
          { name: new RegExp(`^${mainCategorySlug.replace(/-/g, ' ')}$`, 'i') },
          { name: new RegExp(`^${mappedMainSlug.replace(/-/g, ' ')}$`, 'i') }
        ]
      }).lean();

      if (mainCategory) {
        query.mainCategory = mainCategory._id;
      } else {
        return NextResponse.json({ success: true, subCategories: [] }, { status: 200 });
      }
    }

    const subCategories = await SubCategory.find(query)
      .populate({
        path: 'mainCategory',
        select: 'name slug',
      })
      .select('name slug description mainCategory')
      .sort({ name: 1 })
      .lean();

    const payload = { success: true, subCategories };

    // Cache for 10 minutes
    cache.set(cacheKey, payload, 600);

    return NextResponse.json(payload, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        'X-Cache': 'MISS',
      },
    });
  } catch (error) {
    console.error('[GET /api/sub-categories] Error fetching subcategories (public API):', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

// IMPORTANT: Assuming POST, PUT, DELETE operations for SubCategories
// are handled by src/app/api/admin/sub-categories/route.js and require admin authentication.
// If you had public POST/PUT/DELETE here, they should be removed or moved to admin API.

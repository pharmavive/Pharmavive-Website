// src/app/api/products/route.js
import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import Product from '../../../models/Product';
import SubCategory from '../../../models/SubCategory';
import MainCategory from '../../../models/MainCategory';
import cache from '../../../lib/cache';

// GET: Fetch products with search, pagination, and category filtering (public access)
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';
    const subCategorySlug = searchParams.get('subCategorySlug');
    const mainCategorySlug = searchParams.get('mainCategorySlug');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const skip = (page - 1) * limit;

    // Check in-memory cache first for instant response
    const cacheKey = `prods_${search.toLowerCase()}_${(subCategorySlug || '').toLowerCase()}_${(mainCategorySlug || '').toLowerCase()}_${page}_${limit}`;
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return NextResponse.json(cachedData, {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
          'X-Cache': 'HIT',
        },
      });
    }

    await connectDB();

    // Initialize query to include all products by default (no initial stock filter)
    let query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { catNumber: { $regex: search, $options: 'i' } },
        { chemicalName: { $regex: search, $options: 'i' } },
        { casNumber: { $regex: search, $options: 'i' } },
        { molecularFormula: { $regex: search, $options: 'i' } },
        { molecularWeight: { $regex: search, $options: 'i' } },
        { purity: { $regex: search, $options: 'i' } },
      ];
    }

    if (subCategorySlug && subCategorySlug.toLowerCase() !== 'all') {
      const cleanSubSlug = subCategorySlug.replace(/-impurities$/i, '');
      const targetSubCategory = await SubCategory.findOne({
        $or: [
          { slug: subCategorySlug },
          { slug: cleanSubSlug },
          { name: new RegExp(`^${cleanSubSlug.replace(/-/g, ' ')}$`, 'i') },
          { name: new RegExp(`^${subCategorySlug.replace(/-/g, ' ')}$`, 'i') }
        ]
      }).lean();
      if (targetSubCategory) {
        if (query.$or) {
          query = { $and: [query, { subCategory: targetSubCategory._id }] };
        } else {
          query.subCategory = targetSubCategory._id;
        }
      } else {
        return NextResponse.json({ success: true, products: [], totalCount: 0 }, { status: 200 });
      }
    }

    if (mainCategorySlug && mainCategorySlug.toLowerCase() !== 'all') {
      let mappedMainSlug = mainCategorySlug;
      if (mainCategorySlug === 'impurities' || mainCategorySlug === 'api-impurities' || mainCategorySlug === 'apis' || mainCategorySlug === 'pharmaceuticals') {
        mappedMainSlug = 'api-impurity-standards';
      } else if (mainCategorySlug === 'specialty-chemicals') {
        mappedMainSlug = 'speciality-chemicals';
      } else if (mainCategorySlug === 'intermediates') {
        mappedMainSlug = 'building-blocks';
      } else if (mainCategorySlug === 'reagents') {
        mappedMainSlug = 'peptide-coupling-reagents';
      }

      const targetMainCategory = await MainCategory.findOne({
        $or: [
          { slug: mainCategorySlug },
          { slug: mappedMainSlug },
          { name: new RegExp(`^${mainCategorySlug.replace(/-/g, ' ')}$`, 'i') },
          { name: new RegExp(`^${mappedMainSlug.replace(/-/g, ' ')}$`, 'i') }
        ]
      }).lean();
      if (targetMainCategory) {
        const associatedSubCategories = await SubCategory.find({ mainCategory: targetMainCategory._id }).select('_id').lean();
        const subCategoryIds = associatedSubCategories.map(subCat => subCat._id);
        
        if (subCategoryIds.length > 0) {
          if (query.$and) {
            query.$and.push({ subCategory: { $in: subCategoryIds } });
          } else if (query.subCategory) {
            const currentSubCategoryIds = Array.isArray(query.subCategory) ? query.subCategory : [query.subCategory];
            const intersection = currentSubCategoryIds.filter(id => subCategoryIds.some(mainCatId => mainCatId.equals ? mainCatId.equals(id) : String(mainCatId) === String(id)));
            if (intersection.length > 0) {
              query.subCategory = { $in: intersection };
            } else {
              return NextResponse.json({ success: true, products: [], totalCount: 0 }, { status: 200 });
            }
          } else {
            query.subCategory = { $in: subCategoryIds };
          }
        } else {
          return NextResponse.json({ success: true, products: [], totalCount: 0 }, { status: 200 });
        }
      } else {
        return NextResponse.json({ success: true, products: [], totalCount: 0 }, { status: 200 });
      }
    }

    const [totalCount, products] = await Promise.all([
      Product.countDocuments(query),
      Product.find(query)
        .populate({
          path: 'subCategory',
          select: 'name slug mainCategory description',
          populate: {
            path: 'mainCategory',
            select: 'name slug'
          }
        })
        .sort({ name: 1 })
        .skip(skip)
        .limit(limit)
        .lean()
    ]);

    const payload = { success: true, products, totalCount };

    // Cache list results for 3 minutes
    cache.set(cacheKey, payload, 180);

    return NextResponse.json(payload, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        'X-Cache': 'MISS',
      },
    });
  } catch (error) {
    console.error('[GET /api/products] Error fetching products (public API):', error);
    return NextResponse.json({ success: false, error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

// IMPORTANT: Assuming POST, PUT, DELETE methods for Products
// are handled by src/app/api/admin/products/route.js and require admin authentication.
// If you had public POST/PUT/DELETE here, they should be removed or moved to admin API.

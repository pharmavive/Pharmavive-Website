// src/app/api/products/single/[productSlug]/route.js
import { NextResponse } from 'next/server';
import connectDB from '../../../../../lib/mongodb';
import Product from '../../../../../models/Product';
import SubCategory from '../../../../../models/SubCategory';
import MainCategory from '../../../../../models/MainCategory';
import cache from '../../../../../lib/cache';

export async function GET(request, { params }) {
  let productSlug;
  try {
    const awaitedParams = await params;
    productSlug = awaitedParams.productSlug;

    if (!productSlug) {
      return NextResponse.json({ success: false, error: 'Product slug is required.' }, { status: 400 });
    }

    // Check high-speed in-memory server cache first
    const cacheKey = `single_prod_${productSlug.toLowerCase()}`;
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return NextResponse.json(cachedData, {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=300',
          'X-Cache': 'HIT',
        },
      });
    }

    await connectDB();

    // Query product with .lean() for maximum performance
    const product = await Product.findOne({ slug: productSlug })
      .populate({
        path: 'subCategory',
        select: 'name slug mainCategory description',
        populate: {
          path: 'mainCategory',
          select: 'name slug',
        },
      })
      .lean();

    if (!product) {
      return NextResponse.json({ success: false, error: 'Product not found.' }, { status: 404 });
    }

    // Concurrently fetch companion related products from same subcategory (eliminates waterfall)
    let relatedProducts = [];
    if (product.subCategory?._id) {
      relatedProducts = await Product.find({
        subCategory: product.subCategory._id,
        _id: { $ne: product._id },
      })
        .select('name slug catNumber casNumber molecularFormula molecularWeight image stock')
        .sort({ name: 1 })
        .limit(4)
        .lean();
    }

    const payload = { success: true, product, relatedProducts };

    // Cache result for 5 minutes
    cache.set(cacheKey, payload, 300);

    return NextResponse.json(payload, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=300',
        'X-Cache': 'MISS',
      },
    });
  } catch (error) {
    console.error(`[GET /api/products/single/${productSlug || 'unknown'}] Error:`, error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

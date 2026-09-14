// src/app/api/posts/route.js
import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import Post from '../../../models/Post'; // Ensure this path is correct for your Post model

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const categoryFilter = searchParams.get('category'); // Get category filter from query params
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    const postId = searchParams.get('id'); // Added to fetch individual posts

    let query = {};
    if (categoryFilter) {
      query.category = categoryFilter; // Apply category filter if provided
    }
    if (postId) { // If an 'id' param is present, fetch a specific post
      query._id = postId;
    }

    const totalCount = await Post.countDocuments(query);
    const posts = await Post.find(query)
                            .sort({ createdAt: -1 })
                            .skip(skip)
                            .limit(limit);

    return NextResponse.json({ success: true, posts, totalCount }, { status: 200 });
  } catch (error) {
    console.error('Error fetching posts (public API):', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

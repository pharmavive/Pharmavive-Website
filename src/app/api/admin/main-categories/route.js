// src/app/api/admin/main-categories/route.js
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import dbConnect from '@/lib/mongodb';
import MainCategory from '@/models/MainCategory';
import slugify from 'slugify'; // To generate slugs for main categories

// GET handler to fetch all main categories
export async function GET(req) {
  console.log('--- GET /api/admin/main-categories received ---');
  try {
    await dbConnect();
    const mainCategories = await MainCategory.find({}).sort({ name: 1 }); // Sort by name alphabetically
    console.log(`Fetched ${mainCategories.length} main categories.`);
    return NextResponse.json({ mainCategories }, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch main categories:', error);
    return NextResponse.json({ error: 'Failed to fetch main categories.' }, { status: 500 });
  }
}

// POST handler to create a new main category
export async function POST(req) {
  console.log('--- POST /api/admin/main-categories received ---');

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token || !token.isAdmin) {
    console.warn('Unauthorized access attempt to create main category.');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { name } = await req.json();
    if (!name || name.trim() === '') {
      return NextResponse.json({ error: 'Main category name is required.' }, { status: 400 });
    }

    await dbConnect();

    // Generate slug from the name
    const slug = slugify(name, { lower: true, strict: true });

    const newMainCategory = new MainCategory({ name: name.trim(), slug });
    await newMainCategory.save();
    console.log('Main category created successfully:', newMainCategory);
    return NextResponse.json({ message: 'Main category created successfully', mainCategory: newMainCategory }, { status: 201 });

  } catch (error) {
    console.error('Failed to create main category:', error);
    if (error.code === 11000) { // Duplicate key error
      return NextResponse.json({ error: 'A main category with this name or slug already exists.' }, { status: 409 });
    }
    return NextResponse.json({ error: `Failed to create main category: ${error.message}` }, { status: 500 });
  }
}

// DELETE handler to delete a main category
export async function DELETE(req) {
  console.log('--- DELETE /api/admin/main-categories received ---');

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token || !token.isAdmin) {
    console.warn('Unauthorized access attempt to delete main category.');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Main category ID is required for deletion.' }, { status: 400 });
  }

  try {
    await dbConnect();
    const deletedMainCategory = await MainCategory.findByIdAndDelete(id);

    if (!deletedMainCategory) {
      console.warn(`Main category with ID ${id} not found for deletion.`);
      return NextResponse.json({ error: 'Main category not found.' }, { status: 404 });
    }

    console.log('Main category deleted successfully:', deletedMainCategory.name);
    return NextResponse.json({ message: 'Main category deleted successfully' }, { status: 200 });

  } catch (error) {
    console.error('Failed to delete main category:', error);
    return NextResponse.json({ error: `Failed to delete main category: ${error.message}` }, { status: 500 });
  }
}

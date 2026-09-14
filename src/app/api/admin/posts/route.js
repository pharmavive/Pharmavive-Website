// src/app/api/admin/posts/route.js
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import formidable from 'formidable';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import fs from 'fs';

import connectDB from '../../../../lib/mongodb';
import Post from '../../../../models/Post';

const secret = process.env.NEXTAUTH_SECRET;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

async function streamToBuffer(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
    stream.on('error', reject);
  });
}

async function parseFormidable(req) {
  const form = formidable({});
  const requestBuffer = Buffer.from(await req.arrayBuffer());
  const nodeReadableStream = new Readable();
  nodeReadableStream.push(requestBuffer);
  nodeReadableStream.push(null);

  const formidableReq = Object.assign(nodeReadableStream, {
    headers: Object.fromEntries(req.headers),
    method: req.method,
    url: req.url,
    on: nodeReadableStream.on.bind(nodeReadableStream),
    pipe: nodeReadableStream.pipe.bind(nodeReadableStream),
    read: nodeReadableStream.read.bind(nodeReadableStream),
    pause: nodeReadableStream.pause.bind(nodeReadableStream),
    resume: nodeReadableStream.resume.bind(nodeReadableStream),
    _readableState: nodeReadableStream._readableState || { highWaterMark: 16 * 1024 },
  });

  return new Promise((resolve, reject) => {
    form.parse(formidableReq, (err, fields, files) => {
      if (err) {
        console.error('Formidable parse error:', err);
        return reject(err);
      }
      const singleValueFields = {};
      for (const key in fields) {
        if (Array.isArray(fields[key])) {
          singleValueFields[key] = fields[key][0];
        } else {
          singleValueFields[key] = fields[key];
        }
      }
      return resolve([singleValueFields, files]);
    });
  });
}

// GET: Fetch posts (Admin only for full list)
export async function GET(req) {
  try {
    const token = await getToken({ req, secret });
    // This GET endpoint is only for admin to list/manage posts, so auth is required
    if (!token || !token.isAdmin) {
      console.log('[GET /api/admin/posts] Unauthorized access attempt (token missing or not admin).');
      console.log('  Token:', token ? 'Present' : 'Missing');
      if (token) console.log('  Token isAdmin:', token.isAdmin);
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const posts = await Post.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, posts }, { status: 200 });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST: Add a new post (Admin only)
export async function POST(req) {
  let uploadedFile = null;
  try {
    const token = await getToken({ req, secret });
    console.log('[POST /api/admin/posts] Attempting to create new post.');
    console.log('  Token received by API:', token ? 'Present' : 'Missing');
    if (token) console.log('  Token isAdmin property:', token.isAdmin);

    if (!token || !token.isAdmin) {
      console.log('[POST /api/admin/posts] Unauthorized: Token missing or not admin.');
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    console.log('[POST /api/admin/posts] Database connected.');

    const [fields, files] = await parseFormidable(req);
    console.log('[POST /api/admin/posts] Form parsed. Fields:', fields);
    uploadedFile = files.image ? files.image[0] : null;

    const { title, content, category, author } = fields;

    if (!title || !content || !category || !uploadedFile) {
      console.log('[POST /api/admin/posts] Missing required fields or image.');
      return NextResponse.json({ success: false, error: 'Title, content, category, and image are required.' }, { status: 400 });
    }

    let imageUrl = '';
    const fileReadStream = fs.createReadStream(uploadedFile.filepath);
    const buffer = await streamToBuffer(fileReadStream);
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'posts' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      ).end(buffer);
    });
    imageUrl = result.secure_url;
    console.log('[POST /api/admin/posts] Image uploaded to Cloudinary:', imageUrl);

    const newPost = new Post({
      title,
      content,
      category,
      author,
      image: imageUrl,
    });

    await newPost.save();
    console.log('[POST /api/admin/posts] New post saved successfully:', newPost._id);

    return NextResponse.json({ success: true, post: newPost }, { status: 201 });
  } catch (error) {
    console.error('[POST /api/admin/posts] Error adding post:', error);
    if (error.name === 'ValidationError') {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  } finally {
      if (uploadedFile && uploadedFile.filepath) {
          fs.unlink(uploadedFile.filepath, (err) => {
              if (err) console.error('Error deleting temp file:', err);
          });
      }
  }
}

// PUT: Update an existing post (Admin only)
export async function PUT(req) { // <--- ENSURE THIS IS PRESENT AND CORRECTLY SPELLED
  let uploadedFile = null;
  try {
    const token = await getToken({ req, secret });
    console.log('[PUT /api/admin/posts] Attempting to update post.');
    console.log('  Token received by API:', token ? 'Present' : 'Missing');
    if (token) console.log('  Token isAdmin property:', token.isAdmin);

    if (!token || !token.isAdmin) {
      console.log('[PUT /api/admin/posts] Unauthorized: Token missing or not admin.');
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    console.log('[PUT /api/admin/posts] Database connected.');

    const [fields, files] = await parseFormidable(req);
    console.log('[PUT /api/admin/posts] Form parsed. Fields:', fields);

    const { id, title, content, category, author, existingImage } = fields;
    uploadedFile = files.image ? files.image[0] : null;

    if (!id) {
      console.log('[PUT /api/admin/posts] Missing post ID for update.');
      return NextResponse.json({ success: false, error: 'Post ID is required for update.' }, { status: 400 });
    }

    const postToUpdate = await Post.findById(id);
    if (!postToUpdate) {
      console.log('[PUT /api/admin/posts] Post not found for ID:', id);
      return NextResponse.json({ success: false, error: 'Post not found.' }, { status: 404 });
    }

    if (title !== undefined) postToUpdate.title = title;
    if (content !== undefined) postToUpdate.content = content;
    if (category !== undefined) postToUpdate.category = category;
    if (author !== undefined) postToUpdate.author = author;

    let newImageUrl = existingImage;

    if (uploadedFile) {
      console.log('[PUT /api/admin/posts] New image uploaded. Processing...');
      const fileReadStream = fs.createReadStream(uploadedFile.filepath);
      const buffer = await streamToBuffer(fileReadStream);
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: 'posts' },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        ).end(buffer);
      });
      newImageUrl = result.secure_url;

      if (postToUpdate.image) {
        console.log('[PUT /api/admin/posts] Deleting old image from Cloudinary:', postToUpdate.image);
        const publicId = postToUpdate.image.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`posts/${publicId}`).catch(e => console.warn("Failed to delete old image from Cloudinary:", e.message));
      }
    } else if (existingImage === '' && postToUpdate.image) {
        console.log('[PUT /api/admin/posts] Existing image removed. Deleting from Cloudinary:', postToUpdate.image);
        const publicId = postToUpdate.image.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`posts/${publicId}`).catch(e => console.warn("Failed to delete old image from Cloudinary:", e.message));
        newImageUrl = '';
    }
    postToUpdate.image = newImageUrl;
    console.log('[PUT /api/admin/posts] Image URL updated to:', postToUpdate.image);

    await postToUpdate.save();
    console.log('[PUT /api/admin/posts] Post updated successfully:', postToUpdate._id);

    return NextResponse.json({ success: true, post: postToUpdate }, { status: 200 });
  } catch (error) {
    console.error('[PUT /api/admin/posts] Error updating post:', error);
    if (error.name === 'ValidationError') {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  } finally {
      if (uploadedFile && uploadedFile.filepath) {
          fs.unlink(uploadedFile.filepath, (err) => {
              if (err) console.error('Error deleting temp file:', err);
          });
      }
  }
}

// DELETE: Delete a post (Admin only)
export async function DELETE(req) {
  try {
    const token = await getToken({ req, secret });
    console.log('[DELETE /api/admin/posts] Attempting to delete post.');
    console.log('  Token received by API:', token ? 'Present' : 'Missing');
    if (token) console.log('  Token isAdmin property:', token.isAdmin);

    if (!token || !token.isAdmin) {
      console.log('[DELETE /api/admin/posts] Unauthorized: Token missing or not admin.');
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    console.log('[DELETE /api/admin/posts] Database connected.');

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      console.log('[DELETE /api/admin/posts] Missing post ID for deletion.');
      return NextResponse.json({ success: false, error: 'Post ID is required for deletion.' }, { status: 400 });
    }

    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
      console.log('[DELETE /api/admin/posts] Post not found for ID:', id);
      return NextResponse.json({ success: false, error: 'Post not found.' }, { status: 404 });
    }

    if (deletedPost.image) {
      console.log('[DELETE /api/admin/posts] Deleting image from Cloudinary:', deletedPost.image);
      try {
        const publicId = deletedPost.image.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`posts/${publicId}`);
      } catch (cloudError) {
        console.warn(`Failed to delete Cloudinary image for post ${id}: ${cloudError.message}`);
      }
    }
    console.log('[DELETE /api/admin/posts] Post deleted successfully:', deletedPost._id);

    return NextResponse.json({ success: true, message: 'Post deleted successfully.' }, { status: 200 });
  } catch (error) {
    console.error('[DELETE /api/admin/posts] Error deleting post:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

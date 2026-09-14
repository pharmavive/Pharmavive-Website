// src/app/api/admin/products/route.js
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import formidable from 'formidable';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream'; // Import Readable from 'stream' module
import fs from 'fs';

import connectDB from '../../../../lib/mongodb';
import Product from '../../../../models/Product';
import SubCategory from '../../../../models/SubCategory';
import MainCategory from '../../../../models/MainCategory';
import { generateSlug } from '../../../../utils/stringUtils';

// --- DEBUGGING LOGS FOR MODELS ---
console.log('DEBUG: Product model imported:', Product ? 'Defined' : 'Undefined');
console.log('DEBUG: SubCategory model imported:', SubCategory ? 'Defined' : 'Undefined');
console.log('DEBUG: MainCategory model imported:', MainCategory ? 'Defined' : 'Undefined');
// --- END DEBUGGING LOGS FOR MODELS ---

const secret = process.env.NEXTAUTH_SECRET;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Disable body parser for formidable, as we're handling it manually
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper function to convert a stream to a buffer (used for reading file content from temp path)
async function streamToBuffer(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
    stream.on('error', reject);
  });
}

// --- parseFormidable Helper Function using manual Node.js Readable stream creation ---
// This attempts to create a Node.js compatible stream from the Web Request body.
// It's a workaround for formidable's expectation of Node.js IncomingMessage.
async function parseFormidable(req) {
  const form = formidable({});
  // Read the entire request body into a buffer. This consumes the stream once.
  const requestBuffer = Buffer.from(await req.arrayBuffer());

  // Create a new Node.js Readable stream and push the buffer into it.
  const nodeReadableStream = new Readable();
  nodeReadableStream.push(requestBuffer);
  nodeReadableStream.push(null); // Signal end of stream

  // Create a mock request object that formidable can interact with.
  // We attach necessary HTTP request properties and Node.js stream methods.
  const formidableReq = Object.assign(nodeReadableStream, {
    headers: Object.fromEntries(req.headers),
    method: req.method,
    url: req.url,
    // Explicitly bind stream methods formidable might call
    on: nodeReadableStream.on.bind(nodeReadableStream),
    pipe: nodeReadableStream.pipe.bind(nodeReadableStream),
    read: nodeReadableStream.read.bind(nodeReadableStream),
    pause: nodeReadableStream.pause.bind(nodeReadableStream),
    resume: nodeReadableStream.resume.bind(nodeReadableStream),
    // formidable might look for this internal property
    _readableState: nodeReadableStream._readableState || { highWaterMark: 16 * 1024 },
  });

  return new Promise((resolve, reject) => {
    // Pass the mocked request object to formidable
    form.parse(formidableReq, (err, fields, files) => {
      if (err) {
        console.error('Formidable parse error:', err);
        return reject(err);
      }
      // Formidable returns fields/files as arrays, convert to single values if expected
      const singleValueFields = {};
      for (const key in fields) {
        singleValueFields[key] = Array.isArray(fields[key]) ? fields[key][0] : fields[key];
      }
      const singleValueFiles = {};
      for (const key in files) {
        singleValueFiles[key] = Array.isArray(files[key]) ? files[key][0] : files[key];
      }
      resolve({ fields: singleValueFields, files: singleValueFiles });
    });
  });
}


// --- GET Request (Fetch Products) ---
export async function GET(req) {
  try {
    const token = await getToken({ req, secret });
    if (!token || !token.isAdmin) {
      console.log('[API GET] Unauthorized access attempt (token missing or not admin).');
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    console.log('[API GET] Database connected.');

    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = parseInt(searchParams.get('skip') || '0');

    console.log(`[API GET] Query received: page=${(skip/limit)+1}, limit=${limit}, search="${search}", etc.`);

    let query = {};
    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { catNumber: { $regex: search, $options: 'i' } },
          { chemicalName: { $regex: search, $options: 'i' } },
          { casNumber: { $regex: search, $options: 'i' } },
          { molecularFormula: { $regex: search, $options: 'i' } },
        ],
      };
    }

    const products = await Product.find(query)
      .populate({
        path: 'subCategory',
        populate: { path: 'mainCategory' },
      })
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 });

    const totalCount = await Product.countDocuments(query);
    console.log(`[API GET] Fetched ${products.length} products (total: ${totalCount}) for search "${search}"`);

    return NextResponse.json({ success: true, products, totalCount }, { status: 200 });
  } catch (error) {
    console.error('[API GET] Error fetching products:', error);
    return NextResponse.json({ success: false, error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

// --- POST Request (Create Product) ---
export async function POST(req) {
  let uploadedFile = null;
  try {
    const token = await getToken({ req, secret });
    if (!token || !token.isAdmin) {
      console.log('[API POST] Unauthorized access attempt (token missing or not admin).');
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    console.log('[API POST] Database connected.');

    const { fields, files } = await parseFormidable(req); // Note: parseFormidable now returns an object {fields, files}
    console.log('[API POST] Fields received from form:', fields);
    console.log('[API POST] Files received from form:', files);

    const { name, catNumber, chemicalName, casNumber, molecularFormula, molecularWeight, purity, subCategory, stock } = fields;
    console.log('[API POST] Destructured stock value:', stock);
    uploadedFile = files.image || null; // Ensure uploadedFile gets the image file

    if (!name || !catNumber || !subCategory) {
      console.error('[API POST] Error: Missing required product fields.');
      return NextResponse.json({ success: false, error: 'Product name, catalog number, and subcategory are required.' }, { status: 400 });
    }

    // Check for existing product by name (case-insensitive)
    const existingProductByName = await Product.findOne({ name: new RegExp(`^${name.trim()}$`, 'i') });
    if (existingProductByName) {
      console.warn(`[API POST] Conflict: Product with name "${name}" already exists.`);
      return NextResponse.json({ success: false, error: `A product with the name "${name}" already exists.` }, { status: 409 });
    }

    // Check for existing product by catalog number (case-insensitive)
    const existingProductByCatNumber = await Product.findOne({ catNumber: new RegExp(`^${catNumber.trim()}$`, 'i') });
    if (existingProductByCatNumber) {
      console.warn(`[API POST] Conflict: Product with catalog number "${catNumber}" already exists.`);
      return NextResponse.json({ success: false, error: `A product with the catalog number "${catNumber}" already exists.` }, { status: 409 });
    }

    let imageUrl = '';
    if (uploadedFile) {
      console.log('[API POST] Image file detected, uploading to Cloudinary...');
      const result = await cloudinary.uploader.upload(uploadedFile.filepath, {
        folder: 'product_images',
        public_id: `${Date.now()}-${uploadedFile.originalFilename}`,
      });
      imageUrl = result.secure_url;
      fs.unlinkSync(uploadedFile.filepath); // Clean up temp file
      console.log('[API POST] Image uploaded:', imageUrl);
    } else {
      console.log('[API POST] No image file provided for new product.');
    }

    // --- Robust LOGIC for handling 'stock' value for POST (Create) ---
    let finalStockStatus = 'Instock'; // Default
    if (typeof stock === 'string') {
        const normalizedStock = stock.trim().toLowerCase();
        if (normalizedStock === 'out of stock' || normalizedStock === 'outofstock') {
            finalStockStatus = 'Out of stock';
        } else if (normalizedStock === 'instock' || normalizedStock === 'in stock') {
            finalStockStatus = 'Instock';
        }
    }
    console.log('[API POST] Final stock status determined:', finalStockStatus);

    const newProduct = new Product({
      name: name.trim(),
      slug: generateSlug(name.trim(), catNumber.trim()),
      catNumber: catNumber.trim(),
      chemicalName: chemicalName ? chemicalName.trim() : '',
      casNumber: casNumber ? casNumber.trim() : '',
      molecularFormula: molecularFormula ? molecularFormula.trim() : '',
      molecularWeight: molecularWeight ? molecularWeight.trim() : '',
      purity: purity ? purity.trim() : '',
      image: imageUrl,
      subCategory: subCategory,
      stock: finalStockStatus, // Use the determined final stock status
    });

    await newProduct.save();
    console.log('[API POST] New product created successfully:', newProduct.name, '(ID:', newProduct._id, ')');

    return NextResponse.json({ success: true, product: newProduct }, { status: 201 });
  } catch (error) {
    console.error('[API POST] Error creating product:', error);
    return NextResponse.json({ success: false, error: error.message || 'Internal Server Error' }, { status: 500 });
  } finally {
      if (uploadedFile && uploadedFile.filepath) {
          fs.unlink(uploadedFile.filepath, (err) => {
              if (err) console.error('Error deleting temp file:', err);
          });
      }
  }
}

// --- PUT Request (Update Product) ---
export async function PUT(req) {
  let uploadedFile = null;
  try {
    const token = await getToken({ req, secret });
    if (!token || !token.isAdmin) {
      console.log('[API PUT] Unauthorized access attempt (token missing or not admin).');
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    console.log('[API PUT] Database connected.');

    const { fields, files } = await parseFormidable(req); // Note: parseFormidable now returns an object {fields, files}
    console.log('[API PUT] Fields received from form:', fields);
    console.log('[API PUT] Files received from form:', files);

    const { id, name, catNumber, chemicalName, casNumber, molecularFormula, molecularWeight, purity, subCategory, existingImage, stock } = fields;
    console.log('[API PUT] Destructured ID:', id);
    console.log('[API PUT] Destructured stock value (from form):', stock); // This is what formidable returns
    uploadedFile = files.image || null; // Ensure uploadedFile gets the image file

    if (!id) {
      console.error('[API PUT] Error: Product ID is required for update.');
      return NextResponse.json({ success: false, error: 'Product ID is required for update.' }, { status: 400 });
    }
    if (!name || !catNumber || !subCategory) {
      console.error('[API PUT] Error: Missing required product fields for update (name, catNumber, subCategory).');
      return NextResponse.json({ success: false, error: 'Product name, catalog number, and subcategory are required.' }, { status: 400 });
    }

    const productToUpdate = await Product.findById(id);
    if (!productToUpdate) {
      console.error('[API PUT] Error: Product not found for ID:', id);
      return NextResponse.json({ success: false, error: 'Product not found.' }, { status: 404 });
    }
    console.log('[API PUT] Product found before update:', productToUpdate.name, '(Current Stock in DB:', productToUpdate.stock, ')');

    // Check for duplicate name, excluding the current product being updated
    const existingProductByName = await Product.findOne({
      name: new RegExp(`^${name.trim()}$`, 'i'),
      _id: { $ne: id },
    });
    if (existingProductByName) {
      console.warn(`[API PUT] Conflict: Another product with name "${name}" already exists.`);
      return NextResponse.json({ success: false, error: `A product with the name "${name}" already exists.` }, { status: 409 });
    }

    // Check for duplicate catalog number, excluding the current product being updated
    const existingProductByCatNumber = await Product.findOne({
      catNumber: new RegExp(`^${catNumber.trim()}$`, 'i'),
      _id: { $ne: id },
    });
    if (existingProductByCatNumber) {
      console.warn(`[API PUT] Conflict: Another product with catalog number "${catNumber}" already exists.`);
      return NextResponse.json({ success: false, error: `A product with the catalog number "${catNumber}" already exists.` }, { status: 409 });
    }

    let imageUrl = existingImage || '';
    if (uploadedFile) {
      console.log('[API PUT] New image file detected, uploading to Cloudinary...');
      if (productToUpdate.image) {
        const publicId = productToUpdate.image.split('/').pop().split('.')[0];
        if (publicId) {
          await cloudinary.uploader.destroy(`product_images/${publicId}`);
          console.log('[API PUT] Old image deleted from Cloudinary:', publicId);
        }
      }
      const result = await cloudinary.uploader.upload(uploadedFile.filepath, {
        folder: 'product_images',
        public_id: `${Date.now()}-${uploadedFile.originalFilename}`,
      });
      imageUrl = result.secure_url;
      fs.unlinkSync(uploadedFile.filepath);
      console.log('[API PUT] New image uploaded:', imageUrl);
    } else if (existingImage === '') {
      console.log('[API PUT] Existing image explicitly cleared by frontend.');
      if (productToUpdate.image) {
        const publicId = productToUpdate.image.split('/').pop().split('.')[0];
        if (publicId) {
          await cloudinary.uploader.destroy(`product_images/${publicId}`);
          console.log('[API PUT] Old image deleted from Cloudinary (explicit clear):', publicId);
        }
      }
      imageUrl = '';
    } else {
      console.log('[API PUT] No new image, retaining existing image URL.');
    }

    // Update product fields
    productToUpdate.name = name.trim();
    if (productToUpdate.name !== name.trim() || productToUpdate.catNumber !== catNumber.trim()) {
        productToUpdate.slug = generateSlug(name.trim(), catNumber.trim());
        console.log('[API PUT] Slug re-generated to:', productToUpdate.slug);
    }
    productToUpdate.catNumber = catNumber.trim();
    productToUpdate.chemicalName = chemicalName ? chemicalName.trim() : '';
    productToUpdate.casNumber = casNumber ? casNumber.trim() : '';
    productToUpdate.molecularFormula = molecularFormula ? molecularFormula.trim() : '';
    productToUpdate.molecularWeight = molecularWeight ? molecularWeight.trim() : '';
    productToUpdate.purity = purity ? purity.trim() : '';
    productToUpdate.image = imageUrl;
    productToUpdate.subCategory = subCategory;

    // --- Robust LOGIC for handling 'stock' value for PUT (Update) ---
    let finalStockStatus = 'Instock'; // Start with the default
    if (typeof stock === 'string') {
        const normalizedStock = stock.trim().toLowerCase();
        if (normalizedStock === 'out of stock' || normalizedStock === 'outofstock') {
            finalStockStatus = 'Out of stock';
        } else if (normalizedStock === 'instock' || normalizedStock === 'in stock') {
            finalStockStatus = 'Instock';
        }
    } else if (productToUpdate.stock) {
        // If 'stock' from form is not a string (e.g., undefined) but product already has a stock value, retain it.
        finalStockStatus = productToUpdate.stock;
    }
    productToUpdate.stock = finalStockStatus;
    console.log('[API PUT] Product stock set to (before save):', productToUpdate.stock);

    await productToUpdate.save();
    console.log('[API PUT] Product saved successfully. New stock in DB should be:', productToUpdate.stock);

    return NextResponse.json({ success: true, product: productToUpdate }, { status: 200 });
  } catch (error) {
    console.error('[API PUT] Top-level error during product update:', error);
    return NextResponse.json({ success: false, error: error.message || 'Internal Server Error' }, { status: 500 });
  } finally {
      if (uploadedFile && uploadedFile.filepath) {
          fs.unlink(uploadedFile.filepath, (err) => {
              if (err) console.error('Error deleting temp file:', err);
          });
      }
  }
}

// --- DELETE Request (Delete Product) ---
export async function DELETE(req) {
  try {
    const token = await getToken({ req, secret });
    if (!token || !token.isAdmin) {
      console.log('[API DELETE] Unauthorized access attempt (token missing or not admin).');
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    console.log('[API DELETE] Database connected.');

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      console.error('[API DELETE] Error: Product ID is required for deletion.');
      return NextResponse.json({ success: false, error: 'Product ID is required for deletion.' }, { status: 400 });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      console.warn(`[API DELETE] Product with ID ${id} not found for deletion.`);
      return NextResponse.json({ success: false, error: 'Product not found.' }, { status: 404 });
    }

    if (deletedProduct.image) {
      try {
        const publicId = deletedProduct.image.split('/').pop().split('.')[0];
        if (publicId) {
          await cloudinary.uploader.destroy(`products/${publicId}`);
          console.log('[API DELETE] Image deleted from Cloudinary:', publicId);
        }
      } catch (cloudError) {
        console.warn(`[API DELETE] Failed to delete Cloudinary image for product ${id}: ${cloudError.message}`);
      }
    }
    console.log('[API DELETE] Product deleted successfully:', deletedProduct._id);

    return NextResponse.json({ success: true, message: 'Product deleted successfully.' }, { status: 200 });
  } catch (error) {
    console.error('[API DELETE] Error deleting product:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

// src/app/api/admin/products/bulk-upload/route.js
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import formidable from 'formidable';
import { Readable } from 'stream';
import * as XLSX from 'xlsx';
import fs from 'fs';

import connectDB from '../../../../../lib/mongodb';
import Product from '../../../../../models/Product';
import SubCategory from '../../../../../models/SubCategory';
import MainCategory from '../../../../../models/MainCategory';
import { generateSlug } from '../../../../../utils/stringUtils'; // Ensure generateSlug is available

const secret = process.env.NEXTAUTH_SECRET;

export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper function to convert a stream to a buffer (used for reading file content)
async function streamToBuffer(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
    stream.on('error', reject);
  });
}

// Simple CSV parser for demonstration.
async function parseCsvBuffer(buffer) {
  const text = buffer.toString('utf8');
  // Trim and remove BOM from the first header, then map all headers to lowercase and trim
  const lines = text.split(/\r?\n/).filter(line => line.trim() !== ''); // Filter truly empty lines
  if (lines.length === 0) return [];

  const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/^\ufeff/, '')); // Normalize headers
  const data = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    if (values.length !== headers.length) {
      console.warn(`Skipping row ${i + 1} in CSV due to column mismatch.`);
      continue;
    }
    let rowObject = {};
    headers.forEach((header, index) => {
      rowObject[header] = values[index];
    });
    data.push(rowObject);
  }
  return data;
}

// Function to get or create a Main Category
async function getOrCreateMainCategory(name) {
    const trimmedName = name.trim();
    // Assuming generateSlug in stringUtils can take one argument for categories
    const slug = generateSlug(trimmedName); // Use generateSlug for consistent slug creation
    console.log(`[getOrCreateMainCategory] Attempting to find/create Main Category: "${trimmedName}" (Generated Slug: "${slug}")`);

    // Use $or to find by either normalized name (case-insensitive) or slug
    let mainCategory = await MainCategory.findOne({
        $or: [
            { slug: slug },
            { name: new RegExp(`^${trimmedName}$`, 'i') }
        ]
    });

    if (!mainCategory) {
        console.log(`[getOrCreateMainCategory] Main Category "${trimmedName}" not found. Creating new...`);
        mainCategory = new MainCategory({ name: trimmedName, slug: slug }); // Ensure slug is set here too
        try {
            await mainCategory.save();
            console.log(`[getOrCreateMainCategory] Successfully created Main Category: ${mainCategory.name} (Slug: ${mainCategory.slug}, ID: ${mainCategory._id})`);
        } catch (error) {
            // Handle race condition if another process creates it simultaneously
            if (error.code === 11000) { // Duplicate key error
                console.warn(`[getOrCreateMainCategory] Race condition: Main Category "${trimmedName}" was created concurrently. Retrieving existing...`);
                mainCategory = await MainCategory.findOne({ $or: [{ slug: slug }, { name: new RegExp(`^${trimmedName}$`, 'i') }] });
                if (!mainCategory) throw new Error(`Failed to retrieve concurrently created Main Category: ${trimmedName}`);
                console.log(`[getOrCreateMainCategory] Found concurrently created Main Category: ${mainCategory.name} (ID: ${mainCategory._id})`);
            } else {
                throw error;
            }
        }
    } else {
        // If found, ensure its slug is up-to-date if it was created with an old logic
        if (mainCategory.slug !== slug) {
            console.log(`[getOrCreateMainCategory] Updating slug for existing Main Category "${mainCategory.name}" from "${mainCategory.slug}" to "${slug}"`);
            mainCategory.slug = slug;
            await mainCategory.save();
        }
        console.log(`[getOrCreateMainCategory] Found existing Main Category: ${mainCategory.name} (Slug: ${mainCategory.slug}, ID: ${mainCategory._id})`);
    }
    return mainCategory;
}

// Main POST handler for bulk upload
export async function POST(req) {
  let uploadedFile = null; // Declare here to be in scope for finally

  try {
    const token = await getToken({ req, secret });
    if (!token || !token.isAdmin) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    console.log('[Bulk Upload API] Database connected.');

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

    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(formidableReq, (err, fields, files) => {
        if (err) {
          console.error('Formidable parse error:', err);
          return reject(err);
        }
        // Formidable returns arrays for fields/files. Flatten them if only one value is expected.
        const singleValueFields = {};
        for (const key in fields) {
            singleValueFields[key] = Array.isArray(fields[key]) ? fields[key][0] : fields[key];
        }
        const singleValueFiles = {};
        for (const key in files) {
            singleValueFiles[key] = Array.isArray(files[key]) ? files[key][0] : files[key];
        }
        resolve([singleValueFields, singleValueFiles]);
      });
    });

    uploadedFile = files.csvFile || null; // Access the flattened file object

    if (!uploadedFile) {
      return NextResponse.json({ success: false, error: 'No file uploaded.' }, { status: 400 });
    }

    const fileReadStream = fs.createReadStream(uploadedFile.filepath);
    const fileContentBuffer = await streamToBuffer(fileReadStream);

    let rows = [];
    const fileExtension = uploadedFile.originalFilename.split('.').pop().toLowerCase();

    if (fileExtension === 'csv') {
      rows = await parseCsvBuffer(fileContentBuffer); // parseCsvBuffer already normalizes headers to lowercase
    } else if (fileExtension === 'xlsx') {
      const workbook = XLSX.read(fileContentBuffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      // Use header: 1 to get headers from the first row as an array. raw: false to get formatted values.
      rows = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: false, defval: '', blankrows: false });
      if (rows.length > 0) {
        // Normalize headers to lowercase, trim, and remove BOM for XLSX as well
        const headers = rows[0].map(h => h ? h.toString().trim().toLowerCase().replace(/^\ufeff/, '') : '');
        const dataRows = rows.slice(1);
        rows = dataRows.map(row => {
          let rowObject = {};
          headers.forEach((header, index) => {
            rowObject[header] = row[index] ? row[index].toString().trim() : '';
          });
          return rowObject;
        });
        console.log('[Bulk Upload API] Processed XLSX headers (normalized):', headers);
        console.log('[Bulk Upload API] First XLSX data row:', rows[0]);
      }
    } else {
      return NextResponse.json({ success: false, error: 'Unsupported file type. Only CSV and XLSX are allowed.' }, { status: 400 });
    }

    if (rows.length === 0) {
      return NextResponse.json({ success: false, error: 'File is empty or contains no valid data rows.' }, { status: 400 });
    }

    const successfulProducts = [];
    const failedProducts = [];

    // Map expected header (normalized to lowercase) to internal field name
    // Keys are lowercase because headers are normalized to lowercase during parsing
    const headerMap = {
      'product': 'name',
      'cat no': 'catNumber',
      'chemical name': 'chemicalName',
      'cas no': 'casNumber',
      'molecular formula': 'molecularFormula',
      'molecular weight': 'molecularWeight',
      'purity': 'purity',
      'api name': 'subCategoryName',
      'main category name': 'mainCategoryName',
      'stock': 'stock', // NEW: Add stock header mapping
    };

    const uploadedHeadersNormalized = Object.keys(rows[0] || {}); // Get normalized headers from the first data row

    // Required headers for checking. These should match the keys in headerMap.
    const requiredProductHeadersNormalized = ['product', 'cat no', 'api name'];
    const missingHeaders = requiredProductHeadersNormalized.filter(header => !uploadedHeadersNormalized.includes(header));
    if (missingHeaders.length > 0) {
      // Provide user-friendly original names for the error message
      const originalMap = {
          'product': 'Product',
          'cat no': 'Cat No',
          'api name': 'API Name'
      };
      const originalMissingHeaders = missingHeaders.map(nh => originalMap[nh] || nh);
      return NextResponse.json({
        success: false,
        error: `Missing required columns: ${originalMissingHeaders.join(', ')}. Please ensure your file has 'Product', 'Cat No', and 'API Name' columns.`
      }, { status: 400 });
    }

    const DEFAULT_MAIN_CATEGORY_NAME = 'Uncategorized'; // Define a default main category name

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const rowNumber = i + 2; // Row number in the spreadsheet for error reporting (assuming 1-based index and header row)
      let productData = {}; // Using let to allow reassignment within loop

      try {
        let isRowTrulyEmpty = true; // Flag to check if row is effectively empty

        // Extract data based on normalized headers and headerMap
        for (const uploadedHeaderNormalized of uploadedHeadersNormalized) {
          const internalField = headerMap[uploadedHeaderNormalized];
          let value = row[uploadedHeaderNormalized] ? row[uploadedHeaderNormalized].toString().trim() : '';
          
          // NEW LOGIC: Specific handling for 'stock' field
          if (internalField === 'stock') {
              const lowerCaseValue = value.toLowerCase();
              if (lowerCaseValue === 'instock' || lowerCaseValue === 'in stock') {
                  value = 'Instock';
              } else if (lowerCaseValue === 'outofstock' || lowerCaseValue === 'out of stock') {
                  value = 'Out of stock';
              } else {
                  // If unrecognized, revert to default 'Instock' as per requirement
                  value = 'Instock';
                  console.warn(`[Row ${rowNumber}] Unrecognized stock value "${row[uploadedHeaderNormalized]}". Defaulting to "Instock".`);
              }
          }

          if (internalField) {
            productData[internalField] = value;
            if (value !== '') {
                isRowTrulyEmpty = false; // If any mapped field has a value, it's not empty
            }
          }
        }

        // --- Ignore truly blank rows ---
        if (isRowTrulyEmpty) {
            console.log(`[Row ${rowNumber}] Skipping: Appears to be an empty row.`);
            continue; // Skip to the next row
        }

        // Validate basic required product fields
        if (!productData.name || !productData.catNumber || !productData.subCategoryName) {
          throw new Error('Product Name (Product), Catalog Number (Cat No), and Subcategory Name (API Name) are required fields for each product.');
        }
        console.log(`[Row ${rowNumber}] Processing product: "${productData.name}" (Cat No: "${productData.catNumber}")`);

        let resolvedMainCategory = null;
        let resolvedSubCategory = null;

        // --- Step 1: Resolve or Create Main Category ---
        const mainCategoryNameFromRow = productData.mainCategoryName;

        if (mainCategoryNameFromRow) {
            resolvedMainCategory = await getOrCreateMainCategory(mainCategoryNameFromRow);
        } else {
            // If mainCategoryName is not provided, use the default "Uncategorized"
            console.log(`[Row ${rowNumber}] No Main Category Name provided. Using default: "${DEFAULT_MAIN_CATEGORY_NAME}"`);
            resolvedMainCategory = await getOrCreateMainCategory(DEFAULT_MAIN_CATEGORY_NAME);
        }
        console.log(`[Row ${rowNumber}] Resolved Main Category: ${resolvedMainCategory.name} (ID: ${resolvedMainCategory._id})`);

        // --- Step 2: Resolve or Create Subcategory ---
        // Subcategory name is guaranteed to be present due to requiredProductHeaders check
        const subCategoryNameFromRow = productData.subCategoryName;
        // The subcategory slug is generated from its name only, as per SubCategory model's pre-validate hook
        const subCategorySlugToUse = generateSlug(subCategoryNameFromRow);

        console.log(`[Row ${rowNumber}] Looking for Subcategory by name ("${subCategoryNameFromRow}") and Main Category ID ("${resolvedMainCategory._id}").`);
        
        // Try to find subcategory under the resolved main category first (case-insensitive name match)
        resolvedSubCategory = await SubCategory.findOne({
            name: new RegExp(`^${subCategoryNameFromRow.trim()}$`, 'i'),
            mainCategory: resolvedMainCategory._id
        });

        if (!resolvedSubCategory) {
            // If not found under the specific/default main category, create it
            console.log(`[Row ${rowNumber}] Subcategory "${subCategoryNameFromRow}" under "${resolvedMainCategory.name}" not found. Creating new...`);
            resolvedSubCategory = new SubCategory({
                name: subCategoryNameFromRow,
                mainCategory: resolvedMainCategory._id,
                slug: subCategorySlugToUse // Explicitly set slug for consistency, though model's pre-save handles it too
            });
            try {
                await resolvedSubCategory.save(); // Slug is generated by pre-validate hook
                console.log(`[Row ${rowNumber}] Created Subcategory: ${resolvedSubCategory.name} (Slug: ${resolvedSubCategory.slug}, ID: ${resolvedSubCategory._id}) under ${resolvedMainCategory.name}`);
            } catch (subCatError) {
                if (subCatError.code === 11000) { // Duplicate key error (e.g., race condition)
                    console.warn(`[Row ${rowNumber}] Duplicate subcategory entry detected during save (MongoDB code 11000): ${subCatError.message}. Attempting final retrieval by name+mainCategory...`);
                    // Attempt to retrieve it again to ensure we use the existing one
                    resolvedSubCategory = await SubCategory.findOne({
                        name: new RegExp(`^${subCategoryNameFromRow.trim()}$`, 'i'),
                        mainCategory: resolvedMainCategory._id
                    });
                    if (!resolvedSubCategory) {
                        throw new Error(`Failed to retrieve existing subcategory after duplicate key error. Original error: ${subCatError.message}`);
                    }
                    console.log(`[Row ${rowNumber}] Successfully retrieved existing Subcategory after save error: ${resolvedSubCategory.name} (ID: ${resolvedSubCategory._id})`);
                } else {
                    // Re-throw other unexpected errors
                    throw new Error(`Failed to create Subcategory "${subCategoryNameFromRow}" under "${resolvedMainCategory.name}": ${subCatError.message}`);
                }
            }
        } else {
            console.log(`[Row ${rowNumber}] Found existing Subcategory: ${resolvedSubCategory.name} (Slug: ${resolvedSubCategory.slug}, ID: ${resolvedSubCategory._id})`);
            // If found, ensure its slug is consistent with the current logic (name-only)
            if (resolvedSubCategory.slug !== subCategorySlugToUse) {
                console.log(`[Row ${rowNumber}] Updating slug for existing Subcategory "${resolvedSubCategory.name}" from "${resolvedSubCategory.slug}" to "${subCategorySlugToUse}"`);
                resolvedSubCategory.slug = subCategorySlugToUse;
                await resolvedSubCategory.save();
            }
        }
        console.log(`[Row ${rowNumber}] --- Subcategory Lookup End --- Final Subcategory: ${resolvedSubCategory ? resolvedSubCategory.name : 'N/A'} (ID: ${resolvedSubCategory ? resolvedSubCategory._id : 'N/A'})`);


        // --- Step 3: Product Uniqueness Check & Creation ---
        // As per your explicit request: "product name i.e name is already exist, no need to add that product."
        console.log(`[Row ${rowNumber}] Checking for existing product with Product Name (case-insensitive): "${productData.name}"`);
        let existingProduct = await Product.findOne({ name: new RegExp(`^${productData.name.trim()}$`, 'i') }); 

        if (existingProduct) {
            throw new Error(`Product with Name "${productData.name}" (Catalog Number: "${existingProduct.catNumber}") already exists. Skipping import of duplicate product.`);
        } else {
            console.log(`[Row ${rowNumber}] No existing product with Name "${productData.name}". Creating new...`);
            const newProduct = new Product({
                name: productData.name,
                catNumber: productData.catNumber,
                chemicalName: productData.chemicalName || '',
                casNumber: productData.casNumber || '',
                molecularFormula: productData.molecularFormula || '',
                molecularWeight: productData.molecularWeight || '',
                purity: productData.purity || '',
                subCategory: resolvedSubCategory._id, // Link product to the resolved SubCategory ID
                stock: productData.stock || 'Instock', // NEW: Assign stock, default to 'Instock' if not provided or invalid
            });

            await newProduct.save();

            successfulProducts.push({ rowNumber, product: newProduct });
            console.log(`[Row ${rowNumber}] Created new product: ${newProduct.name} (Cat No: ${newProduct.catNumber})`);
        }

      } catch (error) {
        // Collect detailed error for the failed product
        const productNameForError = productData.name || 'Unnamed Product';
        const productCatNoForError = productData.catNumber || 'N/A';
        console.error(`[Row ${rowNumber}] Failed to process product: ${productNameForError} (Cat No: ${productCatNoForError}) - ${error.message}`);
        failedProducts.push({ rowNumber, data: row, errors: [error.message] });
      }
    }

    // Final response based on overall success/failure
    if (failedProducts.length > 0) {
      return NextResponse.json({
        success: true, // Still true because some products might have been imported
        message: 'Bulk upload completed with partial success. Some products failed to import.',
        successful: successfulProducts,
        failed: failedProducts,
      }, { status: 207 }); // 207 Multi-Status
    } else {
      return NextResponse.json({
        success: true,
        message: `Bulk upload successful! ${successfulProducts.length} products imported.`,
        successful: successfulProducts,
        failed: [],
      }, { status: 200 }); // OK
    }

  } catch (error) {
    console.error('Error during bulk product upload (top-level catch):', error);
    // Handle specific error types for better user feedback
    if (error.message.includes('file too large')) {
      return NextResponse.json({ success: false, error: 'File size exceeds the 10MB limit.' }, { status: 413 }); // Payload Too Large
    }
    return NextResponse.json({ success: false, error: error.message || 'Internal Server Error' }, { status: 500 }); // Generic Server Error
  } finally {
      // Clean up the temporary uploaded file
      if (uploadedFile && uploadedFile.filepath) {
          fs.unlink(uploadedFile.filepath, (err) => {
              if (err) console.error('Error deleting temp file:', err);
          });
      }
  }
}

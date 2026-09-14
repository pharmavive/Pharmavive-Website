// models/Product.js
import mongoose from 'mongoose';
import { generateSlug } from '../utils/stringUtils'; // Import your slug utility

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required.'],
    trim: true,
  },
  // Changed from 'category' string to 'subCategory' ObjectId reference
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubCategory', // This must match the name used in mongoose.model('SubCategory', ...)
    required: [true, 'Product must belong to a subcategory.'],
  },
  slug: {
    type: String,
    unique: true,
    required: true,
  },
  catNumber: {
    type: String,
    trim: true,
  },
  chemicalName: {
    type: String,
    trim: true,
  },
  casNumber: {
    type: String,
    trim: true,
  },
  molecularFormula: {
    type: String,
    trim: true,
  },
  molecularWeight: {
    type: String,
    trim: true,
  },
  purity: {
    type: String,
    trim: true,
  },
  image: {
    type: String, // URL from Cloudinary
    trim: true,
  },
  stock: {
        type: String,
        enum: ['Instock', 'Out of stock'],
        default: 'Instock', // Default value
        required: true
    },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

// Pre-save hook to generate slug before saving
ProductSchema.pre('validate', function(next) {
  if ((this.isModified('name') || this.isModified('catNumber')) || this.isNew) {
    if (this.name && this.catNumber) {
      this.slug = generateSlug(this.name, this.catNumber);
    } else {
      console.warn("Product slug generation skipped: Name or CatNumber missing for product:", this.name, this.catNumber);
      this.slug = `temp-slug-${Date.now()}`;
    }
  }
  next();
});

// Add indexes for fast category filtering and sorting
ProductSchema.index({ subCategory: 1 });
ProductSchema.index({ subCategory: 1, name: 1 });

// Add a text index for search functionality
ProductSchema.index({
  name: 'text',
  catNumber: 'text',
  chemicalName: 'text',
  casNumber: 'text',
  molecularFormula: 'text',
  molecularWeight: 'text',
  purity: 'text',
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default Product;

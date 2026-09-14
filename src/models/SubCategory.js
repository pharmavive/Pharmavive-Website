// src/models/SubCategory.js
import mongoose from 'mongoose';
import { generateSlug } from '../utils/stringUtils'; // <-- ENSURE THIS IS THE CORRECT PATH TO YOUR UTILITY

const SubCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Subcategory name is required.'],
        trim: true,
    },
    slug: {
        type: String,
        unique: true,
        required: true,
        index: true,
    },
    description: { // NEW FIELD: Description for the subcategory
        type: String,
        trim: true,
        default: '' // Optional, defaults to an empty string
    },
    mainCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MainCategory',
        required: [true, 'Subcategory must belong to a main category.'],
    },
}, { timestamps: true });

// Ensure that a subcategory name is unique only within its main category
SubCategorySchema.index({ name: 1, mainCategory: 1 }, { unique: true });
SubCategorySchema.index({ mainCategory: 1 });

// Pre-validate hook to generate the slug before validation (and saving)
SubCategorySchema.pre('validate', async function(next) {
    // Only generate slug if the name or mainCategory has been modified, or if it's a new document
    if (this.isModified('name') || this.isModified('mainCategory') || this.isNew) {
        // If mainCategory is not yet populated but its ID is set, fetch its name
        // This is crucial if mainCategory name is needed for slug uniqueness but not yet populated
        let mainCategoryNameForSlug = '';
        if (this.mainCategory && typeof this.mainCategory.toString === 'function') { // Check if it's an ObjectId
            // Only try to populate if it's not already a full object and ID exists
            if (!this.mainCategory.name) { // Check if name property exists (meaning it's populated)
                try {
                    const MainCategory = mongoose.models.MainCategory || mongoose.model('MainCategory');
                    const mc = await MainCategory.findById(this.mainCategory).select('name');
                    if (mc) {
                        mainCategoryNameForSlug = mc.name;
                    }
                } catch (error) {
                    console.error('Error fetching mainCategory name for slug:', error);
                    // Continue without mainCategory name in slug if error occurs
                }
            } else {
                // Already populated, use its name
                mainCategoryNameForSlug = this.mainCategory.name;
            }
        }
        this.slug = generateSlug(this.name, mainCategoryNameForSlug);
    }
    next();
});

const SubCategory = mongoose.models.SubCategory || mongoose.model('SubCategory', SubCategorySchema);
export default SubCategory;

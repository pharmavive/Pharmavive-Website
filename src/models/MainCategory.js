    // src/models/MainCategory.js
    import mongoose from 'mongoose';
    import { generateSlug } from '../utils/stringUtils'; // <-- ENSURE THIS IS THE PATH

    const MainCategorySchema = new mongoose.Schema({
      name: { type: String, required: true, unique: true, trim: true },
      slug: { type: String, unique: true, required: true },
    }, { timestamps: true });

    MainCategorySchema.pre('validate', function(next) {
      if (this.isModified('name') || this.isNew) {
        this.slug = generateSlug(this.name, '');
      }
      next();
    });

    const MainCategory = mongoose.models.MainCategory || mongoose.model('MainCategory', MainCategorySchema);
    export default MainCategory;
    
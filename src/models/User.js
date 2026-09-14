// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    default: '', // Optional
  },
  email: {
    type: String,
    unique: true, // Email should typically be unique
    trim: true,
  },
  password: {
    type: String,
    default: '',
  },
  emailVerified: {
    type: Date,
    default: null, // Optional, set when email is verified
  },
  image: { // Profile image URL
    type: String,
    default: '', // Optional
  },
  institution: {
    type: String,
    trim: true,
    default: '',
  },
  role: {
    type: String,
    trim: true,
    default: 'Customer',
  },
  phone: {
    type: String,
    trim: true,
    default: '',
  },
  country: {
    type: String,
    trim: true,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

// Update `updatedAt` field on save
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;

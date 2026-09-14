// models/Post.js
import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  category: { // e.g., 'Blog', 'News & Events'
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    trim: true,
    default: '', // Optional: defaults to empty string if not provided
  },
  image: {
    type: String,
    default: '', // Optional: defaults to empty string if no image URL
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

export default Post;

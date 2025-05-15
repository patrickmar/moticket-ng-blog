const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const postSchema = new Schema(
  {
    title: { type: String, required: true },
    caption: {
      type: String,
      required: true,
      maxlength: [150, 'Your caption cannot excced 300 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please enter post details'],
    },

    image: {
      type: String,
    },

    user: { type: mongoose.Schema.ObjectId, ref: 'User' },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

const Post = model('Post', postSchema);
module.exports = Post;

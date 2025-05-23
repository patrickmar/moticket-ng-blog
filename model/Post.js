const mongoose = require("mongoose");
const slugify = require("slugify");
const { Schema, model } = mongoose;

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    caption: {
      type: String,
      required: true,
      maxlength: [150, "Your caption cannot exceed 150 characters"],
    },
    description: {
      type: String,
      required: [true, "Please enter post details"],
    },
    image: {
      type: String,
    },
    user: { type: mongoose.Schema.ObjectId, ref: "User" },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

// Middleware to create slug from title before saving
postSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

const Post = model("Post", postSchema);
module.exports = Post;

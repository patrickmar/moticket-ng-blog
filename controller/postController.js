const Post = require("../model/Post");
const dotenv = require("dotenv").config();

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const createPost = async (req, res, next) => {
  try {
    const { title, caption, image, description } = req.body;
    const imageUrl = await cloudinary.uploader.upload(image);
    console.log(imageUrl);
    console.log(imageUrl.url);

    const newPost = await Post.create({
      title,
      caption,
      image: imageUrl.url,
      description,
      user: req.user._id,
    });
    res.status(201).json({ success: true, data: newPost });
    console.log(data);
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const { title, caption, image, description } = req.body;

    // Find the post to be edited
    const post = await Post.findById(postId);

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    // Check if the user is authenticated and owns the post
    if (!req.user || post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    // Update the post fields
    post.title = title;
    post.caption = caption;
    post.description = description;
    // Check if a new image is provided
    if (image) {
      console.log("image exist");
      // Delete the old image from Cloudinary
      await cloudinary.uploader.destroy(post.image);

      // Upload the new image to Cloudinary
      const imageUrl = await cloudinary.uploader.upload(image);
      post.image = imageUrl.url;
    }

    // Save the updated post
    await post.save();

    res.status(200).json({
      success: true,
      data: post,
      image: image,
      message: "post updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const postId = req.params.id;

    // Find the post to be deleted
    const post = await Post.findById(postId);

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    // Check if the user is authenticated and owns the post
    if (!req.user || post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    // Delete the image from Cloudinary
    await cloudinary.uploader.destroy(post.image);

    // Delete the post
    await Post.deleteOne({ _id: postId });

    res.status(200).json({ success: true, message: "Post deleted" });
  } catch (error) {
    next(error);
  }
};

const getPost = async (req, res, next) => {
  console.log({ id: req.params.id });
  try {
    const post = await Post.findById(req.params.id).populate([
      {
        path: "user",
        select: ["avatar", "name"],
      },
    ]);
    console.log(post);

    if (!post) {
      const error = new Error("Post was not found");
      return next(error);
    }

    return res.json(post);
  } catch (error) {
    next(error);
  }
};

const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({}).populate([
      {
        path: "user",
        select: ["avatar", "name", "verified"],
      },
    ]);

    res.json(posts);
  } catch (error) {
    next(error);
  }
};
module.exports = { createPost, updatePost, deletePost, getPost, getAllPosts };

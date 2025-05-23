const express = require("express");

const {
  createPost,
  updatePost,
  deletePost,
  getPost,
  getAllPosts,
} = require("../controller/postController");
const { authGuard, adminGuard } = require("../middleware/authMiddleware");

const router = express.Router();

// Create a post
router.route("/post").post(authGuard, adminGuard, createPost);

// Get all posts
router.route("/posts").get(getAllPosts);

// Routes using slug
router
  .route("/post/:slug")
  .get(getPost)
  .put(authGuard, adminGuard, updatePost)
  .delete(authGuard, adminGuard, deletePost);

module.exports = router;

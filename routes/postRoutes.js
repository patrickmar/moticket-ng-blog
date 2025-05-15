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

router.route("/post").post(authGuard, adminGuard, createPost);

router.route("/posts").get(getAllPosts);

router
  .route("/post/:id")
  .put(authGuard, adminGuard, updatePost)
  .delete(authGuard, adminGuard, deletePost);
router.route("/post/:id").get(getPost);
module.exports = router;

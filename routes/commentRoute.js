const express = require("express");

const {
  getAllComments,
  createComments,
} = require("../controller/commentController");
const router = express.Router();

router.route("/comment").post(createComments);
router.route("/comments").get(getAllComments);

module.exports = router;

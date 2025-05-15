const { createCategory, getAllCategories } = require("../controller/category");

const express = require("express");
const router = express.Router();

router.route("/createCategory").post(createCategory);
router.route("/categories").get(getAllCategories);
module.exports = router;

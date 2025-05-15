const express = require("express");
const {
  registerUser,
  login,
  profile,
  updateProfile,
  updateProfilePicture,
} = require("../controller/userController");
const { authGuard } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(login);
router.route("/profile").get(authGuard, profile);
router.route("/updateProfile").put(authGuard, updateProfile);
router.route("/updateProfilePicture").put(authGuard, updateProfilePicture);

module.exports = router;

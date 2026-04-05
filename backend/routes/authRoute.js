const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const {
  registerUser,
  loginUser,
  getUserInfo,
} = require("../controllers/authController");

const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// ✅ Register (with image upload)
router.post("/register", upload.single("profileImage"), registerUser);

// ✅ Login
router.post("/login", loginUser);

// ✅ Protected route
router.get("/getUser", protect, getUserInfo);

module.exports = router;

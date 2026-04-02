const express = require("express")
const {protect} = require("../middleware/authMiddleware")

const {
    registerUser,loginUser, getUserInfo,
} =require('../controllers/authController');
const upload = require("../middleware/uploadMiddleware");
const response = require("../utils/responseHandler");

const router = express.Router();
// const protect = 'fdfd'

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/getUser', protect,  getUserInfo)

router.post(
  "/upload-image",
  upload.single("image"),
  (req, res) => {
    if (!req.file) {
      return response(res, 400, "No file uploaded");
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    return response(res, 200, "File uploaded successfully", imageUrl);
  }
);

module.exports = router;
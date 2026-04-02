const express = require("express")
const {protect} = require("../middleware/authMiddleware")
const response = require("../utils/responseHandler");

const {getDashboardData} = require('../controllers/dashboardController');

const router = express.Router();

router.get("/", protect, getDashboardData);


module.exports = router;
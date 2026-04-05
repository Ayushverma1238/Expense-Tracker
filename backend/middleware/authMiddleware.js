const jwt = require("jsonwebtoken");
const db = require("../config/db");
const response = require("../utils/responseHandler");


exports.protect = async (req, res, next) => {
  let token;

  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded; // or fetch user from DB
      next();
    } else {
      return res.status(401).json({ message: "No token provided" });
    }
  } catch (error) {
    console.error("JWT token error", error);
    return res.status(401).json({ message: "Token failed" });
  }
};

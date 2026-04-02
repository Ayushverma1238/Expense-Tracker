const jwt = require("jsonwebtoken");
const db = require("../config/db");
const response = require("../utils/responseHandler");

exports.protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];
  if (!token) return response(res, 401, "Not authorize, no token");
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const [rows] = await db
      .query("SELECT * FROM users WHERE id = ?", [decode.id]);
    const user = rows[0];
    delete user.password;

    req.user = user;
    next();
  } catch (error) {
    console.error("JWT token error", error)
    return response(res, 401, "Not authorized, token failed")
  }
};

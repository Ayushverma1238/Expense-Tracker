const jwt = require("jsonwebtoken");
const db = require("../config/db");
const { createUser, createUserTable } = require("../models/User");
const response = require("../utils/responseHandler");
const bcrypt = require("bcryptjs");

createUserTable();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Register user
exports.registerUser = async (req, res) => {
  const { fullName, email, password, profileImageUrl } = req.body;
  // check validation field
  if (!fullName || !email || !password) {
    return response(res, 400, "All filed is required.");
  }

  try {
    const query = `SELECT * from users WHERE email = ?`;
    const [rows] = await db.query(query, [email]);
    if (rows.length !== 0) {
      return response(res, 403, "This email is already register");
    }

    // Creating user
    const user = await createUser({
      fullName,
      email,
      password,
      profileImageUrl,
    });
    const token = generateToken(user.id);
    return response(res, 201, "User registered successfully", {
      user,
      token,
      id: user.id,
    });
  } catch (error) {
    console.error("User register error", error);
    return response(res, 500, "Internal server error");
  }
};

// Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return response(res, 400, "All field are required");
  }
  try {
    // 1. Get user from DB
    const query = "SELECT * FROM users WHERE email = ?";
    const [rows] = await db.query(query, [email]);

    if (rows.length === 0) {
      return response(res, 404, "User not found.");
    }

    const user = rows[0];

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return response(res, 400, "Password is incorrect");
    }

    // 3. Success
    return response(res, 200, "User Login Successfull", {
      id: user.id,
      user,
      token: generateToken(user.id),
    });
  } catch (error) {
    console.error(error);
    return response(res, 500, "Internal server error");
  }
};

// Get user details
exports.getUserInfo = async (req, res) => {
  try {
    const query = `SELECT * from users WHERE id = ?`;
    const [rows] = await db
      .query(query, [req.user.id]);

    const user = rows[0];
    delete user.password;
    if (!user) {
      return response(res, 404, "User not found");
    }
    return response(res, 200, "User found", user);
  } catch (error) {
    console.error("Getting user detail",error);
    return response(res, 500, "Internal server error");
  }
};

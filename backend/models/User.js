const db = require("../config/db");

const bcrypt = require("bcryptjs");

const createUserTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      fullName VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      profileImageUrl VARCHAR(150),
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `;

  try {
    const [result] = await db.query(query); // ✅ NO callback
  } catch (err) {
    console.error("Error creating user table:", err);
  }
};

// Insert User
const createUser = async (userData) => {
    const { fullName, email, password, profileImageUrl } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);

  const query =
    "INSERT INTO users (fullName, email, password,profileImageUrl) VALUES (?, ?, ?,?)";

  const [result] = await db.query(query, [fullName, email, hashedPassword, profileImageUrl]);
  return result;
};

module.exports = {
  createUserTable,
  createUser,
};

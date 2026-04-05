const mysql = require("mysql2/promise");
require("dotenv").config();

const db = mysql.createPool(process.env.DATABASE_URL);


// const db = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "Ayush@1234",
//   database: "expanceTracker",
// });

module.exports = db;
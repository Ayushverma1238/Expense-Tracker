require('dotenv').config();
const db = require('./config/db');
const authRoute = require("./routes/authRoute");
const incomeRoute = require("./routes/incomeRoute");
const expenseRoute = require("./routes/expenseRoute");
const dashboardRoute = require("./routes/dashboardRoute");
const path = require('path')
const express = require("express");
const cors = require('cors');

const app = express();

app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods: ["GET", "PUT", "DELETE", "POST"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json());

// ✅ Test DB connection (optional but recommended)
(async () => {
    try {
        await db.query("SELECT 1");
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Database connection failed", error);
    }
})();

app.use("/api/auth", authRoute);
app.use("/api/income", incomeRoute);
app.use("/api/expense", expenseRoute);
app.use("/api/dashboard", dashboardRoute);



// server uploads folder
app.use("/uploads", express.static(path.join(__dirname, 'uploads') ));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
});
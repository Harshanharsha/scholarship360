const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "scholarship360_secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Database Connection
const db = process.env.MONGO_URI || "";
if (db) {
  mongoose
    .connect(db)
    .then(() => console.log("✅ MongoDB Connection Successful"))
    .catch((err) => console.log("❌ MongoDB Connection Error: ", err));
} else {
  console.log("⚠️ MONGO_URI not found in environment variables.");
}

// Routes
app.use(require("./router/auth.js"));
app.use(require("./router/adminAuth.js"));
app.use(require("./router/scholarshipAuth.js"));
app.use(require("./router/applicationsAuth.js"));

app.get("/", (req, res) => {
  res.send("Scholarship360 API is running...");
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running at port ${PORT}`);
});


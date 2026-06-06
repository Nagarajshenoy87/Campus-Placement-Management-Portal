const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");

const app = express();

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/placementportal")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// Routes
app.use("/api", authRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("Placement Portal Backend Running");
});

// Server Start
app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});
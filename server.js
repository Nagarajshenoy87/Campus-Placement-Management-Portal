const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");

const app = express();

app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/placementportal")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

app.use("/api", authRoutes);

app.get("/", (req, res) => {
  res.send("Placement Portal Backend Running");
});

app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});
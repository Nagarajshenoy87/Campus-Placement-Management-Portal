const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const companyRoutes = require("./routes/company");
const driveRoutes = require("./routes/drive");
const applicationRoutes = require("./routes/application");
const eligibilityRoutes = require("./routes/eligibility");
const dashboardRoutes = require("./routes/dashboard");
const resumeRoutes = require("./routes/resumeRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded files
app.use("/uploads", express.static("uploads"));

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/placementportal")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// API Routes
app.use("/api", authRoutes);
app.use("/api", companyRoutes);
app.use("/api", driveRoutes);
app.use("/api", applicationRoutes);
app.use("/api", eligibilityRoutes);
app.use("/api", dashboardRoutes);
app.use("/api/resume", resumeRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("🚀 Placement Portal Backend Running");
});

// Start Server
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
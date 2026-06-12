const express = require("express");
const router = express.Router();

const {
  addDrive,
  getDrives,
  updateDrive,
  deleteDrive,
} = require("../controllers/driveController");

// Add Drive
router.post("/drive", addDrive);

// Get All Drives
router.get("/drive", getDrives);

// Update Drive
router.put("/drive/:id", updateDrive);

// Delete Drive
router.delete("/drive/:id", deleteDrive);

module.exports = router;
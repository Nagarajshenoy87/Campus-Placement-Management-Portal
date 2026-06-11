const express = require("express");
const router = express.Router();

const {
  addDrive,
  getDrives,
} = require("../controllers/driveController");

router.post("/drive", addDrive);
router.get("/drive", getDrives);

module.exports = router;
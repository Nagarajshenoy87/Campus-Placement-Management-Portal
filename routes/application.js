const express = require("express");
const router = express.Router();

const {
  applyDrive,
  getApplications,
  updateApplicationStatus,
  exportApplications,
} = require("../controllers/applicationController");

router.post("/application", applyDrive);

router.get("/application", getApplications);

router.put(
  "/application/:id",
  updateApplicationStatus
);

router.get(
  "/application/export",
  exportApplications
);

module.exports = router;
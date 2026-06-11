const express = require("express");
const multer = require("multer");
const path = require("path");

const {
  uploadResume,
  getResume,
} = require("../controllers/resumeController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/resumes");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

router.post(
  "/upload-resume",
  upload.single("resume"),
  uploadResume
);

router.get(
  "/resume/:email",
  getResume
);

module.exports = router;
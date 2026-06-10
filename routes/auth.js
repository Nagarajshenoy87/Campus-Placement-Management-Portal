const express = require("express");
const router = express.Router();

const {
  registerStudent,
  loginStudent,
  updateSkills,
} = require("../controllers/authController");

router.post("/register", registerStudent);

router.post("/login", loginStudent);

router.put("/skills", updateSkills);

module.exports = router;
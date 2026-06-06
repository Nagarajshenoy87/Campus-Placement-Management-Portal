const express = require("express");
const router = express.Router();

const { registerStudent } = require("../controllers/authController");

router.get("/register", registerStudent);

module.exports = router;
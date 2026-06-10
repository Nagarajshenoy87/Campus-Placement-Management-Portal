const express = require("express");
const router = express.Router();

const {
  addCompany,
  getCompanies,
} = require("../controllers/companyController");

router.post("/company", addCompany);
router.get("/company", getCompanies);

module.exports = router;
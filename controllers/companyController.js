const Company = require("../models/Company");

// Add Company
const addCompany = async (req, res) => {
  try {
    const {
      companyName,
      package,
      minCGPA,
      jobRole,
    } = req.body;

    const existingCompany =
      await Company.findOne({
        companyName,
        jobRole,
      });

    if (existingCompany) {
      return res.status(400).json({
        message: "Company already exists",
      });
    }

    const company = new Company({
      companyName,
      package,
      minCGPA,
      jobRole,
    });

    await company.save();

    res.status(201).json({
      message: "Company Added Successfully",
      company,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// Get All Companies
const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();

    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  addCompany,
  getCompanies,
};
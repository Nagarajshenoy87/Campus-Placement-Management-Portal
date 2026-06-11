const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  companyName: String,
  package: Number,
  minCGPA: Number,
  jobRole: String,
});

module.exports = mongoose.model("Company", companySchema);
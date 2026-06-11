const mongoose = require("mongoose");

const driveSchema = new mongoose.Schema({
  companyName: String,
  jobRole: String,
  package: Number,
  minCGPA: Number,
  deadline: String
});

module.exports = mongoose.model("Drive", driveSchema);
const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  studentEmail: String,
  companyName: String,
  jobRole: String,
  status: {
    type: String,
    default: "Applied"
  }
});

module.exports = mongoose.model("Application", applicationSchema);
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  branch: String,
  cgpa: Number,

  role: {
    type: String,
    default: "student",
  },

  resume: {
    type: String,
    default: "",
  },

  skills: {
    type: String,
    default: "",
  },

  placementStatus: {
    type: String,
    default: "Not Placed",
  },
});

module.exports = mongoose.model("Student", studentSchema);
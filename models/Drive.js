const mongoose = require("mongoose");

const driveSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },

    jobRole: {
      type: String,
      required: true,
    },

    package: {
      type: Number,
      required: true,
    },

    minCGPA: {
      type: Number,
      required: true,
    },

    location: {
      type: String,
      default: "Not Specified",
    },

    deadline: {
      type: Date,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "Drive",
  driveSchema
);
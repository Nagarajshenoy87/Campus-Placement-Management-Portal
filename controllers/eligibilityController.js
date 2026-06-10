const Student = require("../models/Student");
const Drive = require("../models/Drive");

const checkEligibility = async (req, res) => {
  try {
    const { email, driveId } = req.body;

    const student = await Student.findOne({ email });
    const drive = await Drive.findById(driveId);

    if (!student || !drive) {
      return res.status(404).json({
        message: "Student or Drive not found",
      });
    }

    if (student.cgpa >= drive.minCGPA) {
      return res.status(200).json({
        eligible: true,
        message: "Student is Eligible",
      });
    }

    res.status(200).json({
      eligible: false,
      message: "Student is Not Eligible",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = { checkEligibility };
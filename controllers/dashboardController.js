const Student = require("../models/Student");
const Company = require("../models/Company");
const Drive = require("../models/Drive");
const Application = require("../models/Application");

const getDashboard = async (req, res) => {
  try {
    const totalStudents =
      await Student.countDocuments();

    const totalCompanies =
      await Company.countDocuments();

    const totalDrives =
      await Drive.countDocuments();

    const totalApplications =
      await Application.countDocuments();

    const selectedStudents =
      await Application.countDocuments({
        status: "Selected",
      });

    const rejectedStudents =
      await Application.countDocuments({
        status: "Rejected",
      });

    const shortlistedStudents =
      await Application.countDocuments({
        status: "Shortlisted",
      });

    const interviewStudents =
      await Application.countDocuments({
        status: "Interview",
      });

    res.status(200).json({
      totalStudents,
      totalCompanies,
      totalDrives,
      totalApplications,

      selectedStudents,
      rejectedStudents,
      shortlistedStudents,
      interviewStudents,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = { getDashboard };
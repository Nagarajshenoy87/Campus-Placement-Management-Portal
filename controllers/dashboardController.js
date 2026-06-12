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
    const drives = await Drive.find();

    const highestPackage =
      drives.length > 0
        ? Math.max(
          ...drives.map((d) => d.package)
        )
        : 0;

    const averagePackage =
      drives.length > 0
        ? (
          drives.reduce(
            (sum, d) => sum + d.package,
            0
          ) / drives.length
        ).toFixed(2)
        : 0;

    const placementRate =
      totalStudents > 0
        ? (
          (selectedStudents /
            totalStudents) *
          100
        ).toFixed(2)
        : 0;
    const upcomingDrives =
      await Drive.find()
        .sort({ _id: -1 })
        .limit(5);
    const topStudents =
      await Student.find()
        .sort({ cgpa: -1 })
        .limit(5);

    res.status(200).json({
      totalStudents,
      totalCompanies,
      totalDrives,
      totalApplications,

      highestPackage,
      averagePackage,
      placementRate,

      selectedStudents,
      rejectedStudents,
      shortlistedStudents,
      interviewStudents,

      upcomingDrives,
      topStudents,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = { getDashboard };
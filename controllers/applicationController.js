const Application = require("../models/Application");
const Student = require("../models/Student");
const Drive = require("../models/Drive");
const XLSX = require("xlsx");

// Apply for Drive
const applyDrive = async (req, res) => {
  try {
    const {
      studentEmail,
      companyName,
      jobRole,
    } = req.body;

    const student = await Student.findOne({
      email: studentEmail,
    });

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    const drive = await Drive.findOne({
      companyName,
      jobRole,
    });

    if (!drive) {
      return res.status(404).json({
        message: "Drive not found",
      });
    }
    const today = new Date();

    const deadline = new Date(
      drive.deadline.split("-").reverse().join("-")
    );

    if (today > deadline) {
      return res.status(400).json({
        message: "Drive Application Closed",
      });
    }

    if (student.cgpa < drive.minCGPA) {
      return res.status(400).json({
        message: "Not Eligible for this Drive",
      });
    }

    const existingApplication =
      await Application.findOne({
        studentEmail,
        companyName,
        jobRole,
      });

    if (existingApplication) {
      return res.status(400).json({
        message: "Already Applied",
      });
    }

    const application = new Application({
      studentEmail,
      companyName,
      jobRole,
    });

    await application.save();

    res.status(201).json({
      message: "Applied Successfully",
      application,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// View Applications
const getApplications = async (req, res) => {
  try {
    const applications = await Application.find();

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// Update Application Status
const updateApplicationStatus = async (
  req,
  res
) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const application =
      await Application.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );

    if (status === "Selected") {
      await Student.findOneAndUpdate(
        {
          email: application.studentEmail,
        },
        {
          placementStatus: "Placed",
        }
      );
    }

    res.status(200).json({
      message: "Status Updated Successfully",
      application,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// Export Applications to Excel
const exportApplications = async (req, res) => {
  try {
    const applications = await Application.find();

    const data = applications.map((app) => ({
      Email: app.studentEmail,
      Company: app.companyName,
      Role: app.jobRole,
      Status: app.status,
    }));

    const workbook = XLSX.utils.book_new();

    const worksheet =
      XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Applications"
    );

    XLSX.writeFile(
      workbook,
      "applications.xlsx"
    );

    res.status(200).json({
      message:
        "Excel File Generated Successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// Get Resume By Email
const getResumeByEmail = async (req, res) => {
  try {
    const student = await Student.findOne({
      email: req.params.email,
    });

    if (!student || !student.resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    return res.redirect(
      `http://localhost:5000/uploads/resumes/${student.resume}`
    );
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  applyDrive,
  getApplications,
  updateApplicationStatus,
  exportApplications,
  getResumeByEmail,
};
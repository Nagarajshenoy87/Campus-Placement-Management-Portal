const Student = require("../models/Student");

const uploadResume = async (req, res) => {
  try {
    const { email } = req.body;

    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    student.resume = req.file.filename;

    await student.save();

    res.status(200).json({
      message: "Resume Uploaded Successfully",
      resume: req.file.filename,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getResume = async (req, res) => {
  try {
    const student = await Student.findOne({
      email: req.params.email,
    });

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.json({
      resume: student.resume,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  uploadResume,
  getResume,
};
const Student = require("../models/Student");

// Register Student
const registerStudent = async (req, res) => {
  try {
    const { name, email, password, branch, cgpa } = req.body;

    const student = new Student({
      name,
      email,
      password,
      branch,
      cgpa,
    });

    await student.save();

    res.status(201).json({
      message: "Student Registered Successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// Login Student
const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    if (student.password !== password) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    res.status(200).json({
      message: "Login Successful",
      student,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  registerStudent,
  loginStudent,
};
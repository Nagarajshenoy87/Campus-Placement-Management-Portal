const Student = require("../models/Student");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register Student
const registerStudent = async (req, res) => {
  try {
    const { name, email, password, branch, cgpa } = req.body;

    const existingStudent = await Student.findOne({ email });

    if (existingStudent) {
      return res.status(400).json({
        message: "Student already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = new Student({
      name,
      email,
      password: hashedPassword,
      branch,
      cgpa,
    });

    await student.save();

    res.status(201).json({
      message: "Student Registered Successfully",
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

    const isMatch = await bcrypt.compare(
      password,
      student.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        id: student._id,
        email: student.email,
      },
      "placementportal_secret",
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      message: "Login Successful",
      token,
      student,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// Update Skills
const updateSkills = async (req, res) => {
  try {
    const { email, skills } = req.body;

    const student = await Student.findOneAndUpdate(
      { email },
      { skills },
      { new: true }
    );

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json({
      message: "Skills Updated Successfully",
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
  updateSkills,
};
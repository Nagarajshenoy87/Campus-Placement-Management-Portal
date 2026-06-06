const Student = require("../models/Student");

const registerStudent = async (req, res) => {
  try {
    const student = new Student({
      name: "Nagaraj",
      email: "nagaraj@gmail.com",
      password: "123456",
      branch: "CSE",
      cgpa: 8.5
    });

    await student.save();

    res.send("Student Saved Successfully");
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = { registerStudent };
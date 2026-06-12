const Drive = require("../models/Drive");

// Add Drive
const addDrive = async (req, res) => {
  try {
    const drive = new Drive(req.body);

    await drive.save();

    res.status(201).json({
      message: "Drive Added Successfully",
      drive,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// Get All Drives
const getDrives = async (req, res) => {
  try {
    const drives = await Drive.find();

    res.status(200).json(drives);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// Update Drive
const updateDrive = async (req, res) => {
  try {
    const drive = await Drive.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "Drive Updated Successfully",
      drive,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// Delete Drive
const deleteDrive = async (req, res) => {
  try {
    await Drive.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Drive Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  addDrive,
  getDrives,
  updateDrive,
  deleteDrive,
};
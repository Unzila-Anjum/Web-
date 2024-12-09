import Attendance from "../models/attendanceSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";

// Create or Mark Attendance
export const markAttendance = async (req, res, next) => {
  const { attendanceData } = req.body;
  try {
    if (!attendanceData || !Array.isArray(attendanceData)) {
      handleValidationError("Attendance data is missing or invalid!", 400);
    }

    const attendanceRecords = await Attendance.insertMany(attendanceData);
    res.status(200).json({
      success: true,
      message: "Attendance marked successfully!",
      attendanceRecords,
    });
  } catch (err) {
    next(err);
  }
};

// Fetch All Attendance
export const getAllAttendance = async (req, res, next) => {
  try {
    const attendanceRecords = await Attendance.find().populate(
      "student",
      "name registrationNumber grade"
    );
    res.status(200).json({
      success: true,
      attendanceRecords,
    });
  } catch (err) {
    next(err);
  }
};

// Update Attendance
export const updateAttendance = async (req, res, next) => {
  const { id, status } = req.body;

  try {
    if (!id || !status) {
      return res.status(400).json({ success: false, message: "Invalid data!" });
    }

    const updatedAttendance = await Attendance.findByIdAndUpdate(
      id,
      { status },
      { new: true } // Return the updated record
    );

    if (!updatedAttendance) {
      return res.status(404).json({ success: false, message: "Attendance not found!" });
    }

    res.status(200).json({
      success: true,
      message: "Attendance updated successfully!",
      updatedAttendance,
    });
  } catch (err) {
    next(err);
  }
};


// Delete Attendance
export const deleteAttendance = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Attendance.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Attendance deleted successfully!",
    });
  } catch (err) {
    next(err);
  }
};

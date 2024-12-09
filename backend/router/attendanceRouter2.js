// import express from "express";
// import { markAttendance, getAllAttendance } from "../controllers/attendanceController.js";

// const router = express.Router();

// router.post('/', markAttendance);
// router.get('/getall', getAllAttendance);

// export default router;

import express from 'express';
import { 
  getAllAttendance, 
  createAttendanceRecords,
  getStudentAttendance,
  getAttendanceByDate, // New method
  getAttendanceForSpecificStudent
} from '../controllers/attendanceController2.js';
import { Attendance } from '../models/attendanceModel.js';
import { Student } from '../models/studentSchema.js';
const attendanceRouter = express.Router();

// Existing routes
attendanceRouter.get('/', getAllAttendance);
attendanceRouter.get('/date', getAttendanceByDate); // New route to get attendance by date
attendanceRouter.post('/records', createAttendanceRecords);
attendanceRouter.get('/:studentId', getStudentAttendance);
attendanceRouter.get('/s', getAttendanceForSpecificStudent);
attendanceRouter.get('/attendance/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params;

    const attendance = await Attendance.find({ studentId })
      .populate('studentId', 'name registrationNumber')
      .sort({ date: -1 }); // Optional: Sort by most recent

    res.status(200).json({
      success: true,
      attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch attendance records.',
      error: error.message,
    });
  }
});
export default attendanceRouter;
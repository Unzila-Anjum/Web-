import express from 'express';
import { 
  getAllAttendance, 
  createAttendanceRecords,
  getStudentAttendance,
  getAttendanceByDate, 
  getAttendanceReport // New method for generating attendance report
} from '../controllers/attendanceControllerAd.js';

const attendanceRouter = express.Router();

// Existing routes
attendanceRouter.get('/', getAllAttendance);
attendanceRouter.get('/date', getAttendanceByDate); // New route to get attendance by date
attendanceRouter.post('/records', createAttendanceRecords);
attendanceRouter.get('/:studentId', getStudentAttendance);
attendanceRouter.get('/report/:studentId', getAttendanceReport); // Updated route to use the controller's method
// Example route handler
attendanceRouter.get('/attendance-report', async (req, res) => {
  try {
    // Fetch attendance data with populated student and course details
    const attendanceReport = await Attendance.find()
      .populate('studentId', 'name rollNo')  // Populate student details (name and rollNo)
      .populate('courseId', 'courseName')   // Populate course details (courseName)
      .sort({ date: -1 });                   // Sort by date in descending order

    // Send the populated data as response
    res.status(200).json({
      success: true,
      data: attendanceReport
    });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error fetching attendance report',
      error: error.message
    });
  }
});

export default attendanceRouter;

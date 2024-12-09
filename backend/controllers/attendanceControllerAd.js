// import Attendance from "../models/attendanceModel.js";
// import { handleValidationError } from "../middlewares/errorHandler.js";

// export const markAttendance = async (req, res, next) => {
//   const { attendanceData } = req.body;
//   try {
//     if (!attendanceData || !Array.isArray(attendanceData) || attendanceData.length === 0) {
//       handleValidationError("Attendance data is missing or invalid!", 400);
//     }
//     const attendanceRecords = await Promise.all(attendanceData.map(async (record) => {
//       const { student, status } = record;
//       return await Attendance.create({ student, status });
//     }));
//     res.status(200).json({
//       success: true,
//       message: "Attendance marked successfully!",
//       attendanceRecords
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// export const getAllAttendance = async (req, res, next) => {
//   try {
//     const attendanceRecords = await Attendance.find().populate('student', 'name registrationNumber grade');
//     res.status(200).json({
//       success: true,
//       attendanceRecords
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// import { Attendance } from '../models/attendanceModel.js';
// import { Student } from '../models/studentSchema.js'; // Assuming you have a student model
// import { catchAsyncError } from '../middlewares/catchAsyncError.js';
// import ErrorHandler from '../utils/errorHandler.js';

// // Get all attendance records
// export const getAllAttendance = catchAsyncError(async (req, res, next) => {
//   const attendance = await Attendance.find().populate('studentId', 'name registrationNumber');

//   res.status(200).json({
//     success: true,
//     attendance
//   });
// });

// // Create or update attendance records
// export const createAttendanceRecords = catchAsyncError(async (req, res, next) => {
//   const { attendanceRecords } = req.body;

//   if (!attendanceRecords || !Array.isArray(attendanceRecords)) {
//     return next(new ErrorHandler('Invalid attendance records', 400));
//   }

//   // Bulk write operation to create or update attendance
//   const bulkWriteOperations = attendanceRecords.map(record => ({
//     updateOne: {
//       filter: { 
//         studentId: record.studentId, 
//         date: {
//           $gte: new Date(record.date).setHours(0,0,0,0),
//           $lt: new Date(record.date).setHours(23,59,59,999)
//         }
//       },
//       update: {
//         $set: {
//           studentId: record.studentId,
//           status: record.status,
//           date: record.date
//         }
//       },
//       upsert: true
//     }
//   }));

//   const result = await Attendance.bulkWrite(bulkWriteOperations);

//   res.status(201).json({
//     success: true,
//     message: 'Attendance records saved successfully',
//     result
//   });
// });

// // Get attendance for a specific student
// export const getStudentAttendance = catchAsyncError(async (req, res, next) => {
//   const { studentId } = req.params;

//   const attendance = await Attendance.find({ studentId }).sort({ date: -1 });

//   res.status(200).json({
//     success: true,
//     attendance
//   });
// });

import { Attendance } from '../models/attendanceModelAd.js';
import { Student } from '../models/studentSchema.js';
import { catchAsyncError } from '../middlewares/catchAsyncError.js';
import {errorHandler} from '../middlewares/errorHandler.js';
// Get all students with their attendance records
export const getStudentsWithAttendance = catchAsyncError(async (req, res, next) => {
  // Fetch all students along with their attendance records
  const students = await Student.find().populate({
    path: 'attendance', // Assuming you have a reference to the attendance in Student model
    select: 'status date', // Fields you want to retrieve from Attendance model
    match: {
      date: { $gte: new Date('2023-01-01') } // Optional: You can filter by date if needed
    }
  });

  if (!students) {
    return next(new ErrorHandler('No students found', 404));
  }

  res.status(200).json({
    success: true,
    students
  });
});
// Get attendance records for a specific date
export const getAttendanceByDate = catchAsyncError(async (req, res, next) => {
  const { date } = req.query;

  // Validate date input
  if (!date) {
    return next(new errorHandler('Date is required', 400));
  }

  // Create date range for the entire day
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  // Find attendance records for the specific date
  const attendance = await Attendance.find({
    date: {
      $gte: startOfDay,
      $lte: endOfDay
    }
  }).populate('studentId', 'name registrationNumber');

  res.status(200).json({
    success: true,
    attendance
  });
});

// Keep the existing methods from the previous implementation
export const getAllAttendance = catchAsyncError(async (req, res, next) => {
  const attendance = await Attendance.find().populate('studentId', 'name registrationNumber');

  res.status(200).json({
    success: true,
    attendance
  });
});

export const createAttendanceRecords = catchAsyncError(async (req, res, next) => {
  const { attendanceRecords } = req.body;

  if (!attendanceRecords || !Array.isArray(attendanceRecords)) {
    return next(new ErrorHandler('Invalid attendance records', 400));
  }

  // Bulk write operation to create or update attendance
  const bulkWriteOperations = attendanceRecords.map(record => ({
    updateOne: {
      filter: { 
        studentId: record.studentId, 
        date: {
          $gte: new Date(record.date).setHours(0,0,0,0),
          $lt: new Date(record.date).setHours(23,59,59,999)
        }
      },
      update: {
        $set: {
          studentId: record.studentId,
          status: record.status,
          date: record.date
        }
      },
      upsert: true
    }
  }));

  const result = await Attendance.bulkWrite(bulkWriteOperations);

  res.status(201).json({
    success: true,
    message: 'Attendance records saved successfully',
    result
  });
});

export const getStudentAttendance = catchAsyncError(async (req, res, next) => {
  const { studentId } = req.params;

  const attendance = await Attendance.find({ studentId }).sort({ date: -1 });

  res.status(200).json({
    success: true,
    attendance
  });
});

export const getAttendanceReport = async (req, res, next) => {
  const { studentId } = req.params;  // Get the studentId from the route parameter

  try {
    // Retrieve attendance records and populate student details
    const attendanceRecords = await Attendance.find({ studentId })
      .populate('studentId', 'name registrationNumber') // Populate student details if needed
      .sort({ date: -1 });  // Sort by date, most recent first (if needed)

    // Check if there are no records
    if (attendanceRecords.length === 0) {
      return next(new errorHandler('No attendance records found for this student', 404));
    }

    // If attendance records are found, send them as a response
    return res.status(200).json({
      success: true,
      data: attendanceRecords
    });
  } catch (error) {
    // Handle any errors
    return next(new errorHandler('Server Error', 500));
  }
};
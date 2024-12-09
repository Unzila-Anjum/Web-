import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },


  
  status: {
    type: String,
    enum: ['Present', 'Absent', 'Late'],
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',  // Reference to the Course model
    required: true
  },
});

// Ensure unique attendance record per student per day
attendanceSchema.index({ studentId: 1, date: 1 }, { unique: true });

export const Attendance = mongoose.model('Attendance2', attendanceSchema);
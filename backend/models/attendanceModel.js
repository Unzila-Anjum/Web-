import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  status: {
    type: String,
    enum: ['Present', 'Absent'],
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
  }
});

// Ensure unique attendance record per student per day
attendanceSchema.index({ studentId: 1, date: 1 }, { unique: true });

export const Attendance = mongoose.model('Attendance', attendanceSchema);
import mongoose from 'mongoose';

const timetableSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',  // Reference to the Course model
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },

}, {
  timestamps: true, // Automatically adds createdAt and updatedAt
});

const Timetable = mongoose.model('Timetable', timetableSchema);

export default Timetable;

import mongoose from "mongoose";

const gradeSchema = new mongoose.Schema({
  studentId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Student", 
    required: true 
  },
  assignments: [{
    type: Number,
    min: 0
  }],
  quizzes: [{
    type: Number,
    min: 0
  }],
  exams: [{
    type: Number,
    min: 0
  }],
  totalMarks: {
    assignments: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    },
    quizzes: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    },
    exams: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    }
  }
}, { timestamps: true });

export const Grade = mongoose.model('Grade', gradeSchema);
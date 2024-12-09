import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  questions: {
    type: [String], // Array of responses
    required: true,
  },
  additionalFeedback: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Feedback', feedbackSchema);

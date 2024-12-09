import mongoose from 'mongoose';

const pastPaperSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
    trim: true
  },
  filePath: {
    type: String,
    required: true,
    trim: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

export const PastPaper = mongoose.model('PastPaper', pastPaperSchema);
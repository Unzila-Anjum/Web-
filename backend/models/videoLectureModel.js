import mongoose from 'mongoose';

const videoLectureSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: [true, 'File name is required'],
    trim: true
  },
  filePath: {
    type: String,
    required: [true, 'File path is required']
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  },
  fileType: {
    type: String,
    required: [true, 'File type is required']
  },
  fileSize: {
    type: Number,
    required: [true, 'File size is required']
  }
}, {
  timestamps: true
});

const VideoLecture = mongoose.model('VideoLecture', videoLectureSchema);

export default VideoLecture;
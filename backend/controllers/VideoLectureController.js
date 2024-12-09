import mongoose from 'mongoose';  // Ensure mongoose is imported
import VideoLecture from '../models/VideoLectureModel.js';
import { errorHandler } from '../middlewares/errorHandler.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Helper to get the uploads folder path
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsPath = path.join(__dirname, '..', 'uploads');

// Controller to upload a video lecture
export const uploadVideoLecture = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Please upload a video lecture' });
    }

    const { originalname, filename, size, mimetype } = req.file;

    const lecture = await VideoLecture.create({
      fileName: originalname,
      filePath: filename,
      fileType: mimetype,
      fileSize: size,
    });

    res.status(201).json({
      success: true,
      message: 'Video lecture uploaded successfully',
      lecture,
    });
  } catch (error) {
    console.error('Error uploading video lecture:', error);
    res.status(500).json({ error: 'Error uploading video lecture' });
  }
};

// Controller to get all video lectures
export const getAllVideoLectures = async (req, res, next) => {
  try {
    const lectures = await VideoLecture.find().sort({ uploadedAt: -1 });

    res.status(200).json({
      success: true,
      lectures,
    });
  } catch (error) {
    next(new errorHandler(error.message, 500));
  }
};

// Controller to delete a video lecture
export const deleteVideoLecture = async (req, res, next) => {
  try {
    const lectureId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(lectureId)) {
      return res.status(400).json({ error: 'Invalid video lecture ID' });
    }

    const lecture = await VideoLecture.findById(lectureId);

    if (!lecture) {
      return res.status(404).json({ error: 'Video lecture not found' });
    }

    const filePath = path.join(uploadsPath, lecture.filePath);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath); // Delete the file from the filesystem
    }

    await lecture.deleteOne(); // Remove the lecture record from the database

    res.status(200).json({
      success: true,
      message: 'Video lecture deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting video lecture:', error);
    res.status(500).json({ error: 'Error deleting video lecture' });
  }
};

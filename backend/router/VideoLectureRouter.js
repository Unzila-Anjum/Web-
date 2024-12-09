import express from 'express';
import multer from 'multer';
import {
  uploadVideoLecture,
  getAllVideoLectures,
  deleteVideoLecture,
} from '../controllers/VideoLectureController.js';

const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Routes
router.post('/upload', upload.single('file'), uploadVideoLecture);
router.get('/getall', getAllVideoLectures);
router.delete('/delete/:id', deleteVideoLecture);

export default router;

import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { uploadPastPaper, getAllPastPapers } from '../controllers/pastPaperController.js';

const router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save files in the 'uploads/' folder
  },
  filename: (req, file, cb) => {
    cb(null, `pastpaper-${Date.now()}${path.extname(file.originalname)}`); // Generate a unique file name
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
  fileFilter: (req, file, cb) => {
    const allowedFileTypes = /pdf|doc|docx|txt/; // Restrict file types
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedFileTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb('Error: Only PDF, DOC, DOCX, and TXT files are allowed!');
    }
  }
});

// Routes
router.post('/upload', upload.single('file'), uploadPastPaper); // Route to upload a past paper
router.get('/getall', getAllPastPapers); // Route to get all past papers

// Route to delete a past paper
router.delete('/delete', (req, res) => {
  const { filePath } = req.body;

  // Ensure file path is specified
  if (!filePath) {
    return res.status(400).json({ error: 'File path is required' });
  }

  const fullPath = path.join(process.cwd(), 'uploads', filePath); // Construct the full path

  // Delete the file
  fs.unlink(fullPath, (err) => {
    if (err) {
      console.error('Error deleting file:', err);
      return res.status(500).json({ error: 'Failed to delete file' });
    }
    res.status(200).json({ message: 'File deleted successfully' });
  });
});

export default router;

import { PastPaper } from '../models/PastPaperModel.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const uploadPastPaper = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { originalname, filename } = req.file;

    const newPastPaper = new PastPaper({
      fileName: originalname,
      filePath: filename
    });

    await newPastPaper.save();

    res.status(201).json({
      message: 'Past paper uploaded successfully',
      paper: newPastPaper
    });
  } catch (error) {
    res.status(500).json({ error: 'Error uploading past paper' });
  }
};

export const getAllPastPapers = async (req, res) => {
  try {
    const papers = await PastPaper.find().sort({ uploadedAt: -1 });
    res.status(200).json({ papers });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching past papers' });
  }
};
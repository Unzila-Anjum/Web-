import express from 'express';
import { addTimetable, createTimetable, getAllCourses } from '../controllers/teachertimetableController.js';

const router = express.Router();

// Fetch all courses for the timetable
router.get('/courses', getAllCourses);

// Create a new timetable
router.post('/', addTimetable);
// Backend route to get a specific timetable entry
router.get('/:id', async (req, res) => {
    try {
      const timetableEntry = await Timetable.findById(req.params.id); // Find by ID
      if (!timetableEntry) {
        return res.status(404).json({ message: "Timetable entry not found" });
      }
      res.json(timetableEntry); // Send the timetable entry as a response
    } catch (error) {
      console.error("Error fetching timetable entry:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  
export default router;

import express from "express";
import { getTimetable } from "../controllers/studentTimetableController.js"; // Update the path if needed

const router = express.Router();

// Route to fetch timetable
router.get("/", getTimetable);

export default router;

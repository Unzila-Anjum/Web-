import express from "express";
import { getGrades, saveGrades, getGradesS } from "../controllers/gradeController.js";

const router = express.Router();

// Route to fetch all grades with populated student details
router.get("/", getGrades);
router.get("/s", getGradesS);

// Route to save or update grades for students
router.post("/grades", saveGrades);
//router.get("/:studentId", getStudentGrade);
export default router;

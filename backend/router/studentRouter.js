import express from "express";
import {
  createStudent,
  getAllStudents,
  updateStudent,
  deleteStudent,
  searchStudents,
} from "../controllers/studentController.js";

const router = express.Router();

// Route to create a new student
router.post("/students", createStudent);

// Route to get all students
router.get("/students", getAllStudents);

// Route to update a student by ID
router.put("/students/:id", updateStudent);

// Route to delete a student by ID
router.delete("/students/:id", deleteStudent);

// Route to search students by query
router.get("/students/search", searchStudents);

export default router;
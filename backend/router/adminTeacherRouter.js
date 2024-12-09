import express from "express";
import {
  getAllTeachers,
  searchTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
 
} from "../controllers/adminTeacherController.js";

const router = express.Router();
const app =express();

// Route to get all teachers
router.get("/", getAllTeachers);

// Route to search teachers by query
router.get("/search", searchTeachers);

// Route to get a specific teacher by ID
router.get("/:id", getTeacherById);

// Route to create a new teacher
router.post("/", createTeacher);

// Route to update an existing teacher
router.put("/:id", updateTeacher);

// Route to delete a teacher
router.delete("/:id", deleteTeacher);

// Route to request a password reset
//router.post("/request-password-reset", requestPasswordReset);

// Route to reset a password
//router.post("/reset-password/:resetToken", resetPassword);
//app.get("/sendMail", sendMail);

export default router;
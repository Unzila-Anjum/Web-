import express from "express";
import {
  getStudentProfile,
  updateStudentProfile,
} from "../controllers/studentProfileController.js";
//import { authenticateStudent } from "../middlewares/authenticateStudent.js";

const router = express.Router();

// Get student profile
router.get("/",  getStudentProfile);

// Update student profile
router.put("/", updateStudentProfile);

export default router;

import express from "express";
import {
  markAttendance,
  getAllAttendance,
  updateAttendance,
  deleteAttendance,
} from "../controllers/attendanceController.js";

const router = express.Router();

router.post("/", markAttendance); // Create attendance
router.get("/", getAllAttendance); // Read attendance
router.put("/", updateAttendance); // Update attendance
router.delete("/:id", deleteAttendance); // Delete attendance

export default router;

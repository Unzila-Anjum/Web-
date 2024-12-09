// import express from "express";
// import {
//   getTeacherProfile,
//   updateTeacherProfile,
// } from "../controllers/teacherProfileController.js";
// import { authenticateTeacher } from "../middlewares/authenticateTeacher.js";

// const router = express.Router();
// // Get teacher profile
// router.get("/api/v1/teachers/profile", authenticateTeacher, getTeacherProfile);
// // Update teacher profile
// router.put("/api/v1/teachers/profile", authenticateTeacher, updateTeacherProfile);
// export default router;



import express from "express";
import {
  createTeacherProfile,
  getTeacherProfile,
  updateTeacherProfile
} from "../controllers/teacherProfileController.js";

const router = express.Router();
// POST: Create a new teacher profile
router.post('/profile', createTeacherProfile);

// GET: Fetch teacher profile
router.get('/profile', getTeacherProfile);

// PUT: Update teacher profile
router.put('/profile', updateTeacherProfile);

export default router;

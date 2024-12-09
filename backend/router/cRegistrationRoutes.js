import express from "express";
import {
  fetchCourses,
  registerCourses,
  getCourseRegistration, 
  deleteRegistration,
  updateRegistration
} from "../controllers/cRegistrationController.js";

const router = express.Router();

router.get("/courses", fetchCourses);
router.post("/register", registerCourses);
router.get("/registration/:studentId", getCourseRegistration);

router.delete("/registration/:studentId", deleteRegistration);
router.put("/registration", updateRegistration);

export default router;

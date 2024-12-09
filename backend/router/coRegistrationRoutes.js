import express from "express";
import {
  addCourse
  
} from "../controllers/courseController.js";

const router = express.Router();

router.get("/course", addCourse);


export default router;

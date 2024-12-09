import express from "express";
import { createAssignment, getAllAssignments, updateAssignment, deleteAssignment } from "../controllers/assignmentController2.js";


const router = express.Router();

router.post("/", createAssignment);
router.get("/getall", getAllAssignments);
router.put("/:id", updateAssignment);
router.delete("/:id", deleteAssignment);

export default router;

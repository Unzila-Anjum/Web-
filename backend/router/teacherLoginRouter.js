import express from "express";
import { teacherLogin } from "../controllers/teacherLoginController.js";

const router = express.Router();

router.post("/login", teacherLogin);

export default router;

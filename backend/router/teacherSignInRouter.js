// import express from 'express';
// import { 
//   teacherSignIn,
//   completeTeacherSignIn
// } from '../controllers/teacherSigninController.js';

// const router = express.Router();

// // Initial sign-in route (only registration number and email)
// router.post('/signin', teacherSignIn);

// // Complete sign-in route (with password)
// router.post('/complete-signin', completeTeacherSignIn);

// export default router;

// import express from 'express';
// import { 
//   teacherSignIn,
//   completeTeacherSignIn,
//   setPermamentPassword
// } from '../controllers/teacherSigninController.js';

// const router = express.Router();

// // Initial sign-in route (only registration number and email)
// router.post('/signin', teacherSignIn);

// // Complete sign-in route (with password)
// router.post('/complete-signin', completeTeacherSignIn);

// // Set permanent password route
// router.post('/set-permanent-password', setPermamentPassword);

// export default router;

// file: /backend/routes/teacherRoutes.js
import express from "express";
import { 
  createTeacher, 
  getAllTeachers, 
  verifyTeacherLogin 
} from "../controllers/teacherSigninController.js";

const router = express.Router();

// Route to create a new teacher
router.post('/teachers', createTeacher);

// Route to get all teachers
router.get('/teachers', getAllTeachers);

// Route to verify teacher login
router.post('/teachers/login', verifyTeacherLogin);

export default router;
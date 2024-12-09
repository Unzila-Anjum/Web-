// import express from "express";
// import {config} from 'dotenv';
// import cors from "cors";
// const __dirname = path.dirname(fileURLToPath(import.meta.url));
// const uploadsPath = path.join(__dirname, '..', 'uploads');

// // Create uploads directory if it doesn't exist
// import fs from 'fs';
// if (!fs.existsSync(uploadsPath)){
//   fs.mkdirSync(uploadsPath);
// }

// import path from "path";
// import { fileURLToPath } from "url";
// import {dbConnection} from "./database/dbConnection.js";
// import studentRouter from "./router/studentRouter.js";
// import teacherRouter from "./router/teacherRouter.js";
// import assignmentRouter from "./router/assignmentRouter2.js";
// import axios from 'axios';
// import announcementRouter from "./router/announcementRouter.js";
// import classRouter from "./router/classRouter.js";
// import libraryRouter from "./router/libraryRouter.js";
// import eventsRouter from "./router/eventsRouter.js";
// import examRouter from "./router/examRouter.js";
// import attendanceRouter from "./router/attendanceRouter2.js";

// import usersRouter from "./router/usersRouter.js"
// import adminRegisterRouter from "./router/adminRegisterRouter.js"
// import  { errorHandler } from "./middlewares/errorHandler.js";
// import registrationRoutes from "./router/cRegistrationRoutes.js";
// import feedbackRoutes from './router/feedbackRoutes.js';
// import studentLoginRouter from "./router/studentLoginRouter.js";
// import teacherLoginRouter from "./router/teacherLoginRouter.js";
// import studentProfileRouter from "./router/studentProfileRouter.js";
// import cRegistration from "./router/cRegistrationRoutes.js"
// import coRegistration from "./router/coRegistrationRoutes.js"
// import courseRouter from "./router/courseRouter.js"
// import timetableRoutes from "./router/timetableRoutes.js"
// import studentTimetableRouter from "./router/studentTimetableRouter.js"
// import teachertimetableRouter from "./router/teachertimetableRouter.js"
// import gradeRouter from "./router/gradeRouter.js"
// import smsRouter from './router/smsRouter.js';
// import VideoLectureRouter from './router/VideoLectureRouter.js';
// import pastPapersRouter from './router/pastPapersRouter.js';

// const app = express();
// config({path: "./config/config.env"});
 
// app.use( 
//     cors({
//         origin: [process.env.FRONTEND_URL],
//         methods: ["GET", "POST", "PUT", "DELETE"], 
    
//     }) 
// );

// app.use((err, req, res, next) => {
//     errorHandler(err, req, res, next);
//   });
 
// app.use(express.json());
// app.use(express.urlencoded({extended: true}));

// app.use("/api/v1/admin/students", studentRouter);
// app.use("/api/v1/teachers", teacherRouter);
// app.use("/api/v1/assignments", assignmentRouter);

// app.use("/api/v1/announcements", announcementRouter);
// app.use("/api/v1/class", classRouter);
// app.use("/api/v1/library", libraryRouter);
// app.use("/api/v1/events", eventsRouter);
// app.use("/api/v1/exam", examRouter);
// app.use("/api/v1/attendance", attendanceRouter);
// //app.use("/api/v1/Attendance", studentAttendanceRouter);

// app.use("/api/v1/users", usersRouter);

// app.use("/api/v1/registration", registrationRoutes);


// app.use('/api/feedbacks', feedbackRoutes);

// app.use("/api/auth/students", studentLoginRouter);
// app.use("/api/v1/students/profile", studentProfileRouter);


// app.use("/api/v1/register", adminRegisterRouter);
// app.use("/api/v1/signin", adminRegisterRouter);

// app.use("/api/v1/courses", cRegistration);
// app.use("/api/v1/course", coRegistration);
// app.use("/api/auth/teacher", teacherLoginRouter);
// app.use("/api/v1/cours", courseRouter);


// app.use("/api/v1/timetable", timetableRoutes);
// app.use("/api/v1/timetable/student", studentTimetableRouter);

// app.use("/api/v1/grade", gradeRouter);

// app.use("api/v1/timetables",teachertimetableRouter);

// app.use("api/v1/upload",VideoLectureRouter);
// app.use("api/v1/pastpapers",pastPapersRouter);


// app.use('/uploads', express.static('uploads'));


// //app.use('/api/send-sms', smsRouter);
// const apiKey = process.env.SINCH_API_KEY;

// app.post('/send-sms', async (req, res) => {
//     const {  } = req.body;
  
//     try {
//       const response = await axios.post(
//         'https://sms.api.sinch.com/xms/v1/8c80e738e84d4b6eaeed44d500b70373/batches',
//         {
//           from: '+447418629185',
//           to: ['+923008055552'],
//           body: 'rescheduled class at 1:30 pm in C404'
          
//         },
//         {
//             headers: {
//               Authorization: 'Bearer 3b545381fb844fc29f4d93d8c3065521', // Replace with your actual API key
//               'Content-Type': 'application/json',
//             },}
//       );
      
//       res.status(200).json({ success: true, message: 'SMS sent successfully!' });
//     } catch (error) {
//       console.error('Error sending SMS:', error);
//       res.status(500).json({ success: false, message: 'Failed to send SMS' });
//     }
//   }); 
// dbConnection()
 
// export default app;







import express from "express";
import {config} from 'dotenv';
import cors from 'cors';
import {dbConnection} from "./database/dbConnection.js";
import studentRouter from "./router/studentRouter.js";
import teacherSignInRouter from "./router/teacherSignInRouter.js";
import assignmentRouter from "./router/assignmentRouter2.js";
import axios from 'axios';
import announcementRouter from "./router/announcementRouter.js";

import classRouter from "./router/classRouter.js";
import libraryRouter from "./router/libraryRouter.js";
import eventsRouter from "./router/eventsRouter.js";
import examRouter from "./router/examRouter.js";
import attendanceRouter from "./router/attendanceRouter2.js";
import attendanceRouterAd from "./router/attendanceRouterAd.js";
import usersRouter from "./router/usersRouter.js"
import adminRegisterRouter from "./router/adminRegisterRouter.js"
import  { errorHandler } from "./middlewares/errorHandler.js";
import registrationRoutes from "./router/cRegistrationRoutes.js";
import feedbackRoutes from './router/feedbackRoutes.js';
import studentLoginRouter from "./router/studentLoginRouter.js";
import teacherLoginRouter from "./router/teacherLoginRouter.js";
import studentProfileRouter from "./router/studentProfileRouter.js";
import cRegistration from "./router/cRegistrationRoutes.js"
import coRegistration from "./router/coRegistrationRoutes.js"
import courseRouter from "./router/courseRouter.js"
import timetableRoutes from "./router/timetableRoutes.js"
import studentTimetableRouter from "./router/studentTimetableRouter.js"
import teachertimetableRouter from "./router/teachertimetableRouter.js"
import gradeRouter from "./router/gradeRouter.js"
import adminTeacherRouter from "./router/adminTeacherRouter.js"
import smsRouter from './router/smsRouter.js';
import VideoLectureRouter from './router/VideoLectureRouter.js';
import pastPapersRouter from './router/pastPapersRouter.js';
import dotenv from 'dotenv';

import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
config({path: "./config/config.env"});
 
/* app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"], // Add PATCH here
  })
); */
app.use(cors()); // This allows requests from any origin

app.use((err, req, res, next) => {
    errorHandler(err, req, res, next);
  });
 
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use("/api/v1/admin/students", studentRouter);
app.use("/api/v1/teachers", teacherSignInRouter);
app.use("/api/v1/admin/teachers", adminTeacherRouter);
app.use("/api/v1/assignments", assignmentRouter);

app.use("/api/v1/announcements", announcementRouter);
app.use("/api/v1/class", classRouter);
app.use("/api/v1/library", libraryRouter);
app.use("/api/v1/events", eventsRouter);
app.use("/api/v1/exam", examRouter);
app.use("/api/v1/attendance", attendanceRouter);
//app.use("/api/v1/Attendance", studentAttendanceRouter);

app.use("/api/v1/users", usersRouter);

app.use("/api/v1/registration", registrationRoutes);


app.use('/api/feedbacks', feedbackRoutes);

app.use("/api/auth/students", studentLoginRouter);
app.use("/api/v1/students/profile", studentProfileRouter);

app.use("/api/v1/admin/attendance",attendanceRouterAd);
app.use("/api/v1/register", adminRegisterRouter);
app.use("/api/v1/signin", adminRegisterRouter);

app.use("/api/v1/courses", cRegistration);
app.use("/api/v1/course", coRegistration);
app.use("/api/auth/teacher", teacherLoginRouter);
app.use("/api/v1/cours", courseRouter);


app.use("/api/v1/timetable", timetableRoutes);
app.use("/api/v1/timetable/student", studentTimetableRouter);

app.use("/api/v1/grade", gradeRouter);

app.use("api/v1/timetables",teachertimetableRouter);

app.use("api/v1/videolectures",VideoLectureRouter);
app.use("/api/v1/pastpapers", pastPapersRouter); // Added past papers route


//app.use('/api/send-sms', smsRouter);
const apiKey = process.env.SINCH_API_KEY;

app.post('/send-sms', async (req, res) => {
    const {  } = req.body;
  
    try {
      const response = await axios.post(
        'https://sms.api.sinch.com/xms/v1/8c80e738e84d4b6eaeed44d500b70373/batches',
        {
          from: '+447418629185',
          to: ['+923008055552'],
          body: 'rescheduled class at 1:30 pm in C404'
          
        },
        {
            headers: {
              Authorization: 'Bearer 3b545381fb844fc29f4d93d8c3065521', // Replace with your actual API key
              'Content-Type': 'application/json',
            },}
      );
      
      res.status(200).json({ success: true, message: 'SMS sent successfully!' });
    } catch (error) {
      console.error('Error sending SMS:', error);
      res.status(500).json({ success: false, message: 'Failed to send SMS' });
    }
  }); 

  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const uploadsPath = path.join(__dirname, '..', 'uploads');
  app.use('/uploads', express.static('uploads'));


  // Create uploads directory if it doesn't exist
  import fs from 'fs';
  if (!fs.existsSync(uploadsPath)){
    fs.mkdirSync(uploadsPath);
  }

dbConnection()
 
export default app;

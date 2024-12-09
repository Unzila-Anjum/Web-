import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../src/components/Home.jsx';
import ChooseUser from '../src/components/ChooseUser';
import AdminSignIn from '../src/components/AdminSignIn';
import AdminRegister from '../src/components/AdminRegister';


import  SendSms  from './components/SendSms.jsx';


import StudentProfile from '../src/pages/Students/Profile.jsx';
import TeacherSignIn from '../src/components/TeacherSignIn.jsx';
import AdminDashboard from '../src/pages/Admin/Dashboard';
import StudentDashboard from '../src/pages/Students/Dashboard';
import TeacherDashboard from '../src/pages/Teachers/Dashboard';
import CourseRegistration from "../src/pages/Students/CourseReg.jsx";
import StudentPanel from "./components/StudentFeedback.jsx";
import TeacherPanel from "./components/TeacherFeedback.jsx";

import Classes from '../src/pages/Admin/Classes2';
import Exam from '../src/pages/Admin/Exam';
import Attendance from '../src/pages/Admin/Attendance';
import Performance from '../src/pages/Admin/Performance';
import Teachers from '../src/pages/Admin/Teachers';
import Students from '../src/pages/Admin/Students';
import Assignments from '../src/pages/Admin/Assignments';
import Course2 from '../src/pages/Admin/Classes2.jsx';
import EventCalender from '../src/pages/Admin/EventCalender';
import SettingsProfile from '../src/pages/Admin/SettingsProfile';
import Announcement from '../src/pages/Admin/Announcement';
import Timetable from '../src/pages/Admin/Timetable.jsx';
import TimetableT from '../src/pages/Teachers/Timetable.jsx';

import StudentAssignments from '../src/pages/Students/Assignments';
import ExamSection from '../src/pages/Students/Exams';
import PerformanceSection from '../src/pages/Students/Performance';

import LibrarySection from '../src/pages/Students/Library';
import AnnouncementSection from '../src/pages/Students/Announcement';
import ProfileSection from '../src/pages/Students/Profile';

import ClassSection from '../src/pages/Teachers/Classes';
import StudentSection from '../src/pages/Teachers/Students';
import TeacherSection from '../src/pages/Teachers/Teachers';
import CheckPerformanceSection from '../src/pages/Teachers/Performance';
import EventSection from '../src/pages/Teachers/Events';
import TeacherProfileSection from '../src/pages/Teachers/TeacherProfile';
import CheckAnnouncementSection from '../src/pages/Teachers/Announcement';

import CheckExamSection from '../src/pages/Teachers/Exams';
import Grading from '../src/pages/Teachers/Grading.jsx';
import StudentSignIn from './components/StudentSignIn.jsx';
import Attendance2 from '../src/pages/Teachers/Attendance';
import Timetable2 from '../src/pages/Students/Timetable.jsx';
import Assignment2 from '../src/pages/Teachers/assignments2.jsx';
import AttendanceS from '../src/pages/Students/Attendance';
import VideoLecture from '../src/pages/Teachers/VideoLectures.jsx';
import Pastpaper from '../src/pages/Teachers/PastPapers.jsx';
import Marks from '../src/pages/Students/Marks.jsx';
const App = () => { 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/choose-user" element={<ChooseUser />} />

        {/* All the sign-in pages/routes */}

       
        <Route exact path="/admin-signIn" element={<AdminSignIn />} />
        <Route exact path="/admin-register" element={<AdminRegister/>} />
       
        <Route exact path="/student-signIn" element={<StudentSignIn />} />
        <Route exact path="/teacher-signIn" element={<TeacherSignIn />} />

        {/* All the dashboard routes */}

        <Route exact path="/admin/dashboard" element={<AdminDashboard />} />
        <Route exact path="/teacher/dashboard" element={<TeacherDashboard />} />        
        <Route exact path="/student/dashboard" element={<StudentDashboard />} />
        
        {/* Admin section here */}

        <Route exact path="/admin/classes" element={<Classes />} />
        <Route exact path="/admin/exams" element={<Exam />} />
        <Route exact path="/admin/attendance" element={<Attendance />} />
        <Route exact path="/admin/performance" element={<Performance />} />
        <Route exact path="/admin/teachers" element={<Teachers />} />
        <Route exact path="/admin/students" element={<Students />} />
        <Route exact path="/admin/assignments" element={<Assignments />} />
        <Route exact path="/admin/course" element={<Course2 />} />
        <Route exact path="/admin/communication" element={<Announcement />} />
        <Route exact path="/admin/events" element={<EventCalender />} />
        <Route exact path="/admin/settings" element={<SettingsProfile />} />
        <Route exact path="/admin/timetable" element={<Timetable />} />
        <Route exact path="/send-sms" element={<SendSms/>} />

        {/* Students sections here  */}

        <Route exact path="/student/assignments" element={<StudentAssignments />} />
        <Route exact path="/student/exams" element={<ExamSection />} />
        <Route exact path="/student/performance" element={<PerformanceSection />} />
        <Route exact path="/student/attendance" element={<AttendanceS />} />
        <Route exact path="/student/library" element={<LibrarySection />} />
        <Route exact path="/student/communication" element={<AnnouncementSection/>} />
        <Route exact path="/student/settings" element={<StudentProfile />} />
        <Route path="/student/course" element={<CourseRegistration />} />
        <Route path="/student/feedback" element={<StudentPanel />} />
        <Route path="/student/timetable" element={<Timetable2/>} />
        <Route path="/student/marks" element={<Marks/>} />
       

        {/* Teachers sections here */}
        <Route exact path="/teacher/classes" element={<ClassSection />} />
        <Route exact path="/teacher/students" element={<StudentSection />} />
        <Route exact path="/teacher/teachers" element={<TeacherSection />} />
        <Route exact path="/teacher/assignments" element={<Assignment2 />} />
        <Route exact path="/teacher/exams" element={<CheckExamSection />} />
        <Route exact path="/teacher/performance" element={<CheckPerformanceSection />} />
        <Route exact path="/teacher/attendance" element={<Attendance2 />} />
        <Route exact path="/teacher/communication" element={<CheckAnnouncementSection />} />
        <Route exact path="/teacher/events" element={<EventSection />} />
        <Route exact path="/teacher/settings" element={<TeacherProfileSection/>} />
        <Route path="/teacher/feedback" element={<TeacherPanel />} />
        <Route path="/teacher/grade" element={<Grading />} />
        <Route path="/teacher/timetable" element={<TimetableT />} />
        <Route path="/teacher/video" element={<VideoLecture/>} />
        <Route path="/teacher/pastpaper" element={<Pastpaper/>} />

      </Routes>
    </Router>
  );
};

export default App;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import {
  AttendanceContainer,
  Content,
  AttendanceContent,
  AttendanceHeader,
  AttendanceList,
  AttendanceItem,
  ErrorMessage,
  LoadingMessage,
} from '../../styles/SAttendanceStyles';
import { SidebarContainer } from '../../styles/AnnouncementStyles';

const StudentAttendance = () => {
  const hardcodedStudentId = '67512d9755146733de38e2f9'; // Replace with the actual ObjectId
  const [studentAttendance, setStudentAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        // Fetch attendance records for the hardcoded student
        const { data } = await axios.get(`http://localhost:4000/api/v1/attendance/${hardcodedStudentId}`);

        if (data.success) {
          setStudentAttendance(data.attendance);
        } else {
          setStudentAttendance([]);
        }

        setError(null);
      } catch (err) {
        setError('Failed to fetch attendance records. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  
  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  return (
    <AttendanceContainer>
      <SidebarContainer>
        <Sidebar></Sidebar>
      </SidebarContainer>
      <Content>
        <AttendanceContent>
          <AttendanceHeader>Attendance Records for Student</AttendanceHeader>
          {studentAttendance.length > 0 ? (
            <AttendanceList>
              {studentAttendance.map((record) => (
                <AttendanceItem key={record._id}>
                  <strong>Date:</strong> {new Date(record.date).toLocaleDateString()} <br />
                  <strong>Status:</strong> {record.status} <br />
                </AttendanceItem>
              ))}
            </AttendanceList>
          ) : (
            <div>No attendance records found for the student.</div>
          )}
        </AttendanceContent>
      </Content>
    </AttendanceContainer>
  );
};

export default StudentAttendance;

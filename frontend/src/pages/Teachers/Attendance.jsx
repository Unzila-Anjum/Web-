import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

import {
    StudentsContainer,
    SidebarContainer,
    Content,
    StudentsContent,
    StudentsHeader,
    Table,
    TableHeader,
    TableRow,
    TableCell,
    Input,
    SaveAttendanceButton,
    ErrorText
} from '../../styles/AttendanceStyles2';

function Attendance() {
  const [students, setStudents] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Fetch student data and existing attendance based on selected date
  useEffect(() => {
    const fetchStudentsAndAttendance = async () => {
      try {
        // Fetch students
        const studentsResponse = await axios.get("http://localhost:4000/api/v1/admin/students/students");
        
        if (studentsResponse.data && studentsResponse.data.students && Array.isArray(studentsResponse.data.students)) {
          setStudents(studentsResponse.data.students);
          
          // Fetch existing attendance records for the selected date
          const attendanceResponse = await axios.get(`http://localhost:4000/api/v1/attendance/date?date=${selectedDate}`);
          
          // Create a map of existing attendance by student ID
          const existingAttendanceMap = attendanceResponse.data.attendance.reduce((acc, record) => {
            acc[record.studentId._id] = record;
            return acc;
          }, {});

          // Initialize attendance records with student information
          const initialAttendance = studentsResponse.data.students.map(student => {
            const existingStudentAttendance = existingAttendanceMap[student._id] || {};
            
            return {
              studentId: student._id,
              name: student.name,
              registrationNumber: student.registrationNumber,
              status: existingStudentAttendance.status || '', // Default to empty string
              date: selectedDate, // Use selected date
            };
          });

          setAttendanceRecords(initialAttendance);
        } else {
          console.error("Unexpected API response format:", studentsResponse.data);
          setStudents([]);
        }
      } catch (error) {
        console.error("Error fetching students or attendance:", error);
        setError('Failed to fetch students or attendance');
      }
    };

    fetchStudentsAndAttendance();
  }, [selectedDate]);

  // Handle change in attendance status
  const handleAttendanceChange = (studentId, value) => {
    // Validate status input
    const sanitizedValue = value.trim();
    
    setAttendanceRecords(prevRecords => 
      prevRecords.map(record => 
        record.studentId === studentId 
          ? { 
              ...record, 
              status: sanitizedValue 
            } 
          : record
      )
    );
  };

  // Save attendance records
  const saveAttendance = async () => {
    setError(null);

    // Validate that all students have a valid status
    const invalidStatusRecords = attendanceRecords.filter(record => {
      const status = record.status.toLowerCase();
      return status !== 'present' && status !== 'absent';
    });

    if (invalidStatusRecords.length > 0) {
      setError('Please enter either "Present" or "Absent" for all students');
      return;
    }

    try {
      const payload = attendanceRecords.map(({ studentId, status, date }) => ({
        studentId,
        status: status.charAt(0).toUpperCase() + status.slice(1).toLowerCase(), // Capitalize first letter
        date
      }));

      await axios.post('http://localhost:4000/api/v1/attendance/records', { 
        attendanceRecords: payload 
      });
      alert('Attendance saved successfully!');
    } catch (error) {
      console.error('Error saving attendance:', error);
      setError('Failed to save attendance');
    }
  };

  // Handle date change and refetch attendance
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <StudentsContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <Content>
        <StudentsContent>
          <StudentsHeader>Student Attendance</StudentsHeader>
          {/* Date Selection */}
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="attendance-date">Select Date: </label>
            <Input
              id="attendance-date"
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </div>

          {error && <ErrorText>{error}</ErrorText>}

          <Table>
            <thead>
              <TableRow>
                <TableHeader>Registration Number</TableHeader>
                <TableHeader>Student Name</TableHeader>
                <TableHeader>Attendance Status</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {attendanceRecords.map(record => (
                <TableRow key={record.studentId}>
                  <TableCell>{record.registrationNumber}</TableCell>
                  <TableCell>{record.name}</TableCell>
                  <TableCell>
                    <Input
                      type="text"
                      value={record.status}
                      onChange={(e) => handleAttendanceChange(record.studentId, e.target.value)}
                      placeholder="Enter Present/Absent"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>

          <SaveAttendanceButton onClick={saveAttendance}>Save Attendance</SaveAttendanceButton>
        </StudentsContent>
      </Content>
    </StudentsContainer>
  );
}

export default Attendance;
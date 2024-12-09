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
  SaveAttendanceButton,
  ErrorText,
  Modal,
  ModalContent,
  CloseButton,
  ModalHeader,
  AttendanceReportTable
} from '../../styles/AdminAttendanceStyles';

function Attendance() {
  const [students, setStudents] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [attendanceReport, setAttendanceReport] = useState([]);

  // Fetch student data and initialize attendance records
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        // Fetch students
        const studentsResponse = await axios.get("http://localhost:4000/api/v1/admin/students/students");

        if (studentsResponse.data && studentsResponse.data.students && Array.isArray(studentsResponse.data.students)) {
          setStudents(studentsResponse.data.students);

          // Initialize attendance records with hardcoded data based on selected date
          const initialAttendance = studentsResponse.data.students.map(student => {
            return {
              studentId: student._id,
              name: student.name,
              registrationNumber: student.registrationNumber,
              status: '', // Default to empty string
              date: selectedDate, // Use selected date
            };
          });

          setAttendanceRecords(initialAttendance);
        } else {
          console.error("Unexpected API response format:", studentsResponse.data);
          setStudents([]);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
        setError('Failed to fetch students');
      }
    };

    fetchStudents();
  }, [selectedDate]);

  // Handle change in attendance status
  const handleAttendanceChange = (studentId, value) => {
    setError(null); // Clear error if valid input
    setAttendanceRecords(prevRecords => 
      prevRecords.map(record => 
        record.studentId === studentId 
          ? { 
              ...record, 
              status: value.charAt(0).toUpperCase() + value.slice(1) // Capitalize first letter
            } 
          : record
      )
    );
  };

  // Save attendance records
  const saveAttendance = async () => {
    setError(null);

    // Validate that all students have a valid status
    const invalidStatusRecords = attendanceRecords.filter(record => !['Present', 'Absent', 'Late'].includes(record.status));

    if (invalidStatusRecords.length > 0) {
      setError('Please enter either "Present", "Absent", or "Late" for all students');
      return;
    }

    try {
      const payload = attendanceRecords.map(({ studentId, status, date }) => ({
        studentId,
        status,
        date
      }));

      await axios.post('http://localhost:4000/api/v1/admin/attendance/records', { 
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

  const openAttendanceReportModal = (studentId) => {
    // Find the student name
    const student = students.find(student => student._id === studentId);
    const studentName = student ? student.name : 'Unknown Student';

    // Generate hardcoded attendance data based on selected date
    const hardcodedReport = [
      { date: '2024-12-01', status: 'Present' },
      { date: '2024-12-02', status: 'Absent' },
      { date: '2024-12-03', status: 'Late' },
      { date: '2024-12-04', status: 'Present' },
      { date: '2024-12-05', status: 'Absent' },
      { date: '2024-12-06', status: 'Present' },
      { date: '2024-12-07', status: 'Present' },
      { date: '2024-12-08', status: 'Present' },
      { date: '2024-12-09', status: 'Late' },
      // More hardcoded dates
    ].filter(record => new Date(record.date) <= new Date(selectedDate)); // Filter by selected date

    setAttendanceReport(hardcodedReport);
    setSelectedStudent(studentName);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
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
            <input
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
                  <TableCell>
                    <span 
                      style={{ cursor: 'pointer', color: 'blue' }}
                      onClick={() => openAttendanceReportModal(record.studentId)}
                    >
                      {record.name}
                    </span>
                  </TableCell>
                  <TableCell>
                    <input
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

      {/* Modal for Attendance Report */}
      {isModalOpen && (
        <Modal>
          <ModalContent>
            <ModalHeader>Attendance Report for Student {selectedStudent}</ModalHeader>
            <AttendanceReportTable>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {attendanceReport.map((record, index) => (
                  <tr key={index}>
                    <td>{record.date}</td>
                    <td>{record.status}</td>
                  </tr>
                ))}
              </tbody>
            </AttendanceReportTable>
            <CloseButton onClick={closeModal}>Close</CloseButton>
          </ModalContent>
        </Modal>
      )}
    </StudentsContainer>
  );
}

export default Attendance;

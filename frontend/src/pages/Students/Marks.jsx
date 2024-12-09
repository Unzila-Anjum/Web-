import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import {
  GradesContainer,
  SidebarContainer,
  Content,
  GradesContent,
  GradesHeader,
  SearchInput,
  Table,
  TableHeader,
  TableRow,
  TableData,
  LoadingMessage,
  ErrorMessage
} from '../../styles/GradeStyles';

const Grades = () => {
  const [grades, setGrades] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGrades();
  }, []);

  const fetchGrades = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/grade/s");
      if (response.data.success) {
        setGrades(response.data.grades);
      } else {
        setError(response.data.message || "Failed to fetch grades");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const filteredGrades = grades.filter((grade) =>
    grade.studentId?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    grade.studentId?.registrationNumber?.toLowerCase().includes(searchQuery.toLowerCase())
  );

 

  if (error) {
    return <ErrorMessage>Error: {error}</ErrorMessage>;
  }

  return (
    <GradesContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <Content>
        <GradesContent>
          <GradesHeader>Student Grades</GradesHeader>
          <div style={{ marginBottom: '1rem' }}>
            <SearchInput
              type="text"
              placeholder="Search by name or registration number"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Table>
            <thead>
              <TableRow>
                <TableHeader>Student Name</TableHeader>
                <TableHeader>Registration Number</TableHeader>
                <TableHeader>Assignments</TableHeader>
                <TableHeader>Quizzes</TableHeader>
                <TableHeader>Exams</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {filteredGrades.length > 0 ? (
                filteredGrades.map((grade) => (
                  <TableRow key={grade._id}>
                    <TableData>{grade.studentId?.name || "N/A"}</TableData>
                    <TableData>{grade.studentId?.registrationNumber || "N/A"}</TableData>
                    <TableData>
                      {grade.assignments.length > 0
                        ? grade.assignments.join(", ")
                        : "No Assignments"}
                    </TableData>
                    <TableData>
                      {grade.quizzes.length > 0 
                        ? grade.quizzes.join(", ") 
                        : "No Quizzes"}
                    </TableData>
                    <TableData>
                      {grade.exams.length > 0 
                        ? grade.exams.join(", ") 
                        : "No Exams"}
                    </TableData>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableData colSpan="5" style={{ textAlign: 'center' }}>
                    No grades found.
                  </TableData>
                </TableRow>
              )}
            </tbody>
          </Table>
        </GradesContent>
      </Content>
    </GradesContainer>
  );
};

export default Grades;
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import {
  StudentsContainer,
  SidebarContainer,
  Content,
  StudentsContent,
  StudentsHeader,
  SearchInput,
  Table,
  TableHeader,
  TableRow,
  TableData,
} from '../../styles/StudentsStyles3';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/admin/students/students');
      setStudents(response.data.students || []);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <StudentsContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <Content>
        <StudentsContent>
          <StudentsHeader>Students</StudentsHeader>
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
                <TableHeader>Name</TableHeader>
                <TableHeader>Registration Number</TableHeader>
                <TableHeader>Department</TableHeader>
                <TableHeader>Email</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <TableRow key={student._id}>
                  <TableData>{student.name}</TableData>
                  <TableData>{student.registrationNumber}</TableData>
                  <TableData>{student.department}</TableData>
                  <TableData>{student.email}</TableData>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </StudentsContent>
      </Content>
    </StudentsContainer>
  );
};

export default Students;

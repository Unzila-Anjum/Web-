import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import {
  StudentsContainer,
  Content,
  StudentsContent,
  StudentsHeader,
  AddStudentInput,
  AddStudentButton,
  Table,
  TableHeader,
  TableRow,
  TableData,
  SearchInput,
  ModalContainer,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
} from '../../styles/AdminStudentsStyles';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: '',
    registrationNumber: '',
    department: '',
    email: '',
    dateOfBirth: '',
    gender: 'Male', // default gender
    address: '', // new field
    semester: '',
    batch: '',
  });
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [formError, setFormError] = useState('');

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

  const handleAddStudent = async (e) => {
    e.preventDefault();
    setFormError(''); // Reset error message on submit

    const trimmedStudent = {
      ...newStudent,
      name: newStudent.name.trim(),
      registrationNumber: newStudent.registrationNumber.trim(),
      department: newStudent.department.trim(),
      email: newStudent.email.trim(),
      dateOfBirth: newStudent.dateOfBirth.trim(),
      semester: newStudent.semester,
      batch: newStudent.batch.trim(),
      address: newStudent.address.trim(),
    };

    if (
      !trimmedStudent.name ||
      !trimmedStudent.registrationNumber ||
      !trimmedStudent.department ||
      !trimmedStudent.email ||
      !trimmedStudent.dateOfBirth ||
      !trimmedStudent.semester ||
      !trimmedStudent.batch ||
      !trimmedStudent.gender ||
      !trimmedStudent.address
    ) {
      setFormError('Please fill all required fields');
      return;
    }

    const semesterNumber = parseInt(trimmedStudent.semester, 10);
    if (isNaN(semesterNumber) || semesterNumber < 1 || semesterNumber > 8) {
      setFormError('Semester must be between 1 and 8');
      return;
    }

    try {
      let response;
      if (editingStudentId) {
        response = await axios.put(
          `http://localhost:4000/api/v1/admin/students/students/${editingStudentId}`,
          { ...trimmedStudent, semester: semesterNumber },
          { headers: { 'Content-Type': 'application/json' } }
        );
      } else {
        response = await axios.post(
          'http://localhost:4000/api/v1/admin/students/students',
          { ...trimmedStudent, semester: semesterNumber },
          { headers: { 'Content-Type': 'application/json' } }
        );
      }

      if (response.data?.student) {
        if (editingStudentId) {
          setStudents((prev) =>
            prev.map((student) =>
              student._id === editingStudentId ? response.data.student : student
            )
          );
        } else {
          setStudents((prev) => [...prev, response.data.student]);
        }
      }

      resetForm();
    } catch (error) {
      console.error('Error adding/updating student:', error.response?.data || error.message);
    }
  };

  const handleEditStudent = (studentId) => {
    const studentToEdit = students.find((student) => student._id === studentId);
    setNewStudent({
      name: studentToEdit.name,
      registrationNumber: studentToEdit.registrationNumber,
      department: studentToEdit.department,
      email: studentToEdit.email,
      dateOfBirth: studentToEdit.dateOfBirth,
      gender: studentToEdit.gender,
      address: studentToEdit.address,
      semester: studentToEdit.semester,
      batch: studentToEdit.batch,
    });
    setEditingStudentId(studentId);
    setModalOpen(true);
  };

  const handleDeleteStudent = async (studentId) => {
    const confirmation = window.confirm('Are you sure you want to delete this student?');
    if (confirmation) {
      try {
        const response = await axios.delete(`http://localhost:4000/api/v1/admin/students/students/${studentId}`);
        if (response.data?.message === 'Student deleted successfully') {
          setStudents(students.filter((student) => student._id !== studentId));
        }
      } catch (error) {
        console.error('Error deleting student:', error.response?.data || error.message);
      }
    }
  };

  const resetForm = () => {
    setNewStudent({
      name: '',
      registrationNumber: '',
      department: '',
      email: '',
      dateOfBirth: '',
      gender: 'Male',
      address: '',
      semester: '',
      batch: '',
    });
    setEditingStudentId(null);
    setModalOpen(false);
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <StudentsContainer>
      <Sidebar />
      <Content>
        <StudentsContent>
          <StudentsHeader>Student Management</StudentsHeader>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <SearchInput
              type="text"
              placeholder="Search by name or registration number"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <AddStudentButton onClick={() => setModalOpen(true)}>Add Student</AddStudentButton>
          </div>
          <Table>
            <thead>
              <TableRow>
                <TableHeader>Name</TableHeader>
                <TableHeader>Registration Number</TableHeader>
                <TableHeader>Department</TableHeader>
                <TableHeader>Email</TableHeader>
                <TableHeader>Actions</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <TableRow key={student._id}>
                  <TableData>{student.name}</TableData>
                  <TableData>{student.registrationNumber}</TableData>
                  <TableData>{student.department}</TableData>
                  <TableData>{student.email}</TableData>
                  <TableData>
                    <button onClick={() => handleEditStudent(student._id)}>Edit</button>
                    <button onClick={() => handleDeleteStudent(student._id)}>Delete</button>
                  </TableData>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </StudentsContent>
      </Content>

      {isModalOpen && (
        <ModalContainer>
          <ModalContent>
            <ModalHeader>
              <h2>{editingStudentId ? 'Edit Student' : 'Add Student'}</h2>
              <ModalCloseButton onClick={resetForm}>&times;</ModalCloseButton>
            </ModalHeader>
            <form onSubmit={handleAddStudent}>
              <AddStudentInput
                type="text"
                placeholder="Name"
                value={newStudent.name}
                onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
              />
              <AddStudentInput
                type="text"
                placeholder="Registration Number"
                value={newStudent.registrationNumber}
                onChange={(e) => setNewStudent({ ...newStudent, registrationNumber: e.target.value })}
              />
              <div>
                <label>Department</label>
                <select
                  value={newStudent.department}
                  onChange={(e) => setNewStudent({ ...newStudent, department: e.target.value })}
                >
                  <option value="">-- Select Department --</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Software Engineering">Software Engineering</option>
                  <option value="Artificial Intelligence ">Artificial Intelligence</option>
                  <option value="Cyber Security">Cyber Security</option>
                  <option value="Data Science">Data Science</option>
                  <option value="BBA">BBA</option>
                  <option value="ANF">Accounting and finance</option>
                  <option value="bsBa">Bs BA</option>
                </select>
              </div>
              <AddStudentInput
                type="email"
                placeholder="Email"
                value={newStudent.email}
                onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
              />
              <AddStudentInput
                type="date"
                placeholder="Date of Birth"
                value={newStudent.dateOfBirth || ''}
                onChange={(e) => setNewStudent({ ...newStudent, dateOfBirth: e.target.value })}
              />
              <AddStudentInput
                type="text"
                placeholder="Semester"
                value={newStudent.semester}
                onChange={(e) => setNewStudent({ ...newStudent, semester: e.target.value })}
              />
              <AddStudentInput
                type="text"
                placeholder="Batch"
                value={newStudent.batch || ''}
                onChange={(e) => setNewStudent({ ...newStudent, batch: e.target.value })}
              />
              <AddStudentInput
                type="text"
                placeholder="Address"
                value={newStudent.address}
                onChange={(e) => setNewStudent({ ...newStudent, address: e.target.value })}
              />
              <div>
                <label>Gender</label>
                <select
                  value={newStudent.gender}
                  onChange={(e) => setNewStudent({ ...newStudent, gender: e.target.value })}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              {formError && <p style={{ color: 'red' }}>{formError}</p>}
              <AddStudentButton type="submit">
                {editingStudentId ? 'Update Student' : 'Add Student'}
              </AddStudentButton>
            </form>
          </ModalContent>
        </ModalContainer>
      )}
    </StudentsContainer>
  );
};

export default Students;

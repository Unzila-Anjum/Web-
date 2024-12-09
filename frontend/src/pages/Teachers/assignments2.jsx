import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import {
  AssignmentsContainer,
  Content,
  AssignmentsContent,
  AssignmentsHeader,
  AssignmentList,
  AssignmentItem,
  AddAssignmentForm,
  AddAssignmentInput,
  AssignmentButton,
  AddAssignmentTextArea,
  AddAssignmentButton,
} from '../../styles/AssignmentsStyles2';

const AssignmentSection = () => {
  const [newAssignment, setNewAssignment] = useState({ title: '', description: '', grade: '', deadline: '' });
  const [assignments, setAssignments] = useState([]);
  const [editingAssignment, setEditingAssignment] = useState(null);

  useEffect(() => {
    fetchAssignments();
  }, []);

  // Fetch all assignments from the backend
  const fetchAssignments = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/assignments/getall');
      setAssignments(response.data.assignments);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  // Helper function to validate deadline
  const validateDeadline = (deadline) => {
    const deadlineDate = new Date(deadline);
    return deadlineDate > new Date(); // Deadline must be in the future
  };

  // Add a new assignment
  const handleAddAssignment = async (e) => {
    e.preventDefault();
    if (!validateDeadline(newAssignment.deadline)) {
      alert('Deadline must be a future date!');
      return;
    }

    if (newAssignment.title && newAssignment.description && newAssignment.grade && newAssignment.deadline) {
      try {
        const response = await axios.post('http://localhost:4000/api/v1/assignments', newAssignment);
        setAssignments([...assignments, response.data.assignment]);
        setNewAssignment({ title: '', description: '', grade: '', deadline: '' });
      } catch (error) {
        console.error('Error adding assignment:', error);
      }
    }
  };

  // Edit an existing assignment (populate form for editing)
  const handleEditAssignment = (assignment) => {
    console.log('Editing assignment:', assignment);  // Log the assignment being edited
    setEditingAssignment(assignment);
    setNewAssignment({
      title: assignment.title,
      description: assignment.description,
      grade: assignment.grade,
      deadline: assignment.deadline.split("T")[0],
    });
  };
  
  
  // Update an existing assignment
  const handleUpdateAssignment = async (e) => {
    e.preventDefault();
    if (!validateDeadline(newAssignment.deadline)) {
      alert('Deadline must be a future date!');
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:4000/api/v1/assignments/${editingAssignment._id}`,
        {
          title: newAssignment.title,
          description: newAssignment.description,
          grade: newAssignment.grade,
          deadline: newAssignment.deadline,
        }
      );

      const updatedAssignments = assignments.map((assignment) =>
        assignment._id === editingAssignment._id
          ? { ...assignment, ...newAssignment }
          : assignment
      );

      setAssignments(updatedAssignments);
      setEditingAssignment(null);
      setNewAssignment({ title: '', description: '', grade: '', deadline: '' });
      alert('Assignment updated successfully!');
    } catch (error) {
      console.error('Error updating assignment:', error.response?.data?.error || error.message);
      alert('Error updating assignment');
    }
  };

  
  // Delete an assignment
  const handleDeleteAssignment = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/assignments/${id}`);
      setAssignments(assignments.filter((assignment) => assignment._id !== id));
    } catch (error) {
      console.error('Error deleting assignment:', error);
    }
  };

  return (
    <AssignmentsContainer>
      <Sidebar />
      <Content>
        <AssignmentsContent>
          <AssignmentsHeader>Assignments</AssignmentsHeader>
          <AddAssignmentForm onSubmit={editingAssignment ? handleUpdateAssignment : handleAddAssignment}>
            <AddAssignmentInput
              type="text"
              placeholder="Enter assignment title"
              value={newAssignment.title}
              onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
            />
            <AddAssignmentTextArea
              placeholder="Enter assignment description"
              value={newAssignment.description}
              onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
            />
            <AddAssignmentInput
              type="text"
              placeholder="Enter assignment grade"
              value={newAssignment.grade}
              onChange={(e) => setNewAssignment({ ...newAssignment, grade: e.target.value })}
            />
            <AddAssignmentInput
              type="date"
              value={newAssignment.deadline}
              onChange={(e) => setNewAssignment({ ...newAssignment, deadline: e.target.value })}
            />
            <AddAssignmentButton type="submit">
              {editingAssignment ? 'Update Assignment' : 'Add Assignment'}
            </AddAssignmentButton>
          </AddAssignmentForm>
          <AssignmentList>
            {assignments.length > 0 ? (
              assignments.map((assignment) => (
                <AssignmentItem key={assignment._id}>
                  <strong>{assignment.title}: </strong>
                  {assignment.description}, {assignment.grade}, {assignment.deadline}
                  <AssignmentButton onClick={() => handleEditAssignment(assignment)}>Edit</AssignmentButton>
                  <AssignmentButton onClick={() => handleDeleteAssignment(assignment._id)}>Delete</AssignmentButton>
                </AssignmentItem>
              ))
            ) : (
              <p>No assignments available.</p>
            )}
          </AssignmentList>
        </AssignmentsContent>
      </Content>
    </AssignmentsContainer>
  );
};

export default AssignmentSection;

// AssignmentsStyles.js
import styled from 'styled-components';

export const AddAssignmentButton = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #45a049;
  }
`;

export const AssignmentsContainer = styled.div`
  display: flex;
  padding-left: 255px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    padding-left: 0;
  }
`;

export const Content = styled.div`
  flex: 1;
`;

export const AssignmentsContent = styled.div`
  padding: 20px;
`;

export const AssignmentsHeader = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const AssignmentList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const AssignmentItem = styled.li`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export const AssignmentName = styled.div`
  flex-grow: 1;
  margin-right: 20px;
`;

export const AssignmentActions = styled.div`
  display: flex;
  gap: 10px;
`;

export const AddAssignmentForm = styled.form`
  margin-bottom: 20px;
`;

export const AddAssignmentInput = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

export const AddAssignmentTextArea = styled.textarea`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  resize: vertical;
`;

export const SidebarContainer = styled.div`
  flex: 0 0 250px;
`;

export const AssignmentCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 600px;
`;

export const AssignmentTitle = styled.h3`
  margin-bottom: 10px;
`;

export const AssignmentDescription = styled.p`
  color: #555;
  margin-bottom: 15px;
`;

export const AssignmentButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 20px;
  font-size: 14px; /* Ensures text size consistency */
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100px; /* Sets a consistent width for buttons */
  height: 30px; /* Ensures buttons are the same height */

  & + & {
    margin-left: 20px; /* Space between buttons */
  }

  &:hover {
    background-color: #0056b3;
  }
`;


export const AssignmentDoneMessage = styled.p`
  color: #28a745;
  font-weight: bold;
`;


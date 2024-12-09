import styled from 'styled-components';

// Main container for the students page
export const StudentsContainer = styled.div`
  display: flex;
  height: 100vh; /* Full height of viewport */
`;

// Sidebar container style
export const SidebarContainer = styled.div`
  flex: 0 0 250px; /* Sidebar takes 250px width */
  background-color: #f4f4f4; /* Dark sidebar background */
  color: white;
  padding: 20px;
`;

// Main content area style
export const Content = styled.div`
  flex: 1; /* Remaining space goes to the content */
  overflow-y: auto;
  background-color: #f4f4f4; /* Light background for content */
  padding: 30px;
`;

// Container for the students section
export const StudentsContent = styled.div`
  margin-top: 10px;
`;

// Header style for the students page
export const StudentsHeader = styled.h1`
  font-size: 28px;
  margin-bottom: 30px;
  color: #333;
`;

// Table style for displaying students
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  margin-bottom: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

// Table header style
export const TableHeader = styled.th`
  text-align: left;
  padding: 12px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
`;

// Table row style with alternating colors
export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
  &:hover {
    background-color: #f1f1f1; /* Highlight on hover */
  }
`;

// Table cell style for data cells
export const TableCell = styled.td`
  padding: 12px;
  border: 1px solid #ccc;
  text-align: left;
`;

// Input style for attendance status field
export const Input = styled.input`
  width: 160px; /* Set width for Present/Absent field */
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

// Button to save attendance
export const SaveAttendanceButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #0056b3;
  }
  
  margin-top: 30px; /* Add margin for spacing */
`;

// Error text style for displaying validation errors
export const ErrorText = styled.div`
  color: #dc3545;
  font-weight: bold;
  margin-bottom: 15px;
`;

// Select input for dropdown options (if any)
export const Select = styled.select`
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

// Option style for dropdown items
export const Option = styled.option`
  font-size: 14px;
`;

// Modal styles for displaying detailed student attendance report
export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Dark background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  width: 450px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
  max-height: 80vh;
`;

export const ModalHeader = styled.h2`
  margin: 0;
  font-size: 20px;
  color: #333;
  font-weight: bold;
`;

export const AttendanceReportTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  font-size: 14px;
  
  th, td {
    padding: 8px;
    border: 1px solid #ddd;
    text-align: left;
  }
  
  th {
    background-color: #f1f1f1;
  }
`;

export const CloseButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 20px;
  
  &:hover {
    background-color: #0056b3;
  }
`;


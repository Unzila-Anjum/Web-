import styled from 'styled-components';

export const StudentsContainer = styled.div`
  display: flex;
  height: 100vh; /* Full height of viewport */
`;

export const SidebarContainer = styled.div`
  flex: 0 0 220px; /* Sidebar takes 250px width */
  background-color: #2c3e50; /* Dark sidebar background */
  color: white;
`;

export const Content = styled.div`
  flex: 1; /* Remaining space goes to the content */
  overflow-y: auto;
  background-color: #f4f4f4; /* Light background for content */
`;

export const StudentsContent = styled.div`
  padding: 50px;
`;

export const StudentsHeader = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
`;

export const TableHeader = styled.th`
  text-align: left;
  padding: 10px;
  background-color: #007bff;
  color: white;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

export const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ccc;
  text-align: left;
`;

export const Input = styled.input`
  width: 150px; /* Reduced width for Present/Absent field */
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const SaveAttendanceButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px; /* Added margin-top to create space */
`;

export const ErrorText = styled.div`
  color: #dc3545;
  font-weight: bold;
`;


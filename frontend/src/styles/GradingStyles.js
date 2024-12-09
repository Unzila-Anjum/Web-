import styled from 'styled-components';

// Full page container with sidebar and content
export const GradingPageContainer = styled.div`
  display: flex;
  height: 100vh;
`;

// Sidebar container
export const SidebarContainer = styled.div`
  width: 250px; /* Adjust width as needed */
  background-color: #f8f9fa;
  border-right: 1px solid #ddd;
`;

// Main content area
export const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #ffffff;
  overflow-y: auto;
`;

// Grading table
export const GradingTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  border: 1px solid #ddd; /* Ensure the table has a border */
`;

export const TableHead = styled.th`
  padding: 10px;
  background-color: #007bff;
  color: white;
  text-align: center;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #ddd; /* Adds row separation */
`;

export const TableCell = styled.td`
  padding: 8px;
  text-align: center;
  vertical-align: middle;
`;

export const Input = styled.input`
  width: 60px;
  padding: 5px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

export const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

export const ErrorText = styled.p`
  color: red;
`;

export const AddRemoveButtonContainer = styled.div`
  margin-bottom: 20px;
`;

export const AddRemoveButton = styled.button`
  background-color: #28a745;
  color: white;
  padding: 10px;
  margin-right: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #218838;
  }
`;

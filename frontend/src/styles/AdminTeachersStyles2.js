import styled from "styled-components";

// Main container for Teacher Management
export const TeacherContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-top: 50px;
  width: 100%;
`;

// Header styling
// Header styling
export const Header = styled.div`
  display: flex;
  justify-content: space-between;  // This spaces out the title and the button
  align-items: center;  // Align items vertically in the center
  width: 100%;
  padding-bottom: 20px;
  
  h1 {
    margin: 0;
    font-size: 24px;
    flex: 1;  // Ensures the title takes up the available space and is pushed to the left
    text-align: center;  // Centers the title text within the available space
  }
`;


// Button for adding teacher at the top right of the table
export const AddButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  position: absolute;
  right: 20px;  // Adjust the right margin to position the button
  top: 20px;    // Adjust the top margin to position the button
  &:hover {
    background-color: #0056b3;
  }
`;


// Styling for the search bar
export const SearchInput = styled.input`
  padding: 10px;
  margin: 20px 0;
  width: 300px;
  max-width: 100%;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 16px;
  &:focus {
    border-color: #4caf50;
    outline: none;
  }
`;

// Table and related styles with smaller size adjustments
export const Table = styled.table`
  width: 60%;  // Adjust the width to make the table smaller
  border-collapse: collapse;
  margin-top: 20px;
  font-size: 14px;  // Reduce the font size for a smaller table
`;

export const TableHeader = styled.thead`
  background-color: #f4f4f4;
  text-align: left;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
`;

export const TableData = styled.td`
  padding: 8px;  // Reduce the padding for smaller cells
  text-align: left;
`;


export const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    background-color: #007bff;
  }
`;

// Modal styling
export const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

export const ModalHeader = styled.div`
  font-size: 20px;
  margin-bottom: 10px;
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  &:focus {
    border-color: #4caf50;
    outline: none;
  }
`;

export const Select = styled.select`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;
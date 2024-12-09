import styled from 'styled-components';

// Container for the whole student management section
export const StudentsContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  background-color: #f9f9f9;
`;

// Main content area
export const Content = styled.div`
  flex: 1;
  padding: 30px;
  overflow-y: auto;
  background-color: #fafafa;
`;

// Container for the student management content
export const StudentsContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background-color: #fff;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.15);
  }
`;

// Header for the student management section
export const StudentsHeader = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
  font-weight: 600;
`;

// Input fields for forms
export const AddStudentInput = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 15px;
  outline: none;
  transition: border 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.4);
  }

  &::placeholder {
    color: #888;
  }
`;

// Button for adding/updating students
export const AddStudentButton = styled.button`
  display: inline-block;
  width: fit-content;
  padding: 12px 18px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.98);
  }
`;

// Search input
export const SearchInput = styled.input`
  flex: 1;
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-right: 15px;
  outline: none;
  transition: border 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.4);
  }

  &::placeholder {
    color: #888;
  }
`;

// Styled table
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 25px;
  font-size: 1rem;
  color: #333;
  text-align: left;
`;

// Table headers
export const TableHeader = styled.th`
  background-color: #007bff;
  color: white;
  padding: 12px;
  border: 1px solid #ddd;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 1rem;
`;

// Table rows
export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }

  &:hover {
    background-color: #f1f1f1;
  }
`;

// Table data cells
export const TableData = styled.td`
  padding: 12px;
  border: 1px solid #ddd;
  text-align: left;
`;

// Modal styles
export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;

  h2 {
    font-size: 1.5rem;
    color: #333;
    margin: 0;
  }
`;

export const ModalCloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 1.5rem;
  color: #666;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #333;
  }
`;


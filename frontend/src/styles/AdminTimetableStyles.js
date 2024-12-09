import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-top: 50px;
  width: 100%;
`;

export const Heading = styled.h1`
  text-align: center;
  color: #333;
  font-size: 1.6rem; /* Slightly smaller */
  margin-bottom: 15px;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

export const FormWrapper = styled.form`
  background-color: #fff;
  padding: 15px;
  border-radius: 6px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.08);
  margin-bottom: 15px;
  width: 50%;  

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const FormItem = styled.div`
  margin-bottom: 12px;
`;

export const Label = styled.label`
  font-size: 0.85rem;
  color: #555;
  margin-bottom: 3px;
  display: block;
  font-weight: 500;
`;

export const Input = styled.input`
  width: 100%;
  padding: 7px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.875rem;
  color: #333;
  transition: all 0.2s ease;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.1);
    outline: none;
  }
`;

export const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 8px 14px;
  font-size: 0.875rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 5px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #b0b0b0;
    cursor: not-allowed;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  font-size: 0.75rem; /* Smaller font size */
`;

export const TableHeader = styled.thead`
  background-color: #f4f4f4;
  text-align: left;
`;

export const TableCell = styled.td`
  padding: 5px 8px; /* Smaller padding */
  border: 1px solid #e9ecef;
  text-align: left;
  font-size: 0.75rem; /* Smaller font size */
  color: #495057;
`;

export const Select = styled.select`
  padding: 8px; /* Slightly smaller padding */
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px; /* Smaller font size */
  
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

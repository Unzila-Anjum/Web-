import styled from 'styled-components';

export const SingleStudentPageContainer = styled.div`
  padding: 20px;
  background-color: #f5f5f5;
`;

export const StudentTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
`;

export const TableHead = styled.th`
  padding: 10px;
  text-align: left;
`;

export const TableCell = styled.td`
  padding: 10px;
  text-align: left;
`;

export const Input = styled.input`
  padding: 5px;
  width: 50px;
  text-align: center;
`;

export const Button = styled.button`
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #45a049;
  }
`;

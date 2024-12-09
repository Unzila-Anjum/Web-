import styled from 'styled-components';

export const GradesContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

export const SidebarContainer = styled.div`
  width: 250px;
  background-color: #f5f5f5;
  color: white;
  padding: 20px;

  @media (max-width: 768px) {
    width: 200px;
  }

  @media (max-width: 480px) {
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 100;
  }
`;

export const Content = styled.div`
  flex: 1;
  padding: 20px;
  overflow-x: auto;
`;

export const GradesContent = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const GradesHeader = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 20px;
  font-size: 14px;
  background-color: #007bff;
  &:focus {
    outline: none;
    border-color: #6B4423;
    box-shadow: 0 0 0 2px rgba(107, 68, 35, 0.1);
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

export const TableHeader = styled.th`
  background-color: #f8f9fa;
  color: #333;
  padding: 12px;
  text-align: left;
  font-weight: 600;
  border-bottom: 2px solid #ddd;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const TableData = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
  color: #666;
`;

export const LoadingMessage = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 18px;
  color: #666;
`;

export const ErrorMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: #dc3545;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  margin: 20px;
`;
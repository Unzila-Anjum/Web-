import styled from 'styled-components';

export const AttendanceContainer = styled.div`
  display: flex;
  padding-left: 65px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    padding-left: 0;
  }
`;

export const Content = styled.div`
  flex: 1;
`;

export const AttendanceContent = styled.div`
  padding: 20px;
`;

export const AttendanceHeader = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const AttendanceList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const AttendanceItem = styled.li`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 10px 20px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ErrorMessage = styled.div`
  color: red;
  margin-top: 20px;
`;

export const LoadingMessage = styled.div`
  color: gray;
  margin-top: 20px;
`;

export const SidebarContainer = styled.div`
  flex: 0 0 250px;
`;

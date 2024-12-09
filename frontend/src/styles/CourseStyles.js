import styled from "styled-components";

export const Container = styled.div`
  margin: 20px;
  font-family: Arial, sans-serif;
`;

export const Header = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

export const CourseListContainer = styled.div`
  margin-bottom: 20px;
`;

export const RegisteredCoursesContainer = styled.div`
  margin-top: 20px;
`;

export const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

export const Input = styled.input`
  margin-left: 10px;
  padding: 5px;
`;

import styled from "styled-components";

export const ProfileContainer = styled.div`
  display: flex;
  height: 100vh;
`;

export const SidebarContainer = styled.div`
  width: 250px;
  background-color: #f8f9fa;
`;

export const Content = styled.div`
  width: 80%;
  padding: 20px;
  background-color: #ffffff;
`;

export const ProfileContent = styled.div`
  max-width: 600px;
  margin: 40px ;
`;

export const ProfileHeader = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

export const Form = styled.div`
  width:100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export const Message = styled.div`
  margin-bottom: 15px;
  color: ${(props) => (props.isError ? "red" : "green")};
  text-align: center;
`;

export const LoadingMessage = styled.div`
  text-align: center;
  color: #007bff;
  font-size: 18px;
`;

export const ErrorMessage = styled.div`
  text-align: center;
  color: red;
  font-size: 18px;
`;

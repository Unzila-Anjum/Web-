import styled from 'styled-components';

export const ProfileContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
`;

export const SidebarContainer = styled.div`
  width: 250px;
  background-color: #f4f4f4;
`;

export const Content = styled.div`
  flex-grow: 1;
  padding: 20px;
  background-color: #ffffff;
`;

export const ProfileHeader = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 10px;
`;

export const ProfileDetails = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 15px;
  margin-bottom: 20px;
`;

export const ProfileLabel = styled.span`
  font-weight: bold;
  color: #555;
`;

export const ProfileInfo = styled.span`
  color: #333;
`;

export const EditInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  color: #333;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0,123,255,0.2);
  }
`;

export const EditButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;
import styled from 'styled-components';

// Full page container with sidebar and content
export const PastPapersPageContainer = styled.div`
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
  flex: 1; /* Take up remaining space */
  padding: 20px;
  background-color: #ffffff;
  overflow-y: auto;
`;

// List of past papers
export const PapersList = styled.div`
  margin-top: 20px;
`;

export const Paper = styled.div`
  margin-bottom: 10px;
  a {
    color: #007bff;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

// Upload form
export const UploadForm = styled.form`
  margin-bottom: 20px;
`;

export const FileInput = styled.input`
  margin-right: 10px;
`;

export const UploadButton = styled.button`
  padding: 5px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export const ErrorText = styled.div`
  color: red;
  margin-top: 10px;
`;

export const DeleteButton = styled.button`
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #b52b3a;
  }
`;

import styled from 'styled-components';

export const FeedbackContainer = styled.div`
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

export const FeedbackContent = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const FeedbackHeader = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
`;

export const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 700;
  color: #333;
  margin-bottom: 8px;
`;

export const RatingGroup = styled.div`
  display: flex;
  gap: 20px;
  
  flex-wrap: wrap;
  margin-top: 8px;

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

export const RatingOption = styled.label`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;

  input {
    cursor: pointer;
  }

  span {
    font-size: 14px;
    color: #666;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #6B4423;
    box-shadow: 0 0 0 2px rgba(107, 68, 35, 0.1);
  }
`;

export const ActionButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: #5A381D;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const FeedbackCard = styled.div`
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f8f9fa;
`;

export const CardHeader = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
`;

export const CardContent = styled.div`
  > div {
    margin-bottom: 12px;
    color: #666;
  }

  strong {
    color: #333;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 16px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const EditButton = styled(ActionButton)`
  background-color: #007bff;

  &:hover {
    background-color: #218838;
  }
`;

export const DeleteButton = styled(ActionButton)`
  background-color: #007bff;

  &:hover {
    background-color: #c82333;
  }
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
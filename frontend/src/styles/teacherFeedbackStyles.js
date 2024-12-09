
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const FeedbackContainer = styled.div`
  display: flex;
  height: 100vh; /* Ensure it takes up the full height */
  padding-left: 240px;
`;

export const Content = styled.div`
  margin-left: ${({ isSidebarOpen }) => (isSidebarOpen ? '250px' : '80px')}; /* Adjust content based on sidebar width */
  padding: 20px;
  flex-grow: 1;
  transition: margin-left 0.3s ease; /* Smooth transition for content when sidebar opens/closes */
`;

export const FeedbackHeader = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const FeedbackForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const RatingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const RatingLabel = styled.label`
  display: flex;
  align-items: center;
  margin-right: 20px;
`;

export const RatingRadio = styled.input`
  margin-right: 10px;
`;

export const FeedbackTextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
`;

export const FeedbackButton = styled.button`
  background-color: #2c3e50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #34495e;
  }
`;

export const FeedbackCard = styled.div`
  background-color: #ecf0f1;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

export const FeedbackCardTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 10px;
`;

export const FeedbackCardContent = styled.div`
  font-size: 16px;
`;


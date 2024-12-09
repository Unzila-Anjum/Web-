import styled from 'styled-components';

// Container for the entire sign-in page
export const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(45deg, #FF69B4, #FFA07A, #90EE90); /* Gradient background */
  min-height: 100vh; /* Full height of the viewport */
`;

// Box for holding the form and other sign-in elements
export const SignInBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  max-width: 400px; /* Limit width of the sign-in box */
  padding: 20px;
  border-radius: 10px;
  background-color: #ffffff; /* White background for the box */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 50px;
`;

// Title for the sign-in form
export const SignInTitle = styled.h2`
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
`;

// Input field for the sign-in form
export const SignInInput = styled.input`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  &:focus {
    border-color: #FF4500;
    outline: none;
  }
`;

// Submit button for the form
export const SignInButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #FF4500;
  color: white;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #FF6347;
  }
`;

// Error message to display if login fails
export const ErrorMessage = styled.p`
  color: #FF6347;
  font-size: 14px;
  margin-top: 10px;
`;


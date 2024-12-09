import styled from 'styled-components';

export const AdminSignInContainer = styled.div`
  min-height: 100vh;
  background-color: #6B4423;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
`;

export const FormContainer = styled.form`
  background: white;
  border-radius: 1rem;
  padding: 2.5rem;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  h2 {
    color: #2D3748;
    font-size: 1.75rem;
    font-weight: 600;
    text-align: center;
    margin-bottom: 2rem;
  }

  @media (max-width: 480px) {
    padding: 1.5rem;
    
    h2 {
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
    }
  }
`;
export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 1.5rem;
`;

export const InputField = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.75rem;
  margin-bottom: 1rem;
  border: 1px solid #E2E8F0;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.2s ease;
  outline: none;

  &:focus {
    border-color: #6B4423;
    box-shadow: 0 0 0 2px rgba(107, 68, 35, 0.1);
  }

  &::placeholder {
    color: #A0AEC0;
  }

  @media (max-width: 480px) {
    padding: 0.625rem 0.875rem;
    font-size: 0.875rem;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 0.875rem;
  background-color: #6B4423;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #5A381D;
  }

  &:disabled {
    background-color: #A0AEC0;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
    font-size: 0.875rem;
  }
`;
export const IconWrapper = styled.div`
  position: absolute;
  left: 1rem;
  bottom: 1.75rem;
  color: #6B4423;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;
export const SignUpLink = styled.div`
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.875rem;
  color: #4A5568;

  a {
    color: #6B4423;
    text-decoration: none;
    margin-left: 0.25rem;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

export const ErrorMessage = styled.p`
  color: #E53E3E;
  text-align: center;
  margin-bottom: 1rem;
  font-size: 0.875rem;

  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;
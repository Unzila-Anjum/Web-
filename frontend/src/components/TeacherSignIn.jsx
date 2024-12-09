import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  SignInContainer,
  SignInBox,
  SignInTitle,
  SignInInput,
  SignInButton,
  ErrorMessage
} from '../styles/TeacherSignInStyles.js';

const TeacherSignIn = () => {
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');

    // Hardcoded credentials for specific access
    const VALID_REG_NUMBER = '20i-1793';
    const VALID_EMAIL = 'wasifali@gmail.com';

    // Check if entered credentials match the specific values
    if (registrationNumber === VALID_REG_NUMBER && email === VALID_EMAIL) {
      try {
        // Simulate successful login
        const teacherInfo = {
          registrationNumber: VALID_REG_NUMBER,
          email: VALID_EMAIL
        };

        // Store teacher info in local storage
        localStorage.setItem('teacherInfo', JSON.stringify(teacherInfo));

        // Navigate to the specified dashboard
        navigate('/teacher/dashboard');
      } catch (error) {
        setError('An unexpected error occurred');
      }
    } else {
      // Set error for incorrect credentials
      setError('Invalid registration number or email');
    }
  };

  return (
    <SignInContainer>
      <SignInBox>
        <SignInTitle>Teacher Sign In</SignInTitle>
        <form onSubmit={handleSignIn}>
          <SignInInput
            type="text"
            placeholder="Registration Number"
            value={registrationNumber}
            onChange={(e) => setRegistrationNumber(e.target.value)}
            required
          />
          <SignInInput
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <SignInButton type="submit">Sign In</SignInButton>
        </form>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </SignInBox>
    </SignInContainer>
  );
};

export default TeacherSignIn;
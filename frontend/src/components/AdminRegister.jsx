import React, { useState } from 'react';
import { Eye, EyeOff, UserCircle, Mail, Lock } from 'lucide-react';
import {
  AdminRegisterContainer,
  FormContainer,
  InputGroup,
  InputField,
  InputWrapper,
  IconWrapper,
  SubmitButton,
  SignInLink,
  ErrorMessage,
  PasswordToggle,
  Title
} from '../styles/AdminRegisterStyles';

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    setError(null);

    if (!formData.name || formData.name.trim().length < 2) {
      setError('Name must be at least 2 characters long');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:4000/api/v1/register/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('adminToken', data.token);
        window.location.href = '/admin/dashboard';
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Network error. Please check your connection.');
      console.error('Registration error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <AdminRegisterContainer>
      <FormContainer onSubmit={handleRegister}>
        <Title>Admin Registration</Title>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <InputGroup>
          <InputWrapper>
            <IconWrapper>
              <UserCircle size={20} />
            </IconWrapper>
            <InputField
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </InputWrapper>

          <InputWrapper>
            <IconWrapper>
              <Mail size={20} />
            </IconWrapper>
            <InputField
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </InputWrapper>

          <InputWrapper>
            <IconWrapper>
              <Lock size={20} />
            </IconWrapper>
            <InputField
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <PasswordToggle type="button" onClick={togglePasswordVisibility}>
              {isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
            </PasswordToggle>
          </InputWrapper>

          <InputWrapper>
            <IconWrapper>
              <Lock size={20} />
            </IconWrapper>
            <InputField
              type={isPasswordVisible ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </InputWrapper>
        </InputGroup>

        <SubmitButton type="submit" disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register'}
        </SubmitButton>

        <SignInLink>
          Already have an account? 
          <a href="/admin-signin">Sign In</a>
        </SignInLink>
      </FormContainer>
    </AdminRegisterContainer>
  );
};

export default AdminRegister;
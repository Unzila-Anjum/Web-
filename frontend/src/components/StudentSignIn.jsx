import React, { useState } from "react";
import { InputWrapper,
  IconWrapper,InputGroup, AdminSignInContainer, FormContainer, InputField, SubmitButton } from "../styles/StudentSignInStyles";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // for navigation
import {  Mail, Lock } from 'lucide-react';

const StudentSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate(); // for navigation

  // Debugging function to log form submission
  const handleSignIn = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page

    // Debugging: Check if the function is being triggered
    console.log("Form submitted with:", email, password);

    // Basic form validation
    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    setIsLoading(true); // Show loading state

    try {
      const response = await axios.post("http://localhost:4000/api/auth/students/login", {
        email,
        password,
      });

      console.log("Response from server:", response); // Debugging

      if (response.status === 200) {
        setErrorMessage(""); // Clear any previous errors

        // Store JWT token or other info as needed (localStorage, sessionStorage)
        localStorage.setItem("studentToken", response.data.token);

        // Reset form fields after successful sign-in
        setEmail("");
        setPassword("");

        // Redirect to admin dashboard using React Router
        navigate("/Student/Dashboard");
      } else {
        setErrorMessage("Unexpected response from server.");
      }
    } catch (error) {
      setIsLoading(false); // Stop loading state

      if (error.response) {
        // Server responded with a status outside 2xx
        setErrorMessage(error.response.data.message || "Sign-in failed.");
      } else if (error.request) {
        // Request was made but no response received
        setErrorMessage("No response from the server. Please try again later.");
      } else {
        // Error occurred in setting up the request
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <AdminSignInContainer>
     
      
     
      <FormContainer onSubmit={handleSignIn}>
      <h2>Student Sign In</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <InputGroup>
      <InputWrapper>
            <IconWrapper>
              <Mail size={20} />
            </IconWrapper>
        <InputField
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        </InputWrapper>
        <InputWrapper>
            <IconWrapper>
              <Lock size={20} />
            </IconWrapper>
        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        </InputWrapper>
        </InputGroup>
        {/* Submit Button should be type="submit" */}
        <SubmitButton onClick={handleSignIn} disabled={isLoading}>
          {isLoading ? "Signing In..." : "Sign In"}
        </SubmitButton>
      
      
        </FormContainer>
    </AdminSignInContainer>
    
  );
};

export default StudentSignIn;

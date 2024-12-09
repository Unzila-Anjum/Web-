import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import axios from "axios";

const StudentLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setMessage("Please fill in both email and password fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/api/auth/students/login", {
        email,
        password,
      });

      if (response.data.success) {
        setMessage("Login successful!");
        localStorage.setItem("token", response.data.token); // Store token

        // Redirect to the student dashboard
        navigate("/student/dashboard"); 
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2>Student Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default StudentLogin;

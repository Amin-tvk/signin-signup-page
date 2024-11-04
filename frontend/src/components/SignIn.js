// src/components/SignIn.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';

const SignIn = ({ onSignIn }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost/api"; // Fallback URL
  
    try {
      const response = await fetch(`${apiUrl}/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials), // Ensure credentials contains correct data
      });
  
      if (!response.ok) {
        const errorData = await response.json(); // Handle non-200 responses
        setError(errorData.message || 'Login failed');
        console.error('Login failed with status:', response.status, 'Response:', errorData);
        return;
      }
  
      const data = await response.json(); // Parse response data only if response is ok
      if (data.success) {
        onSignIn(data.user); // Update user data in the parent component
        navigate('/profile', { state: { user: data.user } }); // Navigate to profile with user data
      } else {
        setError(data.message || 'Login failed');
        console.warn('Login unsuccessful:', data);
        navigate('/profile', { state: { user: data.user } });
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred. Please try again.');
    }
  };
  

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={credentials.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign In</button>
      </form>
      {error && <p className="error">{error}</p>}
      <p>Don't have an account? <a href="/">Sign Up</a></p>
    </div>
  );
};

export default SignIn;

import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Reset errors before validating again
    setEmailError('');
    setPasswordError('');

    if (!username) {
      setEmailError('Email is required');
      return;
    }
    
    if (!password) {
      setPasswordError('Password is required');
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/user/login", 
        {
          email: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", username);
        localStorage.setItem("userRole", response.data.user.type);  // Consistent key name
        localStorage.setItem("token", response.data.user.token); 

        setEmailError('');
        setPasswordError('');
        
        // Redirect based on user type
        if (response.data.user.type === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/employee-dashboard');
        }
      } else {
        setEmailError("Invalid credentials, please try again.");
        setPasswordError("Invalid credentials, please try again.");
      }
    } catch (err) {
      console.error('Login error:', err);
      setEmailError("Login failed. Please try again.");
      setPasswordError("Login failed. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom>Login</Typography>
      
      <TextField
        fullWidth
        label="Email"
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        error={!!emailError}
        helperText={emailError}
      />
      
      <TextField
        fullWidth
        label="Password"
        type="password"
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!passwordError}
        helperText={passwordError}
      />
      
      <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleLogin}>
        Login
      </Button>
    </Container>
  );
};

export default Login;

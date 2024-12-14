import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUserName] = useState('');
  const [mfaToken, setMfaToken] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); // For navigation after successful login/MFA

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      const loginResponse = await axios.post('http://localhost:5000/login', {
        email,
        password,
      });
      localStorage.setItem('username',username);
      if (loginResponse.data.isMfaRequired) {
        setMfaToken(loginResponse.data.mfa_token);
      } 
      else
      {
        setError('Login failed. Please try again.');
      }
    } catch (error: any) {
      setError(error.response?.data?.error || 'Login failed. Please try again.');
    }
  };

  const handleMfaVerify = async () => {
    setError(''); // Clear previous errors

    try {
      const mfaResponse = await axios.post('http://localhost:5000/mfa-verify', {
        mfa_token: mfaToken,
        otp,
      });

      if (mfaResponse.status === 200) {
        // MFA verified successfully, navigate to profile
        console.log('MFA verified successfully');
        navigate('/profile');
      }
    } catch (error: any) {
      setError(error.response?.data?.error || 'MFA verification failed. Please try again.');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: '0 auto', padding: 2 }}>
      <form onSubmit={handleLogin}>
        <Typography variant="h4" gutterBottom>Login</Typography>
        <TextField
          fullWidth
          label="userName"
          variant="outlined"
          margin="normal"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button fullWidth variant="contained" color="primary" type="submit">
          Login
        </Button>
      </form>

      {mfaToken && (
        <Box>
          <Typography variant="h6" gutterBottom>Enter MFA Code</Typography>
          <TextField
            fullWidth
            label="MFA Code"
            variant="outlined"
            margin="normal"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <Button fullWidth variant="contained" color="secondary" onClick={handleMfaVerify}>
            Verify MFA
          </Button>
        </Box>
      )}

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
    </Box>
  );
}

export default Login;

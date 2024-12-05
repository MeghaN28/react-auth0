import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Box, Container, Alert } from '@mui/material';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [mfaCode, setMfaCode] = useState('');
  const [isMfaRequired, setIsMfaRequired] = useState(false);
  const [mfaToken, setMfaToken] = useState('');
  const [username,SetUserName]=useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('https://dev-dyy0v56xmxzyf6o6.us.auth0.com/oauth/token', {
        grant_type: 'password',
        username: email,
        password: password,
        client_id: 'I5gcvfUiOML9xmZ52QXUsGJqZVEBiSDR',
        client_secret: 'xmOex2Hey-Xp_qAc8C6OvSCb4hP7rEgwdIlZyPOAlg_AOlw-W_-O6sQHS3oaiRgK',
        connection: 'Username-Password-Authentication'
      });

      if (response?.data.mfa_token) {
        setMfaToken(response.data.mfa_token);
        setIsMfaRequired(true);
      } else {
        localStorage.setItem('token', response.data.access_token);
        window.location.href = '/profile';
      }
    } catch (err: any) {
      if (err.response?.data.mfa_token) {
        setMfaToken(err.response.data.mfa_token);
        setIsMfaRequired(true);
      } else {
        setError('Login failed. Please check your credentials.');
      }
    }
  };

  const handleMfaVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const verificationResponse = await axios.post('https://dev-dyy0v56xmxzyf6o6.us.auth0.com/oauth/token', {
        mfa_token: mfaToken,
        otp: mfaCode,
        client_id: 'I5gcvfUiOML9xmZ52QXUsGJqZVEBiSDR',
        grant_type: 'http://auth0.com/oauth/grant-type/mfa-otp',
        client_secret: 'xmOex2Hey-Xp_qAc8C6OvSCb4hP7rEgwdIlZyPOAlg_AOlw-W_-O6sQHS3oaiRgK'
      });

      localStorage.setItem('token', verificationResponse.data.access_token);
      localStorage.setItem('username', username)
      window.location.href = '/react-auth0/profile';
    } catch {
      setError('MFA verification failed. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
        {isMfaRequired ? (
          <form onSubmit={handleMfaVerification}>
            <Typography variant="h5" gutterBottom>
              Enter MFA Code
            </Typography>
            <TextField
              fullWidth
              margin="normal"
              label="MFA Code"
              type="text"
              value={mfaCode}
              onChange={(e) => setMfaCode(e.target.value)}
              required
            />
            <Button variant="contained" color="primary" fullWidth type="submit">
              Verify MFA
            </Button>
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          </form>
        ) : (
          <form onSubmit={handleLogin}>
            <Typography variant="h5" gutterBottom>
              Login
            </Typography>
            <TextField
              fullWidth
              margin="normal"
              label="UserName"
              type="text"
              value={username}
              onChange={(e) => SetUserName(e.target.value)}
              
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button variant="contained" color="primary" fullWidth type="submit">
              Login
            </Button>
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          </form>
        )}
      </Box>
    </Container>
  );
}

export default Login;

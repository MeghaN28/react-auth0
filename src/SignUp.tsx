import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [barcodeUri, setBarcodeUri] = useState('');
  const [mfaToken, setMfaToken] = useState('');

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const signupResponse = await axios.post('http://localhost:5000/signup', {
        email,
        password,
      });
     console.log(signupResponse)
      if (signupResponse.data.mfa_token) {
        setMfaToken(signupResponse.data.mfa_token);

        const mfaEnrollResponse = await axios.post('http://localhost:5000/enrollmfa', {
          mfa_token: signupResponse.data.mfa_token,
        });

        if (mfaEnrollResponse.data.barcode_uri) {
          setBarcodeUri(mfaEnrollResponse.data.barcode_uri);
        }
      }
    } catch (error) {
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: '0 auto', padding: 2 }}>
      <form onSubmit={handleSignup}>
        <Typography variant="h4" gutterBottom>Sign Up</Typography>
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
        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button fullWidth variant="contained" color="primary" type="submit">
          Sign Up
        </Button>
      </form>
      {error && <Alert severity="error">{error}</Alert>}
      {barcodeUri && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Scan QR Code for MFA Enrollment</Typography>
          <img src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(barcodeUri)}&size=150x150`} alt="QR Code" />
        </Box>
      )}
    </Box>
  );
}

export default Signup;

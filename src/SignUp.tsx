import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';

interface MFAResponse {
  authenticator_type: string;
  secret: string;
  barcode_uri: string;
  recovery_codes: string[];
}

function Signup() {
  const [email, setEmail] = useState('');
  const [barcodeUri, setBarcodeUri] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [mfaResponse, setMfaResponse] = useState<MFAResponse | null>(null);
  const [mfaToken, setMfaToken] = useState('');

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Signup logic (to Auth0 and your API)
      await axios.post(
        'https://dev-dyy0v56xmxzyf6o6.us.auth0.com/dbconnections/signup',
        {
          client_id: 'I5gcvfUiOML9xmZ52QXUsGJqZVEBiSDR',
          email,
          password,
          connection: 'Username-Password-Authentication',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const responsemfa = await axios.post('https://dev-dyy0v56xmxzyf6o6.us.auth0.com/oauth/token', {
        grant_type: 'password',
        username: email,
        password: password,
        client_id: 'I5gcvfUiOML9xmZ52QXUsGJqZVEBiSDR',
        client_secret: 'xmOex2Hey-Xp_qAc8C6OvSCb4hP7rEgwdIlZyPOAlg_AOlw-W_-O6sQHS3oaiRgK',
        connection: 'Username-Password-Authentication'
      });

      
      
      // Call local Python backend to fetch MFA details
     
       // Store MFA response in state
    } 
      catch (err: any) {
        if (err.response?.data.mfa_token) {
          console.log("here")
          setMfaToken(err.response.data.mfa_token);
          const response = await axios.post(
            'https://dev-dyy0v56xmxzyf6o6.us.auth0.com/mfa/associate', 
            { 
              authenticator_types: ["otp"]
            },
            {
              headers: {
                'Authorization': `Bearer ${err.response.data.mfa_token}`, // Replace MFA_TOKEN with the actual token
                'Content-Type': 'application/json'
              }
            }
          );
          setMfaResponse(response.data);
          if (response.data.barcode_uri) {
            setBarcodeUri(response.data.barcode_uri);
          } 
      
        //setIsMfaRequired(true);
      }
    
    
    }
     
  };

  return (
    <Box sx={{ maxWidth: 400, margin: '0 auto', padding: 2 }}>
      <form onSubmit={handleSignup}>
        <Typography variant="h4" gutterBottom>
          Sign Up
        </Typography>
  
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
  
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          sx={{ marginTop: 2 }}
        >
          Sign Up
        </Button>
      </form>
  
      {error && (
        <Alert severity="error" sx={{ marginTop: 2 }}>
          {error}
        </Alert>
      )}
  
      {mfaResponse && (
        <Box sx={{ marginTop: 3 }}>
          <Typography variant="h6">MFA Enrollment Details</Typography>
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(barcodeUri)}&size=150x150`}
            alt="QR Code"
            style={{ marginTop: '10px' }}
          />
        </Box>
      )}
    </Box>
  );
  }

export default Signup;

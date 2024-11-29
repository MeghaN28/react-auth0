import React, { useState } from 'react';
import { Container, Grid, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userId,setUserId]=useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
        const [auth0Response, customApiResponse] = await Promise.all([
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
             ),
             
             axios.post(
               'https://g1x0k9jowh.execute-api.us-east-1.amazonaws.com/dev/signin',  // Replace with your custom API endpoint
               {
                 userId: userId,  // Include userId if needed
                 email: email,
                 password: password,
                // additionalField: 'some data',  // Any additional data for your custom API
               },
               {
                 headers: {
                   'Content-Type': 'application/json',
                 },
               }
             ),
           ]);

      console.log('Signup successful:', auth0Response.data);

      // Redirect to login after successful signup
      window.location.href = '/react-auth0/login';
    } catch (err) {
      setError('Error during signup');
      console.error(err);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8, boxShadow: 3, borderRadius: 2, padding: 4 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Sign Up
      </Typography>
      <form onSubmit={handleSignup}>
        <Grid container spacing={3}>
        <Grid item xs={12}>
            <TextField
              label="UserId"
              variant="outlined"
              fullWidth
              required
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Confirm Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Grid>
          {error && (
            <Grid item xs={12}>
              <Typography color="error" align="center">
                {error}
              </Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth>
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default Signup;

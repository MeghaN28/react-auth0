import React from 'react';
import { Avatar, Grid, Typography } from '@mui/material';
import profileImage from './image/1000_F_121505739_rHUKSW1Ez34penLuCEsVxDU9pAGFcBHK.jpg'; // Adjust the path based on your folder structure

function Profile() {
  // Retrieve the username from localStorage
  const username = localStorage.getItem('username');

  return (
    <main style={{ padding: '1rem 0' }}>
      <Grid container justifyContent="center" alignItems="center" direction="column">
        <Grid item>
          <Avatar
            alt={username ?? 'User'}
            src={profileImage} // Use the imported image here
            sx={{ width: 75, height: 75, mb: 2 }}
          />
        </Grid>
        <Grid item>
          <Typography variant="h4" gutterBottom>
            Hi {username ?? 'User'}!
          </Typography>
        </Grid>
      </Grid>
    </main>
  );
}

export default Profile;

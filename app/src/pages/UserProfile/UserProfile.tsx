import React from 'react';
import { Typography, Paper } from '@mui/material';

const UserProfile: React.FC = () => {
  return (
    <Paper elevation={3} sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Profile
      </Typography>
      {/* Display user information here */}
    </Paper>
  );
};

export default UserProfile;

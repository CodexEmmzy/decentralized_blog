import React from 'react';
import { Typography, Paper, Box } from '@mui/material';

const PostDetails: React.FC = () => {
  return (
    <Paper elevation={3} sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Example Post Title
      </Typography>
      <Typography variant="body1" paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent euismod.
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Comments</Typography>
        {/* Render comments here */}
      </Box>
    </Paper>
  );
};

export default PostDetails;

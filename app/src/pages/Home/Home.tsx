import React from 'react';
import { Typography, Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Latest Posts
      </Typography>
      <Grid container spacing={4}>
        {/* Example of a post, replace with real data */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" component={Link} to="/post/1" sx={{ textDecoration: 'none', color: 'inherit' }}>
              Example Post Title
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Author: John Doe
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Posted on: January 1, 2024
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;

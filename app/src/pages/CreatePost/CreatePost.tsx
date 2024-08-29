import React from 'react';
import { TextField, Button, Paper, Typography } from '@mui/material';

const CreatePost: React.FC = () => {
  return (
    <Paper elevation={3} sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Create a New Post
      </Typography>
      <TextField
        label="Title"
        fullWidth
        margin="normal"
      />
      <TextField
        label="Content"
   
        fullWidth
        margin="normal"
        multiline
        rows={6}
      />
      <Button variant="contained" color="primary" sx={{ mt: 2 }}>
        Submit
      </Button>
    </Paper>
  );
};

export default CreatePost;

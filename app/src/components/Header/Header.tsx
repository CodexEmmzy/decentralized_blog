import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
          Decentralized Blog
        </Typography>
        <Button color="inherit" component={Link} to="/create-post">
          Create Post
        </Button>
        <Button color="inherit" component={Link} to="/profile">
          Profile
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

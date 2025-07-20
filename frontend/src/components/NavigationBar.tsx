import React from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const NavigationBar: React.FC = () => (
  <AppBar position="static">
    <Toolbar>
      <Box sx={{ flexGrow: 1 }}>
        <Button color="inherit" component={Link} to="/dashboard">
          Dashboard
        </Button>
        <Button color="inherit" component={Link} to="/users">
          Users
        </Button>
        <Button color="inherit" component={Link} to="/authors">
          Authors
        </Button>
        <Button color="inherit" component={Link} to="/books">
          Books
        </Button>
      </Box>
    </Toolbar>
  </AppBar>
);

export default NavigationBar;

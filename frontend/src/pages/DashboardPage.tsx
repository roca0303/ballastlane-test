import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Paper } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const DashboardPage: React.FC = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null); // Remove token from context and localStorage
    navigate('/login');
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f5f5">
      <Paper elevation={3} sx={{ p: 4, minWidth: 320 }}>
        <Typography variant="h4" mb={3} align="center">
          Dashboard
        </Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          <Button component={Link} to="/authors" variant="contained" color="primary">
            Manage Authors
          </Button>
          <Button component={Link} to="/books" variant="contained" color="secondary">
            Manage Books
          </Button>
          <Button component={Link} to="/users" variant="contained" color="info">
            Manage Users
          </Button>
          <Button onClick={handleLogout} variant="outlined" color="error" sx={{ mt: 2 }}>
            Sign Out
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default DashboardPage;

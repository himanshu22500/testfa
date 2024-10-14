import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

function Header({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <LocalShippingIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Logistics App
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        {user ? (
          <>
            <Button color="inherit" component={Link} to="/booking">Book</Button>
            <Button color="inherit" component={Link} to="/bookings">My Bookings</Button>
            <Button color="inherit" component={Link} to="/profile">Profile</Button>
            {user.role === 'driver' && (
              <Button color="inherit" component={Link} to="/driver">Driver Dashboard</Button>
            )}
            {user.role === 'admin' && (
              <Button color="inherit" component={Link} to="/admin">Admin Dashboard</Button>
            )}
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/register">Register</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
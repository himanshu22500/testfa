import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function Home() {
  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to Logistics App
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        Fast, reliable, and efficient logistics solutions
      </Typography>
      <Button
        component={Link}
        to="/booking"
        variant="contained"
        color="primary"
        size="large"
        sx={{ mt: 2 }}
      >
        Book Now
      </Button>
    </Box>
  );
}

export default Home;
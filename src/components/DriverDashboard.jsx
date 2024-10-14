import React, { useState, useEffect } from 'react';
import { Typography, Box, Paper, Grid, Button } from '@mui/material';
import axios from 'axios';

function DriverDashboard() {
  const [profile, setProfile] = useState(null);
  const [availableBookings, setAvailableBookings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileResponse = await axios.get('/api/driver/profile');
        setProfile(profileResponse.data);

        const bookingsResponse = await axios.get('/api/driver/available-bookings');
        setAvailableBookings(bookingsResponse.data);
      } catch (error) {
        console.error('Error fetching driver data:', error);
      }
    };

    fetchData();
  }, []);

  const handleAcceptBooking = async (bookingId) => {
    try {
      await axios.post(`/api/driver/accept-booking/${bookingId}`);
      // Refresh available bookings
      const bookingsResponse = await axios.get('/api/driver/available-bookings');
      setAvailableBookings(bookingsResponse.data);
    } catch (error) {
      console.error('Error accepting booking:', error);
    }
  };

  if (!profile) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Driver Dashboard</Typography>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>Driver Profile</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Name: {profile.name}</Typography>
            <Typography variant="subtitle1">Email: {profile.email}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">License Number: {profile.licenseNumber}</Typography>
            <Typography variant="subtitle1">Vehicle Type: {profile.vehicleType}</Typography>
          </Grid>
        </Grid>
      </Paper>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>Available Bookings</Typography>
        {availableBookings.map((booking) => (
          <Paper key={booking.id} sx={{ p: 2, mb: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={8}>
                <Typography variant="subtitle1">Booking ID: {booking.id}</Typography>
                <Typography variant="body1">Pickup: {booking.pickup}</Typography>
                <Typography variant="body1">Dropoff: {booking.dropoff}</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button variant="contained" color="primary" onClick={() => handleAcceptBooking(booking.id)}>
                  Accept Booking
                </Button>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </Paper>
    </Box>
  );
}

export default DriverDashboard;
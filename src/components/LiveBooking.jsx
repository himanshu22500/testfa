import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box, Paper, Grid } from '@mui/material';
import axios from 'axios';

function LiveBooking() {
  const [booking, setBooking] = useState(null);
  const [driverLocation, setDriverLocation] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchBookingAndLocation = async () => {
      try {
        const bookingResponse = await axios.get(`/api/bookings/${id}`);
        setBooking(bookingResponse.data);

        const locationResponse = await axios.get(`/api/driver-location/${bookingResponse.data.driverId}`);
        setDriverLocation(locationResponse.data);
      } catch (error) {
        console.error('Error fetching live booking data:', error);
      }
    };

    fetchBookingAndLocation();
    const interval = setInterval(fetchBookingAndLocation, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [id]);

  if (!booking || !driverLocation) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Live Booking</Typography>
      <Paper sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Booking ID: {booking.id}</Typography>
            <Typography variant="subtitle1">Status: {booking.status}</Typography>
            <Typography variant="subtitle1">Pickup: {booking.pickup}</Typography>
            <Typography variant="subtitle1">Dropoff: {booking.dropoff}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Driver Location:</Typography>
            <Typography variant="body1">Latitude: {driverLocation.latitude}</Typography>
            <Typography variant="body1">Longitude: {driverLocation.longitude}</Typography>
            <Typography variant="body1">Last Updated: {new Date(driverLocation.timestamp).toLocaleString()}</Typography>
          </Grid>
        </Grid>
      </Paper>
      {/* Add a map component here to plot the driver's location */}
    </Box>
  );
}

export default LiveBooking;
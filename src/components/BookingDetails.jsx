import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box, Paper, Grid } from '@mui/material';
import axios from 'axios';

function BookingDetails() {
  const [booking, setBooking] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await axios.get(`/api/bookings/${id}`);
        setBooking(response.data);
      } catch (error) {
        console.error('Error fetching booking details:', error);
      }
    };

    fetchBooking();
  }, [id]);

  if (!booking) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Booking Details</Typography>
      <Paper sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Booking ID: {booking.id}</Typography>
            <Typography variant="subtitle1">Vehicle Type: {booking.vehicleType}</Typography>
            <Typography variant="subtitle1">Pickup: {booking.pickup}</Typography>
            <Typography variant="subtitle1">Dropoff: {booking.dropoff}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Status: {booking.status}</Typography>
            <Typography variant="subtitle1">Created At: {new Date(booking.createdAt).toLocaleString()}</Typography>
            <Typography variant="subtitle1">Estimated Price: ${booking.estimatedPrice}</Typography>
            <Typography variant="subtitle1">Actual Price: ${booking.actualPrice || 'N/A'}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default BookingDetails;
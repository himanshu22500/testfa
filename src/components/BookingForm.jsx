import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';

function BookingForm() {
  const [vehicleType, setVehicleType] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement booking logic
    console.log('Booking:', { vehicleType, pickupLocation, dropoffLocation });
    navigate('/bookings');
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Book a Vehicle
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          select
          fullWidth
          label="Vehicle Type"
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value)}
          margin="normal"
          required
        >
          <MenuItem value="car">Car</MenuItem>
          <MenuItem value="van">Van</MenuItem>
          <MenuItem value="truck">Truck</MenuItem>
        </TextField>
        <TextField
          fullWidth
          label="Pickup Location"
          value={pickupLocation}
          onChange={(e) => setPickupLocation(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Dropoff Location"
          value={dropoffLocation}
          onChange={(e) => setDropoffLocation(e.target.value)}
          margin="normal"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Book Now
        </Button>
      </form>
    </Box>
  );
}

export default BookingForm;
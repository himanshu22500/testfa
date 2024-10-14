import React, { useState, useEffect } from 'react';
import { Typography, Box, Paper, Grid } from '@mui/material';
import axios from 'axios';

function AdminDashboard() {
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const responses = await Promise.all([
          axios.get('/api/admin/vehicles'),
          axios.get('/api/admin/drivers'),
          axios.get('/api/admin/bookings'),
          axios.get('/api/admin/analytics/revenue'),
          axios.get('/api/admin/dashboard/overview'),
        ]);

        setAdminData({
          vehicles: responses[0].data,
          drivers: responses[1].data,
          bookings: responses[2].data,
          revenue: responses[3].data,
          overview: responses[4].data,
        });
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };

    fetchAdminData();
  }, []);

  if (!adminData) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Overview</Typography>
            <Typography>Total Vehicles: {adminData.overview.totalVehicles}</Typography>
            <Typography>Total Drivers: {adminData.overview.totalDrivers}</Typography>
            <Typography>Total Bookings: {adminData.overview.totalBookings}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Revenue</Typography>
            <Typography>Total Revenue: ${adminData.revenue.totalRevenue}</Typography>
            <Typography>Average Revenue per Booking: ${adminData.revenue.averageRevenuePerBooking}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Recent Bookings</Typography>
            {adminData.bookings.slice(0, 5).map((booking) => (
              <Box key={booking.id} sx={{ mb: 2 }}>
                <Typography>Booking ID: {booking.id}</Typography>
                <Typography>Status: {booking.status}</Typography>
                <Typography>Price: ${booking.price}</Typography>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AdminDashboard;
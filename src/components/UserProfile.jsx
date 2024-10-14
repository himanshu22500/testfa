import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function UserProfile() {
  const [username, setUsername] = useState('JohnDoe');
  const [email, setEmail] = useState('john@example.com');
  const [phoneNumber, setPhoneNumber] = useState('123-456-7890');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement profile update logic
    console.log('Profile updated:', { username, email, phoneNumber });
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        User Profile
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
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
          Update Profile
        </Button>
      </form>
    </Box>
  );
}

export default UserProfile;
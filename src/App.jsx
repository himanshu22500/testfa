import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import BookingForm from './components/BookingForm';
import BookingList from './components/BookingList';
import BookingDetails from './components/BookingDetails';
import LiveBooking from './components/LiveBooking';
import UserProfile from './components/UserProfile';
import DriverDashboard from './components/DriverDashboard';
import AdminDashboard from './components/AdminDashboard';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4956DC',
    },
    secondary: {
      main: '#EB9893',
    },
    background: {
      default: '#24242C',
      paper: '#2A2A33',
    },
  },
});

function App() {
  const [user, setUser] = useState(null);

  const ProtectedRoute = ({ children, roles }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }

    if (roles && !roles.includes(user.role)) {
      return <Navigate to="/" />;
    }

    return children;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header user={user} setUser={setUser} />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/booking" element={<ProtectedRoute><BookingForm /></ProtectedRoute>} />
          <Route path="/bookings" element={<ProtectedRoute><BookingList /></ProtectedRoute>} />
          <Route path="/bookings/:id" element={<ProtectedRoute><BookingDetails /></ProtectedRoute>} />
          <Route path="/live-booking/:id" element={<ProtectedRoute><LiveBooking /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
          <Route path="/driver" element={<ProtectedRoute roles={['driver']}><DriverDashboard /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
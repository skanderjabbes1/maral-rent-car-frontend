import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import CarList from './components/CarList';
import BookingForm from './components/BookingForm';
import BookingHistory from './components/BookingHistory';
import './App.css';

function AppContent() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  // Check if user is already logged in on page load
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLoginSuccess = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    navigate('/'); // Navigate to home/cars
  };

  const handleRegisterSuccess = () => {
    navigate('/login'); // Navigate to login
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setToken(null);
    navigate('/login');
  };

  return (
    <div className="App">
      {/* Navigation Bar */}
      <nav style={{ padding: '15px', backgroundColor: '#f8f9fa', borderBottom: '1px solid #ddd' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ margin: 0 }}>Maral Rent Car</h1>
          <div>
            {user ? (
              <>
                <span style={{ marginRight: '15px' }}>Welcome, {user.name}!</span>
                <button onClick={handleLogout} style={{ padding: '8px 15px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <a href="/login" style={{ marginRight: '15px', textDecoration: 'none', color: '#007bff' }}>Login</a>
                <a href="/register" style={{ textDecoration: 'none', color: '#007bff' }}>Register</a>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/register" element={<Register onRegisterSuccess={handleRegisterSuccess} />} />
        <Route path="/" element={user ? <CarList /> : <Navigate to="/login" replace />} />
        <Route path="/booking" element={user ? <BookingForm /> : <Navigate to="/login" replace />} />
        <Route path="/bookings" element={user ? <BookingHistory /> : <Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

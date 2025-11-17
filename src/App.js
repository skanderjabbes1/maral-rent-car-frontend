import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import CarList from './components/CarList';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import Reservations from './components/Reservations'; // <-- Import Reservations
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function AppContent() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (savedToken && savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
    }
  }, []);

  const handleLoginSuccess = (userData, authToken) => {
    setUser(userData);
    localStorage.setItem('token', authToken);
    localStorage.setItem('user', JSON.stringify(userData));
    navigate('/');
  };

  const handleRegisterSuccess = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  // Check if user is admin - either from state or localStorage
  const isAdmin = user?.role === 'admin' || JSON.parse(localStorage.getItem('user'))?.role === 'admin';

  return (
    <div className="App">
      <Header user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/register" element={<Register onRegisterSuccess={handleRegisterSuccess} />} />
        <Route path="/" element={<Home user={user} />} />
        <Route path="/fleet" element={user ? <CarList /> : <Navigate to="/login" replace />} />
        <Route path="/admin" element={isAdmin ? <AdminDashboard user={user || JSON.parse(localStorage.getItem('user'))} onLogout={handleLogout} /> : <Navigate to="/" replace />} />
        <Route path="/reservations" element={user ? <Reservations user={user} /> : <Navigate to="/login" replace />} />
      </Routes>
      <Footer />
      {/* Toast notifications container for the entire app */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar theme="colored" />
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
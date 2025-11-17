import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CarsManagement from '../components/CarsManagement';
import BookingsManagement from '../components/BookingsManagement';
import UsersManagement from '../components/UsersManagement';
import '../components/AdminNav.css';
import { FaCar, FaCalendarAlt, FaUsers, FaSignOutAlt } from 'react-icons/fa';

export default function AdminDashboard({ user, onLogout }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('cars');

  // Only admins can access
  if (!user || user.role !== 'admin') {
    return (
      <div className="admin-access-denied">
        <h2>Access Denied</h2>
        <p>You must be an admin to access this page.</p>
        <button onClick={() => navigate('/')}>Go Home</button>
      </div>
    );
  }

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <div className="admin-dashboard">
      {/* Admin Sidebar */}
      <div className="admin-sidebar">
        <div className="admin-header">
          <h3>Maral Admin</h3>
          <p>Welcome, {user.name}</p>
        </div>

        <nav className="admin-nav">
          <button 
            className={`admin-nav-link ${activeTab === 'cars' ? 'active' : ''}`}
            onClick={() => setActiveTab('cars')}
          >
            <FaCar size={18} />
            Cars Management
          </button>
          <button 
            className={`admin-nav-link ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            <FaCalendarAlt size={18} />
            Bookings
          </button>
          <button 
            className={`admin-nav-link ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <FaUsers size={18} />
            Users
          </button>
        </nav>

        <button className="admin-logout" onClick={handleLogout}>
          <FaSignOutAlt size={18} />
          Logout
        </button>
      </div>

      {/* Admin Content */}
      <div className="admin-content">
        {activeTab === 'cars' && <CarsManagement />}
        {activeTab === 'bookings' && <BookingsManagement />}
        {activeTab === 'users' && <UsersManagement />}
      </div>
    </div>
  );
}
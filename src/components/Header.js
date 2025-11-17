import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCar, FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

export default function Header({ user, onLogout }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* LOGO */}
        <div className="header-logo" onClick={() => navigate('/')}>
          <div className="header-logo-icon">
            <FaCar size={24} color="white" />
          </div>
          <span className="header-logo-text">Top Rent Car</span>
        </div>

        {/* DESKTOP NAV */}
        <nav className="header-nav">
          <Link to="/" className="header-nav-link">Home</Link>
          <Link to="/fleet" className="header-nav-link">Fleet</Link>
          <Link to="/reservations" className="header-nav-link">Reservations</Link>
          <a href="#payment" className="header-nav-link">Payment Info</a>
          <a href="#contact" className="header-nav-link">Contact</a>
        </nav>

        {/* DESKTOP USER */}
        <div className="header-user-section">
          {user ? (
            <>
              <span className="header-user-name">Welcome, {user.name}!</span>
              <button onClick={onLogout} className="header-logout-btn">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="header-login-link">Login</Link>
              <Link to="/register" className="header-register-link">Register</Link>
            </>
          )}
        </div>

        {/* HAMBURGER BUTTON */}
        <button 
          className="header-hamburger" 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="header-mobile-menu">
          <nav className="header-mobile-nav">
            <Link to="/" className="header-mobile-link" onClick={closeMenu}>Home</Link>
            <Link to="/fleet" className="header-mobile-link" onClick={closeMenu}>Fleet</Link>
            <Link to="/reservations" className="header-mobile-link" onClick={closeMenu}>Reservations</Link>
            <a href="#payment" className="header-mobile-link" onClick={closeMenu}>Payment Info</a>
            <a href="#contact" className="header-mobile-link" onClick={closeMenu}>Contact</a>
          </nav>

          <div className="header-mobile-user">
            {user ? (
              <>
                <span className="header-mobile-user-name">Welcome, {user.name}!</span>
                <button 
                  onClick={() => {
                    onLogout();
                    closeMenu();
                  }} 
                  className="header-mobile-logout"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="header-mobile-auth" onClick={closeMenu}>Login</Link>
                <Link to="/register" className="header-mobile-auth" onClick={closeMenu}>Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
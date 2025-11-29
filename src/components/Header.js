import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCar, FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

export default function Header({ user, onLogout }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogoClick = () => {
    setMenuOpen(false);
    navigate('/');
  };

  const handleLogoutClick = () => {
    if (onLogout) {
      onLogout();
    }
    setMenuOpen(false);
  };

  const closeMenu = () => setMenuOpen(false);

  const goToChangePassword = () => {
    setMenuOpen(false);
    navigate('/change-password');
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="header-logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          <div className="header-logo-icon">
            <FaCar size={20} color="#ffffff" />
          </div>
          <span className="header-logo-text">Top Rent Car</span>
        </div>

        {/* Desktop nav */}
        <nav className="header-nav">
          <Link to="/" className="header-nav-link">
            Home
          </Link>
          <Link to="/fleet" className="header-nav-link">
            Fleet
          </Link>
          <Link to="/reservations" className="header-nav-link">
            Reservations
          </Link>
          <Link to="/payment-info" className="header-nav-link">
            Payment Info
          </Link>
          <a href="#contact" className="header-nav-link">
            Contact
          </a>
        </nav>

        {/* Desktop user section */}
        <div className="header-user-section">
          {user ? (
            <>
              <span className="header-user-name">Hi, {user.name || 'User'}</span>
              {user.role === 'admin' && (
                <button
                  className="header-login-link"
                  type="button"
                  onClick={() => navigate('/admin')}
                >
                  Admin
                </button>
              )}
              <button
                className="header-login-link"
                type="button"
                onClick={goToChangePassword}
              >
                Change Password
              </button>
              <button
                className="header-logout-btn"
                type="button"
                onClick={handleLogoutClick}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="header-login-link">
                Login
              </Link>
              <Link to="/register" className="header-register-link">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="header-hamburger"
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="header-mobile-menu">
          <nav className="header-mobile-nav">
            <Link to="/" className="header-mobile-nav-link" onClick={closeMenu}>
              Home
            </Link>
            <Link to="/fleet" className="header-mobile-nav-link" onClick={closeMenu}>
              Fleet
            </Link>
            <Link to="/reservations" className="header-mobile-nav-link" onClick={closeMenu}>
              Reservations
            </Link>
            <Link to="/payment-info" className="header-mobile-nav-link" onClick={closeMenu}>
              Payment Info
            </Link>
            <a href="#contact" className="header-mobile-nav-link" onClick={closeMenu}>
              Contact
            </a>
          </nav>

          <div className="header-mobile-user-section">
            {user ? (
              <>
                <div className="header-mobile-user-name">Hi, {user.name || 'User'}</div>
                {user.role === 'admin' && (
                  <button
                    className="header-mobile-login-link"
                    type="button"
                    onClick={() => {
                      navigate('/admin');
                      closeMenu();
                    }}
                  >
                    Admin
                  </button>
                )}
                <button
                  className="header-mobile-login-link"
                  type="button"
                  onClick={goToChangePassword}
                >
                  Change Password
                </button>
                <button
                  className="header-mobile-logout-btn"
                  type="button"
                  onClick={handleLogoutClick}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="header-mobile-login-link"
                  onClick={closeMenu}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="header-mobile-register-link"
                  onClick={closeMenu}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
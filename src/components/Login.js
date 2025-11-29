import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password,
      });

      // Save token + user
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Update app state
      if (onLoginSuccess) {
        onLoginSuccess(response.data.user, response.data.token);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: '400px',
        margin: '60px auto',
        padding: '24px',
        border: '1px solid #d1d5db',
        borderRadius: '10px',
        backgroundColor: '#ffffff',
        boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
      }}
    >
      <h2 style={{ marginBottom: '16px', textAlign: 'center' }}>Login</h2>

      {error && (
        <p style={{ color: '#b91c1c', background: '#fee2e2', padding: '8px', borderRadius: '6px' }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontSize: '14px', fontWeight: '500' }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
              marginTop: '4px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
            }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label style={{ fontSize: '14px', fontWeight: '500' }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
              marginTop: '4px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
            }}
          />
        </div>

        {/* Forgot password link */}
        <div style={{ textAlign: 'right', marginBottom: '15px' }}>
          <Link to="/forgot-password" style={{ fontSize: '13px', color: '#2563eb' }}>
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#2563eb',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <p style={{ marginTop: '18px', textAlign: 'center', fontSize: '14px' }}>
        Don't have an account?{' '}
        <Link to="/register" style={{ color: '#2563eb', fontWeight: '500' }}>
          Register here
        </Link>
      </p>
    </div>
  );
}
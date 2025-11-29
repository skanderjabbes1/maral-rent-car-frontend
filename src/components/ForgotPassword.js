import React, { useState } from 'react';
import axios from 'axios';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetLink, setResetLink] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setResetLink('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/users/forgot-password', {
        email,
      });

      setMessage(res.data.message || 'If this email exists, a reset link has been generated.');
      if (res.data.resetLink) {
        setResetLink(res.data.resetLink);
      }
    } catch (err) {
      console.error('Forgot password error', err);
      setError(err.response?.data?.error || 'Failed to process request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 160px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f3f4f6',
        padding: '20px',
      }}
    >
      <div
        style={{
          maxWidth: '400px',
          width: '100%',
          backgroundColor: '#ffffff',
          padding: '24px',
          borderRadius: '10px',
          boxShadow: '0 10px 25px rgba(15,23,42,0.12)',
        }}
      >
        <h2 style={{ marginBottom: '10px' }}>Forgot Password</h2>
        <p style={{ fontSize: '14px', color: '#4b5563', marginBottom: '16px' }}>
          Enter your email and we&apos;ll generate a password reset link.
        </p>

        {error && <p style={{ color: '#b91c1c', marginBottom: '10px' }}>{error}</p>}
        {message && <p style={{ color: '#15803d', marginBottom: '10px' }}>{message}</p>}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '12px' }}>
            <label
              htmlFor="email"
              style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: 500,
                marginBottom: '4px',
              }}
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '8px 10px',
                borderRadius: '6px',
                border: '1px solid #d1d5db',
                fontSize: '14px',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '10px 16px',
              border: 'none',
              borderRadius: '999px',
              backgroundColor: '#2563eb',
              color: '#ffffff',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: '4px',
            }}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        {resetLink && (
          <div
            style={{
              marginTop: '14px',
              fontSize: '12px',
              color: '#374151',
              wordBreak: 'break-all',
            }}
          >
            <strong>Dev reset link:</strong>
            <div>{resetLink}</div>
            <div style={{ marginTop: '4px' }}>
              (In production this would be sent to the user by email.)
            </div>
          </div>
        )}

        <p style={{ marginTop: '15px', textAlign: 'center', fontSize: '13px' }}>
          <a href="/login" style={{ color: '#2563eb' }}>
            Back to login
          </a>
        </p>
      </div>
    </div>
  );
}
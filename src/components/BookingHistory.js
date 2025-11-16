import React, { useState } from 'react';
import axios from 'axios';

const BookingHistory = () => {
  const [email, setEmail] = useState('');
  const [bookings, setBookings] = useState([]);
  const [msg, setMsg] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setMsg('');
    setBookings([]);
    try {
      const res = await axios.get(`http://localhost:5000/api/bookings?email=${encodeURIComponent(email)}`);
      if (res.data.length === 0) {
        setMsg('No bookings found for this email.');
      } else {
        setBookings(res.data);
      }
    } catch (err) {
      setMsg('Error: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div style={{ background: "#f7f9fc", padding: 24, borderRadius: 12, maxWidth: 500, margin: "20px auto" }}>
      <h2>View Your Bookings</h2>
      <form onSubmit={handleSearch} style={{ marginBottom: 16 }}>
        <input
          type="email"
          value={email}
          required
          placeholder="Enter your booking email"
          onChange={e => setEmail(e.target.value)}
        />
        <button type="submit">Show Bookings</button>
      </form>
      {msg && <p>{msg}</p>}
      {bookings.length > 0 && (
        <div>
          <h3>Bookings for {email}:</h3>
          <ul>
            {bookings.map(b => (
              <li key={b._id} style={{ marginBottom: "16px", padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}>
                <strong>{b.car.brand} {b.car.model}</strong><br />
                <span>From: {new Date(b.startDate).toLocaleDateString()}</span><br />
                <span>To: {new Date(b.endDate).toLocaleDateString()}</span><br />
                <span>Total: ${b.totalPrice}</span><br />
                <span>Status: {b.status}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BookingHistory;
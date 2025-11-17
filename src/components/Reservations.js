// src/components/Reservations.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Reservations = ({ user }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError('');
      try {
        let url = '/api/bookings';
        // If user is present and not admin, filter by that user's ID
        if (user && user.role !== 'admin') {
          url += `?user=${user._id}`;
        }
        const token = localStorage.getItem('token');
        const { data } = await axios.get(url, {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
        setBookings(data);
      } catch (err) {
        setBookings([]);
        setError('Failed to fetch reservations. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [user]);

  if (loading) return <div>Loading your reservations...</div>;
  if (error) return <div style={{color: 'red'}}>{error}</div>;
  if (!bookings.length) return <div>No reservations found.</div>;

  return (
    <div>
      <h2>Reservations</h2>
      <table>
        <thead>
          <tr>
            <th>Car</th>
            <th>Start</th>
            <th>End</th>
            <th>Total Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(b => (
            <tr key={b._id}>
              <td>
                {b.car?.brand || 'N/A'} {b.car?.model || ''}
              </td>
              <td>{b.startDate ? b.startDate.slice(0, 10) : ''}</td>
              <td>{b.endDate ? b.endDate.slice(0, 10) : ''}</td>
              <td>{b.totalPrice}</td>
              <td>{b.cancelled ? 'Cancelled' : 'Active'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reservations;
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export default function BookingsManagement() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  const token = localStorage.getItem('token');

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get('http://localhost:5000/api/bookings', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(response.data || []);
    } catch (err) {
      console.error('Failed to load bookings', err);
      setError('Failed to load bookings.');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'confirmed':
        return { backgroundColor: '#dcfce7', color: '#15803d' };
      case 'cancelled':
        return { backgroundColor: '#fee2e2', color: '#991b1b' };
      case 'completed':
        return { backgroundColor: '#e0f2fe', color: '#075985' };
      default: // pending
        return { backgroundColor: '#fef9c3', color: '#854d0e' };
    }
  };

  const updateStatus = async (bookingId, status) => {
    try {
      setError('');
      setUpdatingId(bookingId);

      await axios.patch(
        `http://localhost:5000/api/bookings/${bookingId}/status`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      await fetchBookings();
    } catch (err) {
      console.error('Error updating booking status', err);
      setError('Failed to update booking status.');
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;

    try {
      setError('');
      setUpdatingId(bookingId);

      await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      await fetchBookings();
    } catch (err) {
      console.error('Error deleting booking', err);
      setError('Failed to delete booking.');
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="admin-section">
        <p>Loading bookings...</p>
      </div>
    );
  }

  return (
    <div className="admin-section">
      <h2>Bookings Management</h2>
      {error && <p className="error">{error}</p>}

      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <div className="bookings-table">
          <table>
            <thead>
              <tr>
                <th>Guest</th>
                <th>Car</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Total Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => {
                const status = booking.status || 'pending';
                const statusStyle = getStatusStyle(status);

                return (
                  <tr key={booking._id}>
                    <td>{booking.name || booking.user?.name || 'N/A'}</td>
                    <td>
                      {booking.car?.brand} {booking.car?.model}
                    </td>
                    <td>
                      {booking.startDate
                        ? new Date(booking.startDate).toLocaleDateString()
                        : ''}
                    </td>
                    <td>
                      {booking.endDate
                        ? new Date(booking.endDate).toLocaleDateString()
                        : ''}
                    </td>
                    <td>{booking.totalPrice} TND</td>
                    <td>
                      <span
                        style={{
                          ...statusStyle,
                          padding: '4px 10px',
                          borderRadius: '999px',
                          fontSize: '12px',
                          fontWeight: 600,
                          display: 'inline-block',
                          textTransform: 'capitalize',
                        }}
                      >
                        {status}
                      </span>
                    </td>
                    <td>
                      {status === 'pending' && (
                        <>
                          <button
                            className="btn-success"
                            style={{ marginRight: '8px' }}
                            disabled={updatingId === booking._id}
                            onClick={() => updateStatus(booking._id, 'confirmed')}
                          >
                            {updatingId === booking._id ? 'Updating...' : 'Confirm'}
                          </button>
                          <button
                            className="btn-danger"
                            style={{ marginRight: '8px' }}
                            disabled={updatingId === booking._id}
                            onClick={() => updateStatus(booking._id, 'cancelled')}
                          >
                            {updatingId === booking._id ? 'Updating...' : 'Cancel'}
                          </button>
                        </>
                      )}

                      {status === 'confirmed' && (
                        <button
                          className="btn-danger"
                          style={{ marginRight: '8px' }}
                          disabled={updatingId === booking._id}
                          onClick={() => updateStatus(booking._id, 'cancelled')}
                        >
                          {updatingId === booking._id ? 'Updating...' : 'Cancel'}
                        </button>
                      )}

                      {/* Delete is always available for admin */}
                      <button
                        className="btn-delete"
                        disabled={updatingId === booking._id}
                        onClick={() => deleteBooking(booking._id)}
                      >
                        {updatingId === booking._id ? 'Deleting...' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
// src/components/Reservations.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const Reservations = ({ user }) => {
  const location = useLocation();

  // Support both navigation methods:
  //  1) navigate('/reservations', { state: { selectedCar } })
  //  2) /reservations?carId=xxxx
  const initialSelectedCar = location.state?.selectedCar || null;
  const searchParams = new URLSearchParams(location.search);
  const carIdFromQuery = searchParams.get('carId');

  const [selectedCar, setSelectedCar] = useState(initialSelectedCar);

  // Normalised user id (backend returns "id", Mongo docs use "_id")
  const userId = user?._id || user?.id || null;

  // Booking history state
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [bookingsError, setBookingsError] = useState('');

  // Form state
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [formValues, setFormValues] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ').slice(1).join(' ') || '',
    email: user?.email || '',
    phone: user?.phone || '',
    nationality: '',
    driverLicense: '',
    pickupDate: '',
    returnDate: '',
    pickupLocation: 'Tunis-Carthage Airport',
    specialRequests: '',
  });

  // Load bookings for the current user only
  useEffect(() => {
    const fetchBookings = async () => {
      // If there is no logged-in user, DO NOT fetch all bookings
      if (!userId) {
        setBookings([]);
        setBookingsError('');
        setLoadingBookings(false);
        return;
      }

      setLoadingBookings(true);
      setBookingsError('');

      try {
        const params = { user: userId };
        const res = await axios.get('/api/bookings', { params });
        setBookings(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error('Error loading bookings', err);
        setBookingsError('Failed to load your reservations.');
      } finally {
        setLoadingBookings(false);
      }
    };

    fetchBookings();
  }, [userId]);

  // If page was opened / reloaded with ?carId=..., fetch that car
  useEffect(() => {
    const fetchCar = async () => {
      if (selectedCar || !carIdFromQuery) return;

      try {
        const res = await axios.get(`/api/cars/${carIdFromQuery}`);
        setSelectedCar(res.data);
      } catch (err) {
        console.error('Error fetching car by id', err);
        // If error, leave selectedCar null and show placeholder
      }
    };

    fetchCar();
  }, [selectedCar, carIdFromQuery]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!selectedCar) {
      setFormError('Please select a vehicle from the Fleet page first.');
      return;
    }

    if (!formValues.pickupDate || !formValues.returnDate) {
      setFormError('Please select both pickup and return dates.');
      return;
    }

    const start = new Date(formValues.pickupDate);
    const end = new Date(formValues.returnDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || start >= end) {
      setFormError('Return date must be after pickup date.');
      return;
    }

    const msPerDay = 1000 * 60 * 60 * 24;
    const days = Math.max(1, Math.round((end - start) / msPerDay));
    const pricePerDay = Number(selectedCar.pricePerDay || 0);
    const totalPrice = days * pricePerDay;

    const payload = {
      car: selectedCar._id,
      startDate: formValues.pickupDate,
      endDate: formValues.returnDate,
      totalPrice,
    };

    if (userId) {
      payload.user = userId;
    } else {
      const fullName = `${formValues.firstName} ${formValues.lastName}`.trim();
      if (!fullName || !formValues.email) {
        setFormError('Name and email are required for reservation.');
        return;
      }
      payload.name = fullName;
      payload.email = formValues.email;
      payload.phone = formValues.phone;
    }

    try {
      setSubmitting(true);
      await axios.post('/api/bookings', payload);
      toast.success('Reservation submitted successfully!');
      setFormValues((prev) => ({
        ...prev,
        pickupDate: '',
        returnDate: '',
        specialRequests: '',
      }));

      // Reload bookings only if logged in
      if (userId) {
        const params = { user: userId };
        const res = await axios.get('/api/bookings', { params });
        setBookings(Array.isArray(res.data) ? res.data : []);
      }
    } catch (err) {
      console.error('Error submitting reservation', err);
      const msg = err.response?.data?.error || 'Could not submit reservation.';
      setFormError(msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Left column: selected vehicle */}
        <div style={styles.leftColumn}>
          <h2 style={styles.sectionTitle}>Select Your Vehicle</h2>

          {selectedCar ? (
            <div style={styles.selectedCard}>
              <div style={styles.selectedHeader}>
                <span style={styles.selectedTitle}>
                  {selectedCar.brand} {selectedCar.model}
                </span>
                <span style={styles.selectedClose}>×</span>
              </div>
              <div style={styles.selectedBody}>
                <div style={styles.selectedImageWrapper}>
                  <img
                    src={
                      selectedCar.imageUrl ||
                      'https://images.unsplash.com/photo-1549924231-f129b911e442?w=900&q=80&auto=format&fit=crop'
                    }
                    alt={selectedCar.model}
                    style={styles.selectedImage}
                  />
                </div>
                <div style={styles.selectedInfoGrid}>
                  <div style={styles.selectedInfoItem}>
                    <strong>Seats:</strong> {selectedCar.seatCount || '-'}
                  </div>
                  <div style={styles.selectedInfoItem}>
                    <strong>Transmission:</strong> {selectedCar.transmission || '-'}
                  </div>
                  <div style={styles.selectedInfoItem}>
                    <strong>Fuel:</strong> {selectedCar.fuelType || '-'}
                  </div>
                  <div style={styles.selectedInfoItem}>
                    <strong>Price:</strong> {selectedCar.pricePerDay} TND/day
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div style={styles.placeholderCard}>
              <p style={styles.placeholderText}>
                No vehicle selected yet. Go to the <strong>Fleet</strong> page and click
                <strong> Book Now</strong> on a car to start a reservation.
              </p>
            </div>
          )}
        </div>

        {/* Right column: reservation form */}
        <div style={styles.rightColumn}>
          <h2 style={styles.sectionTitle}>Reservation Details</h2>

          <form onSubmit={handleSubmit} style={styles.form}>
            {/* Personal Information */}
            <div style={styles.formSection}>
              <h3 style={styles.formSectionTitle}>Personal Information</h3>
              <div style={styles.twoColGrid}>
                <div style={styles.field}>
                  <label style={styles.label}>First Name *</label>
                  <input
                    name="firstName"
                    type="text"
                    value={formValues.firstName}
                    onChange={handleInputChange}
                    style={styles.input}
                  />
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Last Name *</label>
                  <input
                    name="lastName"
                    type="text"
                    value={formValues.lastName}
                    onChange={handleInputChange}
                    style={styles.input}
                  />
                </div>
              </div>

              <div style={styles.twoColGrid}>
                <div style={styles.field}>
                  <label style={styles.label}>Email *</label>
                  <input
                    name="email"
                    type="email"
                    value={formValues.email}
                    onChange={handleInputChange}
                    style={styles.input}
                  />
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Phone Number *</label>
                  <input
                    name="phone"
                    type="tel"
                    value={formValues.phone}
                    onChange={handleInputChange}
                    style={styles.input}
                  />
                </div>
              </div>

              <div style={styles.twoColGrid}>
                <div style={styles.field}>
                  <label style={styles.label}>Nationality</label>
                  <input
                    name="nationality"
                    type="text"
                    value={formValues.nationality}
                    onChange={handleInputChange}
                    style={styles.input}
                  />
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Driver License Number</label>
                  <input
                    name="driverLicense"
                    type="text"
                    value={formValues.driverLicense}
                    onChange={handleInputChange}
                    style={styles.input}
                  />
                </div>
              </div>
            </div>

            {/* Rental Details */}
            <div style={styles.formSection}>
              <h3 style={styles.formSectionTitle}>Rental Details</h3>
              <div style={styles.twoColGrid}>
                <div style={styles.field}>
                  <label style={styles.label}>Pickup Date *</label>
                  <input
                    name="pickupDate"
                    type="date"
                    value={formValues.pickupDate}
                    onChange={handleInputChange}
                    style={styles.input}
                  />
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Return Date *</label>
                  <input
                    name="returnDate"
                    type="date"
                    value={formValues.returnDate}
                    onChange={handleInputChange}
                    style={styles.input}
                  />
                </div>
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Pickup Location *</label>
                <select
                  name="pickupLocation"
                  value={formValues.pickupLocation}
                  onChange={handleInputChange}
                  style={styles.input}
                >
                  <option value="Tunis-Carthage Airport">Tunis-Carthage Airport</option>
                  <option value="Downtown Tunis">Downtown Tunis</option>
                  <option value="Sousse">Sousse</option>
                  <option value="Sfax">Sfax</option>
                </select>
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Special Requests</label>
                <textarea
                  name="specialRequests"
                  value={formValues.specialRequests}
                  onChange={handleInputChange}
                  rows={4}
                  style={styles.textarea}
                  maxLength={500}
                  placeholder="Any special requirements or additional information..."
                />
                <div style={styles.charCount}>
                  {formValues.specialRequests.length}/500 characters
                </div>
              </div>
            </div>

            {formError && <div style={styles.formError}>{formError}</div>}

            <button
              type="submit"
              style={styles.submitButton}
              disabled={submitting || !selectedCar}
            >
              {submitting ? 'Submitting...' : 'Submit Reservation'}
            </button>

            <p style={styles.disclaimer}>
              By submitting this form, you agree to our terms and conditions. No payment is required now –
              you&apos;ll pay in cash when you pick up your vehicle.
            </p>
          </form>
        </div>
      </div>

      {/* Booking history */}
      <div style={styles.historyCard}>
        <h2 style={styles.sectionTitle}>Your Reservations</h2>

        {/* If not logged in, don't show ANY bookings from other users */}
        {!userId ? (
          <p style={{ fontSize: '14px', color: '#4b5563' }}>
            Login to your account to see your reservations.
          </p>
        ) : loadingBookings ? (
          <p>Loading your reservations...</p>
        ) : bookingsError ? (
          <p style={{ color: '#b91c1c' }}>{bookingsError}</p>
        ) : bookings.length === 0 ? (
          <p>You don&apos;t have any reservations yet.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Car</th>
                  <th style={styles.th}>Pickup</th>
                  <th style={styles.th}>Return</th>
                  <th style={styles.th}>Total Price</th>
                  <th style={styles.th}>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b._id}>
                    <td style={styles.td}>
                      {b.car?.brand || 'N/A'} {b.car?.model || ''}
                    </td>
                    <td style={styles.td}>{b.startDate ? b.startDate.slice(0, 10) : ''}</td>
                    <td style={styles.td}>{b.endDate ? b.endDate.slice(0, 10) : ''}</td>
                    <td style={styles.td}>{b.totalPrice}</td>
                    <td style={styles.td}>{b.status || 'pending'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: '#f3f4f6',
    padding: '24px 0 40px',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 16px',
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 2fr)',
    gap: '20px',
  },
  leftColumn: {
    minWidth: 0,
  },
  rightColumn: {
    minWidth: 0,
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: 600,
    marginBottom: '12px',
  },
  selectedCard: {
    borderRadius: '10px',
    border: '2px solid #2563eb',
    backgroundColor: '#ffffff',
    boxShadow: '0 12px 30px rgba(15,23,42,0.12)',
  },
  selectedHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 14px',
    borderBottom: '1px solid #e5e7eb',
  },
  selectedTitle: {
    fontWeight: 600,
  },
  selectedClose: {
    cursor: 'default',
    fontSize: '18px',
    color: '#9ca3af',
  },
  selectedBody: {
    display: 'flex',
    flexDirection: 'column',
    padding: '10px 14px 14px',
    gap: '10px',
  },
  selectedImageWrapper: {
    borderRadius: '8px',
    overflow: 'hidden',
  },
  selectedImage: {
    width: '100%',
    height: '140px',
    objectFit: 'cover',
  },
  selectedInfoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '6px',
    marginTop: '6px',
    fontSize: '13px',
  },
  selectedInfoItem: {
    color: '#374151',
  },
  placeholderCard: {
    borderRadius: '10px',
    border: '1px dashed #9ca3af',
    backgroundColor: '#f9fafb',
    padding: '16px',
  },
  placeholderText: {
    fontSize: '14px',
    color: '#4b5563',
  },
  form: {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    padding: '16px 18px 18px',
    boxShadow: '0 12px 30px rgba(15,23,42,0.12)',
  },
  formSection: {
    marginBottom: '16px',
  },
  formSectionTitle: {
    fontSize: '15px',
    fontWeight: 600,
    marginBottom: '8px',
  },
  twoColGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '10px',
  },
  field: {
    marginBottom: '10px',
  },
  label: {
    display: 'block',
    fontSize: '12px',
    fontWeight: 500,
    marginBottom: '4px',
    color: '#374151',
  },
  input: {
    width: '100%',
    padding: '8px 10px',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    fontSize: '13px',
  },
  textarea: {
    width: '100%',
    padding: '8px 10px',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    fontSize: '13px',
    resize: 'vertical',
  },
  charCount: {
    marginTop: '4px',
    fontSize: '11px',
    color: '#9ca3af',
    textAlign: 'right',
  },
  formError: {
    marginTop: '6px',
    marginBottom: '6px',
    fontSize: '13px',
    color: '#b91c1c',
  },
  submitButton: {
    width: '100%',
    padding: '10px 16px',
    borderRadius: '999px',
    border: 'none',
    fontSize: '14px',
    fontWeight: 600,
    backgroundColor: '#2563eb',
    color: '#ffffff',
    cursor: 'pointer',
    marginTop: '4px',
  },
  disclaimer: {
    marginTop: '10px',
    fontSize: '12px',
    color: '#6b7280',
  },
  historyCard: {
    maxWidth: '1200px',
    margin: '24px auto 0',
    padding: '0 16px 0',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '13px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 10px 25px rgba(15,23,42,0.12)',
  },
  th: {
    textAlign: 'left',
    padding: '10px 12px',
    backgroundColor: '#f3f4f6',
    borderBottom: '1px solid #e5e7eb',
  },
  td: {
    padding: '8px 12px',
    borderBottom: '1px solid #e5e7eb',
  },
};

export default Reservations;
import React, { useState } from 'react';
import { createBooking } from '../api';
import { toast } from 'react-toastify';

const BookingForm = ({ car, userId, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [msg, setMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const days = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) || 1;
      const bookingData = {
        car: car._id,
        startDate,
        endDate,
        totalPrice: car.pricePerDay * days,
      };
      if (userId) {
        bookingData.user = userId;
      } else {
        bookingData.name = name;
        bookingData.email = email;
        bookingData.phone = phone;
      }

      await createBooking(bookingData);
      setSuccess(true);
      setMsg('Your booking was successful! Check your email for confirmation.');

      // Toast notification
      toast.success('Booking confirmed!');

      setTimeout(() => {
        setSuccess(false);
        setMsg('');
        onClose();
      }, 3000);
    } catch (err) {
      setMsg('Error: ' + (err.response?.data?.error || err.message));
      toast.error('Booking failed: ' + (err.response?.data?.error || err.message));
    }
  };

  if (success) {
    return (
      <div style={{ background: "#e0ffe0", padding: 16, borderRadius: 8, textAlign: 'center' }}>
        <h3>Booking Confirmed!</h3>
        <p>{msg}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ background: "#f9f9f9", padding: 16, borderRadius: 8 }}>
      <h3>Book {car.brand} {car.model}</h3>
      {!userId && (
        <>
          <input required placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
          <input required type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <input placeholder="Phone (optional)" value={phone} onChange={e => setPhone(e.target.value)} />
        </>
      )}
      <input required type="date" placeholder="Start Date" value={startDate} onChange={e => setStartDate(e.target.value)} />
      <input required type="date" placeholder="End Date" value={endDate} onChange={e => setEndDate(e.target.value)} />
      <button type="submit">Confirm Booking</button>
      {msg && !success && <p style={{ color: 'red' }}>{msg}</p>}
    </form>
  );
};

export default BookingForm;
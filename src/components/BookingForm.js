import React, { useState } from 'react';
import { createBooking } from '../api';
import { toast } from 'react-toastify';
import { FaCheckCircle } from 'react-icons/fa';
import DatePicker from 'react-datepicker';         // <--- new import!
import 'react-datepicker/dist/react-datepicker.css';

const today = new Date();

const BookingForm = ({ car, user, onClose }) => {
  // ...rest of useState...
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [startDate, setStartDate] = useState(null); // Now these are Date objects!
  const [endDate, setEndDate] = useState(null);
  const [msg, setMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      setMsg('Start and end dates are required.');
      return;
    }
    if (endDate < startDate) {
      setMsg('End date must be after start date.');
      return;
    }

    // format as YYYY-MM-DD for backend
    const format = d => d.toISOString().split('T')[0];
    const bookingData = {
      car: car._id,
      startDate: format(startDate),
      endDate: format(endDate),
      totalPrice: car.pricePerDay * (Math.ceil((endDate - startDate) / (1000*60*60*24)) || 1),
    };

    if (user) {
      bookingData.user = user.id;
      bookingData.id = user.id;
      bookingData.name = user.name;
      bookingData.email = user.email;
      bookingData.phone = user.phone || '';
    } else {
      bookingData.name = name;
      bookingData.email = email;
      bookingData.phone = phone;
    }

    try {
      await createBooking(bookingData);
      setSuccess(true);
      setMsg('Reservation successful! We\'ll send you a confirmation email soon.');
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
    // ...your animated confirmation UI...
    return (
      <div style={{
        background: "#e0ffe0",
        padding: 28,
        borderRadius: 12,
        textAlign: 'center',
        boxShadow: "0px 6px 24px #ddd",
        animation: "fadeIn 0.7s"
      }}>
        <FaCheckCircle size={50} color="#4caf50" style={{ marginBottom: 10 }} />
        <h2 style={{ color: "#388e3c", marginTop: 12, marginBottom: 8, fontWeight: 700 }}>Thank you for your reservation!</h2>
        <p style={{ fontSize: 17 }}>{msg}</p>
        <p style={{ color: "#555", marginTop: 10, marginBottom: 12 }}>
          Your booking for <b>{car.brand} {car.model}</b> is being processed.<br />
          You will receive a confirmation email soon.<br />
          If you have questions, please contact support!
        </p>
        <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px);}
            to { opacity: 1; transform: translateY(0);}
          }
        `}
        </style>
      </div>
    );
  }

  const inputStyle = {
    width: "100%", marginBottom: 10, padding: 8,
    borderRadius: 5, border: "1px solid #dadada"
  };

  return (
    <form onSubmit={handleSubmit} style={{
      background: "#f9f9f9",
      padding: 16,
      borderRadius: 8,
      boxShadow: "0px 2px 16px #ececec"
    }}>
      <h3>Book {car.brand} {car.model}</h3>
      {!user && (
        <>
          <input required placeholder="Name" value={name} onChange={e => setName(e.target.value)} style={inputStyle} />
          <input required type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
          <input placeholder="Phone (optional)" value={phone} onChange={e => setPhone(e.target.value)} style={inputStyle} />
        </>
      )}
      <label style={{ fontWeight: 500, color: "#222", display: 'block', marginBottom: 6 }}>Start Date</label>
      <DatePicker
        selected={startDate}
        onChange={date => setStartDate(date)}
        minDate={today}
        dateFormat="dd-MM-yyyy"
        placeholderText="Click to select a start date"
        style={inputStyle}
        className="custom-datepicker"
        required
      />
      <label style={{ fontWeight: 500, color: "#222", display: 'block', margin: '12px 0 6px' }}>End Date</label>
      <DatePicker
        selected={endDate}
        onChange={date => setEndDate(date)}
        minDate={startDate || today}
        dateFormat="dd-MM-yyyy"
        placeholderText="Click to select an end date"
        style={inputStyle}
        className="custom-datepicker"
        required
      />

      <button type="submit" style={{
        width: "100%",
        padding: 10,
        background: "#43a047",
        color: "#fff",
        fontWeight: 600,
        border: "none",
        borderRadius: 8,
        fontSize: 18,
        cursor: "pointer",
        marginTop: 8,
        transition: "background 0.2s"
      }}>Confirm Booking</button>
      {msg && !success && <p style={{ color: 'red', marginTop: 10 }}>{msg}</p>}
      <style>{`
        .custom-datepicker {
          width: 100%;
          margin-bottom: 10px;
          padding: 8px;
          border-radius: 5px;
          border: 1px solid #dadada;
          font-size: 16px;
        }
      `}</style>
    </form>
  );
};

export default BookingForm;
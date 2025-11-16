import React, { useState } from 'react';
import BookingForm from './BookingForm';

const CarCard = ({ car, userId }) => {
  const [showBooking, setShowBooking] = useState(false);
  return (
    <div style={{ border: '1px solid #ccc', margin: 8, padding: 12, borderRadius: 8 }}>
      <h3>{car.brand} {car.model} ({car.year})</h3>
      <img src={car.imageUrl} alt={car.model} style={{ width: 200, height: 120, objectFit: 'cover' }} />
      <p>Price: ${car.pricePerDay}/day</p>
      <p>Color: {car.color}</p>
      <p>Features: {car.features && car.features.join(', ')}</p>
      <button onClick={() => setShowBooking((v) => !v)}>
        {showBooking ? 'Cancel' : 'Book Now'}
      </button>
      {showBooking && (
        <BookingForm car={car} userId={userId} onClose={() => setShowBooking(false)} />
      )}
    </div>
  );
};

export default CarCard;
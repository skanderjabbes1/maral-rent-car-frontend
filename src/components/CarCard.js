// src/components/CarCard.js
import React from 'react';
import { FaUserFriends, FaCogs, FaGasPump, FaPalette } from 'react-icons/fa';
import './CarCard.css';

const CarCard = ({ car }) => {
  if (!car) return null;

  const {
    _id,
    brand,
    model,
    year,
    pricePerDay,
    imageUrl,
    fuelType,
    transmission,
    seatCount,
    color,
    features,
    isAvailable,
  } = car;

  const isBooked = isAvailable === false;
  const availabilityLabel = isBooked ? 'Booked' : 'Available';

  const handleBookNow = () => {
    if (!_id || isBooked) return;
    // Force full navigation so we don't rely on React Router's internal state
    window.location.href = `/reservations?carId=${_id}`;
  };

  return (
    <article className="fleet-card">
      <div className="fleet-card-image-wrapper">
        <img
          src={
            imageUrl ||
            'https://images.unsplash.com/photo-1549924231-f129b911e442?w=900&q=80&auto=format&fit=crop'
          }
          alt={`${brand || ''} ${model || ''}`}
          className="fleet-card-image"
        />
        <span
          className={
            isBooked
              ? 'fleet-card-status fleet-card-status--booked'
              : 'fleet-card-status fleet-card-status--available'
          }
        >
          {availabilityLabel}
        </span>
      </div>

      <div className="fleet-card-body">
        <div className="fleet-card-header">
          <div>
            <h3 className="fleet-card-title">
              {brand} {model}
            </h3>
            <p className="fleet-card-subtitle">
              {brand} {model} {year ? `(${year})` : ''}
            </p>
          </div>
          <div className="fleet-card-price-block">
            <span className="fleet-card-price">
              {pricePerDay ? `${pricePerDay} TND` : '--'}
            </span>
            <span className="fleet-card-price-unit">per day</span>
          </div>
        </div>

        <div className="fleet-card-specs-row">
          {seatCount && (
            <span className="fleet-card-spec">
              <FaUserFriends className="fleet-card-spec-icon" />
              {seatCount} Seats
            </span>
          )}
          {transmission && (
            <span className="fleet-card-spec">
              <FaCogs className="fleet-card-spec-icon" />
              {transmission}
            </span>
          )}
          {fuelType && (
            <span className="fleet-card-spec">
              <FaGasPump className="fleet-card-spec-icon" />
              {fuelType}
            </span>
          )}
          {color && (
            <span className="fleet-card-spec">
              <FaPalette className="fleet-card-spec-icon" />
              {color}
            </span>
          )}
        </div>

        {Array.isArray(features) && features.length > 0 && (
          <div className="fleet-card-features">
            <p className="fleet-card-features-title">Key Features</p>
            <div className="fleet-card-tags">
              {features.slice(0, 3).map((feature, idx) => (
                <span key={idx} className="fleet-card-tag">
                  {feature}
                </span>
              ))}
              {features.length > 3 && (
                <span className="fleet-card-tag fleet-card-tag--muted">
                  +{features.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        <div className="fleet-card-footer">
          <button
            type="button"
            className={
              isBooked
                ? 'fleet-card-btn fleet-card-btn--disabled'
                : 'fleet-card-btn'
            }
            disabled={isBooked}
            onClick={handleBookNow}
          >
            {isBooked ? 'Currently Booked' : 'Book Now'}
          </button>
        </div>
      </div>
    </article>
  );
};

export default CarCard;
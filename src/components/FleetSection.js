import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const fleetCategories = [
  {
    image: 'https://images.unsplash.com/photo-1590362891990-f8ddb41d3a3f?w=500',
    title: 'Compact Cars',
    description: 'Perfect for city exploration and fuel efficiency',
    price: 'From 40 TND/day',
  },
  {
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c3dec1806?w=500',
    title: 'SUVs & Crossovers',
    description: 'Spacious and comfortable for family trips',
    price: 'From 85 TND/day',
  },
  {
    image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=500',
    title: 'Luxury & Sports',
    description: 'Premium vehicles for special occasions',
    price: 'From 110 TND/day',
  },
];

export default function FleetSection() {
  const navigate = useNavigate();

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Our Premium Fleet</h2>
        <p style={styles.subheading}>
          From compact city cars to spacious SUVs, we have the perfect vehicle for your Tunisia adventure.
        </p>

        <div style={styles.grid}>
          {fleetCategories.map((car, idx) => (
            <div key={idx} style={styles.card}>
              <img src={car.image} alt={car.title} style={styles.image} />
              <div style={styles.cardContent}>
                <h3 style={styles.cardTitle}>{car.title}</h3>
                <p style={styles.cardDesc}>{car.description}</p>
                <p style={styles.price}>{car.price}</p>
              </div>
            </div>
          ))}
        </div>

        <button style={styles.viewAllBtn} onClick={() => navigate('/fleet')}>
          View Complete Fleet <FaArrowRight size={14} style={{ marginLeft: '8px' }} />
        </button>
      </div>
    </section>
  );
}

const styles = {
  section: {
    backgroundColor: '#FFFFFF',
    padding: '60px 20px',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  heading: {
    fontSize: '42px',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: '15px',
    color: '#1A1A1A',
  },
  subheading: {
    fontSize: '16px',
    textAlign: 'center',
    color: '#6B7280',
    marginBottom: '40px',
    maxWidth: '600px',
    margin: '0 auto 40px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
    marginBottom: '40px',
  },
  card: {
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  image: {
    width: '100%',
    height: '250px',
    objectFit: 'cover',
  },
  cardContent: {
    padding: '20px',
    backgroundColor: '#F8F9FA',
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '8px',
    color: '#1A1A1A',
  },
  cardDesc: {
    fontSize: '14px',
    color: '#6B7280',
    marginBottom: '10px',
  },
  price: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#4A90E2',
  },
  viewAllBtn: {
    backgroundColor: '#4A90E2',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
};

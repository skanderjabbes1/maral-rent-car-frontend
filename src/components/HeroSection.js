import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCar, FaCalendarAlt } from 'react-icons/fa';

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section style={styles.hero}>
      <div style={styles.overlay}></div>
      <div style={styles.content}>
        <h1 style={styles.title}>
          Explore Tunisia with <span style={styles.highlight}>Top Rent Car</span>
        </h1>
        <p style={styles.subtitle}>
          Your trusted global car rental partner in Tunisia. Premium vehicles, exceptional service, and the convenience of paying cash on arrival.
        </p>
        <div style={styles.buttons}>
          <button style={styles.primaryBtn} onClick={() => navigate('/fleet')}>
            <FaCar size={18} style={{ marginRight: '8px' }} />
            View Our Fleet
          </button>
          <button style={styles.secondaryBtn} onClick={() => navigate('/fleet')}>
            <FaCalendarAlt size={18} style={{ marginRight: '8px' }} />
            Book Now
          </button>
        </div>
      </div>
    </section>
  );
}

const styles = {
  hero: {
    position: 'relative',
    height: '70vh',
    backgroundImage: 'url(https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(30, 90, 150, 0.6)',
  },
  content: {
    position: 'relative',
    zIndex: 2,
    textAlign: 'center',
    color: 'white',
    maxWidth: '700px',
    padding: '20px',
  },
  title: {
    fontSize: '56px',
    fontWeight: '700',
    marginBottom: '20px',
    lineHeight: '1.2',
  },
  highlight: {
    color: '#6DB3F2',
  },
  subtitle: {
    fontSize: '18px',
    marginBottom: '30px',
    lineHeight: '1.6',
  },
  buttons: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  primaryBtn: {
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
  },
  secondaryBtn: {
    backgroundColor: 'white',
    color: '#333333',
    border: '2px solid white',
    padding: '12px 24px',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s',
    display: 'flex',
    alignItems: 'center',
  },
};
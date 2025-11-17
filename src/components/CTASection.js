import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPhone } from 'react-icons/fa';

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Ready to Explore Tunisia?</h2>
        <p style={styles.description}>
          Book your perfect rental car today and start your Tunisian adventure with confidence.
        </p>

        <div style={styles.buttons}>
          <button style={styles.primaryBtn} onClick={() => navigate('/fleet')}>
            Book Now
          </button>
          <button style={styles.secondaryBtn}>
            <FaPhone size={16} style={{ marginRight: '8px' }} />
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    backgroundColor: '#4A90E2',
    padding: '80px 20px',
    textAlign: 'center',
  },
  container: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  heading: {
    fontSize: '48px',
    fontWeight: '700',
    color: 'white',
    marginBottom: '15px',
  },
  description: {
    fontSize: '18px',
    color: 'rgba(255,255,255,0.9)',
    marginBottom: '40px',
    lineHeight: '1.6',
  },
  buttons: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  primaryBtn: {
    backgroundColor: 'white',
    color: '#333333',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  secondaryBtn: {
    backgroundColor: 'transparent',
    color: 'white',
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
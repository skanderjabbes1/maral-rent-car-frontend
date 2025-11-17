import React from 'react';
import { FaCar, FaShieldAlt, FaMoneyBillWave, FaHeadset } from 'react-icons/fa';

const features = [
  {
    icon: <FaCar size={40} color="#4A90E2" />,
    title: 'Premium Fleet',
    description: 'Choose from our extensive collection of well-maintained, modern vehicles suitable for every journey in Tunisia.',
  },
  {
    icon: <FaShieldAlt size={40} color="#4A90E2" />,
    title: 'Trusted Service',
    description: 'With years of experience serving international travelers, we provide reliable and professional car rental services.',
  },
  {
    icon: <FaMoneyBillWave size={40} color="#4A90E2" />,
    title: 'Pay on Arrival',
    description: 'Convenient cash payment option upon arrival in Tunisia. No upfront payment required for your booking.',
  },
  {
    icon: <FaHeadset size={40} color="#4A90E2" />,
    title: '24/7 Support',
    description: 'Our dedicated customer support team is available around the clock to assist you during your rental period.',
  },
];

export default function FeaturesSection() {
  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Why Choose Top Rent Car?</h2>
        <p style={styles.subheading}>
          We provide exceptional car rental services tailored for international travelers exploring the beauty of Tunisia.
        </p>

        <div style={styles.grid}>
          {features.map((feature, idx) => (
            <div key={idx} style={styles.card}>
              <div style={styles.iconBox}>{feature.icon}</div>
              <h3 style={styles.cardTitle}>{feature.title}</h3>
              <p style={styles.cardDesc}>{feature.description}</p>
            </div>
          ))}
        </div>
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: '#F8F9FA',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    textAlign: 'center',
  },
  iconBox: {
    marginBottom: '15px',
    backgroundColor: '#E3F2FD',
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 15px',
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '10px',
    color: '#1A1A1A',
  },
  cardDesc: {
    fontSize: '14px',
    color: '#6B7280',
    lineHeight: '1.6',
  },
};
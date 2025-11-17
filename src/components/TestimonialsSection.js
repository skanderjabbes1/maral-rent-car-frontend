import React from 'react';
import { FaStar } from 'react-icons/fa';

const testimonials = [
  {
    text: '"Excellent service! The car was in perfect condition and the staff was very helpful. Highly recommend for anyone visiting Tunisia."',
    author: 'Sarah Johnson',
    country: 'United Kingdom',
    rating: 5,
  },
  {
    text: '"Great experience with Top Rent Car. Easy booking process and the pay-on-arrival option made everything so convenient."',
    author: 'Marco Rossi',
    country: 'Italy',
    rating: 5,
  },
  {
    text: '"Professional service and competitive prices. The car helped us explore Tunisia comfortably and safely."',
    author: 'Emma Schmidt',
    country: 'Germany',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <h2 style={styles.heading}>What Our Customers Say</h2>
        <p style={styles.subheading}>
          Trusted by thousands of international travelers
        </p>

        <div style={styles.grid}>
          {testimonials.map((testimonial, idx) => (
            <div key={idx} style={styles.card}>
              <div style={styles.stars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar key={star} size={16} color="#FFB800" />
                ))}
              </div>
              <p style={styles.text}>{testimonial.text}</p>
              <p style={styles.author}>{testimonial.author}</p>
              <p style={styles.country}>{testimonial.country}</p>
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
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: '#F8F9FA',
    padding: '24px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  stars: {
    display: 'flex',
    gap: '4px',
    marginBottom: '15px',
  },
  text: {
    fontSize: '15px',
    color: '#6B7280',
    fontStyle: 'italic',
    marginBottom: '15px',
    lineHeight: '1.6',
  },
  author: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: '5px',
  },
  country: {
    fontSize: '14px',
    color: '#6B7280',
  },
};
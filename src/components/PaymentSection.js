import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const paymentBenefits = [
  'No upfront payment required',
  'Pay in Tunisian Dinars or major currencies',
  'Secure reservation with just your details',
  'Flexible cancellation policy',
];

export default function PaymentSection() {
  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.content}>
          <div style={styles.textContent}>
            <h2 style={styles.heading}>Pay Cash on Arrival</h2>
            <p style={styles.description}>
              We understand the convenience international travelers need. That's why we offer the option to pay in cash when you arrive in Tunisia.
            </p>

            <div style={styles.benefits}>
              {paymentBenefits.map((benefit, idx) => (
                <div key={idx} style={styles.benefit}>
                  <span style={styles.checkmark}>
                    <FaCheckCircle size={18} color="#10B981" />
                  </span>
                  <span style={styles.benefitText}>{benefit}</span>
                </div>
              ))}
            </div>

            <button style={styles.learnMoreBtn}>
              Learn More About Payment →
            </button>
          </div>

          <div style={styles.imageContent}>
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop"
              alt="Payment"
              style={styles.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    backgroundColor: '#E3F2FD',
    padding: '60px 20px',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '40px',
    alignItems: 'center',
  },
  textContent: {
    paddingRight: '20px',
  },
  heading: {
    fontSize: '32px',
    fontWeight: '700',
    marginBottom: '15px',
    color: '#1A1A1A',
  },
  description: {
    fontSize: '16px',
    color: '#6B7280',
    marginBottom: '25px',
    lineHeight: '1.6',
  },
  benefits: {
    marginBottom: '25px',
  },
  benefit: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '12px',
  },
  checkmark: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  benefitText: {
    fontSize: '15px',
    color: '#333333',
  },
  learnMoreBtn: {
    backgroundColor: 'transparent',
    color: '#4A90E2',
    border: '2px solid #4A90E2',
    padding: '12px 24px',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  imageContent: {
    textAlign: 'center',
  },
  image: {
    width: '100%',
    maxWidth: '400px',
    borderRadius: '8px',
  },
};
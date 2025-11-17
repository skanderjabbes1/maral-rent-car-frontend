import React from 'react';
import { FaCar, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.grid}>
          {/* Column 1 - About */}
          <div style={styles.column}>
            <div style={styles.logo}>
              <div style={styles.logoIcon}>
                <FaCar size={20} color="white" />
              </div>
              <span style={styles.logoText}>Top Rent Car</span>
            </div>
            <p style={styles.description}>
              Your trusted global car rental partner in Tunisia. We provide premium vehicles and exceptional service for travelers exploring the beautiful landscapes of Tunisia.
            </p>
            <div style={styles.social}>
              <a href="#facebook" style={styles.socialLink} title="Facebook">
                <FaFacebook size={16} />
              </a>
              <a href="#twitter" style={styles.socialLink} title="Twitter">
                <FaTwitter size={16} />
              </a>
              <a href="#instagram" style={styles.socialLink} title="Instagram">
                <FaInstagram size={16} />
              </a>
              <a href="#linkedin" style={styles.socialLink} title="LinkedIn">
                <FaLinkedin size={16} />
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div style={styles.column}>
            <h3 style={styles.columnTitle}>Quick Links</h3>
            <ul style={styles.linkList}>
              <li><a href="/" style={styles.link}>Home</a></li>
              <li><a href="/fleet" style={styles.link}>Our Fleet</a></li>
              <li><a href="#booking" style={styles.link}>Book Now</a></li>
              <li><a href="#payment" style={styles.link}>Payment Info</a></li>
              <li><a href="#contact" style={styles.link}>Contact Us</a></li>
            </ul>
          </div>

          {/* Column 3 - Contact Info */}
          <div style={styles.column}>
            <h3 style={styles.columnTitle}>Contact Info</h3>
            <div style={styles.contactItem}>
              <FaPhone size={16} style={styles.contactIcon} />
              <a href="tel:+21670123456" style={styles.contactLink}>+216 70 123 456</a>
            </div>
            <div style={styles.contactItem}>
              <FaEnvelope size={16} style={styles.contactIcon} />
              <a href="mailto:info@toprentcar.tn" style={styles.contactLink}>info@toprentcar.tn</a>
            </div>
            <div style={styles.contactItem}>
              <FaMapMarkerAlt size={16} style={styles.contactIcon} />
              <span style={styles.contactText}>Tunis, Tunisia</span>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div style={styles.bottom}>
          <p style={styles.copyright}>© 2024 Top Rent Car. All rights reserved.</p>
          <p style={styles.powered}>Powered by Readdy</p>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: '#1B3A5C',
    color: '#E0E7FF',
    padding: '60px 20px 20px',
    marginTop: '60px',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '40px',
    marginBottom: '40px',
    paddingBottom: '40px',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
  },
  column: {
    color: '#B0BEC5',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '15px',
  },
  logoIcon: {
    width: '36px',
    height: '36px',
    backgroundColor: '#4A90E2',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#FFFFFF',
  },
  description: {
    fontSize: '14px',
    lineHeight: '1.6',
    marginBottom: '15px',
    color: '#B0BEC5',
  },
  social: {
    display: 'flex',
    gap: '15px',
  },
  socialLink: {
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(74, 144, 226, 0.2)',
    borderRadius: '50%',
    color: '#4A90E2',
    textDecoration: 'none',
    transition: 'all 0.3s',
    cursor: 'pointer',
  },
  columnTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: '15px',
  },
  linkList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  link: {
    color: '#B0BEC5',
    textDecoration: 'none',
    fontSize: '14px',
    transition: 'color 0.3s',
    display: 'block',
    marginBottom: '10px',
    cursor: 'pointer',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    marginBottom: '12px',
  },
  contactIcon: {
    marginTop: '2px',
    flexShrink: 0,
    color: '#4A90E2',
  },
  contactLink: {
    color: '#B0BEC5',
    textDecoration: 'none',
    fontSize: '14px',
    transition: 'color 0.3s',
    cursor: 'pointer',
  },
  contactText: {
    color: '#B0BEC5',
    fontSize: '14px',
  },
  bottom: {
    textAlign: 'center',
    paddingTop: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '15px',
  },
  copyright: {
    fontSize: '13px',
    color: '#90A4AE',
    margin: 0,
  },
  powered: {
    fontSize: '13px',
    color: '#90A4AE',
    margin: 0,
  },
};
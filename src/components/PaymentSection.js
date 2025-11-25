import React from 'react';
import {
  FaCalendarCheck,
  FaEnvelopeOpenText,
  FaPlaneArrival,
  FaMoneyBillWave,
  FaHandHoldingUsd,
  FaIdCard,
  FaPassport,
  FaUser,
  FaPhoneAlt,
} from 'react-icons/fa';
import './PaymentSection.css';

const PaymentSection = () => {
  return (
    <div className="payment-page">
      {/* Hero */}
      <section className="payment-hero">
        <div className="payment-container">
          <h1 className="payment-hero-title">Payment Information</h1>
          <p className="payment-hero-subtitle">
            Simple, secure, and convenient payment process. Pay in cash when you arrive in Tunisia –
            no upfront payment required.
          </p>
        </div>
      </section>

      {/* How Payment Works */}
      <section className="payment-section payment-section-light">
        <div className="payment-container">
          <h2 className="payment-section-title">How Payment Works</h2>
          <p className="payment-section-subtitle">
            Our cash-on-arrival payment system is designed for the convenience of international travelers
            visiting Tunisia.
          </p>

          <div className="payment-steps">
            <div className="payment-step">
              <div className="payment-step-icon">
                <FaCalendarCheck />
              </div>
              <h3 className="payment-step-title">Make Your Reservation</h3>
              <p className="payment-step-text">
                Book your preferred vehicle online through our secure reservation system. No payment
                required at this stage.
              </p>
            </div>

            <div className="payment-step">
              <div className="payment-step-icon">
                <FaEnvelopeOpenText />
              </div>
              <h3 className="payment-step-title">Confirmation &amp; Preparation</h3>
              <p className="payment-step-text">
                Receive confirmation email with pickup details. Prepare required documents: valid driver
                license and passport.
              </p>
            </div>

            <div className="payment-step">
              <div className="payment-step-icon">
                <FaPlaneArrival />
              </div>
              <h3 className="payment-step-title">Arrival in Tunisia</h3>
              <p className="payment-step-text">
                Upon arrival, visit our location at the agreed time and place for vehicle inspection and
                documentation.
              </p>
            </div>

            <div className="payment-step">
              <div className="payment-step-icon">
                <FaMoneyBillWave />
              </div>
              <h3 className="payment-step-title">Cash Payment &amp; Pickup</h3>
              <p className="payment-step-text">
                Pay the rental amount in cash (TND or accepted currencies) and receive your vehicle keys
                to start exploring.
              </p>
            </div>

            <div className="payment-step">
              <div className="payment-step-icon">
                <FaHandHoldingUsd />
              </div>
              <h3 className="payment-step-title">Security Deposit</h3>
              <p className="payment-step-text">
                A refundable security deposit may be required depending on the vehicle category and rental
                period.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Accepted Currencies */}
      <section className="payment-section">
        <div className="payment-container">
          <h2 className="payment-section-title">Accepted Currencies</h2>
          <p className="payment-section-subtitle">
            We accept multiple currencies for your convenience.
          </p>

          <div className="payment-currency-grid">
            <div className="payment-currency-card payment-currency-card--preferred">
              <div className="payment-currency-badge">Preferred</div>
              <div className="payment-currency-code">TN</div>
              <div className="payment-currency-name">Tunisian Dinar</div>
              <div className="payment-currency-short">TND</div>
            </div>

            <div className="payment-currency-card">
              <div className="payment-currency-code">EU</div>
              <div className="payment-currency-name">Euro</div>
              <div className="payment-currency-short">EUR</div>
            </div>

            <div className="payment-currency-card">
              <div className="payment-currency-code">US</div>
              <div className="payment-currency-name">US Dollar</div>
              <div className="payment-currency-short">USD</div>
            </div>

            <div className="payment-currency-card">
              <div className="payment-currency-code">GB</div>
              <div className="payment-currency-name">British Pound</div>
              <div className="payment-currency-short">GBP</div>
            </div>
          </div>

          <div className="payment-info-box">
            <h3 className="payment-info-box-title">Currency Exchange Information</h3>
            <ul className="payment-info-list">
              <li>Exchange rates are calculated at the current market rate on the day of payment.</li>
              <li>Tunisian Dinar (TND) is preferred to avoid exchange rate fluctuations.</li>
              <li>
                Currency exchange services are available at airports and banks in Tunisia.
              </li>
              <li>
                We provide clear exchange rate information before finalizing payment.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Required Documents */}
      <section className="payment-section payment-section-light">
        <div className="payment-container">
          <h2 className="payment-section-title">Required Documents</h2>
          <p className="payment-section-subtitle">
            Please prepare these documents for your vehicle pickup.
          </p>

          <div className="payment-docs-grid">
            <div className="payment-doc-card">
              <div className="payment-doc-icon">
                <FaIdCard />
              </div>
              <div>
                <h3 className="payment-doc-title">Valid Driver License</h3>
                <p className="payment-doc-text">
                  International driving permit or valid license from your home country.
                </p>
              </div>
            </div>

            <div className="payment-doc-card">
              <div className="payment-doc-icon">
                <FaPassport />
              </div>
              <div>
                <h3 className="payment-doc-title">Passport</h3>
                <p className="payment-doc-text">
                  Valid passport as primary identification document.
                </p>
              </div>
            </div>

            <div className="payment-doc-card">
              <div className="payment-doc-icon">
                <FaUser />
              </div>
              <div>
                <h3 className="payment-doc-title">Proof of Age</h3>
                <p className="payment-doc-text">
                  Must be 21 years or older (some vehicles require 25+).
                </p>
              </div>
            </div>

            <div className="payment-doc-card">
              <div className="payment-doc-icon">
                <FaPhoneAlt />
              </div>
              <div>
                <h3 className="payment-doc-title">Contact Information</h3>
                <p className="payment-doc-text">
                  Local contact number or hotel information in Tunisia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Deposit */}
      <section className="payment-section">
        <div className="payment-container">
          <div className="payment-deposit-card">
            <h2 className="payment-deposit-title">Security Deposit Information</h2>
            <p className="payment-deposit-subtitle">
              Understanding our security deposit policy.
            </p>

            <div className="payment-deposit-grid">
              <div>
                <h3 className="payment-deposit-column-title">Deposit Requirements</h3>
                <ul className="payment-deposit-list">
                  <li>Compact cars: 700–900 TND</li>
                  <li>SUVs: 1000–1400 TND</li>
                  <li>Luxury cars: 1500+ TND</li>
                  <li>Refunded upon vehicle return in good condition.</li>
                </ul>
              </div>
              <div>
                <h3 className="payment-deposit-column-title">What&apos;s Covered</h3>
                <ul className="payment-deposit-list">
                  <li>Vehicle damage protection (within policy limits).</li>
                  <li>Fuel level guarantee.</li>
                  <li>Late return fees if applicable.</li>
                  <li>Cleaning charges if needed.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="payment-section payment-section-light">
        <div className="payment-container">
          <h2 className="payment-section-title">Frequently Asked Questions</h2>

          <div className="payment-faq-list">
            <div className="payment-faq-item">
              <div className="payment-faq-question">
                Do I need to pay anything when making a reservation?
              </div>
              <div className="payment-faq-answer">
                No, our reservation system is completely free. You only pay when you pick up your vehicle
                in Tunisia.
              </div>
            </div>

            <div className="payment-faq-item">
              <div className="payment-faq-question">Can I cancel my reservation?</div>
              <div className="payment-faq-answer">
                Yes, you can cancel your reservation up to 24 hours before pickup without any charges.
              </div>
            </div>

            <div className="payment-faq-item">
              <div className="payment-faq-question">
                What happens if I don&apos;t have exact change?
              </div>
              <div className="payment-faq-answer">
                Don&apos;t worry! Our staff can provide change, and we also accept payments in multiple
                currencies with live exchange rates.
              </div>
            </div>

            <div className="payment-faq-item">
              <div className="payment-faq-question">Is my security deposit refundable?</div>
              <div className="payment-faq-answer">
                Yes, the security deposit is fully refundable upon returning the vehicle in the same
                condition, with the same fuel level.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="payment-cta">
        <div className="payment-container">
          <h2 className="payment-cta-title">Ready to Make Your Reservation?</h2>
          <p className="payment-cta-text">
            Start your Tunisia adventure with our convenient pay-on-arrival system.
          </p>

          <div className="payment-cta-actions">
            <button
              type="button"
              className="payment-cta-btn payment-cta-btn-primary"
              onClick={() => (window.location.href = '/fleet')}
            >
              Book Now
            </button>
            <button
              type="button"
              className="payment-cta-btn payment-cta-btn-outline"
              onClick={() => (window.location.href = '/contact')}
            >
              Have Questions?
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PaymentSection;
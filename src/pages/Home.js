import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import FleetSection from '../components/FleetSection';
import PaymentSection from '../components/PaymentSection';
import TestimonialsSection from '../components/TestimonialsSection';
import CTASection from '../components/CTASection';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <FleetSection />
      <PaymentSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
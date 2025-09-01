'use client';

import Header from '../components/landing/Header';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import WhySection from '../components/landing/WhySection';
import Testimonials from '../components/landing/Testimonials';
import dynamic from 'next/dynamic';
import Faq from '../components/landing/Faq';
import Cta from '../components/landing/Cta';
import FinalVisual from '../components/landing/FinalVisual';
import Footer from '../components/landing/Footer';

// Import Pricing only on client to avoid SSR crash
const Pricing = dynamic(() => import('../components/landing/Pricing'), {
  ssr: false
});

export default function LandingPage() {
  return (
    <main className="bg-background">
      <Header />
      <Hero />
      <Features />
      <WhySection />
      <Testimonials />
      <Pricing />
      <Faq />
      <Cta />
      <FinalVisual />
      <Footer />
    </main>
  );
}

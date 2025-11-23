import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import Products from './components/Products';
import HowItWorks from './components/HowItWorks';
import QuitPlan from './components/QuitPlan';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Benefits />
      <Products />
      <HowItWorks />
      <QuitPlan />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
}

export default App;
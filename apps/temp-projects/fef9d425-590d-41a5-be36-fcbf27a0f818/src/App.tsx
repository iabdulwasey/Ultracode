import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import HowItWorks from './components/HowItWorks';
import Products from './components/Products';
import Testimonials from './components/Testimonials';
import QuitPlan from './components/QuitPlan';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Benefits />
      <HowItWorks />
      <Products />
      <Testimonials />
      <QuitPlan />
      <FAQ />
      <Footer />
    </div>
  );
}

export default App;
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Destinations from './components/Destinations';
import Cuisine from './components/Cuisine';
import Culture from './components/Culture';
import TravelTips from './components/TravelTips';
import Testimonials from './components/Testimonials';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Destinations />
      <Cuisine />
      <Culture />
      <TravelTips />
      <Testimonials />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default App;
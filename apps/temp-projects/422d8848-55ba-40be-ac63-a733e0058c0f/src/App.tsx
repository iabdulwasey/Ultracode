import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Destinations from './components/Destinations';
import Culture from './components/Culture';
import Seasons from './components/Seasons';
import TravelTips from './components/TravelTips';
import Gallery from './components/Gallery';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import TripPlanner from './components/TripPlanner';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-japan-cherry/5 to-japan-gold/5">
      <Header />
      <Hero />
      <Destinations />
      <Culture />
      <Seasons />
      <TravelTips />
      <Gallery />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default App;
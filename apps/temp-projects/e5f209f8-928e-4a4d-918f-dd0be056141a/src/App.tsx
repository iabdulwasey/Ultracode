import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedDestinations from './components/FeaturedDestinations';
import RegionsGuide from './components/RegionsGuide';
import CulturalExperiences from './components/CulturalExperiences';
import TravelTips from './components/TravelTips';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-japan-cherry/10">
      <Header />
      <Hero />
      <FeaturedDestinations />
      <RegionsGuide />
      <CulturalExperiences />
      <TravelTips />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default App;
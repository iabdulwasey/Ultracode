import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedDestinations from './components/FeaturedDestinations';
import Experiences from './components/Experiences';
import Seasons from './components/Seasons';
import Culture from './components/Culture';
import PlanYourTrip from './components/PlanYourTrip';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import SakuraPetals from './components/SakuraPetals';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sakura-50 to-pink-50 relative overflow-x-hidden">
      <SakuraPetals />
      <Header />
      <Hero />
      <FeaturedDestinations />
      <Experiences />
      <Seasons />
      <Culture />
      <PlanYourTrip />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default App;
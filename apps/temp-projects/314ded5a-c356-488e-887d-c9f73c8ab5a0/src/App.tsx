import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Destinations from './components/Destinations';
import Experiences from './components/Experiences';
import Seasons from './components/Seasons';
import Culture from './components/Culture';
import TravelTips from './components/TravelTips';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Destinations />
      <Experiences />
      <Seasons />
      <Culture />
      <TravelTips />
      <Gallery />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
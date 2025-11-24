import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Destinations from './components/Destinations';
import Culture from './components/Culture';
import Experiences from './components/Experiences';
import Seasons from './components/Seasons';
import Planning from './components/Planning';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />
      <Hero />
      <Destinations />
      <Culture />
      <Experiences />
      <Seasons />
      <Planning />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default App;
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Programs from './components/Programs';
import Facilities from './components/Facilities';
import Faculty from './components/Faculty';
import News from './components/News';
import Admissions from './components/Admissions';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <About />
      <Programs />
      <Facilities />
      <Faculty />
      <News />
      <Admissions />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
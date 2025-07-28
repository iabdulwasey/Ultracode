import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SearchFilters from './components/SearchFilters';
import FeaturedDestinations from './components/FeaturedDestinations';
import PropertyGrid from './components/PropertyGrid';
import ExperienceSection from './components/ExperienceSection';
import HostSection from './components/HostSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <SearchFilters />
      <FeaturedDestinations />
      <PropertyGrid />
      <ExperienceSection />
      <HostSection />
      <Footer />
    </div>
  );
}

export default App;
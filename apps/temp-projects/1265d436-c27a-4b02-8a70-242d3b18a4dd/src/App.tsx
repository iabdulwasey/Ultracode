import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedPosts from './components/FeaturedPosts';
import Categories from './components/Categories';
import RecentPosts from './components/RecentPosts';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <FeaturedPosts />
        <Categories />
        <RecentPosts />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}

export default App;
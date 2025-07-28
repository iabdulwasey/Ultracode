import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MovieRow from './components/MovieRow';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import { movieData } from './data/movieData';

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSignIn = () => {
    setIsAuthModalOpen(true);
  };

  const handleAuth = () => {
    setIsLoggedIn(true);
    setIsAuthModalOpen(false);
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header 
        onSignIn={handleSignIn}
        isLoggedIn={isLoggedIn}
        onSignOut={handleSignOut}
      />
      
      <main>
        <Hero />
        
        <div className="relative z-10 -mt-32">
          {movieData.map((category, index) => (
            <MovieRow
              key={category.title}
              title={category.title}
              movies={category.movies}
              isLarge={index === 0}
            />
          ))}
        </div>
      </main>

      <Footer />

      {isAuthModalOpen && (
        <AuthModal
          onClose={() => setIsAuthModalOpen(false)}
          onAuth={handleAuth}
        />
      )}
    </div>
  );
}

export default App;
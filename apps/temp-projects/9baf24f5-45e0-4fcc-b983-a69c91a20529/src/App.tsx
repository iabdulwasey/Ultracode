import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MovieRow from './components/MovieRow';
import Modal from './components/Modal';
import { Movie, MovieCategory } from './types/Movie';
import { movieData } from './data/movieData';

function App() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [categories, setCategories] = useState<MovieCategory[]>([]);
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    // Initialize movie data
    setCategories(movieData);
    
    // Set a random featured movie from trending
    const trendingMovies = movieData.find(cat => cat.title === 'Trending Now')?.movies || [];
    if (trendingMovies.length > 0) {
      const randomIndex = Math.floor(Math.random() * trendingMovies.length);
      setFeaturedMovie(trendingMovies[randomIndex]);
    }
  }, []);

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="min-h-screen bg-netflix-black text-white">
      <Header />
      
      {featuredMovie && (
        <Hero 
          movie={featuredMovie} 
          onPlayClick={() => handleMovieClick(featuredMovie)}
          onInfoClick={() => handleMovieClick(featuredMovie)}
        />
      )}
      
      <div className="relative z-10 -mt-32 pb-20">
        {categories.map((category, index) => (
          <MovieRow
            key={category.id}
            title={category.title}
            movies={category.movies}
            onMovieClick={handleMovieClick}
            className={index === 0 ? 'mt-0' : ''}
          />
        ))}
      </div>

      {selectedMovie && (
        <Modal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  );
}

export default App;
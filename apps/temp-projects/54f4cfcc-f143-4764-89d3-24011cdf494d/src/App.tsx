import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MovieRow from './components/MovieRow';
import MovieModal from './components/MovieModal';
import { Movie } from './types/Movie';
import { movieData } from './data/movieData';

function App() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  const filteredMovies = searchQuery
    ? movieData.trending.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen bg-netflix-black text-white">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      {searchQuery ? (
        <div className="pt-20 px-4 md:px-8">
          <h2 className="text-2xl font-bold mb-4">Search Results for "{searchQuery}"</h2>
          {filteredMovies.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filteredMovies.map((movie) => (
                <div
                  key={movie.id}
                  className="movie-card"
                  onClick={() => handleMovieClick(movie)}
                >
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-auto rounded-md"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No movies found matching your search.</p>
          )}
        </div>
      ) : (
        <>
          <Hero movie={movieData.trending[0]} onPlayClick={() => handleMovieClick(movieData.trending[0])} />
          
          <div className="px-4 md:px-8 space-y-8 -mt-32 relative z-10">
            <MovieRow
              title="Trending Now"
              movies={movieData.trending}
              onMovieClick={handleMovieClick}
            />
            <MovieRow
              title="Netflix Originals"
              movies={movieData.originals}
              onMovieClick={handleMovieClick}
            />
            <MovieRow
              title="Action Movies"
              movies={movieData.action}
              onMovieClick={handleMovieClick}
            />
            <MovieRow
              title="Comedy Movies"
              movies={movieData.comedy}
              onMovieClick={handleMovieClick}
            />
            <MovieRow
              title="Horror Movies"
              movies={movieData.horror}
              onMovieClick={handleMovieClick}
            />
            <MovieRow
              title="Romance Movies"
              movies={movieData.romance}
              onMovieClick={handleMovieClick}
            />
          </div>
        </>
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  );
}

export default App;
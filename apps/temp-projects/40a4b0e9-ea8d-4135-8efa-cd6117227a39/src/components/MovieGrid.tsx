import React from 'react';
import MovieCard from './MovieCard';
import { Movie } from '../types';

interface MovieGridProps {
  movies: Movie[];
  onBookMovie: (movie: Movie) => void;
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, onBookMovie }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onBook={() => onBookMovie(movie)}
        />
      ))}
    </div>
  );
};

export default MovieGrid;
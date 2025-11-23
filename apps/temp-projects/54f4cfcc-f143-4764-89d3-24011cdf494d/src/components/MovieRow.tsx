import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Movie } from '../types/Movie';

interface MovieRowProps {
  title: string;
  movies: readonly Movie[];
  onMovieClick: (movie: Movie) => void;
}

const MovieRow: React.FC<MovieRowProps> = ({ title, movies, onMovieClick }) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth 
        : scrollLeft + clientWidth;
      
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl md:text-2xl font-semibold text-white">{title}</h2>
      
      <div className="group relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-0 z-40 h-full w-12 bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center hover:bg-black/75"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-0 z-40 h-full w-12 bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center hover:bg-black/75"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Movies Container */}
        <div
          ref={rowRef}
          className="flex space-x-4 overflow-x-scroll scrollbar-hide pb-4"
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="relative flex-none w-48 md:w-64 cursor-pointer transition-transform duration-300 hover:scale-105 hover:z-10"
              onClick={() => onMovieClick(movie)}
            >
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-72 md:h-96 object-cover rounded-md"
                loading="lazy"
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/0 hover:bg-black/70 transition-all duration-300 rounded-md flex items-end opacity-0 hover:opacity-100">
                <div className="p-4 text-white">
                  <h3 className="font-semibold text-sm mb-1">{movie.title}</h3>
                  <div className="flex items-center space-x-2 text-xs text-gray-300">
                    <span>{movie.rating}/10</span>
                    <span>•</span>
                    <span>{movie.releaseDate}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {movie.genre.slice(0, 2).map((genre) => (
                      <span
                        key={genre}
                        className="bg-gray-600 px-2 py-1 rounded text-xs"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Netflix Original Badge */}
              {movie.isOriginal && (
                <div className="absolute top-2 left-2 bg-netflix-red text-white text-xs px-2 py-1 rounded">
                  N
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieRow;
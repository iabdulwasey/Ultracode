import React from 'react';
import { Movie } from '../types/Movie';

interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  return (
    <div 
      className="flex-shrink-0 w-48 md:w-64 cursor-pointer movie-card-hover"
      onClick={onClick}
    >
      <div className="relative group">
        <img
          src={movie.image}
          alt={movie.title}
          className="w-full h-72 md:h-96 object-cover rounded-lg"
        />
        
        {/* Netflix Original Badge */}
        {movie.isNetflixOriginal && (
          <div className="absolute top-2 left-2 bg-netflix-red text-white text-xs px-2 py-1 rounded">
            N
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 rounded-lg flex items-end opacity-0 group-hover:opacity-100">
          <div className="p-4 w-full">
            <h3 className="text-white font-semibold text-sm mb-1">{movie.title}</h3>
            <div className="flex items-center space-x-2 text-xs text-gray-300">
              <span>{movie.year}</span>
              <span>•</span>
              <span>{movie.rating}</span>
              <span>•</span>
              <span>{movie.duration}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
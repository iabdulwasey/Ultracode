import React, { useState } from 'react';
import { Play, Plus, ThumbsUp, ChevronDown } from 'lucide-react';

interface Movie {
  id: number;
  title: string;
  image: string;
  rating: string;
  year: string;
  duration: string;
  description: string;
  genre: string[];
}

interface MovieCardProps {
  movie: Movie;
  isLarge?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, isLarge = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const cardWidth = isLarge ? 'w-80' : 'w-64';
  const cardHeight = isLarge ? 'h-48' : 'h-36';

  return (
    <div
      className={`${cardWidth} ${cardHeight} flex-shrink-0 relative group cursor-pointer transition-all duration-300 hover:scale-110 hover:z-30`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Movie Poster */}
      <div className="relative w-full h-full rounded-md overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-800 animate-pulse rounded-md" />
        )}
        <img
          src={movie.image}
          alt={movie.title}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Hover Content */}
      {isHovered && (
        <div className="absolute top-full left-0 w-80 bg-netflix-dark border border-gray-700 rounded-md shadow-2xl p-4 animate-fade-in z-40">
          {/* Action Buttons */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex space-x-2">
              <button className="bg-white text-black p-2 rounded-full hover:bg-gray-200 transition-colors">
                <Play className="w-4 h-4 fill-current" />
              </button>
              <button className="border-2 border-gray-400 text-white p-2 rounded-full hover:border-white transition-colors">
                <Plus className="w-4 h-4" />
              </button>
              <button className="border-2 border-gray-400 text-white p-2 rounded-full hover:border-white transition-colors">
                <ThumbsUp className="w-4 h-4" />
              </button>
            </div>
            <button className="border-2 border-gray-400 text-white p-2 rounded-full hover:border-white transition-colors">
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Movie Info */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-green-500 font-semibold">{movie.rating}% Match</span>
              <span className="border border-gray-400 px-1 text-xs">HD</span>
              <span className="text-gray-400">{movie.year}</span>
              <span className="text-gray-400">{movie.duration}</span>
            </div>

            <h3 className="font-semibold text-white">{movie.title}</h3>
            
            <p className="text-gray-300 text-sm line-clamp-3">
              {movie.description}
            </p>

            <div className="flex flex-wrap gap-1">
              {movie.genre.map((g, index) => (
                <span key={g} className="text-gray-400 text-xs">
                  {g}{index < movie.genre.length - 1 && ' • '}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
import React from 'react';
import { Play, Info } from 'lucide-react';
import { Movie } from '../types/Movie';

interface HeroProps {
  movie: Movie;
  onPlayClick: () => void;
  onInfoClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ movie, onPlayClick, onInfoClick }) => {
  return (
    <div className="relative h-screen">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${movie.backdropImage})` }}
      >
        <div className="absolute inset-0 hero-gradient" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center h-full px-4 md:px-16">
        <div className="max-w-lg">
          {/* Netflix Original Badge */}
          {movie.isNetflixOriginal && (
            <div className="flex items-center mb-4">
              <span className="text-netflix-red font-bold text-sm mr-2">NETFLIX</span>
              <span className="text-white text-sm">ORIGINAL</span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            {movie.title}
          </h1>

          {/* Description */}
          <p className="text-lg text-white mb-6 max-w-md leading-relaxed drop-shadow-md">
            {movie.description}
          </p>

          {/* Buttons */}
          <div className="flex space-x-4">
            <button 
              onClick={onPlayClick}
              className="flex items-center space-x-2 bg-white text-black px-8 py-3 rounded font-semibold hover:bg-gray-200 transition-colors"
            >
              <Play size={20} fill="currentColor" />
              <span>Play</span>
            </button>
            
            <button 
              onClick={onInfoClick}
              className="flex items-center space-x-2 bg-gray-500/70 text-white px-8 py-3 rounded font-semibold hover:bg-gray-500/50 transition-colors"
            >
              <Info size={20} />
              <span>More Info</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-netflix-black to-transparent" />
    </div>
  );
};

export default Hero;
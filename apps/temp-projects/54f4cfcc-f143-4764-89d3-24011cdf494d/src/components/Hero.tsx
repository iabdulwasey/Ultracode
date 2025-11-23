import React from 'react';
import { Play, Info } from 'lucide-react';
import { Movie } from '../types/Movie';

interface HeroProps {
  movie: Movie;
  onPlayClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ movie, onPlayClick }) => {
  return (
    <div className="relative h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${movie.backdrop})`,
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center h-full px-4 md:px-8">
        <div className="max-w-2xl">
          {/* Netflix Original Badge */}
          {movie.isOriginal && (
            <div className="flex items-center mb-4">
              <span className="text-netflix-red font-bold text-xl mr-2">NETFLIX</span>
              <span className="text-white text-sm tracking-widest">ORIGINAL</span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            {movie.title}
          </h1>

          {/* Overview */}
          <p className="text-lg md:text-xl text-white mb-8 leading-relaxed max-w-xl">
            {movie.overview}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onPlayClick}
              className="flex items-center justify-center bg-white text-black px-8 py-3 rounded font-semibold hover:bg-gray-200 transition-colors"
            >
              <Play className="w-5 h-5 mr-2 fill-current" />
              Play
            </button>
            <button
              onClick={onPlayClick}
              className="flex items-center justify-center bg-gray-500/70 text-white px-8 py-3 rounded font-semibold hover:bg-gray-500/50 transition-colors"
            >
              <Info className="w-5 h-5 mr-2" />
              More Info
            </button>
          </div>

          {/* Movie Info */}
          <div className="flex items-center space-x-4 mt-8 text-sm text-gray-300">
            <span className="bg-gray-600 px-2 py-1 rounded text-xs">
              {movie.rating}/10
            </span>
            <span>{movie.releaseDate}</span>
            <span>{movie.duration}</span>
            <div className="flex space-x-1">
              {movie.genre.slice(0, 3).map((g, index) => (
                <span key={g}>
                  {g}{index < movie.genre.slice(0, 3).length - 1 && ','}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
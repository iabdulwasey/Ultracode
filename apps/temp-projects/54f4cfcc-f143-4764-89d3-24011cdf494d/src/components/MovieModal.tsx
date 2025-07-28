import React, { useEffect } from 'react';
import { X, Play, Plus, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Movie } from '../types/Movie';

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const MovieModal: React.FC<MovieModalProps> = ({ movie, onClose }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-netflix-black rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-netflix-black/80 text-white p-2 rounded-full hover:bg-netflix-black transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Section */}
        <div className="relative">
          <img
            src={movie.backdrop}
            alt={movie.title}
            className="w-full h-64 md:h-96 object-cover rounded-t-lg"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent rounded-t-lg" />
          
          {/* Content Over Image */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {movie.title}
            </h1>
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-4 mb-4">
              <button className="flex items-center bg-white text-black px-6 py-2 rounded font-semibold hover:bg-gray-200 transition-colors">
                <Play className="w-4 h-4 mr-2 fill-current" />
                Play
              </button>
              <button className="p-2 border-2 border-gray-400 text-white rounded-full hover:border-white transition-colors">
                <Plus className="w-5 h-5" />
              </button>
              <button className="p-2 border-2 border-gray-400 text-white rounded-full hover:border-white transition-colors">
                <ThumbsUp className="w-5 h-5" />
              </button>
              <button className="p-2 border-2 border-gray-400 text-white rounded-full hover:border-white transition-colors">
                <ThumbsDown className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="p-6 md:p-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Info */}
            <div className="md:col-span-2 space-y-4">
              {/* Movie Stats */}
              <div className="flex items-center space-x-4 text-sm text-gray-300">
                <span className="text-green-400 font-semibold">{movie.rating * 10}% Match</span>
                <span>{movie.releaseDate}</span>
                <span className="border border-gray-400 px-1 text-xs">HD</span>
                <span>{movie.duration}</span>
              </div>

              {/* Overview */}
              <p className="text-white text-base leading-relaxed">
                {movie.overview}
              </p>
            </div>

            {/* Side Info */}
            <div className="space-y-4 text-sm">
              {/* Cast */}
              <div>
                <span className="text-gray-400">Cast: </span>
                <span className="text-white">
                  {movie.cast.slice(0, 3).join(', ')}
                  {movie.cast.length > 3 && ', more'}
                </span>
              </div>

              {/* Director */}
              <div>
                <span className="text-gray-400">Director: </span>
                <span className="text-white">{movie.director}</span>
              </div>

              {/* Genres */}
              <div>
                <span className="text-gray-400">Genres: </span>
                <span className="text-white">{movie.genre.join(', ')}</span>
              </div>

              {/* This title is */}
              <div className="pt-4">
                <span className="text-gray-400">This title is: </span>
                <div className="flex flex-wrap gap-1 mt-2">
                  {movie.genre.map((genre) => (
                    <span
                      key={genre}
                      className="bg-gray-700 text-white px-2 py-1 rounded text-xs"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
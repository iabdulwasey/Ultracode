import React, { useEffect } from 'react';
import { X, Play, Plus, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Movie } from '../types/Movie';

interface ModalProps {
  movie: Movie;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ movie, onClose }) => {
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
        className="absolute inset-0 bg-black/80"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-netflix-dark rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-netflix-dark rounded-full p-2 text-white hover:bg-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Hero Section */}
        <div className="relative">
          <img
            src={movie.backdropImage}
            alt={movie.title}
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-netflix-dark via-transparent to-transparent" />
          
          {/* Title and Buttons */}
          <div className="absolute bottom-8 left-8 right-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {movie.title}
            </h2>
            
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 bg-white text-black px-6 py-2 rounded font-semibold hover:bg-gray-200 transition-colors">
                <Play size={20} fill="currentColor" />
                <span>Play</span>
              </button>
              
              <button className="p-2 border-2 border-gray-400 rounded-full text-white hover:border-white transition-colors">
                <Plus size={20} />
              </button>
              
              <button className="p-2 border-2 border-gray-400 rounded-full text-white hover:border-white transition-colors">
                <ThumbsUp size={20} />
              </button>
              
              <button className="p-2 border-2 border-gray-400 rounded-full text-white hover:border-white transition-colors">
                <ThumbsDown size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="p-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Info */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-green-500 font-semibold">98% Match</span>
                <span className="border border-gray-400 px-2 py-1 text-xs text-gray-300">
                  {movie.rating}
                </span>
                <span className="text-gray-300">{movie.year}</span>
                <span className="border border-gray-400 px-2 py-1 text-xs text-gray-300">
                  HD
                </span>
              </div>

              <p className="text-white text-lg mb-6 leading-relaxed">
                {movie.description}
              </p>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-4 text-sm">
              <div>
                <span className="text-gray-400">Cast: </span>
                <span className="text-white">{movie.cast.join(', ')}</span>
              </div>
              
              <div>
                <span className="text-gray-400">Director: </span>
                <span className="text-white">{movie.director}</span>
              </div>
              
              <div>
                <span className="text-gray-400">Genres: </span>
                <span className="text-white">{movie.genre.join(', ')}</span>
              </div>

              <div>
                <span className="text-gray-400">Duration: </span>
                <span className="text-white">{movie.duration}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
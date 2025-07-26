import React from 'react';
import { Clock, Star, Calendar } from 'lucide-react';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  onBook: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onBook }) => {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
          {movie.rating}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2 text-card-foreground">{movie.title}</h3>
        <p className="text-muted-foreground text-sm mb-2">{movie.genre}</p>
        
        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{movie.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-500" />
            <span>4.5</span>
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {movie.description}
        </p>
        
        <div className="mb-4">
          <div className="flex items-center space-x-1 mb-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Showtimes</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {movie.showtimes.slice(0, 3).map((time, index) => (
              <span
                key={index}
                className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs"
              >
                {time}
              </span>
            ))}
            {movie.showtimes.length > 3 && (
              <span className="text-xs text-muted-foreground px-2 py-1">
                +{movie.showtimes.length - 3} more
              </span>
            )}
          </div>
        </div>
        
        <button
          onClick={onBook}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-2 rounded-md font-semibold transition-colors"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
import React from 'react';
import { Clock, Star } from 'lucide-react';
import { Movie } from '../App';

interface MovieListProps {
  movies: Movie[];
  onBookMovie: (movie: Movie) => void;
}

const MovieList: React.FC<MovieListProps> = ({ movies, onBookMovie }) => {
  return (
    <section id="movies" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Now Showing</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the latest blockbusters and indie films playing at our theaters
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {movies.map((movie) => (
            <div key={movie.id} className="card group">
              <div className="relative overflow-hidden">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-2 py-1 rounded-md text-sm">
                  {movie.rating}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{movie.title}</h3>
                <p className="text-gray-600 mb-3">{movie.genre}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="text-sm">{movie.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-sm text-gray-600">4.5</span>
                  </div>
                </div>
                
                <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                  {movie.description}
                </p>
                
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-900 mb-2">Showtimes:</p>
                  <div className="flex flex-wrap gap-2">
                    {movie.showtimes.slice(0, 3).map((time, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                      >
                        {time}
                      </span>
                    ))}
                    {movie.showtimes.length > 3 && (
                      <span className="text-gray-500 text-xs py-1">
                        +{movie.showtimes.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary-600">
                    ${movie.price}
                  </span>
                  <button
                    onClick={() => onBookMovie(movie)}
                    className="btn-primary"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MovieList;
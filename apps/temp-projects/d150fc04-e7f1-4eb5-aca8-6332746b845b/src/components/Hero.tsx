import React from 'react';
import { Play, Star } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-r from-gray-900 to-gray-700 text-white">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div 
        className="relative min-h-[500px] bg-cover bg-center flex items-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1489599162810-1e666bfbecf9?w=1200&h=600&fit=crop)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <h2 className="text-5xl font-bold mb-6 animate-fade-in">
              Experience Movies Like Never Before
            </h2>
            <p className="text-xl mb-8 text-gray-200 animate-fade-in">
              Book your favorite movies with the best seats, premium sound, and ultimate comfort. 
              Your perfect movie experience starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up">
              <button className="btn-primary flex items-center justify-center space-x-2 text-lg px-8 py-3">
                <Play className="h-5 w-5" />
                <span>Watch Trailer</span>
              </button>
              <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 font-medium py-3 px-8 rounded-lg transition-colors duration-200">
                View Showtimes
              </button>
            </div>
            <div className="flex items-center mt-8 space-x-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-lg">4.8/5 Customer Rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
import React from 'react';
import { Play, Star } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative h-96 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 overflow-hidden">
      <div className="absolute inset-0 bg-black/50"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1489599735734-79b4fc8c7cd3?w=1200&h=400&fit=crop)'
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
      
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl text-white">
          <h2 className="text-5xl font-bold mb-4">
            Experience Cinema Like Never Before
          </h2>
          <p className="text-xl mb-6 text-gray-200">
            Book your favorite movies with the best seats at unbeatable prices. 
            Join millions of movie lovers worldwide.
          </p>
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center space-x-1">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <span className="ml-2 text-gray-200">4.9/5 from 10k+ reviews</span>
            </div>
          </div>
          <div className="flex space-x-4">
            <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2">
              <Play className="h-5 w-5" />
              <span>Watch Trailer</span>
            </button>
            <button className="border border-white/30 hover:bg-white/10 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              Browse Movies
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
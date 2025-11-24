import React, { useState } from 'react';
import { MapPin, Star, Calendar, ArrowRight } from 'lucide-react';
import type { Destination } from '../types';

const Destinations: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const destinations: Destination[] = [
    {
      id: '1',
      name: 'Tokyo',
      nameJapanese: '東京',
      description: 'A vibrant metropolis blending ultra-modern and traditional culture.',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop',
      prefecture: 'Tokyo',
      category: 'city',
      highlights: ['Shibuya Crossing', 'Tokyo Tower', 'Senso-ji Temple', 'Harajuku'],
      bestTime: 'March-May, September-November'
    },
    {
      id: '2',
      name: 'Kyoto',
      nameJapanese: '京都',
      description: 'Ancient capital with over 2,000 temples and traditional architecture.',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop',
      prefecture: 'Kyoto',
      category: 'temple',
      highlights: ['Fushimi Inari', 'Kiyomizu-dera', 'Bamboo Grove', 'Gion District'],
      bestTime: 'March-May, October-November'
    },
    {
      id: '3',
      name: 'Mount Fuji',
      nameJapanese: '富士山',
      description: 'Iconic sacred mountain and symbol of Japan.',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
      prefecture: 'Shizuoka',
      category: 'nature',
      highlights: ['Climbing Season', 'Five Lakes', 'Hakone', 'Kawaguchi Lake'],
      bestTime: 'July-September (climbing), Year-round (viewing)'
    },
    {
      id: '4',
      name: 'Osaka',
      nameJapanese: '大阪',
      description: 'Japan\'s kitchen known for incredible street food and nightlife.',
      image: 'https://images.unsplash.com/photo-1590559899731-a382839e5549?w=400&h=300&fit=crop',
      prefecture: 'Osaka',
      category: 'city',
      highlights: ['Dotonbori', 'Osaka Castle', 'Universal Studios', 'Street Food'],
      bestTime: 'March-May, September-November'
    },
    {
      id: '5',
      name: 'Hiroshima',
      nameJapanese: '広島',
      description: 'Historic city with powerful memorials and beautiful Miyajima Island.',
      image: 'https://images.unsplash.com/photo-1570492850768-d4bb5d4d5027?w=400&h=300&fit=crop',
      prefecture: 'Hiroshima',
      category: 'cultural',
      highlights: ['Peace Memorial Park', 'Miyajima Island', 'Itsukushima Shrine'],
      bestTime: 'March-May, September-November'
    },
    {
      id: '6',
      name: 'Nara',
      nameJapanese: '奈良',
      description: 'Ancient capital famous for free-roaming deer and historic temples.',
      image: 'https://images.unsplash.com/photo-1558862107-d49ef2a04d72?w=400&h=300&fit=crop',
      prefecture: 'Nara',
      category: 'temple',
      highlights: ['Nara Park', 'Todai-ji Temple', 'Kasuga Taisha', 'Deer Feeding'],
      bestTime: 'March-May, September-November'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Destinations', icon: '🗾' },
    { id: 'city', name: 'Cities', icon: '🏙️' },
    { id: 'temple', name: 'Temples', icon: '⛩️' },
    { id: 'nature', name: 'Nature', icon: '🏔️' },
    { id: 'cultural', name: 'Cultural', icon: '🎎' }
  ];

  const filteredDestinations = activeCategory === 'all' 
    ? destinations 
    : destinations.filter(dest => dest.category === activeCategory);

  return (
    <section id="destinations" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Top Destinations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover Japan's most captivating places, from bustling cities to serene temples
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 flex items-center space-x-2 ${
                activeCategory === category.id
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-red-100 hover:text-red-600'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((destination) => (
            <div
              key={destination.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">4.8</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-2xl font-bold text-gray-900">{destination.name}</h3>
                  <span className="text-red-600 font-japanese text-lg">{destination.nameJapanese}</span>
                </div>

                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{destination.prefecture} Prefecture</span>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">{destination.description}</p>

                {/* Highlights */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {destination.highlights.slice(0, 3).map((highlight, index) => (
                      <span
                        key={index}
                        className="bg-red-50 text-red-600 px-2 py-1 rounded text-xs font-medium"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Best Time */}
                <div className="flex items-center text-gray-600 mb-4">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="text-sm">Best: {destination.bestTime}</span>
                </div>

                {/* CTA */}
                <button className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200 flex items-center justify-center space-x-2">
                  <span>Explore {destination.name}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Destinations;
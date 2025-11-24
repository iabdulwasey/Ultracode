import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Season } from '../types';

const Seasons: React.FC = () => {
  const [currentSeason, setCurrentSeason] = useState(0);

  const seasons: Season[] = [
    {
      name: 'Spring',
      nameJapanese: '春 (Haru)',
      months: 'March - May',
      description: 'Cherry blossom season brings pink petals and mild weather perfect for outdoor exploration.',
      highlights: ['Cherry Blossoms (Sakura)', 'Hanami Festivals', 'Perfect Weather', 'Golden Week'],
      temperature: '10-20°C',
      image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800&h=600&fit=crop'
    },
    {
      name: 'Summer',
      nameJapanese: '夏 (Natsu)',
      months: 'June - August',
      description: 'Hot and humid with vibrant festivals, fireworks, and mountain hiking opportunities.',
      highlights: ['Summer Festivals', 'Fireworks (Hanabi)', 'Mountain Climbing', 'Beach Season'],
      temperature: '25-35°C',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop'
    },
    {
      name: 'Autumn',
      nameJapanese: '秋 (Aki)',
      months: 'September - November',
      description: 'Stunning fall foliage creates a tapestry of red, orange, and gold across the landscape.',
      highlights: ['Fall Foliage (Koyo)', 'Comfortable Weather', 'Harvest Season', 'Clear Skies'],
      temperature: '15-25°C',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop'
    },
    {
      name: 'Winter',
      nameJapanese: '冬 (Fuyu)',
      months: 'December - February',
      description: 'Snow-covered landscapes, hot springs, and winter illuminations create magical experiences.',
      highlights: ['Snow Festivals', 'Hot Springs (Onsen)', 'Winter Illuminations', 'Skiing'],
      temperature: '0-10°C',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop'
    }
  ];

  const nextSeason = () => {
    setCurrentSeason((prev) => (prev + 1) % seasons.length);
  };

  const prevSeason = () => {
    setCurrentSeason((prev) => (prev - 1 + seasons.length) % seasons.length);
  };

  const season = seasons[currentSeason];

  return (
    <section id="seasons" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Seasons of Japan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience Japan's distinct seasons, each offering unique beauty and cultural celebrations
          </p>
        </div>

        {/* Season Display */}
        <div className="max-w-6xl mx-auto">
          <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Background Image */}
            <div className="relative h-96 md:h-[500px]">
              <img
                src={season.image}
                alt={season.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              
              {/* Navigation Buttons */}
              <button
                onClick={prevSeason}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors duration-200"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextSeason}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors duration-200"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="max-w-2xl">
                  <h3 className="text-4xl md:text-5xl font-bold mb-2">{season.name}</h3>
                  <p className="text-xl font-japanese mb-4">{season.nameJapanese}</p>
                  <p className="text-lg mb-4">{season.months}</p>
                  <p className="text-lg opacity-90">{season.description}</p>
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Highlights */}
                <div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">Season Highlights</h4>
                  <ul className="space-y-3">
                    {season.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                        <span className="text-gray-700">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Temperature */}
                <div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">Average Temperature</h4>
                  <div className="bg-red-50 rounded-lg p-6">
                    <div className="text-3xl font-bold text-red-600 mb-2">{season.temperature}</div>
                    <p className="text-gray-600">Perfect for outdoor activities and sightseeing</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Season Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {seasons.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSeason(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentSeason ? 'bg-red-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Seasons;
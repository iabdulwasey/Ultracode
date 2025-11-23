import React, { useState } from 'react';
import { Calendar, Thermometer, Camera, MapPin, ArrowRight, Snowflake, Sun, Leaf, Wind } from 'lucide-react';

interface Season {
  id: string;
  name: string;
  months: string;
  temperature: string;
  description: string;
  image: string;
  icon: React.ComponentType<any>;
  color: string;
  gradient: string;
  highlights: string[];
  activities: string[];
  destinations: string[];
  tips: string[];
}

const Seasons: React.FC = () => {
  const [activeSeason, setActiveSeason] = useState('spring');

  const seasons: Season[] = [
    {
      id: 'spring',
      name: 'Spring (Haru)',
      months: 'March - May',
      temperature: '10-20°C',
      description: 'Cherry blossom season transforms Japan into a pink paradise. Perfect weather for outdoor exploration and hanami parties.',
      image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      icon: Leaf,
      color: 'text-pink-500',
      gradient: 'from-pink-400 to-rose-500',
      highlights: ['Cherry Blossoms (Sakura)', 'Perfect Weather', 'Festival Season', 'Mild Temperatures'],
      activities: ['Hanami Picnics', 'Temple Visits', 'Garden Tours', 'Photography', 'Hiking'],
      destinations: ['Tokyo', 'Kyoto', 'Yoshino', 'Mount Fuji', 'Nara'],
      tips: ['Book accommodation early', 'Pack layers', 'Check bloom forecasts', 'Arrive early for best spots']
    },
    {
      id: 'summer',
      name: 'Summer (Natsu)',
      months: 'June - August',
      temperature: '25-35°C',
      description: 'Festival season with fireworks, vibrant energy, and lush green landscapes. Hot and humid but full of cultural celebrations.',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      icon: Sun,
      color: 'text-orange-500',
      gradient: 'from-orange-400 to-red-500',
      highlights: ['Summer Festivals', 'Fireworks Shows', 'Beach Season', 'Mountain Escapes'],
      activities: ['Festival Hopping', 'Beach Visits', 'Hiking', 'Fireworks Viewing', 'Outdoor Dining'],
      destinations: ['Tokyo Bay', 'Okinawa', 'Hokkaido', 'Japanese Alps', 'Kamakura'],
      tips: ['Stay hydrated', 'Use sun protection', 'Book mountain retreats', 'Enjoy seasonal foods']
    },
    {
      id: 'autumn',
      name: 'Autumn (Aki)',
      months: 'September - November',
      temperature: '10-25°C',
      description: 'Spectacular fall foliage creates stunning red and gold landscapes. Comfortable weather and harvest season delicacies.',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      icon: Wind,
      color: 'text-amber-500',
      gradient: 'from-amber-400 to-orange-600',
      highlights: ['Fall Foliage', 'Comfortable Weather', 'Harvest Season', 'Clear Skies'],
      activities: ['Leaf Viewing', 'Temple Visits', 'Food Tours', 'Photography', 'Hiking'],
      destinations: ['Kyoto', 'Nikko', 'Hakone', 'Nara', 'Mount Takao'],
      tips: ['Peak colors vary by region', 'Pack warm layers', 'Book early for popular spots', 'Try seasonal foods']
    },
    {
      id: 'winter',
      name: 'Winter (Fuyu)',
      months: 'December - February',
      temperature: '0-10°C',
      description: 'Snow-covered landscapes, world-class skiing, hot springs, and magical illuminations. Fewer crowds and serene beauty.',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      icon: Snowflake,
      color: 'text-blue-500',
      gradient: 'from-blue-400 to-indigo-600',
      highlights: ['Snow Festivals', 'Skiing & Snowboarding', 'Hot Springs', 'Winter Illuminations'],
      activities: ['Skiing', 'Onsen Bathing', 'Snow Festivals', 'Winter Sports', 'Indoor Culture'],
      destinations: ['Hokkaido', 'Japanese Alps', 'Hakuba', 'Niseko', 'Shirakawa-go'],
      tips: ['Pack warm clothes', 'Book ski resorts early', 'Try winter foods', 'Enjoy indoor attractions']
    }
  ];

  const currentSeason = seasons.find(s => s.id === activeSeason) || seasons[0];

  return (
    <section id="seasons" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-japan-bamboo/10 rounded-full px-4 py-2 mb-4">
            <Calendar className="w-4 h-4 text-japan-red" />
            <span className="text-japan-red text-sm font-medium">Seasonal Guide</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Japan Through the <span className="gradient-text">Four Seasons</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Each season in Japan offers unique experiences, from cherry blossoms in spring 
            to snow festivals in winter. Discover when to visit for your perfect adventure.
          </p>
        </div>

        {/* Season Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {seasons.map((season) => (
            <button
              key={season.id}
              onClick={() => setActiveSeason(season.id)}
              className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                activeSeason === season.id
                  ? `border-transparent bg-gradient-to-br ${season.gradient} text-white shadow-lg scale-105`
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
              }`}
            >
              <season.icon className={`w-8 h-8 mx-auto mb-3 ${
                activeSeason === season.id ? 'text-white' : season.color
              }`} />
              <h3 className={`font-bold text-lg mb-1 ${
                activeSeason === season.id ? 'text-white' : 'text-gray-900'
              }`}>
                {season.name.split(' ')[0]}
              </h3>
              <p className={`text-sm ${
                activeSeason === season.id ? 'text-white/90' : 'text-gray-600'
              }`}>
                {season.months}
              </p>
            </button>
          ))}
        </div>

        {/* Season Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={currentSeason.image}
                alt={currentSeason.name}
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent`} />
              
              {/* Season Info Overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center space-x-4 text-white mb-3">
                  <div className="flex items-center space-x-2">
                    <Thermometer className="w-4 h-4" />
                    <span className="text-sm">{currentSeason.temperature}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{currentSeason.months}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {currentSeason.name}
                </h3>
                <p className="text-white/90 text-sm">
                  {currentSeason.description}
                </p>
              </div>
            </div>

            {/* Floating Stats */}
            <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-lg">
              <div className="flex items-center space-x-2">
                <Camera className="w-5 h-5 text-japan-red" />
                <div>
                  <div className="text-lg font-bold text-gray-900">Best for</div>
                  <div className="text-sm text-gray-600">Photography</div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {/* Highlights */}
            <div>
              <h4 className="text-xl font-bold mb-4 flex items-center">
                <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${currentSeason.gradient} mr-3`} />
                Season Highlights
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {currentSeason.highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <span className="text-sm font-medium text-gray-900">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Activities */}
            <div>
              <h4 className="text-xl font-bold mb-4 flex items-center">
                <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${currentSeason.gradient} mr-3`} />
                Popular Activities
              </h4>
              <div className="flex flex-wrap gap-2">
                {currentSeason.activities.map((activity, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${currentSeason.gradient} text-white`}
                  >
                    {activity}
                  </span>
                ))}
              </div>
            </div>

            {/* Top Destinations */}
            <div>
              <h4 className="text-xl font-bold mb-4 flex items-center">
                <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${currentSeason.gradient} mr-3`} />
                Top Destinations
              </h4>
              <div className="space-y-2">
                {currentSeason.destinations.map((destination, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <MapPin className={`w-4 h-4 ${currentSeason.color}`} />
                    <span className="font-medium text-gray-900">{destination}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Travel Tips */}
            <div>
              <h4 className="text-xl font-bold mb-4 flex items-center">
                <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${currentSeason.gradient} mr-3`} />
                Travel Tips
              </h4>
              <div className="space-y-2">
                {currentSeason.tips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${currentSeason.gradient} mt-2 flex-shrink-0`} />
                    <span className="text-gray-700 text-sm">{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <button className={`w-full bg-gradient-to-r ${currentSeason.gradient} text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2`}>
              <span>Plan Your {currentSeason.name.split(' ')[0]} Trip</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Weather Chart */}
        <div className="mt-16 bg-white rounded-3xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-center mb-8">
            Year-Round Weather Overview
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {seasons.map((season, index) => (
              <div
                key={season.id}
                className="text-center p-4 rounded-xl border border-gray-100 hover:shadow-md transition-shadow"
              >
                <season.icon className={`w-8 h-8 mx-auto mb-3 ${season.color}`} />
                <h4 className="font-bold text-lg mb-2">{season.name.split(' ')[0]}</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>{season.months}</p>
                  <p className="font-medium">{season.temperature}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Seasons;
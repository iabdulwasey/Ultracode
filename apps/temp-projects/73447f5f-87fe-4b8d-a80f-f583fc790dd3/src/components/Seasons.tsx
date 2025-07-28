import React, { useState } from 'react';
import { Calendar, Thermometer, Camera, MapPin } from 'lucide-react';
import { FaSnowflake, FaLeaf } from 'react-icons/fa';
import { GiCherry, GiSun } from 'react-icons/gi';

const Seasons: React.FC = () => {
  const [activeSeason, setActiveSeason] = useState('spring');

  const seasons = [
    {
      id: 'spring',
      name: 'Spring (Sakura)',
      icon: GiCherry,
      months: 'March - May',
      temperature: '10-20°C',
      color: 'from-pink-400 to-rose-500',
      bgColor: 'bg-gradient-to-br from-pink-50 to-rose-100',
      image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800&h=600&fit=crop&crop=center',
      description: 'Experience Japan\'s most famous season with cherry blossoms painting the country in delicate pink hues.',
      highlights: [
        'Cherry blossom viewing (Hanami)',
        'Perfect weather for sightseeing',
        'Traditional festivals',
        'Blooming gardens'
      ],
      destinations: [
        { name: 'Yoshino', specialty: '30,000 cherry trees' },
        { name: 'Tokyo', specialty: 'Ueno Park hanami' },
        { name: 'Kyoto', specialty: 'Philosopher\'s Path' },
        { name: 'Mount Fuji', specialty: 'Kawaguchi Lake views' }
      ]
    },
    {
      id: 'summer',
      name: 'Summer (Natsu)',
      icon: GiSun,
      months: 'June - August',
      temperature: '25-35°C',
      color: 'from-green-400 to-emerald-500',
      bgColor: 'bg-gradient-to-br from-green-50 to-emerald-100',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop&crop=center',
      description: 'Hot and humid summers bring vibrant festivals, fireworks, and lush green landscapes across Japan.',
      highlights: [
        'Spectacular fireworks festivals',
        'Traditional summer matsuri',
        'Mountain hiking season',
        'Beach and island hopping'
      ],
      destinations: [
        { name: 'Okinawa', specialty: 'Tropical beaches' },
        { name: 'Hokkaido', specialty: 'Cool mountain retreats' },
        { name: 'Tokyo', specialty: 'Summer festivals' },
        { name: 'Kyoto', specialty: 'Gion Matsuri festival' }
      ]
    },
    {
      id: 'autumn',
      name: 'Autumn (Koyo)',
      icon: FaLeaf,
      months: 'September - November',
      temperature: '15-25°C',
      color: 'from-orange-400 to-red-500',
      bgColor: 'bg-gradient-to-br from-orange-50 to-red-100',
      image: 'https://images.unsplash.com/photo-1542640244-4d4d8e8c6c0c?w=800&h=600&fit=crop&crop=center',
      description: 'Autumn transforms Japan into a canvas of red, orange, and gold as maple leaves create stunning landscapes.',
      highlights: [
        'Stunning autumn foliage (Koyo)',
        'Perfect hiking weather',
        'Harvest festivals',
        'Comfortable temperatures'
      ],
      destinations: [
        { name: 'Nikko', specialty: 'Temple autumn colors' },
        { name: 'Arashiyama', specialty: 'Bamboo & maple forest' },
        { name: 'Hakone', specialty: 'Mount Fuji views' },
        { name: 'Nara', specialty: 'Deer park foliage' }
      ]
    },
    {
      id: 'winter',
      name: 'Winter (Fuyu)',
      icon: FaSnowflake,
      months: 'December - February',
      temperature: '0-10°C',
      color: 'from-blue-400 to-indigo-500',
      bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-100',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center',
      description: 'Winter brings snow-covered landscapes, world-class skiing, and magical illuminations to Japan.',
      highlights: [
        'World-class powder skiing',
        'Hot spring (onsen) experiences',
        'Winter illuminations',
        'Snow festivals'
      ],
      destinations: [
        { name: 'Sapporo', specialty: 'Snow Festival' },
        { name: 'Shirakawa-go', specialty: 'Snow-covered villages' },
        { name: 'Hakuba', specialty: 'Olympic ski resorts' },
        { name: 'Kusatsu', specialty: 'Famous hot springs' }
      ]
    }
  ];

  const currentSeason = seasons.find(season => season.id === activeSeason)!;

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Japan Through the <span className="text-japanese-red">Seasons</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Each season in Japan offers unique experiences and breathtaking beauty. 
            Discover the perfect time to visit based on your interests and preferences.
          </p>
        </div>

        {/* Season Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {seasons.map((season) => (
            <button
              key={season.id}
              onClick={() => setActiveSeason(season.id)}
              className={`flex items-center space-x-3 px-6 py-4 rounded-2xl transition-all duration-300 font-semibold text-lg ${
                activeSeason === season.id
                  ? `bg-gradient-to-r ${season.color} text-white shadow-lg transform scale-105`
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:shadow-md'
              }`}
            >
              <season.icon className="w-6 h-6" />
              <span>{season.name}</span>
            </button>
          ))}
        </div>

        {/* Season Content */}
        <div className={`rounded-3xl overflow-hidden shadow-2xl ${currentSeason.bgColor}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Image Side */}
            <div className="relative h-96 lg:h-auto">
              <img
                src={currentSeason.image}
                alt={currentSeason.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              
              {/* Season Info Overlay */}
              <div className="absolute bottom-6 left-6 text-white">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span className="font-medium">{currentSeason.months}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Thermometer className="w-5 h-5" />
                    <span className="font-medium">{currentSeason.temperature}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div className="p-8 lg:p-12">
              <div className="flex items-center space-x-3 mb-6">
                <currentSeason.icon className="w-8 h-8 text-japanese-red" />
                <h3 className="text-3xl font-bold text-gray-900">{currentSeason.name}</h3>
              </div>

              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                {currentSeason.description}
              </p>

              {/* Highlights */}
              <div className="mb-8">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Season Highlights</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentSeason.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-japanese-red rounded-full"></div>
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Destinations */}
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Top Destinations</h4>
                <div className="space-y-4">
                  {currentSeason.destinations.map((destination, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white/70 rounded-xl border border-white/50">
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-japanese-red" />
                        <span className="font-medium text-gray-900">{destination.name}</span>
                      </div>
                      <span className="text-sm text-gray-600 bg-white/50 px-3 py-1 rounded-full">
                        {destination.specialty}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-8">
                <button className="w-full bg-gradient-to-r from-japanese-red to-sakura-500 text-white py-4 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold text-lg flex items-center justify-center space-x-2">
                  <Camera className="w-5 h-5" />
                  <span>Explore {currentSeason.name} Destinations</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Weather Tips */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Planning Your Visit</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-sakura-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-japanese-red" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Best Booking Time</h4>
              <p className="text-gray-600">Book 2-3 months in advance for peak seasons like cherry blossom and autumn foliage.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-sakura-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Thermometer className="w-8 h-8 text-japanese-red" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">What to Pack</h4>
              <p className="text-gray-600">Layer clothing for temperature changes and always pack comfortable walking shoes.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-sakura-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-japanese-red" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Photography Tips</h4>
              <p className="text-gray-600">Golden hour provides the best lighting for capturing Japan's natural beauty.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Seasons;
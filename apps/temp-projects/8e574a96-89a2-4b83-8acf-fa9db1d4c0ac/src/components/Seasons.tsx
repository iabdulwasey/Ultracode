import React, { useState } from 'react';
import { Calendar, Thermometer, Cloud, Sun, Snowflake, Flower } from 'lucide-react';

interface Season {
  id: number;
  name: string;
  months: string;
  temperature: string;
  description: string;
  highlights: string[];
  activities: string[];
  image: string;
  icon: React.ElementType;
  color: string;
  pros: string[];
  cons: string[];
}

const seasons: Season[] = [
  {
    id: 1,
    name: 'Spring',
    months: 'March - May',
    temperature: '10-20°C (50-68°F)',
    description: 'The most famous season in Japan, when cherry blossoms bloom across the country.',
    highlights: ['Cherry Blossoms', 'Mild Weather', 'Golden Week', 'Hanami Parties'],
    activities: ['Hanami Picnics', 'Temple Visits', 'Garden Tours', 'Photography'],
    image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=600&h=400&fit=crop',
    icon: Flower,
    color: 'from-pink-400 to-rose-500',
    pros: ['Perfect weather', 'Beautiful sakura', 'Comfortable temperatures', 'Clear skies'],
    cons: ['Crowded attractions', 'Higher prices', 'Short bloom period', 'Booking challenges']
  },
  {
    id: 2,
    name: 'Summer',
    months: 'June - August',
    temperature: '25-35°C (77-95°F)',
    description: 'Hot and humid season with vibrant festivals, fireworks, and mountain escapes.',
    highlights: ['Summer Festivals', 'Fireworks', 'Beach Season', 'Mountain Hiking'],
    activities: ['Festival Hopping', 'Beach Visits', 'Hiking', 'Firework Shows'],
    image: 'https://images.unsplash.com/photo-1554797589-7241bb691973?w=600&h=400&fit=crop',
    icon: Sun,
    color: 'from-orange-400 to-red-500',
    pros: ['Vibrant festivals', 'Long daylight hours', 'Beach activities', 'Lush greenery'],
    cons: ['Very hot and humid', 'Rainy season', 'Crowded beaches', 'High UV levels']
  },
  {
    id: 3,
    name: 'Autumn',
    months: 'September - November',
    temperature: '15-25°C (59-77°F)',
    description: 'Spectacular fall colors transform Japan into a canvas of red, orange, and gold.',
    highlights: ['Fall Foliage', 'Comfortable Weather', 'Harvest Season', 'Clear Views'],
    activities: ['Leaf Peeping', 'Temple Visits', 'Mountain Climbing', 'Food Tours'],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop',
    icon: Cloud,
    color: 'from-amber-400 to-orange-600',
    pros: ['Stunning foliage', 'Perfect weather', 'Clear mountain views', 'Harvest foods'],
    cons: ['Popular season', 'Higher accommodation costs', 'Typhoon season', 'Shorter days']
  },
  {
    id: 4,
    name: 'Winter',
    months: 'December - February',
    temperature: '0-10°C (32-50°F)',
    description: 'Snowy landscapes, hot springs, and winter illuminations create magical experiences.',
    highlights: ['Snow Festivals', 'Hot Springs', 'Winter Sports', 'Illuminations'],
    activities: ['Skiing', 'Onsen Bathing', 'Snow Monkeys', 'Winter Festivals'],
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
    icon: Snowflake,
    color: 'from-blue-400 to-indigo-600',
    pros: ['Fewer crowds', 'Snow activities', 'Hot spring season', 'Winter illuminations'],
    cons: ['Cold temperatures', 'Shorter daylight', 'Some attractions closed', 'Heavy snow in north']
  }
];

const Seasons: React.FC = () => {
  const [selectedSeason, setSelectedSeason] = useState<Season>(seasons[0]);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Best Time to <span className="gradient-text">Visit</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Each season in Japan offers unique experiences and breathtaking beauty
          </p>
        </div>

        {/* Season Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {seasons.map((season) => {
            const IconComponent = season.icon;
            return (
              <button
                key={season.id}
                onClick={() => setSelectedSeason(season)}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                  selectedSeason.id === season.id
                    ? `bg-gradient-to-br ${season.color} text-white border-transparent shadow-lg transform scale-105`
                    : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
              >
                <IconComponent className={`w-8 h-8 mx-auto mb-3 ${
                  selectedSeason.id === season.id ? 'text-white' : 'text-gray-600'
                }`} />
                <h3 className="font-bold text-lg mb-1">{season.name}</h3>
                <p className={`text-sm ${
                  selectedSeason.id === season.id ? 'text-white/80' : 'text-gray-500'
                }`}>
                  {season.months}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Season Details */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image */}
            <div className="relative h-64 lg:h-auto">
              <img
                src={selectedSeason.image}
                alt={selectedSeason.name}
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-br ${selectedSeason.color} opacity-20`}></div>
              <div className="absolute top-6 left-6">
                <div className={`bg-gradient-to-br ${selectedSeason.color} text-white rounded-full p-4`}>
                  <selectedSeason.icon className="w-8 h-8" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 lg:p-12">
              <div className="mb-6">
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{selectedSeason.name}</h3>
                <div className="flex items-center space-x-4 text-gray-600 mb-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>{selectedSeason.months}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Thermometer className="w-5 h-5" />
                    <span>{selectedSeason.temperature}</span>
                  </div>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">{selectedSeason.description}</p>
              </div>

              {/* Highlights */}
              <div className="mb-6">
                <h4 className="font-bold text-gray-900 mb-3">Season Highlights</h4>
                <div className="grid grid-cols-2 gap-2">
                  {selectedSeason.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className={`w-2 h-2 bg-gradient-to-r ${selectedSeason.color} rounded-full`}></div>
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activities */}
              <div className="mb-6">
                <h4 className="font-bold text-gray-900 mb-3">Popular Activities</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSeason.activities.map((activity, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 bg-gradient-to-r ${selectedSeason.color} text-white rounded-full text-sm font-medium`}
                    >
                      {activity}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pros and Cons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-green-700 mb-3 flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    Pros
                  </h4>
                  <ul className="space-y-1">
                    {selectedSeason.pros.map((pro, index) => (
                      <li key={index} className="text-gray-700 text-sm">• {pro}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-red-700 mb-3 flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    Considerations
                  </h4>
                  <ul className="space-y-1">
                    {selectedSeason.cons.map((con, index) => (
                      <li key={index} className="text-gray-700 text-sm">• {con}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Weather Tips */}
        <div className="mt-16 bg-gradient-to-r from-japan-navy to-slate-800 rounded-3xl p-8 md:p-12 text-white">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              Weather Planning Tips
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-japan-cherry/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-japan-cherry" />
                </div>
                <h4 className="text-xl font-bold mb-2">Book in Advance</h4>
                <p className="text-gray-300">Popular seasons fill up quickly. Book accommodations 3-6 months ahead.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-japan-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Thermometer className="w-8 h-8 text-japan-gold" />
                </div>
                <h4 className="text-xl font-bold mb-2">Pack Smart</h4>
                <p className="text-gray-300">Layer clothing and check regional weather variations before traveling.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-japan-sage/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Cloud className="w-8 h-8 text-japan-sage" />
                </div>
                <h4 className="text-xl font-bold mb-2">Stay Flexible</h4>
                <p className="text-gray-300">Weather can be unpredictable. Have indoor backup plans for rainy days.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <button className="bg-gradient-to-r from-japan-red to-japan-cherry text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-200 transform hover:scale-105">
            Plan Your Perfect Trip
          </button>
        </div>
      </div>
    </section>
  );
};

export default Seasons;
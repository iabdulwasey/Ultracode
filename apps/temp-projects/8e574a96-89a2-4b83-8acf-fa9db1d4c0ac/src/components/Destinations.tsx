import React, { useState } from 'react';
import { MapPin, Clock, Star, ArrowRight, Camera } from 'lucide-react';

interface Destination {
  id: number;
  name: string;
  region: string;
  description: string;
  image: string;
  duration: string;
  rating: number;
  highlights: string[];
  bestTime: string;
}

const destinations: Destination[] = [
  {
    id: 1,
    name: 'Tokyo',
    region: 'Kanto',
    description: 'The vibrant capital city where ultra-modern skyscrapers meet traditional temples.',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=400&fit=crop',
    duration: '3-5 days',
    rating: 4.9,
    highlights: ['Shibuya Crossing', 'Senso-ji Temple', 'Tokyo Skytree', 'Harajuku'],
    bestTime: 'Spring & Fall'
  },
  {
    id: 2,
    name: 'Kyoto',
    region: 'Kansai',
    description: 'Ancient capital with over 2,000 temples, traditional geisha districts, and zen gardens.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&h=400&fit=crop',
    duration: '2-4 days',
    rating: 4.8,
    highlights: ['Fushimi Inari', 'Kinkaku-ji', 'Arashiyama Bamboo', 'Gion District'],
    bestTime: 'Spring & Fall'
  },
  {
    id: 3,
    name: 'Mount Fuji',
    region: 'Chubu',
    description: 'Iconic sacred mountain and symbol of Japan, perfect for hiking and photography.',
    image: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=600&h=400&fit=crop',
    duration: '1-2 days',
    rating: 4.7,
    highlights: ['Fuji Five Lakes', 'Climbing Season', 'Hot Springs', 'Scenic Views'],
    bestTime: 'Summer (Climbing)'
  },
  {
    id: 4,
    name: 'Osaka',
    region: 'Kansai',
    description: 'Japan\'s kitchen known for incredible street food, castles, and friendly locals.',
    image: 'https://images.unsplash.com/photo-1590253230532-a67f6bc61c9e?w=600&h=400&fit=crop',
    duration: '2-3 days',
    rating: 4.6,
    highlights: ['Osaka Castle', 'Dotonbori', 'Universal Studios', 'Street Food'],
    bestTime: 'Year Round'
  },
  {
    id: 5,
    name: 'Hiroshima',
    region: 'Chugoku',
    description: 'Historic city with powerful memorials and the famous floating torii gate nearby.',
    image: 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=600&h=400&fit=crop',
    duration: '1-2 days',
    rating: 4.5,
    highlights: ['Peace Memorial', 'Miyajima Island', 'Itsukushima Shrine', 'Local Cuisine'],
    bestTime: 'Spring & Fall'
  },
  {
    id: 6,
    name: 'Nara',
    region: 'Kansai',
    description: 'Ancient capital famous for free-roaming deer and magnificent temples.',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
    duration: '1 day',
    rating: 4.4,
    highlights: ['Todai-ji Temple', 'Nara Deer Park', 'Kasuga Taisha', 'Buddha Statue'],
    bestTime: 'Spring & Fall'
  }
];

const Destinations: React.FC = () => {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [filter, setFilter] = useState<string>('All');

  const regions = ['All', 'Kanto', 'Kansai', 'Chubu', 'Chugoku'];
  
  const filteredDestinations = filter === 'All' 
    ? destinations 
    : destinations.filter(dest => dest.region === filter);

  return (
    <section id="destinations" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Popular <span className="gradient-text">Destinations</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore Japan's most captivating destinations, from bustling metropolises to serene temples
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => setFilter(region)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                filter === region
                  ? 'bg-gradient-to-r from-japan-red to-japan-cherry text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-japan-red hover:text-japan-red'
              }`}
            >
              {region}
            </button>
          ))}
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((destination) => (
            <div
              key={destination.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden cursor-pointer"
              onClick={() => setSelectedDestination(destination)}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                  <Star className="w-4 h-4 text-japan-gold fill-current" />
                  <span className="text-sm font-medium">{destination.rating}</span>
                </div>
                <div className="absolute bottom-4 left-4 bg-japan-red/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                  {destination.region}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{destination.name}</h3>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {destination.duration}
                  </div>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">{destination.description}</p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {destination.highlights.slice(0, 2).map((highlight, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {highlight}
                    </span>
                  ))}
                  {destination.highlights.length > 2 && (
                    <span className="text-gray-500 text-xs font-medium px-2 py-1">
                      +{destination.highlights.length - 2} more
                    </span>
                  )}
                </div>

                {/* Best Time */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-1" />
                    Best: {destination.bestTime}
                  </div>
                  <ArrowRight className="w-5 h-5 text-japan-red group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for selected destination */}
        {selectedDestination && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="relative">
                <img
                  src={selectedDestination.image}
                  alt={selectedDestination.name}
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={() => setSelectedDestination(null)}
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors duration-200"
                >
                  <ArrowRight className="w-5 h-5 rotate-45" />
                </button>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">{selectedDestination.name}</h3>
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-japan-gold fill-current" />
                    <span className="font-medium">{selectedDestination.rating}</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-6">{selectedDestination.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Duration</h4>
                    <p className="text-gray-600">{selectedDestination.duration}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Best Time</h4>
                    <p className="text-gray-600">{selectedDestination.bestTime}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Top Highlights</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedDestination.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Camera className="w-4 h-4 text-japan-red" />
                        <span className="text-gray-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-japan-red to-japan-cherry text-white py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-200">
                  Plan Your Visit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Destinations;
import React, { useState } from 'react';
import { MapPin, Star, Clock, Users } from 'lucide-react';

interface Destination {
  id: number;
  name: string;
  location: string;
  image: string;
  rating: number;
  duration: string;
  visitors: string;
  description: string;
  highlights: string[];
  category: string;
}

const Destinations: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const destinations: Destination[] = [
    {
      id: 1,
      name: "Great Wall of China",
      location: "Beijing",
      image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&h=600&fit=crop",
      rating: 4.9,
      duration: "Full Day",
      visitors: "10M+ yearly",
      description: "Walk along the most iconic symbol of China, stretching over 13,000 miles.",
      highlights: ["Mutianyu Section", "Sunrise Views", "Cable Car Access", "Historical Significance"],
      category: "historical"
    },
    {
      id: 2,
      name: "Forbidden City",
      location: "Beijing",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop",
      rating: 4.8,
      duration: "Half Day",
      visitors: "8M+ yearly",
      description: "Explore the imperial palace complex with 980 surviving buildings.",
      highlights: ["Imperial Throne", "Palace Museum", "Ancient Architecture", "Cultural Artifacts"],
      category: "historical"
    },
    {
      id: 3,
      name: "Li River",
      location: "Guilin",
      image: "https://images.unsplash.com/photo-1519817914152-22d216bb9170?w=800&h=600&fit=crop",
      rating: 4.7,
      duration: "2-3 Days",
      visitors: "5M+ yearly",
      description: "Cruise through stunning karst landscapes and traditional fishing villages.",
      highlights: ["Karst Mountains", "Bamboo Rafting", "Fishing Villages", "Photography"],
      category: "nature"
    },
    {
      id: 4,
      name: "Shanghai Skyline",
      location: "Shanghai",
      image: "https://images.unsplash.com/photo-1545893835-abaa50cbe628?w=800&h=600&fit=crop",
      rating: 4.6,
      duration: "2 Days",
      visitors: "15M+ yearly",
      description: "Experience the futuristic cityscape and vibrant nightlife of modern China.",
      highlights: ["The Bund", "Oriental Pearl Tower", "Huangpu River", "Modern Architecture"],
      category: "modern"
    },
    {
      id: 5,
      name: "Zhangjiajie National Forest",
      location: "Hunan",
      image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=800&h=600&fit=crop",
      rating: 4.8,
      duration: "3-4 Days",
      visitors: "3M+ yearly",
      description: "Marvel at the towering sandstone pillars that inspired Avatar's floating mountains.",
      highlights: ["Avatar Mountains", "Glass Bridge", "Cable Cars", "Tianmen Cave"],
      category: "nature"
    },
    {
      id: 6,
      name: "Terracotta Army",
      location: "Xi'an",
      image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop",
      rating: 4.9,
      duration: "Half Day",
      visitors: "4M+ yearly",
      description: "Witness the incredible army of life-sized terracotta soldiers guarding Emperor Qin.",
      highlights: ["8,000 Warriors", "Archaeological Site", "Ancient Craftsmanship", "Historical Mystery"],
      category: "historical"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Destinations' },
    { id: 'historical', name: 'Historical' },
    { id: 'nature', name: 'Nature' },
    { id: 'modern', name: 'Modern' }
  ];

  const filteredDestinations = activeCategory === 'all' 
    ? destinations 
    : destinations.filter(dest => dest.category === activeCategory);

  return (
    <section id="destinations" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Must-Visit</span> Destinations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From ancient wonders to modern marvels, discover the most breathtaking places China has to offer
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-chinese-red to-chinese-gold text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((destination) => (
            <div
              key={destination.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
                  <Star className="w-4 h-4 text-chinese-gold fill-current" />
                  <span className="text-sm font-medium">{destination.rating}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="w-4 h-4 text-chinese-red" />
                  <span className="text-sm text-gray-600">{destination.location}</span>
                </div>
                
                <h3 className="text-xl font-bold mb-3 group-hover:text-chinese-red transition-colors">
                  {destination.name}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {destination.description}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{destination.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{destination.visitors}</span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {destination.highlights.slice(0, 2).map((highlight, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                {/* CTA Button */}
                <button className="w-full bg-gradient-to-r from-chinese-red to-chinese-gold text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-200">
                  Explore Now
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
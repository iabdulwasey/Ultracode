import React, { useState } from 'react';
import { MapPin, Clock, Users, Star, ArrowRight } from 'lucide-react';
import DestinationModal from './DestinationModal';

interface Destination {
  id: number;
  name: string;
  prefecture: string;
  description: string;
  image: string;
  rating: number;
  duration: string;
  visitors: string;
  highlights: string[];
  category: 'traditional' | 'modern' | 'nature' | 'cultural';
}

const Destinations: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const destinations: Destination[] = [
    {
      id: 1,
      name: "Fushimi Inari Shrine",
      prefecture: "Kyoto",
      description: "Famous for thousands of vermillion torii gates that create tunnels up the mountain.",
      image: "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.8,
      duration: "2-3 hours",
      visitors: "2.6M/year",
      highlights: ["10,000 Torii Gates", "Mountain Hiking", "Fox Statues", "Sacred Shrine"],
      category: 'traditional'
    },
    {
      id: 2,
      name: "Tokyo Skytree",
      prefecture: "Tokyo",
      description: "World's second tallest structure offering breathtaking views of Tokyo metropolis.",
      image: "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.6,
      duration: "1-2 hours",
      visitors: "5.8M/year",
      highlights: ["634m Height", "Observatory Decks", "Shopping Complex", "LED Illumination"],
      category: 'modern'
    },
    {
      id: 3,
      name: "Mount Fuji",
      prefecture: "Shizuoka/Yamanashi",
      description: "Japan's sacred mountain and highest peak, symbol of natural beauty and spiritual power.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.9,
      duration: "1-2 days",
      visitors: "300K climbers/year",
      highlights: ["3,776m Peak", "UNESCO Site", "Five Lakes", "Climbing Season"],
      category: 'nature'
    },
    {
      id: 4,
      name: "Arashiyama Bamboo Grove",
      prefecture: "Kyoto",
      description: "Enchanting bamboo forest creating natural green tunnels with mystical atmosphere.",
      image: "https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.7,
      duration: "1 hour",
      visitors: "1.2M/year",
      highlights: ["Bamboo Tunnels", "Photography Spot", "Tenryu-ji Temple", "Monkey Park"],
      category: 'nature'
    },
    {
      id: 5,
      name: "Senso-ji Temple",
      prefecture: "Tokyo",
      description: "Tokyo's oldest temple with traditional architecture and vibrant market street.",
      image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.5,
      duration: "2 hours",
      visitors: "30M/year",
      highlights: ["1400 Years Old", "Thunder Gate", "Nakamise Street", "Traditional Crafts"],
      category: 'traditional'
    },
    {
      id: 6,
      name: "Shibuya Crossing",
      prefecture: "Tokyo",
      description: "World's busiest pedestrian crossing, epitome of Tokyo's urban energy.",
      image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.4,
      duration: "30 minutes",
      visitors: "3M daily crossings",
      highlights: ["Busiest Crossing", "Hachiko Statue", "Sky View", "Neon Lights"],
      category: 'modern'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Destinations', count: destinations.length },
    { id: 'traditional', label: 'Traditional', count: destinations.filter(d => d.category === 'traditional').length },
    { id: 'modern', label: 'Modern', count: destinations.filter(d => d.category === 'modern').length },
    { id: 'nature', label: 'Nature', count: destinations.filter(d => d.category === 'nature').length },
    { id: 'cultural', label: 'Cultural', count: destinations.filter(d => d.category === 'cultural').length }
  ];

  const filteredDestinations = activeCategory === 'all' 
    ? destinations 
    : destinations.filter(dest => dest.category === activeCategory);

  const handleExploreDetails = (destination: Destination) => {
    setSelectedDestination(destination);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDestination(null);
  };

  return (
    <section id="destinations" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-japan-cherry/10 rounded-full px-4 py-2 mb-4">
            <MapPin className="w-4 h-4 text-japan-red" />
            <span className="text-japan-red text-sm font-medium">Top Destinations</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Must-Visit Places in <span className="gradient-text">Japan</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From ancient temples to modern skyscrapers, discover the incredible diversity 
            that makes Japan a truly unique travel destination.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-japan-red to-japan-cherry text-white shadow-lg scale-105'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {category.label}
              <span className="ml-2 text-sm opacity-75">({category.count})</span>
            </button>
          ))}
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((destination, index) => (
            <div
              key={destination.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 card-hover"
              onMouseEnter={() => setHoveredCard(destination.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                  <Star className="w-4 h-4 text-japan-gold fill-current" />
                  <span className="text-sm font-semibold">{destination.rating}</span>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-japan-red/90 text-white px-3 py-1 rounded-full text-xs font-medium capitalize">
                  {destination.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-japan-red transition-colors">
                      {destination.name}
                    </h3>
                    <p className="text-sm text-gray-500 flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {destination.prefecture}
                    </p>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
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
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {destination.highlights.slice(0, 3).map((highlight, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                      >
                        {highlight}
                      </span>
                    ))}
                    {destination.highlights.length > 3 && (
                      <span className="text-xs text-gray-400 px-2 py-1">
                        +{destination.highlights.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* CTA Button */}
                <button 
                  onClick={() => handleExploreDetails(destination)}
                  className="w-full bg-gradient-to-r from-japan-red to-japan-cherry text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 group"
                >
                  <span>Explore Details</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-white border-2 border-japan-red text-japan-red px-8 py-3 rounded-full font-semibold hover:bg-japan-red hover:text-white transition-all duration-300 hover:scale-105">
            Discover More Destinations
          </button>
        </div>
      </div>

      {/* Destination Modal */}
      <DestinationModal 
        destination={selectedDestination}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </section>
  );
};

export default Destinations;
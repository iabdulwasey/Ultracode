import React, { useState } from 'react';
import { MapPin, Star, Clock, Users, ArrowRight, Heart } from 'lucide-react';

const FeaturedDestinations: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [likedDestinations, setLikedDestinations] = useState<Set<number>>(new Set());

  const destinations = [
    {
      id: 1,
      name: "Tokyo",
      region: "Kanto",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=400&fit=crop&crop=center",
      description: "The bustling capital where tradition meets innovation",
      highlights: ["Shibuya Crossing", "Tokyo Skytree", "Senso-ji Temple"],
      rating: 4.9,
      visitors: "15M+",
      duration: "3-5 days",
      category: "Modern City"
    },
    {
      id: 2,
      name: "Kyoto",
      region: "Kansai",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&h=400&fit=crop&crop=center",
      description: "Ancient capital with over 2,000 temples and shrines",
      highlights: ["Fushimi Inari", "Kiyomizu-dera", "Bamboo Grove"],
      rating: 4.8,
      visitors: "8M+",
      duration: "2-4 days",
      category: "Cultural Heritage"
    },
    {
      id: 3,
      name: "Mount Fuji",
      region: "Honshu",
      image: "https://images.unsplash.com/photo-1576104635759-b7e72c6b7e2a?w=600&h=400&fit=crop&crop=center",
      description: "Japan's sacred mountain and iconic symbol",
      highlights: ["Climbing Season", "Five Lakes", "Hot Springs"],
      rating: 4.7,
      visitors: "5M+",
      duration: "1-2 days",
      category: "Natural Wonder"
    },
    {
      id: 4,
      name: "Osaka",
      region: "Kansai",
      image: "https://images.unsplash.com/photo-1590253230532-01a6c9b6c0c4?w=600&h=400&fit=crop&crop=center",
      description: "Japan's kitchen with incredible street food culture",
      highlights: ["Dotonbori", "Osaka Castle", "Takoyaki"],
      rating: 4.6,
      visitors: "12M+",
      duration: "2-3 days",
      category: "Food Paradise"
    },
    {
      id: 5,
      name: "Hiroshima",
      region: "Chugoku",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&crop=center",
      description: "Historic city with powerful memorials and natural beauty",
      highlights: ["Peace Memorial", "Miyajima Island", "Itsukushima Shrine"],
      rating: 4.5,
      visitors: "3M+",
      duration: "1-2 days",
      category: "Historical"
    },
    {
      id: 6,
      name: "Nara",
      region: "Kansai",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&crop=center",
      description: "Ancient capital famous for friendly deer and temples",
      highlights: ["Todai-ji Temple", "Nara Park", "Deer Feeding"],
      rating: 4.4,
      visitors: "2M+",
      duration: "1 day",
      category: "Nature & Wildlife"
    }
  ];

  const toggleLike = (id: number) => {
    const newLiked = new Set(likedDestinations);
    if (newLiked.has(id)) {
      newLiked.delete(id);
    } else {
      newLiked.add(id);
    }
    setLikedDestinations(newLiked);
  };

  return (
    <section id="destinations" className="py-20 bg-gradient-to-br from-white to-sakura-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Featured <span className="text-japanese-red">Destinations</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover Japan's most captivating destinations, from bustling metropolises to serene temples, 
            each offering unique experiences that will create memories to last a lifetime.
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <div
              key={destination.id}
              className={`group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform ${
                hoveredCard === index ? 'scale-105 -translate-y-2' : ''
              }`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-800">
                  {destination.category}
                </div>
                
                {/* Like Button */}
                <button
                  onClick={() => toggleLike(destination.id)}
                  className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 transition-colors ${
                      likedDestinations.has(destination.id)
                        ? 'text-japanese-red fill-current'
                        : 'text-gray-600'
                    }`}
                  />
                </button>

                {/* Location */}
                <div className="absolute bottom-4 left-4 flex items-center text-white">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">{destination.region}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-2xl font-bold text-gray-900">{destination.name}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700">{destination.rating}</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">{destination.description}</p>

                {/* Stats */}
                <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{destination.visitors}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{destination.duration}</span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {destination.highlights.slice(0, 3).map((highlight, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-sakura-100 text-sakura-700 text-xs rounded-full"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <button className="w-full bg-gradient-to-r from-japanese-red to-sakura-500 text-white py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-medium flex items-center justify-center space-x-2 group">
                  <span>Explore {destination.name}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="bg-white text-japanese-red border-2 border-japanese-red px-8 py-4 rounded-full hover:bg-japanese-red hover:text-white transition-all duration-300 font-semibold text-lg">
            View All Destinations
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;
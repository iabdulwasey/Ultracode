import React, { useState } from 'react';
import { MapPin, Clock, Star, Heart, ArrowRight } from 'lucide-react';

const FeaturedDestinations: React.FC = () => {
  const [likedDestinations, setLikedDestinations] = useState<Set<number>>(new Set());

  const destinations = [
    {
      id: 1,
      name: "Fushimi Inari Shrine",
      location: "Kyoto",
      image: "https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      description: "Famous for thousands of vermillion torii gates creating tunnels up the mountainside",
      duration: "2-3 hours",
      rating: 4.8,
      price: "Free",
      category: "Temple",
      highlights: ["10,000 Torii Gates", "Mountain Hiking", "Photography"]
    },
    {
      id: 2,
      name: "Shibuya Crossing",
      location: "Tokyo",
      image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      description: "The world's busiest pedestrian crossing in the heart of Tokyo",
      duration: "1 hour",
      rating: 4.6,
      price: "Free",
      category: "Urban",
      highlights: ["Iconic Crossing", "Night Views", "Shopping"]
    },
    {
      id: 3,
      name: "Arashiyama Bamboo Grove",
      location: "Kyoto",
      image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      description: "Walk through towering bamboo stalks creating a natural green tunnel",
      duration: "1-2 hours",
      rating: 4.7,
      price: "Free",
      category: "Nature",
      highlights: ["Bamboo Forest", "Peaceful Walk", "Unique Acoustics"]
    },
    {
      id: 4,
      name: "Senso-ji Temple",
      location: "Tokyo",
      image: "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      description: "Tokyo's oldest temple with traditional architecture and bustling market street",
      duration: "2 hours",
      rating: 4.5,
      price: "Free",
      category: "Temple",
      highlights: ["Historic Temple", "Traditional Market", "Cultural Experience"]
    },
    {
      id: 5,
      name: "Mount Fuji 5th Station",
      location: "Yamanashi",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      description: "Closest point to Mount Fuji's summit accessible by car with stunning views",
      duration: "Half day",
      rating: 4.9,
      price: "¥2,100",
      category: "Mountain",
      highlights: ["Mount Fuji Views", "Alpine Experience", "Souvenir Shops"]
    },
    {
      id: 6,
      name: "Nara Deer Park",
      location: "Nara",
      image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      description: "Interact with over 1,200 free-roaming deer in this historic park",
      duration: "3-4 hours",
      rating: 4.6,
      price: "Free",
      category: "Nature",
      highlights: ["Sacred Deer", "Todai-ji Temple", "Park Stroll"]
    }
  ];

  const toggleLike = (id: number) => {
    setLikedDestinations(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <section id="destinations" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold gradient-text mb-6">
            Featured Destinations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover Japan's most captivating places, from ancient temples to modern marvels. 
            Each destination offers a unique glimpse into the country's rich culture and natural beauty.
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <div
              key={destination.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover-lift group"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-japan-red text-white px-3 py-1 rounded-full text-sm font-medium">
                    {destination.category}
                  </span>
                </div>

                {/* Like Button */}
                <button
                  onClick={() => toggleLike(destination.id)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors group"
                >
                  <Heart
                    className={`w-5 h-5 transition-colors ${
                      likedDestinations.has(destination.id)
                        ? 'text-japan-red fill-japan-red'
                        : 'text-white group-hover:text-japan-red'
                    }`}
                  />
                </button>

                {/* Price */}
                <div className="absolute bottom-4 left-4">
                  <span className="bg-japan-gold text-japan-navy px-3 py-1 rounded-full text-sm font-bold">
                    {destination.price}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {destination.name}
                    </h3>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{destination.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-japan-gold fill-japan-gold mr-1" />
                    <span className="text-sm font-medium text-gray-700">
                      {destination.rating}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {destination.description}
                </p>

                {/* Duration */}
                <div className="flex items-center text-gray-500 mb-4">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="text-sm">{destination.duration}</span>
                </div>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {destination.highlights.slice(0, 2).map((highlight, index) => (
                    <span
                      key={index}
                      className="bg-japan-cherry/20 text-japan-navy px-2 py-1 rounded-md text-xs font-medium"
                    >
                      {highlight}
                    </span>
                  ))}
                  {destination.highlights.length > 2 && (
                    <span className="text-xs text-gray-500 px-2 py-1">
                      +{destination.highlights.length - 2} more
                    </span>
                  )}
                </div>

                {/* CTA Button */}
                <button className="w-full bg-gradient-to-r from-japan-red to-japan-gold text-white py-3 px-4 rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 group">
                  <span>Explore Details</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="bg-white text-japan-red border-2 border-japan-red px-8 py-3 rounded-full font-semibold hover:bg-japan-red hover:text-white transition-all duration-300">
            View All Destinations
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;
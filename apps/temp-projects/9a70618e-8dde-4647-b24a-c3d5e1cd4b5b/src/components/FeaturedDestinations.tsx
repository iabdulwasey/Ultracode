import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';

const FeaturedDestinations: React.FC = () => {
  const destinations = [
    {
      id: 1,
      name: 'Paris, France',
      image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=500&h=300&fit=crop',
      distance: '4,000 miles away',
      description: 'City of lights and romance',
    },
    {
      id: 2,
      name: 'Tokyo, Japan',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500&h=300&fit=crop',
      distance: '6,000 miles away',
      description: 'Modern meets traditional',
    },
    {
      id: 3,
      name: 'Santorini, Greece',
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=500&h=300&fit=crop',
      distance: '5,500 miles away',
      description: 'Stunning sunsets and blue domes',
    },
    {
      id: 4,
      name: 'Bali, Indonesia',
      image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=500&h=300&fit=crop',
      distance: '8,000 miles away',
      description: 'Tropical paradise',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Inspiration for your next trip
            </h2>
            <p className="text-xl text-gray-600">
              Discover amazing destinations around the world
            </p>
          </div>
          <button className="hidden md:flex items-center space-x-2 text-airbnb-primary hover:text-airbnb-primary/80 transition-colors">
            <span className="font-semibold">View all</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinations.map((destination, index) => (
            <div
              key={destination.id}
              className="group cursor-pointer hover-lift animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden rounded-2xl mb-4">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center space-x-1 mb-2">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{destination.distance}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-airbnb-primary transition-colors">
                  {destination.name}
                </h3>
                <p className="text-gray-600">{destination.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 md:hidden">
          <button className="inline-flex items-center space-x-2 text-airbnb-primary hover:text-airbnb-primary/80 transition-colors">
            <span className="font-semibold">View all destinations</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;
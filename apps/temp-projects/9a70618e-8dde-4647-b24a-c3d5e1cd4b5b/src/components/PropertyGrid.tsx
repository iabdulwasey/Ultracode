import React, { useState } from 'react';
import { Heart, Star, Wifi, Car, Coffee } from 'lucide-react';

const PropertyGrid: React.FC = () => {
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const properties = [
    {
      id: 1,
      title: 'Stunning Beachfront Villa',
      location: 'Malibu, California',
      price: 450,
      rating: 4.9,
      reviews: 128,
      images: [
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
      ],
      amenities: ['wifi', 'parking', 'breakfast'],
      host: 'Superhost',
    },
    {
      id: 2,
      title: 'Modern Downtown Loft',
      location: 'New York, NY',
      price: 280,
      rating: 4.8,
      reviews: 95,
      images: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop',
      ],
      amenities: ['wifi', 'parking'],
      host: 'Superhost',
    },
    {
      id: 3,
      title: 'Cozy Mountain Cabin',
      location: 'Aspen, Colorado',
      price: 320,
      rating: 4.95,
      reviews: 67,
      images: [
        'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=400&h=300&fit=crop',
      ],
      amenities: ['wifi', 'breakfast'],
      host: 'Superhost',
    },
    {
      id: 4,
      title: 'Luxury City Penthouse',
      location: 'Miami, Florida',
      price: 650,
      rating: 4.92,
      reviews: 203,
      images: [
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop',
      ],
      amenities: ['wifi', 'parking', 'breakfast'],
      host: 'Superhost',
    },
    {
      id: 5,
      title: 'Charming Countryside Cottage',
      location: 'Tuscany, Italy',
      price: 180,
      rating: 4.87,
      reviews: 156,
      images: [
        'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop',
      ],
      amenities: ['wifi', 'breakfast'],
      host: 'Superhost',
    },
    {
      id: 6,
      title: 'Tropical Beach House',
      location: 'Tulum, Mexico',
      price: 390,
      rating: 4.91,
      reviews: 89,
      images: [
        'https://images.unsplash.com/photo-1520637836862-4d197d17c26a?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&h=300&fit=crop',
      ],
      amenities: ['wifi', 'parking'],
      host: 'Superhost',
    },
  ];

  const toggleFavorite = (id: number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'wifi':
        return <Wifi className="w-4 h-4" />;
      case 'parking':
        return <Car className="w-4 h-4" />;
      case 'breakfast':
        return <Coffee className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Stay anywhere
          </h2>
          <p className="text-xl text-gray-600">
            Over 1,000 places to stay in more than 220 countries and regions worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property, index) => (
            <div
              key={property.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover-lift animate-fade-in group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                <button
                  onClick={() => toggleFavorite(property.id)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 hover:scale-110"
                >
                  <Heart
                    className={`w-5 h-5 transition-colors ${
                      favorites.has(property.id)
                        ? 'text-airbnb-primary fill-current'
                        : 'text-gray-600'
                    }`}
                  />
                </button>

                {property.host && (
                  <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-xs font-semibold text-gray-700">
                    {property.host}
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-airbnb-primary transition-colors">
                    {property.title}
                  </h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700">
                      {property.rating}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{property.location}</p>

                <div className="flex items-center space-x-3 mb-4">
                  {property.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full text-gray-600"
                      title={amenity}
                    >
                      {getAmenityIcon(amenity)}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">
                      ${property.price}
                    </span>
                    <span className="text-gray-600"> / night</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {property.reviews} reviews
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-airbnb-primary to-pink-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            Show more places
          </button>
        </div>
      </div>
    </section>
  );
};

export default PropertyGrid;
import React, { useState } from 'react';
import { Filter, Star, Wifi, Car, Coffee, Waves, Mountain, Building, TreePine } from 'lucide-react';

const SearchFilters: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All', icon: Building },
    { id: 'beachfront', label: 'Beachfront', icon: Waves },
    { id: 'mountain', label: 'Mountain', icon: Mountain },
    { id: 'cabin', label: 'Cabins', icon: TreePine },
    { id: 'city', label: 'City', icon: Building },
    { id: 'luxury', label: 'Luxury', icon: Star },
  ];

  const amenities = [
    { id: 'wifi', label: 'Wifi', icon: Wifi },
    { id: 'parking', label: 'Parking', icon: Car },
    { id: 'breakfast', label: 'Breakfast', icon: Coffee },
  ];

  return (
    <section className="sticky top-16 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Category Filters */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-6 overflow-x-auto scrollbar-hide">
            {filters.map((filter) => {
              const IconComponent = filter.icon;
              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`flex flex-col items-center space-y-2 px-4 py-2 rounded-lg transition-all duration-300 whitespace-nowrap ${
                    activeFilter === filter.id
                      ? 'bg-airbnb-primary text-white shadow-lg scale-105'
                      : 'text-gray-600 hover:text-airbnb-primary hover:bg-gray-50'
                  }`}
                >
                  <IconComponent className="w-6 h-6" />
                  <span className="text-sm font-medium">{filter.label}</span>
                </button>
              );
            })}
          </div>

          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-airbnb-primary transition-colors">
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Filters</span>
          </button>
        </div>

        {/* Amenities */}
        <div className="flex items-center space-x-4 overflow-x-auto scrollbar-hide">
          <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Popular amenities:</span>
          {amenities.map((amenity) => {
            const IconComponent = amenity.icon;
            return (
              <button
                key={amenity.id}
                className="flex items-center space-x-2 px-3 py-1 bg-gray-100 rounded-full hover:bg-airbnb-primary hover:text-white transition-all duration-300 whitespace-nowrap"
              >
                <IconComponent className="w-4 h-4" />
                <span className="text-sm">{amenity.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SearchFilters;
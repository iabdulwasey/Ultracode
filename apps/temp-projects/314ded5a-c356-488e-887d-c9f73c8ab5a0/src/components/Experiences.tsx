import React from 'react';
import { Clock, DollarSign, MapPin, Users } from 'lucide-react';
import type { Experience } from '../types';

const Experiences: React.FC = () => {
  const experiences: Experience[] = [
    {
      id: '1',
      title: 'Traditional Tea Ceremony',
      description: 'Learn the ancient art of Japanese tea ceremony in a traditional setting.',
      image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop',
      duration: '2 hours',
      price: '¥8,000',
      category: 'cultural',
      location: 'Kyoto'
    },
    {
      id: '2',
      title: 'Sushi Making Class',
      description: 'Master the art of sushi making with a professional chef.',
      image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop',
      duration: '3 hours',
      price: '¥12,000',
      category: 'food',
      location: 'Tokyo'
    },
    {
      id: '3',
      title: 'Mount Fuji Hiking',
      description: 'Climb Japan\'s most iconic mountain with experienced guides.',
      image: 'https://images.unsplash.com/photo-1570459027562-4a916cc6113f?w=400&h=300&fit=crop',
      duration: '2 days',
      price: '¥25,000',
      category: 'adventure',
      location: 'Mount Fuji'
    },
    {
      id: '4',
      title: 'Zen Meditation Retreat',
      description: 'Find inner peace in a traditional Buddhist temple.',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      duration: '1 day',
      price: '¥6,000',
      category: 'cultural',
      location: 'Nara'
    },
    {
      id: '5',
      title: 'Cherry Blossom Festival',
      description: 'Celebrate hanami season with locals in beautiful parks.',
      image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=400&h=300&fit=crop',
      duration: '4 hours',
      price: '¥4,000',
      category: 'nature',
      location: 'Various'
    },
    {
      id: '6',
      title: 'Ramen Tour Experience',
      description: 'Taste authentic ramen from Tokyo\'s best local shops.',
      image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop',
      duration: '4 hours',
      price: '¥9,000',
      category: 'food',
      location: 'Tokyo'
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'cultural': return '🎎';
      case 'food': return '🍜';
      case 'nature': return '🌸';
      case 'adventure': return '🏔️';
      default: return '✨';
    }
  };

  return (
    <section id="experiences" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Unique Experiences
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Immerse yourself in authentic Japanese culture through hands-on experiences
          </p>
        </div>

        {/* Experiences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((experience) => (
            <div
              key={experience.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={experience.image}
                  alt={experience.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-lg">{getCategoryIcon(experience.category)}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{experience.title}</h3>
                <p className="text-gray-600 mb-4">{experience.description}</p>

                {/* Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span className="text-sm">{experience.duration}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">{experience.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    <span className="text-sm">Small group (2-8 people)</span>
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-green-600 mr-1" />
                    <span className="text-xl font-bold text-gray-900">{experience.price}</span>
                    <span className="text-gray-600 text-sm ml-1">per person</span>
                  </div>
                  <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors duration-200">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <button className="bg-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200">
            View All Experiences
          </button>
        </div>
      </div>
    </section>
  );
};

export default Experiences;
import React from 'react';
import { Clock, Users, Star, ArrowRight } from 'lucide-react';

const ExperienceSection: React.FC = () => {
  const experiences = [
    {
      id: 1,
      title: 'Cooking Class with Local Chef',
      location: 'Paris, France',
      duration: '3 hours',
      groupSize: 'Up to 8 people',
      price: 89,
      rating: 4.95,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
      host: {
        name: 'Marie',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
      },
    },
    {
      id: 2,
      title: 'Sunset Photography Tour',
      location: 'Santorini, Greece',
      duration: '2.5 hours',
      groupSize: 'Up to 6 people',
      price: 125,
      rating: 4.92,
      reviews: 187,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      host: {
        name: 'Dimitris',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
      },
    },
    {
      id: 3,
      title: 'Traditional Tea Ceremony',
      location: 'Kyoto, Japan',
      duration: '1.5 hours',
      groupSize: 'Up to 4 people',
      price: 65,
      rating: 4.98,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop',
      host: {
        name: 'Yuki',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
      },
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Unforgettable experiences
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Book activities led by local hosts on your next trip. From cooking classes to photography tours, 
            discover unique experiences you won't find anywhere else.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {experiences.map((experience, index) => (
            <div
              key={experience.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover-lift animate-fade-in group cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative">
                <img
                  src={experience.image}
                  alt={experience.title}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold text-gray-800">
                      {experience.rating}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src={experience.host.avatar}
                    alt={experience.host.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm text-gray-600">Hosted by</p>
                    <p className="font-semibold text-gray-900">{experience.host.name}</p>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-airbnb-primary transition-colors">
                  {experience.title}
                </h3>
                
                <p className="text-gray-600 mb-4">{experience.location}</p>

                <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{experience.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{experience.groupSize}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">
                      ${experience.price}
                    </span>
                    <span className="text-gray-600"> per person</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {experience.reviews} reviews
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="inline-flex items-center space-x-2 bg-gradient-to-r from-airbnb-secondary to-teal-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <span>Explore all experiences</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
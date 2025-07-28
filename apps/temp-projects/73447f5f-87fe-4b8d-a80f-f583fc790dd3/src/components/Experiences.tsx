import React, { useState } from 'react';
import { Camera, Utensils, Mountain, Building, Users, Calendar, ArrowRight } from 'lucide-react';
import { FaTorii } from 'react-icons/fa';
import { GiChopsticks, GiSamuraiHelmet, GiMountainCave } from 'react-icons/gi';

const Experiences: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Experiences', icon: Users },
    { id: 'cultural', name: 'Cultural', icon: FaTorii },
    { id: 'culinary', name: 'Culinary', icon: GiChopsticks },
    { id: 'adventure', name: 'Adventure', icon: Mountain },
    { id: 'urban', name: 'Urban', icon: Building },
  ];

  const experiences = [
    {
      id: 1,
      title: "Tea Ceremony Experience",
      category: "cultural",
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&h=400&fit=crop&crop=center",
      description: "Learn the ancient art of Japanese tea ceremony in a traditional setting",
      duration: "2 hours",
      price: "¥5,000",
      rating: 4.9,
      location: "Kyoto",
      highlights: ["Traditional ceremony", "Matcha tasting", "Cultural insights"]
    },
    {
      id: 2,
      title: "Sushi Making Workshop",
      category: "culinary",
      image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600&h=400&fit=crop&crop=center",
      description: "Master the art of sushi making with a professional chef",
      duration: "3 hours",
      price: "¥8,000",
      rating: 4.8,
      location: "Tokyo",
      highlights: ["Hands-on cooking", "Fresh ingredients", "Take recipes home"]
    },
    {
      id: 3,
      title: "Mount Fuji Hiking",
      category: "adventure",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&crop=center",
      description: "Climb Japan's most iconic mountain during climbing season",
      duration: "2 days",
      price: "¥15,000",
      rating: 4.7,
      location: "Mount Fuji",
      highlights: ["Sunrise viewing", "Mountain huts", "Certificate of completion"]
    },
    {
      id: 4,
      title: "Tokyo Night Photography",
      category: "urban",
      image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=600&h=400&fit=crop&crop=center",
      description: "Capture Tokyo's neon-lit streets and vibrant nightlife",
      duration: "4 hours",
      price: "¥6,000",
      rating: 4.6,
      location: "Tokyo",
      highlights: ["Professional guide", "Equipment included", "Photo editing tips"]
    },
    {
      id: 5,
      title: "Samurai Experience",
      category: "cultural",
      image: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=600&h=400&fit=crop&crop=center",
      description: "Learn traditional samurai sword techniques and philosophy",
      duration: "2.5 hours",
      price: "¥7,500",
      rating: 4.8,
      location: "Kyoto",
      highlights: ["Sword techniques", "Traditional costume", "History lessons"]
    },
    {
      id: 6,
      title: "Ramen Crawl Adventure",
      category: "culinary",
      image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&h=400&fit=crop&crop=center",
      description: "Explore the best ramen shops in Tokyo's hidden alleys",
      duration: "4 hours",
      price: "¥4,500",
      rating: 4.9,
      location: "Tokyo",
      highlights: ["5 ramen shops", "Local guide", "Cultural stories"]
    }
  ];

  const filteredExperiences = activeCategory === 'all' 
    ? experiences 
    : experiences.filter(exp => exp.category === activeCategory);

  return (
    <section id="experiences" className="py-20 bg-gradient-to-br from-sakura-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Authentic <span className="text-japanese-red">Experiences</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Immerse yourself in Japan's rich culture through carefully curated experiences 
            that connect you with local traditions, cuisine, and hidden gems.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 font-medium ${
                activeCategory === category.id
                  ? 'bg-japanese-red text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-sakura-100 border border-gray-200'
              }`}
            >
              <category.icon className="w-5 h-5" />
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Experiences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredExperiences.map((experience, index) => (
            <div
              key={experience.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={experience.image}
                  alt={experience.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full font-semibold text-japanese-red">
                  {experience.price}
                </div>
                
                {/* Duration */}
                <div className="absolute bottom-4 left-4 flex items-center text-white">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">{experience.duration}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-japanese-red transition-colors">
                    {experience.title}
                  </h3>
                  <div className="flex items-center">
                    <span className="text-yellow-400 mr-1">★</span>
                    <span className="text-sm font-medium text-gray-700">{experience.rating}</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">{experience.description}</p>

                {/* Location */}
                <div className="flex items-center text-gray-500 mb-4">
                  <Camera className="w-4 h-4 mr-1" />
                  <span className="text-sm">{experience.location}</span>
                </div>

                {/* Highlights */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {experience.highlights.map((highlight, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-sakura-100 text-sakura-700 text-xs rounded-full"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Book Button */}
                <button className="w-full bg-gradient-to-r from-japanese-red to-sakura-500 text-white py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-medium flex items-center justify-center space-x-2 group">
                  <span>Book Experience</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-white rounded-2xl p-8 shadow-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-japanese-red mb-2">500+</div>
              <div className="text-gray-600">Unique Experiences</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-japanese-red mb-2">50K+</div>
              <div className="text-gray-600">Happy Travelers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-japanese-red mb-2">4.8</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-japanese-red mb-2">24/7</div>
              <div className="text-gray-600">Customer Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experiences;
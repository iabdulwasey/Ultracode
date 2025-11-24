import React, { useState } from 'react';
import { Camera, Utensils, Mountain, Waves, Train, Sparkles, Clock, Users, Star } from 'lucide-react';

interface Experience {
  id: number;
  title: string;
  category: string;
  description: string;
  duration: string;
  groupSize: string;
  rating: number;
  price: string;
  image: string;
  icon: React.ElementType;
  highlights: string[];
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
}

const experiences: Experience[] = [
  {
    id: 1,
    title: 'Tokyo Food Tour',
    category: 'Culinary',
    description: 'Discover authentic Tokyo flavors from street food stalls to hidden local gems.',
    duration: '4 hours',
    groupSize: '8-12 people',
    rating: 4.9,
    price: '¥8,500',
    image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=500&h=300&fit=crop',
    icon: Utensils,
    highlights: ['Tsukiji Market', 'Ramen Tasting', 'Local Izakaya', 'Sake Pairing'],
    difficulty: 'Easy'
  },
  {
    id: 2,
    title: 'Mount Fuji Hiking',
    category: 'Adventure',
    description: 'Climb Japan\'s most sacred mountain and witness breathtaking sunrise views.',
    duration: '2 days',
    groupSize: '6-10 people',
    rating: 4.8,
    price: '¥15,000',
    image: 'https://images.unsplash.com/photo-1578637387939-43c525550085?w=500&h=300&fit=crop',
    icon: Mountain,
    highlights: ['Summit Climb', 'Sunrise View', 'Mountain Huts', 'Sacred Sites'],
    difficulty: 'Challenging'
  },
  {
    id: 3,
    title: 'Traditional Tea Ceremony',
    category: 'Cultural',
    description: 'Learn the ancient art of Japanese tea ceremony in a traditional setting.',
    duration: '2 hours',
    groupSize: '4-8 people',
    rating: 4.7,
    price: '¥5,000',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&h=300&fit=crop',
    icon: Sparkles,
    highlights: ['Matcha Preparation', 'Traditional Sweets', 'Cultural History', 'Meditation'],
    difficulty: 'Easy'
  },
  {
    id: 4,
    title: 'Kyoto Photography Walk',
    category: 'Photography',
    description: 'Capture the beauty of ancient Kyoto with a professional photographer guide.',
    duration: '3 hours',
    groupSize: '5-8 people',
    rating: 4.8,
    price: '¥6,500',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=500&h=300&fit=crop',
    icon: Camera,
    highlights: ['Bamboo Forest', 'Temple Gardens', 'Geisha District', 'Golden Hour'],
    difficulty: 'Easy'
  },
  {
    id: 5,
    title: 'Bullet Train Experience',
    category: 'Transportation',
    description: 'Travel on the world-famous Shinkansen with insider tips and scenic routes.',
    duration: 'Full day',
    groupSize: '10-15 people',
    rating: 4.6,
    price: '¥12,000',
    image: 'https://images.unsplash.com/photo-1568667256549-094345857637?w=500&h=300&fit=crop',
    icon: Train,
    highlights: ['Mount Fuji Views', 'Bento Lunch', 'Speed Experience', 'Station Culture'],
    difficulty: 'Easy'
  },
  {
    id: 6,
    title: 'Hot Springs Retreat',
    category: 'Wellness',
    description: 'Relax in natural hot springs surrounded by beautiful mountain scenery.',
    duration: '6 hours',
    groupSize: '8-12 people',
    rating: 4.9,
    price: '¥9,500',
    image: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=500&h=300&fit=crop',
    icon: Waves,
    highlights: ['Natural Onsen', 'Mountain Views', 'Traditional Meal', 'Meditation'],
    difficulty: 'Easy'
  }
];

const categories = ['All', 'Culinary', 'Adventure', 'Cultural', 'Photography', 'Transportation', 'Wellness'];

const Experiences: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);

  const filteredExperiences = selectedCategory === 'All' 
    ? experiences 
    : experiences.filter(exp => exp.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Moderate': return 'text-yellow-600 bg-yellow-100';
      case 'Challenging': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Unique <span className="gradient-text">Experiences</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Create unforgettable memories with carefully curated experiences led by local experts
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-japan-red to-japan-cherry text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-japan-red hover:text-japan-red'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Experiences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredExperiences.map((experience) => {
            const IconComponent = experience.icon;
            return (
              <div
                key={experience.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden cursor-pointer"
                onClick={() => setSelectedExperience(experience)}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={experience.image}
                    alt={experience.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                    <Star className="w-4 h-4 text-japan-gold fill-current" />
                    <span className="text-sm font-medium">{experience.rating}</span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(experience.difficulty)}`}>
                      {experience.difficulty}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-japan-red/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                    {experience.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <IconComponent className="w-5 h-5 text-japan-red" />
                      <h3 className="text-xl font-bold text-gray-900">{experience.title}</h3>
                    </div>
                    <span className="text-lg font-bold text-japan-red">{experience.price}</span>
                  </div>

                  <p className="text-gray-600 mb-4">{experience.description}</p>

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{experience.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span>{experience.groupSize}</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2">
                    {experience.highlights.slice(0, 2).map((highlight, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {highlight}
                      </span>
                    ))}
                    {experience.highlights.length > 2 && (
                      <span className="text-gray-500 text-xs font-medium px-2 py-1">
                        +{experience.highlights.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Experience Modal */}
        {selectedExperience && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="relative">
                <img
                  src={selectedExperience.image}
                  alt={selectedExperience.title}
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={() => setSelectedExperience(null)}
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors duration-200"
                >
                  ✕
                </button>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <selectedExperience.icon className="w-6 h-6 text-japan-red" />
                    <h3 className="text-2xl font-bold text-gray-900">{selectedExperience.title}</h3>
                  </div>
                  <span className="text-2xl font-bold text-japan-red">{selectedExperience.price}</span>
                </div>

                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 text-japan-gold fill-current" />
                    <span className="font-medium">{selectedExperience.rating}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(selectedExperience.difficulty)}`}>
                    {selectedExperience.difficulty}
                  </span>
                  <span className="bg-japan-red text-white px-3 py-1 rounded-full text-sm font-medium">
                    {selectedExperience.category}
                  </span>
                </div>

                <p className="text-gray-600 mb-6">{selectedExperience.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Duration</h4>
                    <p className="text-gray-600">{selectedExperience.duration}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Group Size</h4>
                    <p className="text-gray-600">{selectedExperience.groupSize}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">What's Included</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {selectedExperience.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-japan-red rounded-full"></div>
                        <span className="text-gray-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-japan-red to-japan-cherry text-white py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-200">
                  Book Experience
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-japan-navy to-slate-800 rounded-3xl p-8 md:p-12 text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Ready for Your Adventure?
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of travelers who have discovered the magic of Japan through our unique experiences
            </p>
            <button className="bg-gradient-to-r from-japan-red to-japan-cherry text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-200 transform hover:scale-105">
              Browse All Experiences
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experiences;
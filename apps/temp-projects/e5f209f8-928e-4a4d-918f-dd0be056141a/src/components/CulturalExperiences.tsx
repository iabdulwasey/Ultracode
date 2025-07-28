import React, { useState } from 'react';
import { Calendar, Clock, Users, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const CulturalExperiences: React.FC = () => {
  const [currentExperience, setCurrentExperience] = useState(0);

  const experiences = [
    {
      title: "Traditional Tea Ceremony",
      subtitle: "Sado - The Way of Tea",
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      description: "Learn the ancient art of Japanese tea ceremony in a traditional tatami room. Experience the meditative process of preparing and serving matcha while understanding the philosophy behind each movement.",
      duration: "2 hours",
      groupSize: "4-8 people",
      price: "¥8,500",
      rating: 4.9,
      location: "Kyoto",
      includes: ["Tea ceremony instruction", "Traditional sweets", "Matcha tea", "Cultural explanation"],
      highlights: ["Authentic Experience", "Small Groups", "English Guide", "Certificate"]
    },
    {
      title: "Sushi Making Workshop",
      subtitle: "Master the Art of Sushi",
      image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      description: "Learn to make authentic sushi from a professional chef. From selecting fresh fish to perfecting rice preparation, master the techniques passed down through generations.",
      duration: "3 hours",
      groupSize: "6-12 people",
      price: "¥12,000",
      rating: 4.8,
      location: "Tokyo",
      includes: ["Professional instruction", "Fresh ingredients", "Sushi knife techniques", "Full meal"],
      highlights: ["Professional Chef", "Fresh Fish", "Take-home Skills", "Lunch Included"]
    },
    {
      title: "Kimono Dressing Experience",
      subtitle: "Dress Like a Geisha",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      description: "Experience the elegance of traditional Japanese dress. Learn about the history and significance of kimono while being dressed by experts in authentic silk garments.",
      duration: "4 hours",
      groupSize: "2-6 people",
      price: "¥15,000",
      rating: 4.7,
      location: "Kyoto",
      includes: ["Kimono rental", "Professional dressing", "Hair styling", "Photo session"],
      highlights: ["Authentic Kimono", "Professional Styling", "Photo Session", "Historic District Walk"]
    },
    {
      title: "Zen Meditation Session",
      subtitle: "Find Inner Peace",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      description: "Practice Zazen meditation with Buddhist monks in a serene temple setting. Learn breathing techniques and mindfulness practices that have been refined over centuries.",
      duration: "1.5 hours",
      groupSize: "8-15 people",
      price: "¥3,500",
      rating: 4.6,
      location: "Kamakura",
      includes: ["Monk guidance", "Temple access", "Meditation instruction", "Temple tour"],
      highlights: ["Buddhist Monks", "Ancient Temple", "Peaceful Setting", "Mindfulness Training"]
    },
    {
      title: "Calligraphy Workshop",
      subtitle: "Art of Beautiful Writing",
      image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      description: "Master the art of Shodo (Japanese calligraphy) using traditional brushes and ink. Learn to write beautiful characters while understanding their meaning and cultural significance.",
      duration: "2.5 hours",
      groupSize: "4-10 people",
      price: "¥6,800",
      rating: 4.5,
      location: "Tokyo",
      includes: ["Calligraphy tools", "Practice sheets", "Ink and brushes", "Finished artwork"],
      highlights: ["Traditional Tools", "Personal Artwork", "Cultural History", "Take-home Pieces"]
    }
  ];

  const nextExperience = () => {
    setCurrentExperience((prev) => (prev + 1) % experiences.length);
  };

  const prevExperience = () => {
    setCurrentExperience((prev) => (prev - 1 + experiences.length) % experiences.length);
  };

  const current = experiences[currentExperience];

  return (
    <section id="culture" className="py-20 bg-gradient-to-br from-japan-navy/5 to-japan-cherry/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold gradient-text mb-6">
            Cultural Experiences
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Immerse yourself in Japan's rich cultural traditions through hands-on experiences. 
            Learn from masters and take home skills that will last a lifetime.
          </p>
        </div>

        {/* Main Experience Display */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Image Section */}
              <div className="relative h-96 lg:h-auto">
                <img
                  src={current.image}
                  alt={current.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                
                {/* Navigation Arrows */}
                <button
                  onClick={prevExperience}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={nextExperience}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>

                {/* Price Badge */}
                <div className="absolute top-6 left-6">
                  <span className="bg-japan-gold text-japan-navy px-4 py-2 rounded-full text-lg font-bold">
                    {current.price}
                  </span>
                </div>

                {/* Rating */}
                <div className="absolute top-6 right-6 flex items-center bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                  <Star className="w-4 h-4 text-japan-gold fill-japan-gold mr-1" />
                  <span className="text-white font-medium">{current.rating}</span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 lg:p-12">
                <div className="h-full flex flex-col">
                  {/* Header */}
                  <div className="mb-6">
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">
                      {current.title}
                    </h3>
                    <p className="text-lg text-japan-red font-medium mb-4">
                      {current.subtitle}
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      {current.description}
                    </p>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-japan-red mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Duration</p>
                        <p className="font-medium">{current.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-5 h-5 text-japan-red mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Group Size</p>
                        <p className="font-medium">{current.groupSize}</p>
                      </div>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Experience Highlights</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {current.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-2 h-2 bg-japan-red rounded-full mr-2" />
                          <span className="text-sm text-gray-700">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Includes */}
                  <div className="mb-8">
                    <h4 className="font-semibold text-gray-900 mb-3">What's Included</h4>
                    <div className="space-y-2">
                      {current.includes.map((item, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-japan-gold rounded-full mr-3" />
                          <span className="text-sm text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-auto">
                    <button className="w-full bg-gradient-to-r from-japan-red to-japan-gold text-white py-4 px-6 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2">
                      <Calendar className="w-5 h-5" />
                      <span>Book Experience</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Experience Indicators */}
          <div className="flex justify-center mt-8 space-x-3">
            {experiences.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentExperience
                    ? 'bg-japan-red scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                onClick={() => setCurrentExperience(index)}
              />
            ))}
          </div>

          {/* Quick Navigation */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-12">
            {experiences.map((experience, index) => (
              <button
                key={index}
                className={`p-4 rounded-xl transition-all duration-300 text-left ${
                  index === currentExperience
                    ? 'bg-japan-red text-white shadow-lg'
                    : 'bg-white hover:bg-gray-50 text-gray-700 hover:shadow-md'
                }`}
                onClick={() => setCurrentExperience(index)}
              >
                <h4 className="font-medium text-sm mb-1">{experience.title}</h4>
                <p className={`text-xs ${
                  index === currentExperience ? 'text-japan-cherry' : 'text-gray-500'
                }`}>
                  {experience.location}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CulturalExperiences;
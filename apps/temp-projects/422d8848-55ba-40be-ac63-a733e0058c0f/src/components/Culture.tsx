import React, { useState } from 'react';
import { Heart, Users, Calendar, Award, Play, ArrowRight } from 'lucide-react';

interface CulturalExperience {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  price: string;
  highlights: string[];
  videoUrl?: string;
}

const Culture: React.FC = () => {
  const [activeTab, setActiveTab] = useState('traditions');
  const [selectedExperience, setSelectedExperience] = useState<number | null>(null);

  const experiences: CulturalExperience[] = [
    {
      id: 1,
      title: "Tea Ceremony Experience",
      category: "traditions",
      description: "Learn the ancient art of Japanese tea ceremony in a traditional tatami room with certified tea master.",
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      duration: "2 hours",
      difficulty: "Beginner",
      price: "¥5,000",
      highlights: ["Matcha preparation", "Traditional sweets", "Cultural history", "Meditation aspects"]
    },
    {
      id: 2,
      title: "Samurai Sword Making",
      category: "traditions",
      description: "Forge your own katana blade under the guidance of master swordsmiths in historic workshop.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      duration: "Full day",
      difficulty: "Advanced",
      price: "¥25,000",
      highlights: ["Traditional forging", "Steel folding", "Handle wrapping", "Sharpening techniques"]
    },
    {
      id: 3,
      title: "Sushi Making Class",
      category: "cuisine",
      description: "Master the art of sushi preparation with fresh ingredients from Tsukiji market.",
      image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      duration: "3 hours",
      difficulty: "Intermediate",
      price: "¥8,000",
      highlights: ["Fish selection", "Rice preparation", "Knife skills", "Presentation art"]
    },
    {
      id: 4,
      title: "Kabuki Theater Workshop",
      category: "arts",
      description: "Learn traditional Japanese theater with makeup, costumes, and performance techniques.",
      image: "https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      duration: "4 hours",
      difficulty: "Intermediate",
      price: "¥12,000",
      highlights: ["Makeup application", "Costume fitting", "Movement training", "Voice techniques"]
    },
    {
      id: 5,
      title: "Zen Meditation Retreat",
      category: "spirituality",
      description: "Find inner peace through authentic Zen meditation practice in mountain temple.",
      image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      duration: "2 days",
      difficulty: "Beginner",
      price: "¥15,000",
      highlights: ["Guided meditation", "Temple stay", "Vegetarian meals", "Morning prayers"]
    },
    {
      id: 6,
      title: "Manga Drawing Class",
      category: "arts",
      description: "Create your own manga characters and stories with professional manga artists.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      duration: "3 hours",
      difficulty: "Beginner",
      price: "¥6,000",
      highlights: ["Character design", "Story creation", "Digital tools", "Publishing tips"]
    }
  ];

  const tabs = [
    { id: 'traditions', label: 'Traditions', icon: Heart },
    { id: 'cuisine', label: 'Cuisine', icon: Users },
    { id: 'arts', label: 'Arts', icon: Award },
    { id: 'spirituality', label: 'Spirituality', icon: Calendar }
  ];

  const filteredExperiences = experiences.filter(exp => exp.category === activeTab);

  const stats = [
    { label: "Cultural Experiences", value: "500+", icon: Heart },
    { label: "Expert Instructors", value: "200+", icon: Users },
    { label: "Years of History", value: "1000+", icon: Calendar },
    { label: "Satisfaction Rate", value: "98%", icon: Award }
  ];

  return (
    <section id="culture" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-japan-gold/10 rounded-full px-4 py-2 mb-4">
            <Heart className="w-4 h-4 text-japan-red" />
            <span className="text-japan-red text-sm font-medium">Cultural Immersion</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Experience Authentic <span className="gradient-text">Japanese Culture</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Immerse yourself in Japan's rich cultural heritage through hands-on experiences 
            guided by masters of traditional arts, cuisine, and spiritual practices.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-12 h-12 bg-gradient-to-br from-japan-red to-japan-cherry rounded-full flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-japan-red to-japan-cherry text-white shadow-lg scale-105'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Experiences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredExperiences.map((experience, index) => (
            <div
              key={experience.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 card-hover"
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
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/30 transition-colors">
                    <Play className="w-6 h-6 text-white" />
                  </button>
                </div>

                {/* Difficulty Badge */}
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${
                  experience.difficulty === 'Beginner' ? 'bg-green-500/90 text-white' :
                  experience.difficulty === 'Intermediate' ? 'bg-yellow-500/90 text-white' :
                  'bg-red-500/90 text-white'
                }`}>
                  {experience.difficulty}
                </div>

                {/* Price */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-sm font-semibold text-japan-red">{experience.price}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-japan-red transition-colors">
                    {experience.title}
                  </h3>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {experience.description}
                </p>

                {/* Duration */}
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{experience.duration}</span>
                </div>

                {/* Highlights */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {experience.highlights.slice(0, 2).map((highlight, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-japan-cherry/10 text-japan-red px-2 py-1 rounded-full"
                      >
                        {highlight}
                      </span>
                    ))}
                    {experience.highlights.length > 2 && (
                      <span className="text-xs text-gray-400 px-2 py-1">
                        +{experience.highlights.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                {/* CTA Button */}
                <button className="w-full bg-gradient-to-r from-japan-red to-japan-cherry text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 group">
                  <span>Book Experience</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-gradient-to-r from-japan-red/5 to-japan-cherry/5 rounded-3xl p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Dive Deeper into Japanese Culture?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our cultural immersion programs and create unforgettable memories 
            while learning from authentic Japanese masters and artisans.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-japan-red to-japan-cherry text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
              View All Experiences
            </button>
            <button className="border-2 border-japan-red text-japan-red px-8 py-3 rounded-full font-semibold hover:bg-japan-red hover:text-white transition-all duration-300">
              Custom Itinerary
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Culture;
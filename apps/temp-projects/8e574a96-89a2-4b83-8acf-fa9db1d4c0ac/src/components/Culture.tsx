import React from 'react';
import { Heart, Users, Utensils, Music, Palette, Home } from 'lucide-react';

interface CultureItem {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  image: string;
  highlights: string[];
}

const cultureItems: CultureItem[] = [
  {
    id: 1,
    title: 'Traditional Arts',
    description: 'Discover the beauty of Japanese traditional arts including tea ceremony, calligraphy, and ikebana.',
    icon: Palette,
    image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&h=300&fit=crop',
    highlights: ['Tea Ceremony', 'Calligraphy', 'Ikebana', 'Origami']
  },
  {
    id: 2,
    title: 'Culinary Excellence',
    description: 'Experience world-renowned Japanese cuisine from sushi and ramen to kaiseki dining.',
    icon: Utensils,
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop',
    highlights: ['Sushi', 'Ramen', 'Kaiseki', 'Street Food']
  },
  {
    id: 3,
    title: 'Festivals & Celebrations',
    description: 'Join vibrant matsuri festivals celebrating seasons, harvests, and ancient traditions.',
    icon: Music,
    image: 'https://images.unsplash.com/photo-1554797589-7241bb691973?w=400&h=300&fit=crop',
    highlights: ['Cherry Blossom', 'Summer Matsuri', 'Autumn Leaves', 'New Year']
  },
  {
    id: 4,
    title: 'Spiritual Heritage',
    description: 'Explore ancient temples, shrines, and the spiritual practices that shape Japanese culture.',
    icon: Heart,
    image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=300&fit=crop',
    highlights: ['Buddhist Temples', 'Shinto Shrines', 'Meditation', 'Pilgrimages']
  },
  {
    id: 5,
    title: 'Social Harmony',
    description: 'Learn about Japanese values of respect, harmony, and community that define society.',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1502301103665-0b95cc738daf?w=400&h=300&fit=crop',
    highlights: ['Respect', 'Harmony', 'Group Unity', 'Hospitality']
  },
  {
    id: 6,
    title: 'Architecture',
    description: 'Marvel at the blend of traditional wooden structures and modern architectural innovations.',
    icon: Home,
    image: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=400&h=300&fit=crop',
    highlights: ['Traditional Houses', 'Modern Design', 'Gardens', 'Zen Spaces']
  }
];

const Culture: React.FC = () => {
  return (
    <section id="culture" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Rich <span className="gradient-text">Culture</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Immerse yourself in Japan's fascinating culture, where ancient traditions seamlessly blend with modern innovation
          </p>
        </div>

        {/* Culture Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cultureItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-3">
                    <IconComponent className="w-6 h-6 text-japan-red" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>

                  {/* Highlights */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Highlights:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {item.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-japan-cherry rounded-full"></div>
                          <span className="text-sm text-gray-700">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Cultural Values Section */}
        <div className="mt-20 bg-gradient-to-r from-japan-navy to-slate-800 rounded-3xl p-8 md:p-12 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Core Japanese Values
            </h3>
            <p className="text-xl text-gray-300 mb-8">
              Understanding these principles will enrich your travel experience
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-japan-cherry/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-japan-cherry" />
                </div>
                <h4 className="text-xl font-bold mb-2">Omotenashi</h4>
                <p className="text-gray-300">Selfless hospitality and anticipating guests' needs</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-japan-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-japan-gold" />
                </div>
                <h4 className="text-xl font-bold mb-2">Wa (和)</h4>
                <p className="text-gray-300">Harmony, peace, and unity in community</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-japan-sage/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Palette className="w-8 h-8 text-japan-sage" />
                </div>
                <h4 className="text-xl font-bold mb-2">Mono no Aware</h4>
                <p className="text-gray-300">Appreciation of life's transient beauty</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <button className="bg-gradient-to-r from-japan-red to-japan-cherry text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-200 transform hover:scale-105">
            Explore Cultural Experiences
          </button>
        </div>
      </div>
    </section>
  );
};

export default Culture;
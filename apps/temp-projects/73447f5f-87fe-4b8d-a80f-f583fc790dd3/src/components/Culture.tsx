import React, { useState } from 'react';
import { Users, Heart, Star, Book, Music, Palette } from 'lucide-react';
import { FaTorii } from 'react-icons/fa';
import { GiChopsticks, GiKimono, GiSamuraiHelmet } from 'react-icons/gi';

const Culture: React.FC = () => {
  const [activeTab, setActiveTab] = useState('traditions');

  const culturalAspects = {
    traditions: {
      title: 'Ancient Traditions',
      icon: FaTorii,
      items: [
        {
          name: 'Tea Ceremony (Sado)',
          description: 'The art of preparing and serving tea with mindfulness and respect',
          image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop&crop=center',
          experience: 'Join a traditional tea ceremony in Kyoto'
        },
        {
          name: 'Flower Arrangement (Ikebana)',
          description: 'The Japanese art of flower arrangement emphasizing harmony and balance',
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center',
          experience: 'Learn ikebana from a master florist'
        },
        {
          name: 'Martial Arts (Budo)',
          description: 'Traditional martial arts focusing on discipline, respect, and self-improvement',
          image: 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=400&h=300&fit=crop&crop=center',
          experience: 'Practice with experienced sensei'
        }
      ]
    },
    cuisine: {
      title: 'Culinary Arts',
      icon: GiChopsticks,
      items: [
        {
          name: 'Kaiseki Dining',
          description: 'Multi-course haute cuisine showcasing seasonal ingredients and artful presentation',
          image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop&crop=center',
          experience: 'Dine at a Michelin-starred kaiseki restaurant'
        },
        {
          name: 'Street Food Culture',
          description: 'From takoyaki to ramen, experience Japan\'s incredible street food scene',
          image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop&crop=center',
          experience: 'Join a guided food tour in Osaka'
        },
        {
          name: 'Sake Brewing',
          description: 'The ancient art of rice wine production with regional variations',
          image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop&crop=center',
          experience: 'Visit traditional sake breweries'
        }
      ]
    },
    arts: {
      title: 'Traditional Arts',
      icon: Palette,
      items: [
        {
          name: 'Calligraphy (Shodo)',
          description: 'The art of beautiful writing using brush and ink with spiritual significance',
          image: 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=400&h=300&fit=crop&crop=center',
          experience: 'Practice calligraphy with master artists'
        },
        {
          name: 'Pottery (Yakimono)',
          description: 'Regional ceramic traditions creating functional and artistic pieces',
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center',
          experience: 'Create your own pottery in traditional kilns'
        },
        {
          name: 'Origami',
          description: 'The delicate art of paper folding representing patience and precision',
          image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop&crop=center',
          experience: 'Master complex origami techniques'
        }
      ]
    },
    festivals: {
      title: 'Festivals & Celebrations',
      icon: Music,
      items: [
        {
          name: 'Matsuri Festivals',
          description: 'Colorful local festivals celebrating seasons, harvests, and deities',
          image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop&crop=center',
          experience: 'Participate in local matsuri celebrations'
        },
        {
          name: 'Cherry Blossom Festivals',
          description: 'Hanami celebrations welcoming spring with picnics under blooming trees',
          image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=400&h=300&fit=crop&crop=center',
          experience: 'Join hanami parties in famous parks'
        },
        {
          name: 'Seasonal Celebrations',
          description: 'Traditional holidays marking important times of the year',
          image: 'https://images.unsplash.com/photo-1542640244-4d4d8e8c6c0c?w=400&h=300&fit=crop&crop=center',
          experience: 'Experience authentic seasonal traditions'
        }
      ]
    }
  };

  const tabs = [
    { id: 'traditions', name: 'Traditions', icon: FaTorii },
    { id: 'cuisine', name: 'Cuisine', icon: GiChopsticks },
    { id: 'arts', name: 'Arts', icon: Palette },
    { id: 'festivals', name: 'Festivals', icon: Music }
  ];

  const etiquetteRules = [
    {
      icon: GiKimono,
      title: 'Dress Respectfully',
      description: 'Modest clothing is appreciated, especially when visiting temples and traditional areas.'
    },
    {
      icon: Heart,
      title: 'Bow as Greeting',
      description: 'A slight bow shows respect. The deeper the bow, the more formal the situation.'
    },
    {
      icon: GiChopsticks,
      title: 'Chopstick Etiquette',
      description: 'Never stick chopsticks upright in rice or pass food chopstick to chopstick.'
    },
    {
      icon: Users,
      title: 'Remove Shoes',
      description: 'Take off shoes when entering homes, temples, and some restaurants and hotels.'
    }
  ];

  return (
    <section id="culture" className="py-20 bg-gradient-to-br from-white to-sakura-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Japanese <span className="text-japanese-red">Culture</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Immerse yourself in Japan's rich cultural heritage, from ancient traditions 
            to modern expressions of art, cuisine, and philosophy.
          </p>
        </div>

        {/* Cultural Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 font-medium ${
                activeTab === tab.id
                  ? 'bg-japanese-red text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-sakura-100 border border-gray-200'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Cultural Content */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              {culturalAspects[activeTab as keyof typeof culturalAspects].title}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {culturalAspects[activeTab as keyof typeof culturalAspects].items.map((item, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="text-xl font-bold">{item.name}</h4>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 mb-4 leading-relaxed">{item.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-japanese-red font-medium bg-sakura-100 px-3 py-1 rounded-full">
                      {item.experience}
                    </span>
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cultural Etiquette Section */}
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Cultural Etiquette</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Understanding Japanese etiquette helps you show respect and enhances your cultural experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {etiquetteRules.map((rule, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-sakura-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-japanese-red group-hover:text-white transition-all duration-300">
                  <rule.icon className="w-8 h-8" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{rule.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{rule.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Cultural Immersion CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-japanese-red to-sakura-500 rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to Dive Deep into Japanese Culture?</h3>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join our cultural immersion programs and experience Japan like a local with expert guides and authentic experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-japanese-red px-8 py-4 rounded-full hover:shadow-lg transition-all duration-300 font-semibold">
                Browse Cultural Tours
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-japanese-red transition-all duration-300 font-semibold">
                Download Culture Guide
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Culture;
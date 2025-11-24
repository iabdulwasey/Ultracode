import React, { useState } from 'react';
import { Train, CreditCard, Wifi, MapPin, Phone, Shield } from 'lucide-react';
import type { TravelTip } from '../types';

const TravelTips: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('transportation');

  const tips: TravelTip[] = [
    // Transportation
    {
      id: '1',
      title: 'Get a JR Pass',
      content: 'The Japan Rail Pass offers unlimited travel on JR trains for 7, 14, or 21 days. Must be purchased before arriving in Japan.',
      category: 'transportation',
      icon: 'train'
    },
    {
      id: '2',
      title: 'IC Cards for Local Travel',
      content: 'Suica or Pasmo cards work for trains, subways, buses, and even some shops. Very convenient for short trips.',
      category: 'transportation',
      icon: 'card'
    },
    {
      id: '3',
      title: 'Hyperdia App',
      content: 'Essential app for train schedules and route planning. Works offline and shows platform numbers.',
      category: 'transportation',
      icon: 'phone'
    },
    
    // Culture
    {
      id: '4',
      title: 'Learn Basic Phrases',
      content: 'Simple phrases like "arigatou gozaimasu" (thank you) and "sumimasen" (excuse me) go a long way.',
      category: 'culture',
      icon: 'chat'
    },
    {
      id: '5',
      title: 'Business Card Etiquette',
      content: 'Receive business cards with both hands and take a moment to read them before putting them away.',
      category: 'culture',
      icon: 'card'
    },
    {
      id: '6',
      title: 'Gift Giving',
      content: 'Bring small gifts from your home country. Present them with both hands and they will be opened later.',
      category: 'culture',
      icon: 'gift'
    },

    // Food
    {
      id: '7',
      title: 'Slurping is OK',
      content: 'Slurping noodles is not only acceptable but shows appreciation for the meal. It also cools the noodles.',
      category: 'food',
      icon: 'bowl'
    },
    {
      id: '8',
      title: 'Chopstick Etiquette',
      content: 'Never stick chopsticks upright in rice or pass food chopstick to chopstick - both are funeral customs.',
      category: 'food',
      icon: 'utensils'
    },
    {
      id: '9',
      title: 'Omakase Experience',
      content: 'Try omakase (chef\'s choice) at sushi restaurants for the best seasonal selections.',
      category: 'food',
      icon: 'chef'
    },

    // Accommodation
    {
      id: '10',
      title: 'Ryokan Etiquette',
      content: 'Traditional inns offer unique experiences. Follow bathing rules and wear yukata properly.',
      category: 'accommodation',
      icon: 'home'
    },
    {
      id: '11',
      title: 'Capsule Hotels',
      content: 'Great budget option in cities. Bring earplugs and be respectful of shared spaces.',
      category: 'accommodation',
      icon: 'bed'
    },

    // General
    {
      id: '12',
      title: 'Cash is King',
      content: 'Many places only accept cash. Use 7-Eleven ATMs to withdraw money with foreign cards.',
      category: 'general',
      icon: 'money'
    },
    {
      id: '13',
      title: 'Pocket WiFi',
      content: 'Rent a pocket WiFi device at the airport for reliable internet access throughout your trip.',
      category: 'general',
      icon: 'wifi'
    },
    {
      id: '14',
      title: 'Emergency Numbers',
      content: 'Police: 110, Fire/Ambulance: 119, Tourist Hotline: 050-3816-2787 (24/7 multilingual support)',
      category: 'general',
      icon: 'phone'
    }
  ];

  const categories = [
    { id: 'transportation', name: 'Transportation', icon: Train, color: 'bg-blue-500' },
    { id: 'culture', name: 'Culture', icon: Users, color: 'bg-purple-500' },
    { id: 'food', name: 'Food', icon: Heart, color: 'bg-green-500' },
    { id: 'accommodation', name: 'Stay', icon: Shield, color: 'bg-orange-500' },
    { id: 'general', name: 'General', icon: MapPin, color: 'bg-red-500' }
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'train': return <Train className="h-6 w-6" />;
      case 'card': return <CreditCard className="h-6 w-6" />;
      case 'phone': return <Phone className="h-6 w-6" />;
      case 'wifi': return <Wifi className="h-6 w-6" />;
      case 'money': return <CreditCard className="h-6 w-6" />;
      default: return <MapPin className="h-6 w-6" />;
    }
  };

  const filteredTips = tips.filter(tip => tip.category === activeCategory);

  return (
    <section id="tips" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Travel Tips
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Essential advice to make your Japanese adventure smooth and memorable
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                activeCategory === category.id
                  ? `${category.color} text-white shadow-lg`
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <category.icon className="h-5 w-5" />
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filteredTips.map((tip) => (
            <div
              key={tip.id}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="bg-red-100 p-3 rounded-lg flex-shrink-0">
                  {getIcon(tip.icon)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{tip.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{tip.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Contact Card */}
        <div className="mt-16 bg-red-600 rounded-2xl p-8 text-white text-center max-w-2xl mx-auto">
          <Shield className="h-12 w-12 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">Emergency Contacts</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="font-semibold">Police</div>
              <div className="text-2xl font-bold">110</div>
            </div>
            <div>
              <div className="font-semibold">Fire/Ambulance</div>
              <div className="text-2xl font-bold">119</div>
            </div>
            <div>
              <div className="font-semibold">Tourist Hotline</div>
              <div className="text-lg font-bold">050-3816-2787</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TravelTips;
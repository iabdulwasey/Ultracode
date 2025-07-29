import React, { useState } from 'react';
import { Lightbulb, CreditCard, Wifi, Train, MapPin, Shield, Clock, Users, CheckCircle, AlertCircle, Info, Heart } from 'lucide-react';

interface TipCategory {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  color: string;
  tips: Tip[];
}

interface Tip {
  id: number;
  title: string;
  description: string;
  importance: 'essential' | 'recommended' | 'nice-to-know';
  tags: string[];
}

const TravelTips: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('essentials');
  const [expandedTip, setExpandedTip] = useState<number | null>(null);

  const categories: TipCategory[] = [
    {
      id: 'essentials',
      title: 'Travel Essentials',
      icon: Shield,
      color: 'text-red-500',
      tips: [
        {
          id: 1,
          title: 'Cash is King in Japan',
          description: 'Japan is still largely a cash-based society. Many restaurants, shops, and even some hotels don\'t accept credit cards. Always carry cash and know where ATMs are located.',
          importance: 'essential',
          tags: ['Money', 'Payment', 'ATM']
        },
        {
          id: 2,
          title: 'JR Pass for Train Travel',
          description: 'The Japan Rail Pass offers unlimited travel on JR trains, including most shinkansen. Must be purchased before arriving in Japan for significant savings.',
          importance: 'essential',
          tags: ['Transportation', 'Trains', 'Savings']
        },
        {
          id: 3,
          title: 'Pocket WiFi or SIM Card',
          description: 'Stay connected with portable WiFi or a Japanese SIM card. Essential for navigation, translation, and staying in touch.',
          importance: 'essential',
          tags: ['Internet', 'Communication', 'Navigation']
        },
        {
          id: 4,
          title: 'Download Translation Apps',
          description: 'Google Translate with camera function is invaluable. Download offline Japanese language pack before arrival.',
          importance: 'recommended',
          tags: ['Language', 'Apps', 'Communication']
        }
      ]
    },
    {
      id: 'etiquette',
      title: 'Cultural Etiquette',
      icon: Heart,
      color: 'text-pink-500',
      tips: [
        {
          id: 5,
          title: 'Bowing and Greetings',
          description: 'A slight bow shows respect. Don\'t worry about perfect form - effort is appreciated. "Arigatou gozaimasu" (thank you) goes a long way.',
          importance: 'recommended',
          tags: ['Respect', 'Greetings', 'Culture']
        },
        {
          id: 6,
          title: 'Shoes Off Indoors',
          description: 'Remove shoes when entering homes, temples, some restaurants, and traditional accommodations. Look for shoe racks at entrances.',
          importance: 'essential',
          tags: ['Customs', 'Temples', 'Respect']
        },
        {
          id: 7,
          title: 'Quiet on Public Transport',
          description: 'Keep conversations quiet on trains and buses. Phone calls are considered rude. Priority seats are for elderly, pregnant, and disabled passengers.',
          importance: 'essential',
          tags: ['Transportation', 'Respect', 'Etiquette']
        },
        {
          id: 8,
          title: 'No Tipping Required',
          description: 'Tipping is not customary and can be considered rude. Exceptional service is standard, not something requiring extra payment.',
          importance: 'recommended',
          tags: ['Money', 'Service', 'Culture']
        }
      ]
    },
    {
      id: 'practical',
      title: 'Practical Advice',
      icon: Lightbulb,
      color: 'text-yellow-500',
      tips: [
        {
          id: 9,
          title: 'Book Accommodations Early',
          description: 'Popular destinations fill up quickly, especially during cherry blossom and autumn seasons. Book 2-3 months in advance.',
          importance: 'recommended',
          tags: ['Accommodation', 'Booking', 'Planning']
        },
        {
          id: 10,
          title: 'Learn Basic Japanese Phrases',
          description: 'Even basic phrases like "sumimasen" (excuse me) and "onegaishimasu" (please) will be greatly appreciated by locals.',
          importance: 'nice-to-know',
          tags: ['Language', 'Communication', 'Respect']
        },
        {
          id: 11,
          title: 'Carry a Handkerchief',
          description: 'Many public restrooms don\'t provide paper towels or hand dryers. A small towel or handkerchief is essential.',
          importance: 'recommended',
          tags: ['Hygiene', 'Practical', 'Daily Life']
        },
        {
          id: 12,
          title: 'Convenience Store Everything',
          description: 'Konbini (convenience stores) are everywhere and sell everything - food, drinks, tickets, and even pay bills. They\'re your best friend in Japan.',
          importance: 'nice-to-know',
          tags: ['Shopping', 'Food', 'Convenience']
        }
      ]
    },
    {
      id: 'transportation',
      title: 'Getting Around',
      icon: Train,
      color: 'text-blue-500',
      tips: [
        {
          id: 13,
          title: 'IC Cards for Local Transport',
          description: 'Suica or Pasmo cards work on most trains, subways, and buses. Can also be used for purchases at convenience stores.',
          importance: 'essential',
          tags: ['Transportation', 'Cards', 'Convenience']
        },
        {
          id: 14,
          title: 'Hyperdia for Train Schedules',
          description: 'Use Hyperdia app or website for accurate train schedules and route planning. Shows platform numbers and transfer information.',
          importance: 'recommended',
          tags: ['Apps', 'Planning', 'Trains']
        },
        {
          id: 15,
          title: 'Rush Hour Avoidance',
          description: 'Avoid trains 7:30-9:30 AM and 5:30-7:30 PM if possible. Trains can be extremely crowded during these times.',
          importance: 'recommended',
          tags: ['Timing', 'Crowds', 'Planning']
        },
        {
          id: 16,
          title: 'Station Staff Assistance',
          description: 'Station staff are incredibly helpful. They often speak some English and will go out of their way to help you find your platform.',
          importance: 'nice-to-know',
          tags: ['Help', 'Service', 'Navigation']
        }
      ]
    }
  ];

  const currentCategory = categories.find(cat => cat.id === activeCategory) || categories[0];

  const getImportanceIcon = (importance: string) => {
    switch (importance) {
      case 'essential':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'recommended':
        return <CheckCircle className="w-4 h-4 text-yellow-500" />;
      default:
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'essential':
        return 'border-red-200 bg-red-50';
      case 'recommended':
        return 'border-yellow-200 bg-yellow-50';
      default:
        return 'border-blue-200 bg-blue-50';
    }
  };

  return (
    <section id="tips" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-japan-indigo/10 rounded-full px-4 py-2 mb-4">
            <Lightbulb className="w-4 h-4 text-japan-red" />
            <span className="text-japan-red text-sm font-medium">Travel Smart</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Essential <span className="gradient-text">Travel Tips</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Navigate Japan like a pro with insider tips, cultural insights, and practical advice 
            from experienced travelers and local experts.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { icon: Users, label: 'Tips from Experts', value: '100+' },
            { icon: MapPin, label: 'Cities Covered', value: '50+' },
            { icon: Clock, label: 'Years Experience', value: '15+' },
            { icon: CheckCircle, label: 'Success Rate', value: '99%' }
          ].map((stat, index) => (
            <div key={stat.label} className="text-center bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-japan-red to-japan-cherry rounded-full flex items-center justify-center mx-auto mb-3">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-japan-red to-japan-cherry text-white shadow-lg scale-105'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <category.icon className="w-4 h-4" />
              <span>{category.title}</span>
              <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                {category.tips.length}
              </span>
            </button>
          ))}
        </div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentCategory.tips.map((tip, index) => (
            <div
              key={tip.id}
              className={`bg-white rounded-2xl border-2 p-6 transition-all duration-300 hover:shadow-lg ${getImportanceColor(tip.importance)}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getImportanceIcon(tip.importance)}
                  <h3 className="text-lg font-bold text-gray-900">{tip.title}</h3>
                </div>
                <button
                  onClick={() => setExpandedTip(expandedTip === tip.id ? null : tip.id)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Info className="w-5 h-5" />
                </button>
              </div>

              {/* Importance Badge */}
              <div className="mb-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  tip.importance === 'essential' ? 'bg-red-100 text-red-800' :
                  tip.importance === 'recommended' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {tip.importance.replace('-', ' ').toUpperCase()}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-700 mb-4 leading-relaxed">
                {tip.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {tip.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Contacts Section */}
        <div className="mt-16 bg-gradient-to-r from-red-50 to-pink-50 rounded-3xl p-8 border border-red-100">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Emergency Information</h3>
            <p className="text-gray-600">Important numbers and contacts for your safety in Japan</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Police', number: '110', description: 'Emergency police assistance' },
              { title: 'Fire/Ambulance', number: '119', description: 'Fire department and medical emergency' },
              { title: 'Tourist Hotline', number: '050-3816-2787', description: '24/7 multilingual support' }
            ].map((contact, index) => (
              <div key={contact.title} className="bg-white rounded-xl p-6 text-center shadow-sm">
                <h4 className="font-bold text-lg text-gray-900 mb-2">{contact.title}</h4>
                <div className="text-3xl font-bold text-red-500 mb-2">{contact.number}</div>
                <p className="text-sm text-gray-600">{contact.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-4">Need More Personalized Advice?</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Get custom travel tips and recommendations based on your specific interests, 
            travel style, and destinations in Japan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-japan-red to-japan-cherry text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
              Get Custom Tips
            </button>
            <button className="border-2 border-japan-red text-japan-red px-8 py-3 rounded-full font-semibold hover:bg-japan-red hover:text-white transition-all duration-300">
              Download Guide PDF
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TravelTips;
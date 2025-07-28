import React, { useState } from 'react';
import { Plane, MapPin, CreditCard, Wifi, Shield, Calendar, Clock, AlertCircle, CheckCircle, Info } from 'lucide-react';

const TravelTips: React.FC = () => {
  const [activeTab, setActiveTab] = useState('planning');

  const tabs = [
    { id: 'planning', name: 'Trip Planning', icon: Calendar },
    { id: 'visa', name: 'Visa & Documents', icon: Shield },
    { id: 'money', name: 'Money & Payments', icon: CreditCard },
    { id: 'transport', name: 'Transportation', icon: Plane },
    { id: 'communication', name: 'Communication', icon: Wifi },
    { id: 'culture', name: 'Cultural Etiquette', icon: Info }
  ];

  const tips = {
    planning: [
      {
        title: "Best Time to Visit",
        content: "Spring (April-May) and autumn (September-November) offer pleasant weather. Avoid Golden Week holidays (Oct 1-7) for fewer crowds.",
        type: "success"
      },
      {
        title: "Duration Recommendations",
        content: "First-time visitors: 10-14 days minimum. Beijing & Shanghai: 3-4 days each. Xi'an: 2-3 days. Guilin: 2-3 days.",
        type: "info"
      },
      {
        title: "Book in Advance",
        content: "High-speed trains, popular attractions, and hotels fill up quickly. Book 1-2 months ahead, especially for peak seasons.",
        type: "warning"
      },
      {
        title: "Weather Preparation",
        content: "China has diverse climates. Pack layers, comfortable walking shoes, and weather-appropriate clothing for your destinations.",
        type: "info"
      }
    ],
    visa: [
      {
        title: "Visa Requirements",
        content: "Most visitors need a tourist visa (L visa). Apply 1-3 months before travel. Some cities offer 72-144 hour visa-free transit.",
        type: "warning"
      },
      {
        title: "Required Documents",
        content: "Valid passport (6+ months), completed application form, photo, flight itinerary, hotel bookings, and invitation letter if applicable.",
        type: "info"
      },
      {
        title: "Visa-Free Options",
        content: "15-day visa-free for some countries. 144-hour transit visa for Beijing, Shanghai, Guangzhou with onward flight to third country.",
        type: "success"
      },
      {
        title: "Health Requirements",
        content: "No mandatory vaccinations for most travelers. Consider hepatitis A/B, typhoid, and Japanese encephalitis for rural areas.",
        type: "info"
      }
    ],
    money: [
      {
        title: "Currency & Exchange",
        content: "Chinese Yuan (CNY/RMB). Exchange at banks or authorized dealers. Avoid street exchangers. ATMs widely available in cities.",
        type: "info"
      },
      {
        title: "Digital Payments",
        content: "WeChat Pay and Alipay dominate. Cash still needed for small vendors, taxis, and rural areas. Credit cards accepted in hotels/malls.",
        type: "success"
      },
      {
        title: "Tipping Culture",
        content: "Tipping not expected or required in China. Service charges included in upscale restaurants. Don't tip taxi drivers or tour guides.",
        type: "info"
      },
      {
        title: "Budget Planning",
        content: "Budget: $30-50/day. Mid-range: $50-100/day. Luxury: $100+/day. Food is very affordable, transportation costs vary by distance.",
        type: "success"
      }
    ],
    transport: [
      {
        title: "High-Speed Rail",
        content: "Excellent network connecting major cities. Book tickets online or at stations. Bring passport for ticket purchase and boarding.",
        type: "success"
      },
      {
        title: "Domestic Flights",
        content: "Competitive prices for long distances. Allow extra time for security. Download airline apps for easier check-in and updates.",
        type: "info"
      },
      {
        title: "City Transportation",
        content: "Metro systems in major cities are efficient and cheap. Taxis available but language barrier exists. Didi (Chinese Uber) very popular.",
        type: "success"
      },
      {
        title: "Intercity Buses",
        content: "Extensive network but slower than trains. Good for reaching smaller destinations. Comfort levels vary significantly.",
        type: "warning"
      }
    ],
    communication: [
      {
        title: "Internet & VPN",
        content: "Many Western sites blocked (Google, Facebook, YouTube). Consider VPN before arrival. Free WiFi common in hotels, cafes, and malls.",
        type: "warning"
      },
      {
        title: "Language Barrier",
        content: "English limited outside major tourist areas. Download translation apps, carry hotel cards in Chinese, learn basic phrases.",
        type: "info"
      },
      {
        title: "Useful Apps",
        content: "WeChat (messaging), Dianping (reviews), Baidu Maps (navigation), Pleco (dictionary), China Train Booking (12306).",
        type: "success"
      },
      {
        title: "Phone & SIM Cards",
        content: "Buy local SIM card at airports or stores. International roaming expensive. Pocket WiFi devices available for rent.",
        type: "info"
      }
    ],
    culture: [
      {
        title: "Greeting Customs",
        content: "Slight bow or nod appropriate. Handshakes common in business. Use both hands when receiving business cards or gifts.",
        type: "info"
      },
      {
        title: "Dining Etiquette",
        content: "Wait to be seated. Don't stick chopsticks upright in rice. Try everything offered. Leaving food shows satisfaction.",
        type: "success"
      },
      {
        title: "Gift Giving",
        content: "Avoid clocks, white flowers, or items in sets of four. Wrap gifts nicely. Present and receive with both hands.",
        type: "warning"
      },
      {
        title: "Temple Behavior",
        content: "Dress modestly, remove hats, speak quietly. Don't point feet toward Buddha statues. Photography rules vary by temple.",
        type: "info"
      }
    ]
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getBorderColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'border-l-green-500 bg-green-50';
      case 'warning':
        return 'border-l-yellow-500 bg-yellow-50';
      default:
        return 'border-l-blue-500 bg-blue-50';
    }
  };

  return (
    <section id="tips" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Essential</span> Travel Tips
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know for a smooth and memorable journey through China
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-chinese-red to-chinese-gold text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Tips Content */}
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6">
            {tips[activeTab as keyof typeof tips].map((tip, index) => (
              <div
                key={index}
                className={`border-l-4 p-6 rounded-r-lg ${getBorderColor(tip.type)} animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start space-x-3">
                  {getIcon(tip.type)}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">{tip.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{tip.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="mt-16 bg-gradient-to-r from-chinese-red/10 to-chinese-gold/10 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-center mb-8 gradient-text">Emergency Contacts</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-chinese-red mb-2">110</div>
              <div className="text-gray-700">Police Emergency</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-chinese-red mb-2">120</div>
              <div className="text-gray-700">Medical Emergency</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-chinese-red mb-2">119</div>
              <div className="text-gray-700">Fire Emergency</div>
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <Clock className="w-8 h-8 text-chinese-red mx-auto mb-3" />
            <h4 className="font-semibold mb-2">Time Zone</h4>
            <p className="text-sm text-gray-600">China Standard Time (UTC+8)</p>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <Plane className="w-8 h-8 text-chinese-red mx-auto mb-3" />
            <h4 className="font-semibold mb-2">Power Plugs</h4>
            <p className="text-sm text-gray-600">Type A, C, I (220V, 50Hz)</p>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <MapPin className="w-8 h-8 text-chinese-red mx-auto mb-3" />
            <h4 className="font-semibold mb-2">Driving</h4>
            <p className="text-sm text-gray-600">Right-hand side traffic</p>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <Wifi className="w-8 h-8 text-chinese-red mx-auto mb-3" />
            <h4 className="font-semibold mb-2">Internet</h4>
            <p className="text-sm text-gray-600">VPN recommended for access</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TravelTips;
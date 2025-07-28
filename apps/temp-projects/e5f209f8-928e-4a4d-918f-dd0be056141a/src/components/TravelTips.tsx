import React, { useState } from 'react';
import { 
  Plane, 
  CreditCard, 
  Wifi, 
  MapPin, 
  Clock, 
  Shield, 
  Phone, 
  Utensils,
  ChevronDown,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';

const TravelTips: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [expandedTip, setExpandedTip] = useState<number | null>(null);

  const categories = [
    {
      name: "Before You Go",
      icon: Plane,
      color: "from-blue-500 to-blue-600",
      tips: [
        {
          title: "Visa Requirements",
          type: "important",
          content: "Most visitors can enter Japan visa-free for up to 90 days. Check your country's specific requirements before traveling.",
          details: [
            "Tourist visa not required for stays under 90 days (most countries)",
            "Passport must be valid for duration of stay",
            "Return ticket may be required",
            "Working holiday visas available for certain countries"
          ]
        },
        {
          title: "Best Time to Visit",
          type: "info",
          content: "Spring (March-May) and autumn (September-November) offer the best weather and beautiful seasonal changes.",
          details: [
            "Spring: Cherry blossoms, mild weather (March-May)",
            "Summer: Hot and humid, festivals (June-August)",
            "Autumn: Fall colors, comfortable temperatures (September-November)",
            "Winter: Cold, snow in north, fewer crowds (December-February)"
          ]
        },
        {
          title: "What to Pack",
          type: "tip",
          content: "Pack layers, comfortable walking shoes, and remember that Japan has four distinct seasons.",
          details: [
            "Comfortable walking shoes (you'll walk a lot!)",
            "Layers for changing weather",
            "Portable umbrella (especially in rainy season)",
            "Cash wallet (Japan is still largely cash-based)",
            "Portable phone charger"
          ]
        }
      ]
    },
    {
      name: "Money & Payments",
      icon: CreditCard,
      color: "from-green-500 to-green-600",
      tips: [
        {
          title: "Cash is King",
          type: "important",
          content: "Japan is still largely a cash-based society. Always carry cash and know where to find ATMs.",
          details: [
            "Many places only accept cash",
            "7-Eleven ATMs accept foreign cards",
            "Post office ATMs also work with international cards",
            "IC cards (Suica/Pasmo) for trains and some purchases",
            "Keep coins handy for vending machines"
          ]
        },
        {
          title: "Tipping Culture",
          type: "tip",
          content: "Tipping is not customary in Japan and can sometimes be considered rude. Excellent service is expected.",
          details: [
            "No tipping at restaurants, hotels, or taxis",
            "Service charges are included in bills",
            "Exceptional service is the standard",
            "Saying 'arigatou gozaimasu' (thank you) is appreciated",
            "Some high-end hotels may accept tips discretely"
          ]
        },
        {
          title: "IC Cards",
          type: "info",
          content: "Get a rechargeable IC card for convenient travel on trains and purchases at convenience stores.",
          details: [
            "Suica (JR East) or Pasmo (private railways) cards",
            "Use for trains, subways, buses, and some shops",
            "Rechargeable at station machines",
            "Can be used across most of Japan",
            "Return card for deposit refund when leaving"
          ]
        }
      ]
    },
    {
      name: "Technology & Communication",
      icon: Wifi,
      color: "from-purple-500 to-purple-600",
      tips: [
        {
          title: "Internet Access",
          type: "info",
          content: "Free WiFi is widely available, but consider renting a pocket WiFi device for constant connectivity.",
          details: [
            "Free WiFi at stations, convenience stores, cafes",
            "Pocket WiFi rental for unlimited data",
            "SIM cards available at airports",
            "Many hotels offer free internet",
            "Download offline maps before traveling"
          ]
        },
        {
          title: "Essential Apps",
          type: "tip",
          content: "Download these apps to make your Japan trip smoother and more enjoyable.",
          details: [
            "Google Translate (camera feature for signs)",
            "Hyperdia or Google Maps for train routes",
            "Tabelog for restaurant reviews",
            "Japan Official Travel App",
            "Currency converter app"
          ]
        },
        {
          title: "Language Barrier",
          type: "info",
          content: "English signage is common in major cities, but learning basic Japanese phrases is helpful and appreciated.",
          details: [
            "Major stations have English signage",
            "Restaurant staff may have limited English",
            "Point at menu items or use pictures",
            "Learn basic phrases: arigatou, sumimasen, eigo",
            "Many Japanese are patient with foreign visitors"
          ]
        }
      ]
    },
    {
      name: "Transportation",
      icon: MapPin,
      color: "from-red-500 to-red-600",
      tips: [
        {
          title: "JR Pass",
          type: "important",
          content: "The Japan Rail Pass can save money if you're traveling between cities. Must be purchased before arriving in Japan.",
          details: [
            "Must be purchased outside Japan",
            "Covers JR trains including most shinkansen",
            "7, 14, or 21-day options available",
            "Not valid on Nozomi/Mizuho shinkansen",
            "Calculate if it's worth it for your itinerary"
          ]
        },
        {
          title: "Train Etiquette",
          type: "tip",
          content: "Japanese trains are efficient and punctual. Follow local etiquette to be a respectful passenger.",
          details: [
            "Let passengers exit before boarding",
            "Priority seats for elderly, pregnant, disabled",
            "Keep phone on silent, no talking on phone",
            "Don't eat smelly food on trains",
            "Stand on left side of escalators (right in Osaka)"
          ]
        },
        {
          title: "Getting Around Cities",
          type: "info",
          content: "Most Japanese cities have excellent public transportation. Walking is also a great way to explore.",
          details: [
            "Subway systems in major cities are extensive",
            "Buses can be confusing for tourists",
            "Taxis are expensive but clean and safe",
            "Bicycle rental available in many areas",
            "Most attractions are walkable from stations"
          ]
        }
      ]
    },
    {
      name: "Culture & Etiquette",
      icon: Shield,
      color: "from-orange-500 to-orange-600",
      tips: [
        {
          title: "Bowing and Greetings",
          type: "tip",
          content: "Bowing is an important part of Japanese culture. A slight bow shows respect and politeness.",
          details: [
            "Slight bow (15 degrees) for casual greetings",
            "Deeper bow shows more respect",
            "Handshakes becoming more common with foreigners",
            "Say 'ohayo gozaimasu' (good morning) or 'konnichiwa' (hello)",
            "Remove hats when bowing"
          ]
        },
        {
          title: "Shoes and Indoor Spaces",
          type: "important",
          content: "Remove shoes when entering homes, some restaurants, temples, and traditional accommodations.",
          details: [
            "Look for genkan (entryway) with shoe racks",
            "Slippers often provided for indoor use",
            "Special toilet slippers in bathrooms",
            "Socks should be clean and without holes",
            "Traditional ryokan and temples require shoe removal"
          ]
        },
        {
          title: "Dining Etiquette",
          type: "info",
          content: "Japanese dining has specific customs. Say 'itadakimasu' before eating and 'gochisousama' after.",
          details: [
            "Say 'itadakimasu' before eating (I humbly receive)",
            "Say 'gochisousama' after eating (thank you for the meal)",
            "Don't stick chopsticks upright in rice",
            "Slurping noodles is acceptable and shows appreciation",
            "Pour drinks for others, not yourself"
          ]
        }
      ]
    },
    {
      name: "Food & Dining",
      icon: Utensils,
      color: "from-yellow-500 to-yellow-600",
      tips: [
        {
          title: "Restaurant Types",
          type: "info",
          content: "Japan has various dining styles from street food to haute cuisine. Each has its own atmosphere and customs.",
          details: [
            "Izakaya: Casual pub-style dining",
            "Sushi-ya: Traditional sushi restaurants",
            "Ramen shops: Usually counter seating",
            "Depachika: Department store food courts",
            "Convenience store food is surprisingly good"
          ]
        },
        {
          title: "Ordering Food",
          type: "tip",
          content: "Many restaurants have plastic food displays or ticket machines. Don't be afraid to point at what you want.",
          details: [
            "Plastic food displays show actual dishes",
            "Ticket machines: buy ticket, give to staff",
            "Picture menus available in tourist areas",
            "Point at menu items if language is a barrier",
            "Set meals (teishoku) are good value"
          ]
        },
        {
          title: "Dietary Restrictions",
          type: "important",
          content: "Vegetarian and halal options can be limited. Research restaurants in advance if you have dietary restrictions.",
          details: [
            "Vegetarian options limited, often contain fish stock",
            "Halal restaurants mainly in major cities",
            "Allergy cards in Japanese can be helpful",
            "Buddhist temple food (shojin ryori) is vegetarian",
            "Happy Cow app helps find vegetarian restaurants"
          ]
        }
      ]
    }
  ];

  const getIconColor = (type: string) => {
    switch (type) {
      case 'important': return 'text-red-500';
      case 'tip': return 'text-green-500';
      default: return 'text-blue-500';
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'important': return AlertCircle;
      case 'tip': return CheckCircle;
      default: return Info;
    }
  };

  return (
    <section id="tips" className="py-20 bg-gradient-to-br from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold gradient-text mb-6">
            Essential Travel Tips
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know for a smooth and enjoyable trip to Japan. 
            From cultural etiquette to practical advice, we've got you covered.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={index}
                  className={`flex items-center space-x-3 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeCategory === index
                      ? `bg-gradient-to-r ${category.color} text-white shadow-lg scale-105`
                      : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg'
                  }`}
                  onClick={() => setActiveCategory(index)}
                >
                  <IconComponent className="w-5 h-5" />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>

          {/* Tips Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {categories[activeCategory].tips.map((tip, index) => {
              const IconComponent = getIcon(tip.type);
              const isExpanded = expandedTip === index;
              
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-6">
                    {/* Tip Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg bg-gray-50 ${getIconColor(tip.type)}`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {tip.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            {tip.content}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Expand Button */}
                    <button
                      className="flex items-center justify-between w-full mt-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      onClick={() => setExpandedTip(isExpanded ? null : index)}
                    >
                      <span className="font-medium text-gray-700">
                        {isExpanded ? 'Show Less' : 'Show Details'}
                      </span>
                      <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${
                        isExpanded ? 'rotate-180' : ''
                      }`} />
                    </button>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg animate-slide-up">
                        <ul className="space-y-3">
                          {tip.details.map((detail, detailIndex) => (
                            <li key={detailIndex} className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-japan-red rounded-full mt-2 flex-shrink-0" />
                              <span className="text-gray-700 text-sm leading-relaxed">
                                {detail}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Emergency Contacts */}
          <div className="mt-16 bg-gradient-to-r from-japan-red to-japan-gold rounded-2xl p-8 text-white">
            <div className="text-center mb-8">
              <Phone className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Emergency Contacts</h3>
              <p className="text-japan-cherry">Important numbers to keep handy during your trip</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <h4 className="font-bold text-lg mb-2">Police</h4>
                <p className="text-3xl font-bold">110</p>
              </div>
              <div className="text-center">
                <h4 className="font-bold text-lg mb-2">Ambulance/Fire</h4>
                <p className="text-3xl font-bold">119</p>
              </div>
              <div className="text-center">
                <h4 className="font-bold text-lg mb-2">Tourist Hotline</h4>
                <p className="text-3xl font-bold">050-3816-2787</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TravelTips;
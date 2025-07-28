import React, { useState } from 'react';
import { ChevronRight, MapPin, Thermometer, Calendar, Users } from 'lucide-react';

const RegionsGuide: React.FC = () => {
  const [activeRegion, setActiveRegion] = useState(0);

  const regions = [
    {
      name: "Kanto Region",
      prefecture: "Tokyo, Kanagawa, Chiba",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      description: "Japan's political and economic center, home to Tokyo and surrounding prefectures",
      highlights: ["Tokyo Metropolis", "Mount Fuji Views", "Modern Architecture", "Pop Culture"],
      bestTime: "Spring & Autumn",
      climate: "Humid Subtropical",
      population: "43.8M",
      keyAttractions: [
        "Tokyo Skytree",
        "Imperial Palace",
        "Shibuya Crossing",
        "Kamakura Buddha",
        "Hakone Hot Springs"
      ],
      specialties: ["Sushi", "Ramen", "Tempura", "Monjayaki"],
      color: "from-blue-500 to-purple-600"
    },
    {
      name: "Kansai Region",
      prefecture: "Osaka, Kyoto, Nara",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      description: "The cultural heart of Japan with ancient capitals and traditional architecture",
      highlights: ["Historic Temples", "Traditional Culture", "Ancient Capitals", "UNESCO Sites"],
      bestTime: "Spring & Autumn",
      climate: "Humid Subtropical",
      population: "22.7M",
      keyAttractions: [
        "Fushimi Inari Shrine",
        "Kiyomizu Temple",
        "Osaka Castle",
        "Nara Deer Park",
        "Arashiyama Bamboo"
      ],
      specialties: ["Kaiseki", "Takoyaki", "Okonomiyaki", "Tofu Cuisine"],
      color: "from-red-500 to-orange-600"
    },
    {
      name: "Chubu Region",
      prefecture: "Nagoya, Gifu, Shizuoka",
      image: "https://images.unsplash.com/photo-1576866209830-589e1bfbaa4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      description: "Mountain region featuring the Japanese Alps and traditional villages",
      highlights: ["Japanese Alps", "Traditional Villages", "Hot Springs", "Mount Fuji"],
      bestTime: "Summer & Autumn",
      climate: "Varied by Altitude",
      population: "21.7M",
      keyAttractions: [
        "Mount Fuji",
        "Shirakawa-go",
        "Takayama",
        "Matsumoto Castle",
        "Tateyama Kurobe"
      ],
      specialties: ["Hida Beef", "Miso", "Soba", "Mountain Vegetables"],
      color: "from-green-500 to-teal-600"
    },
    {
      name: "Tohoku Region",
      prefecture: "Sendai, Aomori, Fukushima",
      image: "https://images.unsplash.com/photo-1542640244-7e672d6cef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      description: "Northern region known for natural beauty, hot springs, and festivals",
      highlights: ["Cherry Blossoms", "Hot Springs", "Traditional Festivals", "Natural Beauty"],
      bestTime: "Spring & Summer",
      climate: "Continental",
      population: "8.9M",
      keyAttractions: [
        "Hirosaki Castle",
        "Matsushima Bay",
        "Ginzan Onsen",
        "Mount Bandai",
        "Oirase Gorge"
      ],
      specialties: ["Beef Tongue", "Sake", "Apples", "Seafood"],
      color: "from-pink-500 to-rose-600"
    },
    {
      name: "Kyushu Region",
      prefecture: "Fukuoka, Kumamoto, Kagoshima",
      image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      description: "Southern island with active volcanoes, hot springs, and unique culture",
      highlights: ["Active Volcanoes", "Hot Springs", "Unique Culture", "Subtropical Climate"],
      bestTime: "Year Round",
      climate: "Subtropical",
      population: "12.9M",
      keyAttractions: [
        "Mount Aso",
        "Beppu Hot Springs",
        "Kumamoto Castle",
        "Yakushima Island",
        "Nagasaki Peace Park"
      ],
      specialties: ["Ramen", "Shochu", "Wagyu Beef", "Sweet Potato"],
      color: "from-yellow-500 to-orange-600"
    }
  ];

  return (
    <section id="regions" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold gradient-text mb-6">
            Explore Japan by Region
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Each region of Japan offers distinct experiences, from bustling metropolises to serene mountain villages. 
            Discover what makes each area special and plan your perfect itinerary.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Region Selector */}
          <div className="space-y-4">
            {regions.map((region, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                  activeRegion === index
                    ? 'bg-white shadow-xl border-2 border-japan-cherry'
                    : 'bg-white/50 hover:bg-white hover:shadow-lg'
                }`}
                onClick={() => setActiveRegion(index)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`text-xl font-bold mb-2 ${
                      activeRegion === index ? 'gradient-text' : 'text-gray-900'
                    }`}>
                      {region.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">{region.prefecture}</p>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {region.description}
                    </p>
                  </div>
                  <ChevronRight className={`w-6 h-6 transition-all duration-300 ${
                    activeRegion === index 
                      ? 'text-japan-red rotate-90' 
                      : 'text-gray-400'
                  }`} />
                </div>

                {/* Quick Stats */}
                {activeRegion === index && (
                  <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-3 gap-4 animate-slide-up">
                    <div className="text-center">
                      <Calendar className="w-5 h-5 text-japan-red mx-auto mb-1" />
                      <p className="text-xs text-gray-600">Best Time</p>
                      <p className="text-sm font-medium">{region.bestTime}</p>
                    </div>
                    <div className="text-center">
                      <Thermometer className="w-5 h-5 text-japan-red mx-auto mb-1" />
                      <p className="text-xs text-gray-600">Climate</p>
                      <p className="text-sm font-medium">{region.climate}</p>
                    </div>
                    <div className="text-center">
                      <Users className="w-5 h-5 text-japan-red mx-auto mb-1" />
                      <p className="text-xs text-gray-600">Population</p>
                      <p className="text-sm font-medium">{region.population}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Region Details */}
          <div className="sticky top-8">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Hero Image */}
              <div className="relative h-64">
                <img
                  src={regions[activeRegion].image}
                  alt={regions[activeRegion].name}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${regions[activeRegion].color} opacity-80`} />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{regions[activeRegion].name}</h3>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{regions[activeRegion].prefecture}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Highlights */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Highlights</h4>
                  <div className="flex flex-wrap gap-2">
                    {regions[activeRegion].highlights.map((highlight, index) => (
                      <span
                        key={index}
                        className="bg-japan-cherry/20 text-japan-navy px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Attractions */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Attractions</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {regions[activeRegion].keyAttractions.map((attraction, index) => (
                      <div key={index} className="flex items-center text-gray-700">
                        <ChevronRight className="w-4 h-4 text-japan-red mr-2" />
                        <span className="text-sm">{attraction}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Local Specialties */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Local Specialties</h4>
                  <div className="flex flex-wrap gap-2">
                    {regions[activeRegion].specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="bg-japan-gold/20 text-japan-navy px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <button className="w-full bg-gradient-to-r from-japan-red to-japan-gold text-white py-3 px-4 rounded-xl font-medium hover:shadow-lg transition-all duration-300">
                  Plan Your {regions[activeRegion].name} Trip
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegionsGuide;
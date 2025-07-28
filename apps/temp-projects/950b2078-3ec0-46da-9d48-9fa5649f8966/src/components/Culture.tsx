import React from 'react';
import { Calendar, Music, Palette, Users, Book, Heart } from 'lucide-react';

const Culture: React.FC = () => {
  const culturalAspects = [
    {
      icon: Calendar,
      title: "Festivals & Celebrations",
      description: "Experience vibrant festivals like Chinese New Year, Mid-Autumn Festival, and Dragon Boat Festival",
      highlights: ["Spring Festival", "Lantern Festival", "Qingming Festival", "National Day"],
      color: "from-red-500 to-pink-500"
    },
    {
      icon: Music,
      title: "Traditional Arts",
      description: "Discover ancient art forms including opera, calligraphy, martial arts, and traditional music",
      highlights: ["Beijing Opera", "Tai Chi", "Calligraphy", "Guqin Music"],
      color: "from-blue-500 to-purple-500"
    },
    {
      icon: Palette,
      title: "Crafts & Artisans",
      description: "Marvel at exquisite craftsmanship in porcelain, silk, jade carving, and paper cutting",
      highlights: ["Porcelain Making", "Silk Weaving", "Jade Carving", "Paper Cutting"],
      color: "from-green-500 to-teal-500"
    },
    {
      icon: Users,
      title: "Philosophy & Wisdom",
      description: "Learn about Confucianism, Taoism, and Buddhism that shaped Chinese thought for millennia",
      highlights: ["Confucius Teachings", "Taoist Philosophy", "Buddhist Temples", "Ancient Wisdom"],
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Book,
      title: "Literature & Poetry",
      description: "Explore classical literature, poetry, and modern works that reflect Chinese civilization",
      highlights: ["Tang Poetry", "Classical Novels", "Modern Literature", "Ancient Scripts"],
      color: "from-purple-500 to-indigo-500"
    },
    {
      icon: Heart,
      title: "Tea Culture",
      description: "Immerse yourself in the ancient art of tea ceremony and discover China's tea traditions",
      highlights: ["Tea Ceremony", "Green Tea", "Oolong Tea", "Tea Houses"],
      color: "from-emerald-500 to-green-500"
    }
  ];

  const traditions = [
    {
      name: "Chinese Calligraphy",
      description: "The art of beautiful writing with brush and ink",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
    },
    {
      name: "Traditional Medicine",
      description: "Ancient healing practices using herbs and acupuncture",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop"
    },
    {
      name: "Martial Arts",
      description: "Kung Fu and Tai Chi for physical and spiritual development",
      image: "https://images.unsplash.com/photo-1544737151-6e4b01de6b86?w=400&h=300&fit=crop"
    },
    {
      name: "Dragon Dance",
      description: "Spectacular performances bringing good luck and fortune",
      image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=300&fit=crop"
    }
  ];

  return (
    <section id="culture" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Rich</span> Cultural Heritage
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dive deep into 5,000 years of Chinese civilization, traditions, and cultural practices 
            that continue to shape modern China
          </p>
        </div>

        {/* Cultural Aspects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {culturalAspects.map((aspect, index) => {
            const Icon = aspect.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${aspect.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold mb-4 group-hover:text-chinese-red transition-colors">
                  {aspect.title}
                </h3>
                
                <p className="text-gray-600 mb-6">
                  {aspect.description}
                </p>

                <div className="space-y-2">
                  {aspect.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-chinese-gold rounded-full"></div>
                      <span className="text-sm text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Traditional Practices */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12">
            <span className="gradient-text">Traditional Practices</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {traditions.map((tradition, index) => (
              <div
                key={index}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl mb-4">
                  <img
                    src={tradition.image}
                    alt={tradition.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h4 className="font-semibold mb-1">{tradition.name}</h4>
                    <p className="text-sm text-white/90">{tradition.description}</p>
                  </div>
                </div>
                <h4 className="font-semibold text-center group-hover:text-chinese-red transition-colors">
                  {tradition.name}
                </h4>
              </div>
            ))}
          </div>
        </div>

        {/* Cultural Quote */}
        <div className="bg-gradient-to-r from-chinese-red to-chinese-gold rounded-2xl p-12 text-center text-white">
          <blockquote className="text-2xl md:text-3xl font-light italic mb-6">
            "A journey of a thousand miles begins with a single step"
          </blockquote>
          <cite className="text-lg opacity-90">- Lao Tzu, Ancient Chinese Philosopher</cite>
        </div>

        {/* Cultural Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold gradient-text mb-2">56</div>
            <div className="text-gray-600">Ethnic Minorities</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold gradient-text mb-2">300+</div>
            <div className="text-gray-600">Traditional Operas</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold gradient-text mb-2">55</div>
            <div className="text-gray-600">UNESCO Sites</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold gradient-text mb-2">5000+</div>
            <div className="text-gray-600">Years of History</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Culture;
import React from 'react';
import { Heart, Users, Book, Music } from 'lucide-react';

const Culture: React.FC = () => {
  const culturalAspects = [
    {
      icon: Heart,
      title: 'Omotenashi',
      titleJapanese: 'おもてなし',
      description: 'The Japanese spirit of hospitality and wholehearted service',
      details: 'Experience genuine care and attention to detail in every interaction'
    },
    {
      icon: Users,
      title: 'Respect & Harmony',
      titleJapanese: '和 (Wa)',
      description: 'The fundamental value of maintaining social harmony',
      details: 'Understanding the importance of group consensus and mutual respect'
    },
    {
      icon: Book,
      title: 'Tradition & Modernity',
      titleJapanese: '伝統と現代',
      description: 'The unique balance between ancient customs and innovation',
      details: 'Witness how Japan preserves its heritage while embracing the future'
    },
    {
      icon: Music,
      title: 'Arts & Aesthetics',
      titleJapanese: '美学 (Bigaku)',
      description: 'The pursuit of beauty in simplicity and imperfection',
      details: 'From tea ceremony to flower arrangement, discover Japanese aesthetics'
    }
  ];

  const traditions = [
    {
      name: 'Tea Ceremony',
      nameJapanese: '茶道 (Sado)',
      image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=300&h=200&fit=crop',
      description: 'Ancient ritual of preparing and serving tea with mindfulness'
    },
    {
      name: 'Calligraphy',
      nameJapanese: '書道 (Shodo)',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop',
      description: 'The art of beautiful writing as a form of meditation'
    },
    {
      name: 'Flower Arrangement',
      nameJapanese: '華道 (Kado)',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop',
      description: 'Creating harmony through the arrangement of flowers and branches'
    },
    {
      name: 'Martial Arts',
      nameJapanese: '武道 (Budo)',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop',
      description: 'Physical and spiritual discipline through combat training'
    }
  ];

  return (
    <section id="culture" className="py-20 bg-gradient-to-br from-red-50 to-pink-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Japanese Culture
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the rich cultural heritage that shapes modern Japan
          </p>
        </div>

        {/* Cultural Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {culturalAspects.map((aspect, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
            >
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <aspect.icon className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{aspect.title}</h3>
              <p className="text-red-600 font-japanese mb-3">{aspect.titleJapanese}</p>
              <p className="text-gray-600 mb-3">{aspect.description}</p>
              <p className="text-sm text-gray-500">{aspect.details}</p>
            </div>
          ))}
        </div>

        {/* Traditional Arts */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Traditional Arts
            </h3>
            <p className="text-lg text-gray-600">
              Experience the timeless beauty of Japanese traditional arts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {traditions.map((tradition, index) => (
              <div
                key={index}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-xl mb-4">
                  <img
                    src={tradition.image}
                    alt={tradition.name}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-1">{tradition.name}</h4>
                <p className="text-red-600 font-japanese mb-2">{tradition.nameJapanese}</p>
                <p className="text-gray-600 text-sm">{tradition.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Cultural Tips */}
        <div className="mt-16 bg-red-600 rounded-3xl p-8 md:p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-6">Cultural Etiquette Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div>
              <div className="text-4xl mb-4">🙇</div>
              <h4 className="text-xl font-semibold mb-2">Bowing</h4>
              <p>A slight bow shows respect and is appreciated by locals</p>
            </div>
            <div>
              <div className="text-4xl mb-4">👟</div>
              <h4 className="text-xl font-semibold mb-2">Remove Shoes</h4>
              <p>Always remove shoes when entering homes, temples, and some restaurants</p>
            </div>
            <div>
              <div className="text-4xl mb-4">🤫</div>
              <h4 className="text-xl font-semibold mb-2">Quiet Public Spaces</h4>
              <p>Keep conversations quiet on trains and in public areas</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Culture;
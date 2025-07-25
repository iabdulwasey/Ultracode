import React from 'react';
import { Award, Users, Heart, Sparkles } from 'lucide-react';

const About: React.FC = () => {
  const values = [
    {
      icon: Award,
      title: "Premium Quality",
      description: "We source only the finest 100% human hair extensions, ensuring natural look and feel."
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Our certified stylists have years of experience in hair extension application and styling."
    },
    {
      icon: Heart,
      title: "Customer Care",
      description: "We're committed to providing exceptional service and support throughout your hair journey."
    },
    {
      icon: Sparkles,
      title: "Innovation",
      description: "We stay ahead of trends and continuously improve our techniques and product offerings."
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-6">
                About MBeauty
              </h2>
              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                <p>
                  Founded with a passion for helping women feel confident and beautiful, 
                  MBeauty has become a trusted name in premium hair extensions. Our journey 
                  began five years ago with a simple mission: to provide high-quality, 
                  natural-looking hair extensions that enhance your unique beauty.
                </p>
                <p>
                  We believe that every woman deserves to feel amazing about her hair. 
                  That's why we've dedicated ourselves to sourcing the finest materials, 
                  perfecting our application techniques, and providing exceptional customer 
                  service that goes beyond expectations.
                </p>
                <p>
                  Today, we're proud to have helped over 10,000 women transform their look 
                  and boost their confidence with our premium hair extension services.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">10K+</div>
                <div className="text-gray-600">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gold-600 mb-2">5+</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">100%</div>
                <div className="text-gray-600">Human Hair</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gold-600 mb-2">4.9★</div>
                <div className="text-gray-600">Average Rating</div>
              </div>
            </div>
          </div>

          {/* Right Content - Image Placeholder */}
          <div className="relative">
            <div className="bg-gradient-to-br from-primary-100 to-gold-100 rounded-3xl p-8 shadow-2xl">
              <div className="aspect-square bg-gradient-to-br from-primary-200 to-gold-200 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-4xl">✨</span>
                  </div>
                  <p className="text-lg font-medium text-gray-700">Our Story</p>
                  <p className="text-sm text-gray-500">5 Years of Excellence</p>
                </div>
              </div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-lg">
              <Award className="w-8 h-8 text-gold-500" />
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-serif font-bold text-gray-900 mb-4">
              Our Values
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do and ensure you receive the best possible experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="bg-gradient-to-br from-primary-100 to-gold-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-10 h-10 text-primary-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">
                    {value.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
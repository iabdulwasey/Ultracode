import React from 'react';
import { CheckCircle, Award, Users, Clock } from 'lucide-react';

const About: React.FC = () => {
  const features = [
    "15+ Years of Professional Experience",
    "Certified Beauty Specialists",
    "Premium Quality Products",
    "Personalized Beauty Solutions",
    "Hygienic & Safe Environment",
    "Latest Beauty Techniques & Trends"
  ];

  const stats = [
    {
      icon: <Award className="h-8 w-8" />,
      number: "50+",
      text: "Awards Won"
    },
    {
      icon: <Users className="h-8 w-8" />,
      number: "10K+",
      text: "Happy Clients"
    },
    {
      icon: <Clock className="h-8 w-8" />,
      number: "15+",
      text: "Years Experience"
    }
  ];

  return (
    <section id="about" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About <span className="text-primary-600">Monu's Salon</span>
            </h2>
            
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Welcome to Monu's Salon, where beauty meets excellence. For over 15 years, 
              we have been dedicated to providing exceptional beauty and wellness services 
              that enhance your natural beauty and boost your confidence.
            </p>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Our team of certified professionals uses only the finest products and 
              latest techniques to deliver personalized beauty solutions. From hair 
              styling to skincare, we ensure every client leaves feeling beautiful 
              and confident.
            </p>

            {/* Features List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary-600 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2">
                    <div className="bg-primary-100 text-primary-600 p-3 rounded-full">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600">
                    {stat.text}
                  </div>
                </div>
              ))}
            </div>

            <button className="btn-primary">
              Learn More About Us
            </button>
          </div>

          {/* Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Hair Styling"
                  className="w-full h-48 object-cover rounded-2xl shadow-lg"
                />
                <img
                  src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Facial Treatment"
                  className="w-full h-64 object-cover rounded-2xl shadow-lg"
                />
              </div>
              <div className="space-y-4 mt-8">
                <img
                  src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Makeup Service"
                  className="w-full h-64 object-cover rounded-2xl shadow-lg"
                />
                <img
                  src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Spa Treatment"
                  className="w-full h-48 object-cover rounded-2xl shadow-lg"
                />
              </div>
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-8 -left-8 bg-primary-600 text-white p-6 rounded-2xl shadow-2xl">
              <div className="text-3xl font-bold mb-2">4.9★</div>
              <div className="text-sm opacity-90">Customer Rating</div>
              <div className="text-xs opacity-75 mt-1">Based on 1000+ reviews</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
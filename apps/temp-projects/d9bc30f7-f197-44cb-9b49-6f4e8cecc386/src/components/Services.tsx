import React from 'react';
import { Scissors, Palette, Sparkles, Clock, Shield, Heart } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: Scissors,
      title: 'Clip-In Extensions',
      description: 'Perfect for special occasions or daily wear. Easy to apply and remove.',
      price: 'From $150',
      features: ['100% Human Hair', 'Multiple Colors', 'Instant Length']
    },
    {
      icon: Sparkles,
      title: 'Tape-In Extensions',
      description: 'Semi-permanent solution lasting 6-8 weeks with proper care.',
      price: 'From $300',
      features: ['Natural Look', 'Long-lasting', 'Professional Application']
    },
    {
      icon: Heart,
      title: 'Sew-In Extensions',
      description: 'Most durable option, perfect for long-term hair transformation.',
      price: 'From $400',
      features: ['Maximum Security', '3-4 Month Wear', 'Full Volume']
    },
    {
      icon: Palette,
      title: 'Custom Color Match',
      description: 'Expert color matching to blend seamlessly with your natural hair.',
      price: 'From $50',
      features: ['Perfect Match', 'Professional Blending', 'Color Consultation']
    },
    {
      icon: Clock,
      title: 'Maintenance & Styling',
      description: 'Keep your extensions looking perfect with professional maintenance.',
      price: 'From $80',
      features: ['Extension Care', 'Restyling', 'Touch-ups']
    },
    {
      icon: Shield,
      title: 'Hair Care Consultation',
      description: 'Learn how to care for your extensions and maintain healthy hair.',
      price: 'Free',
      features: ['Care Instructions', 'Product Recommendations', 'Styling Tips']
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-gray-800 mb-4">
            Our Premium Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From clip-ins to permanent solutions, we offer a complete range of hair extension 
            services to help you achieve your dream hair.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-gold-500 rounded-full flex items-center justify-center mb-6">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
                
                <div className="text-2xl font-bold text-primary-600 mb-4">
                  {service.price}
                </div>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-primary-400 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-3 rounded-lg font-semibold hover:from-primary-600 hover:to-primary-700 transition-colors duration-300">
                  Learn More
                </button>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <button className="btn-primary">
            Book Your Consultation Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
import React from 'react';
import { Scissors, Palette, Sparkles, Heart, Clock, Shield } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: Scissors,
      title: "Clip-In Extensions",
      description: "Easy-to-use clip-in extensions for instant length and volume. Perfect for special occasions or daily wear.",
      price: "From $199",
      features: ["100% Human Hair", "Multiple Colors", "Easy Application", "Reusable"]
    },
    {
      icon: Palette,
      title: "Tape-In Extensions",
      description: "Semi-permanent tape-in extensions that lay flat against your head for a natural look.",
      price: "From $299",
      features: ["6-8 Week Wear", "Comfortable", "Natural Look", "Professional Install"]
    },
    {
      icon: Sparkles,
      title: "Keratin Bond Extensions",
      description: "Long-lasting keratin bond extensions for the most natural and secure attachment method.",
      price: "From $499",
      features: ["3-4 Month Wear", "Secure Bond", "Natural Movement", "Premium Quality"]
    },
    {
      icon: Heart,
      title: "Halo Extensions",
      description: "Wire-based halo extensions that sit comfortably on your head without clips or glue.",
      price: "From $149",
      features: ["No Damage", "Instant Volume", "Easy Removal", "Comfortable Wear"]
    },
    {
      icon: Clock,
      title: "Ponytail Extensions",
      description: "Instant ponytail extensions that wrap around your natural hair for added length and volume.",
      price: "From $89",
      features: ["Quick Application", "Secure Wrap", "Natural Blend", "Various Styles"]
    },
    {
      icon: Shield,
      title: "Custom Color Matching",
      description: "Professional color matching service to ensure perfect blend with your natural hair.",
      price: "Free Service",
      features: ["Expert Matching", "Multiple Tones", "Perfect Blend", "Color Consultation"]
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4">
            Our Premium Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our comprehensive range of hair extension services, each designed to enhance your natural beauty with premium quality materials and expert craftsmanship.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary-200 group"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="bg-gradient-to-br from-primary-100 to-gold-100 p-4 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-primary-600" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary-600">{service.price}</div>
                  </div>
                </div>

                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-6 bg-gradient-to-r from-primary-500 to-primary-600 text-white py-3 rounded-lg font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-300">
                  Learn More
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary-50 to-gold-50 rounded-2xl p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Not Sure Which Service Is Right for You?
            </h3>
            <p className="text-gray-600 mb-6">
              Book a free consultation with our hair extension experts to find the perfect solution for your needs.
            </p>
            <button className="btn-primary text-lg px-8 py-4">
              Book Free Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
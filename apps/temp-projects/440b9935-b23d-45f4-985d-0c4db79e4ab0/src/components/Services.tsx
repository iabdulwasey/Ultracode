import React from 'react';
import { Scissors, Palette, Sparkles, Clock } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: <Scissors className="h-8 w-8" />,
      title: "Clip-In Extensions",
      description: "Easy-to-use clip-in extensions for instant length and volume. Perfect for special occasions or daily wear.",
      price: "From $150",
      features: ["100% Human Hair", "Multiple Colors", "Easy Application", "Reusable"]
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: "Tape-In Extensions",
      description: "Semi-permanent extensions that blend seamlessly with your natural hair for a flawless look.",
      price: "From $300",
      features: ["6-8 Week Wear", "Natural Look", "Professional Application", "Damage-Free"]
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Keratin Bond",
      description: "Long-lasting extensions using keratin bonds for the most natural and secure attachment method.",
      price: "From $500",
      features: ["3-4 Month Wear", "Strongest Bond", "Invisible Attachment", "Swim & Exercise Safe"]
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Maintenance Service",
      description: "Professional maintenance and styling services to keep your extensions looking perfect.",
      price: "From $80",
      features: ["Cleaning & Styling", "Color Matching", "Repair Service", "Consultation"]
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-charcoal mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our range of premium hair extension services, each designed to enhance 
            your natural beauty with the highest quality materials and expert application.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-cream rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="text-rose-gold mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              
              <h3 className="text-xl font-semibold text-charcoal mb-3">
                {service.title}
              </h3>
              
              <p className="text-gray-600 mb-4 leading-relaxed">
                {service.description}
              </p>
              
              <div className="text-2xl font-bold text-rose-gold mb-4">
                {service.price}
              </div>
              
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-rose-gold rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button className="w-full mt-6 bg-rose-gold/10 hover:bg-rose-gold hover:text-white text-rose-gold font-semibold py-3 px-6 rounded-full transition-all duration-300">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
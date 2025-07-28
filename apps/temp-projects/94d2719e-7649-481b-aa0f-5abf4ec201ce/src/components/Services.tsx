import React from 'react';
import { Scissors, Palette, Sparkles, Heart, Crown, Zap } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: <Scissors className="h-12 w-12" />,
      title: "Hair Styling & Cuts",
      description: "Professional haircuts, styling, and treatments for all hair types. From classic cuts to trendy styles.",
      price: "Starting from ₹800",
      image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      icon: <Palette className="h-12 w-12" />,
      title: "Hair Coloring",
      description: "Expert hair coloring services including highlights, balayage, ombre, and full color transformations.",
      price: "Starting from ₹1,500",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      icon: <Sparkles className="h-12 w-12" />,
      title: "Facial Treatments",
      description: "Rejuvenating facial treatments for glowing, healthy skin. Customized for your skin type.",
      price: "Starting from ₹1,200",
      image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      icon: <Heart className="h-12 w-12" />,
      title: "Bridal Packages",
      description: "Complete bridal makeover packages for your special day. Hair, makeup, and beauty treatments.",
      price: "Starting from ₹8,000",
      image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      icon: <Crown className="h-12 w-12" />,
      title: "Makeup Services",
      description: "Professional makeup for all occasions. Party makeup, wedding makeup, and everyday looks.",
      price: "Starting from ₹2,000",
      image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      icon: <Zap className="h-12 w-12" />,
      title: "Spa & Wellness",
      description: "Relaxing spa treatments including massages, body treatments, and wellness therapies.",
      price: "Starting from ₹1,800",
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    }
  ];

  return (
    <section id="services" className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Premium Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our comprehensive range of beauty and wellness services, 
            designed to enhance your natural beauty and boost your confidence.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              {/* Service Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute top-4 left-4 bg-primary-600 text-white p-3 rounded-full">
                  {service.icon}
                </div>
              </div>

              {/* Service Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {service.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-primary-600">
                    {service.price}
                  </span>
                  <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-full font-medium transition-colors duration-200">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Not Sure Which Service is Right for You?
            </h3>
            <p className="text-xl mb-6 opacity-90">
              Book a free consultation with our beauty experts
            </p>
            <button className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-full transition-colors duration-200">
              Schedule Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
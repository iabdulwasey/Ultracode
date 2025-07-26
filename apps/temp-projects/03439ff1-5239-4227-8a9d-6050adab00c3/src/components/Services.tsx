import React from 'react';
import { Truck, Shield, Clock, HeartHandshake, Package, Phone } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "Free delivery on orders over $50 worldwide",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Shield,
      title: "Quality Guarantee",
      description: "100% satisfaction guarantee or your money back",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Clock,
      title: "Fast Delivery",
      description: "Express shipping available with 24-48 hour delivery",
      color: "from-purple-500 to-violet-500"
    },
    {
      icon: HeartHandshake,
      title: "Expert Support",
      description: "Professional culinary advice from our spice experts",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: Package,
      title: "Bulk Orders",
      description: "Special pricing for restaurants and bulk purchases",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Phone,
      title: "24/7 Support",
      description: "Round-the-clock customer service for all your needs",
      color: "from-indigo-500 to-blue-500"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose Yum Spices?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're committed to providing exceptional service and premium products that exceed your expectations
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
              <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon size={28} className="text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {service.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-spice-600 to-paprika-600 rounded-3xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">
            Ready to Elevate Your Cooking?
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers who trust Yum Spices for their culinary adventures
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-spice-600 font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-colors">
              Browse Products
            </button>
            <button className="border-2 border-white text-white font-bold py-4 px-8 rounded-lg hover:bg-white hover:text-spice-600 transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
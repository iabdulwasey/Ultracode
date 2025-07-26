import React from 'react';
import { Globe, Award, Users, Leaf } from 'lucide-react';

const About: React.FC = () => {
  const stats = [
    {
      icon: Globe,
      number: "50+",
      label: "Countries Sourced",
      description: "We source our spices from the finest regions worldwide"
    },
    {
      icon: Award,
      number: "25+",
      label: "Years Experience",
      description: "Quarter century of expertise in spice trading"
    },
    {
      icon: Users,
      number: "100K+",
      label: "Happy Customers",
      description: "Trusted by home cooks and professional chefs"
    },
    {
      icon: Leaf,
      number: "100%",
      label: "Natural & Pure",
      description: "No artificial additives or preservatives"
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Bringing the World's Finest Spices to Your Kitchen
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Since 1998, Yum Spices has been on a mission to source the highest quality spices from around the globe. We work directly with farmers and cooperatives to ensure fair trade practices while delivering exceptional flavors to your table.
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-spice-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Globe size={18} className="text-spice-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Global Sourcing</h3>
                  <p className="text-gray-600">Direct partnerships with spice farmers worldwide ensure authenticity and quality.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-spice-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Leaf size={18} className="text-spice-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Sustainable Practices</h3>
                  <p className="text-gray-600">Committed to environmental responsibility and supporting local communities.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-spice-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Award size={18} className="text-spice-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Quality Assurance</h3>
                  <p className="text-gray-600">Rigorous testing and quality control ensure every product meets our high standards.</p>
                </div>
              </div>
            </div>

            <button className="btn-primary">
              Learn More About Us
            </button>
          </div>

          {/* Stats */}
          <div>
            <div className="bg-gradient-to-br from-spice-50 to-paprika-50 rounded-3xl p-8">
              <div className="grid grid-cols-2 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-4">
                      <stat.icon size={28} className="text-spice-600" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-lg font-semibold text-spice-600 mb-2">
                      {stat.label}
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {stat.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mission Statement */}
            <div className="mt-8 bg-spice-600 text-white rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-3">Our Mission</h3>
              <p className="leading-relaxed">
                "To connect cultures through the universal language of flavor, bringing authentic spices from family farms to family kitchens around the world."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
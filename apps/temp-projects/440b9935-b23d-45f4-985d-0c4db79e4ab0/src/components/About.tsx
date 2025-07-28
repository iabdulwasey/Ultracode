import React from 'react';
import { Heart, Shield, Award, Users } from 'lucide-react';

const About: React.FC = () => {
  const values = [
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Passion",
      description: "We're passionate about helping you look and feel your absolute best."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Quality",
      description: "Only the finest materials and proven techniques make it into our salon."
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Excellence",
      description: "We strive for perfection in every service we provide."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Community",
      description: "Building lasting relationships with our clients is our priority."
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-cream to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-charcoal mb-6">
                About MBeauty
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Founded with a vision to revolutionize the hair extension industry, MBeauty 
                has been transforming lives through premium hair solutions for over three years. 
                Our commitment to quality and customer satisfaction has made us a trusted name 
                in beauty enhancement.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We believe that every woman deserves to feel confident and beautiful. That's why 
                we source only the finest human hair and employ the most advanced application 
                techniques to ensure natural-looking, long-lasting results.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {values.map((value, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="text-rose-gold">
                      {value.icon}
                    </div>
                    <h3 className="font-semibold text-charcoal">
                      {value.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>

            <button className="btn-primary">
              Learn More About Us
            </button>
          </div>

          {/* Right Content */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                  alt="Hair styling process"
                  className="rounded-2xl shadow-lg w-full h-48 object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                  alt="Beautiful hair result"
                  className="rounded-2xl shadow-lg w-full h-64 object-cover"
                />
              </div>
              <div className="space-y-4 pt-8">
                <img
                  src="https://images.unsplash.com/photo-1605497788044-5a32c7078486?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                  alt="Hair extension application"
                  className="rounded-2xl shadow-lg w-full h-64 object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                  alt="Salon environment"
                  className="rounded-2xl shadow-lg w-full h-48 object-cover"
                />
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-rose-gold/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-deep-rose/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
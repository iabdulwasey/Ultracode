import React from 'react';
import { Wifi, Car, Utensils, Shield, Microscope, Palette, Music, Trophy } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: Microscope,
      title: 'Modern Science Labs',
      description: 'State-of-the-art laboratories for chemistry, biology, and physics experiments.'
    },
    {
      icon: Wifi,
      title: 'Smart Classrooms',
      description: 'Technology-integrated learning environments with interactive whiteboards.'
    },
    {
      icon: Palette,
      title: 'Arts & Creativity',
      description: 'Dedicated spaces for visual arts, drama, and creative expression.'
    },
    {
      icon: Trophy,
      title: 'Sports Facilities',
      description: 'Professional-grade gymnasium, outdoor fields, and sports equipment.'
    },
    {
      icon: Utensils,
      title: 'Healthy Cafeteria',
      description: 'Nutritious meals prepared fresh daily with organic ingredients.'
    },
    {
      icon: Car,
      title: 'Safe Transportation',
      description: 'Reliable school bus service with GPS tracking and safety protocols.'
    },
    {
      icon: Music,
      title: 'Music Program',
      description: 'Comprehensive music education with instruments and performance opportunities.'
    },
    {
      icon: Shield,
      title: 'Security & Safety',
      description: '24/7 security monitoring and comprehensive safety protocols.'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            World-Class Facilities
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our campus is equipped with modern facilities and resources to support every aspect of student development.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group p-6 rounded-xl border border-gray-200 hover:border-primary-200 hover:shadow-lg transition-all duration-300">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 group-hover:bg-primary-600 text-primary-600 group-hover:text-white rounded-lg mb-4 transition-colors duration-300">
                <feature.icon className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h4>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">A Campus Designed for Learning</h3>
            <p className="text-gray-600 mb-6">
              Our 15-acre campus features modern architecture designed to inspire learning and creativity. 
              From our state-of-the-art science laboratories to our expansive library and multimedia center, 
              every space is thoughtfully designed to enhance the educational experience.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                <span className="text-gray-700">15-acre campus with green spaces</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                <span className="text-gray-700">40+ modern classrooms</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                <span className="text-gray-700">10,000+ book library</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                <span className="text-gray-700">Olympic-size swimming pool</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
              alt="Library"
              className="rounded-lg shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1581726690015-c9861c2718bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
              alt="Classroom"
              className="rounded-lg shadow-lg mt-8"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
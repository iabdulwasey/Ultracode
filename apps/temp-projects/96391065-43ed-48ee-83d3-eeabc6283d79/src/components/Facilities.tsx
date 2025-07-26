import React from 'react';
import { Building, Microscope, Computer, Dumbbell, BookOpen, Palette, Music, Utensils } from 'lucide-react';

const Facilities: React.FC = () => {
  const facilities = [
    {
      icon: Building,
      title: 'Modern Classrooms',
      description: 'State-of-the-art classrooms equipped with interactive whiteboards and modern technology.',
      image: 'classroom'
    },
    {
      icon: Microscope,
      title: 'Science Laboratories',
      description: 'Fully equipped biology, chemistry, and physics labs for hands-on learning.',
      image: 'lab'
    },
    {
      icon: Computer,
      title: 'Computer Labs',
      description: 'Advanced computer labs with latest software for programming and digital design.',
      image: 'computer'
    },
    {
      icon: BookOpen,
      title: 'Library & Media Center',
      description: 'Comprehensive library with digital resources and quiet study spaces.',
      image: 'library'
    },
    {
      icon: Dumbbell,
      title: 'Athletic Facilities',
      description: 'Full gymnasium, fitness center, and outdoor sports fields.',
      image: 'gym'
    },
    {
      icon: Palette,
      title: 'Art Studios',
      description: 'Dedicated spaces for visual arts, ceramics, and digital media creation.',
      image: 'art'
    },
    {
      icon: Music,
      title: 'Music Rooms',
      description: 'Sound-proof practice rooms and performance spaces for all musical activities.',
      image: 'music'
    },
    {
      icon: Utensils,
      title: 'Cafeteria',
      description: 'Modern dining facility serving healthy, nutritious meals daily.',
      image: 'cafeteria'
    }
  ];

  return (
    <section id="facilities" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            World-Class Facilities
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our campus features modern facilities designed to support every aspect 
            of student learning and development.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {facilities.map((facility, index) => (
            <div key={index} className="group">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 h-full hover:shadow-lg transition-shadow duration-300">
                {/* Icon */}
                <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-4 group-hover:bg-primary-200 transition-colors duration-300">
                  <facility.icon className="h-6 w-6 text-primary-600" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{facility.title}</h3>
                <p className="text-gray-600 leading-relaxed">{facility.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Campus Highlights */}
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-white">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Campus Highlights</h3>
            <p className="text-white/90 max-w-2xl mx-auto">
              Our 50-acre campus provides a safe, inspiring environment for learning and growth.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">50</div>
              <div className="text-white/80">Acres</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">30</div>
              <div className="text-white/80">Classrooms</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">5</div>
              <div className="text-white/80">Science Labs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-white/80">Security</div>
            </div>
          </div>
        </div>

        {/* Technology Integration */}
        <div className="mt-16 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Technology Integration</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              At Greenwood Academy, we believe technology enhances learning when integrated 
              thoughtfully into the curriculum. Our facilities are equipped with the latest 
              educational technology to prepare students for the digital age.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3"></div>
                <div>
                  <div className="font-semibold text-gray-900">1:1 Device Program</div>
                  <div className="text-gray-600">Every student has access to a personal device for learning</div>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3"></div>
                <div>
                  <div className="font-semibold text-gray-900">High-Speed Internet</div>
                  <div className="text-gray-600">Campus-wide fiber optic network for seamless connectivity</div>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3"></div>
                <div>
                  <div className="font-semibold text-gray-900">Smart Classrooms</div>
                  <div className="text-gray-600">Interactive displays and collaborative learning tools</div>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3"></div>
                <div>
                  <div className="font-semibold text-gray-900">Digital Learning Platform</div>
                  <div className="text-gray-600">Online resources and assignment management system</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-secondary-50 to-primary-50 rounded-xl p-8">
            <h4 className="text-xl font-semibold text-gray-900 mb-6">Sustainability Features</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-secondary-600 mb-1">100%</div>
                <div className="text-sm text-gray-600">LED Lighting</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-secondary-600 mb-1">Solar</div>
                <div className="text-sm text-gray-600">Power System</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-secondary-600 mb-1">LEED</div>
                <div className="text-sm text-gray-600">Certified</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-secondary-600 mb-1">Green</div>
                <div className="text-sm text-gray-600">Campus</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Facilities;
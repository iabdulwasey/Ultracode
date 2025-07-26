import React from 'react';
import { Target, Heart, Lightbulb, Globe } from 'lucide-react';

const About: React.FC = () => {
  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for the highest standards in everything we do, from academics to character development.'
    },
    {
      icon: Heart,
      title: 'Compassion',
      description: 'We foster a caring community where every student feels valued, supported, and understood.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We embrace new ideas and technologies to enhance learning and prepare students for the future.'
    },
    {
      icon: Globe,
      title: 'Global Citizenship',
      description: 'We develop responsible citizens who understand their role in our interconnected world.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            About Greenwood Academy
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Founded in 1998, Greenwood Academy has been dedicated to providing exceptional 
            education that nurtures the whole child and prepares students for lifelong success.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Content */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              At Greenwood Academy, our mission is to provide a nurturing and challenging 
              educational environment that empowers students to reach their full potential. 
              We believe in developing not just academic excellence, but also character, 
              creativity, and critical thinking skills.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Our dedicated faculty and staff work together to create a supportive community 
              where every student can thrive. We prepare our graduates to be confident, 
              compassionate, and capable leaders in their chosen fields.
            </p>
            
            <div className="bg-primary-50 p-6 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Our Vision</h4>
              <p className="text-gray-700">
                To be recognized as a leading educational institution that inspires students 
                to become lifelong learners and positive contributors to society.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-6 rounded-xl text-white">
              <div className="text-3xl font-bold mb-2">98%</div>
              <div className="text-primary-100">College Acceptance Rate</div>
            </div>
            <div className="bg-gradient-to-br from-secondary-500 to-secondary-600 p-6 rounded-xl text-white">
              <div className="text-3xl font-bold mb-2">15:1</div>
              <div className="text-secondary-100">Student-Teacher Ratio</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl text-white">
              <div className="text-3xl font-bold mb-2">25+</div>
              <div className="text-purple-100">Extracurricular Activities</div>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-xl text-white">
              <div className="text-3xl font-bold mb-2">$2M+</div>
              <div className="text-orange-100">Scholarships Awarded</div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">Our Core Values</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h4>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
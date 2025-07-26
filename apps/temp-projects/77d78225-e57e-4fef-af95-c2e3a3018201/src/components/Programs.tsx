import React from 'react';
import { Clock, Users, BookOpen, Star } from 'lucide-react';

const Programs: React.FC = () => {
  const programs = [
    {
      title: 'Elementary Program',
      age: 'Ages 5-11',
      description: 'Building strong foundations in core subjects with hands-on learning experiences.',
      features: ['Small class sizes', 'STEM focus', 'Arts integration', 'Character development'],
      image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Middle School Program',
      age: 'Ages 12-14',
      description: 'Preparing students for high school with advanced coursework and leadership opportunities.',
      features: ['Advanced academics', 'Leadership training', 'Technology integration', 'Sports programs'],
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'High School Program',
      age: 'Ages 15-18',
      description: 'College preparatory curriculum with AP courses and career guidance.',
      features: ['AP courses', 'College counseling', 'Internship programs', 'Scholarship opportunities'],
      image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <section id="programs" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Programs
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive educational programs designed to meet the unique needs of students at every stage of their academic journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {program.age}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{program.title}</h3>
                <p className="text-gray-600 mb-4">{program.description}</p>
                <ul className="space-y-2 mb-6">
                  {program.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <Star className="h-4 w-4 text-secondary-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full btn-primary">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-primary-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Ready to Join Our Community?</h3>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            Schedule a campus tour and discover why Brightwood Academy is the right choice for your child's education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
              Schedule Tour
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
              Download Brochure
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Programs;
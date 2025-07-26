import React from 'react';
import { Award, Users, BookOpen, Heart } from 'lucide-react';

const About: React.FC = () => {
  const values = [
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for the highest standards in education and personal development.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building strong relationships between students, families, and educators.'
    },
    {
      icon: BookOpen,
      title: 'Innovation',
      description: 'Embracing modern teaching methods and educational technology.'
    },
    {
      icon: Heart,
      title: 'Care',
      description: 'Providing a nurturing environment where every student feels valued.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            About Brightwood Academy
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            For over three decades, we've been committed to providing exceptional education 
            that prepares students for success in an ever-changing world.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img
              src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="School building"
              className="rounded-2xl shadow-lg"
            />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Story</h3>
            <p className="text-gray-600 mb-6">
              Founded in 1985, Brightwood Academy began as a small community school with a big vision: 
              to create an educational environment where every child could thrive. Today, we're proud to 
              be one of the region's leading educational institutions.
            </p>
            <p className="text-gray-600 mb-6">
              Our state-of-the-art facilities, combined with our experienced faculty and innovative 
              curriculum, provide students with the tools they need to succeed academically, socially, 
              and personally.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex -space-x-2">
                <img className="w-10 h-10 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                <img className="w-10 h-10 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1494790108755-2616b612b1e5?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                <img className="w-10 h-10 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
              </div>
              <span className="text-sm text-gray-600">Trusted by thousands of families</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="text-center p-6 rounded-xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                <value.icon className="h-8 w-8" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h4>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
import React from 'react';
import { Clock, DollarSign, Eye, Shield, Home, Users } from 'lucide-react';

const Benefits: React.FC = () => {
  const benefits = [
    {
      icon: Eye,
      title: 'Virtually Invisible',
      description: 'Clear aligners are nearly invisible, so you can smile confidently throughout your treatment without anyone noticing.',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Clock,
      title: 'Faster Results',
      description: 'See results in as little as 2-3 months, with complete treatment typically finished in 4-6 months.',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: DollarSign,
      title: '70% More Affordable',
      description: 'Save thousands compared to traditional braces while getting the same professional-grade results.',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: Home,
      title: 'Convenient At-Home',
      description: 'No frequent office visits required. Monitor your progress remotely with our mobile app and expert support.',
      color: 'bg-orange-100 text-orange-600'
    },
    {
      icon: Shield,
      title: 'Safe & FDA Approved',
      description: 'Our aligners are made from medical-grade materials and approved by the FDA for safety and effectiveness.',
      color: 'bg-red-100 text-red-600'
    },
    {
      icon: Users,
      title: 'Expert Orthodontist Care',
      description: 'Every case is overseen by licensed orthodontists with years of experience in teeth straightening.',
      color: 'bg-teal-100 text-teal-600'
    }
  ];

  return (
    <section id="benefits" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose SmileAlign?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the advantages of modern teeth straightening technology 
            with professional care and unmatched convenience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div key={index} className="group hover:transform hover:-translate-y-2 transition-all duration-300">
                <div className="bg-gray-50 rounded-2xl p-8 h-full hover:shadow-xl transition-shadow">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-xl ${benefit.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <IconComponent size={32} />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparison Section */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">
            SmileAlign vs Traditional Braces
          </h3>
          
          <div className="bg-gray-50 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-primary-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Feature</th>
                    <th className="px-6 py-4 text-center font-semibold">SmileAlign</th>
                    <th className="px-6 py-4 text-center font-semibold">Traditional Braces</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    ['Visibility', 'Nearly Invisible', 'Highly Visible'],
                    ['Treatment Time', '4-6 months', '18-24 months'],
                    ['Office Visits', 'Minimal', 'Monthly Required'],
                    ['Food Restrictions', 'None', 'Many Restrictions'],
                    ['Oral Hygiene', 'Easy', 'Difficult'],
                    ['Cost', '$1,500-$3,000', '$3,000-$7,000'],
                    ['Comfort', 'Comfortable', 'Often Painful'],
                    ['Removable', 'Yes', 'No']
                  ].map(([feature, smileAlign, braces], index) => (
                    <tr key={index} className="bg-white hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">{feature}</td>
                      <td className="px-6 py-4 text-center text-green-600 font-semibold">{smileAlign}</td>
                      <td className="px-6 py-4 text-center text-gray-600">{braces}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
import React from 'react';
import { Heart, Brain, Clock, Users, DollarSign, Smile } from 'lucide-react';
import { FaLungs } from 'react-icons/fa';
import { MdHealthAndSafety } from 'react-icons/md';

const Benefits: React.FC = () => {
  const benefits = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Improved Heart Health",
      description: "Reduce your risk of heart disease and stroke by quitting smoking with Nicotex."
    },
    {
      icon: <FaLungs className="h-8 w-8" />,
      title: "Better Breathing",
      description: "Experience improved lung function and easier breathing within weeks."
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "Reduced Cravings",
      description: "Nicotine replacement therapy helps manage withdrawal symptoms effectively."
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Fast Results",
      description: "Feel the benefits within 20 minutes as your body begins to heal."
    },
    {
      icon: <DollarSign className="h-8 w-8" />,
      title: "Save Money",
      description: "Stop spending thousands on cigarettes. Invest in your health instead."
    },
    {
      icon: <Smile className="h-8 w-8" />,
      title: "Better Quality of Life",
      description: "Enjoy improved taste, smell, and overall well-being."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Protect Your Family",
      description: "Eliminate secondhand smoke and be a positive role model."
    },
    {
      icon: <MdHealthAndSafety className="h-8 w-8" />,
      title: "Proven Safety",
      description: "FDA-approved nicotine replacement therapy with established safety profile."
    }
  ];

  return (
    <section id="benefits" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose Nicotex?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the life-changing benefits of quitting smoking with our medically proven 
            nicotine replacement therapy.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-nicotex-600 mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Statistics */}
        <div className="mt-20 bg-white rounded-2xl p-8 shadow-lg">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-nicotex-600 mb-2">2x</div>
              <div className="text-gray-600">Higher Success Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-nicotex-600 mb-2">20min</div>
              <div className="text-gray-600">First Health Benefits</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-nicotex-600 mb-2">1 Year</div>
              <div className="text-gray-600">50% Less Heart Risk</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-nicotex-600 mb-2">$3000+</div>
              <div className="text-gray-600">Average Annual Savings</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
import React from 'react';
import { Clock, Zap, CheckCircle, TrendingDown } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: 1,
      icon: <Clock className="h-8 w-8" />,
      title: 'Choose Your Quit Date',
      description: 'Set a quit date within the next 2 weeks and prepare mentally for your journey.',
      tip: 'Pick a day with less stress, like a weekend or holiday.'
    },
    {
      step: 2,
      icon: <Zap className="h-8 w-8" />,
      title: 'Start Nicotex Gum',
      description: 'Begin using Nicotex gum on your quit date. Chew when you feel cravings.',
      tip: 'Use the "chew and park" method for best results.'
    },
    {
      step: 3,
      icon: <TrendingDown className="h-8 w-8" />,
      title: 'Gradually Reduce',
      description: 'Over 12 weeks, slowly reduce the number of gums you use each day.',
      tip: 'Follow the step-down program for successful withdrawal.'
    },
    {
      step: 4,
      icon: <CheckCircle className="h-8 w-8" />,
      title: 'Smoke-Free Success',
      description: 'Complete the program and enjoy your new smoke-free life with confidence.',
      tip: 'Celebrate your milestones and stay motivated!'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            How Nicotex Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our proven 4-step process helps you quit smoking gradually and comfortably, 
            reducing withdrawal symptoms and doubling your chances of success.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gray-200 z-0">
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-gray-200 rounded-full"></div>
                </div>
              )}
              
              <div className="relative z-10 text-center">
                <div className="bg-green-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                  <div className="text-green-600">
                    {step.icon}
                  </div>
                </div>
                <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 -mt-16 relative z-20">
                  <span className="font-bold">{step.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {step.description}
                </p>
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-sm text-blue-700 font-medium">
                    💡 {step.tip}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Chew and Park Method */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              The "Chew and Park" Method
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🦷</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Chew Slowly</h4>
                <p className="text-sm text-gray-600">
                  Chew the gum slowly until you taste the nicotine or feel a slight tingling
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⏸️</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Park It</h4>
                <p className="text-sm text-gray-600">
                  Stop chewing and park the gum between your cheek and gum
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔄</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Repeat</h4>
                <p className="text-sm text-gray-600">
                  When the taste fades, chew again slowly and repeat the process
                </p>
              </div>
            </div>
            
            <div className="text-center mt-6">
              <p className="text-gray-600">
                <strong>Duration:</strong> Each piece should be used for about 30 minutes
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
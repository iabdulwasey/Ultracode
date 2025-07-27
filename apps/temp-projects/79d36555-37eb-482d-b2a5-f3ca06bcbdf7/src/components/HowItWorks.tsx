import React from 'react';
import { Clock, Target, TrendingUp, Award } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: 1,
      icon: <Target className="h-8 w-8" />,
      title: 'Choose Your Strength',
      description: 'Select 2mg for light smokers or 4mg for heavy smokers based on your daily cigarette consumption.',
      timeline: 'Day 1'
    },
    {
      step: 2,
      icon: <Clock className="h-8 w-8" />,
      title: 'Follow the Program',
      description: 'Chew one piece when you feel the urge to smoke. Use proper chewing technique for best results.',
      timeline: 'Weeks 1-6'
    },
    {
      step: 3,
      icon: <TrendingUp className="h-8 w-8" />,
      title: 'Gradually Reduce',
      description: 'Slowly decrease the number of gums per day as your cravings diminish and confidence grows.',
      timeline: 'Weeks 7-12'
    },
    {
      step: 4,
      icon: <Award className="h-8 w-8" />,
      title: 'Achieve Freedom',
      description: 'Complete the program and enjoy your new smoke-free life with improved health and savings.',
      timeline: 'Success!'
    }
  ];

  const chewingSteps = [
    'Chew slowly until you taste the nicotine (peppery taste)',
    'Park the gum between your cheek and gum',
    'When the taste fades, chew again',
    'Repeat for 30 minutes, then dispose'
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How Nicotex Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our proven 4-step program helps you quit smoking gradually and safely 
            with medical-grade nicotine replacement therapy.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-24 left-1/2 transform -translate-x-1/2 w-full max-w-4xl">
            <div className="h-1 bg-gradient-to-r from-nicotex-600 via-nicotex-500 to-green-500 rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step Number */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-nicotex-600 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg relative z-10">
                    {step.step}
                  </div>
                </div>

                {/* Card */}
                <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                  <div className="text-nicotex-600 flex justify-center mb-4">
                    {step.icon}
                  </div>
                  <div className="text-sm font-semibold text-nicotex-600 mb-2">
                    {step.timeline}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Proper Chewing Technique */}
        <div className="mt-20 bg-white rounded-2xl p-8 shadow-lg">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Proper Chewing Technique
              </h3>
              <p className="text-gray-600 mb-8">
                For maximum effectiveness, it's important to use the correct chewing technique. 
                This ensures optimal nicotine absorption and craving relief.
              </p>
              
              <div className="space-y-4">
                {chewingSteps.map((step, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-8 h-8 bg-nicotex-100 text-nicotex-600 rounded-full flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0 mt-1">
                      {index + 1}
                    </div>
                    <p className="text-gray-700">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-nicotex-400 to-nicotex-600 rounded-2xl p-8 text-white shadow-xl">
                <div className="text-6xl mb-4">🦷</div>
                <h4 className="text-2xl font-bold mb-4">Chew & Park Method</h4>
                <p className="text-nicotex-100">
                  The key to success is the "chew and park" technique that maximizes 
                  nicotine absorption through your mouth's lining.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Your Journey to Freedom
          </h3>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <div className="text-4xl mb-4">🚭</div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Week 1-2</h4>
                <p className="text-gray-600">Initial adjustment period. Use gum whenever you feel cravings.</p>
              </div>
              <div className="p-6">
                <div className="text-4xl mb-4">💪</div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Week 3-8</h4>
                <p className="text-gray-600">Cravings decrease. Begin reducing daily gum usage gradually.</p>
              </div>
              <div className="p-6">
                <div className="text-4xl mb-4">🎉</div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Week 9-12</h4>
                <p className="text-gray-600">Final phase. Complete independence from both cigarettes and gum.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
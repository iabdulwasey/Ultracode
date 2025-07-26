import React from 'react';
import { Camera, Package, Smile, MessageCircle } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: Camera,
      title: 'Take Photos & Impressions',
      description: 'Use our at-home impression kit or visit a partner clinic for 3D scanning. Our team reviews your case within 24 hours.',
      duration: 'Day 1-3'
    },
    {
      icon: MessageCircle,
      title: 'Get Your Treatment Plan',
      description: 'Our orthodontists create a personalized treatment plan with 3D preview of your new smile and timeline.',
      duration: 'Day 4-7'
    },
    {
      icon: Package,
      title: 'Receive Your Aligners',
      description: 'Your custom aligners are manufactured and shipped directly to your door with detailed instructions.',
      duration: 'Day 14-21'
    },
    {
      icon: Smile,
      title: 'Transform Your Smile',
      description: 'Wear aligners 20-22 hours daily, switching every 1-2 weeks. Regular check-ins ensure perfect progress.',
      duration: '4-6 months'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How SmileAlign Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our streamlined process makes getting straighter teeth simple, convenient, 
            and affordable. Here's your journey to a perfect smile.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="relative">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-primary-200 z-0" 
                       style={{ width: 'calc(100% - 2rem)' }}>
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                      <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
                    </div>
                  </div>
                )}
                
                <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow relative z-10">
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 bg-primary-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  
                  {/* Icon */}
                  <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                    <IconComponent className="text-primary-600" size={32} />
                  </div>
                  
                  {/* Duration Badge */}
                  <div className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
                    {step.duration}
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">24/7</div>
              <div className="text-gray-900 font-semibold mb-1">Expert Support</div>
              <div className="text-gray-600 text-sm">Our team is always available to help</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">95%</div>
              <div className="text-gray-900 font-semibold mb-1">Success Rate</div>
              <div className="text-gray-600 text-sm">Patients achieve their desired results</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">30-Day</div>
              <div className="text-gray-900 font-semibold mb-1">Money Back</div>
              <div className="text-gray-600 text-sm">Guarantee on your first aligner set</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
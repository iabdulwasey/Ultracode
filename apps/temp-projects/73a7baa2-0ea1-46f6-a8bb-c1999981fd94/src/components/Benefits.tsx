import React from 'react';
import { Heart, Shield, Zap, Users, CheckCircle, Clock } from 'lucide-react';
import { FaLungs, FaBrain } from 'react-icons/fa';
import { MdHealthAndSafety } from 'react-icons/md';

const Benefits: React.FC = () => {
  const benefits = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: 'Improved Heart Health',
      description: 'Reduce your risk of heart disease and stroke by quitting smoking with Nicotex.',
      stat: '50% lower risk within 1 year'
    },
    {
      icon: <FaLungs className="h-8 w-8" />,
      title: 'Better Lung Function',
      description: 'Experience improved breathing and reduced coughing as your lungs heal.',
      stat: 'Lung function improves in 2-12 weeks'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Reduced Cancer Risk',
      description: 'Significantly lower your risk of lung, throat, and other cancers.',
      stat: '50% lower lung cancer risk in 10 years'
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'More Energy',
      description: 'Feel more energetic and active as your circulation improves.',
      stat: 'Energy levels increase within days'
    },
    {
      icon: <MdHealthAndSafety className="h-8 w-8" />,
      title: 'Better Immunity',
      description: 'Strengthen your immune system and get sick less often.',
      stat: 'Immune function improves rapidly'
    },
    {
      icon: <FaBrain className="h-8 w-8" />,
      title: 'Mental Clarity',
      description: 'Experience improved focus and reduced anxiety over time.',
      stat: 'Mental health improves significantly'
    }
  ];

  return (
    <section id="benefits" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Why Quit Smoking with Nicotex?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the life-changing benefits of quitting smoking and how Nicotex can help you achieve them faster and more comfortably.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="text-green-600 mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {benefit.description}
              </p>
              <div className="text-sm font-semibold text-green-600">
                {benefit.stat}
              </div>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Your Body's Recovery Timeline
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">20 Minutes</h4>
              <p className="text-sm text-gray-600">Heart rate and blood pressure drop</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">12 Hours</h4>
              <p className="text-sm text-gray-600">Carbon monoxide levels normalize</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FaLungs className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">2-12 Weeks</h4>
              <p className="text-sm text-gray-600">Circulation improves, lung function increases</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">1 Year</h4>
              <p className="text-sm text-gray-600">Heart disease risk cut in half</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
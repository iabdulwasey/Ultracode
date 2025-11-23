import React, { useState } from 'react';
import { CheckCircle, Clock, Users, Award } from 'lucide-react';

const QuitPlan = () => {
  const [selectedPlan, setSelectedPlan] = useState('30-day');

  const plans = [
    {
      id: '7-day',
      name: '7-Day Kickstart',
      duration: '1 Week',
      price: '$29',
      description: 'Perfect for immediate relief and motivation',
      features: [
        'Emergency craving kit',
        'Daily motivation messages',
        'Quick detox herbs',
        '24/7 support chat'
      ]
    },
    {
      id: '30-day',
      name: '30-Day Transform',
      duration: '1 Month',
      price: '$79',
      popular: true,
      description: 'Our most popular comprehensive program',
      features: [
        'Complete herbal supplement kit',
        'Personalized quit plan',
        'Weekly coaching calls',
        'Habit replacement guide',
        'Progress tracking app',
        'Money-back guarantee'
      ]
    },
    {
      id: '90-day',
      name: '90-Day Mastery',
      duration: '3 Months',
      price: '$199',
      description: 'Ultimate program for lasting transformation',
      features: [
        'Everything in 30-day plan',
        'Advanced herbal formulas',
        'One-on-one coaching',
        'Relapse prevention toolkit',
        'Lifetime community access',
        'Health improvement tracking'
      ]
    }
  ];

  return (
    <section id="quit-plan" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Path to Freedom
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select the program that fits your needs and commitment level. 
            All plans include our proven natural methods and ongoing support.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl p-8 border-2 transition-all duration-200 cursor-pointer ${
                selectedPlan === plan.id
                  ? 'border-blue-500 bg-blue-50 shadow-lg scale-105'
                  : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
              } ${plan.popular ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold text-blue-600 mb-2">{plan.price}</div>
                <p className="text-gray-600">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-200 ${
                selectedPlan === plan.id
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}>
                {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="bg-green-600 text-white px-12 py-4 rounded-lg text-xl font-semibold hover:bg-green-700 transition-colors duration-200 shadow-lg">
            Start My Quit Journey Now
          </button>
          <p className="text-gray-600 mt-4">
            30-day money-back guarantee • Secure payment • Start immediately
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-gray-200">
          <div className="text-center">
            <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <div className="text-2xl font-bold text-gray-900">15,000+</div>
            <div className="text-gray-600">Success Stories</div>
          </div>
          <div className="text-center">
            <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <div className="text-2xl font-bold text-gray-900">94%</div>
            <div className="text-gray-600">Success Rate</div>
          </div>
          <div className="text-center">
            <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <div className="text-2xl font-bold text-gray-900">21 Days</div>
            <div className="text-gray-600">Average Quit Time</div>
          </div>
          <div className="text-center">
            <CheckCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <div className="text-2xl font-bold text-gray-900">100%</div>
            <div className="text-gray-600">Natural Methods</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuitPlan;
import React, { useState } from 'react';
import { Check, X, Star, CreditCard, Calendar } from 'lucide-react';

const Pricing: React.FC = () => {
  const [paymentType, setPaymentType] = useState<'full' | 'monthly'>('monthly');

  const plans = [
    {
      name: 'SmileAlign Lite',
      description: 'Perfect for minor corrections',
      duration: '2-4 months',
      aligners: '6-12 aligners',
      fullPrice: 1495,
      monthlyPrice: 89,
      popular: false,
      features: [
        'Minor teeth straightening',
        'Remote monitoring',
        'Customer support',
        'Retainer included',
        'Progress tracking app'
      ],
      notIncluded: [
        'In-person consultations',
        'Complex bite correction'
      ]
    },
    {
      name: 'SmileAlign Complete',
      description: 'Most comprehensive treatment',
      duration: '4-6 months',
      aligners: '12-24 aligners',
      fullPrice: 2495,
      monthlyPrice: 149,
      popular: true,
      features: [
        'Complete teeth straightening',
        'Orthodontist monitoring',
        'Priority support',
        'Retainer included',
        'Progress tracking app',
        'Refinement aligners',
        'WhiteningKit included'
      ],
      notIncluded: []
    },
    {
      name: 'SmileAlign Premium',
      description: 'For complex cases with expert care',
      duration: '6-8 months',
      aligners: '24+ aligners',
      fullPrice: 3495,
      monthlyPrice: 199,
      popular: false,
      features: [
        'Complex case treatment',
        'In-person consultations',
        'Dedicated orthodontist',
        '24/7 priority support',
        'Progress tracking app',
        'Multiple refinements',
        'Professional whitening',
        'Premium retainer set'
      ],
      notIncluded: []
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Perfect Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Transparent pricing with no hidden fees. All plans include expert orthodontist 
            oversight and our satisfaction guarantee.
          </p>

          {/* Payment Toggle */}
          <div className="inline-flex bg-white rounded-lg p-1 shadow-lg">
            <button
              onClick={() => setPaymentType('monthly')}
              className={`px-6 py-3 rounded-md font-semibold transition-colors ${
                paymentType === 'monthly'
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly Payment
            </button>
            <button
              onClick={() => setPaymentType('full')}
              className={`px-6 py-3 rounded-md font-semibold transition-colors ${
                paymentType === 'full'
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Pay in Full
              <span className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                Save 15%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow ${
                plan.popular ? 'ring-2 ring-primary-500 transform scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-1">
                    <Star size={16} fill="currentColor" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              <div className="p-8">
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  
                  {/* Price */}
                  <div className="mb-4">
                    {paymentType === 'monthly' ? (
                      <div>
                        <span className="text-4xl font-bold text-gray-900">${plan.monthlyPrice}</span>
                        <span className="text-gray-600">/month</span>
                        <div className="text-sm text-gray-500 mt-1">
                          Total: ${plan.fullPrice}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <span className="text-4xl font-bold text-gray-900">
                          ${Math.round(plan.fullPrice * 0.85)}
                        </span>
                        <div className="text-sm text-gray-500 mt-1">
                          <span className="line-through">${plan.fullPrice}</span>
                          <span className="text-green-600 ml-2">Save ${plan.fullPrice - Math.round(plan.fullPrice * 0.85)}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Duration & Aligners */}
                  <div className="flex justify-center space-x-4 text-sm text-gray-600 mb-6">
                    <div className="flex items-center space-x-1">
                      <Calendar size={16} />
                      <span>{plan.duration}</span>
                    </div>
                    <div>•</div>
                    <div>{plan.aligners}</div>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <Check className="text-green-500 flex-shrink-0" size={20} />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                  {plan.notIncluded.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3 opacity-50">
                      <X className="text-gray-400 flex-shrink-0" size={20} />
                      <span className="text-gray-500">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  className={`w-full py-4 rounded-lg font-semibold transition-colors ${
                    plan.popular
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Get Started
                </button>

                {/* Payment Info */}
                <div className="mt-4 text-center text-sm text-gray-500">
                  <div className="flex items-center justify-center space-x-1">
                    <CreditCard size={16} />
                    <span>No interest financing available</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              What's Included in Every Plan
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Free Assessment',
                description: 'Complete evaluation of your case'
              },
              {
                title: '3D Treatment Preview',
                description: 'See your new smile before you start'
              },
              {
                title: 'Expert Monitoring',
                description: 'Licensed orthodontists oversee your care'
              },
              {
                title: 'Satisfaction Guarantee',
                description: '30-day money-back guarantee'
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Check className="text-primary-600" size={24} />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Insurance & Financing */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Flexible Payment Options
          </h3>
          <div className="flex flex-wrap justify-center items-center space-x-8 text-gray-600">
            <div>✓ HSA/FSA Eligible</div>
            <div>✓ 0% Interest Financing</div>
            <div>✓ Insurance Coverage Available</div>
            <div>✓ Payment Plans Starting at $89/month</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const BeforeAfter: React.FC = () => {
  const [currentCase, setCurrentCase] = useState(0);

  const cases = [
    {
      id: 1,
      name: 'Sarah M.',
      age: 28,
      treatment: '5 months',
      condition: 'Crowded front teeth',
      rating: 5,
      testimonial: 'I cannot believe the transformation! My confidence has completely changed.',
      beforeAlt: 'Before treatment - crowded teeth',
      afterAlt: 'After treatment - straight aligned teeth'
    },
    {
      id: 2,
      name: 'Michael R.',
      age: 35,
      treatment: '4 months',
      condition: 'Gap between front teeth',
      rating: 5,
      testimonial: 'The process was so easy and the results exceeded my expectations.',
      beforeAlt: 'Before treatment - gap in front teeth',
      afterAlt: 'After treatment - closed gap'
    },
    {
      id: 3,
      name: 'Jennifer L.',
      age: 24,
      treatment: '6 months',
      condition: 'Crooked lower teeth',
      rating: 5,
      testimonial: 'Best decision I ever made. The aligners were comfortable and invisible.',
      beforeAlt: 'Before treatment - crooked lower teeth',
      afterAlt: 'After treatment - straightened teeth'
    },
    {
      id: 4,
      name: 'David K.',
      age: 42,
      treatment: '5 months',
      condition: 'Overlapping teeth',
      rating: 5,
      testimonial: 'As an adult, I was hesitant about braces. SmileAlign was perfect for me.',
      beforeAlt: 'Before treatment - overlapping teeth',
      afterAlt: 'After treatment - properly aligned teeth'
    }
  ];

  const nextCase = () => {
    setCurrentCase((prev) => (prev + 1) % cases.length);
  };

  const prevCase = () => {
    setCurrentCase((prev) => (prev - 1 + cases.length) % cases.length);
  };

  const currentCaseData = cases[currentCase];

  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Real Results from Real Patients
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See the amazing transformations our patients have achieved with SmileAlign. 
            These are actual before and after photos from our satisfied customers.
          </p>
        </div>

        {/* Main Before/After Display */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Before/After Images */}
            <div className="relative">
              <div className="grid grid-cols-2">
                {/* Before */}
                <div className="relative p-8 bg-gray-50">
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Before
                  </div>
                  <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl mb-2">😬</div>
                      <div className="text-sm text-gray-600">{currentCaseData.beforeAlt}</div>
                    </div>
                  </div>
                </div>
                
                {/* After */}
                <div className="relative p-8 bg-primary-50">
                  <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    After
                  </div>
                  <div className="aspect-square bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl mb-2">😊</div>
                      <div className="text-sm text-primary-700">{currentCaseData.afterAlt}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Case Details */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {currentCaseData.name}
                </h3>
                <div className="flex items-center space-x-4 text-gray-600 mb-4">
                  <span>Age: {currentCaseData.age}</span>
                  <span>•</span>
                  <span>Treatment: {currentCaseData.treatment}</span>
                </div>
                <div className="text-primary-600 font-semibold mb-4">
                  Condition: {currentCaseData.condition}
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-6">
                <div className="flex text-yellow-400">
                  {[...Array(currentCaseData.rating)].map((_, i) => (
                    <Star key={i} size={20} fill="currentColor" />
                  ))}
                </div>
                <span className="text-gray-600 font-medium">{currentCaseData.rating}/5</span>
              </div>

              {/* Testimonial */}
              <blockquote className="text-lg text-gray-700 italic mb-6">
                "{currentCaseData.testimonial}"
              </blockquote>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <button
                  onClick={prevCase}
                  className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors"
                >
                  <ChevronLeft size={20} />
                  <span>Previous</span>
                </button>
                
                <div className="flex space-x-2">
                  {cases.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentCase(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentCase ? 'bg-primary-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={nextCase}
                  className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors"
                >
                  <span>Next</span>
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { number: '50,000+', label: 'Successful Treatments' },
            { number: '4.9/5', label: 'Average Rating' },
            { number: '95%', label: 'Success Rate' },
            { number: '5.2 months', label: 'Average Treatment Time' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button className="bg-primary-600 text-white px-8 py-4 rounded-lg hover:bg-primary-700 transition-colors font-semibold text-lg">
            See Your Transformation Preview
          </button>
          <p className="text-gray-600 mt-4">
            Upload your photos for a free smile preview in under 60 seconds
          </p>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;
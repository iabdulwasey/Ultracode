import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Fleet Manager',
      company: 'EcoTransport Solutions',
      image: '👩‍💼',
      rating: 5,
      text: 'PowerCell batteries have revolutionized our electric fleet. The reliability and performance are outstanding, and our operational costs have decreased by 40%.'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      company: 'GreenTech Industries',
      image: '👨‍💻',
      rating: 5,
      text: 'The fast-charging capability and longevity of these batteries exceeded our expectations. Our production efficiency has improved dramatically.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Homeowner',
      company: 'Residential Customer',
      image: '👩‍🏠',
      rating: 5,
      text: 'Our home energy storage system has been flawless for two years. During power outages, we never worry about losing electricity. Absolutely recommended!'
    },
    {
      name: 'David Thompson',
      role: 'Operations Director',
      company: 'Solar Solutions Inc.',
      image: '👨‍🔧',
      rating: 5,
      text: 'We\'ve installed hundreds of PowerCell systems. The quality is consistent, customer support is excellent, and failure rates are virtually zero.'
    },
    {
      name: 'Lisa Wang',
      role: 'Research Lead',
      company: 'Innovation Labs',
      image: '👩‍🔬',
      rating: 5,
      text: 'The advanced technology and smart features make these batteries perfect for our research applications. The data insights are incredibly valuable.'
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What Our
            <span className="block gradient-text">Customers Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what industry leaders 
            and satisfied customers have to say about our battery solutions.
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100 relative">
            {/* Quote Icon */}
            <Quote className="absolute top-8 left-8 w-12 h-12 text-primary-200" />
            
            {/* Testimonial Content */}
            <div className="relative z-10">
              {/* Stars */}
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Text */}
              <blockquote className="text-2xl text-gray-700 text-center mb-8 leading-relaxed italic">
                "{testimonials[currentTestimonial].text}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center justify-center">
                <div className="text-4xl mr-4">{testimonials[currentTestimonial].image}</div>
                <div className="text-center">
                  <div className="font-bold text-xl text-gray-900">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-primary-600 font-medium">
                    {testimonials[currentTestimonial].role}
                  </div>
                  <div className="text-gray-500">
                    {testimonials[currentTestimonial].company}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-primary-50 hover:border-primary-200 transition-colors duration-200"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-primary-50 hover:border-primary-200 transition-colors duration-200"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentTestimonial ? 'bg-primary-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold gradient-text mb-2">4.9/5</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div>
            <div className="text-4xl font-bold gradient-text mb-2">10,000+</div>
            <div className="text-gray-600">Reviews</div>
          </div>
          <div>
            <div className="text-4xl font-bold gradient-text mb-2">98%</div>
            <div className="text-gray-600">Would Recommend</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
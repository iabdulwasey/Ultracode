import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: 'Sarah Johnson',
      age: 34,
      location: 'California',
      smokingYears: 15,
      quitTime: '8 months',
      rating: 5,
      text: "I tried quitting cold turkey multiple times and failed. Nicotex made all the difference. The 4mg gum helped me manage my cravings, and now I've been smoke-free for 8 months!",
      avatar: 'SJ'
    },
    {
      name: 'Michael Chen',
      age: 42,
      location: 'New York',
      smokingYears: 20,
      quitTime: '1 year',
      rating: 5,
      text: "As a pack-a-day smoker for 20 years, I never thought I could quit. Nicotex's step-by-step program worked perfectly. My doctor is amazed at my lung improvement.",
      avatar: 'MC'
    },
    {
      name: 'Emily Rodriguez',
      age: 28,
      location: 'Texas',
      smokingYears: 10,
      quitTime: '6 months',
      rating: 5,
      text: "The mint flavor made it easy to use, and the gradual reduction approach felt natural. I saved over $2,000 already and feel so much healthier!",
      avatar: 'ER'
    },
    {
      name: 'David Thompson',
      age: 55,
      location: 'Florida',
      smokingYears: 30,
      quitTime: '2 years',
      rating: 5,
      text: "After 30 years of smoking, I thought it was too late. Nicotex proved me wrong. Two years smoke-free and my grandkids are so proud of me!",
      avatar: 'DT'
    },
    {
      name: 'Lisa Williams',
      age: 39,
      location: 'Oregon',
      smokingYears: 18,
      quitTime: '10 months',
      rating: 5,
      text: "The support materials and clear instructions made the process manageable. I love that I can taste food again and don't worry about secondhand smoke around my family.",
      avatar: 'LW'
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentData = testimonials[currentTestimonial];

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Real Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of people who have successfully quit smoking with Nicotex. 
            Here are their inspiring journeys to freedom.
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-nicotex-50 to-blue-50 rounded-3xl p-8 lg:p-12 shadow-xl relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
              <Quote className="w-full h-full text-nicotex-600" />
            </div>

            <div className="relative z-10">
              {/* Navigation */}
              <div className="flex justify-between items-center mb-8">
                <button
                  onClick={prevTestimonial}
                  className="p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow"
                >
                  <ChevronLeft className="h-6 w-6 text-gray-600" />
                </button>
                
                <div className="flex space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentTestimonial ? 'bg-nicotex-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextTestimonial}
                  className="p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow"
                >
                  <ChevronRight className="h-6 w-6 text-gray-600" />
                </button>
              </div>

              {/* Testimonial Content */}
              <div className="text-center">
                {/* Stars */}
                <div className="flex justify-center space-x-1 mb-6">
                  {[...Array(currentData.rating)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-2xl lg:text-3xl text-gray-900 font-medium leading-relaxed mb-8">
                  "{currentData.text}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-16 h-16 bg-nicotex-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                    {currentData.avatar}
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-gray-900 text-lg">{currentData.name}</div>
                    <div className="text-gray-600">Age {currentData.age} • {currentData.location}</div>
                    <div className="text-sm text-nicotex-600 font-semibold">
                      Smoked {currentData.smokingYears} years • Quit {currentData.quitTime} ago
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-16 grid md:grid-cols-4 gap-8 text-center">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-3xl font-bold text-nicotex-600 mb-2">94%</div>
            <div className="text-gray-600">Success Rate</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-3xl font-bold text-nicotex-600 mb-2">50K+</div>
            <div className="text-gray-600">People Helped</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-3xl font-bold text-nicotex-600 mb-2">4.8★</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-3xl font-bold text-nicotex-600 mb-2">20+</div>
            <div className="text-gray-600">Years Trusted</div>
          </div>
        </div>

        {/* Quick Testimonials Grid */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6">
              <div className="flex space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 line-clamp-3">
                "{testimonial.text}"
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-nicotex-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">Quit {testimonial.quitTime} ago</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
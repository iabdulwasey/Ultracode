import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Emily Rodriguez',
      age: 29,
      profession: 'Marketing Manager',
      rating: 5,
      treatment: '5 months',
      text: 'SmileAlign completely transformed my confidence. The aligners were so comfortable I barely noticed them, and the results exceeded my expectations. The remote monitoring made everything so convenient.',
      image: '👩‍💼',
      location: 'San Francisco, CA'
    },
    {
      id: 2,
      name: 'James Thompson',
      age: 34,
      profession: 'Software Engineer',
      rating: 5,
      treatment: '4 months',
      text: 'As someone who works in tech, I appreciated the seamless digital experience. The app made tracking progress easy, and the customer support was outstanding. Worth every penny!',
      image: '👨‍💻',
      location: 'Austin, TX'
    },
    {
      id: 3,
      name: 'Maria Santos',
      age: 26,
      profession: 'Teacher',
      rating: 5,
      treatment: '6 months',
      text: 'I was hesitant about straightening my teeth as an adult, but SmileAlign made it so easy. My students never even noticed I was wearing aligners. The transformation is incredible!',
      image: '👩‍🏫',
      location: 'Miami, FL'
    },
    {
      id: 4,
      name: 'Robert Chen',
      age: 41,
      profession: 'Business Owner',
      rating: 5,
      treatment: '5 months',
      text: 'The convenience factor was huge for me. No frequent office visits, professional results, and excellent customer service. SmileAlign delivered everything they promised.',
      image: '👨‍💼',
      location: 'Seattle, WA'
    },
    {
      id: 5,
      name: 'Sarah Williams',
      age: 31,
      profession: 'Nurse',
      rating: 5,
      treatment: '4 months',
      text: 'Working in healthcare, I needed something discreet and hygienic. SmileAlign was perfect. The aligners were easy to clean and maintain, and the results speak for themselves.',
      image: '👩‍⚕️',
      location: 'Chicago, IL'
    },
    {
      id: 6,
      name: 'Michael Johnson',
      age: 28,
      profession: 'Sales Representative',
      rating: 5,
      treatment: '5 months',
      text: 'My job requires me to meet clients daily, so appearance matters. SmileAlign gave me the confidence boost I needed. The treatment was smooth and the results are amazing.',
      image: '👨‍💼',
      location: 'New York, NY'
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
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Patients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what real patients have to say 
            about their SmileAlign experience and transformation.
          </p>
        </div>

        {/* Featured Testimonial */}
        <div className="bg-gradient-to-br from-primary-50 to-white rounded-3xl p-8 md:p-12 shadow-xl mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Patient Info */}
            <div className="text-center lg:text-left">
              <div className="text-6xl mb-4">{currentData.image}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {currentData.name}
              </h3>
              <p className="text-primary-600 font-semibold mb-1">
                {currentData.profession}
              </p>
              <p className="text-gray-600 text-sm mb-4">
                {currentData.location}
              </p>
              
              {/* Rating */}
              <div className="flex items-center justify-center lg:justify-start space-x-2 mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(currentData.rating)].map((_, i) => (
                    <Star key={i} size={20} fill="currentColor" />
                  ))}
                </div>
                <span className="text-gray-600 font-medium">{currentData.rating}/5</span>
              </div>
              
              <div className="bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold inline-block">
                Treatment: {currentData.treatment}
              </div>
            </div>

            {/* Testimonial Text */}
            <div className="lg:col-span-2">
              <Quote className="text-primary-200 mb-4" size={48} />
              <blockquote className="text-xl text-gray-700 leading-relaxed mb-6 italic">
                "{currentData.text}"
              </blockquote>
              
              {/* Navigation */}
              <div className="flex items-center justify-between">
                <button
                  onClick={prevTestimonial}
                  className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors"
                >
                  <ChevronLeft size={20} />
                  <span>Previous</span>
                </button>
                
                <div className="flex space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentTestimonial ? 'bg-primary-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={nextTestimonial}
                  className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors"
                >
                  <span>Next</span>
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 6).map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow cursor-pointer ${
                index === currentTestimonial ? 'ring-2 ring-primary-500 bg-primary-50' : ''
              }`}
              onClick={() => setCurrentTestimonial(index)}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="text-2xl">{testimonial.image}</div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.profession}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 mb-3">
                <div className="flex text-yellow-400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <span className="text-sm text-gray-600">{testimonial.treatment}</span>
              </div>
              
              <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                "{testimonial.text}"
              </p>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 bg-gray-50 rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">4.9/5</div>
              <div className="text-gray-900 font-semibold mb-1">Average Rating</div>
              <div className="text-gray-600 text-sm">From 2,000+ reviews</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">98%</div>
              <div className="text-gray-900 font-semibold mb-1">Recommend Us</div>
              <div className="text-gray-600 text-sm">Would refer to friends</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">50K+</div>
              <div className="text-gray-900 font-semibold mb-1">Happy Patients</div>
              <div className="text-gray-600 text-sm">Successful treatments</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">5 Years</div>
              <div className="text-gray-900 font-semibold mb-1">Experience</div>
              <div className="text-gray-600 text-sm">In teeth alignment</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Join Thousands of Happy Patients?
          </h3>
          <button className="bg-primary-600 text-white px-8 py-4 rounded-lg hover:bg-primary-700 transition-colors font-semibold text-lg">
            Start Your Smile Journey
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
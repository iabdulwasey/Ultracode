import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "New York, NY",
      rating: 5,
      service: "Tape-In Extensions",
      text: "I've been getting my extensions done at MBeauty for over a year now, and I couldn't be happier! The quality is amazing, and they blend perfectly with my natural hair. The team is so professional and knowledgeable.",
      image: "👩‍🦰"
    },
    {
      id: 2,
      name: "Emily Chen",
      location: "Los Angeles, CA",
      rating: 5,
      service: "Keratin Bond Extensions",
      text: "MBeauty transformed my thin hair into the voluminous locks I've always dreamed of. The keratin bond extensions feel so natural, and I get compliments everywhere I go. Worth every penny!",
      image: "👩‍🦱"
    },
    {
      id: 3,
      name: "Jessica Martinez",
      location: "Miami, FL",
      rating: 5,
      service: "Clip-In Extensions",
      text: "The clip-in extensions from MBeauty are a game-changer! I can switch up my look whenever I want, and they're so easy to use. The color match was perfect, and the quality is outstanding.",
      image: "👩‍🦳"
    },
    {
      id: 4,
      name: "Amanda Williams",
      location: "Chicago, IL",
      rating: 5,
      service: "Halo Extensions",
      text: "I was skeptical about extensions at first, but MBeauty's halo extensions are incredible! They're so comfortable and give me instant volume without any damage to my natural hair.",
      image: "👱‍♀️"
    },
    {
      id: 5,
      name: "Rachel Davis",
      location: "Austin, TX",
      rating: 5,
      service: "Custom Color Match",
      text: "The color matching service is phenomenal! They perfectly matched my unique hair color, and the extensions blend seamlessly. I've never felt more confident about my hair.",
      image: "👩"
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-primary-50 to-gold-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied clients have to say about their MBeauty experience.
          </p>
        </div>

        {/* Main Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 relative overflow-hidden">
            {/* Quote Icon */}
            <div className="absolute top-6 right-6 text-primary-200">
              <Quote className="w-16 h-16" />
            </div>

            <div className="grid lg:grid-cols-3 gap-8 items-center">
              {/* Client Info */}
              <div className="text-center lg:text-left">
                <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-gold-100 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-4 text-4xl">
                  {currentTestimonial.image}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-1">
                  {currentTestimonial.name}
                </h3>
                <p className="text-gray-600 mb-2">{currentTestimonial.location}</p>
                <div className="flex justify-center lg:justify-start mb-2">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="inline-block bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                  {currentTestimonial.service}
                </span>
              </div>

              {/* Testimonial Text */}
              <div className="lg:col-span-2">
                <blockquote className="text-xl lg:text-2xl text-gray-700 leading-relaxed italic">
                  "{currentTestimonial.text}"
                </blockquote>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={prevTestimonial}
                className="bg-primary-100 hover:bg-primary-200 text-primary-600 p-3 rounded-full transition-colors duration-200"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Dots Indicator */}
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                      index === currentIndex ? 'bg-primary-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="bg-primary-100 hover:bg-primary-200 text-primary-600 p-3 rounded-full transition-colors duration-200"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Testimonial Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.slice(0, 3).map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-gold-100 rounded-full flex items-center justify-center mr-4 text-xl">
                  {testimonial.image}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                "{testimonial.text.substring(0, 120)}..."
              </p>
              <div className="mt-4">
                <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                  {testimonial.service}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-3xl font-bold text-primary-600 mb-2">10,000+</div>
            <div className="text-gray-600">Happy Clients</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-3xl font-bold text-gold-600 mb-2">4.9★</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-3xl font-bold text-primary-600 mb-2">2,000+</div>
            <div className="text-gray-600">5-Star Reviews</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-3xl font-bold text-gold-600 mb-2">98%</div>
            <div className="text-gray-600">Satisfaction Rate</div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Ready to Join Our Happy Clients?
            </h3>
            <p className="text-gray-600 mb-6">
              Experience the MBeauty difference and transform your hair today.
            </p>
            <button className="btn-primary text-lg px-8 py-4">
              Book Your Appointment
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
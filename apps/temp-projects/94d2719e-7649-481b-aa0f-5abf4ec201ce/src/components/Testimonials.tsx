import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Fashion Designer",
      image: "https://images.unsplash.com/photo-1494790108755-2616c5e2e3b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      text: "Monu's Salon is absolutely amazing! The staff is so professional and talented. I've been coming here for 3 years and they never disappoint. My hair always looks perfect after every visit.",
      service: "Hair Styling & Color"
    },
    {
      name: "Anjali Patel",
      role: "Bride",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      text: "I had my bridal makeup done here and it was absolutely stunning! Monu and her team made me feel like a princess on my wedding day. The makeup lasted all day and looked flawless in photos.",
      service: "Bridal Package"
    },
    {
      name: "Kavya Singh",
      role: "Corporate Executive",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      text: "The facial treatments here are incredible! My skin has never looked better. The staff is knowledgeable about different skin types and always recommends the best treatments.",
      service: "Facial Treatment"
    },
    {
      name: "Meera Gupta",
      role: "Teacher",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      text: "I love the ambiance and service at Monu's Salon. It's my go-to place for all beauty needs. The prices are reasonable and the quality is exceptional. Highly recommended!",
      service: "Regular Customer"
    },
    {
      name: "Riya Agarwal",
      role: "Model",
      image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      text: "As a model, I need to look perfect all the time. Monu's Salon understands this and always delivers exceptional results. Their makeup and hair styling is top-notch.",
      service: "Professional Makeup"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < rating ? 'text-gold-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our amazing clients 
            have to say about their experience at Monu's Salon.
          </p>
        </div>

        {/* Testimonial Slider */}
        <div className="relative">
          <div className="bg-gradient-to-br from-primary-50 to-gold-50 rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="flex items-center justify-center mb-8">
              <Quote className="h-16 w-16 text-primary-300" />
            </div>

            <div className="text-center max-w-4xl mx-auto">
              {/* Rating */}
              <div className="flex justify-center mb-6">
                {renderStars(testimonials[currentSlide].rating)}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 font-medium">
                "{testimonials[currentSlide].text}"
              </blockquote>

              {/* Client Info */}
              <div className="flex items-center justify-center">
                <img
                  src={testimonials[currentSlide].image}
                  alt={testimonials[currentSlide].name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div className="text-left">
                  <div className="font-bold text-gray-900 text-lg">
                    {testimonials[currentSlide].name}
                  </div>
                  <div className="text-gray-600">
                    {testimonials[currentSlide].role}
                  </div>
                  <div className="text-primary-600 text-sm font-medium">
                    {testimonials[currentSlide].service}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors duration-200"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors duration-200"
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentSlide ? 'bg-primary-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">4.9</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">1000+</div>
            <div className="text-gray-600">Happy Reviews</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">98%</div>
            <div className="text-gray-600">Satisfaction Rate</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">85%</div>
            <div className="text-gray-600">Repeat Clients</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
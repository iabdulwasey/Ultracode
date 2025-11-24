import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, MapPin, Calendar } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  review: string;
  trip: string;
  duration: string;
  image: string;
  highlights: string[];
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    location: 'New York, USA',
    rating: 5,
    review: 'Japan exceeded all my expectations! The perfect blend of ancient traditions and cutting-edge technology. Every moment was magical, from the serene temples in Kyoto to the bustling streets of Tokyo. The cherry blossoms were absolutely breathtaking!',
    trip: 'Golden Route',
    duration: '10 days',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b1e5?w=150&h=150&fit=crop&crop=face',
    highlights: ['Cherry Blossoms', 'Temple Visits', 'Tokyo Food Scene', 'Cultural Immersion']
  },
  {
    id: 2,
    name: 'Marcus Chen',
    location: 'London, UK',
    rating: 5,
    review: 'As a photography enthusiast, Japan was a dream come true. Every corner offered a perfect shot - from the iconic Mount Fuji to the intimate moments in traditional tea houses. The people were incredibly welcoming and helpful throughout my journey.',
    trip: 'Photography Tour',
    duration: '14 days',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    highlights: ['Mount Fuji Views', 'Street Photography', 'Traditional Architecture', 'Landscape Shots']
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    location: 'Barcelona, Spain',
    rating: 5,
    review: 'The culinary journey through Japan was incredible! From authentic ramen in tiny Tokyo stalls to kaiseki dining in Kyoto, every meal was an adventure. The cooking classes and market tours added so much depth to the experience.',
    trip: 'Culinary Adventure',
    duration: '8 days',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    highlights: ['Ramen Tours', 'Cooking Classes', 'Market Visits', 'Sake Tasting']
  },
  {
    id: 4,
    name: 'David Thompson',
    location: 'Sydney, Australia',
    rating: 5,
    review: 'Japan in winter was absolutely magical! The snow-covered landscapes, relaxing hot springs, and winter festivals created unforgettable memories. Seeing the snow monkeys in their natural habitat was a once-in-a-lifetime experience.',
    trip: 'Winter Wonderland',
    duration: '12 days',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    highlights: ['Snow Monkeys', 'Hot Springs', 'Winter Festivals', 'Skiing in Hokkaido']
  },
  {
    id: 5,
    name: 'Lisa Wang',
    location: 'Toronto, Canada',
    rating: 5,
    review: 'Traveling solo through Japan felt incredibly safe and rewarding. The efficient transportation system made it easy to explore, and I met so many wonderful people along the way. The autumn colors were simply spectacular!',
    trip: 'Solo Adventure',
    duration: '15 days',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    highlights: ['Solo Travel Safety', 'Autumn Foliage', 'Local Connections', 'Cultural Festivals']
  },
  {
    id: 6,
    name: 'James Miller',
    location: 'Berlin, Germany',
    rating: 5,
    review: 'The spiritual aspect of Japan touched my soul deeply. Meditation sessions at ancient temples, peaceful walks through bamboo forests, and the overall sense of harmony everywhere made this trip transformative.',
    trip: 'Spiritual Journey',
    duration: '9 days',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    highlights: ['Temple Meditation', 'Bamboo Forest', 'Zen Gardens', 'Spiritual Retreats']
  }
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const prevTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Traveler <span className="gradient-text">Stories</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from fellow adventurers who discovered the magic of Japan
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className={`bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 ${
            isAnimating ? 'opacity-50 transform scale-95' : 'opacity-100 transform scale-100'
          }`}>
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Content */}
              <div className="p-8 lg:p-12">
                <div className="flex items-center mb-6">
                  <img
                    src={currentTestimonial.image}
                    alt={currentTestimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{currentTestimonial.name}</h3>
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      {currentTestimonial.location}
                    </div>
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < currentTestimonial.rating ? 'text-japan-gold fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-gray-600">({currentTestimonial.rating}/5)</span>
                </div>

                <div className="relative mb-6">
                  <Quote className="absolute -top-2 -left-2 w-8 h-8 text-japan-cherry/30" />
                  <p className="text-gray-700 text-lg leading-relaxed pl-6">
                    {currentTestimonial.review}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <div className="flex items-center text-sm text-gray-500 mb-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      Trip Type
                    </div>
                    <div className="font-semibold text-gray-900">{currentTestimonial.trip}</div>
                  </div>
                  <div>
                    <div className="flex items-center text-sm text-gray-500 mb-1">
                      <Calendar className="w-4 h-4 mr-1" />
                      Duration
                    </div>
                    <div className="font-semibold text-gray-900">{currentTestimonial.duration}</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Trip Highlights:</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentTestimonial.highlights.map((highlight, index) => (
                      <span
                        key={index}
                        className="bg-japan-cherry/10 text-japan-red px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Image/Visual */}
              <div className="bg-gradient-to-br from-japan-red to-japan-cherry p-8 lg:p-12 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Quote className="w-12 h-12" />
                  </div>
                  <div className="text-4xl font-bold mb-2">{currentTestimonial.rating}.0</div>
                  <div className="text-white/80 mb-4">Perfect Rating</div>
                  <div className="bg-white/20 rounded-full px-4 py-2 text-sm">
                    {currentTestimonial.trip}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center mt-8 space-x-4">
            <button
              onClick={prevTestimonial}
              disabled={isAnimating}
              className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentIndex ? 'bg-japan-red' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              disabled={isAnimating}
              className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-japan-red mb-2">50K+</div>
            <div className="text-gray-600">Happy Travelers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-japan-red mb-2">4.9</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-japan-red mb-2">98%</div>
            <div className="text-gray-600">Would Recommend</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-japan-red mb-2">100+</div>
            <div className="text-gray-600">Destinations Covered</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-japan-navy to-slate-800 rounded-3xl p-8 md:p-12 text-white text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Create Your Own Story?
          </h3>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who have discovered the magic of Japan with our expert guidance
          </p>
          <button className="bg-gradient-to-r from-japan-red to-japan-cherry text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-200 transform hover:scale-105">
            Start Your Journey Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
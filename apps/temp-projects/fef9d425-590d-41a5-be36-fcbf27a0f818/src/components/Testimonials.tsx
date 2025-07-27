import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Sarah Johnson",
      age: 34,
      location: "Denver, CO",
      smokingHistory: "15 years, 1 pack/day",
      quitDate: "6 months ago",
      rating: 5,
      quote: "After trying to quit multiple times, Nicotex finally helped me break free. The gradual reduction approach made it so much easier than going cold turkey. I haven't touched a cigarette in 6 months!",
      avatar: "bg-gradient-to-br from-pink-400 to-purple-500"
    },
    {
      name: "Michael Chen",
      age: 42,
      location: "San Francisco, CA",
      smokingHistory: "20 years, 1.5 packs/day",
      quitDate: "1 year ago",
      rating: 5,
      quote: "I was skeptical at first, but Nicotex really works. The 4mg strength was perfect for my heavy smoking habit. My doctor is amazed at how much my lung function has improved.",
      avatar: "bg-gradient-to-br from-blue-400 to-teal-500"
    },
    {
      name: "Lisa Rodriguez",
      age: 28,
      location: "Miami, FL",
      smokingHistory: "8 years, 15 cigarettes/day",
      quitDate: "3 months ago",
      rating: 5,
      quote: "The mint flavor made it pleasant to use, and I loved having something to do with my hands when cravings hit. Nicotex helped me get through the hardest part of quitting.",
      avatar: "bg-gradient-to-br from-green-400 to-blue-500"
    },
    {
      name: "David Thompson",
      age: 55,
      location: "Chicago, IL",
      smokingHistory: "30 years, 2 packs/day",
      quitDate: "8 months ago",
      rating: 5,
      quote: "At 55, I thought it was too late to quit. Nicotex proved me wrong. My wife says I don't snore anymore, and I can finally keep up with my grandkids at the park.",
      avatar: "bg-gradient-to-br from-orange-400 to-red-500"
    },
    {
      name: "Jennifer Kim",
      age: 31,
      location: "Seattle, WA",
      smokingHistory: "12 years, 1 pack/day",
      quitDate: "4 months ago",
      rating: 5,
      quote: "The 12-week program was exactly what I needed. Having a clear timeline and gradual reduction made quitting feel achievable. I'm so proud of myself for sticking with it.",
      avatar: "bg-gradient-to-br from-purple-400 to-pink-500"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentTestimonial];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Real Stories from Real People
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of people who have successfully quit smoking with Nicotex. 
            Read their inspiring stories and see how they transformed their lives.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main Testimonial */}
          <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-8 mb-8 relative">
            <Quote className="absolute top-4 left-4 h-8 w-8 text-primary/20" />
            
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className={`${current.avatar} w-24 h-24 rounded-full flex items-center justify-center text-white text-2xl font-bold`}>
                  {current.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
              
              <div className="flex-1 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-lg text-gray-700 mb-6 italic">
                  "{current.quote}"
                </blockquote>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 text-lg">{current.name}, {current.age}</h4>
                  <p className="text-gray-600">{current.location}</p>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0 text-sm text-gray-500">
                    <span>Smoked: {current.smokingHistory}</span>
                    <span className="hidden sm:block">•</span>
                    <span>Quit: {current.quitDate}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={prevTestimonial}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow"
              >
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>
              
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentTestimonial ? 'bg-primary' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextTestimonial}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow"
              >
                <ChevronRight className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Success Stats */}
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg text-center border-2 border-primary/10">
              <div className="text-3xl font-bold text-primary mb-2">2M+</div>
              <div className="text-gray-600">People Helped</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center border-2 border-green-100">
              <div className="text-3xl font-bold text-green-600 mb-2">85%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center border-2 border-blue-100">
              <div className="text-3xl font-bold text-blue-600 mb-2">4.8★</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center border-2 border-purple-100">
              <div className="text-3xl font-bold text-purple-600 mb-2">12</div>
              <div className="text-gray-600">Week Program</div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 mt-12 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Write Your Success Story?</h3>
            <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
              Join thousands of people who have successfully quit smoking with Nicotex. 
              Your journey to a smoke-free life starts today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Start Your Quit Plan
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors">
                Find Nicotex Near You
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
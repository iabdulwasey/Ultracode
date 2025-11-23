import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      age: 34,
      smokingYears: 15,
      quitDate: '6 months ago',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      quote: 'Nicotex made quitting possible for me. After 15 years of smoking, I never thought I could do it. The gum helped me manage cravings without the awful withdrawal symptoms.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      age: 42,
      smokingYears: 20,
      quitDate: '1 year ago',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      quote: 'The 12-week program was exactly what I needed. Having a structured plan made all the difference. I\'m now smoke-free for over a year and feel amazing!',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      age: 28,
      smokingYears: 10,
      quitDate: '8 months ago',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      quote: 'I tried quitting cold turkey multiple times and failed. Nicotex gum gave me the support I needed to gradually reduce my nicotine dependence. Best decision ever!',
      rating: 5
    },
    {
      name: 'David Thompson',
      age: 55,
      smokingYears: 30,
      quitDate: '2 years ago',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      quote: 'After 30 years of smoking, I thought it was too late. Nicotex proved me wrong. My doctor is amazed at how much my health has improved since quitting.',
      rating: 5
    },
    {
      name: 'Lisa Park',
      age: 31,
      smokingYears: 12,
      quitDate: '4 months ago',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      quote: 'The different flavors made it easier to stick with the program. Fresh mint was my favorite! I\'m proud to say I\'m now completely smoke-free.',
      rating: 5
    },
    {
      name: 'Robert Kim',
      age: 39,
      smokingYears: 18,
      quitDate: '10 months ago',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      quote: 'Nicotex doubled my chances of success. The gradual reduction approach worked perfectly for me. I can finally breathe freely and have so much more energy.',
      rating: 5
    }
  ];

  const stats = [
    { number: '2M+', label: 'People Helped' },
    { number: '85%', label: 'Success Rate' },
    { number: '12', label: 'Week Program' },
    { number: '4.8/5', label: 'User Rating' }
  ];

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join millions of people who have successfully quit smoking with Nicotex. 
            Read their inspiring stories and see how they transformed their lives.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-green-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">Age {testimonial.age}</p>
                  <p className="text-sm text-gray-600">Smoked for {testimonial.smokingYears} years</p>
                </div>
              </div>

              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>

              <div className="relative mb-4">
                <Quote className="h-8 w-8 text-green-200 absolute -top-2 -left-2" />
                <p className="text-gray-700 italic pl-6">
                  "{testimonial.quote}"
                </p>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm font-medium text-green-600">
                  Smoke-free for {testimonial.quitDate}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Write Your Success Story?
          </h3>
          <p className="text-gray-600 mb-6">
            Join thousands of people who have successfully quit smoking with Nicotex.
          </p>
          <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
            Start Your Journey Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
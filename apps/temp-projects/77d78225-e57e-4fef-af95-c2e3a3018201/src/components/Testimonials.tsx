import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Parent',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b1e5?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      content: 'Brightwood Academy has exceeded our expectations. The teachers are dedicated, and my daughter has grown tremendously both academically and personally.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Parent',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      content: 'The individualized attention and innovative teaching methods at Brightwood have helped my son develop a true love for learning.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Alumni',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      content: 'Brightwood Academy prepared me exceptionally well for college. The critical thinking skills I developed there have been invaluable in my studies at Harvard.',
      rating: 5
    },
    {
      name: 'David Thompson',
      role: 'Parent',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      content: 'The sense of community at Brightwood is remarkable. Our family feels truly welcomed and supported by both staff and other families.',
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Community Says
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Hear from parents, students, and alumni about their experience at Brightwood Academy.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-2xl p-8 relative">
              <Quote className="h-8 w-8 text-primary-200 mb-4" />
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center">
              <div className="flex -space-x-1 mr-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <span>4.9/5 Average Rating</span>
            </div>
            <div>500+ Happy Families</div>
            <div>98% Would Recommend</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
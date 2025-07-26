import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      location: 'New York, NY',
      rating: 5,
      text: "The quality of these extensions is incredible! They blend perfectly with my natural hair and feel so soft. I've received so many compliments since wearing them.",
      image: 'sarah-j',
    },
    {
      id: 2,
      name: 'Maria Rodriguez',
      location: 'Los Angeles, CA',
      rating: 5,
      text: "I've tried many brands before, but MBeauty is by far the best. The hair is thick, healthy, and lasts for months with proper care. Absolutely worth every penny!",
      image: 'maria-r',
    },
    {
      id: 3,
      name: 'Ashley Chen',
      location: 'Miami, FL',
      rating: 5,
      text: "Fast shipping, excellent customer service, and amazing quality hair. The color match was perfect and installation was easy. I'm a customer for life!",
      image: 'ashley-c',
    },
    {
      id: 4,
      name: 'Jessica Williams',
      location: 'Chicago, IL',
      rating: 5,
      text: "These extensions transformed my look completely! The texture is so natural and they hold curls beautifully. I feel so much more confident now.",
      image: 'jessica-w',
    },
    {
      id: 5,
      name: 'Taylor Brown',
      location: 'Houston, TX',
      rating: 5,
      text: "Professional quality at an affordable price. The hair is tangle-free and sheds minimally. I've recommended MBeauty to all my friends!",
      image: 'taylor-b',
    },
    {
      id: 6,
      name: 'Amanda Davis',
      location: 'Phoenix, AZ',
      rating: 5,
      text: "Outstanding customer service and premium hair quality. The extensions are easy to style and maintain. I couldn't be happier with my purchase!",
      image: 'amanda-d',
    },
  ];

  const TestimonialImage: React.FC<{ testimonial: any }> = ({ testimonial }) => (
    <div className="w-16 h-16 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full flex items-center justify-center">
      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
        <span className="text-white text-sm font-bold">
          {testimonial.name.split(' ').map((n: string) => n[0]).join('')}
        </span>
      </div>
    </div>
  );

  return (
    <section id="reviews" className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied customers who have transformed their look with MBeauty extensions.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Quote Icon */}
              <div className="mb-4">
                <Quote className="h-8 w-8 text-primary/30" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Customer Info */}
              <div className="flex items-center gap-4">
                <TestimonialImage testimonial={testimonial} />
                <div>
                  <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-border">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">10K+</div>
            <div className="text-muted-foreground">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">4.9</div>
            <div className="text-muted-foreground">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">50+</div>
            <div className="text-muted-foreground">Hair Textures</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">99%</div>
            <div className="text-muted-foreground">Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
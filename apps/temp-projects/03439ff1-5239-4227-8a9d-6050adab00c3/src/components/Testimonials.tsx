import React from 'react';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  rating: number;
  text: string;
  avatar: string;
}

const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Home Chef",
      rating: 5,
      text: "The quality of spices from Yum Spices is unmatched! My curries have never tasted better. The Garam Masala blend is absolutely perfect.",
      avatar: "👩‍🍳"
    },
    {
      id: 2,
      name: "Marco Rodriguez",
      role: "Restaurant Owner",
      rating: 5,
      text: "As a professional chef, I demand the best ingredients. Yum Spices delivers consistently high-quality products that my customers love.",
      avatar: "👨‍🍳"
    },
    {
      id: 3,
      name: "Emily Chen",
      role: "Food Blogger",
      rating: 5,
      text: "I've tried spices from many suppliers, but Yum Spices stands out for their freshness and authentic flavors. Highly recommended!",
      avatar: "📱"
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Culinary Student",
      rating: 5,
      text: "Learning to cook with proper spices makes all the difference. Yum Spices has been my go-to source throughout culinary school.",
      avatar: "🎓"
    },
    {
      id: 5,
      name: "Lisa Park",
      role: "Food Enthusiast",
      rating: 5,
      text: "The customer service is exceptional and the spices arrive fresh every time. The Mediterranean herbs blend is my absolute favorite!",
      avatar: "🌟"
    },
    {
      id: 6,
      name: "Ahmed Hassan",
      role: "Spice Collector",
      rating: 5,
      text: "I collect spices from around the world, and Yum Spices offers some of the most authentic and rare varieties I've found.",
      avatar: "🌍"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it - hear from the chefs, home cooks, and food enthusiasts who love our spices
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-gradient-to-br from-gray-50 to-spice-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
              {/* Quote Icon */}
              <div className="flex justify-between items-start mb-6">
                <Quote size={32} className="text-spice-300" />
                <div className="flex items-center">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="text-yellow-400 fill-current"
                    />
                  ))}
                </div>
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>

              {/* Customer Info */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-spice-200 rounded-full flex items-center justify-center text-2xl mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-spice-600 text-sm">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-spice-600 mb-2">4.9/5</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-spice-600 mb-2">10K+</div>
            <div className="text-gray-600">Reviews</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-spice-600 mb-2">98%</div>
            <div className="text-gray-600">Satisfaction Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-spice-600 mb-2">24h</div>
            <div className="text-gray-600">Response Time</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
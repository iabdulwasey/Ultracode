import React from 'react';
import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
import { Star, Truck, Shield, Headphones } from 'lucide-react';

const Home: React.FC = () => {
  const features = [
    {
      icon: <Star className="h-8 w-8 text-primary" />,
      title: "Premium Quality",
      description: "100% Remy human hair extensions that look and feel natural"
    },
    {
      icon: <Truck className="h-8 w-8 text-primary" />,
      title: "Free Shipping",
      description: "Free worldwide shipping on orders over $100"
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Quality Guarantee",
      description: "30-day money-back guarantee on all products"
    },
    {
      icon: <Headphones className="h-8 w-8 text-primary" />,
      title: "Expert Support",
      description: "Professional styling advice and customer support"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      text: "The best hair extensions I've ever used! They blend perfectly with my natural hair.",
      rating: 5
    },
    {
      name: "Emily Davis",
      text: "Amazing quality and the color match was perfect. Will definitely order again!",
      rating: 5
    },
    {
      name: "Jessica Wilson",
      text: "Love how easy they are to apply and remove. Perfect for special occasions.",
      rating: 5
    }
  ];

  return (
    <div>
      <Hero />
      <FeaturedProducts />
      
      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose MBeauty?
            </h2>
            <p className="text-lg text-gray-600">
              We're committed to providing the highest quality hair extensions and exceptional service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                About MBeauty
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded with a passion for helping women feel confident and beautiful, 
                MBeauty has become a trusted name in premium hair extensions. We source 
                only the finest 100% Remy human hair to create extensions that look, 
                feel, and move like your natural hair.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Our commitment to quality and customer satisfaction has made us the 
                preferred choice for women worldwide who want to transform their look 
                with confidence.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">50K+</div>
                  <div className="text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">5 Years</div>
                  <div className="text-gray-600">Experience</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/10 to-purple-100 rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=600&h=600&fit=crop"
                  alt="About MBeauty"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-gray-600">
              Don't just take our word for it - hear from our satisfied customers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                <div className="font-semibold text-gray-900">{testimonial.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get In Touch
            </h2>
            <p className="text-lg text-gray-600">
              Have questions? We're here to help you find the perfect extensions.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                ></textarea>
              </div>
              <div className="md:col-span-2 text-center">
                <button type="submit" className="btn btn-primary">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
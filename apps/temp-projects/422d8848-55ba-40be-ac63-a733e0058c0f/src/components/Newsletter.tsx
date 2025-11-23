import React, { useState } from 'react';
import { Mail, Send, Gift, Users, MapPin, Calendar, CheckCircle, ArrowRight } from 'lucide-react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail('');
    }, 1500);
  };

  const benefits = [
    {
      icon: MapPin,
      title: 'Exclusive Destinations',
      description: 'Hidden gems and secret spots only locals know about'
    },
    {
      icon: Calendar,
      title: 'Seasonal Updates',
      description: 'Perfect timing for cherry blossoms, festivals, and events'
    },
    {
      icon: Gift,
      title: 'Special Discounts',
      description: 'Subscriber-only deals on tours, accommodations, and experiences'
    },
    {
      icon: Users,
      title: 'Travel Community',
      description: 'Connect with fellow Japan enthusiasts and share experiences'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Happy Subscribers' },
    { number: '95%', label: 'Satisfaction Rate' },
    { number: '2x/week', label: 'Quality Content' },
    { number: '24/7', label: 'Travel Support' }
  ];

  if (isSubscribed) {
    return (
      <section className="py-20 bg-gradient-to-br from-japan-red/5 via-japan-cherry/5 to-japan-gold/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-3xl p-12 shadow-2xl">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to the Japan Explorer Family! 🎌
            </h2>
            
            <p className="text-xl text-gray-600 mb-8">
              Thank you for subscribing! Your first insider guide to Japan's hidden gems 
              is on its way to your inbox.
            </p>
            
            <div className="bg-gradient-to-r from-japan-red/10 to-japan-cherry/10 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">What's Coming Next:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-japan-red rounded-full" />
                  <span className="text-gray-700">Weekly destination spotlights</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-japan-cherry rounded-full" />
                  <span className="text-gray-700">Exclusive travel deals</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-japan-gold rounded-full" />
                  <span className="text-gray-700">Cultural insights & tips</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-japan-bamboo rounded-full" />
                  <span className="text-gray-700">Seasonal travel guides</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-japan-red to-japan-cherry text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
                Explore Japan Now
              </button>
              <button className="border-2 border-japan-red text-japan-red px-8 py-3 rounded-full font-semibold hover:bg-japan-red hover:text-white transition-all duration-300">
                Join Our Community
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-japan-red/5 via-japan-cherry/5 to-japan-gold/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center space-x-2 bg-japan-gold/20 rounded-full px-4 py-2 mb-6">
              <Mail className="w-4 h-4 text-japan-red" />
              <span className="text-japan-red text-sm font-medium">Stay Connected</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Never Miss a <span className="gradient-text">Japan Adventure</span>
            </h2>
            
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of travelers discovering Japan's hidden gems, seasonal highlights, 
              and insider tips delivered straight to your inbox.
            </p>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <div
                  key={benefit.title}
                  className="flex items-start space-x-3 p-4 bg-white/50 rounded-xl hover:bg-white/80 transition-colors"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-japan-red to-japan-cherry rounded-lg flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                    <p className="text-sm text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              {stats.map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-japan-red mb-1">{stat.number}</div>
                  <div className="text-xs text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter Form */}
          <div className="relative">
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-japan-cherry/20 rounded-full blur-xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-japan-gold/20 rounded-full blur-xl" />
            
            <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-japan-red to-japan-cherry rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Start Your Japan Journey
                </h3>
                <p className="text-gray-600">
                  Get exclusive access to travel guides, deals, and insider tips
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-japan-red focus:outline-none transition-colors text-gray-900 placeholder-gray-500"
                    required
                  />
                  <div className="absolute right-2 top-2">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="bg-gradient-to-r from-japan-red to-japan-cherry text-white p-3 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-4">
                    Join 50,000+ travelers exploring Japan with confidence
                  </p>
                  
                  <div className="flex items-center justify-center space-x-4 text-xs text-gray-400">
                    <span>✓ No spam, ever</span>
                    <span>✓ Unsubscribe anytime</span>
                    <span>✓ Weekly updates</span>
                  </div>
                </div>
              </form>

              {/* Social Proof */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 bg-gradient-to-br from-japan-cherry to-japan-gold rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white"
                      >
                        {String.fromCharCode(65 + i)}
                      </div>
                    ))}
                  </div>
                  <span>Trusted by travelers worldwide</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional CTA Section */}
        <div className="mt-20 text-center bg-gradient-to-r from-japan-red/10 to-japan-cherry/10 rounded-3xl p-12">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Explore Japan Like Never Before?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            From ancient temples to modern marvels, let us guide you through 
            the most incredible experiences Japan has to offer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-japan-red to-japan-cherry text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2">
              <span>Start Planning Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="border-2 border-japan-red text-japan-red px-8 py-3 rounded-full font-semibold hover:bg-japan-red hover:text-white transition-all duration-300">
              Browse Destinations
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
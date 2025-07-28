import React, { useState } from 'react';
import { Mail, Send, Gift, Star, Globe, Calendar } from 'lucide-react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const benefits = [
    {
      icon: Gift,
      title: 'Exclusive Deals',
      description: 'Get access to special discounts and early-bird offers on tours and experiences'
    },
    {
      icon: Star,
      title: 'Insider Tips',
      description: 'Receive expert travel advice and hidden gems from our Japan specialists'
    },
    {
      icon: Globe,
      title: 'Travel Updates',
      description: 'Stay informed about the latest travel requirements and destination news'
    },
    {
      icon: Calendar,
      title: 'Seasonal Guides',
      description: 'Get timely information about festivals, events, and best times to visit'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-japanese-red via-sakura-500 to-pink-500 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-20 left-32 w-12 h-12 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-32 right-10 w-24 h-24 border-2 border-white rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-6">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Stay Connected with Japan
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Get the latest travel insights, exclusive deals, and insider tips delivered to your inbox. 
            Join thousands of Japan enthusiasts planning their perfect adventure.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Newsletter Form */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6">Subscribe to Our Newsletter</h3>
            
            {!isSubscribed ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-6 py-4 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-white text-japanese-red px-8 py-4 rounded-full hover:shadow-lg transition-all duration-300 font-semibold text-lg flex items-center justify-center space-x-2 hover:bg-gray-50"
                >
                  <Send className="w-5 h-5" />
                  <span>Subscribe Now</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Welcome Aboard!</h4>
                <p className="text-white/90">Thank you for subscribing. Check your email for a special welcome gift!</p>
              </div>
            )}

            <div className="mt-6 text-center">
              <p className="text-sm text-white/70">
                Join <span className="font-semibold">25,000+</span> travelers already subscribed
              </p>
              <div className="flex items-center justify-center mt-2 space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
                <span className="text-sm text-white/70 ml-2">Rated 4.9/5 by subscribers</span>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-8">What You'll Get:</h3>
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">{benefit.title}</h4>
                  <p className="text-white/80 text-sm leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-16 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h4 className="text-xl font-bold text-white mb-6">Trusted by Travelers Worldwide</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-3xl font-bold text-white mb-1">25K+</div>
                <div className="text-white/70 text-sm">Subscribers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">4.9★</div>
                <div className="text-white/70 text-sm">Rating</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">50+</div>
                <div className="text-white/70 text-sm">Countries</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">Weekly</div>
                <div className="text-white/70 text-sm">Updates</div>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Note */}
        <div className="mt-8 text-center">
          <p className="text-white/60 text-sm">
            We respect your privacy. Unsubscribe at any time. No spam, ever.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
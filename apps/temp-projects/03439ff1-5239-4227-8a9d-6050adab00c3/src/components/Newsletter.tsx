import React, { useState } from 'react';
import { Mail, Gift, Bell, Sparkles } from 'lucide-react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  const benefits = [
    {
      icon: Gift,
      title: "Exclusive Offers",
      description: "Get 15% off your first order and access to member-only deals"
    },
    {
      icon: Bell,
      title: "New Arrivals",
      description: "Be the first to know about new spices and seasonal collections"
    },
    {
      icon: Sparkles,
      title: "Recipe Ideas",
      description: "Weekly recipes and cooking tips from professional chefs"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-spice-600 via-paprika-600 to-spice-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-white">
            <h2 className="text-4xl font-bold mb-6">
              Join the Yum Spices Family
            </h2>
            <p className="text-xl mb-8 text-gray-100 leading-relaxed">
              Subscribe to our newsletter and unlock a world of flavors with exclusive recipes, cooking tips, and special offers delivered straight to your inbox.
            </p>

            {/* Benefits */}
            <div className="space-y-6 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <benefit.icon size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{benefit.title}</h3>
                    <p className="text-gray-200 text-sm">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter Form */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-spice-500 to-paprika-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Mail size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Get 15% Off Your First Order
              </h3>
              <p className="text-gray-600">
                Plus exclusive recipes and cooking tips
              </p>
            </div>

            {!isSubscribed ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-spice-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-spice-600 hover:bg-spice-700 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  Subscribe & Get 15% Off
                </button>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✅</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Welcome to the Family!
                </h3>
                <p className="text-gray-600">
                  Check your email for your 15% discount code
                </p>
              </div>
            )}

            <p className="text-xs text-gray-500 text-center mt-4">
              By subscribing, you agree to receive marketing emails. Unsubscribe at any time.
            </p>
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-16 text-center text-white">
          <p className="text-lg mb-4">Join over 50,000 spice lovers worldwide</p>
          <div className="flex justify-center items-center space-x-2">
            <div className="flex -space-x-2">
              {['👩‍🍳', '👨‍🍳', '🧑‍🍳', '👩‍🍳', '👨‍🍳'].map((emoji, i) => (
                <div key={i} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center border-2 border-white/30">
                  <span className="text-sm">{emoji}</span>
                </div>
              ))}
            </div>
            <span className="ml-4 text-sm">+50,000 others</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
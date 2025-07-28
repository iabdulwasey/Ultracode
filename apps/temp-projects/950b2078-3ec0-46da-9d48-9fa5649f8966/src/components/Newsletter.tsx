import React, { useState } from 'react';
import { Mail, Send, CheckCircle, Gift, Plane, Camera } from 'lucide-react';

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
      icon: Gift,
      title: "Exclusive Deals",
      description: "Get up to 30% off on selected tours and experiences"
    },
    {
      icon: Plane,
      title: "Travel Alerts",
      description: "Be first to know about new destinations and flight deals"
    },
    {
      icon: Camera,
      title: "Insider Tips",
      description: "Monthly guides with hidden gems and local secrets"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-chinese-red via-chinese-gold to-chinese-jade">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Header */}
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Stay Connected with China
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Join our community of explorers and get exclusive travel insights, 
              deals, and inspiration delivered to your inbox
            </p>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-white/80 text-sm">{benefit.description}</p>
                </div>
              );
            })}
          </div>

          {/* Newsletter Form */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12">
            {!isSubscribed ? (
              <>
                <div className="flex items-center justify-center mb-6">
                  <Mail className="w-8 h-8 text-white mr-3" />
                  <h3 className="text-2xl font-bold">Join Our Newsletter</h3>
                </div>
                
                <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="flex-1 px-6 py-4 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
                      required
                    />
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="bg-white text-chinese-red px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-50"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-chinese-red border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Subscribe</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
                
                <p className="text-white/70 text-sm mt-4">
                  No spam, unsubscribe anytime. We respect your privacy.
                </p>
              </>
            ) : (
              <div className="text-center animate-fade-in">
                <CheckCircle className="w-16 h-16 text-white mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Welcome Aboard!</h3>
                <p className="text-white/90 mb-6">
                  Thank you for subscribing! You'll receive your first newsletter with 
                  exclusive China travel tips within the next few days.
                </p>
                <button
                  onClick={() => setIsSubscribed(false)}
                  className="text-white/80 hover:text-white underline"
                >
                  Subscribe another email
                </button>
              </div>
            )}
          </div>

          {/* Social Proof */}
          <div className="mt-12 text-center">
            <p className="text-white/80 mb-4">Join 25,000+ travelers already exploring China with us</p>
            <div className="flex justify-center items-center space-x-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 bg-white/20 rounded-full border-2 border-white/50"
                  />
                ))}
              </div>
              <span className="text-white/70 text-sm ml-3">and many more...</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
import React, { useState } from 'react';
import { Mail, Send, CheckCircle, Gift, Plane, Heart } from 'lucide-react';

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
      description: "Get access to special discounts on tours and experiences"
    },
    {
      icon: Plane,
      title: "Travel Guides",
      description: "Receive detailed itineraries and insider tips from locals"
    },
    {
      icon: Heart,
      title: "Hidden Gems",
      description: "Discover secret spots that most tourists never find"
    }
  ];

  if (isSubscribed) {
    return (
      <section className="py-20 bg-gradient-to-br from-japan-cherry/20 to-japan-gold/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-3xl shadow-2xl p-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Welcome to the Journey! 🎌
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                Thank you for subscribing! You'll receive your first Japan travel guide within 24 hours, 
                packed with insider tips and exclusive recommendations.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {benefits.map((benefit, index) => {
                  const IconComponent = benefit.icon;
                  return (
                    <div key={index} className="text-center">
                      <div className="w-12 h-12 bg-japan-red/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <IconComponent className="w-6 h-6 text-japan-red" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1">{benefit.title}</h4>
                      <p className="text-sm text-gray-600">{benefit.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-japan-cherry/20 to-japan-gold/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Content Side */}
              <div className="p-8 lg:p-12">
                <div className="mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-japan-red to-japan-gold rounded-2xl flex items-center justify-center mb-6">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                    Never Miss a
                    <span className="gradient-text block">Japanese Adventure</span>
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Join thousands of travelers who receive our insider guides, exclusive deals, 
                    and hidden gems that make every Japan trip unforgettable.
                  </p>
                </div>

                {/* Benefits */}
                <div className="space-y-4 mb-8">
                  {benefits.map((benefit, index) => {
                    const IconComponent = benefit.icon;
                    return (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-japan-red/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-5 h-5 text-japan-red" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">{benefit.title}</h4>
                          <p className="text-gray-600 text-sm">{benefit.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Newsletter Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-japan-red focus:outline-none transition-colors text-gray-900"
                      required
                    />
                    <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-japan-red to-japan-gold text-white py-4 px-6 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-70"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Subscribing...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Start My Journey</span>
                      </>
                    )}
                  </button>
                </form>

                <p className="text-xs text-gray-500 mt-4 text-center">
                  We respect your privacy. Unsubscribe at any time. No spam, just amazing Japan content.
                </p>
              </div>

              {/* Visual Side */}
              <div className="relative h-64 lg:h-auto">
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')"
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-japan-red/80 to-japan-gold/80" />
                <div className="absolute inset-0 cherry-blossom-bg opacity-30" />
                
                {/* Floating Elements */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="animate-float mb-4">
                      <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto">
                        <span className="text-3xl">🌸</span>
                      </div>
                    </div>
                    <h4 className="text-2xl font-bold mb-2">Join 50,000+ Travelers</h4>
                    <p className="text-japan-cherry">Exploring Japan with confidence</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="grid grid-cols-2 gap-4 text-center text-white">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                      <div className="text-xl font-bold">500+</div>
                      <div className="text-xs text-japan-cherry">Destinations</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                      <div className="text-xl font-bold">50K+</div>
                      <div className="text-xs text-japan-cherry">Happy Travelers</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
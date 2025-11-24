import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Heart, Globe, Clock, Shield } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Destinations',
      links: [
        'Tokyo',
        'Kyoto',
        'Osaka',
        'Mount Fuji',
        'Hiroshima',
        'Nara'
      ]
    },
    {
      title: 'Experiences',
      links: [
        'Cultural Tours',
        'Food Adventures',
        'Temple Visits',
        'Hot Springs',
        'Cherry Blossom',
        'Winter Sports'
      ]
    },
    {
      title: 'Travel Info',
      links: [
        'Best Time to Visit',
        'Visa Requirements',
        'Transportation',
        'Accommodation',
        'Budget Planning',
        'Travel Tips'
      ]
    },
    {
      title: 'Support',
      links: [
        'Contact Us',
        'FAQ',
        'Travel Insurance',
        'Emergency Help',
        'Booking Support',
        'Refund Policy'
      ]
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Safe & Secure',
      description: 'Trusted by 50K+ travelers'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Always here to help you'
    },
    {
      icon: Globe,
      title: 'Local Experts',
      description: 'Authentic experiences'
    },
    {
      icon: Heart,
      title: 'Satisfaction',
      description: '98% customer satisfaction'
    }
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Features Section */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-japan-red to-japan-cherry rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-japan-red to-japan-cherry rounded-full flex items-center justify-center">
                <span className="text-white font-bold">日</span>
              </div>
              <span className="text-2xl font-bold gradient-text">Explore Japan</span>
            </div>
            
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your trusted companion for discovering the beauty, culture, and traditions of Japan. 
              We create unforgettable experiences that connect you with the heart of this amazing country.
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="w-5 h-5 text-japan-cherry" />
                <span>hello@explorejapan.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone className="w-5 h-5 text-japan-cherry" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin className="w-5 h-5 text-japan-cherry" />
                <span>Tokyo, Japan & Worldwide</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-bold mb-6 text-white">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-japan-cherry transition-colors duration-200 hover:underline"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-6">
              Get the latest travel tips, destination guides, and exclusive offers delivered to your inbox
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-japan-red focus:border-transparent"
              />
              <button className="bg-gradient-to-r from-japan-red to-japan-cherry text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Explore Japan. All rights reserved. Made with{' '}
              <Heart className="w-4 h-4 text-japan-red inline mx-1 fill-current" />
              for Japan lovers worldwide.
            </div>

            <div className="flex items-center space-x-6">
              {/* Social Links */}
              <div className="flex items-center space-x-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-japan-red transition-all duration-200 transform hover:scale-110"
                    >
                      <IconComponent className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>

              {/* Legal Links */}
              <div className="flex items-center space-x-4 text-sm">
                <a href="#" className="text-gray-400 hover:text-japan-cherry transition-colors duration-200">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-400 hover:text-japan-cherry transition-colors duration-200">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-japan-red via-japan-cherry to-japan-gold"></div>
    </footer>
  );
};

export default Footer;
import React from 'react';
import { MapPin, Mail, Phone, Facebook, Instagram, Twitter, Youtube, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const footerLinks = {
    destinations: [
      { name: 'Beijing', href: '#' },
      { name: 'Shanghai', href: '#' },
      { name: 'Xi\'an', href: '#' },
      { name: 'Guilin', href: '#' },
      { name: 'Chengdu', href: '#' },
      { name: 'Zhangjiajie', href: '#' }
    ],
    experiences: [
      { name: 'Great Wall Tours', href: '#' },
      { name: 'Culinary Adventures', href: '#' },
      { name: 'Cultural Immersion', href: '#' },
      { name: 'Photography Tours', href: '#' },
      { name: 'Family Packages', href: '#' },
      { name: 'Luxury Travel', href: '#' }
    ],
    support: [
      { name: 'Travel Guide', href: '#' },
      { name: 'Visa Assistance', href: '#' },
      { name: 'Customer Support', href: '#' },
      { name: 'Travel Insurance', href: '#' },
      { name: 'FAQs', href: '#' },
      { name: 'Contact Us', href: '#' }
    ],
    company: [
      { name: 'About Us', href: '#' },
      { name: 'Our Story', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Press', href: '#' },
      { name: 'Partnerships', href: '#' },
      { name: 'Sustainability', href: '#' }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: '#', name: 'Facebook' },
    { icon: Instagram, href: '#', name: 'Instagram' },
    { icon: Twitter, href: '#', name: 'Twitter' },
    { icon: Youtube, href: '#', name: 'YouTube' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-chinese-red to-chinese-gold rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">Explore China</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your trusted companion for discovering the wonders of China. 
              From ancient traditions to modern marvels, we create unforgettable 
              journeys through the Middle Kingdom.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-chinese-gold" />
                <span className="text-gray-400">hello@explorechina.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-chinese-gold" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-chinese-gold" />
                <span className="text-gray-400">San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Destinations</h3>
            <ul className="space-y-2">
              {footerLinks.destinations.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-chinese-gold transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Experiences */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Experiences</h3>
            <ul className="space-y-2">
              {footerLinks.experiences.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-chinese-gold transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-chinese-gold transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-chinese-gold transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media & Newsletter */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Social Links */}
            <div className="flex items-center space-x-6 mb-6 md:mb-0">
              <span className="text-gray-400">Follow us:</span>
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-gray-400 hover:text-chinese-gold transition-colors duration-200"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>

            {/* Awards/Certifications */}
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>🏆 Best Travel Agency 2024</span>
              <span>✈️ IATA Certified</span>
              <span>🛡️ Secure Booking</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Explore China. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-chinese-gold transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-chinese-gold transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-chinese-gold transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
          
          {/* Made with Love */}
          <div className="text-center mt-4 pt-4 border-t border-gray-800">
            <p className="text-gray-500 text-sm flex items-center justify-center">
              Made with <Heart className="w-4 h-4 text-chinese-red mx-1 fill-current" /> for China travelers
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
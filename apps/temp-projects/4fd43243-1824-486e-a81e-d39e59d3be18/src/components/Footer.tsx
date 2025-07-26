import React from 'react';
import { Battery, Zap, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <div className="relative">
                  <Battery className="h-8 w-8 text-primary-500" />
                  <Zap className="h-4 w-4 text-electric-400 absolute -top-1 -right-1 animate-pulse" />
                </div>
                <span className="text-2xl font-bold gradient-text">PowerCell</span>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Leading the future of energy storage with innovative, sustainable, 
                and high-performance battery solutions for every application.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors duration-200">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors duration-200">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors duration-200">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors duration-200">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li><a href="#home" className="text-gray-300 hover:text-primary-400 transition-colors duration-200">Home</a></li>
                <li><a href="#products" className="text-gray-300 hover:text-primary-400 transition-colors duration-200">Products</a></li>
                <li><a href="#technology" className="text-gray-300 hover:text-primary-400 transition-colors duration-200">Technology</a></li>
                <li><a href="#about" className="text-gray-300 hover:text-primary-400 transition-colors duration-200">About Us</a></li>
                <li><a href="#contact" className="text-gray-300 hover:text-primary-400 transition-colors duration-200">Contact</a></li>
                <li><a href="#" className="text-gray-300 hover:text-primary-400 transition-colors duration-200">Careers</a></li>
              </ul>
            </div>

            {/* Products */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Products</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-primary-400 transition-colors duration-200">Automotive Batteries</a></li>
                <li><a href="#" className="text-gray-300 hover:text-primary-400 transition-colors duration-200">Home Energy Storage</a></li>
                <li><a href="#" className="text-gray-300 hover:text-primary-400 transition-colors duration-200">Portable Power</a></li>
                <li><a href="#" className="text-gray-300 hover:text-primary-400 transition-colors duration-200">Industrial Solutions</a></li>
                <li><a href="#" className="text-gray-300 hover:text-primary-400 transition-colors duration-200">Custom Batteries</a></li>
                <li><a href="#" className="text-gray-300 hover:text-primary-400 transition-colors duration-200">Accessories</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-primary-400 mr-3 mt-1 flex-shrink-0" />
                  <div className="text-gray-300">
                    123 Innovation Drive<br />
                    Tech Valley, CA 94025
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-primary-400 mr-3 flex-shrink-0" />
                  <a href="tel:+15551234567" className="text-gray-300 hover:text-primary-400 transition-colors duration-200">
                    +1 (555) 123-4567
                  </a>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-primary-400 mr-3 flex-shrink-0" />
                  <a href="mailto:info@powercell.com" className="text-gray-300 hover:text-primary-400 transition-colors duration-200">
                    info@powercell.com
                  </a>
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="mt-8">
                <h4 className="font-semibold mb-3">Newsletter</h4>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:border-primary-500 text-white"
                  />
                  <button className="bg-primary-600 px-4 py-2 rounded-r-lg hover:bg-primary-700 transition-colors duration-200">
                    <Mail className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 mb-4 md:mb-0">
              © {currentYear} PowerCell. All rights reserved.
            </div>
            <div className="flex space-x-6 text-gray-400">
              <a href="#" className="hover:text-primary-400 transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="hover:text-primary-400 transition-colors duration-200">Terms of Service</a>
              <a href="#" className="hover:text-primary-400 transition-colors duration-200">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
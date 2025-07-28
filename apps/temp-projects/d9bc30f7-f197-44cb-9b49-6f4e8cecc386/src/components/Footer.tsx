import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-gold-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <span className="text-2xl font-serif font-bold">MBeauty</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Transform your look with our premium hair extensions. We're dedicated to helping 
              you achieve beautiful, natural-looking hair that boosts your confidence.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors duration-300">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors duration-300">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#home" className="text-gray-300 hover:text-primary-400 transition-colors duration-300">Home</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-primary-400 transition-colors duration-300">Services</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-primary-400 transition-colors duration-300">About Us</a></li>
              <li><a href="#gallery" className="text-gray-300 hover:text-primary-400 transition-colors duration-300">Gallery</a></li>
              <li><a href="#testimonials" className="text-gray-300 hover:text-primary-400 transition-colors duration-300">Reviews</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-primary-400 transition-colors duration-300">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Our Services</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-primary-400 transition-colors duration-300">Clip-In Extensions</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary-400 transition-colors duration-300">Tape-In Extensions</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary-400 transition-colors duration-300">Sew-In Extensions</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary-400 transition-colors duration-300">Color Matching</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary-400 transition-colors duration-300">Maintenance</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary-400 transition-colors duration-300">Consultation</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0" />
                <div className="text-gray-300">
                  <p>123 Beauty Boulevard</p>
                  <p>Suite 456</p>
                  <p>Beverly Hills, CA 90210</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-400" />
                <span className="text-gray-300">(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-400" />
                <span className="text-gray-300">hello@mbeauty.com</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-8">
              <h4 className="font-semibold mb-3">Stay Updated</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:border-primary-500 text-white"
                />
                <button className="bg-gradient-to-r from-primary-500 to-gold-500 px-4 py-2 rounded-r-lg hover:from-primary-600 hover:to-gold-600 transition-colors duration-300">
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 MBeauty. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-300">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-300">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import React from 'react';
import { Film, MapPin, Phone, Mail, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <Film className="h-8 w-8 text-primary-600" />
              <h3 className="ml-2 text-2xl font-bold">CinemaBook</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Your premier destination for booking movie tickets online. Experience the magic of cinema with comfort and convenience.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-primary-600 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary-600 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#movies" className="text-gray-300 hover:text-white transition-colors">Now Showing</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Coming Soon</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Theaters</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Gift Cards</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Promotions</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Refund Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-primary-600 mr-3 mt-0.5" />
                <span className="text-gray-300">
                  123 Cinema Street<br />
                  Hollywood, CA 90028
                </span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-primary-600 mr-3" />
                <span className="text-gray-300">(555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-primary-600 mr-3" />
                <span className="text-gray-300">info@cinemabook.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2024 CinemaBook. All rights reserved. | Designed with ❤️ for movie lovers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
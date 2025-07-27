import React from 'react';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <Heart className="h-8 w-8 text-green-500 mr-2" />
              <span className="text-2xl font-bold">Nicotex</span>
            </div>
            <p className="text-gray-300 mb-6">
              Helping millions of people quit smoking and live healthier, smoke-free lives through proven nicotine replacement therapy.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Youtube className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Nicotex 2mg</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Nicotex 4mg</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Flavor Options</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Product Quiz</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Store Locator</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Quit Plan</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">How to Use</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Success Stories</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Mobile App</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-gray-300">1-800-NICOTEX</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-gray-300">support@nicotex.com</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-green-500 mr-3 mt-1" />
                <span className="text-gray-300">
                  123 Health Street<br />
                  Wellness City, WC 12345
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
            <div className="text-center lg:text-left">
              <p className="text-gray-400">
                © {currentYear} Nicotex. All rights reserved.
              </p>
            </div>
            <div className="flex flex-wrap justify-center lg:justify-end gap-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Medical Disclaimer</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Accessibility</a>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-400 text-center">
              <strong>Important:</strong> This product contains nicotine, which is addictive. 
              For adults only. Consult your healthcare provider before use, especially if pregnant, 
              breastfeeding, or have heart conditions. Not for use by minors.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
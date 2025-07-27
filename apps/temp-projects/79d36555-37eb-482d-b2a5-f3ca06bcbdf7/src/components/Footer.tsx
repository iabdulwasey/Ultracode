import React from 'react';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="text-2xl font-bold text-nicotex-400 mb-4">NICOTEX</div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Leading the way in nicotine replacement therapy for over 20 years. 
              Helping people quit smoking and reclaim their health.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-nicotex-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-nicotex-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-nicotex-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-nicotex-400 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#benefits" className="text-gray-300 hover:text-white transition-colors">Benefits</a></li>
              <li><a href="#products" className="text-gray-300 hover:text-white transition-colors">Products</a></li>
              <li><a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#testimonials" className="text-gray-300 hover:text-white transition-colors">Success Stories</a></li>
              <li><a href="#faq" className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Quit Smoking Guide</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Side Effects</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Dosage Calculator</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Progress Tracker</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Community Forum</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <Phone className="h-5 w-5 mr-3 mt-1 text-nicotex-400" />
                <div>
                  <div className="font-semibold">1-800-NICOTEX</div>
                  <div className="text-gray-300 text-sm">Mon-Fri 8AM-8PM EST</div>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="h-5 w-5 mr-3 mt-1 text-nicotex-400" />
                <div>
                  <div className="font-semibold">support@nicotex.com</div>
                  <div className="text-gray-300 text-sm">24/7 Email Support</div>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 mt-1 text-nicotex-400" />
                <div>
                  <div className="font-semibold">Headquarters</div>
                  <div className="text-gray-300 text-sm">New York, NY 10001</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Important Links */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-3 text-nicotex-400">Important Information</h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                This product contains nicotine. Nicotine is an addictive chemical. 
                Stop use and ask a doctor if you experience irregular heartbeat or palpitations, 
                symptoms of nicotine overdose, or if you are pregnant or breastfeeding.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-nicotex-400">FDA Statement</h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                This product has not been evaluated by the Food and Drug Administration. 
                Individual results may vary. Consult your healthcare provider before starting 
                any smoking cessation program.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Nicotex. All rights reserved.
            </div>
            <div className="flex flex-wrap gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Accessibility</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
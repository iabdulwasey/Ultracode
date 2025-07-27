import React from 'react';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-6">
              <div className="text-2xl font-bold text-primary">Nicotex</div>
              <span className="ml-2 text-sm text-gray-400">by Healthcare Plus</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Helping millions of people quit smoking with clinically proven nicotine replacement therapy. 
              Your trusted partner in the journey to a smoke-free life.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#benefits" className="text-gray-300 hover:text-primary transition-colors">Benefits</a></li>
              <li><a href="#how-it-works" className="text-gray-300 hover:text-primary transition-colors">How It Works</a></li>
              <li><a href="#products" className="text-gray-300 hover:text-primary transition-colors">Products</a></li>
              <li><a href="#quit-plan" className="text-gray-300 hover:text-primary transition-colors">Quit Plan</a></li>
              <li><a href="#faq" className="text-gray-300 hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">Success Stories</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">Clinical Studies</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Support</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">Find a Store</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">Healthcare Providers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">Insurance Coverage</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">Side Effects</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">Safety Information</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">Returns & Refunds</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-primary mr-3" />
                <div>
                  <div className="font-semibold">1-800-NICOTEX</div>
                  <div className="text-sm text-gray-400">Mon-Fri 8AM-8PM EST</div>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-primary mr-3" />
                <div>
                  <div className="font-semibold">support@nicotex.com</div>
                  <div className="text-sm text-gray-400">24/7 email support</div>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mr-3 mt-1" />
                <div>
                  <div className="font-semibold">Healthcare Plus Inc.</div>
                  <div className="text-sm text-gray-400">
                    123 Wellness Drive<br />
                    Health City, HC 12345
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="mt-8">
              <h4 className="font-semibold mb-3">Quit Tips Newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-l-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button className="bg-primary px-4 py-2 rounded-r-lg hover:bg-primary/90 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Healthcare Plus Inc. All rights reserved.
            </div>
            <div className="flex flex-wrap gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">Medical Disclaimer</a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">Accessibility</a>
            </div>
          </div>

          {/* Medical Disclaimer */}
          <div className="mt-8 p-4 bg-gray-800 rounded-lg">
            <p className="text-xs text-gray-400 leading-relaxed">
              <strong>Important:</strong> This product contains nicotine, which is addictive. 
              Stop smoking completely when you start using Nicotex. If you continue to smoke, 
              chew tobacco, use snuff, or use other nicotine-containing products, you may experience 
              side effects such as nausea, hiccups, heartburn, and other stomach problems. 
              Nicotex is for those who want to stop smoking. If you are pregnant or breast-feeding, 
              only use this medicine on the advice of your health care provider. 
              Keep out of reach of children and pets.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
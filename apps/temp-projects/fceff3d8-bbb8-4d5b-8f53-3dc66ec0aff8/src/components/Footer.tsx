import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About Us', href: '#' },
      { name: 'How It Works', href: '#how-it-works' },
      { name: 'Careers', href: '#' },
      { name: 'Press', href: '#' },
      { name: 'Blog', href: '#' }
    ],
    treatment: [
      { name: 'Clear Aligners', href: '#' },
      { name: 'Treatment Plans', href: '#pricing' },
      { name: 'Before & After', href: '#' },
      { name: 'Success Stories', href: '#testimonials' },
      { name: 'FAQ', href: '#' }
    ],
    support: [
      { name: 'Contact Us', href: '#contact' },
      { name: 'Customer Support', href: '#' },
      { name: 'Treatment Support', href: '#' },
      { name: 'Insurance', href: '#' },
      { name: 'Financing', href: '#' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Medical Disclaimer', href: '#' },
      { name: 'Accessibility', href: '#' },
      { name: 'Sitemap', href: '#' }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="text-2xl font-bold gradient-text mb-4">SmileAlign</div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Transform your smile with premium clear aligners. Professional results, 
                expert care, and unmatched convenience for your teeth straightening journey.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-300">
                  <Phone size={16} />
                  <span>(555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Mail size={16} />
                  <span>support@smilealign.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <MapPin size={16} />
                  <span>San Francisco, CA</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4 mt-6">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className="bg-gray-800 p-2 rounded-lg hover:bg-primary-600 transition-colors"
                    >
                      <IconComponent size={20} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Treatment Links */}
            <div>
              <h3 className="font-semibold text-white mb-4">Treatment</h3>
              <ul className="space-y-3">
                {footerLinks.treatment.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-800 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                Stay Updated on Your Smile Journey
              </h3>
              <p className="text-gray-300">
                Get tips, updates, and exclusive offers delivered to your inbox.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} SmileAlign. All rights reserved.
            </div>
            
            {/* Certifications */}
            <div className="flex items-center space-x-6 text-gray-400 text-sm">
              <div className="flex items-center space-x-4">
                <span>FDA Approved</span>
                <span>•</span>
                <span>ADA Recognized</span>
                <span>•</span>
                <span>ISO 13485</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-800 text-center text-xs text-gray-500">
            <p>
              SmileAlign clear aligners are medical devices. Individual results may vary. 
              Consult with a dental professional to determine if treatment is right for you.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
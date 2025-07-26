import React from 'react';
import { GraduationCap, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const quickLinks = [
    { label: 'About Us', href: '#about' },
    { label: 'Academic Programs', href: '#programs' },
    { label: 'Admissions', href: '#admissions' },
    { label: 'Faculty', href: '#faculty' },
    { label: 'News & Events', href: '#news' },
    { label: 'Contact', href: '#contact' }
  ];

  const resources = [
    { label: 'Student Portal', href: '#' },
    { label: 'Parent Portal', href: '#' },
    { label: 'Academic Calendar', href: '#' },
    { label: 'Student Handbook', href: '#' },
    { label: 'Lunch Menu', href: '#' },
    { label: 'Transportation', href: '#' }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* School Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <GraduationCap className="h-8 w-8 text-primary-400" />
              <div>
                <h3 className="text-xl font-bold">Greenwood Academy</h3>
                <p className="text-sm text-gray-400">Excellence in Education</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Nurturing tomorrow's leaders through exceptional education, 
              character development, and innovative learning experiences.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-300">
                <MapPin className="h-4 w-4 mr-3 text-primary-400" />
                123 Education Street, Greenwood, ST 12345
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Phone className="h-4 w-4 mr-3 text-primary-400" />
                (555) 123-4567
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Mail className="h-4 w-4 mr-3 text-primary-400" />
                info@greenwoodacademy.edu
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Resources</h4>
            <ul className="space-y-3">
              {resources.map((resource, index) => (
                <li key={index}>
                  <a
                    href={resource.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors text-sm"
                  >
                    {resource.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Stay Connected</h4>
            <p className="text-gray-300 text-sm mb-4">
              Subscribe to our newsletter for updates and announcements.
            </p>
            
            <div className="mb-6">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
                />
                <button className="bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-r-lg transition-colors">
                  <Mail className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <p className="text-sm text-gray-300 mb-3">Follow us on social media:</p>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="grid md:grid-cols-2 gap-4 items-center">
            <div className="text-sm text-gray-400">
              © 2024 Greenwood Academy. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-gray-400 md:justify-end">
              <a href="#" className="hover:text-primary-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
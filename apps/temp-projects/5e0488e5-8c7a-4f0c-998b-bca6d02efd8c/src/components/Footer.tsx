import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  const footerLinks = [
    ['FAQ', 'Help Center', 'Account', 'Media Center'],
    ['Investor Relations', 'Jobs', 'Ways to Watch', 'Terms of Use'],
    ['Privacy', 'Cookie Preferences', 'Corporate Information', 'Contact Us'],
    ['Speed Test', 'Legal Notices', 'Only on Netflix']
  ];

  const socialIcons = [
    { Icon: Facebook, href: '#' },
    { Icon: Instagram, href: '#' },
    { Icon: Twitter, href: '#' },
    { Icon: Youtube, href: '#' }
  ];

  return (
    <footer className="bg-black text-gray-400 py-16 px-4 md:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Social Icons */}
        <div className="flex space-x-6 mb-8">
          {socialIcons.map(({ Icon, href }, index) => (
            <a
              key={index}
              href={href}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <Icon className="w-6 h-6" />
            </a>
          ))}
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {footerLinks.map((column, columnIndex) => (
            <div key={columnIndex} className="space-y-3">
              {column.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="block text-sm hover:text-white transition-colors duration-200"
                >
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>

        {/* Service Code */}
        <div className="mb-6">
          <button className="border border-gray-400 px-4 py-2 text-sm hover:text-white hover:border-white transition-colors duration-200">
            Service Code
          </button>
        </div>

        {/* Copyright */}
        <div className="text-sm">
          <p>&copy; 1997-2024 Netflix, Inc.</p>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-xs text-gray-500 space-y-2">
          <p>
            Netflix is a streaming service that offers a wide variety of 
            award-winning TV shows, movies and documentaries on thousands 
            of internet-connected devices.
          </p>
          <p>
            You can watch as much as you want, whenever you want without 
            a single commercial – all for one low monthly price.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
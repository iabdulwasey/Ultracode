import React from 'react';
import { Globe, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  const footerSections = [
    {
      title: 'Support',
      links: [
        'Help Center',
        'Safety information',
        'Cancellation options',
        'Our COVID-19 Response',
        'Supporting people with disabilities',
        'Report a neighborhood concern',
      ],
    },
    {
      title: 'Community',
      links: [
        'Airbnb.org: disaster relief housing',
        'Support Afghan refugees',
        'Combating discrimination',
      ],
    },
    {
      title: 'Hosting',
      links: [
        'Try hosting',
        'AirCover for Hosts',
        'Explore hosting resources',
        'Visit our community forum',
        'How to host responsibly',
      ],
    },
    {
      title: 'About',
      links: [
        'Newsroom',
        'Learn about new features',
        'Letter from our founders',
        'Careers',
        'Investors',
        'Airbnb Luxe',
      ],
    },
  ];

  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {footerSections.map((section, index) => (
            <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <h3 className="font-semibold text-gray-900 mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Left Side */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="text-sm text-gray-600">
                © 2024 Airbnb, Inc. All rights reserved
              </div>
              
              <div className="flex items-center space-x-4 text-sm">
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Privacy
                </a>
                <span className="text-gray-400">·</span>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Terms
                </a>
                <span className="text-gray-400">·</span>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Sitemap
                </a>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-6">
              {/* Language/Region Selector */}
              <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                <Globe className="w-4 h-4" />
                <span>English (US)</span>
                <span>$ USD</span>
              </button>

              {/* Social Media Links */}
              <div className="flex items-center space-x-4">
                <a
                  href="#"
                  className="text-gray-600 hover:text-airbnb-primary transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-airbnb-primary transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-airbnb-primary transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-airbnb-primary transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
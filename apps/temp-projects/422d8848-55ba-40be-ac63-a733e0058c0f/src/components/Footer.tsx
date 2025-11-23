import React from 'react';
import { MapPin, Mail, Phone, Heart, Facebook, Twitter, Instagram, Youtube, ArrowRight, Plane, Calendar, Users } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Destinations',
      links: [
        { name: 'Tokyo', href: '#tokyo' },
        { name: 'Kyoto', href: '#kyoto' },
        { name: 'Osaka', href: '#osaka' },
        { name: 'Hiroshima', href: '#hiroshima' },
        { name: 'Mount Fuji', href: '#fuji' },
        { name: 'Hokkaido', href: '#hokkaido' }
      ]
    },
    {
      title: 'Experiences',
      links: [
        { name: 'Cultural Tours', href: '#culture' },
        { name: 'Food Experiences', href: '#food' },
        { name: 'Temple Visits', href: '#temples' },
        { name: 'Cherry Blossom Tours', href: '#sakura' },
        { name: 'Seasonal Guides', href: '#seasons' },
        { name: 'Photography Tours', href: '#photography' }
      ]
    },
    {
      title: 'Travel Info',
      links: [
        { name: 'Travel Tips', href: '#tips' },
        { name: 'Transportation', href: '#transport' },
        { name: 'Accommodation', href: '#hotels' },
        { name: 'Weather Guide', href: '#weather' },
        { name: 'Cultural Etiquette', href: '#etiquette' },
        { name: 'Emergency Info', href: '#emergency' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#about' },
        { name: 'Our Team', href: '#team' },
        { name: 'Careers', href: '#careers' },
        { name: 'Press', href: '#press' },
        { name: 'Contact', href: '#contact' },
        { name: 'Privacy Policy', href: '#privacy' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:text-blue-600' },
    { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-blue-400' },
    { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-pink-600' },
    { name: 'Youtube', icon: Youtube, href: '#', color: 'hover:text-red-600' }
  ];

  const stats = [
    { icon: Users, value: '1M+', label: 'Happy Travelers' },
    { icon: MapPin, value: '500+', label: 'Destinations' },
    { icon: Calendar, value: '15+', label: 'Years Experience' },
    { icon: Plane, value: '50K+', label: 'Tours Completed' }
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Stats Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-japan-red to-japan-cherry rounded-full flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-japan-red to-japan-cherry rounded-full flex items-center justify-center">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold gradient-text bg-gradient-to-r from-japan-cherry to-japan-gold bg-clip-text text-transparent">
                  Explore Japan
                </h3>
                <p className="text-gray-400 text-sm">Land of Rising Sun</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your ultimate guide to discovering Japan's hidden gems, cultural treasures, 
              and unforgettable experiences. From ancient temples to modern marvels, 
              we help you explore Japan like never before.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="w-4 h-4 text-japan-cherry" />
                <span className="text-sm">hello@explorejapan.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="w-4 h-4 text-japan-cherry" />
                <span className="text-sm">+81 3-1234-5678</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="w-4 h-4 text-japan-cherry" />
                <span className="text-sm">Tokyo, Japan</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className={`w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 transition-all duration-300 hover:scale-110 ${social.color}`}
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {footerSections.map((section) => (
                <div key={section.title}>
                  <h4 className="text-lg font-semibold text-white mb-4">
                    {section.title}
                  </h4>
                  <ul className="space-y-2">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="text-gray-400 hover:text-japan-cherry transition-colors duration-200 text-sm flex items-center group"
                        >
                          <span>{link.name}</span>
                          <ArrowRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-gradient-to-r from-japan-red/10 to-japan-cherry/10 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">
              Stay Updated with Japan Travel Tips
            </h3>
            <p className="text-gray-300 mb-6">
              Get the latest destination guides, cultural insights, and exclusive deals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-japan-cherry"
              />
              <button className="bg-gradient-to-r from-japan-red to-japan-cherry text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>© {currentYear} Explore Japan. Made with</span>
              <Heart className="w-4 h-4 text-japan-red fill-current" />
              <span>for travelers</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a href="#terms" className="hover:text-japan-cherry transition-colors">
                Terms of Service
              </a>
              <a href="#privacy" className="hover:text-japan-cherry transition-colors">
                Privacy Policy
              </a>
              <a href="#cookies" className="hover:text-japan-cherry transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
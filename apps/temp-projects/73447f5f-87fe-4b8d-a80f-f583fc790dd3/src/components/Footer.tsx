import React from 'react';
import { MapPin, Phone, Mail, Heart, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { FaWeibo, FaLine } from 'react-icons/fa';

const Footer: React.FC = () => {
  const footerSections = [
    {
      title: 'Destinations',
      links: [
        'Tokyo',
        'Kyoto',
        'Osaka',
        'Mount Fuji',
        'Hiroshima',
        'Nara',
        'Hokkaido',
        'Okinawa'
      ]
    },
    {
      title: 'Experiences',
      links: [
        'Cultural Tours',
        'Food Experiences',
        'Adventure Activities',
        'Traditional Arts',
        'Festivals',
        'Hot Springs',
        'Photography Tours',
        'Custom Itineraries'
      ]
    },
    {
      title: 'Travel Info',
      links: [
        'Planning Guide',
        'Visa Information',
        'Transportation',
        'Accommodation',
        'Cultural Etiquette',
        'Language Guide',
        'Currency & Money',
        'Safety Tips'
      ]
    },
    {
      title: 'Company',
      links: [
        'About Us',
        'Our Team',
        'Careers',
        'Press',
        'Blog',
        'Reviews',
        'Contact',
        'Privacy Policy'
      ]
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: FaWeibo, href: '#', label: 'Weibo' },
    { icon: FaLine, href: '#', label: 'Line' }
  ];

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Our Office',
      details: ['123 Sakura Street', 'Shibuya, Tokyo 150-0001', 'Japan']
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+81 3-1234-5678', '+1 (555) 123-4567', 'Mon-Fri 9AM-6PM JST']
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['info@exploringjapan.com', 'support@exploringjapan.com', '24/7 Support Available']
    }
  ];

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-japanese-red to-sakura-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">日</span>
                </div>
                <span className="text-2xl font-bold">Exploring Japan</span>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6">
                Your trusted companion for discovering the wonders of Japan. From ancient traditions 
                to modern marvels, we help you create unforgettable memories in the Land of the Rising Sun.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-japanese-red transition-colors duration-300"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold mb-6 text-white">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-sakura-300 transition-colors duration-200 text-sm"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {contactInfo.map((contact, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-japanese-red rounded-full flex items-center justify-center">
                    <contact.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">{contact.title}</h4>
                    {contact.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className="text-gray-300 text-sm">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Awards & Certifications */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-8 mb-4 md:mb-0">
                <div className="text-center">
                  <div className="text-2xl font-bold text-sakura-300">4.9★</div>
                  <div className="text-xs text-gray-400">TripAdvisor</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-sakura-300">#1</div>
                  <div className="text-xs text-gray-400">Japan Guide</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-sakura-300">50K+</div>
                  <div className="text-xs text-gray-400">Happy Travelers</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span>Certified by</span>
                <span className="px-3 py-1 bg-gray-800 rounded-full">JNTO</span>
                <span className="px-3 py-1 bg-gray-800 rounded-full">IATA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4 md:mb-0">
                <span>© 2024 Exploring Japan. All rights reserved.</span>
                <span>•</span>
                <a href="#" className="hover:text-sakura-300 transition-colors">Privacy Policy</a>
                <span>•</span>
                <a href="#" className="hover:text-sakura-300 transition-colors">Terms of Service</a>
                <span>•</span>
                <a href="#" className="hover:text-sakura-300 transition-colors">Cookie Policy</a>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-sakura-400 fill-current" />
                <span>for Japan lovers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;